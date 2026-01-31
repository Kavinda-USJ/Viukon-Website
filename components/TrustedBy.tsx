import React from 'react';

interface TrustedByProps {
  brands: string[];
}

export const TrustedBy: React.FC<TrustedByProps> = ({ brands }) => {
  // Duplicate brands array for seamless infinite loop
  const displayBrands = [...brands, ...brands];

  return (
    <section className="py-16 border-y border-white/5 bg-brand-black/50 overflow-hidden group">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase animate-fade-up">
          Trusted by Industry Leaders
        </p>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-24 py-4">
          {displayBrands.map((brand, index) => (
            <div 
              key={`${brand}-${index}`}
              className="text-2xl md:text-3xl font-black text-white/20 hover:text-brand-yellow transition-all duration-500 cursor-default select-none tracking-tighter"
            >
              {brand}
            </div>
          ))}
        </div>
        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-black to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-black to-transparent z-10"></div>
      </div>
    </section>
  );
};