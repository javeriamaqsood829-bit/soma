import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Globe, ArrowUpRight, TrendingUp } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HalftonePattern } from '../common/HalftonePattern';
import { LearnMoreButton } from '../common/LearnMoreButton';
import { ProjectItem } from '../../types';

interface ProjectsProps {
  onLearnMore?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onLearnMore }) => {
  const { projects, setActiveProjectModal, siteSettings } = usePortfolio();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'SOCIAL MEDIA', 'SEO', 'CONTENT MARKETING', 'PAID ADVERTISING', 'CAMPAIGNS'];

  const filteredProjects = projects.filter((p) => {
    if (p.published === false) return false;
    if (selectedCategory === 'ALL') return true;
    return p.category?.toUpperCase() === selectedCategory;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const handleAction = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      const el = document.getElementById('testimonials');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      className="relative min-h-[90vh] md:min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden pt-24 pb-12 px-6 sm:px-12 select-none"
    >
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full my-auto py-6 z-10">
        
        {/* Section Headline matching slide aesthetic */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#FFA500] font-bold block mb-2">
              Proven Digital Marketing Case Studies
            </span>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white inline-block">
              FEATURED <span className="text-[#FFA500]">PROJECTS</span>
            </h2>
          </div>

          {/* Navigation Arrows for Carousel */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'bg-neutral-900 text-white hover:border-[#FFA500] hover:text-[#FFA500]'
                  : 'bg-neutral-950 text-neutral-600 cursor-not-allowed'
              }`}
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'bg-neutral-900 text-white hover:border-[#FFA500] hover:text-[#FFA500]'
                  : 'bg-neutral-950 text-neutral-600 cursor-not-allowed'
              }`}
              aria-label="Next projects"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#FFA500] text-black shadow-md shadow-[#FFA500]/20'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Carousel */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id || index}
              onClick={() => setActiveProjectModal(project)}
              className="flex-none w-[280px] sm:w-[320px] md:w-[360px] snap-start group cursor-pointer"
            >
              <div className="rounded-3xl bg-neutral-950 border border-neutral-800/90 group-hover:border-[#FFA500]/60 p-3 transition-all duration-300 group-hover:-translate-y-1.5 shadow-xl group-hover:shadow-[#FFA500]/10 flex flex-col h-full">
                
                {/* Thumbnail Preview */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 mb-3.5">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Chip */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-neutral-800 text-[10px] uppercase font-bold text-[#FFA500]">
                    {project.category}
                  </div>

                  {/* Arrow Indicator */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#FFA500] group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  {/* Client Tag */}
                  {project.client && (
                    <div className="absolute bottom-3 left-3 text-[11px] text-neutral-300 font-medium">
                      Client: <span className="text-white font-semibold">{project.client}</span>
                    </div>
                  )}
                </div>

                {/* Title & Short Description */}
                <div className="px-2 pb-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FFA500] transition-colors leading-snug line-clamp-1 mb-1.5">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Highlights / Results Pill */}
                  {project.results && project.results.length > 0 && (
                    <div className="pt-2.5 border-t border-neutral-900 flex items-center justify-between text-xs">
                      <span className="text-neutral-400 font-medium text-[11px]">Primary Lift</span>
                      <span className="font-mono text-[#FFA500] font-bold text-xs flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {project.results[0].value} {project.results[0].metric}
                      </span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <div className="mt-8 flex justify-start">
          <LearnMoreButton
            text="View Client Reviews"
            onClick={handleAction}
            ariaLabel="Explore verified testimonials and client reviews"
          />
        </div>
      </div>

      {/* Slide Footer */}
      <div className="w-full max-w-7xl mx-auto flex items-end justify-between relative z-20 pt-4 border-t border-neutral-900/60">
        <div className="relative -ml-2 -mb-6">
          <HalftonePattern dotColor="#FFA500" className="w-24 h-24 sm:w-32 sm:h-32" />
        </div>

        <div className="text-right text-xs text-neutral-400 font-mono">
          <span className="text-white font-bold">{siteSettings.ownerName || 'Javeria Maqsood'}</span> • Case Studies & Projects
        </div>
      </div>
    </section>
  );
};
