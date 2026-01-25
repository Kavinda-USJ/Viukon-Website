
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  scrolled: boolean;
  currentPage: string;
  setPage: (page: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled, currentPage, setPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLightMode = currentPage === 'about' || currentPage === 'portfolio' || currentPage === 'team';

  // Close mobile menu when page changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'team', label: 'Team' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 px-6 py-4 ${
        scrolled 
          ? (isLightMode ? 'bg-white/80 border-b border-black/5' : 'bg-brand-black/80 border-b border-white/10') 
          : 'bg-transparent'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => setPage('home')}
            className="flex items-center gap-2 group z-[70]"
          >
            <div className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center font-bold text-brand-black text-xl group-hover:scale-110 transition-transform">V</div>
            <span className={`text-2xl font-extrabold tracking-tighter transition-colors ${isLightMode || isMobileMenuOpen ? 'text-brand-black md:text-inherit' : 'text-white'}`}>
              <span className={`${isMobileMenuOpen ? 'text-brand-black' : (isLightMode ? 'text-brand-black' : 'text-white')}`}>viukon</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-8 text-sm font-bold tracking-tight uppercase text-[11px]`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`transition-all relative py-1 ${
                  currentPage === item.id 
                    ? 'text-brand-yellow' 
                    : (isLightMode ? 'text-brand-black/40 hover:text-brand-black' : 'text-white/40 hover:text-white')
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-yellow rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPage('contact')}
              className="hidden sm:flex glass-button-yellow hover:bg-brand-yellow/20 text-brand-yellow px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest items-center gap-2 transition-all group border-brand-yellow/20 z-[70]"
            >
              Let's Talk
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[70] transition-colors ${
                isMobileMenuOpen ? 'text-brand-black' : (isLightMode ? 'text-brand-black' : 'text-white')
              }`}
              aria-label="Toggle Menu"
            >
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[55] md:hidden transition-all duration-500 ease-in-out ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-brand-yellow animate-in fade-in zoom-in duration-300"></div>
        
        {/* Particle and Glow Effects for Mobile Menu */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-white/10 blur-[100px] pointer-events-none"></div>

        <div className="relative h-full flex flex-col justify-center px-10 gap-8">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`text-left transition-all duration-300 transform ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className={`text-4xl sm:text-6xl font-black tracking-tighter ${
                currentPage === item.id ? 'text-brand-black underline decoration-brand-black/20' : 'text-brand-black/60 hover:text-brand-black'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
          
          <div className={`pt-10 transition-all duration-500 delay-500 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <button 
              onClick={() => setPage('contact')}
              className="w-full bg-brand-black text-brand-yellow py-6 rounded-3xl font-black uppercase tracking-widest text-lg flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Get In Touch
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          <div className="mt-auto pb-10 flex gap-6 text-brand-black/40 font-bold uppercase tracking-widest text-xs">
            <a href="#" className="hover:text-brand-black transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand-black transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-black transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </>
  );
};
