import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProofSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const metricRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
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

      const metricValue = metricRef.current?.querySelector('.metric-value');
      const metricLabel = metricRef.current?.querySelector('.metric-label');
      const sourceCaption = metricRef.current?.querySelector('.source-caption');

      // ENTRANCE (0-30%)
      // Metric value
      if (metricValue) {
        scrollTl.fromTo(
          metricValue,
          { scale: 0.85, opacity: 0, y: '10vh' },
          { scale: 1, opacity: 1, y: 0, ease: 'none' },
          0
        );
      }

      // Metric label
      if (metricLabel) {
        scrollTl.fromTo(
          metricLabel,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );
      }

      // Source caption
      if (sourceCaption) {
        scrollTl.fromTo(
          sourceCaption,
          { opacity: 0 },
          { opacity: 1, ease: 'none' },
          0.15
        );
      }

      // Testimonial card
      scrollTl.fromTo(
        testimonialRef.current,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Quote lines
      const quoteLines = testimonialRef.current?.querySelectorAll('.quote-line');
      if (quoteLines && quoteLines.length > 0) {
        scrollTl.fromTo(
          quoteLines,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.14
        );
      }

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        metricRef.current,
        { x: 0, opacity: 1 },
        { x: '-16vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        testimonialRef.current,
        { x: 0, opacity: 1 },
        { x: '16vw', opacity: 0, ease: 'power2.in' },
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

  return (
    <section
      ref={sectionRef}
      id="results"
      className="section-pinned flex items-center"
      style={{ height: '100vh' }}
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/images/depth-bg.jpg"
          alt="Deep underwater"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Metric Card */}
          <div
            ref={metricRef}
            className="w-full lg:w-[40vw] text-center lg:text-left"
          >
            <div className="metric-value text-6xl sm:text-7xl lg:text-8xl font-bold text-[#2EC3E5] mb-4 tracking-[-0.03em]" style={{ fontFamily: 'Sora, sans-serif' }}>
              24%
            </div>
            <div className="metric-label text-2xl sm:text-3xl font-semibold text-[#F4F7FB] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              average reactivation rate
            </div>
            <p className="source-caption text-sm text-[#A9B3C5]">
              Based on 12-month aggregated client data.
            </p>
          </div>

          {/* Testimonial Card */}
          <div
            ref={testimonialRef}
            className="w-full lg:w-[40vw] glass-card rounded-2xl p-6 lg:p-8"
          >
            {/* Quote Icon */}
            <div className="w-12 h-12 rounded-full bg-[#2EC3E5]/10 flex items-center justify-center mb-6">
              <Quote size={24} className="text-[#2EC3E5]" />
            </div>

            {/* Quote */}
            <blockquote className="text-xl lg:text-2xl text-[#F4F7FB] leading-relaxed mb-6">
              <span className="quote-line block">Neptune turned our 'dead'</span>
              <span className="quote-line block">lead list into one of our</span>
              <span className="quote-line block">highest-ROI channels.</span>
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#2EC3E5]/20 flex items-center justify-center">
                <span className="text-[#2EC3E5] font-semibold">EA</span>
              </div>
              <div>
                <p className="text-[#F4F7FB] font-medium">Emmanuel Ashley, Operations Director</p>
                <p className="text-[#A9B3C5] text-sm">B2B SaaS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
