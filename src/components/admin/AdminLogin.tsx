import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLoginProps {
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite }) => {
  const { loginWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginWithEmail(email.trim(), password);
    } catch (err: any) {
      console.warn('Login error:', err);
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFA500]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#0c0c0c] border border-neutral-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 p-1 mx-auto mb-4 shadow-xl flex items-center justify-center">
            <div className="w-full h-full rounded-xl bg-black flex items-center justify-center border border-[#FFA500]/30">
              <ShieldCheck className="w-8 h-8 text-[#FFA500]" />
            </div>
          </div>

          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white">
            ADMIN LOGIN
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Private CMS console for <strong className="text-white">Javeria Maqsood</strong>
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-[#FFA500]">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Secure Authentication</span>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800/70 text-red-300 text-xs font-medium mb-6 animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#FFA500] transition-colors"
                placeholder="Enter your email"
              />
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#FFA500] transition-colors"
                placeholder="Enter your password"
              />
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-neutral-500 hover:text-neutral-300 transition-colors p-0.5"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            id="admin-submit-login-btn"
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-xl bg-[#FFA500] hover:bg-[#ff9900] text-black font-bold text-sm transition-all shadow-lg shadow-[#FFA500]/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <span>Verifying Credentials...</span> : <span>Unlock Admin Panel</span>}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Back to Public Site */}
        <div className="mt-6 pt-5 border-t border-neutral-800 text-center">
          <button
            type="button"
            onClick={onBackToSite}
            className="text-xs text-neutral-400 hover:text-[#FFA500] transition-colors"
          >
            ← Back to Javeria Maqsood Portfolio
          </button>
        </div>

      </div>
    </div>
  );
};
