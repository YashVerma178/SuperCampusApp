import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Wallet, Smartphone, Monitor, ShieldCheck, UserCheck, GraduationCap } from 'lucide-react';
import { NotificationDrawer } from '../student/NotificationDrawer';

export const Header: React.FC = () => {
  const {
    currentUser,
    role,
    switchDemoUser,
    activeTab,
    setActiveTab,
    walletBalance,
    unreadNotificationCount,
    mobileFrameMode,
    setMobileFrameMode
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3">
        {/* Top Demo Quick Switcher Bar */}
        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800/60 text-xs">
          <div className="flex items-center gap-1 text-slate-400 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Demo Switch:
          </div>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => switchDemoUser('student')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                role === 'student'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Student
            </button>
            <button
              onClick={() => switchDemoUser('faculty')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                role === 'faculty'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Faculty
            </button>
            <button
              onClick={() => switchDemoUser('admin')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                role === 'admin'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </button>
          </div>

          <button
            onClick={() => setMobileFrameMode(!mobileFrameMode)}
            title={mobileFrameMode ? "Switch to Full Desktop View" : "Switch to Mobile Phone View"}
            className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition-colors hidden sm:flex items-center gap-1 text-xs"
          >
            {mobileFrameMode ? <Monitor className="w-3.5 h-3.5 text-indigo-400" /> : <Smartphone className="w-3.5 h-3.5 text-indigo-400" />}
            <span>{mobileFrameMode ? "Full" : "Phone"}</span>
          </button>
        </div>

        {/* Main App Bar Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('profile')}
              className="relative group focus:outline-none"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                alt={currentUser?.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/50 group-hover:border-indigo-400 transition-all shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </button>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-bold text-white leading-none">
                  {currentUser ? currentUser.name : 'Super Campus'}
                </h1>
                <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {role}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-medium truncate max-w-[170px] sm:max-w-[240px]">
                {role === 'student' ? currentUser?.studentId || 'CS2026-0892' : currentUser?.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {role === 'student' && (
              <button
                onClick={() => setActiveTab('wallet')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold transition-all active:scale-95"
              >
                <Wallet className="w-3.5 h-3.5 text-indigo-400" />
                <span>${walletBalance.toFixed(2)}</span>
              </button>
            )}

            <button
              onClick={() => setShowNotifications(true)}
              className="relative p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 transition-colors border border-slate-700/50 active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-slate-900 animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Notification Drawer Modal */}
      <NotificationDrawer isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </>
  );
};
