import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import viukonLogo from './assets/viukon-logo.png';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isLightMode = ['/about', '/portfolio', '/team'].includes(location.pathname);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Disable scroll when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/team', label: 'Products' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 px-6 py-4 ${
        isMobileMenuOpen
          ? 'bg-brand-yellow md:bg-brand-black/80 border-b-0 md:border-b md:border-white/10'
          : scrolled || isLightMode
            ? isLightMode
              ? 'bg-brand-black/60 border-b border-white/10'
              : 'bg-brand-black/80 border-b border-white/10'
            : 'bg-transparent'
      } ${isMobileMenuOpen ? '' : 'backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="z-[70]">
            <img
              src={viukonLogo}
              alt="Viukon"
              className="h-8 md:h-10 w-auto object-contain group-hover:scale-105 transition-transform"
              style={isMobileMenuOpen ? { filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.6)) drop-shadow(0 0 12px rgba(0,0,0,0.4))' } : {}}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-tight uppercase text-[11px] absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-all relative py-1 whitespace-nowrap ${
                  location.pathname === item.path
                    ? 'text-brand-yellow'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-yellow rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right side CTA + mobile menu button */}
          <div className="flex items-center gap-4 z-[70]">
            <Link
              to="/contact"
              className="hidden sm:flex glass-button-yellow hover:bg-brand-yellow/20 text-brand-yellow px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest items-center gap-2 transition-all group border-brand-yellow/20"
            >
              Let's Talk
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-colors ${
                isMobileMenuOpen ? 'text-brand-black' : 'text-white'
              }`}
              aria-label="Toggle Menu"
            >
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[55] md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-brand-yellow"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-white/10 blur-[100px] pointer-events-none"></div>

        <div className="relative h-full flex flex-col justify-center px-10 gap-8 pt-20">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-4xl sm:text-6xl font-black tracking-tighter text-brand-black/60 hover:text-brand-black transition-transform`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-10 transition-all duration-500 delay-500">
            <Link
              to="/contact"
              className="w-full bg-brand-black text-brand-yellow py-6 rounded-3xl font-black uppercase tracking-widest text-lg flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Get In Touch
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
