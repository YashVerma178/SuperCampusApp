import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Search,
  MapPin,
  Clock,
  Users,
  Ticket,
  QrCode,
  CheckCircle2,
  Sparkles,
  X,
  Share2
} from 'lucide-react';
import { Event } from '../../types';
import confetti from 'canvas-confetti';

export const StudentEvents: React.FC = () => {
  const {
    events,
    registerForEvent,
    cancelEventRegistration,
    currentUser,
    setActiveTab
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showTicketModal, setShowTicketModal] = useState<boolean>(false);

  const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Workshops', 'Hackathons', 'Clubs'];

  const filteredEvents = events.filter((evt) => {
    const matchesCat = selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const userId = currentUser?.id || 'usr_std_001';

  const handleRegister = (evt: Event) => {
    registerForEvent(evt.id);
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    setShowTicketModal(true);
  };

  return (
    <div className="space-y-5 pb-6 animate-in fade-in duration-300">
      {/* HEADER BANNER */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 border border-purple-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-300">
              <Calendar className="w-4 h-4" />
              <span>CAMPUS LIFE & CLUBS</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">Discover Campus Events</h2>
            <p className="text-xs text-slate-300 mt-1">Hackathons, Fests, Workshops & Sports</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 text-xl shadow-inner">
            🎟️
          </div>
        </div>
      </div>

      {/* SEARCH & CATEGORY PILLS */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search events, topics, organizers, venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 shadow-sm"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* EVENT CARDS GRID */}
      <div className="space-y-3.5">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-500">
            <Calendar className="w-10 h-10 mx-auto mb-2 opacity-30 text-purple-400" />
            <p className="text-sm font-medium">No events found matching your search</p>
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const isRegistered = evt.registeredUserIds.includes(userId);
            return (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className="cursor-pointer group rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 overflow-hidden shadow-lg transition-all"
              >
                <div className="relative aspect-[21/9] sm:aspect-[3/1] overflow-hidden">
                  <img
                    src={evt.poster}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase bg-purple-900/90 text-purple-200 backdrop-blur-md border border-purple-500/40 shadow-sm">
                      {evt.category}
                    </span>
                    {evt.isFeatured && (
                      <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase bg-amber-500/90 text-slate-950 backdrop-blur-md flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                    {evt.price === 0 ? 'FREE' : `$${evt.price.toFixed(2)}`}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-extrabold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {evt.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 mt-2.5 text-[11px] text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{evt.registeredCount} / {evt.maxCapacity} Registered</span>
                    </div>

                    {isRegistered ? (
                      <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Pass Ready
                      </span>
                    ) : (
                      <span className="text-purple-400 font-bold hover:underline">View & Register →</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* EVENT DETAIL MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="relative aspect-video">
              <img src={selectedEvent.poster} alt={selectedEvent.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-950/80 text-white hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 flex-1 overflow-y-auto space-y-3">
              <div>
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {selectedEvent.category}
                </span>
                <h2 className="text-base font-bold text-white mt-1">{selectedEvent.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">Hosted by {selectedEvent.organizer}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>{selectedEvent.date} ({selectedEvent.time})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="flex-1">{selectedEvent.venue}</span>
                  <button
                    onClick={() => {
                      setSelectedEvent(null);
                      setActiveTab('campus');
                    }}
                    className="text-[10px] font-bold text-cyan-400 hover:underline"
                  >
                    View Map →
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">About Event</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedEvent.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                {selectedEvent.registeredUserIds.includes(userId) ? (
                  <div className="space-y-2">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                      <p className="text-xs font-bold text-emerald-300">Registration Confirmed!</p>
                      <p className="text-[11px] text-slate-400">Digital Entry Ticket is saved in your account.</p>
                    </div>

                    <button
                      onClick={() => setShowTicketModal(true)}
                      className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Ticket className="w-4 h-4" /> View Digital Pass QR
                    </button>

                    <button
                      onClick={() => cancelEventRegistration(selectedEvent.id)}
                      className="w-full py-2 text-slate-400 hover:text-rose-400 text-xs font-semibold"
                    >
                      Cancel Registration
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRegister(selectedEvent)}
                    className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    Register Now ({selectedEvent.price === 0 ? 'FREE' : `$${selectedEvent.price.toFixed(2)}`})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIGITAL TICKET QR PASS MODAL */}
      {showTicketModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950 border border-purple-500/40 rounded-3xl p-5 shadow-2xl space-y-4 text-center">
            <div className="flex justify-between items-center border-b border-purple-500/20 pb-3">
              <span className="text-xs font-extrabold text-purple-300">CAMPUS EVENT PASS</span>
              <button onClick={() => setShowTicketModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-2">
              <h3 className="text-base font-extrabold text-white">{selectedEvent.title}</h3>
              <p className="text-xs text-purple-300 mt-0.5">{selectedEvent.date} • {selectedEvent.venue}</p>
            </div>

            <div className="w-36 h-36 bg-white p-3 rounded-2xl shadow-2xl mx-auto flex flex-col items-center justify-center">
              <QrCode className="w-full h-full text-slate-950" />
            </div>
            <p className="text-[10px] font-mono text-slate-400">TICKET TOKEN: TKT-{selectedEvent.id.toUpperCase()}-2026</p>

            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs space-y-1">
              <p className="text-slate-400">Attendee: <span className="text-white font-bold">{currentUser?.name}</span></p>
              <p className="text-slate-400">ID: <span className="text-white font-mono">{currentUser?.studentId}</span></p>
            </div>

            <button
              onClick={() => setShowTicketModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
