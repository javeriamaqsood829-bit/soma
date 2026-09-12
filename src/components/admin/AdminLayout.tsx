import React, { useState } from 'react';
import {
  LayoutDashboard,
  Settings,
  Sparkles,
  FolderGit2,
  Briefcase,
  Layers,
  Award,
  MessageSquare,
  Image,
  Search,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminOverview } from './AdminOverview';
import { SiteSettingsManager } from './SiteSettingsManager';
import { HeroAboutCMS } from './HeroAboutCMS';
import { ProjectsManager } from './ProjectsManager';
import { ServicesProcessManager } from './ServicesProcessManager';
import { SkillsExperienceManager } from './SkillsExperienceManager';
import { ResultsTestimonialsManager } from './ResultsTestimonialsManager';
import { MessagesInbox } from './MessagesInbox';
import { MediaLibrary } from './MediaLibrary';
import { SeoManager } from './SeoManager';

interface AdminLayoutProps {
  onViewPublicSite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onViewPublicSite }) => {
  const { logout, adminEmail } = useAuth();
  const { messages, siteSettings } = usePortfolio();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'site-settings', label: 'Site Settings & CV', icon: Settings },
    { id: 'hero-about', label: 'Hero & About CMS', icon: Sparkles },
    { id: 'projects', label: 'Projects & Case Studies', icon: FolderGit2 },
    { id: 'services-process', label: 'Services & Roadmap', icon: Briefcase },
    { id: 'skills-experience', label: 'Skills & Experience', icon: Layers },
    { id: 'proof', label: 'Results & Endorsements', icon: Award },
    {
      id: 'messages',
      label: 'Client Inquiries',
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
    },
    { id: 'media', label: 'Media Library', icon: Image },
    { id: 'seo', label: 'SEO & Meta Tags', icon: Search },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#070707] text-neutral-100 flex flex-col md:flex-row antialiased">
      
      {/* Mobile Topbar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-neutral-800 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B00] text-black font-display font-black flex items-center justify-center text-sm">
            {siteSettings.brandName.charAt(0)}
          </div>
          <span className="font-display font-black uppercase text-sm text-white">
            Admin CMS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onViewPublicSite}
            className="p-1.5 text-xs text-neutral-300 bg-neutral-800 rounded-lg"
          >
            Live Site
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-neutral-300 bg-neutral-800 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-neutral-800/90 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand / Title */}
          <div className="p-6 border-b border-neutral-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#F59E0B] p-[1px]">
                <div className="w-full h-full bg-[#0d0d0d] rounded-[10px] flex items-center justify-center text-white font-display font-black text-lg">
                  {siteSettings.brandName.charAt(0)}
                </div>
              </div>
              <div>
                <span className="font-display font-black uppercase text-base text-white tracking-wide block leading-none">
                  {siteSettings.brandName}
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-[#FF6B00]">
                  Portfolio Admin CMS
                </span>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav items list */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-neutral-900 text-[#FF6B00] shadow-sm border border-neutral-800 font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF6B00]' : 'text-neutral-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full bg-red-950 border border-red-800 text-red-400 text-[10px] font-black">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile & actions */}
        <div className="p-4 border-t border-neutral-800/80 space-y-3">
          <button
            id="view-public-site-sidebar-btn"
            onClick={onViewPublicSite}
            className="w-full py-2 px-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>View Live Portfolio</span>
          </button>

          <div className="pt-2 flex items-center justify-between text-xs">
            <div className="truncate max-w-[150px]">
              <span className="block text-[10px] text-neutral-400 font-medium">Logged in as</span>
              <span className="block text-white font-medium truncate">{adminEmail}</span>
            </div>
            <button
              id="admin-logout-btn"
              onClick={logout}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-red-950 hover:text-red-400 text-neutral-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 max-w-7xl">
        {activeTab === 'overview' && (
          <AdminOverview onNavigateTab={handleTabChange} onViewPublicSite={onViewPublicSite} />
        )}
        {activeTab === 'site-settings' && <SiteSettingsManager />}
        {activeTab === 'hero-about' && <HeroAboutCMS />}
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'services-process' && <ServicesProcessManager />}
        {activeTab === 'skills-experience' && <SkillsExperienceManager />}
        {activeTab === 'proof' && <ResultsTestimonialsManager />}
        {activeTab === 'messages' && <MessagesInbox />}
        {activeTab === 'media' && <MediaLibrary />}
        {activeTab === 'seo' && <SeoManager />}
      </main>

    </div>
  );
};
