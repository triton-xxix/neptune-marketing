import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefreshCw, Calendar, Database, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhatWeDoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftBlockRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      const headline = leftBlockRef.current?.querySelector('h2');
      const body = leftBlockRef.current?.querySelector('p');

      // ENTRANCE (0-30%)
      // Left headline
      if (headline) {
        scrollTl.fromTo(
          headline,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );
      }

      // Left body
      if (body) {
        scrollTl.fromTo(
          body,
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        );
      }

      // Right card
      scrollTl.fromTo(
        rightCardRef.current,
        { x: '55vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.06
      );

      // Bullets stagger
      const bullets = rightCardRef.current?.querySelectorAll('.bullet-item');
      if (bullets && bullets.length > 0) {
        scrollTl.fromTo(
          bullets,
          { x: '20vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.12
        );
      }

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        leftBlockRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightCardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.05, opacity: 0.7, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const capabilities = [
    { icon: RefreshCw, text: 'Re-engage unconverted leads' },
    { icon: Calendar, text: 'Book qualified appointments' },
    { icon: Database, text: 'Sync with your calendar & CRM' },
    { icon: TrendingUp, text: 'Performance-based pricing' },
  ];

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="section-pinned flex items-center"
      style={{ height: '100vh' }}
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/images/split-bg.jpg"
          alt="Underwater"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-7xl mx-auto">
          {/* Left Block */}
          <div
            ref={leftBlockRef}
            className="w-full lg:w-[38vw] text-center lg:text-left"
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F7FB] mb-6 leading-tight tracking-[-0.02em]"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              What we do
            </h2>
            <p className="text-lg text-[#A9B3C5] leading-relaxed">
              We turn dormant leads into booked calls—using polite, persistent
              AI follow-up via SMS and email.
            </p>
          </div>

          {/* Right Card */}
          <div
            ref={rightCardRef}
            className="w-full lg:w-[40vw] glass-card rounded-2xl p-6 lg:p-8"
          >
            <h3
              className="text-xl font-semibold text-[#F4F7FB] mb-6"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Core capabilities
            </h3>

            <div className="space-y-4">
              {capabilities.map((cap, index) => (
                <div
                  key={index}
                  className="bullet-item flex items-center gap-4 p-3 rounded-xl bg-[#0B0F1C]/40 border border-[#F4F7FB]/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2EC3E5]/10 flex items-center justify-center flex-shrink-0">
                    <cap.icon size={20} className="text-[#2EC3E5]" />
                  </div>
                  <span className="text-[#F4F7FB] font-medium">{cap.text}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-[#A9B3C5] italic">
              Typical clients see 15–30% reactivation in the first 60 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
