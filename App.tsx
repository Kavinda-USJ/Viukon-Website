import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedBy } from './components/TrustedBy';
import { Features } from './components/Features';
import { FeaturedWorks } from './components/FeaturedWorks';
import { FAQ } from './components/FAQ';
import { Stats } from './components/Stats';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { Team } from './components/Team';
import { Solutions } from './components/Solutions';
import { Admin } from './components/Admin';
import { fetchSiteData, updateSiteData } from './services/api';

export interface Project {
  id: string;
  title: string;
  category: string;
  description?: string;
  img: string;
  tags: string[];
  link?: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  img: string;
}

export interface SiteData {
  hero: {
    title: string;
    carouselWords: string[];
  };
  projects: Project[];
  team: TeamMember[];
  contact: {
    email: string;
    address: string;
  };
  trustedBrands?: string[];
  stats?: {
    projects: number;
    clients: number;
    engagement: number;
  };
  about?: {
    yearsExperience: number;
    partnerPrograms: number;
    teamImage: string;
  };
}

const initialData: SiteData = {
  hero: {
    title: "ENGINEERING",
    carouselWords: ["FUTURE SCALE", "BRAND GROWTH", "DIGITAL IMPACT", "DATA VISION", "CREATIVE ROI"]
  },
  contact: {
    email: "hello@viukon.com",
    address: "32 Curzon St, London"
  },
  projects: [
    { id: '1', title: 'Aura Fitness', category: 'Brand Identity', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800', tags: ['Strategy', 'SEO'] },
    { id: '2', title: 'Neon Vault', category: 'E-Commerce', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800', tags: ['Web Design', 'UI'] },
    { id: '3', title: 'Kinetix Hub', category: 'App Design', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800', tags: ['Full Stack', 'Mobile'] },
    { id: '4', title: 'Solaris Pro', category: 'Growth Marketing', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', tags: ['Ads', 'Creative'] }
  ],
  team: [
    { id: '1', name: 'Alex Thorne', role: 'Founder & CEO', img: 'https://i.pravatar.cc/400?u=alex' },
    { id: '2', name: 'Sarah Chen', role: 'Head of Creative', img: 'https://i.pravatar.cc/400?u=sarah' },
    { id: '3', name: 'Marcus Bell', role: 'Strategy Director', img: 'https://i.pravatar.cc/400?u=marcus' },
    { id: '4', name: 'Elena Rodriguez', role: 'Operations Lead', img: 'https://i.pravatar.cc/400?u=elena' },
    { id: '5', name: 'David Park', role: 'Data Scientist', img: 'https://i.pravatar.cc/400?u=david' },
    { id: '6', name: 'Sophia Miller', role: 'Client Relations', img: 'https://i.pravatar.cc/400?u=sophia' }
  ],
  trustedBrands: [
    'FINTECH', 'SNAP PAY', 'IMOS', 'MOE MEDIA', 'SWC GLOBAL', 
    'DFIT LABS', 'VORTEX AI', 'APEX SYSTEMS'
  ],
  stats: {
    projects: 150,
    clients: 85,
    engagement: 25000
  },
  about: {
    yearsExperience: 5,
    partnerPrograms: 12,
    teamImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200'
  }
};

const App: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteData>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const hideStandardLayout = location.pathname === '/admin';

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSiteData();
        setSiteData(data);
      } catch (error) {
        console.error('Error loading site data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Save data on change
  useEffect(() => {
    if (!isLoading) {
      const saveData = async () => {
        try {
          await updateSiteData(siteData);
          console.log('✅ Data saved!');
        } catch (error) {
          console.error('❌ Error saving data:', error);
        }
      };
      saveData();
    }
  }, [siteData, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-black">
        <div className="text-brand-yellow text-2xl font-black animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen selection:bg-brand-yellow selection:text-brand-black overflow-x-hidden ${['/about','/portfolio','/team'].includes(location.pathname) ? 'bg-white' : 'bg-brand-black'}`}>
      {!hideStandardLayout && <Navbar />}
      <main className="w-full relative overflow-x-hidden">
        <Routes>
          <Route path="/" element={
            <>
              <Hero data={siteData.hero} />
              <TrustedBy brands={siteData.trustedBrands || []} />
              <Features />
              <FeaturedWorks works={siteData.projects} />
              <FAQ />
              <Stats stats={siteData.stats || initialData.stats!} />
              <ContactCTA contact={siteData.contact} />
            </>
          }/>
          <Route path="/about" element={<About aboutData={siteData.about || initialData.about!} />} />
          <Route path="/services" element={
            <>
              <Features />
              <Stats stats={siteData.stats || initialData.stats!} />
            </>
          }/>
          <Route path="/portfolio" element={<Solutions works={siteData.projects} />} />
          <Route path="/team" element={<Team members={siteData.team} />} />
          <Route path="/contact" element={<ContactCTA isFullPage contact={siteData.contact} />} />
          <Route path="/admin" element={<Admin siteData={siteData} setSiteData={setSiteData} />} />
        </Routes>
      </main>
      {!hideStandardLayout && <Footer />}
    </div>
  );
};

export default App;
