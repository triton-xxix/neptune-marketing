import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import WhatWeDoSection from './sections/WhatWeDoSection';
import HowItWorksSection from './sections/HowItWorksSection';
import ProofSection from './sections/ProofSection';
import ServicesSection from './sections/ServicesSection';
import WhoItsForSection from './sections/WhoItsForSection';
import WhyNeptuneSection from './sections/WhyNeptuneSection';
import PricingSection from './sections/PricingSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    };

    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#0B0F1C] min-h-screen">
      <div className="noise-overlay" />
      <Navigation />
      <main className="relative">
        <div className="relative z-10"><HeroSection /></div>
        <div className="relative z-20"><WhatWeDoSection /></div>
        <div className="relative z-30"><HowItWorksSection /></div>
        <div className="relative z-40"><ProofSection /></div>
        <div className="relative z-50"><ServicesSection /></div>
        <div className="relative z-[60]"><WhoItsForSection /></div>
        <div className="relative z-[70]"><WhyNeptuneSection /></div>
        <div className="relative z-[80]"><PricingSection /></div>
        <div className="relative z-[90]"><ContactSection /></div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
