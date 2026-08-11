import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Users,
  GraduationCap,
  TrendingUp,
  Wallet,
  Calendar,
  ShoppingBag,
  Building2,
  Lock,
  Unlock,
  PlusCircle,
  Search,
  CheckCircle2,
  AlertCircle,
  BarChart3
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    systemStats,
    allUsers,
    toggleUserStatus,
    events,
    marketplaceListings,
    locations,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'locations'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-6 animate-in fade-in duration-300">
      {/* ADMIN BANNER */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <span>CAMPUS SUPER ADMIN DASHBOARD</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">{currentUser?.name}</h2>
            <p className="text-xs text-slate-300 mt-1">{currentUser?.adminRole} • System Operations</p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-xl shadow-inner">
            ⚡
          </div>
        </div>

        {/* Tab Sub-Navigation */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-cyan-500/20 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            System Metrics
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'users'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            User Management ({allUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('locations')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'locations'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            Campus Locations ({locations.length})
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        /* SYSTEM ANALYTICS METRICS OVERVIEW */
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Students</span>
                <GraduationCap className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-2xl font-black text-white mt-2">{systemStats.totalStudents.toLocaleString()}</p>
              <span className="text-[10px] text-emerald-400 font-bold mt-1 block">Active Enrollment</span>
            </div>

            <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Faculty</span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-black text-white mt-2">{systemStats.totalFaculty}</p>
              <span className="text-[10px] text-purple-400 font-bold mt-1 block">Professors & Instructors</span>
            </div>

            <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Campus Attendance</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-black text-white mt-2">{systemStats.overallAttendanceRate}%</p>
              <span className="text-[10px] text-emerald-400 font-bold mt-1 block">+1.2% this semester</span>
            </div>

            <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Wallet Volume</span>
                <Wallet className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-2xl font-black text-white mt-2">${systemStats.walletTransactionsTotal.toLocaleString()}</p>
              <span className="text-[10px] text-cyan-400 font-bold mt-1 block">Processed via QR</span>
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" /> Department Attendance Rates
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { dept: 'Computer Science & Engineering', rate: 91.2, count: '1,240 Students' },
                { dept: 'Electrical & Electronics', rate: 87.5, count: '890 Students' },
                { dept: 'Mechanical Engineering', rate: 84.0, count: '750 Students' },
                { dept: 'Business Administration', rate: 93.1, count: '600 Students' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">{item.dept}</span>
                    <span className="font-mono text-cyan-400 font-bold">{item.rate}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${item.rate}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{item.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        /* USER MANAGEMENT TABLE */
        <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">System Accounts Roster</h3>
            <span className="text-xs text-slate-400">{filteredUsers.length} Users Listed</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search user name, email, department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-2">
            {filteredUsers.map((usr) => (
              <div
                key={usr.id}
                className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={usr.avatar} alt={usr.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{usr.name}</h4>
                      <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {usr.role}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{usr.email} • {usr.department}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleUserStatus(usr.id)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 border border-slate-700"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400" /> Active
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'locations' && (
        /* CAMPUS LOCATIONS MANAGER */
        <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Campus Building Locations</h3>
            <button
              onClick={() => addToast('Location Added', 'New campus location registered.', 'success')}
              className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Add Location
            </button>
          </div>

          <div className="space-y-2">
            {locations.map((loc) => (
              <div key={loc.id} className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={loc.image} alt={loc.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{loc.name}</h4>
                    <p className="text-[10px] text-slate-400">{loc.building} • {loc.openHours}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {loc.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
