import React from 'react';
import { TeamMember } from '../App';

interface AboutProps {
  aboutData: {
    yearsExperience: number;
    partnerPrograms: number;
    teamImage: string;
  };
  teamMembers: TeamMember[];
}

export const About: React.FC<AboutProps> = ({ aboutData, teamMembers }) => {
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

        {/* Vision, Mission, Culture */}
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

        {/* Team Members Section */}
        <div className="mt-32">
          <div className="text-center mb-24 space-y-4">
            <span className="text-brand-yellow font-black uppercase tracking-[0.3em] text-xs">The Minds</span>
            <h2 className="text-5xl md:text-7xl font-black text-brand-black tracking-tighter">
              Architects of <span className="text-brand-yellow">Impact</span>
            </h2>
            <p className="text-brand-black/40 max-w-xl mx-auto font-medium">
              Our team is a fusion of analytical rigour and unbridled creativity, dedicated to solving your most complex digital challenges.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {teamMembers.map((member) => (
              <div key={member.id} className="group flex flex-col items-center">
                {/* Round Image Container */}
                <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-gray-100 group-hover:border-brand-yellow/30 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-brand-yellow/20 relative bg-gray-50">
                <img 
  src={member.img} 
  alt={member.name} 
  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-yellow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                {/* Member Info */}
                <div className="text-center">
                  <h4 className="text-lg font-black text-brand-black group-hover:text-brand-yellow transition-colors">{member.name}</h4>
                  <p className="text-brand-black/50 font-bold text-[10px] uppercase tracking-widest mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-40 bg-brand-black rounded-[40px] p-12 md:p-20 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-brand-yellow/5 animate-pulse"></div>
            <h3 className="text-3xl md:text-5xl font-black text-white relative z-10">Join the Collective</h3>
            <p className="text-white/40 mt-6 max-w-xl mx-auto relative z-10">We're always looking for visionary talent to help us redefine the digital frontier.</p>
            <button className="mt-10 px-10 py-5 bg-brand-yellow text-brand-black rounded-full font-black uppercase tracking-widest text-sm relative z-10 hover:scale-105 transition-transform">
              View Openings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};