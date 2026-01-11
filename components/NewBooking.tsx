
import React, { useState, useMemo } from 'react';
import { User, Phone, MapPin, Bus as BusIcon, Calendar, Send, Info, CreditCard, Check, Loader2, Cloud, Users } from 'lucide-react';
import { CITIES, BUS_PRICES, ADMIN_PHONE, BANK_DETAILS } from '../constants';
import { syncBookingToCloud } from '../services/googleSheetService';

const NewBooking: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    from: '',
    to: '',
    date: '',
    bus: '',
    seatCount: 1
  });

  const [showBank, setShowBank] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const totalCost = useMemo(() => {
    const price = BUS_PRICES[formData.bus] || 0;
    return price * formData.seatCount;
  }, [formData.bus, formData.seatCount]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.from || !formData.to || !formData.date || !formData.bus) {
      alert("Please complete the luxury reservation form.");
      return;
    }

    setIsSyncing(true);

    const bookingId = `LGN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const bookingPayload = {
      id: bookingId,
      ...formData,
      totalCost,
      timestamp: new Date().toISOString()
    };

    await syncBookingToCloud(bookingPayload);
    setIsSyncing(false);

    const message = `*ELITE RESERVATION REQUEST*%0A%0A` +
      `🆔 *Booking ID:* ${bookingId}%0A` +
      `👤 *Passenger:* ${formData.name}%0A` +
      `📱 *Contact:* ${formData.phone}%0A` +
      `📍 *Route:* ${formData.from} ➔ ${formData.to}%0A` +
      `📅 *Date:* ${formData.date}%0A` +
      `🚌 *Service:* ${formData.bus}%0A` +
      `💺 *Seats:* ${formData.seatCount}%0A` +
      `💰 *Premium Cost:* LKR ${totalCost.toLocaleString()}%0A%0A` +
      `_Cloud Synchronized Security Checked_`;

    window.open(`https://wa.me/${ADMIN_PHONE}?text=${message}`, '_blank');
  };

  const InputWrapper = ({ label, icon: Icon, children }: any) => (
    <div className="space-y-2">
      <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 flex items-center gap-2">
        <Icon size={12} className="text-amber-500" /> {label}
      </label>
      {children}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
      <div className="lg:col-span-8 space-y-8 md:space-y-12">
        {/* Core Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 md:gap-y-10">
          <InputWrapper label="Full Passenger Name" icon={User}>
            <input 
              type="text" 
              placeholder="e.g. Alex Smith"
              className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-800 py-3 focus:border-amber-500 outline-none transition-colors font-bold text-base md:text-lg"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </InputWrapper>
          
          <InputWrapper label="WhatsApp Contact" icon={Phone}>
            <input 
              type="tel" 
              placeholder="947..."
              className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-800 py-3 focus:border-amber-500 outline-none transition-colors font-bold text-base md:text-lg"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </InputWrapper>

          <InputWrapper label="Departure Point" icon={MapPin}>
            <select 
              className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-800 py-3 focus:border-amber-500 outline-none transition-colors font-bold text-base md:text-lg appearance-none cursor-pointer"
              value={formData.from}
              onChange={(e) => setFormData({...formData, from: e.target.value})}
            >
              <option value="" disabled>Select City</option>
              {CITIES.map(c => <option key={c} value={c} className="text-slate-900">{c}</option>)}
            </select>
          </InputWrapper>

          <InputWrapper label="Final Destination" icon={MapPin}>
            <select 
              className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-800 py-3 focus:border-amber-500 outline-none transition-colors font-bold text-base md:text-lg appearance-none cursor-pointer"
              value={formData.to}
              onChange={(e) => setFormData({...formData, to: e.target.value})}
            >
              <option value="" disabled>Select City</option>
              {CITIES.map(c => <option key={c} value={c} className="text-slate-900">{c}</option>)}
            </select>
          </InputWrapper>

          <InputWrapper label="Travel Date" icon={Calendar}>
            <input 
              type="date" 
              className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-800 py-3 focus:border-amber-500 outline-none transition-colors font-bold text-base md:text-lg"
              value={formData.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </InputWrapper>

          <InputWrapper label="Coach Preference" icon={BusIcon}>
            <select 
              className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-800 py-3 focus:border-amber-500 outline-none transition-colors font-bold text-base md:text-lg appearance-none cursor-pointer"
              value={formData.bus}
              onChange={(e) => setFormData({...formData, bus: e.target.value})}
            >
              <option value="" disabled>Choose Experience</option>
              {Object.keys(BUS_PRICES).map(b => <option key={b} value={b} className="text-slate-900">{b}</option>)}
            </select>
          </InputWrapper>

          <InputWrapper label="Seats Required" icon={Users}>
            <div className="flex items-center gap-4 py-1">
              <button 
                onClick={() => setFormData(prev => ({...prev, seatCount: Math.max(1, prev.seatCount - 1)}))}
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                -
              </button>
              <span className="text-xl font-black w-8 text-center">{formData.seatCount}</span>
              <button 
                onClick={() => setFormData(prev => ({...prev, seatCount: Math.min(6, prev.seatCount + 1)}))}
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                +
              </button>
            </div>
          </InputWrapper>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={isSyncing}
          className="w-full py-5 md:py-6 gold-gradient text-slate-900 rounded-xl md:rounded-2xl font-black text-lg md:text-xl shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-70 active:scale-95 transition-all"
        >
          {isSyncing ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Syncing...
            </>
          ) : (
            <>
              Confirm Reservation <Send size={20} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>

      {/* Side Summary */}
      <div className="lg:col-span-4 space-y-6 md:space-y-8">
        <div className="bg-slate-950 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <h3 className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-6 md:mb-8 flex items-center gap-2">
            <Info size={12} /> Journey Analysis
          </h3>
          
          <div className="mb-8 pl-4 border-l-2 border-amber-500/30 space-y-6">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Origin</p>
              <p className="font-bold text-base">{formData.from || '---'}</p>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Destination</p>
              <p className="font-bold text-base">{formData.to || '---'}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8 border-t border-white/5 pt-6">
            <div className="flex justify-between items-end">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Reserved Seats</span>
              <span className="text-lg font-bold">{formData.seatCount} Ticket{formData.seatCount > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between items-end pt-2">
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Total Value</span>
              <span className="text-3xl font-black font-display">LKR {totalCost.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={() => setShowBank(!showBank)}
            className="w-full py-4 border border-white/10 rounded-xl font-bold text-xs hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            <CreditCard size={16} />
            {showBank ? "Hide Payments" : "Show Payments"}
          </button>
        </div>

        {showBank && (
          <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 animate-fadeInUp">
            <h4 className="font-bold text-base mb-4 flex items-center gap-2"><Check className="text-green-500" size={16} /> Settlement</h4>
            <div className="space-y-3 text-xs font-semibold">
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-800"><span className="text-slate-400">Account</span> <span className="text-amber-500">{BANK_DETAILS.accountNo}</span></div>
            </div>
          </div>
        )}

        <div className="p-5 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center gap-4">
          <Cloud size={18} className="text-slate-500" />
          <p className="text-[10px] font-bold">Cloud Real-time Sync Active</p>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
