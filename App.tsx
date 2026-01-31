import React, { useEffect, useState } from 'react';
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

export type Page = 'home' | 'about' | 'services' | 'portfolio' | 'team' | 'contact' | 'admin';

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
    'DFIT LABS', 'VORTEX AI', 'APEX SYSTEMS',
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
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [siteData, setSiteData] = useState<SiteData>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from database on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSiteData();
        setSiteData(data);
      } catch (error) {
        console.error('Error loading site data:', error);
        // Keep using initialData if fetch fails
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Save data to database whenever siteData changes
  useEffect(() => {
    if (!isLoading) {
      const saveData = async () => {
        try {
          await updateSiteData(siteData);
          console.log('✅ Data saved to database!');
        } catch (error) {
          console.error('❌ Error saving data:', error);
        }
      };
      saveData();
    }
  }, [siteData, isLoading]);

  useEffect(() => {
    // Handle URL path simulation
    const path = window.location.pathname;
    if (path === '/admin') {
      setCurrentPage('admin');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-black">
          <div className="text-brand-yellow text-2xl font-black animate-pulse">Loading...</div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-700 overflow-x-hidden w-full">
            <Hero data={siteData.hero} setPage={setCurrentPage} />
            <TrustedBy brands={siteData.trustedBrands || []} />
            <Features />
            <FeaturedWorks works={siteData.projects} />
            <FAQ />
            <Stats stats={siteData.stats || { projects: 150, clients: 85, engagement: 25000 }} />
            <ContactCTA setPage={setCurrentPage} contact={siteData.contact} />
          </div>
        );
      case 'about':
        return <About aboutData={siteData.about || { yearsExperience: 5, partnerPrograms: 12, teamImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200' }} />;
      case 'services':
        return (
          <div className="animate-in fade-in duration-700 overflow-x-hidden w-full">
            <Features />
            <Stats stats={siteData.stats || { projects: 150, clients: 85, engagement: 25000 }} />
          </div>
        );
      case 'portfolio':
        return <Solutions works={siteData.projects} />;
      case 'team':
        return <Team members={siteData.team} />;
      case 'contact':
        return <ContactCTA isFullPage setPage={setCurrentPage} contact={siteData.contact} />;
      case 'admin':
        return <Admin siteData={siteData} setSiteData={setSiteData} />;
      default:
        return <Hero data={siteData.hero} setPage={setCurrentPage} />;
    }
  };

  const isLightMode = ['about', 'portfolio', 'team'].includes(currentPage);
  const hideStandardLayout = currentPage === 'admin';

  return (
    <div className={`min-h-screen selection:bg-brand-yellow selection:text-brand-black overflow-x-hidden ${isLightMode ? 'bg-white' : 'bg-brand-black'}`}>
      {!hideStandardLayout && (
        <Navbar scrolled={scrolled} currentPage={currentPage} setPage={setCurrentPage} />
      )}
      <main className="w-full relative overflow-x-hidden">
        {renderPage()}
      </main>
      {!hideStandardLayout && (
        <Footer setPage={setCurrentPage} />
      )}
    </div>
  );
};

export default App;