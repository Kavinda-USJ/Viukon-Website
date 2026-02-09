import React from 'react';

export const Team: React.FC = () => {
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
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-brand-yellow font-black uppercase tracking-[0.3em] text-xs">Our Ecosystem</span>
          <h2 className="text-5xl md:text-7xl font-black text-brand-black tracking-tighter">
            Our <span className="text-brand-yellow">Products</span>
          </h2>
          <p className="text-brand-black/40 max-w-xl mx-auto font-medium">
            Explore our innovative product portfolio designed to transform digital experiences.
          </p>
        </div>

        {/* Product Cards with Professional Images */}
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
  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
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
    </section>
  );
};