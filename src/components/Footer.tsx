import { useState } from 'react';
import { X, FileText, Shield, Scale } from 'lucide-react';

const Footer = () => {
  const [modalContent, setModalContent] = useState<{
    title: string;
    content: React.ReactNode;
  } | null>(null);

  const legalLinks = [
    {
      label: 'Privacy Policy',
      icon: Shield,
      content: (
        <div className="space-y-4 text-[#A9B3C5]">
          <p>
            <strong className="text-[#F4F7FB]">1. Data Controller</strong>
            <br />
            Neptune Marketing AI is the data controller for any personal data
            collected through this website and our services.
          </p>
          <p>
            <strong className="text-[#F4F7FB]">2. What Data We Collect</strong>
            <br />
            We collect: contact information (name, email, phone), company
            details, and any information you provide through our contact forms
            or during service engagement.
          </p>
          <p>
            <strong className="text-[#F4F7FB]">3. How We Use Your Data</strong>
            <br />
            Your data is used solely for: responding to inquiries, providing
            our services, and communicating about our offerings. We never sell
            your data to third parties.
          </p>
          <p>
            <strong className="text-[#F4F7FB]">4. Data Retention</strong>
            <br />
            We retain personal data only as long as necessary for the purposes
            outlined above, or as required by law. Typically, this is 2 years
            after our last interaction.
          </p>
          <p>
            <strong className="text-[#F4F7FB]">5. Your Rights</strong>
            <br />
            Under GDPR, you have the right to: access, rectify, erase,
            restrict processing, object to processing, and data portability.
            Contact us to exercise these rights.
          </p>
        </div>
      ),
    },
    {
      label: 'Data Processing Agreement',
      icon: FileText,
      content: (
        <div className="space-y-4 text-[#A9B3C5]">
          <p>
            <strong className="text-[#F4F7FB]">1. Parties</strong>
            <br />
            This Data Processing Agreement (DPA) is between Neptune Marketing
            AI (Data Processor) and our clients (Data Controller).
          </p>
          <p>
            <strong className="text-[#F4F7FB]">2. Processing Activities</strong>
            <br />
            We process personal data for the purpose of lead reactivation via
            SMS and email, including: contact details, communication history,
            and appointment scheduling information.
          </p>
          <p>
            <strong className="text-[#F4F7FB]">3. Data Security</strong>
            <br />
            We implement appropriate technical and organisational measures to
            protect personal data, including encryption, access controls, and
            regular security assessments.
          </p>
          <p>
            <strong className="text-[#F4F7FB]">4. Sub-processors</strong>
            <br />
            We may use sub-processors for: cloud hosting, SMS delivery, and
            email services. All sub-processors are GDPR-compliant and bound by
            data protection obligations.
          </p>
          <p>
            <strong className="text-[#F4F7FB]">5. Data Deletion</strong>
            <br />
            Upon termination of services, we will delete or return all personal
            data within 30 days, except where retention is required by law.
          </p>
        </div>
      ),
    },
    {
      label: 'Terms of Use',
      icon: Scale,
      content: (
        <div className="space-y-4 text-[#A9B3C5]">
          <p>
            <strong className="text-[#F4F7FB]">1. Acceptance</strong>
            <br />
            By using our website and services, you agree to these Terms of Use.
            If you do not agree, please do not use our services.
          </p>
          <p>
            <strong className="text-[#F4F7FB]">2. Services</strong>
            <br />
            Neptune Marketing AI provides AI-powered lead reactivation and
            appointment booking services. Results may vary based on market
            conditions, lead quality, and other factors.
          </p>
          <p>
            <strong className="text-[#F4F7FB]">3. Performance Model</strong>
            <br />
            Our pricing is performance-based. You agree to pay the agreed rate
            for each qualified appointment booked through our services.
          </p>
          <p>
            <strong className="text-[#F4F7FB]">4. Limitation of Liability</strong>
            <br />
            Our liability is limited to the fees paid for services in the
            preceding 3 months. We are not liable for indirect, consequential,
            or lost profit damages.
          </p>
          <p>
            <strong className="text-[#F4F7FB]">5. Governing Law</strong>
            <br />
            These terms are governed by the laws of England and Wales. Any
            disputes shall be resolved in the courts of England.
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <footer className="relative bg-[#0B0F1C] border-t border-[#F4F7FB]/5 py-8">
        <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <span
              className="text-[#F4F7FB] font-semibold text-lg"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Neptune Marketing
            </span>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {legalLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() =>
                    setModalContent({ title: link.label, content: link.content })
                  }
                  className="text-sm text-[#A9B3C5] hover:text-[#F4F7FB] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-[#A9B3C5]/60">
              © {new Date().getFullYear()} Neptune Marketing AI
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modalContent && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0B0F1C]/95 backdrop-blur-lg"
          onClick={() => setModalContent(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[80vh] glass-card rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#F4F7FB]/10">
              <h3
                className="text-xl font-semibold text-[#F4F7FB]"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {modalContent.title}
              </h3>
              <button
                onClick={() => setModalContent(null)}
                className="text-[#A9B3C5] hover:text-[#F4F7FB] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {modalContent.content}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
