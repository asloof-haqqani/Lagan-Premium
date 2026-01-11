
import React, { useState, useEffect } from 'react';
import { 
  Bus, 
  Search, 
  CalendarPlus, 
  Moon, 
  Sun, 
  ChevronRight, 
  MessageSquare,
  Ticket,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Award,
  ArrowRight,
  Home,
  Info,
  Mail,
  Phone,
  User,
  Sparkles
} from 'lucide-react';
import { TabType } from './types';
import { FEATURES, FLEET, ADMIN_PHONE } from './constants';
import NewBooking from './components/NewBooking';
import CheckBooking from './components/CheckBooking';
import Assistant from './components/Assistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.NEW);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen selection:bg-amber-200 selection:text-amber-900 pb-32 md:pb-0 relative">
      {/* Dynamic Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-6 py-4 ${scrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="p-1.5 md:p-2 bg-slate-900 dark:bg-amber-500 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Bus className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className={`text-lg md:text-xl font-extrabold tracking-tighter ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
              LAGAN<span className="text-amber-500">BUSBOOKING</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Fleet', 'Safety', 'Support'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-semibold transition-colors ${scrolled ? 'text-slate-600 dark:text-slate-400 hover:text-amber-600' : 'text-white/80 hover:text-white'}`}>
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full transition-all ${scrolled ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300' : 'bg-white/10 text-white'}`}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2500')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-[#fcfcfd] dark:to-[#020617]" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-8">
            <Award className="w-3 h-3 md:w-4 md:h-4 text-amber-400" />
            Nintavur's Elite Travel Network
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-[1] md:leading-[0.9] font-display">
            Premium <br/> <span className="text-transparent bg-clip-text gold-gradient italic">Express Travel</span>
          </h1>
          <p className="text-base md:text-xl text-slate-200 mb-8 md:mb-12 max-w-3xl mx-auto font-medium leading-relaxed opacity-90">
            Book the most reliable luxury coaches in Sri Lanka. Fast, secure, and impeccably comfortable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
            <button 
              onClick={() => {
                setActiveTab(TabType.NEW);
                scrollToSection('reservation');
              }}
              className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 gold-gradient text-slate-900 rounded-full font-black text-base md:text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Start Reservation <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 relative z-20">
        {/* Reservation Suite */}
        <section id="reservation" className="relative -mt-16 md:-mt-32 mb-16 md:mb-32">
          <div className="glass-card rounded-[2.5rem] md:rounded-[3rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-white/40 dark:border-slate-800">
            <div className="flex flex-row border-b border-slate-200/50 dark:border-slate-800 overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => setActiveTab(TabType.NEW)}
                className={`flex-1 py-6 md:py-8 px-6 md:px-10 flex items-center justify-center gap-3 md:gap-4 transition-all duration-500 whitespace-nowrap ${activeTab === TabType.NEW ? 'bg-slate-900 dark:bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <CalendarPlus size={20} className={activeTab === TabType.NEW ? 'text-amber-400' : ''} />
                <div className="text-left">
                  <span className="hidden md:block text-[10px] uppercase font-black tracking-widest opacity-60">How to Book</span>
                  <span className="block text-base md:text-xl font-bold tracking-tight">New Booking</span>
                </div>
              </button>
              <button 
                onClick={() => setActiveTab(TabType.CHECK)}
                className={`flex-1 py-6 md:py-8 px-6 md:px-10 flex items-center justify-center gap-3 md:gap-4 transition-all duration-500 whitespace-nowrap ${activeTab === TabType.CHECK ? 'bg-slate-900 dark:bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <Search size={20} className={activeTab === TabType.CHECK ? 'text-amber-400' : ''} />
                <div className="text-left">
                  <span className="hidden md:block text-[10px] uppercase font-black tracking-widest opacity-60">Find Ticket</span>
                  <span className="block text-base md:text-xl font-bold tracking-tight">Track Booking</span>
                </div>
              </button>
            </div>
            
            <div className="p-6 md:p-16">
              {activeTab === TabType.NEW ? <NewBooking /> : <CheckBooking />}
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section id="safety" className="mb-16 md:mb-32 animate-fadeIn">
          <div className="max-w-2xl mb-12">
            <h4 className="text-amber-600 dark:text-amber-500 font-black uppercase tracking-[0.2em] text-xs mb-4">Integrity</h4>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-tight font-display">Safety & Security in every mile.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="group p-8 md:p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-amber-500/30 transition-all duration-500 premium-shadow">
                <div className="w-14 h-14 bg-slate-950 dark:bg-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "text-amber-400 dark:text-slate-900" })}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fleet Section */}
        <section id="fleet" className="mb-16 md:mb-32 bg-slate-900 rounded-[3rem] p-8 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter font-display">
                Elite <span className="text-amber-500 italic">Fleet</span>
              </h2>
              <div className="space-y-8">
                {FLEET.map((item, idx) => (
                  <div key={idx} className="flex gap-6 group animate-fadeInUp" style={{ animationDelay: `${idx * 150}ms` }}>
                    <div className="text-amber-500 text-3xl font-black opacity-20 group-hover:opacity-100 transition-opacity">0{idx+1}</div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.type}</h4>
                      <p className="text-slate-400 mb-4 text-sm">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000" className="rounded-[3rem] shadow-2xl border-4 border-white/5" alt="Coach" />
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer id="support" className="bg-slate-950 text-white pt-20 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Bus className="text-amber-500 w-8 h-8" />
                <span className="text-2xl font-black tracking-tighter">LAGAN<span className="text-amber-500">BUSBOOKING</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sri Lanka's premier bus reservation hub based in Nintavur. Luxury travel, guaranteed.
              </p>
            </div>
            
            <div>
              <h5 className="font-black uppercase tracking-widest text-[10px] text-amber-500 mb-6">Support</h5>
              <div className="space-y-4 text-slate-400 text-sm font-semibold">
                <p className="flex items-center gap-2 transition-colors hover:text-white"><User size={14} className="text-amber-500" /> Mr. Fawas</p>
                <p className="flex items-center gap-2 transition-colors hover:text-white"><Phone size={14} className="text-amber-500" /> +94701362527</p>
                <p className="flex items-center gap-2 transition-colors hover:text-white"><Clock size={14} className="text-amber-500" /> 7:00 AM - 10:00 PM</p>
              </div>
            </div>

            <div>
              <h5 className="font-black uppercase tracking-widest text-[10px] text-amber-500 mb-6">Inquiries</h5>
              <div className="space-y-4 text-slate-400 text-sm font-semibold">
                <p className="flex items-center gap-2 transition-colors hover:text-white"><Mail size={14} className="text-amber-500" /> laganbusbooking@gmail.com</p>
                <p className="flex items-start gap-2 transition-colors hover:text-white"><MapPin size={14} className="text-amber-500 shrink-0" /> Nintavur, Sri Lanka (Infront of HNB)</p>
              </div>
            </div>

            <div className="hidden lg:block">
              <h5 className="font-black uppercase tracking-widest text-[10px] text-amber-500 mb-6">Navigation</h5>
              <ul className="space-y-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <li><a href="#reservation" className="hover:text-white transition-colors">Reservations</a></li>
                <li><a href="#fleet" className="hover:text-white transition-colors">Luxury Fleet</a></li>
                <li><a href="#safety" className="hover:text-white transition-colors">Safety Protocols</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            <p>© 2024 Lagan Bus Services. All Rights Reserved.</p>
            <p className="flex items-center gap-2 group">
              Developed by <span className="text-white group-hover:text-amber-500 transition-colors">WEDOXA</span> | Freshers to future
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 md:bottom-8 right-6 z-[200] flex flex-col gap-4 animate-fadeIn">
        <button 
          onClick={() => setIsAssistantOpen(true)}
          className="w-14 h-14 bg-slate-900 text-amber-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all border border-amber-500/20"
          title="AI Assistant"
        >
          <Sparkles />
        </button>
        <a 
          href={`https://wa.me/${ADMIN_PHONE}`}
          target="_blank"
          className="w-14 h-14 gold-gradient text-slate-950 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all"
          title="WhatsApp Help"
        >
          <MessageSquare />
        </a>
      </div>

      {/* Mobile Tab Bar */}
      <div className="fixed md:hidden bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-white/5 p-4 flex items-center justify-around z-[200] shadow-2xl">
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors">
          <Home size={20} /><span className="text-[8px] font-bold uppercase">Home</span>
        </button>
        <button onClick={() => { setActiveTab(TabType.NEW); scrollToSection('reservation'); }} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === TabType.NEW ? 'text-amber-500' : 'text-slate-400 hover:text-white'}`}>
          <CalendarPlus size={20} /><span className="text-[8px] font-bold uppercase">Book</span>
        </button>
        <button onClick={() => { setActiveTab(TabType.CHECK); scrollToSection('reservation'); }} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === TabType.CHECK ? 'text-amber-500' : 'text-slate-400 hover:text-white'}`}>
          <Search size={20} /><span className="text-[8px] font-bold uppercase">Track</span>
        </button>
        <button onClick={() => setIsAssistantOpen(true)} className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors">
          <Sparkles size={20} /><span className="text-[8px] font-bold uppercase">AI Help</span>
        </button>
      </div>

      {isAssistantOpen && <Assistant onClose={() => setIsAssistantOpen(false)} />}
    </div>
  );
};

export default App;
