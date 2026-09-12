import React from 'react';
import {
  Linkedin,
  Instagram,
  Youtube,
  ArrowUp,
  ShieldCheck,
  Mail,
  Globe,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface FooterProps {
  onNavigateToAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToAdmin }) => {
  const { siteSettings } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-neutral-900 pt-16 pb-12 text-neutral-400 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <span className="font-display text-2xl sm:text-3xl font-black uppercase tracking-wider text-[#FFA500]">
                {siteSettings.brandName || 'JAVERIA MAQSOOD'}
              </span>
              <p className="text-xs text-neutral-400 font-semibold tracking-wider uppercase mt-1">
                {siteSettings.professionalTitle || 'Digital Marketing Specialist'}
              </p>
            </div>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Transforming brand goals into scalable customer acquisition funnels, high-converting paid campaigns, and compounding organic search revenue.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteSettings.socialLinks?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#FFA500] hover:border-[#FFA500]/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#FFA500] hover:border-[#FFA500]/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteSettings.email || 'javeriamaqsood829@gmail.com'}`}
                className="w-9 h-9 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#FFA500] hover:border-[#FFA500]/40 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Portfolio Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#hero" className="hover:text-[#FFA500] transition-colors">Cover Slide</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FFA500] transition-colors">About & Welcome</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FFA500] transition-colors">What I Offer (Services)</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#FFA500] transition-colors">Skills & Tech Stack</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#FFA500] transition-colors">Work Experience</a>
              </li>
              <li>
                <a href="#education" className="hover:text-[#FFA500] transition-colors">Education & Credentials</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#FFA500] transition-colors">Case Studies</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#FFA500] transition-colors">Client Reviews</a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Direct Contact
            </h4>
            <p className="text-xs text-neutral-400">
              Inquiries and campaign bookings are open for brands and agencies worldwide.
            </p>
            <div className="space-y-1.5 text-xs text-neutral-300 font-mono">
              <p>Email: {siteSettings.email || 'javeriamaqsood829@gmail.com'}</p>
              {siteSettings.phone && <p>Phone: {siteSettings.phone}</p>}
              <p>Location: Lahore, Pakistan (Worldwide Remote)</p>
            </div>
            {onNavigateToAdmin && (
              <div className="pt-2">
                <button
                  onClick={onNavigateToAdmin}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-neutral-300 hover:text-white hover:border-[#FFA500] transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFA500]" />
                  <span>Admin CMS Access</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} {siteSettings.ownerName || 'Javeria Maqsood'}. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-neutral-400 hover:text-[#FFA500] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
