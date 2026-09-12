import React, { useEffect } from 'react';
import { X, ExternalLink, TrendingUp, CheckCircle, Calendar, User, Layers, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const CaseStudyModal: React.FC = () => {
  const { activeProjectModal, setActiveProjectModal } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProjectModal(null);
      }
    };
    if (activeProjectModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProjectModal, setActiveProjectModal]);

  if (!activeProjectModal) return null;

  const project = activeProjectModal;
  const gallery = project.gallery || project.galleryImages || [];
  const tools = project.toolsUsed || project.tools || [];
  const deliverables = project.deliverables || project.services || [];

  return (
    <div
      id="case-study-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-fade-in"
    >
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FFA500] uppercase tracking-wider">
            <span>Marketing Case Study</span>
            <span>•</span>
            <span className="text-neutral-400">{project.category}</span>
          </div>
          <button
            id="close-case-study-btn"
            onClick={() => setActiveProjectModal(null)}
            className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Cover Banner */}
        <div className="relative aspect-[21/9] w-full bg-neutral-900 overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />

          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-none mb-3">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-300">
              {project.client && (
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#FFA500]" />
                  Client: <strong className="text-white">{project.client}</strong>
                </span>
              )}
              {project.timeline && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FFA500]" />
                    {project.timeline}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-10 space-y-10">
          
          {/* Key Metrics / Highlights */}
          {Array.isArray(project.results) && project.results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.results.map((result, rIdx) => {
                const metricLabel = typeof result === 'object' && result ? result.metric || result.label : 'Key Result';
                const metricValue = typeof result === 'object' && result ? result.value : String(result);
                return (
                  <div
                    key={rIdx}
                    className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex items-center gap-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#FFA500]/10 border border-[#FFA500]/30 flex items-center justify-center text-[#FFA500] shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-display text-2xl sm:text-3xl font-black text-white block tracking-tight">
                        {metricValue}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">
                        {metricLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FFA500] mb-3">
              01 // Campaign Overview
            </h3>
            <p className="text-base text-neutral-200 leading-relaxed font-normal">
              {project.fullDescription || project.shortDescription || project.summary}
            </p>
          </div>

          {/* Challenge & Strategy Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-2">
                <span>The Growth Challenge</span>
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.challenge || 'Inefficient ad spending, low conversion rates, and difficulty standing out in a crowded digital marketplace.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA500] mb-3 flex items-center gap-2">
                <span>Strategic Execution & Solution</span>
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.solution || project.strategy || 'Implemented audience-tailored creative funnels, high-intent SEO topic clusters, and automated conversion workflows.'}
              </p>
            </div>
          </div>

          {/* Tools & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.length > 0 && (
              <div>
                <span className="text-xs text-neutral-400 block mb-2 font-bold uppercase tracking-wider">
                  Marketing Tech & Platforms:
                </span>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-[#FFA500] font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {deliverables.length > 0 && (
              <div>
                <span className="text-xs text-neutral-400 block mb-2 font-bold uppercase tracking-wider">
                  Campaign Deliverables:
                </span>
                <div className="flex flex-wrap gap-2">
                  {deliverables.map((deliv, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 font-medium"
                    >
                      {deliv}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Visual Gallery */}
          {gallery.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#FFA500] mb-4">
                02 // Campaign Visuals & Analytics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gallery.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="rounded-2xl overflow-hidden border border-neutral-800 aspect-[16/10] bg-neutral-900">
                    <img
                      src={imgUrl}
                      alt={`${project.title} asset ${gIdx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h4 className="font-display text-2xl font-bold uppercase text-white tracking-tight">
                Want Similar Results for Your Brand?
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Let's discuss your marketing roadmap and turn your traffic into compounding revenue.
              </p>
            </div>
            <a
              href="#contact"
              onClick={() => setActiveProjectModal(null)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FFA500] hover:bg-[#ff9900] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#FFA500]/25 shrink-0 cursor-pointer"
            >
              <span>Discuss Campaign</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
