import React from 'react';
import { TeamMember } from '../App';

interface TeamProps {
  members: TeamMember[];
}

export const Team: React.FC<TeamProps> = ({ members }) => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
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
          {members.map((member) => (
            <div key={member.id} className="group flex flex-col items-center">
              {/* Round Image Container */}
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-gray-100 group-hover:border-brand-yellow/30 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-brand-yellow/20 relative bg-gray-50">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
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
    </section>
  );
};