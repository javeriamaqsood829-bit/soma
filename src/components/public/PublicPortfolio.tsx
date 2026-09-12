import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { SlideDeckViewer } from './SlideDeckViewer';
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
import { CaseStudyModal } from './CaseStudyModal';
import { Footer } from './Footer';

interface PublicPortfolioProps {
  onNavigateToAdmin: () => void;
}

export const PublicPortfolio: React.FC<PublicPortfolioProps> = ({ onNavigateToAdmin }) => {
  // viewMode defaults to 'deck' to present the exact 10 slide deck from user samples
  const [viewMode, setViewMode] = useState<'deck' | 'scroll'>('deck');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'deck' ? 'scroll' : 'deck'));
  };

  const handleNavigateToSlide = (index: number) => {
    setCurrentSlideIndex(index);
    if (viewMode !== 'deck') {
      setViewMode('deck');
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-[#FFA500] selection:text-black font-sans antialiased">
      {/* Top Navigation Bar matching the sample presentation header */}
      <Navbar
        viewMode={viewMode}
        onToggleViewMode={toggleViewMode}
        onNavigateToSlide={handleNavigateToSlide}
        onNavigateToAdmin={onNavigateToAdmin}
      />

      {/* Main Content Area */}
      {viewMode === 'deck' ? (
        <main className="w-full">
          <SlideDeckViewer
            currentSlideIndex={currentSlideIndex}
            onSlideChange={setCurrentSlideIndex}
            onNavigateToAdmin={onNavigateToAdmin}
          />
        </main>
      ) : (
        <main className="w-full divide-y divide-neutral-900/50">
          <Hero />
          <About />
          <Services />
          <Skills />
          <Experience />
          <EducationCertifications />
          <Projects />
          <Testimonials />
          <Contact />
          <ThankYouSlide />
          <Footer onNavigateToAdmin={onNavigateToAdmin} />
        </main>
      )}

      {/* Case Study Detail Modal for project deep-dives */}
      <CaseStudyModal />
    </div>
  );
};
