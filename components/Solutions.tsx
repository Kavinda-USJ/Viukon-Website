import React, { useState, useEffect } from 'react';
import { Project } from '../App';

interface SolutionsProps {
  works: Project[];
}

export const Solutions: React.FC<SolutionsProps> = ({ works }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Social Media', 'Website', 'Ad Campaigns', 'Videography', 'AI Content', 'Branding'];

  // Filter projects based on selected category
  const filteredWorks = selectedCategory === 'All' 
    ? works 
    : works.filter(project => 
        project.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  // Disable body scroll when modal is open
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

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 space-y-4">
          <span className="text-brand-yellow font-black uppercase text-xs">Case Studies</span>
          <h2 className="text-5xl md:text-7xl font-black text-brand-black">
            Proof of <span className="text-brand-yellow">Performance</span>
          </h2>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-bold uppercase text-xs tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-brand-yellow text-brand-black shadow-lg scale-105'
                  : 'bg-gray-100 text-brand-black/60 hover:bg-gray-200 hover:text-brand-black border border-black/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredWorks.map((project) => (
            <div key={project.id} className="group">
              <div 
                className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-gray-100 cursor-pointer border border-black/5"
                onClick={() => setSelectedProject(project)}
              >
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                />
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <h4 className="text-2xl font-black text-brand-black group-hover:text-brand-yellow transition-colors">{project.title}</h4>
                  <p className="text-brand-black/30 text-xs font-bold uppercase mt-1">{project.category}</p>
                </div>
                
                {/* Arrow button */}
                <div 
                  className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-brand-yellow hover:border-brand-yellow transition-all cursor-pointer group/btn"
                  onClick={() => setSelectedProject(project)}
                >
                  <svg 
                    className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredWorks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brand-black/40 text-lg font-bold">No projects found in this category</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] bg-brand-black/95 backdrop-blur-xl"
          style={{ overflow: 'hidden' }}
        >
          <div 
            className="fixed inset-0 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <div className="min-h-screen flex items-center justify-center p-6">
              <div 
                className="relative w-full max-w-5xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-[48px] overflow-hidden shadow-2xl my-8"
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
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent"></div>
                  
                  <div className="absolute top-6 left-6 flex gap-2 flex-wrap">
                    {selectedProject.tags?.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-4 py-2 bg-brand-black/80 backdrop-blur-xl border border-brand-yellow/30 rounded-full text-brand-yellow text-[10px] font-black uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative p-8 md:p-12 space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                      {selectedProject.title}
                    </h2>
                    <div className="h-1 w-24 bg-brand-yellow rounded-full"></div>
                  </div>

                  <div>
                    <span className="inline-block px-6 py-2 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full text-brand-yellow font-black uppercase tracking-widest text-xs">
                      {selectedProject.category}
                    </span>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <p className="text-white/80 text-lg leading-relaxed font-medium">
                      {selectedProject.description || 'This project showcases our expertise in delivering exceptional digital solutions.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};