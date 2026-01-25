
import React from 'react';

export const Stats: React.FC = () => {
  return (
    <section className="py-24 bg-brand-black border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-yellow/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center gap-12">
          <div className="max-w-2xl space-y-6">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              Making it <span className="text-brand-yellow relative">
                Real
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-yellow/40" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <path d="M4 8C40 2 160 2 196 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-path" />
                </svg>
              </span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed font-medium">
              Every campaign represents a real business challenge solved. From high-performance SEO to innovative brand redesigns, our data-backed solutions work quietly in the background, driving measurable results.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-8xl md:text-[10rem] font-black text-white flex items-start gap-2 leading-none">
              500<span className="text-brand-yellow text-5xl md:text-7xl mt-4">+</span>
            </div>
            <p className="text-sm font-bold text-white/40 uppercase tracking-[0.4em] mt-8">
              Successful Projects Delivered
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
