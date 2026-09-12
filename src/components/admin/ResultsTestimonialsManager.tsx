import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, TrendingUp, Users } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ResultMetric, TestimonialItem } from '../../types';
import { IconRenderer } from '../common/IconRenderer';

export const ResultsTestimonialsManager: React.FC = () => {
  const {
    results,
    saveResult,
    deleteResult,
    testimonials,
    saveTestimonial,
    deleteTestimonial,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'results' | 'testimonials'>('results');

  const [editingResult, setEditingResult] = useState<Partial<ResultMetric> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<TestimonialItem> | null>(null);

  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResult || !editingResult.number) return;
    try {
      await saveResult(editingResult);
      setEditingResult(null);
    } catch (e) {
      console.error(e);
      alert('Failed to save metric');
    }
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial || !editingTestimonial.clientName) return;
    try {
      await saveTestimonial(editingTestimonial);
      setEditingTestimonial(null);
    } catch (e) {
      console.error(e);
      alert('Failed to save testimonial');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight">
            Proof & Social Proof CMS
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Manage high-impact quantifiable results counters and client endorsements.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('results')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'results' ? 'bg-[#FF6B00] text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Growth Metrics ({results.length})
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'testimonials' ? 'bg-[#FF6B00] text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Testimonials ({testimonials.length})
          </button>
        </div>
      </div>

      {/* RESULTS METRICS TAB */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() =>
                setEditingResult({
                  number: '100',
                  prefix: '',
                  suffix: '%',
                  label: 'Organic Growth',
                  description: 'Validated client performance',
                  icon: 'TrendingUp',
                })
              }
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Metric</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00]">
                      <IconRenderer name={res.icon || 'TrendingUp'} className="w-4 h-4" />
                    </div>
                    <span className="font-display text-2xl font-black text-white">
                      {res.prefix}{res.number}{res.suffix}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{res.label}</h4>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{res.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-800 flex justify-end gap-1.5">
                  <button
                    onClick={() => setEditingResult({ ...res })}
                    className="p-1 rounded bg-neutral-800 text-neutral-300 hover:text-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm('Delete metric?')) await deleteResult(res.id);
                    }}
                    className="p-1 rounded bg-neutral-800 text-neutral-400 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TESTIMONIALS TAB */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() =>
                setEditingTestimonial({
                  clientName: '',
                  clientPosition: 'Founder & CEO',
                  company: 'Brand Co.',
                  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                  rating: 5,
                  quote: '',
                  featured: false,
                  published: true,
                })
              }
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                      ))}
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${test.published ? 'bg-emerald-950 text-emerald-400' : 'bg-neutral-800 text-neutral-400'}`}>
                      {test.published ? 'Live' : 'Hidden'}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-200 italic mb-6">"{test.quote}"</p>

                  <div className="flex items-center gap-3">
                    <img
                      src={test.avatarUrl}
                      alt={test.clientName}
                      className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">{test.clientName}</h4>
                      <p className="text-xs text-neutral-400">
                        {test.clientPosition} • <span className="text-[#FF6B00]">{test.company}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-800 flex justify-end gap-2">
                  <button
                    onClick={() => setEditingTestimonial({ ...test })}
                    className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm(`Delete review from "${test.clientName}"?`)) {
                        await deleteTestimonial(test.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result Modal */}
      {editingResult && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800">
              <h3 className="font-display text-xl font-bold uppercase text-white">Edit Metric Counter</h3>
              <button onClick={() => setEditingResult(null)} className="text-neutral-400 text-xs px-2 py-1 rounded bg-neutral-800">✕</button>
            </div>
            <form onSubmit={handleSaveResult} className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-neutral-400 mb-1">Prefix ($)</label>
                  <input
                    type="text"
                    value={editingResult.prefix || ''}
                    onChange={(e) => setEditingResult({ ...editingResult, prefix: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-neutral-400 mb-1">Number *</label>
                  <input
                    type="text"
                    required
                    value={editingResult.number || ''}
                    onChange={(e) => setEditingResult({ ...editingResult, number: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-neutral-400 mb-1">Suffix (%)</label>
                  <input
                    type="text"
                    value={editingResult.suffix || ''}
                    onChange={(e) => setEditingResult({ ...editingResult, suffix: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Label Headline *</label>
                <input
                  type="text"
                  required
                  value={editingResult.label || ''}
                  onChange={(e) => setEditingResult({ ...editingResult, label: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Supporting Context</label>
                <input
                  type="text"
                  value={editingResult.description || ''}
                  onChange={(e) => setEditingResult({ ...editingResult, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button type="button" onClick={() => setEditingResult(null)} className="px-3 py-1.5 text-xs text-neutral-400">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded-xl bg-[#FF6B00] text-black font-bold text-xs">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800">
              <h3 className="font-display text-xl font-bold uppercase text-white">Edit Client Testimonial</h3>
              <button onClick={() => setEditingTestimonial(null)} className="text-neutral-400 text-xs px-2 py-1 rounded bg-neutral-800">✕</button>
            </div>
            <form onSubmit={handleSaveTestimonial} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.clientName || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Position / Title</label>
                  <input
                    type="text"
                    value={editingTestimonial.clientPosition || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientPosition: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.company || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Rating (1-5)</label>
                  <select
                    value={editingTestimonial.rating || 5}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r} className="bg-neutral-900">
                        {r} Stars
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Avatar Photo URL</label>
                <input
                  type="url"
                  value={editingTestimonial.avatarUrl || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, avatarUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Endorsement Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={editingTestimonial.quote || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="test-pub"
                  checked={editingTestimonial.published ?? true}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, published: e.target.checked })}
                  className="rounded text-[#FF6B00] focus:ring-0"
                />
                <label htmlFor="test-pub" className="text-xs text-neutral-300 font-medium">
                  Show on live public website
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button type="button" onClick={() => setEditingTestimonial(null)} className="px-3 py-1.5 text-xs text-neutral-400">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-xs">Save Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
