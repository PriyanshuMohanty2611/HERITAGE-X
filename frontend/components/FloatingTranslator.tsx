"use client";

import { useState } from "react";
import { Languages, X, ChevronRight } from "lucide-react";

export default function FloatingTranslator() {
  const [showTranslator, setShowTranslator] = useState(false);
  const [targetLang, setTargetLang] = useState("Hindi");

  const translations: Record<string, string> = {
    Hindi: "Heritage-X में आपका स्वागत है।",
    French: "Bienvenue sur Heritage-X.",
    German: "Willkommen bei Heritage-X.",
    Japanese: "Heritage-Xへようこそ。",
    Spanish: "Bienvenido a Heritage-X.",
    Tamil: "Heritage-X-க்கு உங்களை வரவேற்கிறோம்.",
    Bengali: "Heritage-X-এ আপনাকে স্বাগতম।"
  };

  return (
    <div className="fixed bottom-[120px] right-6 z-9998 group flex flex-col items-center gap-3">
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-[#0ea5e9] font-black uppercase tracking-widest bg-black/60 px-2 py-1 rounded">Translate Intelligence</p>
      
      {showTranslator ? (
        <div className="bg-[#131b2f]/95 backdrop-blur-3xl border border-[#0ea5e9]/30 rounded-3xl p-6 shadow-2xl w-80 animate-in slide-in-from-bottom-8 duration-500">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse" />
              Neural Translator v2.0
            </h4>
            <button onClick={() => setShowTranslator(false)} className="text-gray-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Source: Universal (English)</p>
              <div className="p-4 bg-black/40 rounded-2xl border border-white/5 text-[11px] text-gray-300 italic">
                "Welcome to Heritage-X. Exploring the future of cultural preservation."
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                 <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Target Selection</p>
                 <span className="text-[8px] font-black text-[#0ea5e9] uppercase">Real-time Node</span>
              </div>
              <select 
                value={targetLang} 
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full bg-[#050810] border border-white/10 rounded-2xl px-4 py-3 text-[10px] font-black text-white uppercase outline-none focus:border-[#0ea5e9] transition-all cursor-pointer"
              >
                {Object.keys(translations).map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              
              <div className="p-4 bg-[#0ea5e9]/5 rounded-2xl border border-[#0ea5e9]/20 text-xs text-[#0ea5e9] font-bold italic shadow-inner">
                {translations[targetLang] || "[Initializing neural translation...]"}
              </div>
            </div>
            
            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black text-white uppercase tracking-[0.2em] hover:bg-[#0ea5e9] hover:text-white transition-all flex items-center justify-center gap-2 group/btn">
              Apply Global Protocol <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setShowTranslator(true)}
          className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group overflow-hidden relative shadow-[#0ea5e9]/10"
        >
          <div className="absolute inset-0 bg-linear-to-tr from-[#0ea5e9] to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
          <Languages className="w-6 h-6 text-[#0ea5e9] group-hover:text-white transition-colors relative z-10" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#131b2f] flex items-center justify-center">
             <div className="w-1 h-1 bg-white rounded-full animate-ping" />
          </div>
        </button>
      )}
    </div>
  );
}
