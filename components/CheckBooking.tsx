
import React, { useState } from 'react';
import { Search, Loader2, Ticket, MapPin, Clock, CreditCard, Download, User, Phone, Bus, ShieldCheck, Zap, Users, Info, HelpCircle, AlertCircle } from 'lucide-react';
import { Booking } from '../types';
import { fetchBookingByPhone } from '../services/googleSheetService';

const CheckBooking: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState<any | null>(null);

  const handleSearch = async () => {
    if (!phone) return;
    setIsLoading(true);
    
    const result = await fetchBookingByPhone(phone);
    
    if (result.success && result.booking) {
      setBooking(result.booking);
    } else {
      setBooking(null);
      alert(result.message || "No record found for this WhatsApp number.");
    }
    setIsLoading(false);
  };

  const handleDownload = () => {
    if (!booking) return;
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF();
    
    doc.setFillColor(15, 23, 42); 
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('LAGAN BUS BOOKING PASS', 105, 25, { align: 'center' });
    
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.text(`PASS ID: ${booking['Booking ID']}`, 20, 55);
    doc.text(`PASSENGER: ${booking.Name}`, 20, 65);
    doc.text(`PICKUP: ${booking.Pickup}`, 20, 75); 
    doc.text(`BUS: ${booking.Bus}`, 20, 85);
    doc.text(`SEAT: ${booking.SeatNumbers || booking.Seat}`, 20, 95);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('BE THERE BEFORE 15 MINUTES.', 105, 120, { align: 'center' });
    
    doc.save(`Lagan_Pass_${booking['Booking ID']}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fadeInUp">
      <div className="space-y-8">
        <div className="bg-slate-50 dark:bg-slate-950 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex flex-col md:flex-row gap-4 shadow-inner">
          <div className="flex-1 relative">
            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="tel" 
              placeholder="Registered WhatsApp (e.g. 7XXXXXXXX)"
              className="w-full pl-12 pr-6 py-4 md:py-5 bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-amber-500 outline-none transition-all font-bold text-base md:text-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button 
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-slate-900 hover:bg-black text-white px-8 py-4 md:py-5 rounded-xl md:rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <ShieldCheck size={20} />}
            Find Booking
          </button>
        </div>

        {!booking && !isLoading && (
          <div className="p-8 bg-white dark:bg-slate-900/40 rounded-[2rem] border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
              <HelpCircle className="text-amber-500" size={24} /> 
              How to find your Booking
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Enter Phone", desc: "Type the WhatsApp number used for the reservation." },
                { step: "02", title: "Find", desc: "Click the Find button to search our cloud records." },
                { step: "03", title: "Boarding Pass", desc: "View your seat numbers and download your pass." }
              ].map((s, i) => (
                <div key={i} className="space-y-2">
                  <span className="text-amber-500 font-black text-sm">STEP {s.step}</span>
                  <h4 className="font-bold text-slate-900 dark:text-white">{s.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {booking ? (
        <div className="relative animate-fadeIn">
          <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="bg-amber-500 px-6 md:px-10 py-3 flex items-center justify-between">
               <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                 <Zap size={10} fill="currentColor" /> Verified Status
               </span>
               <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-900">
                 Digital Boarding Pass
               </span>
            </div>

            <div className="bg-slate-950 p-8 md:p-14 border-b border-white/5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 gold-gradient rounded-xl md:rounded-2xl flex items-center justify-center text-slate-950 shadow-2xl shrink-0">
                    <Ticket className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">{booking['Booking ID']}</h2>
                    <p className="text-amber-500 font-black text-[9px] md:text-xs uppercase tracking-widest">{booking.Bus}</p>
                  </div>
                </div>
                <button 
                  onClick={handleDownload}
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-white/5 text-white px-6 py-4 rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10 text-sm"
                >
                  <Download size={16} />
                  Export PDF
                </button>
              </div>
            </div>

            <div className="p-8 md:p-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {[
                { label: 'Passenger Name', val: booking.Name, icon: User },
                { label: 'Pickup Point', val: booking.Pickup, icon: MapPin },
                { label: 'Travel Date', val: `${booking.Date}`, icon: Clock },
                { label: 'Seat Number', val: booking.SeatNumbers || `${booking.Seat} Seat(s)`, icon: Users },
                { label: 'Status', val: booking.Payment?.split(' - ')[0] || 'Confirmed', icon: ShieldCheck, color: 'text-green-500' },
                { label: 'Payment', val: booking.Payment?.includes('LKR') ? booking.Payment.split(' - ')[1] : `LKR ${booking.TotalAmount?.toLocaleString()}`, icon: CreditCard },
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
               <div className="flex flex-col items-center">
                  <p className="text-[7px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
                    <AlertCircle size={8} /> Departure Instructions
                  </p>
                  <p className="text-xs font-black uppercase text-amber-600 dark:text-amber-400">BE THERE BEFORE 15 MINUTES</p>
               </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 opacity-20">
          <Ticket className="w-20 h-20 mx-auto" strokeWidth={0.5} />
          <h3 className="text-2xl font-black tracking-tighter mt-8 uppercase">Ticket Vault</h3>
          <p className="text-xs font-bold uppercase tracking-widest mt-2">Find your reservation</p>
        </div>
      )}
    </div>
  );
};

export default CheckBooking;
