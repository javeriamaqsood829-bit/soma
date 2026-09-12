import React, { useState } from 'react';
import { Save, CheckCircle2, Upload, Link, User, Globe, Mail, Phone, MapPin, FileText, Lock, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';

export const SiteSettingsManager: React.FC = () => {
  const { siteSettings, updateSiteSettings, uploadMediaFile } = usePortfolio();
  const [formData, setFormData] = useState({ ...siteSettings });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);

  const { setCustomAdminPassword, adminEmail } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      setPasswordStatus({ type: 'error', message: 'Please enter a new password.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordStatus({ type: 'error', message: 'Password must be at least 6 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    setUpdatingPassword(true);
    setPasswordStatus(null);
    try {
      await setCustomAdminPassword(newPassword);
      setPasswordStatus({ type: 'success', message: 'Admin password updated successfully! Only you have access.' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordStatus({ type: 'error', message: err?.message || 'Failed to update password.' });
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updateSiteSettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
    } catch (err) {
      console.error(err);
      alert('Failed to save settings. Check console.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadMediaFile(file);
      setFormData((prev) => ({ ...prev, profileImage: url }));
    } catch (e) {
      console.error(e);
      alert('Upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCv(true);
    try {
      const url = await uploadMediaFile(file);
      setFormData((prev) => ({ ...prev, cvUrl: url }));
    } catch (e) {
      console.error(e);
      alert('Upload failed');
    } finally {
      setUploadingCv(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight">
            Global Site Settings
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Core branding, owner identity, contact channels, and resume configuration.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Brand & Identity Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
            01 // Identity & Branding
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Brand Name / Logo Text *
              </label>
              <input
                type="text"
                required
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Owner Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              Professional Title / Tagline *
            </label>
            <input
              type="text"
              required
              value={formData.professionalTitle}
              onChange={(e) => setFormData({ ...formData, professionalTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          {/* Profile Image URL & Upload */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              Profile Portrait Photo URL
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <img
                src={formData.profileImage}
                alt="Profile Preview"
                className="w-16 h-16 rounded-2xl object-cover border border-neutral-700 bg-neutral-950 shrink-0"
              />
              <div className="flex-1 w-full flex gap-2">
                <input
                  type="url"
                  value={formData.profileImage}
                  onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                  placeholder="https://..."
                />
                <label className="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1.5 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* CV URL & Upload */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              Executive CV / Resume Document URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.cvUrl || ''}
                onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
                className="flex-1 px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                placeholder="https://... or PDF file link"
              />
              <label className="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1.5 transition-colors">
                <Upload className="w-4 h-4" />
                <span>{uploadingCv ? 'Uploading...' : 'Upload PDF'}</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCvUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Contact Channels Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
            02 // Contact Channels & Location
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Contact Email *
              </label>
              <input
                type="email"
                required
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Phone / WhatsApp
              </label>
              <input
                type="text"
                value={formData.contactPhone || ''}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Location & Timezone
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>
        </div>

        {/* Social Links Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
            03 // Social Media & Professional Networks
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.linkedin || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.instagram || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Twitter / X Profile URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.twitter || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                GitHub / Code Repository URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.github || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, github: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>
        </div>

        {/* Owner Security & Custom Password (Restricted exclusively to Javeria Maqsood) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#FFA500]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFA500]">
                05 // Owner Security & Private Password
              </h3>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 font-mono">
              Owner: {adminEmail}
            </span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            Only you (<span className="text-white font-medium">{adminEmail}</span>) can access this Admin CMS. 
            Change your secret admin password anytime below. Only someone with your email and this secret password will ever be able to log in.
          </p>

          {passwordStatus && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                passwordStatus.type === 'success'
                  ? 'bg-emerald-950/70 border-emerald-800 text-emerald-300'
                  : 'bg-red-950/70 border-red-800 text-red-300'
              }`}
            >
              {passwordStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{passwordStatus.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                New Secret Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 chars)"
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FFA500]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FFA500]"
              />
            </div>
          </div>

          <button
            type="button"
            disabled={updatingPassword || !newPassword}
            onClick={handlePasswordChange}
            className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-[#FFA500] hover:text-black text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40 flex items-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{updatingPassword ? 'Updating...' : 'Update Secret Admin Password'}</span>
          </button>
        </div>

        {/* Footer Text */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
            04 // Footer Disclaimer & Mission Text
          </h3>
          <textarea
            rows={2}
            value={formData.footerText || ''}
            onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF6B00] resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#FF6B00]/20 flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
