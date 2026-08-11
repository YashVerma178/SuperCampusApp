import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QrCode, ShieldCheck, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

export const DigitalIDCard: React.FC = () => {
  const { currentUser } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full">
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer group relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-xl shadow-indigo-950/40 hover:border-indigo-400/60 transition-all duration-300 transform active:scale-[0.99]"
      >
        {/* Decorative background lights */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>

        {!isFlipped ? (
          /* FRONT OF CARD */
          <div className="relative z-10">
            <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-sm shadow-md">
                  🎓
                </div>
                <div>
                  <h3 className="text-xs font-black tracking-wider text-indigo-300 uppercase">SUPER CAMPUS ID</h3>
                  <p className="text-[10px] text-slate-400">Official Student Digital Pass</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified</span>
              </div>
            </div>

            <div className="flex items-center gap-4 my-3">
              <div className="relative">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                  alt={currentUser?.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400/50 shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  <Sparkles className="w-3 h-3" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-base font-bold text-white truncate">{currentUser?.name}</h4>
                <p className="text-xs font-semibold text-indigo-300 font-mono mt-0.5">{currentUser?.studentId}</p>
                <p className="text-xs text-slate-300 mt-1 truncate">{currentUser?.department}</p>
                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                  <span className="bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">{currentUser?.course}</span>
                  <span className="bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">Sem {currentUser?.semester}</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white text-slate-900 shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                <QrCode className="w-10 h-10 text-slate-900" />
                <span className="text-[9px] font-bold text-indigo-950 mt-0.5">SCAN</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1 text-indigo-300">
                <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} /> Tap to flip pass
              </span>
              <span>Valid thru 2028</span>
            </div>
          </div>
        ) : (
          /* BACK OF CARD (QR SPECIFICS & EXPANDED) */
          <div className="relative z-10 flex flex-col items-center text-center py-2">
            <div className="w-28 h-28 bg-white p-2.5 rounded-2xl shadow-xl flex flex-col items-center justify-center mb-2">
              <QrCode className="w-full h-full text-slate-900" />
            </div>
            <p className="text-xs font-bold text-white">{currentUser?.name}</p>
            <p className="text-[11px] font-mono text-indigo-300 mt-0.5">{currentUser?.studentId}</p>
            <p className="text-[10px] text-slate-400 mt-1 max-w-[220px]">
              Scan for Library Access, Dining Wallet & Exam Hall Verification
            </p>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Biometric Encrypted QR</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
