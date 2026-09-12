import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, Layers, Presentation, Compass, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface NavbarProps {
  viewMode?: 'deck' | 'scroll';
  onToggleViewMode?: () => void;
  onNavigateToSlide?: (slideIndex: number) => void;
  onNavigateToAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode = 'deck',
  onToggleViewMode,
  onNavigateToSlide,
  onNavigateToAdmin,
}) => {
  const { siteSettings } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero', slideIndex: 0 },
    { name: 'About', href: '#about', slideIndex: 1 },
    { name: 'Services', href: '#services', slideIndex: 2 },
    { name: 'Skills', href: '#skills', slideIndex: 3 },
    { name: 'Experience', href: '#experience', slideIndex: 4 },
    { name: 'Projects', href: '#projects', slideIndex: 6 },
    { name: 'Reviews', href: '#reviews', slideIndex: 7 },
    { name: 'Contact', href: '#contact', slideIndex: 8 },
  ];

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    if (viewMode === 'deck' && onNavigateToSlide) {
      e.preventDefault();
      onNavigateToSlide(item.slideIndex);
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || viewMode === 'deck'
          ? 'bg-black/90 backdrop-blur-md border-b border-neutral-900 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Name (Matches the screenshot: 'SA GRAPHIX STUDIO' in orange) */}
        <a
          href="#hero"
          onClick={(e) => {
            if (viewMode === 'deck' && onNavigateToSlide) {
              e.preventDefault();
              onNavigateToSlide(0);
            }
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="font-display text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider text-[#FFA500] hover:text-[#FFB833] transition-colors">
            {siteSettings.brandName || 'JAVERIA MAQSOOD'}
          </span>
        </a>

        {/* Desktop Nav Items (Home, About, Contact etc.) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          {navItems.slice(0, 5).map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="hover:text-[#FFA500] transition-colors py-1 relative group tracking-wide text-xs uppercase font-bold"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFA500] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, navItems[5])}
            className="hover:text-[#FFA500] transition-colors py-1 relative group tracking-wide text-xs uppercase font-bold"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, navItems[7])}
            className="hover:text-[#FFA500] transition-colors py-1 relative group tracking-wide text-xs uppercase font-bold"
          >
            Contact
          </a>
        </nav>

        {/* Right Section: Toggle Switch & Admin */}
        <div className="flex items-center gap-4">
          
          {/* View Mode Toggle (Matches the toggle switch on the top right of every sample slide!) */}
          {onToggleViewMode && (
            <div className="flex items-center gap-2">
              <span className="hidden lg:inline text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                {viewMode === 'deck' ? 'Slide Deck' : 'Web View'}
              </span>
              <button
                type="button"
                id="view-mode-toggle-btn"
                onClick={onToggleViewMode}
                title={viewMode === 'deck' ? 'Switch to Continuous Scroll Web View' : 'Switch to Presentation Slide Deck Mode'}
                aria-label="Toggle between slide deck and scroll view"
                className="relative w-12 h-6 rounded-full bg-[#FFA500] p-0.5 flex items-center cursor-pointer transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA500]/50"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-black shadow-md transform transition-transform duration-300 flex items-center justify-center text-[9px] font-black text-[#FFA500] ${
                    viewMode === 'deck' ? 'translate-x-0' : 'translate-x-6'
                  }`}
                >
                  {viewMode === 'deck' ? '●' : '↕'}
                </div>
              </button>
            </div>
          )}

          {/* Admin CMS link button */}
          {onNavigateToAdmin && (
            <button
              id="cms-portal-nav-btn"
              onClick={onNavigateToAdmin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800 rounded-full hover:border-[#FFA500]/50 transition-colors"
              title="Open Studio Admin CMS"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFA500]" />
              <span className="text-[11px] font-semibold">Admin CMS</span>
            </button>
          )}

          {/* Mobile menu trigger button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-neutral-900 px-6 py-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
            <span className="text-xs uppercase tracking-widest text-[#FFA500] font-bold">
              Navigation Menu
            </span>
            {onToggleViewMode && (
              <button
                onClick={() => {
                  onToggleViewMode();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-neutral-300 flex items-center gap-1.5 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800"
              >
                <span>{viewMode === 'deck' ? 'Switch to Web View' : 'Switch to Slide Deck'}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="p-2.5 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-sm font-semibold text-neutral-300 hover:text-[#FFA500] transition-colors flex items-center justify-between"
              >
                <span>{item.name}</span>
                <span className="text-[10px] text-neutral-600 font-mono">0{item.slideIndex + 1}</span>
              </a>
            ))}
          </div>

          {onNavigateToAdmin && (
            <div className="pt-2 border-t border-neutral-900">
              <button
                onClick={() => {
                  onNavigateToAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-900 text-neutral-200 hover:text-white text-xs font-bold border border-neutral-800"
              >
                <ShieldCheck className="w-4 h-4 text-[#FFA500]" />
                <span>Open Admin CMS</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
