
import React from 'react';

const services = [
  {
    num: '01',
    title: 'Brand Growth',
    desc: 'Engineering distinctive visual languages and strategic positioning for world-class brands.',
    tags: ['Identity', 'Consulting']
  },
  {
    num: '02',
    title: 'Digital Systems',
    desc: 'High-performance web and mobile ecosystems designed for seamless user interaction.',
    tags: ['Web', 'Mobile']
  },
  {
    num: '03',
    title: 'Performance',
    desc: 'Data-driven SEO and paid media strategies that deliver consistent, scalable ROI.',
    tags: ['SEO', 'ADS']
  },
  {
    num: '04',
    title: 'Content Lab',
    desc: 'Provocative visual narratives and high-fidelity assets that captivate global audiences.',
    tags: ['Video', 'Graphics']
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-32 bg-brand-black w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto mb-24 space-y-4 text-center">
          <span className="text-brand-yellow font-black uppercase tracking-[0.4em] text-[10px] animate-fade-up">What we do</span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter relative inline-block animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Featured <br />
            <span className="text-brand-yellow relative">
              Services
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-yellow/40" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M4 8C40 2 160 2 196 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-path" />
              </svg>
            </span>
          </h2>
          <p className="text-white/40 text-lg mx-auto max-w-xl font-medium pt-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            We provide specialized digital solutions that integrate data intelligence with provocative creative strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((item, index) => (
            <div 
              key={item.num} 
              className="group p-10 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-brand-yellow/30 transition-all duration-500 hover:-translate-y-2 animate-fade-up"
              style={{ animationDelay: `${0.6 + (index * 0.1)}s` }}
            >
              <div className="flex justify-between items-start mb-16">
                <span className="text-5xl font-black text-white/5 group-hover:text-brand-yellow/10 transition-colors">{item.num}</span>
                <div className="flex flex-col items-end gap-1">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black text-brand-yellow uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-4 group-hover:text-brand-yellow transition-colors">{item.title}</h3>
              <p className="text-white/40 leading-relaxed text-sm font-medium">{item.desc}</p>
              
              <div className="mt-8 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <button className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest hover:text-brand-yellow transition-colors">
                  Explore Service
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            </div>
          ))}
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
