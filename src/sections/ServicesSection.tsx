import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Database,
  Zap,
  Clock,
  Star,
  Phone,
  BarChart3,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: index * 0.08,
              scrollTrigger: {
                trigger: card,
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

  const services = [
    {
      icon: Database,
      title: 'Database Reactivation',
      description: 'SMS + email sequences for leads that never bought.',
    },
    {
      icon: Zap,
      title: 'Speed-to-Lead',
      description: 'Instant response when a new inquiry arrives.',
    },
    {
      icon: Clock,
      title: 'Out-of-Hours Coverage',
      description: 'AI handles replies while your team is offline.',
    },
    {
      icon: Star,
      title: 'Review Generation',
      description: 'Request and capture reviews on autopilot.',
    },
    {
      icon: Phone,
      title: 'Voice AI (Optional)',
      description: 'Inbound call handling and appointment booking.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Weekly reactivation stats and booking rates.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 lg:py-32 bg-[#0B0F1C]"
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(46, 195, 229, 0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F7FB] tracking-[-0.02em]"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Services
          </h2>
          <p className="text-lg text-[#A9B3C5] max-w-md">
            Everything needed to run follow-up at scale—without adding headcount.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card glass-card rounded-2xl p-6 card-hover cursor-pointer"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#2EC3E5]/10 flex items-center justify-center mb-5">
                <service.icon size={24} className="text-[#2EC3E5]" />
              </div>

              {/* Title */}
              <h3
                className="text-lg font-semibold text-[#F4F7FB] mb-2"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[#A9B3C5] leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
