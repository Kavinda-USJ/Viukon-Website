const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 8889,         
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'viukon_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper: Safely parse JSON only if it is a string
const safeParse = (data) => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  return data; // Already an object or null
};

// ================= API ROUTES =================

app.get('/api/sitedata', async (req, res) => {
  try {
    const [settingsRows] = await pool.query('SELECT * FROM site_settings WHERE id = 1');
    const [projectRows] = await pool.query('SELECT * FROM projects ORDER BY id DESC');
    const [teamRows] = await pool.query('SELECT * FROM team ORDER BY id DESC');

    const settings = settingsRows[0];

    if (!settings) {
      return res.json({
        hero: { title: "ENGINEERING", carouselWords: ["FUTURE SCALE", "BRAND GROWTH"] },
        projects: [],
        team: [],
        contact: { email: "hello@viukon.com", address: "London" },
        trustedBrands: [],
        stats: { projects: 0, clients: 0, engagement: 0 },
        about: { yearsExperience: 0, partnerPrograms: 0, teamImage: '' }
      });
    }

    // projects.tags is stored as JSON, mysql2 handles it
    const formattedProjects = projectRows.map(p => ({
      ...p,
      tags: safeParse(p.tags),
      featured: !!p.featured // Convert 1/0 to true/false
    }));

    res.json({
      hero: safeParse(settings.hero),
      projects: formattedProjects,
      team: teamRows,
      contact: safeParse(settings.contact),
      trustedBrands: safeParse(settings.trustedBrands),
      stats: safeParse(settings.stats),
      about: safeParse(settings.about)
    });

  } catch (error) {
    console.error('🔥 Server GET Error:', error);
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/sitedata', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const { hero, projects, team, contact, trustedBrands, stats, about } = req.body;

    // 1. Update site_settings
    await connection.query(
      'UPDATE site_settings SET hero = ?, contact = ?, trustedBrands = ?, stats = ?, about = ? WHERE id = 1',
      [
        JSON.stringify(hero),
        JSON.stringify(contact),
        JSON.stringify(trustedBrands),
        JSON.stringify(stats),
        JSON.stringify(about)
      ]
    );

    // 2. Sync Projects (Delete and Re-insert approach)
    await connection.query('DELETE FROM projects');
    if (projects && projects.length > 0) {
      for (const p of projects) {
        await connection.query(
          'INSERT INTO projects (id, title, category, description, img, tags, link, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [p.id, p.title, p.category, p.description || '', p.img, JSON.stringify(p.tags || []), p.link || '', p.featured ? 1 : 0]
        );
      }
    }

    // 3. Sync Team
    await connection.query('DELETE FROM team');
    if (team && team.length > 0) {
      for (const m of team) {
        await connection.query(
          'INSERT INTO team (id, name, role, img) VALUES (?, ?, ?, ?)',
          [m.id, m.name, m.role, m.img]
        );
      }
    }

    await connection.commit();
    res.json({ message: 'Data updated successfully!' });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error('🔥 Server PUT Error:', error);
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) connection.release();
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));