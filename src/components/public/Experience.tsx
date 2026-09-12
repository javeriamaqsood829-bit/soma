import React from 'react';
import { Briefcase, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HalftonePattern } from '../common/HalftonePattern';
import { LearnMoreButton } from '../common/LearnMoreButton';

interface ExperienceProps {
  onLearnMore?: () => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onLearnMore }) => {
  const { experience, siteSettings } = usePortfolio();

  const handleAction = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      const el = document.getElementById('education');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const publishedExperience = experience.filter((e) => e.published !== false);

  return (
    <section
      id="experience"
      className="relative py-20 md:py-28 bg-black text-white overflow-hidden px-4 sm:px-8 lg:px-12 border-t border-neutral-900/60"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Headline */}
        <div className="mb-8 sm:mb-12 text-left">
          <span className="text-xs uppercase tracking-widest text-[#FFA500] font-bold block mb-2">
            Career Journey & Track Record
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white inline-block">
            WORK <span className="text-[#FFA500]">EXPERIENCE</span>
          </h2>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-5 mb-10">
          {publishedExperience.map((item, index) => (
            <div
              key={item.id || index}
              className="p-6 sm:p-7 rounded-3xl bg-neutral-950 border border-neutral-800/90 hover:border-[#FFA500]/50 transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-neutral-900">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFA500]" />
                    <span>{item.position}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FFA500] font-semibold mt-0.5">
                    {item.company} • {item.employmentType || 'Full-time'}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-neutral-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FFA500]" />
                    {item.startDate} — {item.current ? 'Present' : item.endDate}
                  </span>
                  {item.location && (
                    <span className="hidden md:flex items-center gap-1 text-neutral-500">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      {item.location}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Achievements Checklist */}
              {item.achievements && item.achievements.length > 0 && (
                <div className="space-y-1.5 mb-4">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFA500] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tools Badges */}
              {item.tools && item.tools.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-900">
                  {item.tools.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-[10px] uppercase font-mono font-semibold text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
