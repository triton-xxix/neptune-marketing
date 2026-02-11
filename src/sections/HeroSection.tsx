import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const lightRayRef = useRef<HTMLDivElement>(null);

  // Load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background fade in
      tl.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        0
      );

      // Light ray fade in
      tl.fromTo(
        lightRayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        0.2
      );

      // Label animation
      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.3
      );

      // Headline words animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 },
          0.4
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.7
      );

      // CTA button
      tl.fromTo(
        ctaRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4 },
        0.9
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, labelRef.current], {
              opacity: 1,
              y: 0,
              x: 0,
            });
            gsap.set(bgRef.current, { opacity: 1, scale: 1 });
          },
        },
      });

      // ENTRANCE (0-30%): Hold position (already animated on load)
      // SETTLE (30-70%): Hold position

      // EXIT (70-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subheadlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.65, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned flex items-center justify-center"
      style={{ height: '100vh' }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Underwater"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Light Ray Overlay */}
      <div
        ref={lightRayRef}
        className="absolute inset-0 pointer-events-none light-ray"
        style={{
          opacity: 0,
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(46, 195, 229, 0.15) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Micro label - bottom left on desktop */}
        <span
          ref={labelRef}
          className="hidden lg:block absolute left-[6vw] bottom-[-30vh] font-mono text-xs uppercase tracking-[0.12em] text-[#A9B3C5]"
          style={{ opacity: 0 }}
        >
          Performance-based AI follow-up
        </span>

        {/* Center content */}
        <div className="max-w-4xl mx-auto text-center lg:mt-0">
          {/* Mobile label */}
          <span
            className="lg:hidden inline-block font-mono text-xs uppercase tracking-[0.12em] text-[#A9B3C5] mb-6"
          >
            Performance-based AI follow-up
          </span>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F4F7FB] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            <span className="word inline-block">The</span>{' '}
            <span className="word inline-block">leads</span>{' '}
            <span className="word inline-block">you</span>{' '}
            <span className="word inline-block">forgot</span>{' '}
            <span className="word inline-block">about?</span>
            <br className="hidden sm:block" />
            <span className="word inline-block">We</span>{' '}
            <span className="word inline-block">turn</span>{' '}
            <span className="word inline-block">them</span>{' '}
            <span className="word inline-block">into</span>{' '}
            <span className="word inline-block text-[#2EC3E5]">revenue.</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-lg lg:text-xl text-[#A9B3C5] max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ opacity: 0 }}
          >
            No upfront fees. We turn dormant leads into real sales.<br />
            <span className="font-medium">We only get paid when you do.</span>
          </p>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#2EC3E5] text-[#0B0F1C] font-semibold rounded-xl btn-glow text-lg"
            style={{ opacity: 0 }}
          >
            Book a discovery call
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
