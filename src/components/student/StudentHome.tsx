import React from 'react';
import { useApp } from '../../context/AppContext';
import { DigitalIDCard } from '../common/DigitalIDCard';
import {
  QrCode,
  Wallet,
  Calendar,
  MapPin,
  ShoppingBag,
  Clock,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  Megaphone,
  CreditCard
} from 'lucide-react';

export const StudentHome: React.FC = () => {
  const {
    currentUser,
    setActiveTab,
    todayClasses,
    attendanceSubjects,
    walletBalance,
    events,
    announcements,
    activeSession
  } = useApp();

  // Overall attendance calculation
  const totalAttended = attendanceSubjects.reduce((acc, curr) => acc + curr.attendedClasses, 0);
  const totalClassesSum = attendanceSubjects.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const overallPct = totalClassesSum > 0 ? Number(((totalAttended / totalClassesSum) * 100).toFixed(1)) : 88.5;

  const lowAttendanceSubjects = attendanceSubjects.filter(s => s.percentage < 75);

  return (
    <div className="space-y-5 pb-6 animate-in fade-in duration-300">
      {/* DIGITAL STUDENT ID CARD */}
      <DigitalIDCard />

      {/* QUICK ACTIONS GRID */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">Quick Campus Actions</h3>
        <div className="grid grid-cols-5 gap-2">
          <button
            onClick={() => setActiveTab('attendance')}
            className="flex flex-col items-center p-2.5 rounded-2xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-300 transition-all hover:scale-105 active:scale-95 group"
          >
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30 group-hover:rotate-6 transition-transform">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold mt-1.5 text-white">Scan QR</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className="flex flex-col items-center p-2.5 rounded-2xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 text-emerald-300 transition-all hover:scale-105 active:scale-95 group"
          >
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30 group-hover:rotate-6 transition-transform">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold mt-1.5 text-white">Wallet</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className="flex flex-col items-center p-2.5 rounded-2xl bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-purple-300 transition-all hover:scale-105 active:scale-95 group"
          >
            <div className="p-2 rounded-xl bg-purple-600 text-white shadow-md shadow-purple-600/30 group-hover:rotate-6 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold mt-1.5 text-white">Events</span>
          </button>

          <button
            onClick={() => setActiveTab('campus')}
            className="flex flex-col items-center p-2.5 rounded-2xl bg-cyan-600/10 hover:bg-cyan-600/20 border border-cyan-500/20 text-cyan-300 transition-all hover:scale-105 active:scale-95 group"
          >
            <div className="p-2 rounded-xl bg-cyan-600 text-white shadow-md shadow-cyan-600/30 group-hover:rotate-6 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold mt-1.5 text-white">Map</span>
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className="flex flex-col items-center p-2.5 rounded-2xl bg-amber-600/10 hover:bg-amber-600/20 border border-amber-500/20 text-amber-300 transition-all hover:scale-105 active:scale-95 group"
          >
            <div className="p-2 rounded-xl bg-amber-600 text-white shadow-md shadow-amber-600/30 group-hover:rotate-6 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold mt-1.5 text-white">Store</span>
          </button>
        </div>
      </div>

      {/* LIVE QR ATTENDANCE BANNER (IF SESSION ACTIVE) */}
      {activeSession && activeSession.status === 'active' && (
        <div
          onClick={() => setActiveTab('attendance')}
          className="cursor-pointer p-4 rounded-2xl bg-gradient-to-r from-indigo-900/90 to-purple-900/90 border border-indigo-500/50 shadow-lg flex items-center justify-between animate-pulse-glow"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                LIVE ATTENDANCE SESSION ACTIVE
              </div>
              <h4 className="text-sm font-extrabold text-white mt-0.5">{activeSession.subjectCode} — {activeSession.subjectName}</h4>
              <p className="text-[11px] text-slate-300 mt-0.5">{activeSession.room} • Tap to Scan QR</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-indigo-300" />
        </div>
      )}

      {/* LOW ATTENDANCE ALERT (IF ANY) */}
      {lowAttendanceSubjects.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-amber-300">Low Attendance Alert ({lowAttendanceSubjects[0].percentage}%)</h4>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Your attendance in <span className="font-semibold text-white">{lowAttendanceSubjects[0].name}</span> is below 75%. Attend next 2 classes to normalize.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('attendance')}
            className="text-[11px] text-amber-300 font-bold hover:underline shrink-0"
          >
            Details
          </button>
        </div>
      )}

      {/* TODAY'S CLASSES */}
      <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Today's Class Schedule</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">{todayClasses.length} lectures today</span>
        </div>

        <div className="space-y-2.5">
          {todayClasses.map((cls) => (
            <div
              key={cls.id}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                cls.status === 'ongoing'
                  ? 'bg-indigo-950/40 border-indigo-500/40 shadow-sm'
                  : 'bg-slate-800/40 border-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-10 rounded-full ${
                    cls.status === 'ongoing' ? 'bg-indigo-500' : 'bg-slate-700'
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-indigo-300">{cls.subjectCode}</span>
                    {cls.status === 'ongoing' && (
                      <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ONGOING
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white mt-0.5">{cls.subjectName}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{cls.facultyName} • {cls.room}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-200 block">{cls.startTime}</span>
                <span className="text-[10px] text-slate-400">{cls.endTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DASHBOARD STATS ROW */}
      <div className="grid grid-cols-2 gap-3">
        {/* Attendance Summary Widget */}
        <div
          onClick={() => setActiveTab('attendance')}
          className="cursor-pointer p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-indigo-500/30 transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">Overall Attendance</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{overallPct}%</span>
            <span className="text-xs text-emerald-400 font-bold">Good</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                overallPct >= 75 ? 'bg-gradient-to-r from-indigo-500 to-emerald-400' : 'bg-amber-500'
              }`}
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 flex items-center justify-between">
            <span>Target: 75%</span>
            <span className="text-indigo-400 group-hover:underline">View details →</span>
          </p>
        </div>

        {/* Wallet Balance Widget */}
        <div
          onClick={() => setActiveTab('wallet')}
          className="cursor-pointer p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/30 transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">Campus Wallet</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white">${walletBalance.toFixed(2)}</span>
          </div>
          <button className="w-full mt-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center justify-center gap-1">
            Recharge / Pay <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* UPCOMING FEATURED EVENTS */}
      <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Upcoming Campus Events</h3>
          </div>
          <button
            onClick={() => setActiveTab('events')}
            className="text-xs text-indigo-400 font-semibold hover:underline"
          >
            See All ({events.length})
          </button>
        </div>

        {events.slice(0, 2).map((evt) => (
          <div
            key={evt.id}
            onClick={() => setActiveTab('events')}
            className="cursor-pointer flex gap-3 p-2.5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-purple-500/30 transition-all mb-2.5 last:mb-0"
          >
            <img
              src={evt.poster}
              alt={evt.title}
              className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="px-2 py-0.5 text-[9px] font-bold rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {evt.category}
              </span>
              <h4 className="text-xs font-bold text-white truncate mt-1">{evt.title}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{evt.date} • {evt.venue}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ANNOUNCEMENTS FEED */}
      <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80">
        <div className="flex items-center gap-2 mb-3">
          <Megaphone className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Campus Announcements</h3>
        </div>

        <div className="space-y-2.5">
          {announcements.slice(0, 2).map((anc) => (
            <div key={anc.id} className="p-3 rounded-2xl bg-slate-800/50 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {anc.author} ({anc.authorRole})
                </span>
                <span className="text-[10px] text-slate-400">{anc.date}</span>
              </div>
              <h4 className="text-xs font-bold text-white">{anc.title}</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{anc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
