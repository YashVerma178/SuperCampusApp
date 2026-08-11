import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  QrCode,
  Calendar,
  MapPin,
  ShoppingBag,
  UserCheck,
  Megaphone,
  BarChart3,
  Users,
  Building2
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { role, activeTab, setActiveTab } = useApp();

  if (role === 'student') {
    const tabs = [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'attendance', label: 'Attendance', icon: QrCode },
      { id: 'events', label: 'Events', icon: Calendar },
      { id: 'campus', label: 'Campus', icon: MapPin },
      { id: 'marketplace', label: 'Store', icon: ShoppingBag },
    ];

    return (
      <nav className="sticky bottom-0 z-40 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 shadow-2xl">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'text-indigo-400 bg-indigo-500/10 scale-105 font-bold'
                    : 'text-slate-400 hover:text-slate-200 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[11px] mt-0.5">{tab.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-0.5 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  if (role === 'faculty') {
    const tabs = [
      { id: 'home', label: 'Dashboard', icon: Home },
      { id: 'attendance', label: 'Classes & QR', icon: UserCheck },
      { id: 'events', label: 'Events', icon: Calendar },
      { id: 'announcements', label: 'Broadcast', icon: Megaphone },
    ];

    return (
      <nav className="sticky bottom-0 z-40 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all ${
                  isActive
                    ? 'text-purple-400 bg-purple-500/10 scale-105 font-bold'
                    : 'text-slate-400 hover:text-slate-200 font-medium'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] mt-0.5">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Admin Role
  const tabs = [
    { id: 'home', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'locations', label: 'Campus Data', icon: Building2 },
    { id: 'events', label: 'Events', icon: Calendar },
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all ${
                isActive
                  ? 'text-cyan-400 bg-cyan-500/10 scale-105 font-bold'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
