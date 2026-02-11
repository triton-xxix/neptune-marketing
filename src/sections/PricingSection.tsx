import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Card animation
      gsap.fromTo(
        cardRef.current,
        { y: '6vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.97, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          delay: 0.3,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
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
      id="pricing"
      className="relative py-24 lg:py-32 bg-[#0B0F1C]"
    >
      {/* Subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(46, 195, 229, 0.06) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12 max-w-2xl mx-auto text-center">
        {/* Title */}
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F7FB] mb-4 tracking-[-0.02em]"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          Pricing
        </h2>
        <p className="text-lg text-[#A9B3C5] mb-10">
          You pay only when we deliver.
        </p>

        {/* Pricing Card */}
        <div
          ref={cardRef}
          className="glass-card rounded-2xl p-8 lg:p-10 text-left"
        >
          <div className="space-y-5">
            {/* Setup */}
            <div className="flex items-center justify-between py-3 border-b border-[#F4F7FB]/10">
              <span className="text-[#F4F7FB] font-medium">Setup</span>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-[#2EC3E5]" />
                <span className="text-[#2EC3E5] font-semibold">Free</span>
              </div>
            </div>

            {/* Monthly */}
            <div className="flex items-center justify-between py-3 border-b border-[#F4F7FB]/10">
              <span className="text-[#F4F7FB] font-medium">Monthly fee</span>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-[#2EC3E5]" />
                <span className="text-[#2EC3E5] font-semibold">None</span>
              </div>
            </div>

            {/* Per booking */}
            <div className="flex items-center justify-between py-3">
              <span className="text-[#F4F7FB] font-medium">
                Per booked appointment
              </span>
              <span className="text-[#2EC3E5] font-semibold">Agreed rate</span>
            </div>
          </div>

          {/* Note */}
          <p className="mt-6 text-sm text-[#A9B3C5] text-center">
            We agree a fair rate upfront—so our incentives match yours.
          </p>
        </div>

        {/* CTA */}
        <button
          ref={ctaRef}
          onClick={scrollToContact}
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-[#2EC3E5] text-[#0B0F1C] font-semibold rounded-xl btn-glow text-lg"
        >
          Get a quote
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default PricingSection;
