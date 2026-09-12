import React, { useState } from 'react';
import { Save, CheckCircle2, Sparkles, Plus, Trash2, Upload } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const HeroAboutCMS: React.FC = () => {
  const { hero, updateHero, about, updateAbout, uploadMediaFile } = usePortfolio();

  const [heroForm, setHeroForm] = useState({ ...hero });
  const [aboutForm, setAboutForm] = useState({ ...about });
  const [savingHero, setSavingHero] = useState(false);
  const [savingAbout, setSavingAbout] = useState(false);
  const [savedHero, setSavedHero] = useState(false);
  const [savedAbout, setSavedAbout] = useState(false);

  // Hero Trust Tag Helpers
  const [newTrustTag, setNewTrustTag] = useState('');
  const addTrustTag = () => {
    if (!newTrustTag.trim()) return;
    setHeroForm((prev) => ({
      ...prev,
      trustTags: [...(prev.trustTags || []), newTrustTag.trim()],
    }));
    setNewTrustTag('');
  };
  const removeTrustTag = (idx: number) => {
    setHeroForm((prev) => ({
      ...prev,
      trustTags: (prev.trustTags || []).filter((_, i) => i !== idx),
    }));
  };

  const handleHeroSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHero(true);
    setSavedHero(false);
    try {
      await updateHero(heroForm);
      setSavedHero(true);
      setTimeout(() => setSavedHero(false), 3500);
    } catch (e) {
      console.error(e);
      alert('Failed to save Hero section');
    } finally {
      setSavingHero(false);
    }
  };

  const handleAboutSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAbout(true);
    setSavedAbout(false);
    try {
      await updateAbout(aboutForm);
      setSavedAbout(true);
      setTimeout(() => setSavedAbout(false), 3500);
    } catch (e) {
      console.error(e);
      alert('Failed to save About section');
    } finally {
      setSavingAbout(false);
    }
  };

  const updateAboutStat = (index: number, field: string, value: any) => {
    const updated = [...(aboutForm.stats || [])];
    updated[index] = { ...updated[index], [field]: value };
    setAboutForm({ ...aboutForm, stats: updated });
  };

  return (
    <div className="space-y-12 max-w-4xl">
      
      {/* Hero Section CMS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight">
              Hero Section CMS
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Top-of-fold visual display, high-contrast headline, and action triggers.
            </p>
          </div>

          {savedHero && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Hero Saved!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleHeroSave} className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Badge Label
              </label>
              <input
                type="text"
                value={heroForm.badge}
                onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Highlighted Orange Headline
              </label>
              <input
                type="text"
                value={heroForm.highlightedHeading}
                onChange={(e) => setHeroForm({ ...heroForm, highlightedHeading: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              Main Bold Heading Text
            </label>
            <input
              type="text"
              value={heroForm.mainHeading}
              onChange={(e) => setHeroForm({ ...heroForm, mainHeading: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              Hero Lead Paragraph Description
            </label>
            <textarea
              rows={3}
              value={heroForm.description}
              onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00] resize-none"
            />
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Primary CTA Button Text
              </label>
              <input
                type="text"
                value={heroForm.primaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Secondary CTA Button Text
              </label>
              <input
                type="text"
                value={heroForm.secondaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          {/* Trust Tags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              Core Competency Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {(heroForm.trustTags || []).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 flex items-center gap-2"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTrustTag(idx)}
                    className="text-neutral-500 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 max-w-sm">
              <input
                type="text"
                value={newTrustTag}
                onChange={(e) => setNewTrustTag(e.target.value)}
                placeholder="Add capability tag..."
                className="flex-1 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-[#FF6B00]"
              />
              <button
                type="button"
                onClick={addTrustTag}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingHero}
              className="px-6 py-2.5 rounded-xl bg-[#FF6B00] text-black font-bold text-xs hover:brightness-110 flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{savingHero ? 'Saving Hero...' : 'Save Hero Changes'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* About Section CMS */}
      <div className="space-y-6 pt-6 border-t border-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight">
              About & Philosophy CMS
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Personal narrative, strategic approach statement, and quantifiable credibility metrics.
            </p>
          </div>

          {savedAbout && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>About Saved!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleAboutSave} className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Section Heading
              </label>
              <input
                type="text"
                value={aboutForm.heading}
                onChange={(e) => setAboutForm({ ...aboutForm, heading: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Section Subtitle
              </label>
              <input
                type="text"
                value={aboutForm.subtitle}
                onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              Full Biography & Narrative
            </label>
            <textarea
              rows={4}
              value={aboutForm.description}
              onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              Strategic Approach & Formula
            </label>
            <textarea
              rows={3}
              value={aboutForm.approach}
              onChange={(e) => setAboutForm({ ...aboutForm, approach: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00] resize-none"
            />
          </div>

          {/* Stats Grid Editor */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-3">
              About Credibility Counters
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(aboutForm.stats || []).map((st, sIdx) => (
                <div key={sIdx} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Prefix ($)"
                      value={st.prefix || ''}
                      onChange={(e) => updateAboutStat(sIdx, 'prefix', e.target.value)}
                      className="px-2 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Value (150)"
                      value={st.value}
                      onChange={(e) => updateAboutStat(sIdx, 'value', e.target.value)}
                      className="px-2 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Suffix (+)"
                      value={st.suffix || ''}
                      onChange={(e) => updateAboutStat(sIdx, 'suffix', e.target.value)}
                      className="px-2 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Label (e.g. Projects Done)"
                    value={st.label}
                    onChange={(e) => updateAboutStat(sIdx, 'label', e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingAbout}
              className="px-6 py-2.5 rounded-xl bg-[#FF6B00] text-black font-bold text-xs hover:brightness-110 flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{savingAbout ? 'Saving About...' : 'Save About Changes'}</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
