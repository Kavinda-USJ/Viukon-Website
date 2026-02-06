-- ================================================
-- VIUKON CMS - MySQL Database Schema
-- ================================================
-- This script creates all necessary tables for the Viukon website CMS
-- Run this in your MySQL database or through phpMyAdmin

-- Create database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS viukon_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE viukon_db;

-- ================================================
-- Table 1: Site Settings (Hero, Contact, Stats, About, Trusted Brands)
-- ================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  hero JSON NOT NULL,
  contact JSON NOT NULL,
  trustedBrands JSON NOT NULL,
  stats JSON NOT NULL,
  about JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default data
INSERT INTO site_settings (id, hero, contact, trustedBrands, stats, about)
VALUES (
  1,
  '{"title": "ENGINEERING", "carouselWords": ["FUTURE SCALE", "BRAND GROWTH", "DIGITAL IMPACT", "DATA VISION", "CREATIVE ROI"]}',
  '{"email": "hello@viukon.com", "address": "32 Curzon St, London"}',
  '["FINTECH", "SNAP PAY", "IMOS", "MOE MEDIA", "SWC GLOBAL", "DFIT LABS", "VORTEX AI", "APEX SYSTEMS"]',
  '{"projects": 150, "clients": 85, "engagement": 25000}',
  '{"yearsExperience": 5, "partnerPrograms": 12, "teamImage": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"}'
);

-- ================================================
-- Table 2: Projects Portfolio
-- ================================================
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  img TEXT NOT NULL,
  tags JSON,
  link VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample project (optional - you can delete this)
INSERT INTO projects (id, title, category, description, img, tags, link, featured)
VALUES (
  '1',
  'Brand Identity Redesign',
  'Branding',
  'Complete brand overhaul for a tech startup, including logo design, color palette, and brand guidelines.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  '["Branding", "Strategy"]',
  'https://example.com',
  TRUE
);

-- ================================================
-- Table 3: Team Members
-- ================================================
CREATE TABLE IF NOT EXISTS team (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  img TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample team member (optional - you can delete this)
INSERT INTO team (id, name, role, img)
VALUES (
  '1',
  'John Smith',
  'Creative Director',
  'https://i.pravatar.cc/400?u=1'
);

-- ================================================
-- Indexes for better performance
-- ================================================
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_category ON projects(category);

-- ================================================
-- Show tables to verify
-- ================================================
SHOW TABLES;

-- ================================================
-- DONE! Your database is ready 🎉
-- ================================================