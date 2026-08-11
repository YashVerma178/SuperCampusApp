import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { GraduationCap, UserCheck, ShieldCheck, Lock, Mail, Sparkles, LogIn } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { login, switchDemoUser } = useApp();
  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('DemoPassword123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
    onClose();
  };

  const handleQuickPreset = (role: UserRole) => {
    switchDemoUser(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl mx-auto shadow-lg shadow-indigo-600/40">
            🎓
          </div>
          <h2 className="text-lg font-black text-white mt-2">Sign In to Super Campus</h2>
          <p className="text-xs text-slate-400">All-in-One College Super App</p>
        </div>

        {/* Preset Quick Login Buttons */}
        <div className="space-y-1.5 p-3 rounded-2xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block mb-1">
            ⚡ Instant Preset Demo Logins
          </span>

          <button
            onClick={() => handleQuickPreset('student')}
            className="w-full p-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-200 text-xs font-bold flex items-center justify-between transition-all"
          >
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-400" /> Student Demo (Alex Rivera)
            </span>
            <span className="text-[10px] text-indigo-300 font-mono">1-Click</span>
          </button>

          <button
            onClick={() => handleQuickPreset('faculty')}
            className="w-full p-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 text-purple-200 text-xs font-bold flex items-center justify-between transition-all"
          >
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-purple-400" /> Faculty Demo (Dr. Jenkins)
            </span>
            <span className="text-[10px] text-purple-300 font-mono">1-Click</span>
          </button>

          <button
            onClick={() => handleQuickPreset('admin')}
            className="w-full p-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/30 text-cyan-200 text-xs font-bold flex items-center justify-between transition-all"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Admin Demo (Dean Vance)
            </span>
            <span className="text-[10px] text-cyan-300 font-mono">1-Click</span>
          </button>
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            {(['student', 'faculty', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setSelectedRole(r);
                  setEmail(`${r}@example.com`);
                }}
                className={`flex-1 py-1.5 rounded-lg capitalize transition-colors ${
                  selectedRole === r ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Email Address:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Password:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-transform active:scale-95 flex items-center justify-center gap-1.5"
          >
            <LogIn className="w-4 h-4" /> Sign In as {selectedRole.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
};
