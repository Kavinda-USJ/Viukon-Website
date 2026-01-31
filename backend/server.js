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
    tags: [String],
    link: String,
    featured: { type: Boolean, default: false }
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
  },
  // ✅ ADDED: Trusted Brands
  trustedBrands: {
    type: [String],
    default: [
      'FINTECH',
      'SNAP PAY',
      'IMOS',
      'MOE MEDIA',
      'SWC GLOBAL',
      'DFIT LABS',
      'VORTEX AI',
      'APEX SYSTEMS'
    ]
  },
  // ✅ ADDED: Stats
  stats: {
    projects: { type: Number, default: 150 },
    clients: { type: Number, default: 85 },
    engagement: { type: Number, default: 25000 }
  },
  // ✅ ADDED: About Page Data
  about: {
    yearsExperience: { type: Number, default: 5 },
    partnerPrograms: { type: Number, default: 12 },
    teamImage: { 
      type: String, 
      default: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200' 
    }
  }
}, { timestamps: true });

const SiteData = mongoose.model('SiteData', siteDataSchema);

// ================= API ROUTES =================

// GET - Fetch site data
app.get('/api/sitedata', async (req, res) => {
  try {
    let data = await SiteData.findOne();
    
    // If no data exists, create initial data
    if (!data) {
      data = await SiteData.create({
        hero: {
          title: "ENGINEERING",
          carouselWords: ["FUTURE SCALE", "BRAND GROWTH", "DIGITAL IMPACT", "DATA VISION", "CREATIVE ROI"]
        },
        projects: [],
        team: [],
        contact: {
          email: "hello@viukon.com",
          address: "32 Curzon St, London"
        }
        // trustedBrands, stats, and about auto-filled by defaults
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
      data.trustedBrands = req.body.trustedBrands;
      data.stats = req.body.stats;
      data.about = req.body.about; // ✅ ADDED: Save about data
      
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