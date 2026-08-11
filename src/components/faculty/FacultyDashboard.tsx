import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  QrCode,
  Clock,
  Users,
  PlusCircle,
  Megaphone,
  Calendar,
  Sparkles,
  CheckCircle2,
  XCircle,
  TrendingUp,
  X,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FacultyDashboard: React.FC = () => {
  const {
    currentUser,
    todayClasses,
    activeSession,
    startFacultySession,
    endFacultySession,
    addAnnouncement,
    createEvent,
    allUsers
  } = useApp();

  const [selectedClassCode, setSelectedClassCode] = useState(todayClasses[0]?.subjectCode || 'CS301');
  const [selectedRoom, setSelectedRoom] = useState(todayClasses[0]?.room || 'Lab 402');
  const [sessionDuration, setSessionDuration] = useState(15);

  const [showCreateAncModal, setShowCreateAncModal] = useState(false);
  const [showCreateEvtModal, setShowCreateEvtModal] = useState(false);

  // Announcement Form State
  const [ancTitle, setAncTitle] = useState('');
  const [ancDesc, setAncDesc] = useState('');
  const [ancTarget, setAncTarget] = useState('Computer Science & Engineering');

  // Event Form State
  const [evtTitle, setEvtTitle] = useState('');
  const [evtCategory, setEvtCategory] = useState<any>('Workshops');
  const [evtVenue, setEvtVenue] = useState('Innovation Center Lab 3');
  const [evtDate, setEvtDate] = useState('Aug 28, 2026');

  // Timer calculation for live active session
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);

  useEffect(() => {
    if (activeSession && activeSession.status === 'active') {
      const interval = setInterval(() => {
        const diff = Math.max(0, Math.floor((new Date(activeSession.expiresAt).getTime() - Date.now()) / 1000));
        setTimeLeftSeconds(diff);
        if (diff === 0) {
          endFacultySession();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeSession]);

  const handleStartSession = () => {
    startFacultySession(selectedClassCode, selectedRoom, sessionDuration);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
  };

  const handleAncSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ancTitle || !ancDesc) return;
    addAnnouncement({
      title: ancTitle,
      description: ancDesc,
      author: currentUser?.name || 'Dr. Sarah Jenkins',
      authorRole: 'Faculty',
      priority: 'important',
      targetDept: ancTarget
    });
    setShowCreateAncModal(false);
    setAncTitle('');
    setAncDesc('');
  };

  const handleEvtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evtTitle) return;
    createEvent({
      title: evtTitle,
      description: 'Campus workshop organized by faculty.',
      category: evtCategory,
      date: evtDate,
      time: '02:00 PM - 05:00 PM',
      venue: evtVenue,
      organizer: currentUser?.name || 'Faculty Department',
      poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
      maxCapacity: 100,
      price: 0
    });
    setShowCreateEvtModal(false);
    setEvtTitle('');
  };

  const studentsList = allUsers.filter(u => u.role === 'student');

  return (
    <div className="space-y-5 pb-6 animate-in fade-in duration-300">
      {/* FACULTY PORTAL BANNER */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 border border-purple-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">FACULTY INSTRUCTOR PORTAL</span>
            <h2 className="text-2xl font-black text-white mt-1">Welcome, {currentUser?.name}</h2>
            <p className="text-xs text-slate-300 mt-1">{currentUser?.department} • {currentUser?.facultyId}</p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 text-xl shadow-inner">
            🧑‍🏫
          </div>
        </div>

        {/* Quick Action Pills */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-purple-500/20">
          <button
            onClick={() => setShowCreateAncModal(true)}
            className="py-2 px-3 rounded-xl bg-slate-900/80 border border-purple-500/30 hover:bg-purple-900/30 text-purple-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Megaphone className="w-4 h-4 text-purple-400" /> Broadcast Announcement
          </button>
          <button
            onClick={() => setShowCreateEvtModal(true)}
            className="py-2 px-3 rounded-xl bg-slate-900/80 border border-purple-500/30 hover:bg-purple-900/30 text-purple-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Calendar className="w-4 h-4 text-purple-400" /> Host Workshop/Event
          </button>
        </div>
      </div>

      {/* DYNAMIC QR ATTENDANCE GENERATOR TOOL */}
      <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800/80 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Live QR Attendance Session Tool</h3>
          </div>
          {activeSession && activeSession.status === 'active' && (
            <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> SESSION LIVE
            </span>
          )}
        </div>

        {activeSession && activeSession.status === 'active' ? (
          /* ACTIVE SESSION VIEW */
          <div className="p-5 rounded-2xl bg-gradient-to-b from-indigo-950/60 to-slate-950 border border-indigo-500/40 text-center space-y-3">
            <div className="flex items-center justify-between text-xs text-indigo-300 font-bold border-b border-indigo-500/20 pb-2">
              <span>{activeSession.subjectCode} — {activeSession.subjectName}</span>
              <span className="font-mono text-emerald-400">
                ⏱️ {Math.floor(timeLeftSeconds / 60)}m {timeLeftSeconds % 60}s Left
              </span>
            </div>

            {/* Generated QR Code Box */}
            <div className="w-44 h-44 bg-white p-3.5 rounded-3xl shadow-2xl mx-auto flex flex-col items-center justify-center relative">
              <QrCode className="w-full h-full text-slate-950" />
              <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-3xl pointer-events-none animate-pulse-glow"></div>
            </div>

            <p className="text-xs font-mono font-bold text-indigo-200">
              Passcode Token: {activeSession.activeToken}
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
              <span className="text-slate-400">Real-Time Check-Ins Scanned:</span>
              <span className="font-extrabold text-emerald-400 text-sm">
                {activeSession.scannedStudentIds.length} Students Checked In
              </span>
            </div>

            <button
              onClick={endFacultySession}
              className="w-full py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-xs border border-rose-500/30 transition-colors"
            >
              End Attendance Session Early
            </button>
          </div>
        ) : (
          /* SESSION CREATOR FORM */
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Select Class Lecture:</label>
                <select
                  value={selectedClassCode}
                  onChange={(e) => setSelectedClassCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="CS301">CS301 — Advanced Data Structures</option>
                  <option value="CS304">CS304 — Web Engineering</option>
                  <option value="CS308">CS308 — Database Management</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Lecture Room Location:</label>
                <input
                  type="text"
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">QR Expiration Timer (Minutes):</label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 30].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setSessionDuration(mins)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      sessionDuration === mins
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {mins} Mins
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStartSession}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Start Attendance & Display Dynamic QR
            </button>
          </div>
        )}
      </div>

      {/* STUDENT ROSTER & MANUAL ATTENDANCE EDITOR */}
      <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" /> Student Class Roster
          </h3>
          <span className="text-xs text-slate-400">{studentsList.length} enrolled students</span>
        </div>

        <div className="space-y-2">
          {studentsList.map((std) => {
            const isScanned = activeSession?.scannedStudentIds.includes(std.id);
            return (
              <div
                key={std.id}
                className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={std.avatar} alt={std.name} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{std.name}</h4>
                    <p className="text-[10px] text-slate-400">{std.studentId} • {std.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                      isScanned
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {isScanned ? 'Present (QR)' : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CREATE ANNOUNCEMENT MODAL */}
      {showCreateAncModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-purple-400" /> Send Broadcast Announcement
              </h3>
              <button onClick={() => setShowCreateAncModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAncSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Announcement Title:</label>
                <input
                  type="text"
                  placeholder="e.g. Lab Assignment #3 Submission Extended"
                  value={ancTitle}
                  onChange={(e) => setAncTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Target Department:</label>
                <select
                  value={ancTarget}
                  onChange={(e) => setAncTarget(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="All Departments">All Departments</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Message Content:</label>
                <textarea
                  rows={3}
                  placeholder="Enter detailed notification content..."
                  value={ancDesc}
                  onChange={(e) => setAncDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-transform active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" /> Broadcast Announcement Now
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE EVENT MODAL */}
      {showCreateEvtModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" /> Create Campus Workshop / Event
              </h3>
              <button onClick={() => setShowCreateEvtModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEvtSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Event Title:</label>
                <input
                  type="text"
                  placeholder="e.g. AI & Neural Networks Hands-on Seminar"
                  value={evtTitle}
                  onChange={(e) => setEvtTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">Category:</label>
                  <select
                    value={evtCategory}
                    onChange={(e) => setEvtCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Workshops">Workshops</option>
                    <option value="Technical">Technical</option>
                    <option value="Seminars">Seminars</option>
                    <option value="Hackathons">Hackathons</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">Date:</label>
                  <input
                    type="text"
                    value={evtDate}
                    onChange={(e) => setEvtDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Venue Location:</label>
                <input
                  type="text"
                  value={evtVenue}
                  onChange={(e) => setEvtVenue(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-transform active:scale-95"
              >
                Publish Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
