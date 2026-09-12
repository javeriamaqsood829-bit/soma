import React, { useState } from 'react';
import {
  FolderGit2,
  Briefcase,
  Users,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Database,
  ExternalLink,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface AdminOverviewProps {
  onNavigateTab: (tab: string) => void;
  onViewPublicSite: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigateTab, onViewPublicSite }) => {
  const {
    projects,
    services,
    testimonials,
    messages,
    skills,
    siteSettings,
    seedDatabase,
    updateMessageStatus,
  } = usePortfolio();

  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);

  const unreadMessages = messages.filter((m) => m.status === 'unread');

  const handleSeed = async () => {
    if (!window.confirm('Sync all master portfolio initial data to Firestore? This will populate/update collections.')) {
      return;
    }
    setSeeding(true);
    setSeedSuccess(false);
    try {
      await seedDatabase();
      setSeedSuccess(true);
      setTimeout(() => setSeedSuccess(false), 4000);
    } catch (e) {
      console.error(e);
      alert('Failed to seed database. Check console.');
    } finally {
      setSeeding(false);
    }
  };

  const statCards = [
    {
      title: 'Projects & Case Studies',
      value: projects.length,
      detail: `${projects.filter((p) => p.featured).length} Featured`,
      tab: 'projects',
      icon: FolderGit2,
      color: 'text-[#FF6B00]',
    },
    {
      title: 'Active Growth Services',
      value: services.length,
      detail: 'Multichannel Offerings',
      tab: 'services',
      icon: Briefcase,
      color: 'text-[#F59E0B]',
    },
    {
      title: 'Client Inquiries',
      value: messages.length,
      detail: `${unreadMessages.length} Unread inquiries`,
      tab: 'messages',
      icon: MessageSquare,
      color: unreadMessages.length > 0 ? 'text-red-400' : 'text-emerald-400',
    },
    {
      title: 'Endorsements',
      value: testimonials.length,
      detail: 'Client Reviews',
      tab: 'testimonials',
      icon: Users,
      color: 'text-amber-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome & Database Status Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Firebase Firestore Live Sync Connected
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            Welcome, {siteSettings.ownerName}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Manage your digital marketing portfolio, update client case studies, revise service pricing, and respond to incoming leads in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onViewPublicSite}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleSeed}
            disabled={seeding}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black text-xs font-bold hover:brightness-110 transition-all shadow-md shadow-[#FF6B00]/20 disabled:opacity-50"
          >
            <Database className="w-4 h-4" />
            <span>{seeding ? 'Syncing Schema...' : 'Populate / Seed Firestore'}</span>
          </button>
        </div>
      </div>

      {seedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Database successfully synchronized with master template data!</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              onClick={() => onNavigateTab(card.tab)}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#FF6B00]/40 transition-all cursor-pointer group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {card.title}
                </span>
                <div className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-black transition-colors">
                  <Icon className={`w-4 h-4 ${card.color} group-hover:text-black`} />
                </div>
              </div>
              <div className="font-display text-4xl font-black text-white tracking-tight mb-1">
                {card.value}
              </div>
              <p className="text-xs text-neutral-400 flex items-center justify-between">
                <span>{card.detail}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Inquiries Preview */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase text-white tracking-tight">
              Recent Inquiries
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Prospective client briefs submitted through your public contact form.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('messages')}
            className="text-xs font-bold text-[#FF6B00] hover:underline flex items-center gap-1"
          >
            <span>Open All Messages ({messages.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-neutral-950/60 border border-neutral-800/80">
            <MessageSquare className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
            <p className="text-xs text-neutral-400">
              No inquiries received yet. Submit a test message on the public site contact form to test.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-800/60 overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950/60">
            {messages.slice(0, 5).map((msg) => (
              <div
                key={msg.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-900/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{msg.name}</span>
                    <span className="text-xs text-neutral-400">({msg.email})</span>
                    {msg.status === 'unread' && (
                      <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 text-[10px] font-bold uppercase">
                        Unread
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-300 mt-1 line-clamp-1">
                    <strong className="text-neutral-200">Service:</strong> {msg.serviceNeeded} •{' '}
                    <strong className="text-neutral-200">Budget:</strong> {msg.budgetRange} —{' '}
                    {msg.message}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {msg.status === 'unread' && (
                    <button
                      onClick={() => updateMessageStatus(msg.id, 'read')}
                      className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => onNavigateTab('messages')}
                    className="px-3 py-1 rounded-lg bg-[#FF6B00]/15 text-[#FF6B00] hover:bg-[#FF6B00]/25 text-xs font-semibold transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
