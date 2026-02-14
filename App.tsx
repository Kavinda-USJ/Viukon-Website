import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { Services } from './components/Services';
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
    phone: string;   // ← added
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
    teamOrder?: string[];
    projectOrder?: string[];
  };
}

const initialData: SiteData = {
  hero: {
    title: "ENGINEERING",
    carouselWords: ["FUTURE SCALE", "BRAND GROWTH", "DIGITAL IMPACT", "DATA VISION", "CREATIVE ROI"]
  },
  contact: {
    email: "hello@viukon.com",
    phone: "+94 77 812 3732",   // ← added
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
    teamImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
    teamOrder: [],
    projectOrder: []
  }
};

const applySavedOrder = (data: SiteData): SiteData => {
  const teamOrder    = data.about?.teamOrder    || [];
  const projectOrder = data.about?.projectOrder || [];

  const sortByOrder = <T extends { id: string }>(items: T[], order: string[]): T[] => {
    if (order.length === 0) return items;
    return [...items].sort((a, b) => {
      const ai = order.indexOf(a.id);
      const bi = order.indexOf(b.id);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  };

  return {
    ...data,
    // Ensure phone exists even if loaded from older backend data without it
    contact: {
      email:   data.contact?.email   || '',
      phone:   data.contact?.phone   || '',
      address: data.contact?.address || '',
    },
    team:     sortByOrder(data.team,     teamOrder),
    projects: sortByOrder(data.projects, projectOrder),
  };
};

const App: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteData>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const hideStandardLayout = location.pathname === '/admin';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSiteData();
        setSiteData(applySavedOrder(data));
      } catch (error) {
        console.error('Error loading site data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    setSiteData(prev => ({
      ...prev,
      about: {
        ...(prev.about || initialData.about!),
        teamOrder:    prev.team.map(m => m.id),
        projectOrder: prev.projects.map(p => p.id),
      }
    }));
  }, [
    siteData.team.map(m => m.id).join(','),
    siteData.projects.map(p => p.id).join(','),
    isLoading,
  ]);

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
    <div className={`min-h-screen selection:bg-brand-yellow selection:text-brand-black overflow-x-hidden ${['/about', '/portfolio', '/team'].includes(location.pathname) ? 'bg-white' : 'bg-brand-black'}`}>
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
          } />
          <Route path="/about"     element={<About aboutData={siteData.about || initialData.about!} teamMembers={siteData.team} />} />
          <Route path="/services"  element={<Services />} />
          <Route path="/portfolio" element={<Solutions works={siteData.projects} />} />
          <Route path="/team"      element={<Team members={siteData.team} />} />
          <Route path="/contact"   element={<ContactCTA isFullPage contact={siteData.contact} />} />
          <Route path="/admin"     element={<Admin siteData={siteData} setSiteData={setSiteData} />} />
        </Routes>
      </main>
      {!hideStandardLayout && <Footer />}

      {!hideStandardLayout && (
        <a
          href="https://wa.me/94778123732"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
        >
          <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-white text-[#128C7E] text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none order-first">
            Chat with us
          </span>
          <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.7)] hover:scale-110 active:scale-95 transition-all duration-300">
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
            <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white relative z-10" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.65 4.897 1.885 7.02L2 30l7.184-1.862A13.94 13.94 0 0016.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.474a11.53 11.53 0 01-5.886-1.607l-.422-.25-4.265 1.106 1.133-4.148-.276-.435A11.474 11.474 0 014.526 16c0-6.326 5.15-11.474 11.477-11.474S27.474 9.674 27.474 16c0 6.327-5.148 11.474-11.471 11.474zm6.3-8.596c-.346-.173-2.044-1.007-2.36-1.122-.317-.115-.548-.173-.778.173-.23.346-.894 1.122-1.095 1.353-.202.23-.403.26-.75.087-.345-.173-1.458-.537-2.777-1.713-1.026-.916-1.72-2.047-1.921-2.393-.202-.346-.022-.533.151-.705.155-.155.346-.403.519-.605.173-.202.23-.346.346-.577.115-.23.058-.433-.029-.606-.087-.172-.778-1.873-1.066-2.564-.28-.673-.566-.582-.778-.593l-.663-.011c-.23 0-.605.086-.922.433-.317.346-1.21 1.181-1.21 2.88 0 1.7 1.239 3.342 1.411 3.573.173.23 2.44 3.726 5.912 5.225.826.357 1.47.57 1.972.729.829.264 1.584.227 2.18.138.665-.1 2.044-.835 2.333-1.64.288-.806.288-1.497.202-1.641-.086-.144-.317-.23-.663-.403z"/>
            </svg>
          </div>
        </a>
      )}
    </div>
  );
};

export default App;