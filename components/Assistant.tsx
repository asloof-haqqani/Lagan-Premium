
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Loader2, Sparkles } from 'lucide-react';
import { getTravelAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const Assistant: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Welcome to Lagan Elite Support. How may I assist with your journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    const botResponse = await getTravelAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-32 right-8 w-[95vw] md:w-[450px] h-[700px] glass-card rounded-[3rem] shadow-2xl z-[300] flex flex-col overflow-hidden animate-fadeInUp border-4 border-white/50 dark:border-slate-800/50">
      <div className="p-8 bg-slate-950 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center text-slate-950 shadow-xl animate-pulse">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-black text-lg tracking-tight">Elite Concierge</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Online & Active</p>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white/50 hover:text-white"><X size={20} /></button>
      </div>

      <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6 scrollbar-hide bg-[#f8f9fa] dark:bg-slate-950/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-3xl ${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none shadow-xl' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700/50'}`}>
              <p className="text-[15px] leading-relaxed font-medium">{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-3">
              <Loader2 className="animate-spin text-amber-500" size={18} />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Consulting...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="relative flex items-center gap-4">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Inquire about routes or service..."
              className="w-full pl-6 pr-6 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-semibold text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Sparkles size={16} />
            </div>
          </div>
          <button 
            onClick={handleSend}
            className="p-4 gold-gradient text-slate-900 rounded-2xl hover:scale-105 active:scale-90 transition-all shadow-lg"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">Powered by Gemini AI Intelligence</p>
      </div>
    </div>
  );
};

export default Assistant;
