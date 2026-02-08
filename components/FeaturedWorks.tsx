import React, { useState, useEffect } from 'react';
import { Project } from '../App';

interface FeaturedWorksProps {
  works: Project[];
}

export const FeaturedWorks: React.FC<FeaturedWorksProps> = ({ works }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter to show only featured projects (max 4)
  const featuredWorks = works.filter(work => work.featured).slice(0, 4);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedProject]);

  // If no featured projects, don't show the section
  if (featuredWorks.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <section className="py-12 bg-brand-black w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 space-y-4">
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
            {featuredWorks.map((work, index) => (
              <div 
                key={work.id} 
                className="group relative animate-fade-up"
                style={{ animationDelay: `${0.4 + (index * 0.2)}s` }}
              >
                <div 
                  className="aspect-[16/10] overflow-hidden rounded-3xl bg-white/5 border border-white/10 cursor-pointer"
                  onClick={() => setSelectedProject(work)}
                >
                  <img 
                    src={work.img} 
                    alt={work.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
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
                    
                    {work.link ? (
                      <a 
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-yellow hover:text-brand-black hover:border-brand-yellow transition-all flex-shrink-0 group/btn"
                      >
                        <svg 
                          className="w-6 h-6 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      </a>
                    ) : (
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 transition-all flex-shrink-0">
                        <svg 
                          className="w-6 h-6" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .animate-path { stroke-dasharray: 200; stroke-dashoffset: 200; animation: draw-path 2s ease-out forwards; }
          @keyframes draw-path { to { stroke-dashoffset: 0; } }
        `}</style>
      </section>

      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div className="absolute inset-0 bg-brand-black/95 backdrop-blur-2xl">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div 
            className="relative z-10 w-full max-w-5xl my-8 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-[48px] overflow-hidden shadow-2xl shadow-brand-yellow/10 animate-in zoom-in-90 slide-in-from-bottom-8 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-20 w-14 h-14 rounded-full bg-brand-yellow/10 hover:bg-brand-yellow backdrop-blur-xl border border-brand-yellow/30 hover:border-brand-yellow flex items-center justify-center text-brand-yellow hover:text-brand-black transition-all group hover:rotate-90 hover:scale-110"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative aspect-[21/9] overflow-hidden bg-brand-black">
              <img 
                src={selectedProject.img} 
                alt={selectedProject.title}
                className="w-full h-full object-cover animate-in zoom-in-95 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent"></div>
              
              <div className="absolute top-6 left-6 flex gap-2 flex-wrap animate-in slide-in-from-left duration-700 delay-200">
                {selectedProject.tags?.map((tag, i) => (
                  <span 
                    key={tag} 
                    className="px-4 py-2 bg-brand-black/80 backdrop-blur-xl border border-brand-yellow/30 rounded-full text-brand-yellow text-[10px] font-black uppercase tracking-widest animate-in fade-in duration-500"
                    style={{ animationDelay: `${300 + i * 100}ms` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative p-8 md:p-12 space-y-6 backdrop-blur-xl">
              <div className="space-y-3 animate-in slide-in-from-bottom duration-500 delay-300">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                  {selectedProject.title}
                </h2>
                <div className="h-1 w-24 bg-brand-yellow rounded-full animate-in slide-in-from-left duration-500 delay-500"></div>
              </div>

              <div className="animate-in fade-in duration-500 delay-400">
                <span className="inline-block px-6 py-2 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full text-brand-yellow font-black uppercase tracking-widest text-xs">
                  {selectedProject.category}
                </span>
              </div>

              <div className="pt-6 border-t border-white/10 animate-in slide-in-from-bottom duration-500 delay-500">
                <p className="text-white/80 text-lg leading-relaxed font-medium">
                  {selectedProject.description || 'This project showcases our expertise in delivering exceptional digital solutions.'}
                </p>
              </div>

              {selectedProject.link && (
                <div className="pt-4 animate-in slide-in-from-bottom duration-500 delay-600">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow text-brand-black rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all group"
                  >
                    View Live Project
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};