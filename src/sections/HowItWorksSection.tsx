import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plug, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
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

      const cards = cardsRef.current?.querySelectorAll('.step-card');

      // ENTRANCE (0-30%)
      // Title
      scrollTl.fromTo(
        titleRef.current,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Card 1 (left)
      if (cards?.[0]) {
        scrollTl.fromTo(
          cards[0],
          { x: '-60vw', opacity: 0, rotate: -2 },
          { x: 0, opacity: 1, rotate: 0, ease: 'none' },
          0.06
        );
      }

      // Card 2 (center)
      if (cards?.[1]) {
        scrollTl.fromTo(
          cards[1],
          { y: '70vh', opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, ease: 'none' },
          0.1
        );
      }

      // Card 3 (right)
      if (cards?.[2]) {
        scrollTl.fromTo(
          cards[2],
          { x: '60vw', opacity: 0, rotate: 2 },
          { x: 0, opacity: 1, rotate: 0, ease: 'none' },
          0.06
        );
      }

      // CTA
      scrollTl.fromTo(
        ctaRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      if (cards) {
        scrollTl.fromTo(
          cards,
          { y: 0, opacity: 1 },
          { y: '-16vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        titleRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-6vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
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

  const steps = [
    {
      number: '01',
      icon: Plug,
      title: 'Connect',
      description: 'We plug into your existing lead sources—no replatforming.',
    },
    {
      number: '02',
      icon: MessageSquare,
      title: 'Converse',
      description: 'AI follows up with context, timing, and human-like tone.',
    },
    {
      number: '03',
      icon: CheckCircle,
      title: 'Convert',
      description: 'Qualified prospects book directly on your calendar.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-pinned flex flex-col items-center justify-center"
      style={{ height: '100vh' }}
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/images/cavern-bg.jpg"
          alt="Underwater cavern"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F7FB] text-center mb-12 lg:mb-16 tracking-[-0.02em]"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          How it works
        </h2>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card w-full lg:w-[26vw] glass-card rounded-2xl p-6 lg:p-8 text-center"
            >
              {/* Number */}
              <span className="inline-block font-mono text-sm uppercase tracking-[0.12em] text-[#2EC3E5] mb-4">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-[#2EC3E5]/10 flex items-center justify-center mx-auto mb-5">
                <step.icon size={28} className="text-[#2EC3E5]" />
              </div>

              {/* Title */}
              <h3
                className="text-xl font-semibold text-[#F4F7FB] mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#A9B3C5] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 lg:mt-12">
          <button
            ref={ctaRef}
            className="inline-flex items-center gap-2 text-[#2EC3E5] font-medium hover:gap-3 transition-all duration-300"
          >
            See a sample conversation
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
