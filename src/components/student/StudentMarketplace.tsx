import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Search,
  PlusCircle,
  Heart,
  Tag,
  MapPin,
  ShieldAlert,
  MessageCircle,
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { MarketplaceListing } from '../../types';

export const StudentMarketplace: React.FC = () => {
  const {
    marketplaceListings,
    addMarketplaceListing,
    toggleFavoriteListing,
    currentUser,
    addToast
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MarketplaceListing | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);

  // New Listing Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState<MarketplaceListing['category']>('Books');
  const [newCondition, setNewCondition] = useState<MarketplaceListing['condition']>('Like New');
  const [newLocation, setNewLocation] = useState('Campus Student Union');

  const categories = ['All', 'Books', 'Notes', 'Electronics', 'Furniture', 'Stationery', 'Sports', 'Services'];

  const filteredItems = marketplaceListings.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(newPrice);
    if (!newTitle || isNaN(priceNum)) return;

    addMarketplaceListing({
      title: newTitle,
      description: newDesc || 'Quality item listed by student.',
      price: priceNum,
      category: newCategory,
      condition: newCondition,
      images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600'
      ],
      location: newLocation
    });

    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewPrice('');
  };

  return (
    <div className="space-y-4 pb-6 animate-in fade-in duration-300">
      {/* HEADER BANNER */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
              <ShoppingBag className="w-4 h-4" />
              <span>P2P STUDENT MARKETPLACE</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">Buy & Sell Campus Items</h2>
            <p className="text-xs text-slate-300 mt-1">Textbooks, Laptops, Dorm Furniture & Notes</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition-transform active:scale-95 shrink-0"
          >
            <PlusCircle className="w-4 h-4" /> Sell Item
          </button>
        </div>
      </div>

      {/* SEARCH & CATEGORY PILLS */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search textbooks, electronics, desk chair, notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/30 scale-105'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT LISTINGS GRID */}
      <div className="grid grid-cols-2 gap-3">
        {filteredItems.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-500">
            <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30 text-amber-400" />
            <p className="text-sm font-medium">No marketplace items match your search</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer group rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 overflow-hidden shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-slate-950">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoriteListing(item.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-rose-400 backdrop-blur-md"
                  >
                    <Heart className={`w-3.5 h-3.5 ${item.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold bg-slate-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    {item.condition}
                  </span>
                </div>

                <div className="p-3">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">{item.category}</span>
                  <h3 className="text-xs font-bold text-white line-clamp-2 mt-0.5 leading-snug">{item.title}</h3>
                </div>
              </div>

              <div className="p-3 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-1">
                <span className="text-sm font-black text-amber-400">${item.price.toFixed(2)}</span>
                <span className="text-[9px] text-slate-400 truncate max-w-[80px]">{item.postedDate}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE NEW LISTING MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-amber-400" /> Post Item for Sale
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Item Title:</label>
                <input
                  type="text"
                  placeholder="e.g. iPad Air 64GB / Calculus Textbook"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">Category:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Books">Books</option>
                    <option value="Notes">Notes</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Stationery">Stationery</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">Price ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="25.00"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Condition:</label>
                <select
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Brand New">Brand New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Description:</label>
                <textarea
                  rows={3}
                  placeholder="Describe item condition, inclusions..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition-transform active:scale-95"
              >
                Publish Listing Live
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT DETAILS MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="relative aspect-video">
              <img src={selectedItem.images[0]} alt={selectedItem.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-950/80 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {selectedItem.category} • {selectedItem.condition}
                  </span>
                  <h2 className="text-base font-bold text-white mt-1">{selectedItem.title}</h2>
                </div>
                <span className="text-xl font-black text-amber-400 shrink-0">${selectedItem.price.toFixed(2)}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-2xl border border-slate-800">
                {selectedItem.description}
              </p>

              {/* Seller Card */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <img src={selectedItem.sellerAvatar} alt={selectedItem.sellerName} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{selectedItem.sellerName}</h4>
                  <p className="text-[10px] text-slate-400">{selectedItem.sellerDept} • {selectedItem.location}</p>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="flex-1 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" /> Contact Seller
                </button>
                <button
                  onClick={() => {
                    addToast('Listing Reported', 'Thank you. Our campus safety team will review this item.', 'warning');
                  }}
                  className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400"
                  title="Report Listing"
                >
                  <ShieldAlert className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT SELLER MODAL */}
      {showContactModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-amber-400" /> Contact Seller
              </h3>
              <button onClick={() => setShowContactModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center py-2 space-y-1">
              <p className="text-xs font-bold text-white">Item: {selectedItem.title}</p>
              <p className="text-xs text-amber-400 font-bold">${selectedItem.price.toFixed(2)}</p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  addToast('Message Sent! 💬', `Sent interest notification to ${selectedItem.sellerName}`, 'success');
                  setShowContactModal(false);
                }}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                💬 Send In-App Campus Chat
              </button>
              <button
                onClick={() => {
                  addToast('Phone Contact Shared', `Seller phone: +1 (555) 349-2019`, 'info');
                  setShowContactModal(false);
                }}
                className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                📞 Call / WhatsApp Seller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
