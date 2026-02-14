import React, { useEffect, useRef, useState, useCallback } from 'react';

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

const processSteps = [
  {
    num: '01',
    title: 'Discovery & Analysis',
    desc: 'We start by understanding your business needs, target audience, and goals through comprehensive research and stakeholder interviews.'
  },
  {
    num: '02',
    title: 'Strategy & Planning',
    desc: 'Our team develops a tailored digital marketing strategy with clear milestones, campaign architecture, and success metrics.'
  },
  {
    num: '03',
    title: 'Content & Creative',
    desc: 'We create compelling content and campaigns using industry best practices, ensuring optimal performance and engagement.'
  },
  {
    num: '04',
    title: 'Launch & Activate',
    desc: 'Seamless deployment across all digital channels with comprehensive testing, tracking, and real-time optimization.'
  },
  {
    num: '05',
    title: 'Optimize & Scale',
    desc: 'Continuous monitoring, performance optimization, and iterative improvements to maximize ROI and value delivery.'
  }
];

const DOT_SIZE = 64;
const HALF_DOT = DOT_SIZE / 2;
// Slow & smooth: 7s travel, 2s pause at dot-5, then restart
const TRAVEL_MS = 7000;
const PAUSE_MS  = 2000;
const CYCLE_MS  = TRAVEL_MS + PAUSE_MS;

export const Services: React.FC = () => {
  const [visibleItems, setVisibleItems]       = useState<number[]>([]);
  const [headerVisible, setHeaderVisible]     = useState(false);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [progress, setProgress]               = useState(0); // 0‒1 eased
  const [dotCentres, setDotCentres]           = useState<number[]>([]); // px from grid left

  const itemRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef   = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const dotRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const animRef     = useRef<number | null>(null);
  const startRef    = useRef<number | null>(null);
  const measuredRef = useRef(false);

  // Measure the centre of every dot relative to the grid container
  const measureDots = useCallback(() => {
    if (!gridRef.current) return;
    const gridLeft = gridRef.current.getBoundingClientRect().left;
    const centres = dotRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.left - gridLeft + r.width / 2;
    });
    if (centres.some((c) => c > 0)) {
      setDotCentres(centres);
      measuredRef.current = true;
    }
  }, []);

  useEffect(() => {
    // Measure after a paint so layout is complete
    const id = requestAnimationFrame(measureDots);
    window.addEventListener('resize', measureDots);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', measureDots);
    };
  }, [measureDots]);

  // Service card intersection
  useEffect(() => {
    const opts = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
          if (idx !== -1) setVisibleItems((prev) => prev.includes(idx) ? prev : [...prev, idx]);
        }
      });
    }, opts);
    const hObs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setHeaderVisible(true); }, opts
    );
    if (headerRef.current) hObs.observe(headerRef.current);
    itemRefs.current.forEach((r) => r && obs.observe(r));
    return () => {
      itemRefs.current.forEach((r) => r && obs.unobserve(r));
      if (headerRef.current) hObs.unobserve(headerRef.current);
    };
  }, []);

  // Timeline visibility
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimelineVisible(true);
          // Re-measure dots once timeline is visible
          requestAnimationFrame(measureDots);
        }
      },
      { threshold: 0.2 }
    );
    if (timelineRef.current) obs.observe(timelineRef.current);
    return () => { if (timelineRef.current) obs.unobserve(timelineRef.current); };
  }, [measureDots]);

  // Animation loop — runs once timelineVisible is true
  useEffect(() => {
    if (!timelineVisible) return;

    const animate = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = (ts - startRef.current) % CYCLE_MS;

      let p: number;
      if (elapsed <= TRAVEL_MS) {
        const t = elapsed / TRAVEL_MS; // 0 → 1
        // ease-in-out cubic
        p = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      } else {
        p = 1; // pause phase — clamp at 1
      }

      setProgress(p);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [timelineVisible]);

  // Derive pixel positions from measured dot centres
  const firstCentre = dotCentres[0] ?? 0;
  const lastCentre  = dotCentres[dotCentres.length - 1] ?? 0;
  const trackWidth  = lastCentre - firstCentre;
  // ballX: pixel offset from grid left, interpolated between dot-0 and dot-4 centres
  const ballX       = firstCentre + trackWidth * progress;
  const fillWidth   = trackWidth * progress;

  const hasMeasured = dotCentres.length === 5 && trackWidth > 0;

  return (
    <>
      {/* ── FEATURED SERVICES ── */}
      <section className="pt-32 pb-16 bg-brand-black w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div
            ref={headerRef}
            className={`max-w-3xl mx-auto mb-16 space-y-4 text-center transition-all duration-1000 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <span className="text-brand-yellow font-black uppercase tracking-[0.4em] text-[10px]">What we do</span>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter relative inline-block">
              Featured <br />
              <span className="text-brand-yellow relative">
                Services
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-yellow/40" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <path d="M4 8C40 2 160 2 196 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-path" />
                </svg>
              </span>
            </h2>
            <p className="text-white/40 text-lg mx-auto max-w-xl font-medium pt-4">
              We provide specialized digital solutions that integrate data intelligence with provocative creative strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((item, index) => (
              <div
                key={item.num}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`group p-10 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-brand-yellow/30 transition-all duration-700 hover:-translate-y-2 ${
                  visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: visibleItems.includes(index) ? `${index * 150}ms` : '0ms' }}
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
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="pt-10 pb-32 bg-brand-black" ref={timelineRef}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-16 space-y-4 text-center">
            <span className="text-brand-yellow font-black uppercase text-xs tracking-wider">How We Work</span>
            <h2 className="text-5xl md:text-7xl font-black text-white">
              From Concept to <span className="text-brand-yellow">Deployment</span>
            </h2>
            <p className="text-white/60 text-lg max-w-3xl mx-auto">
              At Viukon, we follow a structured yet flexible approach that transforms digital concepts into production-ready solutions.
            </p>
          </div>

          {/* ── Outer relative container, measured by gridRef ── */}
          <div className="relative" ref={gridRef}>

            {/* Grey track — from dot-0 centre to dot-4 centre, px-precise */}
            {hasMeasured && (
              <div
                className="hidden lg:block absolute h-[2px] bg-white/10 pointer-events-none z-0"
                style={{
                  top:   `${HALF_DOT}px`,
                  left:  `${firstCentre}px`,
                  width: `${trackWidth}px`,
                }}
              >
                {/* Yellow fill grows with ball — pixel width, never overshoots */}
                <div
                  className="absolute left-0 top-0 h-full bg-brand-yellow/40"
                  style={{ width: `${fillWidth}px` }}
                />
              </div>
            )}

            {/* Ball — pixel-positioned on grid, centred exactly on ballX */}
            {timelineVisible && hasMeasured && (
              <div
                className="hidden lg:block absolute pointer-events-none z-20"
                style={{
                  top:  `${HALF_DOT - 20}px`,  /* 20 = half of 40px outer ring */
                  left: `${ballX    - 20}px`,  /* 20 = half of 40px outer ring */
                }}
              >
                <div className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center animate-pulse-slow">
                  <div className="w-7 h-7 rounded-full bg-brand-yellow/40 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-brand-yellow shadow-[0_0_12px_4px_rgba(234,179,8,0.7)]" />
                  </div>
                </div>
              </div>
            )}

            {/* Steps grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
              {processSteps.map((step, index) => {
                const centre = dotCentres[index] ?? 0;
                // lit when ball has reached (or passed) this dot's centre
                const isLit  = hasMeasured && ballX >= centre - 1;

                return (
                  <div key={step.num} className="relative">

                    {/* Dot — ref measured after mount */}
                    <div
                      ref={(el) => { dotRefs.current[index] = el; }}
                      className={`hidden lg:flex absolute top-0 left-0 rounded-full border-4 border-brand-black items-center justify-center z-10 transition-all duration-500 ${
                        isLit
                          ? 'bg-brand-yellow shadow-[0_0_20px_6px_rgba(234,179,8,0.45)] scale-110'
                          : 'bg-white/10'
                      }`}
                      style={{ width: `${DOT_SIZE}px`, height: `${DOT_SIZE}px` }}
                    >
                      <span className={`font-black text-base transition-colors duration-300 ${isLit ? 'text-brand-black' : 'text-white/30'}`}>
                        {step.num}
                      </span>
                    </div>

                    {/* Mobile number */}
                    <div className="lg:hidden mb-4">
                      <span className="text-6xl font-black text-brand-yellow/20">{step.num}</span>
                    </div>

                    {/* Text content */}
                    <div
                      className={`lg:pt-20 pt-0 transition-all duration-700 ${
                        timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${index * 120}ms` }}
                    >
                      <h3 className={`text-xl font-black mb-3 transition-colors duration-500 ${isLit ? 'text-white' : 'text-white/50'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors duration-500 ${isLit ? 'text-white/60' : 'text-white/25'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      <style>{`
        .animate-path {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw-path 2s ease-out forwards;
        }
        @keyframes draw-path {
          to { stroke-dashoffset: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.15); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 1.6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};