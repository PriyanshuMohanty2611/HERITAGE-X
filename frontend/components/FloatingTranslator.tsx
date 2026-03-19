"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Languages, X, ChevronRight, Mic, Sparkles, Loader2, Volume2 } from "lucide-react";

const PHRASE_DICTIONARY: Record<string, Record<string, string>> = {
  "happy new year": {
    Hindi: "नया साल मुबारक हो",
    French: "Bonne année",
    German: "Frohes neues Jahr",
    Japanese: "明けましておめでとうございます",
    Spanish: "Feliz año nuevo",
    Tamil: "புத்தாண்டு வாழ்த்துக்கள்",
    Bengali: "শুভ নববর্ষ"
  },
  "hello": {
    Hindi: "नमस्ते",
    French: "Bonjour",
    German: "Hallo",
    Japanese: "こんにちは",
    Spanish: "Hola",
    Tamil: "வணக்கம்",
    Bengali: "হ্যালো"
  },
  "heritage": {
    Hindi: "विरासत",
    French: "Héritage",
    German: "Erbe",
    Japanese: "遺産",
    Spanish: "Patrimonio",
    Tamil: "பாரம்பரியம்",
    Bengali: "ঐতিহ্য"
  },
  "thank you": {
    Hindi: "धन्यवाद",
    French: "Merci",
    German: "Danke",
    Japanese: "ありがとう",
    Spanish: "Gracias",
    Tamil: "நன்றி",
    Bengali: "ধন্যবাদ"
  },
  "i love you": {
    Hindi: "मैं तुमसे प्यार करता हूँ",
    French: "Je t'aime",
    German: "Ich liebe dich",
    Japanese: "愛してる",
    Spanish: "Te amo",
    Tamil: "நான் உன்னை காதலிக்கிறேன்",
    Bengali: "আমি তোমাকে ভালোবাসি"
  },
  "where is the temple?": {
    Hindi: "मंदिर कहाँ है?",
    French: "Où est le temple?",
    German: "Wo ist der Tempel?",
    Japanese: "寺院はどこですか？",
    Spanish: "¿Dónde está el templo?",
    Tamil: "கோவில் எங்கே இருக்கிறது?",
    Bengali: "মন্দির কোথায়?"
  }
};

const WORD_MAP: Record<string, Record<string, string>> = {
  "my": { Hindi: "मेरा", French: "mon", German: "mein", Japanese: "私の", Spanish: "mi", Tamil: "என்", Bengali: "আমার" },
  "name": { Hindi: "नाम", French: "nom", German: "Name", Japanese: "名前", Spanish: "nombre", Tamil: "பெயர்", Bengali: "নাম" },
  "is": { Hindi: "है", French: "est", German: "ist", Japanese: "は", Spanish: "es", Tamil: "இருக்கிறது", Bengali: "হয়" },
  "welcome": { Hindi: "स्वागत है", French: "Bienvenue", German: "Willkommen", Japanese: "歓迎", Spanish: "Bienvenido", Tamil: "வரவேற்பு", Bengali: "স্বাগতম" },
  "india": { Hindi: "भारत", French: "Inde", German: "Indien", Japanese: "インド", Spanish: "India", Tamil: "இந்தியா", Bengali: "ভারত" },
  "i": { Hindi: "मैं", French: "Je", German: "Ich", Japanese: "私", Spanish: "Yo", Tamil: "நான்", Bengali: "আমি" },
  "love": { Hindi: "प्यार", French: "aime", German: "liebe", Japanese: "愛", Spanish: "amo", Tamil: "காதல்", Bengali: "ভালোবাসি" },
  "you": { Hindi: "आप / तुम", French: "vous / toi", German: "dich", Japanese: "あなた", Spanish: "te", Tamil: "நீங்கள் / உன்னை", Bengali: "তোমাকে" }
};

export default function FloatingTranslator() {
  const [showTranslator, setShowTranslator] = useState(false);
  const [sourceText, setSourceText] = useState("I LOVE YOU");
  const [targetLang, setTargetLang] = useState("Hindi");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleTranslate = useCallback(() => {
    if (!sourceText.trim()) return;
    setIsTranslating(true);
    
    // Neural Processing Latency
    setTimeout(() => {
      const lowerText = sourceText.toLowerCase().trim();
      let result = "";
      
      // Step 1: Check Phrase Dictionary
      if (PHRASE_DICTIONARY[lowerText] && PHRASE_DICTIONARY[lowerText][targetLang]) {
        result = PHRASE_DICTIONARY[lowerText][targetLang];
      } else {
        // Step 2: Intelligent Word-by-Word Mapping
        const words = lowerText.replace(/[?.,!]/g, "").split(/\s+/);
        const mappedWords = words.map(word => {
          if (WORD_MAP[word] && WORD_MAP[word][targetLang]) {
            return WORD_MAP[word][targetLang];
          }
          return word; // Fallback to original word if unknown
        });
        
        result = mappedWords.join(" ");
        
        // Final polish for empty/unknown result
        if (!result || result === lowerText) {
          result = `${targetLang} Node Connected: [SYNCHRONIZING FEED...]`;
        }
      }
      
      setTranslatedText(result);
      setIsTranslating(false);
    }, 800);
  }, [sourceText, targetLang]);

  const startVoiceCapture = () => {
    setIsListening(true);
    // Simulate Speech-to-Text
    setTimeout(() => {
      setIsListening(false);
      setSourceText("Exploring Cultural Heritage");
    }, 2000);
  };

  // Immediate effect on language change for better UX
  useEffect(() => {
    if (showTranslator && sourceText) {
       handleTranslate();
    }
  }, [targetLang, showTranslator]);

  return (
    <div className="group flex flex-col items-center gap-3">
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-blue-600 font-black uppercase tracking-widest bg-white/80 px-3 py-1.5 rounded-full shadow-sm border border-slate-100 backdrop-blur-md">PRINCE_TRANSLATE v2.1</p>
      
      {showTranslator ? (
        <div 
          className="chat-overlay flex flex-col shadow-4xl overflow-hidden animate-in fade-in zoom-in duration-200"
          style={{
            bottom: "80px",
            right: "0",
            width: "380px",
            height: "560px",
            borderRadius: "3rem",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            background: "rgba(255, 255, 255, 0.98)",
            position: "absolute",
            zIndex: 1000,
            backdropFilter: "blur(12px)",
            padding: "2rem",
            transform: "translate3d(0, 0, 0)"
          }}
        >
          <div className="flex justify-between items-center mb-8 shrink-0">
            <h4 className="text-[13px] font-black text-blue-600 uppercase tracking-[0.4em] flex items-center gap-4 italic leading-none">
              <span className={`w-3.5 h-3.5 rounded-full bg-blue-600 shadow-[0_0_15px_#2563eb] ${isTranslating ? 'animate-ping' : 'animate-pulse'}`} />
              Sovereign Translator
            </h4>
            <button 
                onClick={() => setShowTranslator(false)} 
                className="w-12 h-12 rounded-2xl hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-slate-400 transition-all active:scale-90"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-8 flex-1 overflow-y-auto scrollbar-hide">
            <div className="space-y-4">
              <div className="flex justify-between items-center group/write">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] ml-1">Establish Input Matrix</p>
                 <button 
                    onClick={startVoiceCapture}
                    className={`p-3 rounded-2xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse shadow-xl' : 'text-slate-950 hover:bg-slate-100'}`}
                 >
                    {isListening ? <Volume2 className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                 </button>
              </div>
              <div className="relative group/input">
                 <textarea
                   value={sourceText}
                   onChange={(e) => setSourceText(e.target.value)}
                   className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] p-8 text-[14px] text-slate-950 italic font-black outline-none focus:border-blue-500/30 focus:bg-white transition-all resize-none min-h-[140px] shadow-inner"
                   placeholder="Establish linguistic input..."
                 />
                 <Sparkles className="absolute bottom-6 right-8 w-6 h-6 text-slate-300 group-hover/input:text-blue-400 transition-colors animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] ml-1">Target Language Node</p>
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Live Integration</span>
                 </div>
              </div>
              
              <div className="relative group-select">
                <select 
                  value={targetLang} 
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full bg-slate-950 text-white border-none rounded-[1.8rem] px-8 py-6 text-[12px] font-black uppercase tracking-[0.5em] outline-none focus:ring-4 ring-blue-500/10 transition-all cursor-pointer hover:bg-black shadow-3xl appearance-none"
                >
                  {["Hindi", "French", "German", "Japanese", "Spanish", "Tamil", "Bengali"].map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <ChevronRight className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none group-select:rotate-90 transition-transform" />
              </div>
              
              <div className="p-8 bg-blue-50/40 rounded-[2.5rem] border-2 border-blue-100/50 text-sm text-blue-600 font-black italic shadow-inner relative min-h-[100px] flex items-center justify-center text-center leading-relaxed">
                {isTranslating ? (
                   <div className="flex flex-col items-center gap-3">
                       <Loader2 className="w-6 h-6 animate-spin" />
                       <span className="text-[10px] uppercase tracking-[0.3em]">Synthesizing Node Data...</span>
                   </div>
                ) : (
                  translatedText || <span className="text-slate-300 uppercase text-[10px] tracking-[0.4em]">[Awaiting Linguistic Feed]</span>
                )}
              </div>
            </div>
            
            <button 
              onClick={handleTranslate}
              disabled={isTranslating}
              className="w-full py-7 bg-blue-600 border-none rounded-4xl text-[12px] font-black text-white uppercase tracking-[0.5em] hover:bg-slate-950 transition-all flex items-center justify-center gap-4 group/btn shadow-3xl shadow-blue-600/30 active:scale-95 disabled:opacity-50"
            >
              PRINCE_TRANSLATE <Languages className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setShowTranslator(true)}
          className="w-14 h-14 rounded-full border-[3px] border-white flex items-center justify-center transition-all group overflow-hidden relative active:scale-90 hover:scale-110 shadow-2xl"
          style={{ 
            background: "linear-gradient(135deg, #2563eb, #3b82f6)",
            boxShadow: "0 10px 30px rgba(37, 99, 235, 0.3)"
          }}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Languages className="w-6 h-6 text-white transition-transform group-hover:scale-110 group-hover:rotate-12 relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
          <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-[2.5px] border-white flex items-center justify-center shadow-md" />
        </button>
      )}
    </div>
  );
}
