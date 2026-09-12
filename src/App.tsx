import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { PublicPortfolio } from './components/public/PublicPortfolio';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { ShieldCheck } from 'lucide-react';

function AppContent() {
  const { isAdmin, loading: authLoading } = useAuth();
  const { loading: portfolioLoading, seo } = usePortfolio();

  const [currentView, setCurrentView] = useState<'public' | 'admin'>(() => {
    return window.location.hash.includes('admin') ? 'admin' : 'public';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('admin')) {
        setCurrentView('admin');
      } else {
        setCurrentView('public');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setCurrentView('admin');
  };

  const navigateToPublic = () => {
    window.location.hash = '';
    setCurrentView('public');
  };

  // Sync document title and meta description with SEO settings
  useEffect(() => {
    if (seo?.metaTitle) {
      document.title = currentView === 'admin' ? `Admin CMS | ${seo.metaTitle}` : seo.metaTitle;
    }
  }, [seo?.metaTitle, currentView]);

  if (currentView === 'admin') {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-[#060606] flex items-center justify-center text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#FF6B00] border-t-transparent animate-spin" />
            <span className="text-xs text-neutral-400 uppercase tracking-wider">Loading CMS...</span>
          </div>
        </div>
      );
    }

    if (!isAdmin) {
      return <AdminLogin onBackToSite={navigateToPublic} />;
    }

    return <AdminLayout onViewPublicSite={navigateToPublic} />;
  }

  return (
    <>
      <PublicPortfolio onNavigateToAdmin={navigateToAdmin} />

      {/* Persistent Quick Access Badge for the Portfolio Owner */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          id="floating-cms-access-btn"
          onClick={navigateToAdmin}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-850 border border-[#FF6B00]/40 text-[#FF6B00] hover:text-white shadow-2xl text-xs font-bold transition-all hover:scale-105 active:scale-95 group backdrop-blur-md"
          title="Open Admin CMS to edit portfolio content"
        >
          <ShieldCheck className="w-4 h-4 text-[#FF6B00] group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Owner CMS Portal</span>
        </button>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </AuthProvider>
  );
}
