import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Bell,
  Moon,
  ShieldCheck,
  LogOut,
  Edit,
  PhoneCall,
  X
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { currentUser, role, logout, darkMode, setDarkMode, addToast } = useApp();

  const [showEditModal, setShowEditModal] = useState(false);
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (555) 234-5678');
  const [notifState, setNotifState] = useState({
    attendance: true,
    wallet: true,
    events: true,
    announcements: true
  });

  return (
    <div className="space-y-5 pb-6 animate-in fade-in duration-300">
      {/* USER CARD HEADER */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
            alt={currentUser?.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500/50 shadow-xl mb-3"
          />
          <h2 className="text-lg font-black text-white">{currentUser?.name}</h2>
          <span className="text-xs font-mono font-bold text-indigo-300 mt-0.5">
            {role === 'student' ? currentUser?.studentId : currentUser?.facultyId || 'FAC-CS-402'}
          </span>

          <div className="flex items-center gap-2 mt-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {currentUser?.department}
            </span>
          </div>

          <button
            onClick={() => setShowEditModal(true)}
            className="mt-4 px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5"
          >
            <Edit className="w-3.5 h-3.5" /> Edit Profile Details
          </button>
        </div>
      </div>

      {/* INFORMATION LIST */}
      <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Academic & Contact Info</h3>

        <div className="space-y-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" /> Email Address
            </span>
            <span className="text-white font-semibold">{currentUser?.email}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-400" /> Mobile Phone
            </span>
            <span className="text-white font-semibold">{phone}</span>
          </div>

          {role === 'student' && (
            <>
              <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" /> Enrolled Program
                </span>
                <span className="text-white font-semibold">{currentUser?.course}</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-400" /> Current Semester
                </span>
                <span className="text-white font-semibold">Semester {currentUser?.semester}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* PREFERENCES & SETTINGS */}
      <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Preferences & Appearance</h3>

        <div className="space-y-2">
          <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-300 flex items-center gap-2">
              <Moon className="w-4 h-4 text-purple-400" /> Dark Mode Aesthetics
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-indigo-600' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${darkMode ? 'left-5' : 'left-1'}`}></div>
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-300 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" /> Low Attendance Alerts
            </span>
            <button
              onClick={() => setNotifState({ ...notifState, attendance: !notifState.attendance })}
              className={`w-10 h-6 rounded-full transition-colors relative ${notifState.attendance ? 'bg-indigo-600' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${notifState.attendance ? 'left-5' : 'left-1'}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* CAMPUS EMERGENCY HELPLINES */}
      <div className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/30 space-y-2">
        <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
          <PhoneCall className="w-4 h-4" /> 24/7 Campus Emergency Helplines
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-rose-500/20 text-slate-300">
            <p className="font-bold text-white">Campus Security</p>
            <p className="font-mono text-rose-400 mt-0.5">+1 (555) 911-CAMP</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-rose-500/20 text-slate-300">
            <p className="font-bold text-white">Medical Health Center</p>
            <p className="font-mono text-rose-400 mt-0.5">+1 (555) 911-CARE</p>
          </div>
        </div>
      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={logout}
        className="w-full py-3 rounded-2xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-xs border border-rose-500/30 transition-all flex items-center justify-center gap-2 shadow-md"
      >
        <LogOut className="w-4 h-4" /> Log Out Account
      </button>

      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-400" /> Edit Contact Details
              </h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Mobile Phone Number:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                onClick={() => {
                  addToast('Profile Updated', 'Your contact details have been saved.', 'success');
                  setShowEditModal(false);
                }}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
