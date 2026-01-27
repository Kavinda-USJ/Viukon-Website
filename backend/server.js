const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Define Schema
const siteDataSchema = new mongoose.Schema({
  hero: {
    title: String,
    carouselWords: [String]
  },
  projects: [{
    id: String,
    title: String,
    category: String,
    description: String,
    img: String,
    tags: [String]
  }],
  team: [{
    id: String,
    name: String,
    role: String,
    img: String
  }],
  contact: {
    email: String,
    address: String
  }
}, { timestamps: true });

const SiteData = mongoose.model('SiteData', siteDataSchema);

// API Routes
// GET - Fetch all site data
app.get('/api/sitedata', async (req, res) => {
  try {
    let data = await SiteData.findOne();
    
    // If no data exists, create initial data
    if (!data) {
      data = await SiteData.create({
        hero: {
          title: "WE CREATE DIGITAL",
          carouselWords: ["EXPERIENCES", "SOLUTIONS", "BRANDS", "INNOVATIONS"]
        },
        projects: [],
        team: [],
        contact: {
          email: "hello@viukon.com",
          address: "123 Creative Street, Design City"
        }
      });
    }
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update site data
app.put('/api/sitedata', async (req, res) => {
  try {
    let data = await SiteData.findOne();
    
    if (!data) {
      data = await SiteData.create(req.body);
    } else {
      data.hero = req.body.hero;
      data.projects = req.body.projects;
      data.team = req.body.team;
      data.contact = req.body.contact;
      await data.save();
    }
    
    res.json({ message: 'Data updated successfully!', data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});