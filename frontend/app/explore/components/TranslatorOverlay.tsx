"use client";

import React from "react";
import { X, Languages } from "lucide-react";

interface TranslatorOverlayProps {
  showTranslator: boolean;
  setShowTranslator: (show: boolean) => void;
  targetLang: string;
  setTargetLang: (lang: string) => void;
}

export const TranslatorOverlay: React.FC<TranslatorOverlayProps> = ({
  showTranslator,
  setShowTranslator,
  targetLang,
  setTargetLang
}) => {
  return (
    <div className="fixed bottom-36 right-8 z-[100] group flex flex-col items-center gap-3">
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-heritage-cyan font-black uppercase tracking-widest bg-black/60 px-2 py-1 rounded">Translate</p>
      {showTranslator ? (
        <div className="bg-[#131b2f]/95 backdrop-blur-3xl border border-heritage-cyan/30 rounded-3xl p-6 shadow-2xl w-80 animate-in slide-in-from-bottom-8 duration-500">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[10px] font-black text-heritage-cyan uppercase tracking-widest">Heritage Translator v1.0</h4>
            <button onClick={() => setShowTranslator(false)} className="text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Source: Auto (English)</p>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs text-gray-300 italic uppercase">"Welcome to the Sun Temple of Konark."</div>
            </div>
            <div className="space-y-2">
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full bg-[#050810] border border-white/10 rounded-xl px-3 py-2 text-[10px] font-black text-white uppercase outline-none focus:border-heritage-cyan"
              >
                <option>Hindi</option>
                <option>French</option>
                <option>German</option>
                <option>Japanese</option>
                <option>Spanish</option>
              </select>
              <div className="p-3 bg-heritage-cyan/5 rounded-xl border border-heritage-cyan/20 text-xs text-heritage-cyan font-bold italic">
                {targetLang === 'Hindi' ? '"कोणार्क के सूर्य मंदिर में आपका स्वागत है।"' :
                  targetLang === 'French' ? '"Bienvenue au Temple du Soleil de Konark."' :
                    '"[Generating neural translation...]"'}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowTranslator(true)}
          className="w-16 h-16 rounded-full bg-heritage-cyan border-4 border-white/10 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all group overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-tr from-heritage-indigo to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Languages className="w-7 h-7 text-white relative z-10" />
        </button>
      )}
    </div>
  );
};
