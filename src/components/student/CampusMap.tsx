import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Search,
  Navigation,
  Clock,
  Building,
  Info,
  X,
  Compass,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { CampusLocation } from '../../types';

export const CampusMap: React.FC = () => {
  const { locations } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(locations[0]);
  const [navigatingTo, setNavigatingTo] = useState<CampusLocation | null>(null);

  const categories = ['All', 'Library', 'Labs', 'Cafeteria', 'Auditorium', 'Hostels', 'Sports'];

  const filteredLocations = locations.filter((loc) => {
    const matchesCat = selectedCategory === 'All' || loc.category === selectedCategory;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-4 pb-6 animate-in fade-in duration-300">
      {/* MAP HEADER */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300">
              <Compass className="w-4 h-4" />
              <span>INTERACTIVE CAMPUS MAP</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">Smart Campus Navigation</h2>
            <p className="text-xs text-slate-300 mt-1">Find Classrooms, Labs, Dining, Library & Events</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
            🗺️
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search building, lab number, dining hall, hostel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 scale-105'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* INTERACTIVE VECTOR SVG CAMPUS MAP VIEW */}
      <div className="relative w-full aspect-[4/3] rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>

        {/* Campus Pathways (SVG Lines) */}
        <svg className="absolute inset-0 w-full h-full stroke-slate-800 stroke-2 pointer-events-none">
          <line x1="20%" y1="20%" x2="35%" y2="40%" strokeDasharray="4 4" />
          <line x1="35%" y1="40%" x2="60%" y2="30%" strokeDasharray="4 4" />
          <line x1="35%" y1="40%" x2="48%" y2="65%" strokeDasharray="4 4" />
          <line x1="60%" y1="30%" x2="80%" y2="25%" strokeDasharray="4 4" />
          <line x1="48%" y1="65%" x2="75%" y2="55%" strokeDasharray="4 4" />
        </svg>

        {/* User Current Position Radar */}
        <div className="absolute left-[35%] top-[85%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="w-4 h-4 bg-indigo-500 rounded-full border-2 border-white shadow-glow animate-pulse"></div>
          <span className="text-[9px] font-black bg-indigo-600 text-white px-1.5 py-0.5 rounded-full mt-0.5 shadow-md">YOU</span>
        </div>

        {/* Location Building Pins */}
        {filteredLocations.map((loc) => {
          const isSelected = selectedLocation?.id === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => setSelectedLocation(loc)}
              style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-transform ${
                isSelected ? 'scale-125 z-40' : 'hover:scale-110'
              }`}
            >
              <div
                className={`p-2 rounded-2xl flex items-center gap-1.5 shadow-xl transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-cyan-500/50 ring-4 ring-cyan-400/30'
                    : 'bg-slate-900/90 text-cyan-300 border border-cyan-500/40 backdrop-blur-md'
                }`}
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-bold whitespace-nowrap">{loc.name.split(' ')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* SELECTED BUILDING DETAILS SHEET */}
      {selectedLocation && (
        <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 animate-in slide-in-from-bottom duration-200">
          <div className="flex gap-3">
            <img
              src={selectedLocation.image}
              alt={selectedLocation.name}
              className="w-20 h-20 rounded-2xl object-cover border border-slate-700 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {selectedLocation.category}
              </span>
              <h3 className="text-sm font-extrabold text-white mt-1 truncate">{selectedLocation.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{selectedLocation.building} • {selectedLocation.floor}</p>
              <div className="flex items-center gap-1 text-[11px] text-slate-300 mt-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{selectedLocation.openHours}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-2xl border border-slate-800">
            {selectedLocation.description}
          </p>

          <button
            onClick={() => setNavigatingTo(selectedLocation)}
            className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" /> Start Directions Navigation
          </button>
        </div>
      )}

      {/* SIMULATED DIRECTIONS DRAWER */}
      {navigatingTo && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
                <div>
                  <h3 className="text-sm font-bold text-white">Turn-by-Turn Navigation</h3>
                  <p className="text-[11px] text-cyan-300">To {navigatingTo.name}</p>
                </div>
              </div>
              <button onClick={() => setNavigatingTo(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                <span>Start at Main Student Quadrangle</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 ml-1" />
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                <span>Head North toward {navigatingTo.building} (approx 120m)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 ml-1" />
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400" />
                <span>Arrive at {navigatingTo.name} ({navigatingTo.floor})</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Distance: 3 min walk (240m)</span>
              <button
                onClick={() => setNavigatingTo(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
              >
                End Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
