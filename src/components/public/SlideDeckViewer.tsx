import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Grid, Sparkles } from 'lucide-react';
import { Hero } from './Hero';
import { About } from './About';
import { Services } from './Services';
import { Skills } from './Skills';
import { Experience } from './Experience';
import { EducationCertifications } from './EducationCertifications';
import { Projects } from './Projects';
import { Testimonials } from './Testimonials';
import { Contact } from './Contact';
import { ThankYouSlide } from './ThankYouSlide';

interface SlideDeckViewerProps {
  initialSlide?: number;
  onNavigateToAdmin?: () => void;
  currentSlideIndex: number;
  onSlideChange: (index: number) => void;
}

export const SlideDeckViewer: React.FC<SlideDeckViewerProps> = ({
  currentSlideIndex,
  onSlideChange,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);

  const slides = [
    { id: 'cover', title: 'Creative Portfolio', component: <Hero onLearnMore={() => onSlideChange(1)} /> },
    { id: 'welcome', title: 'Welcome & Bio', component: <About onLearnMore={() => onSlideChange(2)} /> },
    { id: 'services', title: 'What I Offer', component: <Services onLearnMore={() => onSlideChange(3)} /> },
    { id: 'skills', title: 'My Skills', component: <Skills onLearnMore={() => onSlideChange(4)} /> },
    { id: 'experience', title: 'Work Experience', component: <Experience onLearnMore={() => onSlideChange(5)} /> },
    { id: 'education', title: 'Education', component: <EducationCertifications onLearnMore={() => onSlideChange(6)} /> },
    { id: 'projects', title: 'My Latest Projects', component: <Projects onLearnMore={() => onSlideChange(7)} /> },
    { id: 'reviews', title: 'Client Reviews', component: <Testimonials onLearnMore={() => onSlideChange(8)} /> },
    { id: 'contact', title: "Let's Work Together", component: <Contact onLearnMore={() => onSlideChange(9)} /> },
    { id: 'thankyou', title: 'Thank You', component: <ThankYouSlide onRestart={() => onSlideChange(0)} /> },
  ];

  const totalSlides = slides.length;

  const goToNext = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      onSlideChange(currentSlideIndex + 1);
    }
  }, [currentSlideIndex, totalSlides, onSlideChange]);

  const goToPrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      onSlideChange(currentSlideIndex - 1);
    }
  }, [currentSlideIndex, onSlideChange]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-between select-none">
      
      {/* Active Slide Presentation View */}
      <div className="flex-1 relative w-full flex flex-col justify-center">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`w-full transition-all duration-500 ease-out ${
              idx === currentSlideIndex
                ? 'opacity-100 scale-100 relative pointer-events-auto z-10'
                : 'opacity-0 scale-98 absolute inset-0 pointer-events-none z-0'
            }`}
          >
            {slide.component}
          </div>
        ))}
      </div>

      {/* Floating Bottom Presentation Controls */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-neutral-950/90 border border-neutral-800 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl">
        
        {/* Previous Button */}
        <button
          onClick={goToPrev}
          disabled={currentSlideIndex === 0}
          className={`p-2 rounded-full transition-colors ${
            currentSlideIndex === 0
              ? 'text-neutral-700 cursor-not-allowed'
              : 'text-neutral-200 hover:text-white hover:bg-neutral-800'
          }`}
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Counter & Label */}
        <div className="flex items-center gap-2 px-2 text-xs font-mono">
          <span className="text-[#FFA500] font-bold">
            {String(currentSlideIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">
            {String(totalSlides).padStart(2, '0')}
          </span>
          <span className="hidden sm:inline text-neutral-500 font-sans text-[11px] font-semibold ml-1">
            • {slides[currentSlideIndex].title}
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          disabled={currentSlideIndex === totalSlides - 1}
          className={`p-2 rounded-full transition-colors ${
            currentSlideIndex === totalSlides - 1
              ? 'text-neutral-700 cursor-not-allowed'
              : 'text-neutral-200 hover:text-white hover:bg-neutral-800'
          }`}
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="h-4 w-[1px] bg-neutral-800 mx-0.5" />

        {/* Thumbnails Drawer Toggle */}
        <button
          onClick={() => setShowThumbnails(!showThumbnails)}
          className={`p-2 rounded-full transition-colors ${
            showThumbnails ? 'text-[#FFA500] bg-neutral-900' : 'text-neutral-400 hover:text-white'
          }`}
          title="All Slides Grid"
        >
          <Grid className="w-4 h-4" />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full text-neutral-400 hover:text-white transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Presentation'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Slide Thumbnails Drawer Modal */}
      {showThumbnails && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-center items-center p-6">
          <div className="w-full max-w-5xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFA500]" />
                <span>Presentation Slides Overview</span>
              </h3>
              <button
                onClick={() => setShowThumbnails(false)}
                className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800"
              >
                Close (ESC)
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-h-[75vh] overflow-y-auto pr-1">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onSlideChange(idx);
                    setShowThumbnails(false);
                  }}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    idx === currentSlideIndex
                      ? 'border-[#FFA500] bg-[#FFA500]/10 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <span className="text-[10px] font-mono text-[#FFA500] block mb-1">
                    Slide {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-bold truncate block">{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subtle Progress Bar on Bottom Border */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-neutral-900 z-50">
        <div
          className="h-full bg-[#FFA500] transition-all duration-300"
          style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  );
};
