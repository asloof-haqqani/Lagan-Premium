
import React, { useState, useMemo } from 'react';
import { User, Phone, MapPin, Bus as BusIcon, Calendar, Send, Info, CreditCard, Check, Loader2, Cloud, Users, HelpCircle, ArrowRight } from 'lucide-react';
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
      {/* Left Column: Form and Instructions */}
      <div className="lg:col-span-8 space-y-12 animate-fadeInUp">
        {/* Reservation Form */}
        <div className="space-y-8 md:space-y-12">
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

        {/* How to Book Section */}
        <div className="p-8 md:p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-black mb-8 flex items-center gap-3">
            <HelpCircle className="text-amber-500" size={24} /> 
            How to Book Your Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { step: "01", title: "Select Route", desc: "Choose your departure and destination cities from the elite network." },
              { step: "02", title: "Reserve Seat", desc: "Click 'Confirm' to synchronize your booking details with our cloud vault." },
              { step: "03", title: "WhatsApp Sync", desc: "Our system will redirect you to WhatsApp to finalize your request." },
              { step: "04", title: "Payment", desc: "Settle the booking amount via bank transfer using details on the right." }
            ].map((s, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-2xl font-black text-amber-500/20">{s.step}</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">{s.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Summary & Bank Details */}
      <div className="lg:col-span-4 space-y-6 md:space-y-8 animate-fadeInRight">
        <div className="bg-slate-950 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <h3 className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-6 md:mb-8 flex items-center gap-2">
            <Info size={12} /> Fare Summary
          </h3>
          
          <div className="mb-8 pl-4 border-l-2 border-amber-500/30 space-y-6">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Route</p>
              <p className="font-bold text-base">{formData.from && formData.to ? `${formData.from} ➔ ${formData.to}` : '---'}</p>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Service</p>
              <p className="font-bold text-base">{formData.bus || 'Select Coach'}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8 border-t border-white/5 pt-6">
            <div className="flex justify-between items-end">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Seats</span>
              <span className="text-lg font-bold">{formData.seatCount}</span>
            </div>
            <div className="flex justify-between items-end pt-2">
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Investment</span>
              <span className="text-3xl font-black font-display">LKR {totalCost.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={() => setShowBank(!showBank)}
            className="w-full py-4 gold-gradient text-slate-950 rounded-xl font-black text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <CreditCard size={16} />
            {showBank ? "Hide Bank Details" : "Show Bank Details"}
          </button>
        </div>

        {/* Bank Details Card */}
        {showBank && (
          <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-amber-500/20 shadow-xl animate-fadeInUp">
            <h4 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
              <Check className="text-amber-500" size={18} /> Official Settlement
            </h4>
            <div className="space-y-4">
              {[
                { label: "Bank", value: BANK_DETAILS.bank },
                { label: "Branch", value: BANK_DETAILS.branch },
                { label: "Account Holder", value: BANK_DETAILS.accountName },
                { label: "Account No", value: BANK_DETAILS.accountNo, highlight: true },
                { label: "Ref", value: BANK_DETAILS.reference }
              ].map((detail, idx) => (
                <div key={idx} className="flex flex-col gap-1 border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.1em]">{detail.label}</span>
                  <span className={`text-sm font-bold ${detail.highlight ? 'text-amber-600 dark:text-amber-500 text-lg' : 'text-slate-900 dark:text-white'}`}>
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-5 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center gap-4">
          <Cloud size={18} className="text-slate-500" />
          <p className="text-[10px] font-bold">Encrypted Cloud Storage Active</p>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
