import React, { useState } from 'react';
import { Save, CheckCircle2, Globe, Search } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const SeoManager: React.FC = () => {
  const { seo, updateSeo } = usePortfolio();
  const [formData, setFormData] = useState({ ...seo });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updateSeo(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
    } catch (e) {
      console.error(e);
      alert('Failed to save SEO settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight">
            Search Engine Optimization (SEO) & Social Graph
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Configure organic search metadata, Open Graph cards, and tracking tags.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>SEO Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* SERP Preview Simulator */}
        <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Google SERP Snippet Preview
          </span>
          <div className="text-xs text-emerald-400 font-mono">
            https://portfolio.digitalmarketing.com
          </div>
          <div className="text-lg font-bold text-sky-400 hover:underline cursor-pointer">
            {formData.metaTitle || 'Meta Title Placeholder'}
          </div>
          <div className="text-xs text-neutral-300 max-w-xl leading-relaxed">
            {formData.metaDescription || 'Meta Description preview will appear here...'}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
              Meta Title Tag (Recommended: 50-60 characters) *
            </label>
            <input
              type="text"
              required
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00]"
            />
            <span className="text-[11px] text-neutral-400 mt-1 block">
              Length: {formData.metaTitle.length} characters
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
              Meta Description (Recommended: 150-160 characters) *
            </label>
            <textarea
              rows={3}
              required
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00] resize-none"
            />
            <span className="text-[11px] text-neutral-400 mt-1 block">
              Length: {formData.metaDescription.length} characters
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
              Search Keywords (Comma Separated)
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
              Open Graph (Social Sharing) Image URL
            </label>
            <input
              type="url"
              value={formData.ogImage}
              onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-xs hover:brightness-110 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Updating SEO...' : 'Save SEO Metadata'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
