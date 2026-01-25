
import React from 'react';
import { Project } from '../App';

interface SolutionsProps {
  works: Project[];
}

export const Solutions: React.FC<SolutionsProps> = ({ works }) => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 space-y-4">
          <span className="text-brand-yellow font-black uppercase tracking-[0.3em] text-xs">Case Studies</span>
          <h2 className="text-5xl md:text-7xl font-black text-brand-black tracking-tighter">
            Proof of <span className="text-brand-yellow">Performance</span>
          </h2>
          <p className="text-brand-black/40 max-w-2xl font-medium text-lg">
            We don't just talk about growth. We engineer it. Explore our recent breakthroughs in digital dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {works.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative border border-black/5 bg-gray-100">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/10 transition-colors duration-500"></div>
                <div className="absolute top-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <span className="px-4 py-1.5 bg-brand-black text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="text-2xl font-black text-brand-black group-hover:text-brand-yellow transition-colors">{project.title}</h4>
                  <p className="text-brand-black/30 text-xs font-bold uppercase tracking-widest mt-1">Global Expansion 2024</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-all">
                   <svg className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
