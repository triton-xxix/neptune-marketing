import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check, Shield, FileText, Clock, BarChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyNeptuneSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Trust bullets animation
      const bullets = trustRef.current?.querySelectorAll('.trust-bullet');
      if (bullets) {
        bullets.forEach((bullet, index) => {
          gsap.fromTo(
            bullet,
            { x: '4vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.4,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: bullet,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const trustPoints = [
    { icon: Shield, text: 'UK-based team' },
    { icon: FileText, text: 'Data protection conscious' },
    { icon: Clock, text: 'No long-term contracts' },
    { icon: BarChart, text: 'Transparent weekly reporting' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0B0F1C]"
    >
      {/* Light ray overlay */}
      <div
        className="absolute inset-0 pointer-events-none light-ray"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(46, 195, 229, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
          {/* Left: Comparison */}
          <div ref={contentRef} className="w-full lg:w-1/2">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F7FB] mb-10 tracking-[-0.02em]"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Why Neptune
            </h2>

            {/* Comparison */}
            <div className="space-y-6">
              {/* Traditional */}
              <div className="glass-card rounded-xl p-5 border-l-4 border-l-[#A9B3C5]/30">
                <div className="flex items-center gap-3 mb-2">
                  <X size={18} className="text-[#A9B3C5]" />
                  <span className="font-semibold text-[#A9B3C5]">
                    Traditional agencies
                  </span>
                </div>
                <p className="text-[#A9B3C5]/80 ml-7">
                  Retainers, long contracts, slow ramp.
                </p>
              </div>

              {/* Neptune */}
              <div className="glass-card rounded-xl p-5 border-l-4 border-l-[#2EC3E5]">
                <div className="flex items-center gap-3 mb-2">
                  <Check size={18} className="text-[#2EC3E5]" />
                  <span className="font-semibold text-[#F4F7FB]">Neptune</span>
                </div>
                <p className="text-[#A9B3C5] ml-7">
                  Performance-based, fast setup, aligned incentives.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Trust Points */}
          <div ref={trustRef} className="w-full lg:w-1/2 lg:pt-20">
            <div className="space-y-4">
              {trustPoints.map((point, index) => (
                <div
                  key={index}
                  className="trust-bullet flex items-center gap-4 p-4 rounded-xl bg-[#111827]/60 border border-[#F4F7FB]/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2EC3E5]/10 flex items-center justify-center flex-shrink-0">
                    <point.icon size={20} className="text-[#2EC3E5]" />
                  </div>
                  <span className="text-[#F4F7FB] font-medium">{point.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNeptuneSection;
