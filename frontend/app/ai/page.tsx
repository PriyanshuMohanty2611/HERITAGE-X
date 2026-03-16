"use client";

import { useState, useRef, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { 
  ScanSearch, BrainCircuit, Globe, BookOpen, GraduationCap,
  Sparkles, Camera, Upload, Loader2, ChevronRight, CheckCircle2,
  Award, Zap, Languages, Play, Mic, Info, History, Star,
  Search, ShieldCheck, ArrowUpRight
} from "lucide-react";

// ─── AI & Learning Data ──────────────────────────────────────────────────────
const DYNASTIES = [
  { name: "Mughal Empire", period: "1526–1857", lessons: 12, students: "124k", color: "bg-red-500" },
  { name: "Chola Dynasty", period: "300 BCE–1279 CE", lessons: 15, students: "98k", color: "bg-orange-500" },
  { name: "Gupta Empire", period: "319–550 CE", lessons: 8, students: "45k", color: "bg-amber-500" },
  { name: "Vijayanagara", period: "1336–1646", lessons: 10, students: "67k", color: "bg-blue-500" }
];

const LANGUAGES = [
  { code: "EN", name: "English", status: "Native Build" },
  { code: "HI", name: "Hindi (हिन्दी)", status: "Deep-Sync" },
  { code: "OD", name: "Odia (ଓଡ଼ିଆ)", status: "Active" },
  { code: "FR", name: "French", status: "Beta" },
  { code: "ES", name: "Spanish", status: "Translate" }
];

export default function AICompassHub() {
  const [activeTab, setActiveTab] = useState<"recognition" | "learning">("recognition");
  const [isScanning, setIsScanning] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<any>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsScanning(true);
    setRecognitionResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setRecognitionResult({
        name: "Lingaraj Temple",
        era: "11th Century",
        style: "Kalinga Architecture",
        location: "Bhubaneswar, Odisha",
        confidence: "99.8%",
        fact: "The main tower rises to a height of 180 feet, representing the transition from early Kalinga style to the mature Phase."
      });
    }, 2500);
  };

  return (
    <main className="heritage-page-shell flex h-dvh w-screen font-sans overflow-hidden bg-slate-950 text-white relative">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-600/10 blur-[150px] rounded-full" />
      </div>

      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <TopHeader />
        
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide">
          <div className="max-w-[1700px] mx-auto space-y-12 pb-20">
            
            {/* Header / Tab Switcher */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
               <div className="space-y-4">
                  <h1 className="text-4xl lg:text-7xl font-black text-white uppercase italic tracking-tighter flex items-center gap-6">
                    <BrainCircuit className="w-12 h-12 lg:w-20 lg:h-20 text-violet-500" /> Neural Compass
                  </h1>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em] mt-1 ml-2 underline decoration-violet-500/50 underline-offset-8">Cognitive Exploration & Learning Matrix</p>
               </div>

               <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-3xl border border-white/10 shrink-0">
                  <button onClick={() => setActiveTab("recognition")} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'recognition' ? 'bg-white text-black shadow-2xl' : 'text-slate-400 hover:text-white'}`}>
                    AI Recognition
                  </button>
                  <button onClick={() => setActiveTab("learning")} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'learning' ? 'bg-white text-black shadow-2xl' : 'text-slate-400 hover:text-white'}`}>
                    Learning Hub
                  </button>
               </div>
            </div>

            {activeTab === "recognition" ? (
              <div className="grid grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                 
                 {/* Recognition Engine (7/12) */}
                 <div className="col-span-12 xl:col-span-7 space-y-10">
                    <div className="p-10 rounded-4xl bg-slate-900 border border-white/5 shadow-2xl space-y-12">
                       <header className="space-y-2">
                          <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Monument Vision Engine</h3>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Upload any heritage image for multi-layer neural analysis</p>
                       </header>

                       <div 
                         onClick={() => fileInputRef.current?.click()}
                         className={`group relative aspect-video rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-6 cursor-pointer overflow-hidden ${isScanning ? 'border-violet-500 bg-violet-500/5' : 'border-white/10 hover:border-violet-500/50 bg-white/5'}`}
                       >
                          {!isScanning && !recognitionResult ? (
                            <>
                              <div className="w-24 h-24 rounded-full bg-violet-600/10 border border-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                                 <Camera className="w-10 h-10 text-violet-500" />
                              </div>
                              <div className="text-center">
                                 <p className="text-sm font-black text-white uppercase italic">Initialize Optical Scan</p>
                                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Drag & Drop or Click to Access Library</p>
                              </div>
                            </>
                          ) : isScanning ? (
                            <div className="flex flex-col items-center gap-8">
                               <div className="relative">
                                  <Loader2 className="w-20 h-20 text-violet-500 animate-spin" />
                                  <div className="absolute inset-0 w-20 h-20 bg-violet-500/30 blur-2xl animate-pulse rounded-full" />
                               </div>
                               <div className="text-center space-y-2">
                                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-500 animate-pulse">Deconstructing Neural Layers...</p>
                                  <div className="flex justify-center gap-2">
                                     <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                     <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                     <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" />
                                  </div>
                               </div>
                            </div>
                          ) : (
                            <div className="absolute inset-0 p-10 flex flex-col justify-end bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent">
                               <img src="https://images.unsplash.com/photo-1590856029826-c7a73142bdf1?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover -z-10 blur-sm opacity-40" />
                               <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
                                  <div className="flex items-center gap-4">
                                     <div className="px-4 py-1.5 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl ring-4 ring-emerald-500/20">Identification Confirmed</div>
                                     <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{recognitionResult.confidence} Accuracy</span>
                                  </div>
                                  <h4 className="text-6xl font-black italic tracking-tighter text-white uppercase">{recognitionResult.name}</h4>
                                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/10">
                                     {[
                                       { l: "Timeline", v: recognitionResult.era },
                                       { l: "Artistic Style", v: recognitionResult.style },
                                       { l: "Geolocation", v: recognitionResult.location },
                                       { l: "Status", v: "Archaeological Node" },
                                     ].map(d => (
                                       <div key={d.l}>
                                          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{d.l}</p>
                                          <p className="text-xs font-black text-white uppercase">{d.v}</p>
                                       </div>
                                     ))}
                                  </div>
                               </div>
                            </div>
                          )}
                          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                       </div>

                       {recognitionResult && (
                         <div className="p-8 rounded-3xl bg-white/5 border border-white/5 animate-in fade-in duration-700">
                            <h5 className="text-[10px] font-black text-violet-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                               <Info className="w-4 h-4" /> AI Historical Commentary
                            </h5>
                            <p className="text-lg font-medium text-slate-300 italic leading-relaxed">
                               "{recognitionResult.fact}"
                            </p>
                         </div>
                       )}
                    </div>
                 </div>

                 {/* Sidebar: Language & Multi-access (5/12) */}
                 <div className="col-span-12 xl:col-span-5 space-y-10">
                    <div className="p-10 rounded-4xl bg-slate-900 border border-white/5 shadow-2xl space-y-10">
                       <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Cultural Access Protocol</h3>
                       <div className="grid grid-cols-1 gap-4">
                          {LANGUAGES.map(lang => (
                             <button key={lang.code} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-violet-500/50 hover:bg-white/10 transition-all flex items-center justify-between group">
                                <div className="flex items-center gap-5">
                                   <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center font-black text-violet-500">
                                      {lang.code}
                                   </div>
                                   <div>
                                      <p className="text-base font-black text-white uppercase tracking-tight">{lang.name}</p>
                                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Status: {lang.status}</p>
                                   </div>
                                </div>
                                <Languages className="w-5 h-5 text-slate-600 group-hover:text-violet-500 transition-colors" />
                             </button>
                          ))}
                       </div>
                    </div>

                    <div className="p-10 rounded-4xl bg-linear-to-br from-violet-600 to-sky-600 shadow-2xl space-y-8">
                       <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Live Translation Matrix</h3>
                       <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                          <Mic className="w-8 h-8 text-white animate-bounce-subtle" />
                       </div>
                       <p className="text-xs font-bold text-white uppercase tracking-widest leading-relaxed">Enable "Whisper Deep-Sync" for real-time oral history translation while exploring.</p>
                       <button className="w-full py-4 bg-white text-violet-600 font-black rounded-2xl uppercase text-[10px] tracking-widest shadow-xl">Initialize Voice Link</button>
                    </div>
                 </div>
              </div>
            ) : (
              /* Learning Hub View */
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                 
                 {/* Learning Hero */}
                 <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                    <div className="xl:col-span-2 p-12 rounded-4xl bg-slate-900 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[450px]">
                       <div className="absolute top-0 right-0 p-12 opacity-10">
                          <GraduationCap className="w-72 h-72 text-white" />
                       </div>
                       <div className="relative z-10 space-y-6 max-w-2xl">
                          <span className="px-5 py-2 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full">Pro Academic Hub</span>
                          <h2 className="text-6xl font-black italic tracking-tighter text-white uppercase">Master the Architectural Matrix</h2>
                          <p className="text-lg font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Earn certified tokens from the Archaeological Survey Node by completing high-precision modules.</p>
                       </div>
                       <div className="relative z-10 flex items-center gap-6">
                          <button className="px-10 py-5 bg-white text-black font-black rounded-2xl uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">Begin Foundation Alpha</button>
                          <div className="flex -space-x-4">
                             {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800" />)}
                             <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-amber-500 flex items-center justify-center text-[10px] font-black text-black">+2k</div>
                          </div>
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Scholars</span>
                       </div>
                    </div>

                    <div className="p-10 rounded-4xl bg-slate-900 border border-white/5 shadow-2xl flex flex-col justify-between">
                       <header className="space-y-4">
                          <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Your Achievements</h3>
                          <div className="grid grid-cols-2 gap-4">
                             {[1,2,3,4].map(i => (
                               <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center relative group">
                                  <Award className="w-8 h-8 text-slate-700 group-hover:text-amber-500 grayscale group-hover:grayscale-0 transition-all" />
                                  <div className="absolute inset-0 bg-amber-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                               </div>
                             ))}
                          </div>
                       </header>
                       <div className="pt-8 border-t border-white/5 space-y-4">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                             <span className="text-slate-500">Global Rank</span>
                             <span className="text-amber-500">Expert Node #422</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-amber-500 w-[65%]" />
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Lessons Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {DYNASTIES.map(d => (
                       <div key={d.name} className="group p-8 rounded-4xl bg-slate-900 border border-white/5 hover:border-violet-500/30 transition-all hover:-translate-y-2 shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]">
                          <div className={`absolute top-0 right-0 p-8 w-20 h-20 bg-linear-to-br from-white/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                          <div className="space-y-6">
                             <div className={`w-14 h-14 rounded-2xl ${d.color} flex items-center justify-center shadow-2xl shadow-black/50`}>
                                <BookOpen className="w-7 h-7 text-white" />
                             </div>
                             <div>
                                <h4 className="text-2xl font-black text-white uppercase italic tracking-tight leading-tight">{d.name}</h4>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Timeline: {d.period}</p>
                             </div>
                          </div>
                          <div className="mt-auto space-y-6">
                             <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d.lessons} Lessons</span>
                                <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">{d.students} Students</span>
                             </div>
                             <button className="w-full py-4 bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest">Access Module</button>
                          </div>
                       </div>
                    ))}
                 </div>

                 {/* Quiz Section */}
                 <div className="p-12 rounded-4xl bg-linear-to-br from-slate-900 to-indigo-950 border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="space-y-6 max-w-2xl">
                       <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Weekly Challenge</h3>
                       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-4">Topic: The Geometry of Konark</p>
                       <p className="text-lg font-medium text-slate-300 leading-relaxed italic">"Can you identify the 24 stone wheels' function in calculating the solar calendar?"</p>
                       <div className="flex items-center gap-6">
                          <button className="px-10 py-4 bg-violet-600 text-white font-black rounded-2xl uppercase text-[10px] tracking-widest shadow-2xl hover:bg-violet-500 transition-all">Start Evaluation</button>
                          <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest animate-pulse">+500 Preservation XP</span>
                       </div>
                    </div>
                    <div className="w-full max-w-md aspect-square bg-slate-950 rounded-3xl border border-white/10 p-8 shadow-inner flex flex-col gap-6 relative overflow-hidden">
                       <div className="absolute inset-0 bg-violet-600/5 rotate-12 scale-150 blur-3xl" />
                       <div className="relative z-10 flex-1 flex flex-col justify-center gap-8">
                          {[
                            "Celestial Alignment",
                            "Gravity Counterweights",
                            "Solar Calendar Mechanics",
                            "Symbolic Representation"
                          ].map((opt, i) => (
                             <button key={opt} className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:text-white hover:border-violet-500 active:scale-95 transition-all text-left">
                                {String.fromCharCode(65 + i)}. {opt}
                             </button>
                          ))}
                       </div>
                    </div>
                 </div>

              </div>
            )}

          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
