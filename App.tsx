
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
  Info
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
    <div className="min-h-screen selection:bg-amber-200 selection:text-amber-900 pb-32 md:pb-0">
      {/* Dynamic Navigation - Desktop & Tablet */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-6 py-4 ${scrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="p-1.5 md:p-2 bg-slate-900 dark:bg-amber-500 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Bus className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className={`text-lg md:text-xl font-extrabold tracking-tighter ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
              LAGAN<span className="text-amber-500">PREMIUM</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Fleet', 'Routes', 'Safety', 'Support'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-semibold transition-colors ${scrolled ? 'text-slate-600 dark:text-slate-400 hover:text-amber-600' : 'text-white/80 hover:text-white'}`}>
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full transition-all ${scrolled ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300' : 'bg-white/10 text-white'}`}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href={`https://wa.me/${ADMIN_PHONE}`} className="hidden sm:flex items-center gap-2 px-5 py-2.5 gold-gradient text-slate-900 font-bold rounded-full text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all">
              Book Now
            </a>
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
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-8 animate-fadeIn">
            <Award className="w-3 h-3 md:w-4 md:h-4 text-amber-400" />
            Voted #1 Luxury Service 2024
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-[1] md:leading-[0.9] font-display">
            The Golden Standard of <br/> <span className="text-transparent bg-clip-text gold-gradient italic">Travel</span>
          </h1>
          <p className="text-base md:text-xl text-slate-200 mb-8 md:mb-12 max-w-3xl mx-auto font-medium leading-relaxed opacity-90">
            Redefining long-distance travel in Sri Lanka. Experience elegance and comfort on every mile.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
            <button 
              onClick={() => {
                setActiveTab(TabType.NEW);
                scrollToSection('reservation');
              }}
              className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 gold-gradient text-slate-900 rounded-full font-black text-base md:text-lg shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Start Reservation <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => scrollToSection('fleet')}
              className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-base md:text-lg hover:bg-white/20 transition-all"
            >
              View Schedules
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
                  <span className="hidden md:block text-[10px] uppercase font-black tracking-widest opacity-60">Plan Travel</span>
                  <span className="block text-base md:text-xl font-bold tracking-tight">New Booking</span>
                </div>
              </button>
              <button 
                onClick={() => setActiveTab(TabType.CHECK)}
                className={`flex-1 py-6 md:py-8 px-6 md:px-10 flex items-center justify-center gap-3 md:gap-4 transition-all duration-500 whitespace-nowrap ${activeTab === TabType.CHECK ? 'bg-slate-900 dark:bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <Search size={20} className={activeTab === TabType.CHECK ? 'text-amber-400' : ''} />
                <div className="text-left">
                  <span className="hidden md:block text-[10px] uppercase font-black tracking-widest opacity-60">Existing Booking</span>
                  <span className="block text-base md:text-xl font-bold tracking-tight">Track Ticket</span>
                </div>
              </button>
            </div>
            
            <div className="p-6 md:p-16">
              {activeTab === TabType.NEW ? <NewBooking /> : <CheckBooking />}
            </div>
          </div>
        </section>

        {/* Luxury Credentials */}
        <section id="safety" className="mb-16 md:mb-32">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-12 md:mb-16">
            <div className="max-w-2xl">
              <h4 className="text-amber-600 dark:text-amber-500 font-black uppercase tracking-[0.2em] text-xs md:text-sm mb-4">Elite Service</h4>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-[1] md:leading-[0.95] font-display">Why Discerning Travelers Choose Lagan.</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="group p-8 md:p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-amber-500/30 transition-all duration-500 premium-shadow">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-950 dark:bg-amber-500 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "text-amber-400 dark:text-slate-900 w-6 h-6 md:w-8 md:h-8" })}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-sm md:text-base opacity-80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Fleet Section */}
        <section id="fleet" className="mb-16 md:mb-32 bg-slate-900 rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-amber-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-tight font-display">
                Curated <span className="text-amber-500 italic">Fleet</span>
              </h2>
              <div className="space-y-8 md:space-y-12">
                {FLEET.map((item, idx) => (
                  <div key={idx} className="flex gap-6 md:gap-8 group">
                    <div className="text-amber-500 text-3xl md:text-5xl font-black opacity-20 group-hover:opacity-100 transition-opacity">0{idx+1}</div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">{item.type}</h4>
                      <p className="text-slate-400 mb-4 text-sm md:text-base leading-relaxed">{item.description}</p>
                      <div className="flex flex-wrap gap-3 md:gap-4">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-amber-500/80 bg-white/5 px-3 py-1 rounded-full border border-white/5">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000" 
                className="rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 border-4 border-white/5"
                alt="Luxury Coach Interior"
              />
              <div className="absolute -bottom-8 -left-8 bg-amber-500 p-8 rounded-[2.5rem] shadow-2xl">
                <p className="text-slate-900 font-black text-3xl text-left leading-tight">Premium<br/>Experience</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="bg-slate-950 text-white pt-20 md:pt-32 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6 md:mb-8">
                <Bus className="text-amber-500 w-6 h-6 md:w-8 md:h-8" />
                <span className="text-2xl md:text-3xl font-black tracking-tighter">LAGAN<span className="text-amber-500">PREMIUM</span></span>
              </div>
              <p className="text-slate-400 max-w-md text-base md:text-lg leading-relaxed mb-8 md:mb-10">
                Pioneering luxury travel in Sri Lanka since 2010. Excellence in every journey.
              </p>
            </div>
            <div className="hidden md:block">
              <h5 className="font-black uppercase tracking-[0.2em] text-[10px] text-amber-500 mb-6 md:mb-8">Experience</h5>
              <ul className="space-y-3 md:space-y-4 text-slate-400 font-semibold text-sm">
                <li><a href="#fleet" className="hover:text-white transition-colors">Our Fleet</a></li>
                <li><a href="#reservation" className="hover:text-white transition-colors">Route Network</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black uppercase tracking-[0.2em] text-[10px] text-amber-500 mb-6 md:mb-8">Head Office</h5>
              <div className="space-y-4 md:space-y-6 text-slate-400 font-semibold text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="text-amber-500 shrink-0 mt-1" size={16} />
                  <span>Nintavur Main Road, <br/>In front of HNB Bank</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            <p>© 2024 Lagan Bus Services. Designed by Wedoxa Intelligence</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar - Optimized for One-Handed Use */}
      <div className="fixed md:hidden bottom-4 left-4 right-4 z-[200] bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] p-2 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex flex-col items-center gap-1 p-3 text-slate-400 hover:text-amber-500 transition-colors">
          <Home size={22} />
          <span className="text-[8px] font-black uppercase tracking-tighter">Home</span>
        </button>
        <button onClick={() => { setActiveTab(TabType.NEW); scrollToSection('reservation'); }} className={`flex flex-col items-center gap-1 p-3 transition-colors ${activeTab === TabType.NEW ? 'text-amber-500' : 'text-slate-400'}`}>
          <CalendarPlus size={22} />
          <span className="text-[8px] font-black uppercase tracking-tighter">Book</span>
        </button>
        <button onClick={() => { setActiveTab(TabType.CHECK); scrollToSection('reservation'); }} className={`flex flex-col items-center gap-1 p-3 transition-colors ${activeTab === TabType.CHECK ? 'text-amber-500' : 'text-slate-400'}`}>
          <Search size={22} />
          <span className="text-[8px] font-black uppercase tracking-tighter">Track</span>
        </button>
        <button onClick={() => setIsAssistantOpen(true)} className="flex flex-col items-center gap-1 p-3 text-slate-400 hover:text-amber-500 transition-colors">
          <MessageSquare size={22} />
          <span className="text-[8px] font-black uppercase tracking-tighter">Support</span>
        </button>
      </div>

      {isAssistantOpen && <Assistant onClose={() => setIsAssistantOpen(false)} />}
    </div>
  );
};

export default App;
