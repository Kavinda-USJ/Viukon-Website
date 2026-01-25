import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="bg-white pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-brand-yellow font-black uppercase tracking-[0.3em] text-xs">Our Heritage</span>
              <h1 className="text-6xl md:text-8xl font-black text-brand-black leading-none tracking-tighter">
                Crafting <br />Digital <br /><span className="text-brand-yellow">Legacies</span>
              </h1>
            </div>
            <p className="text-xl text-brand-black/60 leading-relaxed max-w-lg font-medium">
              Founded in London, Viukon was born from a simple realization: the digital landscape isn't just about presence—it's about dominance through data and design.
            </p>
            <div className="flex gap-12 pt-6">
              <div>
                <div className="text-4xl font-black text-brand-black">12+</div>
                <div className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest mt-2">Years Exp</div>
              </div>
              <div>
                <div className="text-4xl font-black text-brand-black">200+</div>
                <div className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest mt-2">Global Awards</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-brand-gray rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover" 
                alt="Office"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-button p-8 rounded-2xl bg-white shadow-xl border border-black/5 hidden md:block z-20">
              <p className="text-brand-black font-bold italic text-lg italic">"We don't just follow trends. We define the velocity of digital change."</p>
              <p className="text-brand-black/40 text-xs font-black uppercase mt-4 tracking-widest">— Alex Thorne, Founder</p>
            </div>
          </div>
        </div>

        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-brand-black">The Vision</h3>
            <p className="text-brand-black/50 leading-relaxed text-sm">To become the world's most influential growth accelerator for brands that refuse to be ordinary.</p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-brand-black">The Mission</h3>
            <p className="text-brand-black/50 leading-relaxed text-sm">Empowering partners with cutting-edge analytics and provocative creative strategies that drive ROI.</p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-brand-black">The Culture</h3>
            <p className="text-brand-black/50 leading-relaxed text-sm">A collective of misfits, masters, and makers unified by a relentless pursuit of excellence.</p>
          </div>
        </div>
      </div>
    </div>
  );
};