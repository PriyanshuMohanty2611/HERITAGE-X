"use client";

import React, { useState, useEffect } from "react";
import { X, Languages, Mic, Volume2, Sparkles, Send } from "lucide-react";

interface TranslatorOverlayProps {
  showTranslator: boolean;
  setShowTranslator: (show: boolean) => void;
  targetLang: string;
  setTargetLang: (lang: string) => void;
}

/**
 * NEURAL TRANSLATOR V2.0 - ADVANCED LINGUISTIC MATRIX
 * - Real-time Text-to-Translation Bridge
 * - Speech-to-Text Neural Synthesis (Simulated with active UI)
 * - Multi-stage conversion feedback
 */
export const TranslatorOverlay: React.FC<TranslatorOverlayProps> = ({
  showTranslator,
  setShowTranslator,
  targetLang,
  setTargetLang
}) => {
  const [sourceText, setSourceText] = useState("Welcome to Heritage-X. Exploring the future of cultural preservation.");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // MOCK NEURAL ENGINE
  const translationDatabase: Record<string, string> = {
    "English": "Explore the future of cultural preservation.",
    "Hindi": "सांस्कृतिक संरक्षण के भविष्य का पता लगाएं।",
    "French": "Explorez l'avenir de la préservation culturelle.",
    "German": "Erkunden Sie die Zukunft der kulturellen Erhaltung.",
    "Japanese": "文化保存の未来を探求してください。",
    "Spanish": "Explore el futuro de la preservación cultural."
  };

  const handleTranslate = () => {
    setIsTranslating(true);
    setTimeout(() => {
      // Improved mock translation logic to handle custom user input
      let translation = "";
      if (sourceText.includes("Welcome to Heritage-X")) {
         translation = translationDatabase[targetLang] || `${targetLang} Node Synced: [Translated Content]`;
      } else {
         translation = `${targetLang} Synthesis: ${sourceText.split(' ').reverse().join(' ')} [AI Processed]`;
      }
      setTranslatedText(translation);
      setIsTranslating(false);
      
      // Pulse background on success
      window.dispatchEvent(new CustomEvent('heritage-pulse', {
        detail: { x: window.innerWidth - 100, y: window.innerHeight - 100, color: 'rgba(59, 130, 246,' }
      }));
    }, 800);
  };

  const startVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSourceText("Witness the glory of ancient architecture.");
    }, 2500);
  };

  useEffect(() => {
    if (showTranslator) handleTranslate();
  }, [targetLang, sourceText]);

  return (
    <div className="fixed bottom-36 right-8 z-100 group flex flex-col items-center gap-3">
      {showTranslator ? (
        <div className="bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-[2.5rem] p-8 shadow-[0_40px_100px_rgba(37,99,235,0.2)] w-[360px] animate-in slide-in-from-bottom-5 duration-300">
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <h4 className="text-[10px] font-black text-slate-950 uppercase tracking-[0.4em]">Neural Translator v2.0</h4>
            </div>
            <button onClick={() => setShowTranslator(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
               <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Source Input */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                 <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest ml-1">Source: Universal</p>
                 <button 
                  onClick={startVoiceInput}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-50 text-slate-400 hover:text-blue-600 border border-slate-100'}`}
                 >
                    <Mic className="w-3 h-3" />
                    <span className="text-[8px] font-black uppercase tracking-widest">{isListening ? 'Listening...' : 'Voice Input'}</span>
                 </button>
              </div>
              <div className="relative">
                <textarea
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-900 italic font-medium outline-none focus:border-blue-600/30 min-h-[80px] resize-none"
                  placeholder="Insert cultural text..."
                />
                <Sparkles className="absolute bottom-4 right-4 w-4 h-4 text-slate-200" />
              </div>
            </div>

            {/* Language Selector */}
            <div className="space-y-3">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest ml-1">Target Selection</p>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full bg-blue-600 text-white border-none rounded-2xl px-6 py-4 text-[11px] font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
              >
                {Object.keys(translationDatabase).map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Translation Result */}
            <div className="space-y-3">
              <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 relative overflow-hidden min-h-[80px]">
                {isTranslating && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                  </div>
                )}
                <p className="text-[13px] text-blue-600 font-bold italic leading-relaxed">
                  {translatedText || "[Awaiting input...]"}
                </p>
                <div className="mt-4 flex justify-end gap-3">
                   <button className="p-2 rounded-lg bg-white shadow-sm border border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                      <Volume2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </div>

            <button onClick={handleTranslate} className="w-full py-5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-950 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-95 border-none">
               PRINCE_TRANSLATE
               <Languages className="w-4 h-4 ml-2" />
            </button>

          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowTranslator(true)}
          className="w-16 h-16 rounded-full bg-blue-600 border-4 border-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-90 group relative"
        >
          <Languages className="w-7 h-7 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
        </button>
      )}
    </div>
  );
};
