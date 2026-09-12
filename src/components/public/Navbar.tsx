import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, ArrowRight, Sparkles, PhoneCall } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface NavbarProps {
  onNavigateToAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToAdmin }) => {
  const { siteSettings } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Determine active section
      const sections = ['hero', 'about', 'services', 'process', 'skills', 'experience', 'projects', 'testimonials', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-neutral-900 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Name Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFA500] to-[#FF8000] flex items-center justify-center font-black text-black text-sm shadow-lg shadow-[#FFA500]/20 group-hover:scale-105 transition-transform">
            JM
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base sm:text-lg font-black uppercase tracking-wider text-white group-hover:text-[#FFA500] transition-colors">
              {siteSettings.ownerName || 'Javeria Maqsood'}
            </span>
            <span className="text-[10px] text-neutral-400 font-semibold tracking-widest uppercase">
              Digital Marketing Strategist
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-neutral-300">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`py-1 relative text-xs uppercase tracking-wider font-bold transition-colors ${
                  isActive ? 'text-[#FFA500]' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FFA500] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Button & Admin Link */}
        <div className="flex items-center gap-3">
          
          {/* Main Hire Me / Contact CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#FFA500]/20 transition-all hover:scale-105 active:scale-95"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Admin CMS Access */}
          {onNavigateToAdmin && (
            <button
              id="cms-portal-nav-btn"
              onClick={onNavigateToAdmin}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-full hover:border-[#FFA500]/40 transition-colors"
              title="Open Studio Admin CMS"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFA500]" />
              <span className="text-[11px] font-semibold">CMS</span>
            </button>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 lg:hidden focus:outline-none focus:ring-2 focus:ring-[#FFA500]/50"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/98 border-b border-neutral-900 px-6 py-6 space-y-4 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-2 pb-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-xs uppercase font-bold tracking-wider text-neutral-200 hover:text-[#FFA500] transition-colors flex items-center justify-between"
              >
                <span>{item.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFA500]/40" />
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-900 flex flex-col gap-2.5">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-black font-extrabold text-xs uppercase tracking-wider"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {onNavigateToAdmin && (
              <button
                onClick={() => {
                  onNavigateToAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-900 text-neutral-300 hover:text-white text-xs font-bold border border-neutral-800"
              >
                <ShieldCheck className="w-4 h-4 text-[#FFA500]" />
                <span>Admin CMS Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
