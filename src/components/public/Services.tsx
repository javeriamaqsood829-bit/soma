import React, { useState } from 'react';
import {
  Share2,
  Users,
  Layers,
  Search,
  FileText,
  Target,
  Mail,
  Award,
  TrendingUp,
  BarChart3,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HalftonePattern } from '../common/HalftonePattern';
import { LearnMoreButton } from '../common/LearnMoreButton';
import { ServiceItem } from '../../types';

interface ServicesProps {
  onLearnMore?: () => void;
  onContact?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onLearnMore, onContact }) => {
  const { services, siteSettings } = usePortfolio();
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (title: string, iconName?: string) => {
    const t = title.toLowerCase();
    if (t.includes('social media marketing')) return <Share2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFA500] stroke-[1.5]" />;
    if (t.includes('social media management')) return <Users className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFA500] stroke-[1.5]" />;
    if (t.includes('content strategy')) return <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFA500] stroke-[1.5]" />;
    if (t.includes('seo') || t.includes('search')) return <Search className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFA500] stroke-[1.5]" />;
    if (t.includes('content marketing')) return <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFA500] stroke-[1.5]" />;
    if (t.includes('advertising') || t.includes('ad')) return <Target className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFA500] stroke-[1.5]" />;
    if (t.includes('email')) return <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFA500] stroke-[1.5]" />;
    if (t.includes('brand')) return <Award className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFA500] stroke-[1.5]" />;
    if (t.includes('lead')) return <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFA500] stroke-[1.5]" />;
    if (t.includes('analytics') || t.includes('reporting')) return <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFA500] stroke-[1.5]" />;
    return <Target className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFA500] stroke-[1.5]" />;
  };

  const handleAction = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      const el = document.getElementById('process');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayedServices = services && services.length > 0 ? services.filter(s => s.published !== false).slice(0, 10) : [];

  return (
    <section
      id="services"
      className="relative py-20 md:py-28 bg-black text-white overflow-hidden px-4 sm:px-8 lg:px-12 border-t border-neutral-900/60"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Headline matching reference: "WHAT I OFFER" */}
        <div className="mb-10 sm:mb-14 text-left">
          <span className="text-xs uppercase tracking-widest text-[#FFA500] font-bold block mb-2">
            Strategic Marketing Services
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white inline-block relative">
            WHAT I <span className="text-[#FFA500]">OFFER</span>
            <div className="h-1 w-24 sm:w-32 bg-[#FFA500] mt-2 rounded-full" />
          </h2>
        </div>

        {/* 10 Services in a 2x5 Grid matching the sample slide aesthetic */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8 gap-x-4 sm:gap-x-6 sm:gap-y-12 items-start justify-items-center">
          {displayedServices.map((service, index) => {
            const iconElement = getServiceIcon(service.title, service.icon);

            return (
              <div
                key={service.id || index}
                onClick={() => setActiveModalService(service)}
                className="flex flex-col items-center text-center group cursor-pointer w-full max-w-[190px] p-3.5 rounded-2xl hover:bg-neutral-950 border border-transparent hover:border-neutral-800 transition-all duration-300"
              >
                {/* Orange Outline Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,165,0,0.4)] transition-all duration-300">
                  {iconElement}
                </div>

                {/* Service Title */}
                <h3 className="font-sans text-xs sm:text-sm font-bold text-neutral-200 group-hover:text-[#FFA500] transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-tight">
                  {service.shortDescription}
                </p>
              </div>
            );
          })}
        </div>

        {/* Learn More Button */}
        <div className="mt-10 sm:mt-14 flex justify-start">
          <LearnMoreButton
            text="View Growth Process"
            onClick={handleAction}
            ariaLabel="Explore Digital Marketing Strategy & Execution Process"
          />
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl animate-scaleUp">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white bg-neutral-900"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-black border border-neutral-800 flex items-center justify-center text-[#FFA500]">
                {getServiceIcon(activeModalService.title, activeModalService.icon)}
              </div>
              <div>
                <h4 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                  {activeModalService.title}
                </h4>
                <span className="text-xs text-[#FFA500] font-semibold">
                  Comprehensive Marketing Solution
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed mb-5">
              {activeModalService.fullDescription || activeModalService.shortDescription}
            </p>

            {activeModalService.features && activeModalService.features.length > 0 && (
              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Deliverables & Inclusions:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {activeModalService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-200">
                      <div className="w-4 h-4 rounded-full bg-[#FFA500]/20 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#FFA500]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveModalService(null);
                  if (onContact) {
                    onContact();
                  } else {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFA500] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110"
              >
                <span>Request Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
