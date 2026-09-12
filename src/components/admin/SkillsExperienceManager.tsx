import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Award, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SkillItem, ExperienceItem, EducationItem, CertificationItem } from '../../types';

export const SkillsExperienceManager: React.FC = () => {
  const {
    skills,
    saveSkill,
    deleteSkill,
    experience,
    saveExperience,
    deleteExperience,
    education,
    saveEducation,
    deleteEducation,
    certifications,
    saveCertification,
    deleteCertification,
  } = usePortfolio();

  const [activeSubTab, setActiveSubTab] = useState<'skills' | 'experience' | 'credentials'>('skills');

  // Skill state
  const [editingSkill, setEditingSkill] = useState<Partial<SkillItem> | null>(null);

  // Experience state
  const [editingExp, setEditingExp] = useState<Partial<ExperienceItem> | null>(null);
  const [newAchievement, setNewAchievement] = useState('');
  const [newTool, setNewTool] = useState('');

  // Education & Cert state
  const [editingEdu, setEditingEdu] = useState<Partial<EducationItem> | null>(null);
  const [editingCert, setEditingCert] = useState<Partial<CertificationItem> | null>(null);

  // Skill Save
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name) return;
    try {
      await saveSkill(editingSkill);
      setEditingSkill(null);
    } catch (e) {
      console.error(e);
      alert('Failed to save skill');
    }
  };

  // Experience Save
  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp || !editingExp.company) return;
    try {
      await saveExperience(editingExp);
      setEditingExp(null);
    } catch (e) {
      console.error(e);
      alert('Failed to save experience');
    }
  };

  // Education Save
  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu || !editingEdu.degree) return;
    try {
      await saveEducation(editingEdu);
      setEditingEdu(null);
    } catch (e) {
      console.error(e);
      alert('Failed to save education');
    }
  };

  // Cert Save
  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert || !editingCert.name) return;
    try {
      await saveCertification(editingCert);
      setEditingCert(null);
    } catch (e) {
      console.error(e);
      alert('Failed to save certification');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight">
            Qualifications & Career History CMS
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Manage competencies, employment timeline, academic degrees, and accredited platform certifications.
          </p>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('skills')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeSubTab === 'skills' ? 'bg-[#FF6B00] text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Skills ({skills.length})
          </button>
          <button
            onClick={() => setActiveSubTab('experience')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeSubTab === 'experience' ? 'bg-[#FF6B00] text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Experience ({experience.length})
          </button>
          <button
            onClick={() => setActiveSubTab('credentials')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeSubTab === 'credentials' ? 'bg-[#FF6B00] text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Education & Certs ({education.length + certifications.length})
          </button>
        </div>
      </div>

      {/* SKILLS SUBTAB */}
      {activeSubTab === 'skills' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() =>
                setEditingSkill({
                  name: '',
                  category: 'marketing',
                  percentage: 85,
                  icon: 'Sparkles',
                  published: true,
                })
              }
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Skill</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((sk) => (
              <div
                key={sk.id}
                className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-white text-sm">{sk.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                    <span className="capitalize">{sk.category}</span>
                    <span>•</span>
                    <strong className="text-[#FF6B00]">{sk.percentage}%</strong>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingSkill({ ...sk })}
                    className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm(`Delete skill "${sk.name}"?`)) await deleteSkill(sk.id);
                    }}
                    className="p-1.5 rounded bg-neutral-800 hover:bg-red-950 hover:text-red-400 text-neutral-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXPERIENCE SUBTAB */}
      {activeSubTab === 'experience' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() =>
                setEditingExp({
                  company: '',
                  position: '',
                  employmentType: 'Full-time',
                  startDate: '2023',
                  endDate: 'Present',
                  location: 'Remote',
                  description: '',
                  achievements: [],
                  tools: [],
                  published: true,
                })
              }
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Work History</span>
            </button>
          </div>

          <div className="space-y-4">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">{exp.position}</h3>
                    <span className="text-[#FF6B00] font-semibold text-sm">@{exp.company}</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {exp.startDate} — {exp.endDate} • {exp.location}
                  </p>
                  <p className="text-xs text-neutral-300 mt-2 max-w-2xl line-clamp-2">
                    {exp.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingExp({ ...exp })}
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm(`Delete experience at "${exp.company}"?`)) {
                        await deleteExperience(exp.id);
                      }
                    }}
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-red-950 hover:text-red-400 text-neutral-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREDENTIALS SUBTAB */}
      {activeSubTab === 'credentials' && (
        <div className="space-y-8">
          {/* Education */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-bold uppercase text-white">
                Academic Degrees
              </h3>
              <button
                onClick={() =>
                  setEditingEdu({
                    degree: '',
                    institution: '',
                    startYear: '2016',
                    endYear: '2020',
                    description: '',
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-neutral-800 text-white text-xs font-semibold"
              >
                + Add Degree
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex justify-between items-start"
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#FF6B00]">
                      {edu.startYear} — {edu.endYear}
                    </span>
                    <h4 className="font-bold text-white text-sm mt-0.5">{edu.degree}</h4>
                    <p className="text-xs text-neutral-400">{edu.institution}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditingEdu({ ...edu })}
                      className="p-1 rounded bg-neutral-800 text-neutral-300"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm('Delete degree?')) await deleteEducation(edu.id);
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

          {/* Certifications */}
          <div className="pt-6 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-bold uppercase text-white">
                Accredited Certifications
              </h3>
              <button
                onClick={() =>
                  setEditingCert({
                    name: '',
                    issuer: '',
                    date: '2024',
                    credentialId: '',
                    certificateUrl: '',
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-[#FF6B00] text-black text-xs font-bold"
              >
                + Add Certification
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex justify-between items-start"
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#F59E0B]">
                      {cert.issuer}
                    </span>
                    <h4 className="font-bold text-white text-sm mt-0.5">{cert.name}</h4>
                    <p className="text-xs text-neutral-400">{cert.date}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditingCert({ ...cert })}
                      className="p-1 rounded bg-neutral-800 text-neutral-300"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm('Delete certification?')) await deleteCertification(cert.id);
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
        </div>
      )}

      {/* Skill Modal */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <h3 className="font-display text-xl font-bold uppercase text-white">Edit Skill</h3>
              <button onClick={() => setEditingSkill(null)} className="text-neutral-400 text-xs px-2 py-1 rounded bg-neutral-800">✕</button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Category</label>
                <select
                  value={editingSkill.category || 'marketing'}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-[#FF6B00]"
                >
                  <option value="marketing">Performance & Marketing</option>
                  <option value="creative">Creative & Content</option>
                  <option value="tools">Tools & Tech Stack</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                  Proficiency Level ({editingSkill.percentage || 80}%)
                </label>
                <input
                  type="range"
                  min={30}
                  max={100}
                  value={editingSkill.percentage || 80}
                  onChange={(e) => setEditingSkill({ ...editingSkill, percentage: Number(e.target.value) })}
                  className="w-full accent-[#FF6B00]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button type="button" onClick={() => setEditingSkill(null)} className="px-3 py-1.5 text-xs text-neutral-400">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded-xl bg-[#FF6B00] text-black font-bold text-xs">Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {editingExp && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <h3 className="font-display text-xl font-bold uppercase text-white">Edit Work Experience</h3>
              <button onClick={() => setEditingExp(null)} className="text-neutral-400 text-xs px-2 py-1 rounded bg-neutral-800">✕</button>
            </div>

            <form onSubmit={handleSaveExp} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={editingExp.company || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Position / Job Title *</label>
                  <input
                    type="text"
                    required
                    value={editingExp.position || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, position: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={editingExp.startDate || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">End Date</label>
                  <input
                    type="text"
                    value={editingExp.endDate || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingExp.location || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Role Description</label>
                <textarea
                  rows={3}
                  value={editingExp.description || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs resize-none"
                />
              </div>

              {/* Achievements Checklist */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">Key Achievements</label>
                <div className="space-y-1.5 mb-2">
                  {(editingExp.achievements || []).map((ach, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-neutral-300 p-1.5 rounded bg-neutral-900">
                      <span>{ach}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingExp({
                            ...editingExp,
                            achievements: (editingExp.achievements || []).filter((_, i) => i !== idx),
                          })
                        }
                        className="text-neutral-500 hover:text-red-400"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add achievement..."
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newAchievement.trim()) return;
                      setEditingExp({
                        ...editingExp,
                        achievements: [...(editingExp.achievements || []), newAchievement.trim()],
                      });
                      setNewAchievement('');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button type="button" onClick={() => setEditingExp(null)} className="px-3 py-1.5 text-xs text-neutral-400">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-xs">Save Experience</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {editingEdu && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <h3 className="font-display text-xl font-bold uppercase text-white">Edit Academic Degree</h3>
              <button onClick={() => setEditingEdu(null)} className="text-neutral-400 text-xs px-2 py-1 rounded bg-neutral-800">✕</button>
            </div>
            <form onSubmit={handleSaveEdu} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Degree Title *</label>
                <input
                  type="text"
                  required
                  value={editingEdu.degree || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Institution *</label>
                <input
                  type="text"
                  required
                  value={editingEdu.institution || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Start Year</label>
                  <input
                    type="text"
                    value={editingEdu.startYear || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, startYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">End Year</label>
                  <input
                    type="text"
                    value={editingEdu.endYear || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, endYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button type="button" onClick={() => setEditingEdu(null)} className="px-3 py-1.5 text-xs text-neutral-400">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded-xl bg-[#FF6B00] text-black font-bold text-xs">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {editingCert && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <h3 className="font-display text-xl font-bold uppercase text-white">Edit Certification</h3>
              <button onClick={() => setEditingCert(null)} className="text-neutral-400 text-xs px-2 py-1 rounded bg-neutral-800">✕</button>
            </div>
            <form onSubmit={handleSaveCert} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Certification Name *</label>
                <input
                  type="text"
                  required
                  value={editingCert.name || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Issuing Authority *</label>
                <input
                  type="text"
                  required
                  value={editingCert.issuer || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Date / Year</label>
                  <input
                    type="text"
                    value={editingCert.date || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Credential ID</label>
                  <input
                    type="text"
                    value={editingCert.credentialId || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">Verification URL</label>
                <input
                  type="url"
                  value={editingCert.certificateUrl || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, certificateUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button type="button" onClick={() => setEditingCert(null)} className="px-3 py-1.5 text-xs text-neutral-400">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded-xl bg-[#FF6B00] text-black font-bold text-xs">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
