import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Approach', href: '#approach' },
    { label: 'Results', href: '#results' },
    { label: 'Services', href: '#services' },
    { label: 'Blog', href: '/blog', external: true },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (link: { label: string; href: string; external?: boolean }) => {
    if (link.external) {
      window.location.href = link.href;
    } else {
      scrollToSection(link.href);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0F1C]/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-[#F4F7FB] font-semibold text-xl tracking-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Neptune Marketing
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-[#A9B3C5] hover:text-[#F4F7FB] text-sm font-medium transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection('#contact')}
            className="hidden md:block px-5 py-2.5 bg-[#2EC3E5] text-[#0B0F1C] text-sm font-semibold rounded-xl btn-glow"
          >
            Book a call
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#F4F7FB] p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] bg-[#0B0F1C]/98 backdrop-blur-lg transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="text-[#F4F7FB] text-2xl font-medium hover:text-[#2EC3E5] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#contact')}
            className="mt-4 px-8 py-3 bg-[#2EC3E5] text-[#0B0F1C] text-lg font-semibold rounded-xl"
          >
            Book a call
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
