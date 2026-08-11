import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCheck, QrCode, Wallet, Calendar, Megaphone, Bell } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [filter, setFilter] = useState<string>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter(n => filter === 'all' || n.category === filter);

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'attendance': return <QrCode className="w-4 h-4 text-amber-400" />;
      case 'wallet': return <Wallet className="w-4 h-4 text-emerald-400" />;
      case 'event': return <Calendar className="w-4 h-4 text-indigo-400" />;
      case 'announcement': return <Megaphone className="w-4 h-4 text-purple-400" />;
      default: return <Bell className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Notifications</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium px-2 py-1 rounded-lg hover:bg-slate-800"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Clear All
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 p-2 overflow-x-auto border-b border-slate-800/60 no-scrollbar">
          {['all', 'attendance', 'wallet', 'event', 'announcement'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 text-xs rounded-xl capitalize font-medium whitespace-nowrap transition-colors ${
                filter === cat
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Bell className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">No notifications in this category</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => markNotificationRead(item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  item.read
                    ? 'bg-slate-800/40 border-slate-800/60 opacity-80'
                    : 'bg-indigo-950/30 border-indigo-500/30 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-800 shrink-0">
                    {getIcon(item.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                      <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
