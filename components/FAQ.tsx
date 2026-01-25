
import React, { useState } from 'react';

const faqData = [
  {
    question: "How long does a typical campaign setup take?",
    answer: "Our standard onboarding and discovery phase takes about 2 weeks. Execution of major campaigns usually begins within 30 days of project kickoff."
  },
  {
    question: "Do you offer custom pricing for small businesses?",
    answer: "We offer scalable packages tailored to specific growth stages. While we focus on high-impact projects, we have specialized tracks for ambitious startups."
  },
  {
    question: "What makes Viukon different from other agencies?",
    answer: "We blend data science with provocative creative strategy. Every decision is backed by analytics, ensuring your brand doesn't just look good, but delivers measurable ROI."
  },
  {
    question: "Which industries do you specialize in?",
    answer: "We have deep expertise in Tech, Luxury Retail, Finance, and Sustainable Energy, though our methodologies are designed for cross-industry scale."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-brand-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <span className="text-brand-yellow font-black uppercase tracking-[0.4em] text-[10px]">Intelligence</span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Common <span className="text-brand-yellow relative">
              Questions
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-yellow/40" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M4 8C40 2 160 2 196 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-path" />
              </svg>
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index}
              className={`border border-white/10 rounded-[2rem] transition-all duration-500 overflow-hidden ${openIndex === index ? 'bg-white/5 border-white/20' : 'hover:border-white/20'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-8 flex items-center justify-between text-left"
              >
                <span className={`text-lg md:text-xl font-black transition-colors ${openIndex === index ? 'text-brand-yellow' : 'text-white'}`}>
                  {item.question}
                </span>
                <span className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all ${openIndex === index ? 'rotate-180 bg-brand-yellow border-brand-yellow text-brand-black' : 'text-white/40'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-40 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-white/50 leading-relaxed font-medium">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
