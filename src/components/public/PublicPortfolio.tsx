import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { ResultsBar } from './ResultsBar';
import { About } from './About';
import { Services } from './Services';
import { Process } from './Process';
import { Skills } from './Skills';
import { Experience } from './Experience';
import { EducationCertifications } from './EducationCertifications';
import { Projects } from './Projects';
import { Testimonials } from './Testimonials';
import { CallToAction } from './CallToAction';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { CaseStudyModal } from './CaseStudyModal';

interface PublicPortfolioProps {
  onNavigateToAdmin: () => void;
}

export const PublicPortfolio: React.FC<PublicPortfolioProps> = ({ onNavigateToAdmin }) => {
  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-[#FFA500] selection:text-black font-sans antialiased scroll-smooth">
      {/* Top Sticky Navigation Bar */}
      <Navbar onNavigateToAdmin={onNavigateToAdmin} />

      {/* Complete Scrolling Website Main Layout */}
      <main className="w-full">
        {/* 1. Hero / Introduction */}
        <Hero />

        {/* 2. Key Quantifiable Marketing Results */}
        <ResultsBar />

        {/* 3. About Me & Personal Strategy */}
        <About />

        {/* 4. Strategic Services & Offerings */}
        <Services />

        {/* 5. 6-Step Digital Marketing Process */}
        <Process />

        {/* 6. Core Skills, Technologies & Tools */}
        <Skills />

        {/* 7. Professional Work Experience */}
        <Experience />

        {/* 8. Education & Industry Certifications */}
        <EducationCertifications />

        {/* 9. Featured Client Projects & Case Studies */}
        <Projects />

        {/* 10. Client Testimonials & Endorsements */}
        <Testimonials />

        {/* 11. High-Impact Call To Action */}
        <CallToAction />

        {/* 12. Contact & Consultation Booking Form */}
        <Contact />
      </main>

      {/* Website Footer */}
      <Footer onNavigateToAdmin={onNavigateToAdmin} />

      {/* Case Study Deep-Dive Modal */}
      <CaseStudyModal />
    </div>
  );
};
