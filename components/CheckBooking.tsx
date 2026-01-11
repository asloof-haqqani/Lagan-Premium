
import React, { useState } from 'react';
import { Search, Loader2, Ticket, MapPin, Clock, CreditCard, Download, User, Phone, Bus, ShieldCheck, Zap, Users } from 'lucide-react';
import { Booking } from '../types';

const CheckBooking: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  const handleSearch = async () => {
    if (!phone) return;
    setIsLoading(true);
    
    setTimeout(() => {
      if (phone.startsWith('94')) {
        setBooking({
          id: 'LGN-PREM-7792',
          name: 'Hon. Alex Pierce',
          phone: phone,
          from: 'Nintavur',
          to: 'Kandy',
          date: '2024-12-28',
          time: '09:45 PM',
          bus: 'Sakeer Express Elite',
          seats: 2,
          selectedSeats: [], // No longer used for display
          paymentStatus: 'Confirmed',
          totalCost: 5400
        });
      } else {
        setBooking(null);
        alert("Record not found.");
      }
      setIsLoading(false);
    }, 1200);
  };

  const handleDownload = () => {
    if (!booking) return;
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.text('LAGAN PREMIUM PASS', 105, 30, { align: 'center' });
    doc.text(`PASS ID: ${booking.id}`, 20, 50);
    doc.save(`LaganPremium_${booking.id}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-50 dark:bg-slate-950 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex flex-col md:flex-row gap-4 mb-10 md:mb-16 shadow-inner">
        <div className="flex-1 relative">
          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="tel" 
            placeholder="94..."
            className="w-full pl-12 pr-6 py-4 md:py-5 bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-amber-500 outline-none transition-all font-bold text-base md:text-lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-slate-900 hover:bg-black text-white px-8 py-4 md:py-5 rounded-xl md:rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <ShieldCheck size={20} />}
          Authenticate
        </button>
      </div>

      {booking ? (
        <div className="animate-fadeInUp relative">
          <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
            {/* Live Status Header */}
            <div className="bg-amber-500 px-6 md:px-10 py-3 flex items-center justify-between">
               <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                 <Zap size={10} fill="currentColor" /> Live: On Schedule
               </span>
            </div>

            <div className="bg-slate-950 p-8 md:p-14 border-b border-white/5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 gold-gradient rounded-xl md:rounded-2xl flex items-center justify-center text-slate-950 shadow-2xl shrink-0">
                    <Ticket className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">{booking.id}</h2>
                    <p className="text-amber-500 font-black text-[9px] md:text-xs uppercase tracking-widest">{booking.bus}</p>
                  </div>
                </div>
                <button 
                  onClick={handleDownload}
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-white/5 text-white px-6 py-4 rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10 text-sm"
                >
                  <Download size={16} />
                  Export Pass
                </button>
              </div>
            </div>

            <div className="p-8 md:p-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {[
                { label: 'Holder', val: booking.name, icon: User },
                { label: 'Voyage', val: `${booking.from} ➔ ${booking.to}`, icon: MapPin },
                { label: 'Schedule', val: `${booking.date} @ ${booking.time}`, icon: Clock },
                { label: 'Quantity', val: `${booking.seats} Seat${booking.seats > 1 ? 's' : ''}`, icon: Users },
                { label: 'Status', val: booking.paymentStatus, icon: ShieldCheck, color: 'text-green-500' },
                { label: 'Invested', val: `LKR ${booking.totalCost.toLocaleString()}`, icon: CreditCard },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-slate-400">
                    <item.icon size={12} className="text-amber-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                  <p className={`text-base font-bold ${item.color || 'text-slate-900 dark:text-white'}`}>{item.val}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 text-center border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-center gap-4 md:gap-8">
                <div className="flex flex-col items-center">
                   <p className="text-[7px] font-black uppercase text-slate-400 mb-1">Gate Close</p>
                   <p className="text-[10px] font-bold uppercase">15m Pre</p>
                </div>
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
                <div className="flex flex-col items-center">
                   <p className="text-[7px] font-black uppercase text-slate-400 mb-1">Baggage</p>
                   <p className="text-[10px] font-bold uppercase">30kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 md:py-32 opacity-20">
          <Ticket className="w-20 h-20 md:w-[120px] md:h-[120px] mx-auto" strokeWidth={0.5} />
          <h3 className="text-2xl md:text-3xl font-black tracking-tighter mt-6 md:mt-8 uppercase">Secure Vault</h3>
        </div>
      )}
    </div>
  );
};

export default CheckBooking;
