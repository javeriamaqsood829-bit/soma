import React, { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HalftonePattern } from '../common/HalftonePattern';
import { LearnMoreButton } from '../common/LearnMoreButton';

interface TestimonialsProps {
  onLearnMore?: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onLearnMore }) => {
  const { testimonials, siteSettings } = usePortfolio();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const publishedReviews = testimonials.filter((t) => t.published !== false);

  return (
    <section
      id="testimonials"
      className="relative min-h-[90vh] md:min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden pt-24 pb-12 px-6 sm:px-12 select-none"
    >
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full my-auto py-6 z-10">
        
        {/* Section Headline matching Slide 3 aesthetic */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#FFA500] font-bold block mb-2">
              Social Proof & Client Validation
            </span>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-tight mb-3">
              CLIENT <span className="text-[#FFA500]">REVIEWS</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
              Trusted by enterprise brands, hyper-growth startups, and eCommerce founders to scale qualified traffic, revenue, and brand authority.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'bg-neutral-900 text-white hover:border-[#FFA500] hover:text-[#FFA500]'
                  : 'bg-neutral-950 text-neutral-600 cursor-not-allowed'
              }`}
              aria-label="Previous reviews"
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
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reviews Cards Row matching slide aesthetic */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory"
        >
          {publishedReviews.map((review, index) => (
            <div
              key={review.id || index}
              className="flex-none w-[280px] sm:w-[340px] md:w-[380px] snap-start"
            >
              {/* Review Card */}
              <div className="h-full rounded-3xl bg-neutral-950 border border-neutral-800/90 hover:border-[#FFA500]/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl group">
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#FFA500]">
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          className={`w-4 h-4 ${
                            sIdx < (review.rating || 5) ? 'fill-[#FFA500] text-[#FFA500]' : 'text-neutral-700'
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-neutral-700 group-hover:text-[#FFA500]/50 transition-colors" />
                  </div>

                  {/* Review Quote */}
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal mb-6">
                    "{review.quote || review.testimonial || review.text}"
                  </p>
                </div>

                {/* Client Avatar & Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-neutral-900">
                  <img
                    src={review.avatarUrl || review.clientPhoto || review.avatar}
                    alt={review.clientName || review.name}
                    className="w-11 h-11 rounded-full object-cover border border-neutral-800"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {review.clientName || review.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {review.clientRole || review.role} {review.company ? `• ${review.company}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <div className="mt-8 flex justify-start">
          <LearnMoreButton
            text="Get in Touch"
            onClick={handleAction}
            ariaLabel="Contact Javeria Maqsood for marketing consultation"
          />
        </div>
      </div>

      {/* Slide Footer */}
      <div className="w-full max-w-7xl mx-auto flex items-end justify-between relative z-20 pt-4 border-t border-neutral-900/60">
        <div className="relative -ml-2 -mb-6">
          <HalftonePattern dotColor="#FFA500" className="w-24 h-24 sm:w-32 sm:h-32" />
        </div>

        <div className="text-right text-xs text-neutral-400 font-mono">
          <span className="text-white font-bold">{siteSettings.ownerName || 'Javeria Maqsood'}</span> • Client Reviews
        </div>
      </div>
    </section>
  );
};
