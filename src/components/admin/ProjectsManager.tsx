import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Upload, TrendingUp, FolderGit2, Star } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectItem } from '../../types';

export const ProjectsManager: React.FC = () => {
  const { projects, saveProject, deleteProject, uploadMediaFile } = usePortfolio();
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [newMetric, setNewMetric] = useState({ label: '', value: '' });
  const [newServiceTag, setNewServiceTag] = useState('');
  const [newToolTag, setNewToolTag] = useState('');

  const handleOpenNew = () => {
    setIsNew(true);
    setEditingProject({
      title: '',
      slug: '',
      category: 'Social Media',
      client: '',
      date: new Date().getFullYear().toString(),
      shortDescription: '',
      fullDescription: '',
      challenge: '',
      strategy: '',
      solution: '',
      results: '',
      metrics: [],
      services: [],
      tools: [],
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      gallery: [],
      projectUrl: '',
      featured: false,
      published: true,
    });
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setIsNew(false);
    setEditingProject({ ...project });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    try {
      await saveProject(editingProject);
      setEditingProject(null);
    } catch (e) {
      console.error(e);
      alert('Failed to save project');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete case study "${title}" permanently?`)) {
      await deleteProject(id);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;
    setUploadingCover(true);
    try {
      const url = await uploadMediaFile(file);
      setEditingProject({ ...editingProject, coverImage: url });
    } catch (e) {
      console.error(e);
      alert('Upload failed');
    } finally {
      setUploadingCover(false);
    }
  };

  const addMetric = () => {
    if (!newMetric.label.trim() || !newMetric.value.trim() || !editingProject) return;
    setEditingProject({
      ...editingProject,
      metrics: [...(editingProject.metrics || []), { ...newMetric }],
    });
    setNewMetric({ label: '', value: '' });
  };

  const removeMetric = (idx: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      metrics: (editingProject.metrics || []).filter((_, i) => i !== idx),
    });
  };

  const addServiceTag = () => {
    if (!newServiceTag.trim() || !editingProject) return;
    setEditingProject({
      ...editingProject,
      services: [...(editingProject.services || []), newServiceTag.trim()],
    });
    setNewServiceTag('');
  };

  const removeServiceTag = (idx: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      services: (editingProject.services || []).filter((_, i) => i !== idx),
    });
  };

  const addToolTag = () => {
    if (!newToolTag.trim() || !editingProject) return;
    setEditingProject({
      ...editingProject,
      tools: [...(editingProject.tools || []), newToolTag.trim()],
    });
    setNewToolTag('');
  };

  const removeToolTag = (idx: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      tools: (editingProject.tools || []).filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight">
            Projects & Case Studies CMS
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Manage comprehensive client case studies, challenges, ROI metrics, and media assets.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-[#FF6B00]/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Case Study</span>
        </button>
      </div>

      {/* Projects Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950 mb-4">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-black/80 text-[11px] font-bold text-[#FF6B00] uppercase">
                    {project.category}
                  </span>
                </div>
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-md bg-[#FF6B00] text-black text-[10px] font-black uppercase">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                <span>Client: <strong>{project.client}</strong></span>
                <span>{project.date}</span>
              </div>

              <h3 className="font-display text-xl font-bold uppercase text-white tracking-tight mb-2">
                {project.title}
              </h3>

              <p className="text-xs text-neutral-300 line-clamp-2 mb-4">
                {project.shortDescription}
              </p>

              {/* Key Metric preview */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-[#FF6B00] font-bold w-fit mb-4">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{project.metrics[0].value} {project.metrics[0].label}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <span className={`text-[11px] font-semibold ${project.published ? 'text-emerald-400' : 'text-neutral-500'}`}>
                {project.published ? '● Live on Website' : '○ Draft Mode'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(project)}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                  title="Edit Case Study"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-red-950 hover:text-red-400 text-neutral-400 transition-colors"
                  title="Delete Case Study"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
              <h3 className="font-display text-2xl font-bold uppercase text-white">
                {isNew ? 'Create New Case Study' : `Edit "${editingProject.title}"`}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="text-neutral-400 hover:text-white text-sm px-2.5 py-1 rounded-lg bg-neutral-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={editingProject.category || 'Social Media'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00]"
                  >
                    <option value="Social Media">Social Media</option>
                    <option value="SEO">SEO</option>
                    <option value="Paid Advertising">Paid Advertising</option>
                    <option value="Content Marketing">Content Marketing</option>
                    <option value="Branding">Branding</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.client || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                    Campaign Timeline / Year
                  </label>
                  <input
                    type="text"
                    value={editingProject.date || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              {/* Cover Image Upload & URL */}
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                  Cover Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={editingProject.coverImage || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00]"
                  />
                  <label className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1.5">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingCover ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                  Short Summary (Card Preview)
                </label>
                <textarea
                  rows={2}
                  value={editingProject.shortDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                  Full Project Background
                </label>
                <textarea
                  rows={3}
                  value={editingProject.fullDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00] resize-none"
                />
              </div>

              {/* Challenge & Strategy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                    The Client Challenge
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.challenge || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                    The Growth Strategy
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.strategy || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, strategy: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00] resize-none"
                  />
                </div>
              </div>

              {/* Solution & Results */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                    Execution & Solution
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.solution || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                    Commercial Results & ROI
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.results || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-[#FF6B00] resize-none"
                  />
                </div>
              </div>

              {/* Metrics Manager */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <label className="block text-xs font-semibold uppercase text-[#FF6B00] mb-2">
                  Quantifiable Highlight Metrics
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(editingProject.metrics || []).map((m, mIdx) => (
                    <span key={mIdx} className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white flex items-center gap-1.5">
                      <strong className="text-[#FF6B00]">{m.value}</strong> {m.label}
                      <button type="button" onClick={() => removeMetric(mIdx)} className="text-neutral-500 hover:text-red-400">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Value (e.g. +340%)"
                    value={newMetric.value}
                    onChange={(e) => setNewMetric({ ...newMetric, value: e.target.value })}
                    className="w-1/3 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Label (e.g. Organic Traffic)"
                    value={newMetric.label}
                    onChange={(e) => setNewMetric({ ...newMetric, label: e.target.value })}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={addMetric}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Services & Tools Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">
                    Services Delivered
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {(editingProject.services || []).map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-neutral-900 text-xs text-neutral-300 flex items-center gap-1">
                        <span>{s}</span>
                        <button type="button" onClick={() => removeServiceTag(idx)}>×</button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      placeholder="Add service..."
                      value={newServiceTag}
                      onChange={(e) => setNewServiceTag(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-xs text-white"
                    />
                    <button type="button" onClick={addServiceTag} className="px-2 py-1.5 rounded bg-neutral-800 text-xs font-bold text-white">
                      +
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">
                    Tech Stack & Tools
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {(editingProject.tools || []).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-neutral-900 text-xs text-[#FF6B00] flex items-center gap-1">
                        <span>{t}</span>
                        <button type="button" onClick={() => removeToolTag(idx)}>×</button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      placeholder="Add tool..."
                      value={newToolTag}
                      onChange={(e) => setNewToolTag(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-xs text-white"
                    />
                    <button type="button" onClick={addToolTag} className="px-2 py-1.5 rounded bg-neutral-800 text-xs font-bold text-white">
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-300">
                  <input
                    type="checkbox"
                    checked={editingProject.featured || false}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="rounded text-[#FF6B00] focus:ring-0"
                  />
                  <span>Feature on Homepage Spotlight</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-300">
                  <input
                    type="checkbox"
                    checked={editingProject.published ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                    className="rounded text-[#FF6B00] focus:ring-0"
                  />
                  <span>Published (Visible to public)</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-xs hover:brightness-110"
                >
                  Save Project Case Study
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
