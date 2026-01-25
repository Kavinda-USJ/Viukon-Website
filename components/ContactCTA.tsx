
import React from 'react';

interface ContactProps {
  isFullPage?: boolean;
  setPage?: (page: any) => void;
  contact: {
    email: string;
    address: string;
  };
}

export const ContactCTA: React.FC<ContactProps> = ({ isFullPage = false, setPage, contact }) => {
  return (
    <section className={`bg-brand-black relative overflow-hidden ${isFullPage ? 'min-h-screen flex items-center pt-32' : 'py-32'}`}>
      <div className={`absolute inset-0 z-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center ${isFullPage ? 'opacity-10' : ''}`}>
         <img 
            src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
            alt="map" 
            className="w-full h-auto scale-125 invert"
         />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {isFullPage ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
               <span className="px-4 py-2 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full text-xs font-black text-brand-yellow uppercase tracking-widest">
                 Connect
               </span>
               <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
                 Start Your <br /><span className="text-brand-yellow">Project</span>
               </h1>
               <p className="text-white/40 text-xl leading-relaxed max-w-md font-medium">
                 Ready to dominate your market? Drop us a line and our strategy leads will get back to you within 24 hours.
               </p>
               <div className="space-y-6 pt-10">
                  <div className="flex items-center gap-4 text-white/60">
                     <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-yellow">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </div>
                     <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Email Us</div>
                        <div className="text-white font-bold">{contact.email}</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 text-white/60">
                     <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-yellow">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </div>
                     <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Visit Us</div>
                        <div className="text-white font-bold">{contact.address}</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 md:p-12">
               <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Full Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors" placeholder="John Doe" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Email</label>
                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors" placeholder="john@example.com" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Subject</label>
                     <select className="w-full bg-brand-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors appearance-none">
                        <option>Brand Identity</option>
                        <option>SEO Strategy</option>
                        <option>Performance Marketing</option>
                        <option>Other</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Message</label>
                     <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors" placeholder="Tell us about your project..."></textarea>
                  </div>
                  <button className="w-full bg-brand-yellow text-brand-black py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
                     Send Message
                  </button>
               </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="mb-8">
               <span className="px-4 py-2 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full text-[10px] font-black text-brand-yellow uppercase tracking-widest">
                 Let's Connect
               </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-10 max-w-4xl leading-[1.1] tracking-tighter">
              Let's <span className="text-brand-yellow italic">Transform</span> <br />
              Future Marketing Together
            </h2>
            
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button 
                onClick={() => setPage && setPage('contact')}
                className="glass-button-yellow px-10 py-5 bg-brand-yellow/10 text-brand-yellow rounded-full font-black text-lg hover:bg-brand-yellow hover:text-brand-black transition-all flex items-center gap-3 group border-brand-yellow/30"
              >
                Contact Us Today
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
