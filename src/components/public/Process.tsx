import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HalftonePattern } from '../common/HalftonePattern';

export const Process: React.FC = () => {
  const { process, siteSettings } = usePortfolio();

  const sortedSteps = [...process].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <section id="process" className="py-24 md:py-32 bg-black text-white relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-[#FFA500]/30 text-[#FFA500] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTION ROADMAP</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight">
            DIGITAL MARKETING <span className="text-[#FFA500]">PROCESS</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed max-w-2xl">
            A battle-tested 6-step framework designed to turn marketing spend into compounding brand equity and high-intent customer acquisition.
          </p>
        </div>

        {/* Steps Grid (01 Research to 06 Optimize) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative">
          {sortedSteps.map((step, idx) => (
            <div
              key={step.id || idx}
              className="relative p-7 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800/90 hover:border-[#FFA500]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
            >
              {/* Step number */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-4xl font-black text-[#FFA500] tracking-tight">
                  {step.stepNumber || `0${idx + 1}`}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800">
                  Step 0{idx + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl font-bold uppercase text-white tracking-tight mb-3 group-hover:text-[#FFA500] transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                {step.description}
              </p>

              {/* Milestone Indicator */}
              <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center gap-2 text-[11px] text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-[#FFA500]" />
                <span>Strategy Milestone Approved</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFA500]/5 rounded-full blur-[160px] pointer-events-none" />
    </section>
  );
};
