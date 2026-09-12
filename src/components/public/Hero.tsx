import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Search, Share2, Award, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HalftonePattern } from '../common/HalftonePattern';

interface HeroProps {
  onLearnMore?: () => void;
  onStartProject?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLearnMore, onStartProject }) => {
  const { siteSettings, hero } = usePortfolio();

  const handleViewWork = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContact = () => {
    if (onStartProject) {
      onStartProject();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trustBadges = [
    { label: 'Social Media', icon: Share2 },
    { label: 'SEO Strategy', icon: Search },
    { label: 'Content Growth', icon: Sparkles },
    { label: 'Paid Ad ROAS', icon: TrendingUp },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] md:min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden pt-28 pb-12 px-4 sm:px-8 lg:px-12 select-none"
    >
      {/* Warm Ambient Glow behind subject */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#FFA500]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-[#FF9900]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full my-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Small Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-[#FFA500] text-xs font-bold uppercase tracking-widest shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#FFA500] animate-pulse" />
            <span>{hero.badge || 'DIGITAL MARKETING PROFESSIONAL'}</span>
          </div>

          {/* Main Bold Display Heading */}
          <div className="space-y-1">
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.92] text-white">
              {hero.mainHeading || 'TURNING DIGITAL STRATEGY'}
            </h1>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.92] text-[#FFA500]">
              {hero.highlightedHeading || 'INTO REAL GROWTH.'}
            </h2>
          </div>

          {/* Supporting Description */}
          <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed font-normal">
            {hero.description ||
              'I help brands build a stronger digital presence through strategic marketing, engaging content, social media, SEO, and conversion-focused digital solutions.'}
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              id="hero-primary-cta-btn"
              onClick={handleViewWork}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FFA500] hover:bg-[#ff9900] text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-[#FFA500]/25"
            >
              <span>{hero.primaryCtaText || 'View My Work'}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <button
              id="hero-secondary-cta-btn"
              onClick={handleContact}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:border-[#FFA500]/50"
            >
              <span>{hero.secondaryCtaText || "Let's Work Together"}</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-6 border-t border-neutral-900 w-full">
            <p className="text-[11px] uppercase tracking-widest text-neutral-500 font-bold mb-3">
              Core Competencies & Focus
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {trustBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-950/80 border border-neutral-800/90 text-xs font-semibold text-neutral-300"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#FFA500] shrink-0" />
                    <span className="truncate">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Elegant Profile Image Composition */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          
          <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl p-1 bg-gradient-to-b from-[#FFA500]/30 via-neutral-800/40 to-transparent shadow-2xl">
            {/* Inner frame */}
            <div className="w-full h-full rounded-[22px] bg-neutral-950/90 border border-neutral-800 relative overflow-hidden flex items-center justify-center group">
              
              <img
                src={hero.profileImage || siteSettings.profileImage}
                alt={siteSettings.ownerName || 'Javeria Maqsood'}
                className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient overlay on image bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating verified badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/85 backdrop-blur-md border border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white text-sm">
                    {siteSettings.ownerName || 'Javeria Maqsood'}
                  </p>
                  <p className="text-[11px] text-[#FFA500] font-medium">
                    {siteSettings.professionalTitle || 'Digital Marketing Strategist'}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FFA500]/20 border border-[#FFA500]/40 flex items-center justify-center">
                  <Award className="w-4 h-4 text-[#FFA500]" />
                </div>
              </div>

            </div>

            {/* Decorative Corner accents */}
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#FFA500] rounded-tr-lg pointer-events-none" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#FFA500] rounded-bl-lg pointer-events-none" />
          </div>

        </div>

      </div>

      {/* Slide Footer Elements (Halftone on left, URL and brand details on right) */}
      <div className="w-full max-w-7xl mx-auto flex items-end justify-between relative z-20 pt-6 border-t border-neutral-900/60 mt-8">
        <div className="relative -ml-2 -mb-6">
          <HalftonePattern dotColor="#FFA500" className="w-24 h-24 sm:w-32 sm:h-32" />
        </div>

        <div className="text-right text-xs text-neutral-400 font-mono space-y-0.5">
          <p className="text-white font-bold">{siteSettings.ownerName || 'Javeria Maqsood'}</p>
          <p className="text-[#FFA500] text-[11px]">javeriamaqsood829@gmail.com</p>
        </div>
      </div>
    </section>
  );
};
