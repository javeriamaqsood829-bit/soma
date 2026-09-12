import React from 'react';
import { Instagram, Youtube, Linkedin, Globe, Mail, Phone, ArrowUp, Send } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HalftonePattern } from '../common/HalftonePattern';
import { LearnMoreButton } from '../common/LearnMoreButton';

interface ThankYouSlideProps {
  onRestart?: () => void;
}

export const ThankYouSlide: React.FC<ThankYouSlideProps> = ({ onRestart }) => {
  const { siteSettings, hero } = usePortfolio();

  const handleAction = () => {
    if (onRestart) {
      onRestart();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="thankyou"
      className="relative min-h-[90vh] md:min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden pt-24 pb-12 px-6 sm:px-12 select-none"
    >
      <div className="flex-1 flex items-center justify-center max-w-7xl mx-auto w-full my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
          
          {/* Left Column: Heading with script overlay, message & social icons */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Huge Headline Container with "THANK YOU" + Cursive "For Your Attention" */}
            <div className="relative mb-6 sm:mb-8">
              <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-none select-none">
                THANK YOU
              </h2>

              {/* Script overlay in warm yellow-orange */}
              <span className="font-script text-3xl sm:text-5xl md:text-6xl text-[#FFA500] tracking-wide absolute -bottom-3 sm:-bottom-5 left-4 sm:left-8 transform -rotate-2 select-none pointer-events-none drop-shadow-lg">
                For Your Attention
              </span>
            </div>

            {/* Paragraph matching Slide 1 text */}
            <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-xl mb-8 mt-4 sm:mt-6">
              Thank you for visiting my portfolio. I hope you enjoyed exploring my work. If you're looking for creative, modern, and professional graphic design services, I'd be happy to help bring your ideas to life. Let's create something amazing together.
            </p>

            {/* Social Icons matching Slide 1 (Instagram, TikTok, YouTube, LinkedIn) */}
            <div className="flex items-center gap-4 mb-8 text-[#FFA500]">
              <a
                href={siteSettings.socialLinks.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-950 flex items-center justify-center hover:border-[#FFA500] hover:scale-110 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={siteSettings.socialLinks.youtube || 'https://youtube.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-950 flex items-center justify-center hover:border-[#FFA500] hover:scale-110 transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>

              <a
                href={siteSettings.socialLinks.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-950 flex items-center justify-center hover:border-[#FFA500] hover:scale-110 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href={`mailto:${siteSettings.email || 'javeriamaqsood829@gmail.com'}`}
                aria-label="Email"
                className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-950 flex items-center justify-center hover:border-[#FFA500] hover:scale-110 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Restart / Back to Top Button */}
            <div>
              <LearnMoreButton
                text="Return to Cover"
                onClick={handleAction}
                ariaLabel="Return to cover slide"
              />
            </div>
          </div>

          {/* Right Column: Cutout of designer with phone */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <img
                src={hero.profileImage || siteSettings.profileImage}
                alt="Sawera Almas Thank You"
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] max-h-[52vh]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="w-full flex items-end justify-between relative z-20 pt-4">
        <div className="relative -ml-6 -mb-8">
          <HalftonePattern dotColor="#FFA500" className="w-28 h-28 sm:w-40 sm:h-40" />
        </div>

        <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
          <Globe className="w-3.5 h-3.5 text-[#FFA500]" />
          <span>www.sagraphixstudio.com</span>
        </div>
      </div>
    </section>
  );
};
