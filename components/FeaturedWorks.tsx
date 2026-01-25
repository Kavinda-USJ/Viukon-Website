import React, { useState } from 'react';
import { Project } from '../App';

interface FeaturedWorksProps {
  works: Project[];
}

export const FeaturedWorks: React.FC<FeaturedWorksProps> = ({ works }) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <section className="py-24 bg-brand-black w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <span className="text-brand-yellow font-black uppercase tracking-[0.4em] text-[10px] animate-fade-up">Recent Works</span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter inline-block relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Featured <span className="text-brand-yellow relative">
              Impact
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-yellow/40" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M4 8C40 2 160 2 196 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-path" />
              </svg>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {works.map((work, index) => {
            const isExpanded = expandedProject === work.id;
            
            return (
              <div 
                key={work.id} 
                className="group relative animate-fade-up"
                style={{ animationDelay: `${0.4 + (index * 0.2)}s` }}
              >
                <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-white/5 border border-white/10">
                  <img 
                    src={work.img} 
                    alt={work.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-black/20 transition-colors pointer-events-none"></div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex gap-2">
                        {work.tags?.map(tag => (
                          <span key={tag} className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-3xl font-black text-white group-hover:text-brand-yellow transition-colors">{work.title}</h3>
                      <p className="text-sm text-white/40 font-bold uppercase tracking-widest">{work.category}</p>
                    </div>
                    
                    <button 
                      onClick={() => toggleExpand(work.id)}
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                        isExpanded 
                          ? 'bg-brand-yellow text-brand-black border-brand-yellow rotate-90' 
                          : 'border-white/10 text-white hover:bg-brand-yellow hover:text-brand-black hover:border-brand-yellow'
                      }`}
                      aria-label={isExpanded ? "Hide description" : "Show description"}
                    >
                      <svg 
                        className={`w-6 h-6 transition-transform ${isExpanded ? '' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </button>
                  </div>

                  {/* Expandable Description */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                      <p className="text-white/70 text-sm leading-relaxed">
                        {work.description || 'No description available for this project.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .animate-path { stroke-dasharray: 200; stroke-dashoffset: 200; animation: draw-path 2s ease-out forwards; }
        @keyframes draw-path { to { stroke-dashoffset: 0; } }
      `}</style>
    </section>
  );
};

