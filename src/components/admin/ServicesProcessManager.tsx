import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, Sparkles, MoveRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ServiceItem, ProcessStep } from '../../types';
import { IconRenderer } from '../common/IconRenderer';

export const ServicesProcessManager: React.FC = () => {
  const {
    services,
    saveService,
    deleteService,
    process,
    saveProcessStep,
    deleteProcessStep,
  } = usePortfolio();

  // Service Modal State
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isNewService, setIsNewService] = useState(false);
  const [newFeature, setNewFeature] = useState('');

  // Process Step Modal State
  const [editingProcess, setEditingProcess] = useState<Partial<ProcessStep> | null>(null);

  // Service Handlers
  const handleOpenNewService = () => {
    setIsNewService(true);
    setEditingService({
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      icon: 'Sparkles',
      features: [],
      published: true,
    });
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;
    try {
      await saveService(editingService);
      setEditingService(null);
    } catch (e) {
      console.error(e);
      alert('Failed to save service');
    }
  };

  const addFeature = () => {
    if (!newFeature.trim() || !editingService) return;
    setEditingService({
      ...editingService,
      features: [...(editingService.features || []), newFeature.trim()],
    });
    setNewFeature('');
  };

  const removeFeature = (idx: number) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      features: (editingService.features || []).filter((_, i) => i !== idx),
    });
  };

  // Process Handlers
  const handleSaveProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProcess || !editingProcess.title) return;
    try {
      await saveProcessStep(editingProcess);
      setEditingProcess(null);
    } catch (e) {
      console.error(e);
      alert('Failed to save process step');
    }
  };

  const iconOptions = [
    'Sparkles',
    'Share2',
    'Search',
    'Target',
    'FileText',
    'BarChart3',
    'TrendingUp',
    'Users',
    'Mail',
    'Zap',
    'Globe',
  ];

  return (
    <div className="space-y-12 max-w-5xl">
      
      {/* Services Manager */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight">
              Services & Offerings CMS
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Add, update, or remove digital marketing service packages and deliverables.
            </p>
          </div>

          <button
            onClick={handleOpenNewService}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-xs hover:brightness-110 shadow-md shadow-[#FF6B00]/20 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
                    <IconRenderer name={service.icon || 'Sparkles'} className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${service.published ? 'bg-emerald-950 text-emerald-400' : 'bg-neutral-800 text-neutral-400'}`}>
                    {service.published ? 'Active' : 'Draft'}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold uppercase text-white tracking-tight mb-2">
                  {service.title}
                </h3>

                <p className="text-xs text-neutral-300 line-clamp-3 mb-4">
                  {service.shortDescription}
                </p>

                {service.features && (
                  <div className="text-[11px] text-neutral-400 space-y-1 mb-4">
                    {service.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 truncate">
                        <Check className="w-3 h-3 text-[#FF6B00] shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    setIsNewService(false);
                    setEditingService({ ...service });
                  }}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={async () => {
                    if (window.confirm(`Delete service "${service.title}"?`)) {
                      await deleteService(service.id);
                    }
                  }}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-red-950 hover:text-red-400 text-neutral-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Roadmap Manager */}
      <div className="space-y-6 pt-8 border-t border-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight">
              6-Step Execution Framework CMS
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Revise the sequential methodology steps displayed to prospective clients.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {process.map((step) => (
            <div
              key={step.id}
              className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <span className="font-display text-2xl font-black text-[#FF6B00] block mb-2">
                  {step.stepNumber}
                </span>
                <h3 className="font-display text-lg font-bold uppercase text-white tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800 flex justify-end">
                <button
                  onClick={() => setEditingProcess({ ...step })}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Step</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
              <h3 className="font-display text-2xl font-bold uppercase text-white">
                {isNewService ? 'Create Service Offering' : 'Edit Service Offering'}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="text-neutral-400 hover:text-white text-sm px-2.5 py-1 rounded-lg bg-neutral-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                  Icon Representation
                </label>
                <select
                  value={editingService.icon || 'Sparkles'}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00]"
                >
                  {iconOptions.map((ic) => (
                    <option key={ic} value={ic} className="bg-neutral-900">
                      {ic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                  Short Description (Card Summary) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingService.shortDescription || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                  In-Depth Strategy & Inclusions
                </label>
                <textarea
                  rows={3}
                  value={editingService.fullDescription || ''}
                  onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00] resize-none"
                />
              </div>

              {/* Features checklist */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">
                  Deliverables Checklist
                </label>
                <div className="space-y-1.5 mb-3">
                  {(editingService.features || []).map((feat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-neutral-300 p-1.5 rounded bg-neutral-900">
                      <span>{feat}</span>
                      <button type="button" onClick={() => removeFeature(idx)} className="text-neutral-500 hover:text-red-400">×</button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add deliverable..."
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="service-pub"
                  checked={editingService.published ?? true}
                  onChange={(e) => setEditingService({ ...editingService, published: e.target.checked })}
                  className="rounded text-[#FF6B00] focus:ring-0"
                />
                <label htmlFor="service-pub" className="text-xs text-neutral-300 font-medium">
                  Published and visible on live site
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-xs hover:brightness-110"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Process Modal */}
      {editingProcess && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-800">
              <h3 className="font-display text-2xl font-bold uppercase text-white">
                Edit Process Step {editingProcess.stepNumber}
              </h3>
              <button
                onClick={() => setEditingProcess(null)}
                className="text-neutral-400 hover:text-white text-sm px-2 py-0.5 rounded bg-neutral-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProcess} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                  Step Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingProcess.title || ''}
                  onChange={(e) => setEditingProcess({ ...editingProcess, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                  Step Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingProcess.description || ''}
                  onChange={(e) => setEditingProcess({ ...editingProcess, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00] resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setEditingProcess(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FF6B00] text-black font-bold text-xs hover:brightness-110"
                >
                  Save Step
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
