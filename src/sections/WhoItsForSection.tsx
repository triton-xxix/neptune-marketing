import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Megaphone, Users, PoundSterling } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhoItsForSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.audience-card');
      if (cards) {
        // Card 1 from left
        gsap.fromTo(
          cards[0],
          { x: '-8vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Card 2 from bottom
        gsap.fromTo(
          cards[1],
          { y: '6vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.1,
            scrollTrigger: {
              trigger: cards[1],
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Card 3 from right
        gsap.fromTo(
          cards[2],
          { x: '8vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
            scrollTrigger: {
              trigger: cards[2],
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const audiences = [
    {
      icon: Megaphone,
      title: 'Businesses that advertise regularly',
      description:
        "You're already investing in leads; we help you maximize return.",
    },
    {
      icon: Users,
      title: 'Teams with sales staff',
      description: 'We book the appointment—your team closes the deal.',
    },
    {
      icon: PoundSterling,
      title: 'High-value services',
      description:
        'Ideal when customer value is £4k+ and follow-up complexity is high.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0B0F1C]"
    >
      {/* Subtle background image */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'url(/images/split-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1C] via-transparent to-[#0B0F1C]" />

      <div className="relative z-10 w-full px-6 lg:px-12 max-w-6xl mx-auto">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F7FB] text-center mb-12 lg:mb-16 tracking-[-0.02em]"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          Who it's for
        </h2>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-8"
        >
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="audience-card flex-1 glass-card rounded-2xl p-6 lg:p-8 text-center card-hover"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-[#2EC3E5]/10 flex items-center justify-center mx-auto mb-5">
                <audience.icon size={28} className="text-[#2EC3E5]" />
              </div>

              {/* Title */}
              <h3
                className="text-xl font-semibold text-[#F4F7FB] mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {audience.title}
              </h3>

              {/* Description */}
              <p className="text-[#A9B3C5] leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsForSection;
