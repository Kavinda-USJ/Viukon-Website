
import React from 'react';

interface FooterProps {
  setPage: (page: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ setPage }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-black border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <button onClick={() => setPage('home')} className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center font-bold text-brand-black text-2xl group-hover:scale-110 transition-transform">V</div>
              <span className="text-3xl font-black tracking-tighter text-white">viukon</span>
            </button>
            <p className="text-white/40 max-w-sm leading-relaxed text-sm">
              We are a premier digital marketing agency dedicated to helping visionary brands scale their impact through data-driven creativity.
            </p>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></span>
               <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Ops Status: Live</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><button onClick={() => setPage('about')} className="hover:text-brand-yellow transition-colors">About Viukon</button></li>
              <li><button onClick={() => setPage('services')} className="hover:text-brand-yellow transition-colors">Core Services</button></li>
              <li><button onClick={() => setPage('team')} className="hover:text-brand-yellow transition-colors">Team</button></li>
             
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Solutions</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><button onClick={() => setPage('portfolio')} className="hover:text-brand-yellow transition-colors">Portfolio</button></li>
              <li><button onClick={() => setPage('services')} className="hover:text-brand-yellow transition-colors">Content Strategy</button></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><button onClick={() => setPage('contact')} className="hover:text-brand-yellow transition-colors">Contact Support</button></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-6">
            <span>© {currentYear} Viukon Agency LLC.</span>
            <span>All rights reserved.</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
