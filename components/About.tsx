import React from 'react';

interface AboutProps {
  aboutData: {
    yearsExperience: number;
    partnerPrograms: number;
    teamImage: string;
  };
}

export const About: React.FC<AboutProps> = ({ aboutData }) => {
  const partners = [
    { 
      name: 'viulabs', 
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      description: 'Innovation Lab',
      link: 'https://viulabs.viukon.com'
    },
    { 
      name: 'aboutsl', 
      image: 'https://www.orienthotelsl.com/wp-content/uploads/2023/01/Nine-Arch-Bridge-Ella-1200x630-1.jpg',
      description: 'Sri Lanka Tourism',
      link: 'https://aboutsl.viukon.com'
    },
    { 
      name: 'suwayak', 
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
      description: 'Business Growth',
      link: '#'
    },
    { 
      name: 'viukon studio', 
      image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&q=80&w=800',
      description: 'Creative Studio',
      link: '#'
    }
  ];

  const handlePartnerClick = (link: string) => {
    if (link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

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
              Founded in Sri Lanka, Viukon was born from a simple realization: the digital landscape isn't just about presence—it's about dominance through data and design.
            </p>
            
            {/* Stats - Using data from admin panel */}
            <div className="flex gap-12 pt-6">
              <div>
                <div className="text-4xl font-black text-brand-black">{aboutData.yearsExperience || 5}+</div>
                <div className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest mt-2">Years Exp</div>
              </div>
              <div>
                <div className="text-4xl font-black text-brand-black">{aboutData.partnerPrograms || 5}+</div>
                <div className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest mt-2">Partner Programs</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-brand-gray rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={aboutData.teamImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200'} 
                className="w-full h-full object-cover" 
                alt="Viukon Team"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-button p-8 rounded-2xl bg-white shadow-xl border border-black/5 hidden md:block z-20">
              <p className="text-brand-black font-bold italic text-lg">"We don't just follow trends. We define the velocity of digital change."</p>
              <p className="text-brand-black/40 text-xs font-black uppercase mt-4 tracking-widest">— Viukon Team</p>
            </div>
          </div>
        </div>

        {/* Partner Programs Section - BETWEEN STATS AND VISION/MISSION */}
        <div className="mt-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-yellow font-black uppercase tracking-[0.3em] text-xs">Our Ecosystem</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-black tracking-tighter">
              Partner <span className="text-brand-yellow">Programs</span>
            </h2>
          </div>

          {/* Partner Cards with Professional Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div 
                key={partner.name}
                onClick={() => handlePartnerClick(partner.link)}
                className="group relative bg-white border border-black/5 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                {/* Professional Image Background */}
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={partner.image} 
                    alt={partner.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent"></div>
                  
                  {/* Number badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                    <span className="text-white font-black text-sm">0{index + 1}</span>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                    <p className="text-brand-yellow text-[10px] font-black uppercase tracking-widest">{partner.description}</p>
                    <h3 className="text-2xl font-black text-white capitalize">
                      {partner.name}
                    </h3>
                  </div>
                </div>

                {/* Arrow button at bottom */}
                <div className="p-4 bg-white border-t border-black/5 flex justify-between items-center">
                  <span className="text-brand-black/40 text-xs font-bold uppercase tracking-wider">
                    {partner.link !== '#' ? 'Visit Site' : 'Explore'}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-black/10 group-hover:border-brand-yellow group-hover:bg-brand-yellow flex items-center justify-center transition-all">
                    <svg 
                      className="w-5 h-5 text-brand-black/40 group-hover:text-brand-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </div>
                </div>

                {/* Yellow accent line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision, Mission, Culture - AFTER PARTNER PROGRAMS */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-brand-black">The Vision</h3>
            <p className="text-brand-black/50 leading-relaxed text-sm">To become the world's most influential growth accelerator for brands that refuse to be ordinary.</p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-black">The Mission</h3>
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