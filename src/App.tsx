import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Blog from './sections/Blog';
import Footer from './components/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global snap for pinned sections
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

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#0B0F1C] min-h-screen">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        {/* Section 1: Hero - z-10 */}
        <div className="relative z-10">
          <HeroSection />
        </div>
        
        {/* Section 2: What We Do - z-20 */}
        <div className="relative z-20">
          <WhatWeDoSection />
        </div>
        
        {/* Section 3: How It Works - z-30 */}
        <div className="relative z-30">
          <HowItWorksSection />
        </div>
        
        {/* Section 4: Proof - z-40 */}
        <div className="relative z-40">
          <ProofSection />
        </div>
        
        {/* Section 5: Services - z-50 (flowing) */}
        <div className="relative z-50">
          <ServicesSection />
        </div>
        
        {/* Section 6: Who It's For - z-60 */}
        <div className="relative z-[60]">
          <WhoItsForSection />
        </div>
        
        {/* Section 7: Why Neptune - z-70 */}
        <div className="relative z-[70]">
          <WhyNeptuneSection />
        </div>
        
        {/* Section 8: Pricing - z-80 */}
        <div className="relative z-[80]">
          <PricingSection />
        </div>
        
        {/* Section 9: Contact - z-90 */}
        <div className="relative z-[90]">
          <ContactSection />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
