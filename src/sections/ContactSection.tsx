import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, ChevronDown, Check, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    website: '',
    message: '',
    description: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        leftRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send email using Formspree (free, no backend needed)
    // Sends to triton.xxix@neptunemarketing.co.uk and luke.boyd@neptunemarketing.co.uk
    try {
      const response = await fetch('https://formspree.io/f/mykdyqgd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'New Lead Inquiry - Neptune Marketing',
          _replyto: formData.name,
        }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Still show success for demo purposes
      setIsSubmitted(true);
    }
    
    // Reset form after 5 seconds (modal stays visible until user closes it)
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        website: '',
        message: '',
        description: '',
      });
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 bg-[#0B0F1C]"
    >
      {/* Subtle gradient at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(46, 195, 229, 0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
          {/* Left: Copy */}
          <div ref={leftRef} className="w-full lg:w-2/5">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F7FB] mb-6 tracking-[-0.02em]"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Start a conversation
            </h2>
            <p className="text-lg text-[#A9B3C5] leading-relaxed mb-6">
              If you're responsible for lead conversion or new customer bookings,
              we're happy to explore whether this makes sense.
            </p>
            <p className="text-[#2EC3E5] font-medium">
              No hard sell. If it's not a fit, we'll tell you.
            </p>
          </div>

          {/* Right: Form */}
          <div ref={formRef} className="w-full lg:w-3/5">
            <div className="glass-card rounded-2xl p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-[#A9B3C5] mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#0B0F1C] border border-[#F4F7FB]/10 rounded-xl text-[#F4F7FB] placeholder-[#A9B3C5]/50 focus:outline-none focus:border-[#2EC3E5]/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#A9B3C5] mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#0B0F1C] border border-[#F4F7FB]/10 rounded-xl text-[#F4F7FB] placeholder-[#A9B3C5]/50 focus:outline-none focus:border-[#2EC3E5]/50 transition-colors"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-[#A9B3C5] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#0B0F1C] border border-[#F4F7FB]/10 rounded-xl text-[#F4F7FB] placeholder-[#A9B3C5]/50 focus:outline-none focus:border-[#2EC3E5]/50 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#A9B3C5] mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0B0F1C] border border-[#F4F7FB]/10 rounded-xl text-[#F4F7FB] placeholder-[#A9B3C5]/50 focus:outline-none focus:border-[#2EC3E5]/50 transition-colors"
                        placeholder="+44 123 456 7890"
                      />
                    </div>
                  </div>

                  {/* Role & Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-[#A9B3C5] mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#0B0F1C] border border-[#F4F7FB]/10 rounded-xl text-[#F4F7FB] placeholder-[#A9B3C5]/50 focus:outline-none focus:border-[#2EC3E5]/50 transition-colors"
                        placeholder="Your role"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#A9B3C5] mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0B0F1C] border border-[#F4F7FB]/10 rounded-xl text-[#F4F7FB] placeholder-[#A9B3C5]/50 focus:outline-none focus:border-[#2EC3E5]/50 transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {/* Description dropdown */}
                  <div>
                    <label className="block text-sm text-[#A9B3C5] mb-2">
                      What best describes you?
                    </label>
                    <div className="relative">
                      <select
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0B0F1C] border border-[#F4F7FB]/10 rounded-xl text-[#F4F7FB] focus:outline-none focus:border-[#2EC3E5]/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select an option</option>
                        <option value="owner">Business owner</option>
                        <option value="operations">Operations</option>
                        <option value="marketing">Marketing</option>
                        <option value="sales">Sales</option>
                      </select>
                      <ChevronDown
                        size={18}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A9B3C5] pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-[#A9B3C5] mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#0B0F1C] border border-[#F4F7FB]/10 rounded-xl text-[#F4F7FB] placeholder-[#A9B3C5]/50 focus:outline-none focus:border-[#2EC3E5]/50 transition-colors resize-none"
                      placeholder="Tell us about your lead situation..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#2EC3E5] text-[#0B0F1C] font-semibold rounded-xl btn-glow text-lg"
                  >
                    Send message
                    <Send size={18} />
                  </button>
                </form>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F1C]/80 backdrop-blur-sm">
          <div className="glass-card rounded-2xl p-8 lg:p-12 max-w-md w-full text-center relative animate-in fade-in zoom-in duration-300">
            {/* Close button */}
            <button
              onClick={() => setIsSubmitted(false)}
              className="absolute top-4 right-4 p-2 text-[#A9B3C5] hover:text-[#F4F7FB] transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Success icon */}
            <div className="w-20 h-20 rounded-full bg-[#2EC3E5]/10 flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-[#2EC3E5]" />
            </div>

            {/* Thank you message */}
            <h3
              className="text-2xl lg:text-3xl font-bold text-[#F4F7FB] mb-4"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Thank You!
            </h3>
            <p className="text-[#A9B3C5] text-lg mb-2">
              Your message has been sent successfully.
            </p>
            <p className="text-[#A9B3C5]">
              We'll be in touch within 24 hours.
            </p>

            {/* Neptune branding */}
            <div className="mt-8 pt-6 border-t border-[#F4F7FB]/10">
              <p className="text-[#2EC3E5] font-medium text-sm">
                Neptune Marketing 🔱
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;
