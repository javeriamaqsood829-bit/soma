import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, MessageSquare, X, ArrowRight, MapPin } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HalftonePattern } from '../common/HalftonePattern';
import { LearnMoreButton } from '../common/LearnMoreButton';

interface ContactProps {
  onLearnMore?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onLearnMore }) => {
  const { siteSettings, hero, submitContactMessage } = usePortfolio();
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceNeeded: 'Social Media Marketing',
    budgetRange: '$1,000 - $2,500/mo',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const servicesOptions = [
    'Social Media Marketing',
    'Social Media Management',
    'SEO & Organic Growth',
    'Meta & Google Paid Advertising',
    'Content Strategy & Marketing',
    'Email Marketing Automation',
    'Lead Generation Funnel',
    'Brand & Market Positioning',
    'Full-Funnel Growth Retainer',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in your name, email, and project brief.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        serviceNeeded: formData.serviceNeeded,
        budgetRange: formData.budgetRange,
        message: formData.message.trim(),
      });
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceNeeded: 'Social Media Marketing',
        budgetRange: '$1,000 - $2,500/mo',
        message: '',
      });
    } catch (err) {
      setError('Failed to submit message. Please try again or reach out via WhatsApp/Email.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAction = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      setShowInquiryModal(true);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 bg-black text-white overflow-hidden px-4 sm:px-8 lg:px-12 border-t border-neutral-900/60"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
          
          {/* Left Column: Heading, Paragraph, Quick Contacts */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Title */}
            <span className="text-xs uppercase tracking-widest text-[#FFA500] font-bold block mb-2">
              Start Your Growth Campaign
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight mb-6">
              LET'S WORK <span className="text-[#FFA500]">TOGETHER</span>
            </h2>

            {/* Marketing Focused Narrative */}
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-xl mb-8">
              I'm always excited to collaborate on high-impact digital marketing campaigns, performance ad funnels, and organic growth strategies. Whether you want to scale your eCommerce brand, generate qualified B2B leads, or dominate social media, let's create measurable ROI together.
            </p>

            {/* Quick Contact Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={`mailto:${siteSettings.email || 'javeriamaqsood829@gmail.com'}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-[#FFA500] text-xs font-semibold transition-all"
              >
                <Mail className="w-4 h-4 text-[#FFA500]" />
                <span>{siteSettings.email || 'javeriamaqsood829@gmail.com'}</span>
              </a>

              {siteSettings.phone && (
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-[#FFA500] text-xs font-semibold transition-all"
                >
                  <Phone className="w-4 h-4 text-[#FFA500]" />
                  <span>{siteSettings.phone}</span>
                </a>
              )}

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 text-xs font-semibold">
                <MapPin className="w-4 h-4 text-[#FFA500]" />
                <span>Lahore, Pakistan • Worldwide Remote</span>
              </div>
            </div>

            {/* Action CTA Button */}
            <div>
              <button
                type="button"
                onClick={() => setShowInquiryModal(true)}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-xl shadow-[#FFA500]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Send Project Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Designer / Marketer Cutout */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <img
                src={hero.profileImage || siteSettings.profileImage}
                alt="Javeria Maqsood Digital Marketer"
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] max-h-[50vh]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Project Inquiry Brief Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white bg-neutral-900"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs uppercase font-bold tracking-wider text-[#FFA500]">
                {siteSettings.ownerName || 'Javeria Maqsood'} • Client Discovery Brief
              </span>
              <h3 className="font-display text-3xl font-black uppercase text-white mt-1">
                Start Your Project
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Tell me about your brand goals. I will review and reply within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#FFA500]/20 text-[#FFA500] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Discovery Brief Received!</h4>
                <p className="text-sm text-neutral-300">
                  Thank you for reaching out. I'm excited to review your marketing goals and will respond with a tailored strategy proposal.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setShowInquiryModal(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#FFA500] text-black font-bold text-xs uppercase"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-950/50 border border-red-800/80 text-red-300 text-xs">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sara Ahmed"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#FFA500] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#FFA500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 0000000"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#FFA500] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                    Primary Objective / Service Needed
                  </label>
                  <select
                    value={formData.serviceNeeded}
                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#FFA500] focus:outline-none"
                  >
                    {servicesOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-neutral-950">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                    Campaign Goals & Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current business stage, target audience, budget, and desired milestones..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#FFA500] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-[#FFA500] hover:bg-[#FF9900] text-black font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FFA500]/20 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Discovery Brief...' : 'Send Discovery Brief'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
