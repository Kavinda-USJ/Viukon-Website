import React, { useState, useEffect, useRef } from 'react';

interface HeroProps {
  data: {
    title: string;
    carouselWords: string[];
  };
  setPage: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ data, setPage }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data.carouselWords.length) return;
    
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % data.carouselWords.length);
    }, 5000);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      
      const x = ((clientX - left) / width - 0.5) * 2;
      const y = ((clientY - top) / height - 0.5) * 2;
      
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [data.carouselWords.length]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden w-full bg-brand-black"
      style={{ perspective: '1200px' }}
    >
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg) translateZ(0)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.15] blur-[180px]"
          style={{ background: 'radial-gradient(circle at 50% 50%, #854D0E 0%, transparent 60%)', transform: 'translateZ(-200px)', animation: 'pulse-depth 12s ease-in-out infinite' }}></div>
        <div className="absolute top-[15%] left-[10%] w-[60%] h-[60%] rounded-full opacity-[0.25] blur-[140px] transition-all duration-1000"
          style={{ background: 'radial-gradient(circle, #EAB308 0%, transparent 70%)', transform: `translate3d(${mousePos.x * 60}px, ${mousePos.y * 60}px, 100px)` }}></div>
        <div className="absolute bottom-[10%] right-[5%] w-[50%] h-[50%] rounded-full opacity-[0.18] blur-[160px] transition-all duration-1000"
          style={{ background: 'radial-gradient(circle, #CA8A04 0%, transparent 70%)', transform: `translate3d(${mousePos.x * -40}px, ${mousePos.y * -40}px, -50px)` }}></div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
        <div className="space-y-12">
          <div className="flex flex-col items-center space-y-8">
            <div className="flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-2xl animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-brand-yellow shadow-[0_0_12px_#EAB308] animate-pulse"></span>
              <span className="text-[10px] md:text-[11px] font-black text-white/60 tracking-[0.5em] uppercase">Viukon Excellence</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[100px] font-black leading-[0.85] tracking-[-0.07em] text-white flex flex-col items-center select-none">
              <div className="reveal-wrapper">
                <span className="reveal-text animate-reveal-text opacity-90">{data.title}</span>
              </div>
              <div className="relative h-[1.1em] overflow-visible flex items-center justify-center w-full my-4">
                 {data.carouselWords.length > 0 && (
                   <span key={wordIndex} className="text-brand-yellow drop-shadow-[0_0_40px_rgba(234,179,8,0.4)] animate-smoke-text inline-block">
                      {data.carouselWords[wordIndex]}
                   </span>
                 )}
              </div>
            </h1>
            
            <p className="max-w-2xl mx-auto text-base md:text-xl text-white/40 leading-relaxed font-medium animate-fade-up" style={{ animationDelay: '0.4s' }}>
              Transforming visionary concepts into market-dominating digital reality. Data-backed strategies, provocative creative.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={() => setPage('contact')}
              className="glass-button-yellow px-14 py-6 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-brand-yellow hover:text-brand-black transition-all hover:scale-110 active:scale-95 border border-brand-yellow/30 shadow-[0_0_50px_rgba(234,179,8,0.2)] group"
            >
              Start Project
              <span className="inline-block ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </button>
            <button 
              onClick={() => setPage('about')}
              className="px-14 py-6 bg-white/5 text-white/70 rounded-full font-black text-sm uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all"
            >
              Our Vision
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes smoke {
          0% { filter: blur(20px); opacity: 0; transform: translateY(30px) scale(0.85); letter-spacing: 0.3em; }
          20% { filter: blur(0); opacity: 1; transform: translateY(0) scale(1); letter-spacing: normal; }
          80% { filter: blur(0); opacity: 1; transform: translateY(0) scale(1); letter-spacing: normal; }
          100% { filter: blur(30px); opacity: 0; transform: translateY(-40px) scale(1.15); letter-spacing: 0.2em; }
        }
        .animate-smoke-text { animation: smoke 5s ease-in-out forwards; }
        @keyframes pulse-depth {
          0%, 100% { transform: translateZ(-200px) scale(1); opacity: 0.15; }
          50% { transform: translateZ(-220px) scale(1.1); opacity: 0.25; }
        }
      `}</style>
    </section>
  );
};