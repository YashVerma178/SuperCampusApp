import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  PlusCircle,
  QrCode,
  ArrowUpRight,
  ArrowDownLeft,
  Coffee,
  BookOpen,
  Printer,
  ShoppingBag,
  Sparkles,
  Search,
  Receipt,
  X
} from 'lucide-react';
import { WalletTransaction } from '../../types';
import confetti from 'canvas-confetti';

export const StudentWallet: React.FC = () => {
  const {
    walletBalance,
    walletTransactions,
    topUpWallet,
    makePayment
  } = useApp();

  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState<WalletTransaction | null>(null);

  // Top Up Form State
  const [topUpAmount, setTopUpAmount] = useState<number>(25);
  const [paymentMethod, setPaymentMethod] = useState<string>('Campus Student Card **** 4242');

  // Pay Form State
  const [payAmount, setPayAmount] = useState<string>('8.50');
  const [payMerchant, setPayMerchant] = useState<string>('Central Dining Hall');
  const [payCategory, setPayCategory] = useState<WalletTransaction['category']>('Cafeteria');

  // Filter state
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topUpAmount <= 0) return;
    topUpWallet(topUpAmount, paymentMethod);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    setShowTopUpModal(false);
  };

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(payAmount);
    if (isNaN(amt) || amt <= 0) return;
    const success = makePayment(amt, `${payMerchant} — Campus QR Pay`, payMerchant, payCategory);
    if (success) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      setShowPayModal(false);
    }
  };

  const filteredTransactions = walletTransactions.filter(tx => {
    const matchesCat = filterCategory === 'all' || tx.category === filterCategory;
    const matchesSearch = tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.merchantOrSender.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cafeteria': return <Coffee className="w-4 h-4 text-amber-400" />;
      case 'Library': return <BookOpen className="w-4 h-4 text-indigo-400" />;
      case 'Printing': return <Printer className="w-4 h-4 text-cyan-400" />;
      case 'Campus Store': return <ShoppingBag className="w-4 h-4 text-purple-400" />;
      default: return <Wallet className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-5 pb-6 animate-in fade-in duration-300">
      {/* WALLET BALANCE CARD */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Wallet className="w-4 h-4" />
              <span>CAMPUS DIGITAL WALLET</span>
            </div>
            <h2 className="text-3xl font-black text-white mt-1">${walletBalance.toFixed(2)}</h2>
            <p className="text-xs text-slate-400 mt-1">Ready for Instant Campus QR Payments</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowTopUpModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" /> Add Money
            </button>
            <button
              onClick={() => setShowPayModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <QrCode className="w-4 h-4" /> Pay Merchant
            </button>
          </div>
        </div>
      </div>

      {/* QUICK CATEGORY PAYMENTS */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Quick Pay Terminals</h3>
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => {
              setPayMerchant('Central Dining Hall');
              setPayCategory('Cafeteria');
              setPayAmount('8.50');
              setShowPayModal(true);
            }}
            className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 text-center transition-all group"
          >
            <Coffee className="w-5 h-5 text-amber-400 mx-auto group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold text-white block mt-1">Dining</span>
          </button>

          <button
            onClick={() => {
              setPayMerchant('Campus Print Hub');
              setPayCategory('Printing');
              setPayAmount('3.20');
              setShowPayModal(true);
            }}
            className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-center transition-all group"
          >
            <Printer className="w-5 h-5 text-cyan-400 mx-auto group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold text-white block mt-1">Printing</span>
          </button>

          <button
            onClick={() => {
              setPayMerchant('Central Library Fine & Copy');
              setPayCategory('Library');
              setPayAmount('5.00');
              setShowPayModal(true);
            }}
            className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 text-center transition-all group"
          >
            <BookOpen className="w-5 h-5 text-indigo-400 mx-auto group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold text-white block mt-1">Library</span>
          </button>

          <button
            onClick={() => {
              setPayMerchant('University Bookstore');
              setPayCategory('Campus Store');
              setPayAmount('14.99');
              setShowPayModal(true);
            }}
            className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 text-center transition-all group"
          >
            <ShoppingBag className="w-5 h-5 text-purple-400 mx-auto group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold text-white block mt-1">Bookstore</span>
          </button>
        </div>
      </div>

      {/* TRANSACTION HISTORY SECTION */}
      <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Transaction History</h3>
          <span className="text-xs text-slate-400">{walletTransactions.length} records</span>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="Cafeteria">Cafeteria</option>
            <option value="Library">Library</option>
            <option value="Printing">Printing</option>
            <option value="Events">Events</option>
            <option value="Campus Store">Campus Store</option>
            <option value="Wallet">Wallet Top-Up</option>
          </select>
        </div>

        {/* Transaction Items */}
        <div className="space-y-2 pt-1">
          {filteredTransactions.length === 0 ? (
            <p className="text-center py-6 text-xs text-slate-500">No transactions match your search</p>
          ) : (
            filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="cursor-pointer p-3 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-800 shrink-0">
                    {getCategoryIcon(tx.category)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{tx.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{tx.date} • {tx.merchantOrSender}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-black ${
                      tx.type === 'topup' ? 'text-emerald-400' : 'text-slate-200'
                    }`}
                  >
                    {tx.type === 'topup' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </span>
                  <span className="text-[9px] text-slate-400 block font-mono mt-0.5">{tx.referenceId}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* TOP-UP MODAL */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Recharge Digital Wallet</h3>
              </div>
              <button onClick={() => setShowTopUpModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTopUpSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Select Recharge Amount ($):</label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 25, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                        topUpAmount === amt
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Payment Method:</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Campus Student Card **** 4242">Campus Student Card (**** 4242)</option>
                  <option value="UPI Instant Payment (GooglePay / PhonePe)">UPI Instant Payment (GooglePay / PhonePe)</option>
                  <option value="Debit Card **** 8891">Debit Card (**** 8891)</option>
                  <option value="NetBanking (Bank of Campus)">NetBanking (Bank of Campus)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
              >
                Confirm Add ${topUpAmount.toFixed(2)}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* QR PAY MERCHANT MODAL */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Campus Merchant QR Payment</h3>
              </div>
              <button onClick={() => setShowPayModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePaySubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Merchant Terminal:</label>
                <input
                  type="text"
                  value={payMerchant}
                  onChange={(e) => setPayMerchant(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Payment Category:</label>
                <select
                  value={payCategory}
                  onChange={(e) => setPayCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Cafeteria">Cafeteria / Dining</option>
                  <option value="Library">Library</option>
                  <option value="Printing">Printing & Xerox</option>
                  <option value="Events">Event Registration</option>
                  <option value="Campus Store">University Bookstore</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Amount ($):</label>
                <input
                  type="number"
                  step="0.01"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-lg font-black text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Available Balance:</span>
                <span className="font-bold text-white">${walletBalance.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
              >
                Pay ${payAmount} Now
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TRANSACTION DETAILS RECEIPT MODAL */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Digital Receipt</h3>
              </div>
              <button onClick={() => setSelectedTx(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center py-2">
              <span className="text-2xl font-black text-white">
                {selectedTx.type === 'topup' ? '+' : '-'}${selectedTx.amount.toFixed(2)}
              </span>
              <h4 className="text-xs font-bold text-slate-300 mt-1">{selectedTx.title}</h4>
              <span className="inline-block mt-2 px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {selectedTx.status}
              </span>
            </div>

            <div className="space-y-2 text-xs bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Reference ID:</span>
                <span className="font-mono text-white font-semibold">{selectedTx.referenceId}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Merchant / Sender:</span>
                <span className="text-white font-semibold">{selectedTx.merchantOrSender}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Category:</span>
                <span className="text-white font-semibold">{selectedTx.category}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Date & Time:</span>
                <span className="text-white font-semibold">{selectedTx.date}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTx(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
