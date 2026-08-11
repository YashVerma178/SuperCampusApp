import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { LoginModal } from './components/auth/LoginModal';

// Student Screens
import { StudentHome } from './components/student/StudentHome';
import { StudentAttendance } from './components/student/StudentAttendance';
import { StudentWallet } from './components/student/StudentWallet';
import { StudentEvents } from './components/student/StudentEvents';
import { CampusMap } from './components/student/CampusMap';
import { StudentMarketplace } from './components/student/StudentMarketplace';
import { ProfileScreen } from './components/student/ProfileScreen';

// Faculty Screen
import { FacultyDashboard } from './components/faculty/FacultyDashboard';

// Admin Screen
import { AdminDashboard } from './components/admin/AdminDashboard';

import { LogIn, Wifi, Battery, Signal, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentUser, role, activeTab, mobileFrameMode } = useApp();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center text-4xl shadow-xl shadow-indigo-600/40 mb-4 animate-float">
          🎓
        </div>
        <h1 className="text-2xl font-black text-white">Super Campus</h1>
        <p className="text-sm text-slate-400 mt-1 max-w-xs">
          The All-in-One Mobile Super App for College Students, Faculty & Admin
        </p>

        <button
          onClick={() => setShowLoginModal(true)}
          className="mt-6 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/40 transition-transform active:scale-95 flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" /> Sign In / Demo Login
        </button>

        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </div>
    );
  }

  const renderActiveScreen = () => {
    if (role === 'faculty') {
      return <FacultyDashboard />;
    }

    if (role === 'admin') {
      return <AdminDashboard />;
    }

    // Student Role
    switch (activeTab) {
      case 'attendance': return <StudentAttendance />;
      case 'wallet': return <StudentWallet />;
      case 'events': return <StudentEvents />;
      case 'campus': return <CampusMap />;
      case 'marketplace': return <StudentMarketplace />;
      case 'profile': return <ProfileScreen />;
      case 'home':
      default:
        return <StudentHome />;
    }
  };

  const appView = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 selection:bg-indigo-500">
      {/* Mobile Top Status Bar */}
      <div className="bg-slate-900/90 text-slate-400 text-[11px] px-5 pt-2 pb-1 flex items-center justify-between font-mono shrink-0 border-b border-slate-800/40">
        <span>9:41 AM</span>
        <div className="w-20 h-3.5 bg-slate-950 rounded-full mx-auto hidden sm:block border border-slate-800/80"></div>
        <div className="flex items-center gap-2">
          <Signal className="w-3 h-3 text-slate-300" />
          <Wifi className="w-3 h-3 text-slate-300" />
          <Battery className="w-3.5 h-3.5 text-slate-300" />
        </div>
      </div>

      <Header />

      <main className="flex-1 overflow-y-auto p-4 sm:p-5">
        {renderActiveScreen()}
      </main>

      <BottomNav />
      <ToastContainer />
    </div>
  );

  if (mobileFrameMode) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-2 sm:p-6 font-sans">
        <div className="mb-3 text-center hidden sm:block">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Mobile Viewport Emulator Mode
          </div>
        </div>

        {/* iPhone 15 Frame Outer Bezel */}
        <div className="w-full max-w-[420px] h-[92vh] max-h-[860px] bg-slate-900 rounded-[48px] p-3 shadow-[0_0_50px_rgba(79,70,229,0.25)] border-[4px] border-slate-800 relative flex flex-col overflow-hidden">
          {/* Inner Screen */}
          <div className="w-full h-full bg-slate-950 rounded-[38px] overflow-hidden flex flex-col relative border border-slate-800">
            {appView}
          </div>
        </div>
      </div>
    );
  }

  return appView;
};

export const App: React.FC = () => {
  return <AppContent />;
};

export default App;
