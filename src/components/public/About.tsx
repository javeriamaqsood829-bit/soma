import React from 'react';
import { Globe, Download, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HalftonePattern } from '../common/HalftonePattern';
import { LearnMoreButton } from '../common/LearnMoreButton';

interface AboutProps {
  onLearnMore?: () => void;
}

export const About: React.FC<AboutProps> = ({ onLearnMore }) => {
  const { about, siteSettings } = usePortfolio();

  const handleAction = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-[90vh] md:min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden pt-24 pb-12 px-6 sm:px-12 select-none"
    >
      <div className="flex-1 flex items-center justify-center w-full max-w-7xl mx-auto my-auto relative z-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
          
          {/* Left Column: Heading, Subhead, Story, Stats & CV */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Title: "ABOUT ME" */}
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-1 bg-[#FFA500] rounded-full" />
              <span className="text-xs uppercase tracking-widest text-[#FFA500] font-bold">
                Personal Background & Philosophy
              </span>
            </div>

            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight mb-3">
              {about.heading || 'ABOUT ME'}
            </h2>

            {/* Subhead: "Hi, I'm Javeria Maqsood" */}
            <h3 className="text-lg sm:text-xl font-bold text-[#FFA500] tracking-wide mb-4">
              {about.subtitle || "Hi, I'm Javeria Maqsood"}
            </h3>

            {/* Narrative Description */}
            <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-xl mb-4">
              {about.description ||
                'I am a passionate Digital Marketing Strategist who bridges the gap between creative storytelling and data-backed performance marketing. I specialize in turning complex digital challenges into scalable revenue funnels, organic audience growth, and high-impact brand identities that command market attention.'}
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed max-w-xl mb-6">
              {about.approach ||
                'My marketing philosophy relies on agile research, audience psychology, and systematic optimization. Every creative asset, ad dollar, and SEO keyword is deployed with deliberate intent to maximize brand authority and generate measurable ROI.'}
            </p>

            {/* Dynamic Editable Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 w-full max-w-xl">
              {(about.stats || []).map((stat, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-center relative group hover:border-[#FFA500]/50 transition-colors"
                >
                  <p className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {stat.prefix}
                    {stat.value}
                    <span className="text-[#FFA500]">{stat.suffix}</span>
                  </p>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4">
              <LearnMoreButton
                text="Explore Services"
                onClick={handleAction}
                ariaLabel="Explore Digital Marketing Services"
              />

              {about.cvUrl && (
                <a
                  href={about.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-neutral-950 border border-neutral-800 hover:border-[#FFA500] text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#FFA500]" />
                  <span>Download CV</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Profile & Creative Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              
              {/* Glowing ambient border */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#FFA500]/25 to-transparent blur-md -z-10" />

              {/* Main Photo Container */}
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 p-2 shadow-2xl">
                <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-neutral-900">
                  <img
                    src={about.profileImage || siteSettings.profileImage}
                    alt={siteSettings.ownerName || 'Javeria Maqsood'}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Status Badge */}
              <div className="absolute -bottom-3 -left-3 px-4 py-2.5 rounded-2xl bg-black/90 border border-neutral-800 backdrop-blur-md text-[11px] font-bold text-neutral-300 flex items-center gap-2.5 shadow-2xl">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFA500] animate-pulse" />
                <span>Open for Client Engagements</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Slide Footer */}
      <div className="w-full max-w-7xl mx-auto flex items-end justify-between relative z-20 pt-4 border-t border-neutral-900/60">
        <div className="relative -ml-2 -mb-6">
          <HalftonePattern dotColor="#FFA500" className="w-24 h-24 sm:w-32 sm:h-32" />
        </div>

        <div className="text-right text-xs text-neutral-400 font-mono">
          <span className="text-white font-bold">{siteSettings.ownerName || 'Javeria Maqsood'}</span> • Digital Marketing
        </div>
      </div>
    </section>
  );
};
