import React from 'react';

interface StatsProps {
  stats: {
    projects: number;
    clients: number;
    engagement: number;
  };
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <section className="py-24 bg-brand-black border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-yellow/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Making it <span className="text-brand-yellow relative">
              Real
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-yellow/40" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M4 8C40 2 160 2 196 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-path" />
              </svg>
            </span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed font-medium max-w-2xl mx-auto">
            Every campaign represents a real business challenge solved. From high-performance SEO to innovative brand redesigns, our data-backed solutions work quietly in the background, driving measurable results.
          </p>
        </div>

        {/* Stats Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Project Count */}
          <div className="relative group">
            <div className="flex flex-col items-center text-center space-y-6 p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-yellow/20 transition-all duration-500">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center backdrop-blur-xl">
                <svg className="w-8 h-8 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              
              <div className="pt-8">
                <div className="text-6xl md:text-7xl font-black text-white flex items-start justify-center gap-1 leading-none">
                  {stats.projects || 0}
                  <span className="text-brand-yellow text-3xl md:text-4xl mt-2">+</span>
                </div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-[0.3em] mt-6">
                  Projects Completed
                </p>
              </div>
              
              <div className="h-1 w-16 bg-brand-yellow/20 group-hover:bg-brand-yellow group-hover:w-24 transition-all duration-500 rounded-full"></div>
            </div>
          </div>

          {/* Client Count */}
          <div className="relative group">
            <div className="flex flex-col items-center text-center space-y-6 p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-yellow/20 transition-all duration-500">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center backdrop-blur-xl">
                <svg className="w-8 h-8 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              
              <div className="pt-8">
                <div className="text-6xl md:text-7xl font-black text-white flex items-start justify-center gap-1 leading-none">
                  {stats.clients || 0}
                  <span className="text-brand-yellow text-3xl md:text-4xl mt-2">+</span>
                </div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-[0.3em] mt-6">
                  Happy Clients
                </p>
              </div>
              
              <div className="h-1 w-16 bg-brand-yellow/20 group-hover:bg-brand-yellow group-hover:w-24 transition-all duration-500 rounded-full"></div>
            </div>
          </div>

          {/* Engagement Count */}
          <div className="relative group">
            <div className="flex flex-col items-center text-center space-y-6 p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-yellow/20 transition-all duration-500">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center backdrop-blur-xl">
                <svg className="w-8 h-8 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              
              <div className="pt-8">
                <div className="text-6xl md:text-7xl font-black text-white flex items-start justify-center gap-1 leading-none">
                  {stats.engagement || 0}
                  <span className="text-brand-yellow text-3xl md:text-4xl mt-2">+</span>
                </div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-[0.3em] mt-6">
                  Total Engagement
                </p>
              </div>
              
              <div className="h-1 w-16 bg-brand-yellow/20 group-hover:bg-brand-yellow group-hover:w-24 transition-all duration-500 rounded-full"></div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .animate-path { 
          stroke-dasharray: 200; 
          stroke-dashoffset: 200; 
          animation: draw-path 2s ease-out forwards; 
        }
        @keyframes draw-path { 
          to { stroke-dashoffset: 0; } 
        }
      `}</style>
    </section>
  );
};