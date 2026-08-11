import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QrCode, AlertTriangle, CheckCircle2, XCircle, Camera, ShieldCheck, History, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export const StudentAttendance: React.FC = () => {
  const {
    attendanceSubjects,
    attendanceHistory,
    activeSession,
    markStudentAttendanceQR,
    currentUser
  } = useApp();

  const [showScannerModal, setShowScannerModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null);

  // Overall attendance statistics
  const totalAttended = attendanceSubjects.reduce((acc, curr) => acc + curr.attendedClasses, 0);
  const totalClassesSum = attendanceSubjects.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const overallPct = totalClassesSum > 0 ? Number(((totalAttended / totalClassesSum) * 100).toFixed(1)) : 88.5;

  const lowAttendanceSubjects = attendanceSubjects.filter(s => s.percentage < 75);

  const handleScanSubmit = (tokenToScan?: string) => {
    const token = tokenToScan || passcode || (activeSession ? activeSession.activeToken : '');
    if (!token) return;

    const res = markStudentAttendanceQR(token);
    setScanResult(res);

    if (res.success) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        setShowScannerModal(false);
        setScanResult(null);
        setPasscode('');
      }, 2000);
    }
  };

  return (
    <div className="space-y-5 pb-6 animate-in fade-in duration-300">
      {/* ATTENDANCE OVERVIEW BANNER */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">ATTENDANCE PERFORMANCE</span>
            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="text-3xl font-black text-white">{overallPct}%</h2>
              <span className="text-xs font-bold text-emerald-400">Target 75% Met</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {totalAttended} of {totalClassesSum} Total Lectures Attended
            </p>
          </div>

          <button
            onClick={() => setShowScannerModal(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/40 transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <Camera className="w-4 h-4" />
            <span>Scan QR Code</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* LOW ATTENDANCE WARNING BANNER */}
      {lowAttendanceSubjects.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-300">Attendance Warning Alert</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              You are below 75% in <span className="font-bold text-white">{lowAttendanceSubjects.map(s => s.name).join(', ')}</span>. Mandatory attendance required to avoid debarment.
            </p>
          </div>
        </div>
      )}

      {/* SUBJECT-WISE ATTENDANCE LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            Subject Breakdown
          </h3>
          <span className="text-xs text-slate-400">{attendanceSubjects.length} Courses enrolled</span>
        </div>

        {attendanceSubjects.map((sub) => {
          const isLow = sub.percentage < 75;
          return (
            <div
              key={sub.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30">
                      {sub.code}
                    </span>
                    {isLow && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Below 75%
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{sub.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{sub.faculty}</p>
                </div>

                <div className="text-right">
                  <span className={`text-xl font-black ${isLow ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {sub.percentage}%
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {sub.attendedClasses} / {sub.totalClasses} Attended
                  </p>
                </div>
              </div>

              {/* Individual subject progress */}
              <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${isLow ? 'bg-amber-500' : 'bg-emerald-400'}`}
                  style={{ width: `${sub.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ATTENDANCE RECENT LOGS */}
      <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80">
        <div className="flex items-center gap-2 mb-3">
          <History className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white">Recent Attendance Logs</h3>
        </div>

        <div className="space-y-2">
          {attendanceHistory.map((rec) => (
            <div
              key={rec.id}
              className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800/60 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                {rec.status === 'present' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-white">{rec.subjectCode} — {rec.subjectName}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {rec.date} at {rec.time} • via {rec.method === 'qr_scan' ? 'QR Scanner' : 'Faculty Manual'}
                  </p>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                  rec.status === 'present'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {rec.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* QR SCANNER SIMULATOR MODAL */}
      {showScannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">QR Attendance Scanner</h3>
              </div>
              <button
                onClick={() => setShowScannerModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Simulated Camera Viewfinder */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-indigo-500/50 bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
              <div className="absolute inset-4 border border-indigo-400/40 rounded-xl pointer-events-none animate-pulse-glow"></div>

              {/* Animated Scan Line */}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-glow animate-bounce"></div>

              {activeSession && activeSession.status === 'active' ? (
                <div className="z-10 space-y-2">
                  <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                  <p className="text-xs font-bold text-white">Active Session Detected!</p>
                  <p className="text-[11px] text-indigo-300 font-mono">{activeSession.subjectCode}: {activeSession.subjectName}</p>
                  <button
                    onClick={() => handleScanSubmit(activeSession.activeToken)}
                    className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-transform active:scale-95"
                  >
                    ⚡ Auto Scan Active QR
                  </button>
                </div>
              ) : (
                <div className="z-10 text-slate-400 space-y-2">
                  <Camera className="w-8 h-8 mx-auto opacity-50 text-indigo-400" />
                  <p className="text-xs">Point camera at Faculty Attendance QR Code</p>
                </div>
              )}
            </div>

            {/* Scan Feedback Message */}
            {scanResult && (
              <div
                className={`p-3 rounded-xl text-xs font-bold text-center ${
                  scanResult.success
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {scanResult.message}
              </div>
            )}

            {/* Manual Passcode Fallback */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-[11px] text-slate-400 block font-medium">
                Manual Attendance Passcode Entry:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SUPER_CAMPUS_CS301_TOKEN_9921"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleScanSubmit()}
                  className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
