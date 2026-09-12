import React, { useState } from 'react';
import { Share2, PenTool, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HalftonePattern } from '../common/HalftonePattern';
import { LearnMoreButton } from '../common/LearnMoreButton';

interface SkillsProps {
  onLearnMore?: () => void;
}

export const Skills: React.FC<SkillsProps> = ({ onLearnMore }) => {
  const { skills, siteSettings } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<'all' | 'marketing' | 'creative' | 'tools'>('all');

  const handleAction = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      const el = document.getElementById('experience');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const publishedSkills = skills.filter((s) => s.published !== false);

  const marketingSkills = publishedSkills.filter((s) => s.category === 'marketing');
  const creativeSkills = publishedSkills.filter((s) => s.category === 'creative');
  const toolsSkills = publishedSkills.filter((s) => s.category === 'tools');

  const filteredSkills =
    activeCategory === 'all'
      ? publishedSkills
      : publishedSkills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative py-20 md:py-28 bg-black text-white overflow-hidden px-4 sm:px-8 lg:px-12 border-t border-neutral-900/60"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Headline matching slide aesthetic */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#FFA500] font-bold block mb-2">
              Expertise & Marketing Stack
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white inline-block relative">
              CORE <span className="text-[#FFA500]">SKILLS</span>
              <div className="h-1 w-24 sm:w-32 bg-[#FFA500] mt-2 rounded-full" />
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {[
              { id: 'all', label: 'All Capabilities' },
              { id: 'marketing', label: 'Digital Marketing' },
              { id: 'creative', label: 'Creative & Copy' },
              { id: 'tools', label: 'Tools & Platforms' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-[#FFA500] text-black shadow-md shadow-[#FFA500]/20'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Categories Layout when 'all' is selected */}
        {activeCategory === 'all' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
            
            {/* Category 1: Digital Marketing */}
            <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800/90 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-neutral-800">
                  <div className="w-8 h-8 rounded-xl bg-[#FFA500]/15 flex items-center justify-center text-[#FFA500]">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                    Digital Marketing
                  </h3>
                </div>

                <div className="space-y-4">
                  {marketingSkills.map((skill) => (
                    <div key={skill.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-200">{skill.name}</span>
                        <span className="font-mono text-[#FFA500] font-bold">{skill.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-neutral-900 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FFA500] to-[#FFB833] rounded-full"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category 2: Creative & Copy */}
            <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800/90 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-neutral-800">
                  <div className="w-8 h-8 rounded-xl bg-[#FFA500]/15 flex items-center justify-center text-[#FFA500]">
                    <PenTool className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                    Creative & Strategy
                  </h3>
                </div>

                <div className="space-y-4">
                  {creativeSkills.map((skill) => (
                    <div key={skill.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-200">{skill.name}</span>
                        <span className="font-mono text-[#FFA500] font-bold">{skill.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-neutral-900 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FFA500] to-[#FFB833] rounded-full"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category 3: Tools & Platforms */}
            <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800/90 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-neutral-800">
                  <div className="w-8 h-8 rounded-xl bg-[#FFA500]/15 flex items-center justify-center text-[#FFA500]">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                    Tools & Platforms
                  </h3>
                </div>

                <div className="space-y-4">
                  {toolsSkills.map((skill) => (
                    <div key={skill.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-200">{skill.name}</span>
                        <span className="font-mono text-[#FFA500] font-bold">{skill.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-neutral-900 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FFA500] to-[#FFB833] rounded-full"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Filtered List View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/90 space-y-2 hover:border-[#FFA500]/40 transition-colors"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-neutral-200">{skill.name}</span>
                  <span className="font-mono text-[#FFA500] font-bold">{skill.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FFA500] to-[#FFB833] rounded-full"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
