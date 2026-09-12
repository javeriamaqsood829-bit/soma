import React from 'react';
import { GraduationCap, Award, ExternalLink, Calendar } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HalftonePattern } from '../common/HalftonePattern';
import { LearnMoreButton } from '../common/LearnMoreButton';

interface EducationCertificationsProps {
  onLearnMore?: () => void;
}

export const EducationCertifications: React.FC<EducationCertificationsProps> = ({ onLearnMore }) => {
  const { education, certifications, siteSettings } = usePortfolio();

  const handleAction = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const primaryEdu = education[0] || {
    degree: 'Bachelor of Science in Information Technology & Media',
    institution: 'University of Engineering & Technology',
    startYear: '2019',
    endYear: '2023',
    description: 'Comprehensive study of digital communications, data analysis, web architecture, and strategic marketing methodologies. Graduated with top honors.',
  };

  return (
    <section
      id="education"
      className="relative min-h-[90vh] md:min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden pt-24 pb-12 px-6 sm:px-12 select-none"
    >
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full my-auto py-6 z-10">
        
        {/* Section Headline matching slide aesthetic */}
        <div className="mb-8 sm:mb-12 text-left">
          <span className="text-xs uppercase tracking-widest text-[#FFA500] font-bold block mb-2">
            Academic Background & Industry Certifications
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white inline-block">
            EDUCATION & <span className="text-[#FFA500]">CERTIFICATIONS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          
          {/* Left Column: Education Degree Card */}
          <div className="lg:col-span-5 p-7 rounded-3xl bg-neutral-950 border border-neutral-800/90 shadow-xl space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
              <div className="w-10 h-10 rounded-2xl bg-[#FFA500]/15 flex items-center justify-center text-[#FFA500]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFA500]">
                  Academic Degree
                </h3>
                <p className="text-[11px] text-neutral-400">
                  {primaryEdu.startYear} — {primaryEdu.endYear}
                </p>
              </div>
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {primaryEdu.degree}
            </h4>
            <p className="text-xs font-semibold text-neutral-300">
              {primaryEdu.institution}
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
              {primaryEdu.description}
            </p>
          </div>

          {/* Right Column: Industry Certifications Grid */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
                Industry Credentials & Badges
              </span>
              <span className="text-[10px] text-[#FFA500] font-mono">
                {certifications.length} Verified Credentials
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-[#FFA500]/50 transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-[#FFA500]/15 flex items-center justify-center text-[#FFA500] shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white leading-snug">
                        {cert.name}
                      </h5>
                      <p className="text-[11px] text-[#FFA500] mt-0.5 font-medium">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                    <span>Issued: {cert.issueDate || cert.date}</span>
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FFA500] hover:underline flex items-center gap-1"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Learn More Button */}
        <div className="flex justify-start">
          <LearnMoreButton
            text="Explore Case Studies"
            onClick={handleAction}
            ariaLabel="Explore digital marketing case studies and portfolio"
          />
        </div>
      </div>

      {/* Slide Footer */}
      <div className="w-full max-w-7xl mx-auto flex items-end justify-between relative z-20 pt-4 border-t border-neutral-900/60">
        <div className="relative -ml-2 -mb-6">
          <HalftonePattern dotColor="#FFA500" className="w-24 h-24 sm:w-32 sm:h-32" />
        </div>

        <div className="text-right text-xs text-neutral-400 font-mono">
          <span className="text-white font-bold">{siteSettings.ownerName || 'Javeria Maqsood'}</span> • Academic & Industry Credentials
        </div>
      </div>
    </section>
  );
};
