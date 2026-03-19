"use client";

import { useState, useRef, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { 
  ScanSearch, BrainCircuit, Globe, BookOpen, GraduationCap,
  Sparkles, Camera, Upload, Loader2, ChevronRight, CheckCircle2,
  Award, Zap, Languages, Play, Mic, Info, History, Star,
  Search, ShieldCheck, ArrowUpRight, X, Users, Heart,
  MessageSquare, Radio, Waves, Timer, Map, Binary,
  Box, Layers, Rotate3d, Maximize2
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─── AI & Learning Data ──────────────────────────────────────────────────────
const DYNASTIES = [
  { name: "Mughal Empire", period: "1526–1857", lessons: 12, students: "124k", color: "bg-red-600" },
  { name: "Chola Dynasty", period: "300 BCE–1279 CE", lessons: 15, students: "98k", color: "bg-orange-600" },
  { name: "Gupta Empire", period: "319–550 CE", lessons: 8, students: "45k", color: "bg-amber-600" },
  { name: "Vijayanagara", period: "1336–1646", lessons: 10, students: "67k", color: "bg-blue-600" },
  { name: "Maurya Empire", period: "322–185 BCE", lessons: 14, students: "112k", color: "bg-emerald-600" },
  { name: "Maratha Empire", period: "1674–1818", lessons: 11, students: "88k", color: "bg-indigo-600" },
  { name: "Pala Dynasty", period: "750–1161 CE", lessons: 9, students: "32k", color: "bg-pink-600" },
  { name: "Rashtrakuta", period: "753–982 CE", lessons: 7, students: "28k", color: "bg-cyan-600" }
];

const LANGUAGES = [
  { code: "EN", name: "English", status: "Native Build" },
  { code: "HI", name: "Hindi (हिन्दी)", status: "Deep-Sync" },
  { code: "OD", name: "Odia (ଓଡ଼ିଆ)", status: "Active" },
  { code: "FR", name: "French", status: "Beta" },
  { code: "ES", name: "Spanish", status: "Translate" },
  { code: "BN", name: "Bengali (বাংলা)", status: "Active" },
  { code: "TM", name: "Tamil (தமிழ்)", status: "Deep-Sync" },
  { code: "TE", name: "Telugu (తెలుగు)", status: "Beta" },
  { code: "SK", name: "Sanskrit (संस्कृतम्)", status: "Ancient Node" }
];

// ─── Sub-Component: 3D Projection Card ──────────────────────────────────────
function Neural3DProjection({ image }: { image: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative aspect-video w-full rounded-[3rem] bg-slate-950 border border-white/10 shadow-2xl cursor-crosshair overflow-hidden group"
    >
      <div 
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 rounded-[2.5rem] bg-slate-900 border border-white/5 overflow-hidden ring-1 ring-white/10"
      >
        <img 
          src={image} 
          className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[3000ms]" 
          alt="3D Projection"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60" />
      </div>

      <div 
        style={{ transform: "translateZ(100px)" }}
        className="absolute bottom-10 left-10 text-white space-y-2 pointer-events-none"
      >
        <div className="flex items-center gap-3">
           <div className="p-2 rounded-lg bg-violet-600/20 border border-violet-500/30 backdrop-blur-md">
             <Rotate3d className="w-4 h-4 text-violet-500 animate-spin-slow" />
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-400">3D Spatial Projection Active</span>
        </div>
        <h4 className="text-3xl font-black uppercase italic tracking-tighter">Holographic Node</h4>
      </div>

      <div 
        style={{ transform: "translateZ(120px)" }}
        className="absolute top-10 right-10 flex flex-col gap-3"
      >
         <button className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all">
            <Maximize2 className="w-5 h-5" />
         </button>
      </div>

      <div className="absolute inset-0 pointer-events-none border-[12px] border-white/5 rounded-[3rem]" />
    </motion.div>
  );
}

export default function AICompassHub() {
  const [activeTab, setActiveTab] = useState<"recognition" | "learning">("recognition");
  const [isScanning, setIsScanning] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<any>(null);
  const [surveyData, setSurveyData] = useState<any>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeModule, setActiveModule] = useState<any>(null);
  const [eraProjection, setEraProjection] = useState("Current");
  const [aiChat, setAiChat] = useState<{ msg: string; type: "user" | "ai" }[]>([
    { msg: "Neural Link Established. How can I assist your discovery?", type: "ai" }
  ]);
  const [chatInput, setChatInput] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    setIsScanning(true);
    setRecognitionResult(null);
    setSurveyData(null);

    // Trigger Thinking Glow
    window.dispatchEvent(new CustomEvent("heritage-pulse", { 
      detail: { color: "rgba(139, 92, 246,", x: window.innerWidth / 2, y: window.innerHeight / 2 } 
    }));

    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await fetch(`http://localhost:8000/api/monument/identify?language=${selectedLanguage}`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setRecognitionResult(data);

      if (data.name && data.name !== "Identification Failed") {
        const surveyRes = await fetch("http://localhost:8000/api/monument/survey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ monument_name: data.name, language: selectedLanguage })
        });
        const survey = await surveyRes.json();
        setSurveyData(survey);
      }
    } catch (err) {
      console.error("Neural Link Error:", err);
    } finally {
      setIsScanning(false);
    }
  };

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setAiChat(prev => [...prev, { msg: chatInput, type: "user" }]);
    const input = chatInput.toLowerCase();
    setChatInput("");
    
    setTimeout(() => {
        let response = "I am processing your historical query through the linguistic matrix.";
        if (input.includes("history")) response = "This site's history spans over a millennium, beginning with the foundations laid in the Early Medieval period.";
        if (input.includes("architecture")) response = "The architectural nodes identified suggest a high-precision Kalinga influence with monolithic sandstone elements.";
        setAiChat(prev => [...prev, { msg: response, type: "ai" }]);
    }, 1000);
  };

  return (
    <main className="heritage-page-shell flex min-h-screen w-full font-sans overflow-x-hidden bg-transparent text-white relative">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-600/10 blur-[150px] rounded-full" />
      </div>

      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10">
        <div className="header-neural h-20 flex items-center justify-between px-6 z-20 shrink-0 border-b border-white/5 bg-slate-950/40 backdrop-blur-xl">
          <TopHeader />
        </div>
        
        <div className="flex-1 p-8 lg:p-12 xl:p-16 scrollbar-hide neural-content-shell">
          <div className="w-full space-y-12 pb-24">
            
            {/* Header / Tab Switcher */}
            <header className="mb-12 flex flex-col lg:flex-row justify-between items-center gap-8">
               <div className="space-y-4 w-full lg:w-auto text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 justify-center lg:justify-start">
                     <h1 className="text-[clamp(1.5rem,8vw,5rem)] font-black text-white uppercase italic tracking-tighter flex items-center gap-4 lg:gap-6">
                       <BrainCircuit className="w-8 h-8 md:w-16 md:h-16 lg:w-20 lg:h-20 text-violet-500" /> Neural Compass
                     </h1>
                  </div>
                  <div className="flex items-center gap-4 justify-center lg:justify-start">
                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] underline decoration-violet-500/50 underline-offset-8">Cognitive Exploration & Learning Matrix</p>
                     <span className="px-3 py-1 bg-violet-500 text-white text-[8px] font-black uppercase italic rounded-lg shadow-2xl">SAAS PRO v4.2</span>
                  </div>
               </div>

               <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-3xl border border-white/10 shrink-0">
                  <button onClick={() => setActiveTab("recognition")} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'recognition' ? 'text-violet-500 border border-violet-500/30 bg-violet-500/5 shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                    AI Recognition
                  </button>
                  <button onClick={() => setActiveTab("learning")} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'learning' ? 'text-violet-500 border border-violet-500/30 bg-violet-500/5 shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                    Learning Hub
                  </button>
               </div>
            </header>

            {activeTab === "recognition" ? (
              <div className="grid grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  
                  {/* Recognition Engine (7/12) */}
                  <div className="col-span-12 xl:col-span-7 space-y-8 lg:space-y-10">
                     <div className="p-6 md:p-10 rounded-3xl lg:rounded-4xl bg-slate-900 border border-white/5 shadow-2xl space-y-8 lg:space-y-12">
                       <header className="flex justify-between items-center">
                          <div className="space-y-2">
                             <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Vision Engine 4.0</h3>
                             <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Multi-Layer Sub-Surface Analysis</p>
                          </div>
                          <div className="flex gap-2">
                             {["3D Neural", "Optical", "LiDAR"].map(mode => (
                               <button key={mode} className={`px-3 py-1 border rounded-lg text-[8px] font-black uppercase transition-all ${mode === '3D Neural' ? 'bg-violet-600 border-violet-500 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>{mode}</button>
                             ))}
                          </div>
                       </header>

                       <div 
                         onClick={() => !previewImage && fileInputRef.current?.click()}
                         className={`group relative aspect-video rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-6 cursor-pointer overflow-hidden ${isScanning ? 'border-violet-500 bg-violet-500/5' : 'border-white/10 hover:border-violet-500/50 bg-white/5'}`}
                       >
                          {!isScanning && !previewImage ? (
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
                                  <p className="text-sm font-black text-white uppercase italic tracking-widest">Neural Mapping in Progress...</p>
                               </div>
                            </div>
                          ) : (
                            <Neural3DProjection image={previewImage!} />
                          )}
                          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                       </div>
                       
                       {previewImage && (
                          <div className="flex justify-center">
                             <button onClick={() => {setPreviewImage(null); setRecognitionResult(null);}} className="text-[9px] font-black uppercase text-slate-500 hover:text-white transition-all">Reset Scan Node</button>
                          </div>
                       )}
                     </div>

                     {recognitionResult && (
                       <div className="p-10 rounded-[40px] bg-slate-900 border border-violet-500/20 shadow-2xl space-y-8 animate-in zoom-in-95 duration-500 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-[100px] -mr-32 -mt-32" />
                          
                          <header className="flex justify-between items-start relative z-10">
                             <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                   <Radio className="w-4 h-4 text-violet-500 animate-pulse" />
                                   <p className="text-[9px] font-black uppercase tracking-[0.4em] text-violet-400">Signal: Authenticated</p>
                                </div>
                                <h4 className="text-5xl font-black text-white uppercase italic tracking-tighter">{recognitionResult.name}</h4>
                             </div>
                             <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                                <CheckCircle2 className="w-8 h-8 text-white" />
                             </div>
                          </header>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                             <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                <p className="text-[10px] text-white/50 font-black uppercase mb-2">Neural Confidence</p>
                                <div className="flex items-end gap-2">
                                   <span className="text-3xl font-black text-white">98.4%</span>
                                   <Zap className="w-5 h-5 text-amber-400 mb-1" />
                                </div>
                             </div>
                             <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                <p className="text-[10px] text-white/50 font-black uppercase mb-2">Linguistic Code</p>
                                <span className="text-xl font-black text-white uppercase">{selectedLanguage}</span>
                             </div>
                             <div className="p-6 border border-violet-500/30 bg-violet-500/5 rounded-3xl space-y-2">
                                <div className="flex items-center justify-between">
                                   <p className="text-[10px] text-violet-400 font-black uppercase">Era Projection</p>
                                   <Timer className="w-3 h-3 text-violet-400" />
                                </div>
                                <select 
                                  value={eraProjection}
                                  onChange={(e) => setEraProjection(e.target.value)}
                                  className="w-full bg-transparent border-none text-sm font-black uppercase text-white outline-none cursor-pointer"
                                >
                                   {["Current", "Mughal era", "Classic Gupta", "Early Vedic"].map(era => <option key={era} value={era} className="bg-slate-900 text-white">{era}</option>)}
                                </select>
                             </div>
                          </div>

                          <div className="p-10 bg-black/40 rounded-[3rem] border border-white/5 relative z-10">
                             <div className="flex items-center gap-4 mb-6">
                                <Binary className="w-5 h-5 text-violet-500" />
                                <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Deciphered Manifest</h5>
                             </div>
                             <p className="text-lg font-medium text-white/90 leading-relaxed italic">"{recognitionResult.description || "The neural matrix suggests a high-density sandstone structure built during the peak of regional architectural excellence."}"</p>
                          </div>
                       </div>
                     )}
                  </div>

                  {/* Knowledge Console & Neural Link (5/12) */}
                  <div className="col-span-12 xl:col-span-5 space-y-8">
                     <div className="p-8 rounded-4xl bg-slate-900 border border-white/5 shadow-2xl h-[450px] flex flex-col relative overflow-hidden group">
                        <header className="flex items-center justify-between mb-8 shrink-0 relative z-10">
                           <div className="flex items-center gap-3">
                              <MessageSquare className="w-5 h-5 text-violet-500" />
                              <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Neural Link Oracle</h3>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Active</span>
                           </div>
                        </header>

                        <div className="flex-1 overflow-y-auto space-y-4 mb-6 scrollbar-hide relative z-10 p-2">
                           {aiChat.map((msg, i) => (
                             <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-4 text-[11px] font-bold leading-relaxed shadow-lg ${msg.type === 'user' ? 'bg-violet-600 text-white rounded-2xl rounded-tr-none' : 'bg-white/5 border border-white/10 text-slate-300 rounded-2xl rounded-tl-none italic'}`}>
                                   {msg.msg}
                                </div>
                             </div>
                           ))}
                        </div>

                        <form onSubmit={sendChatMessage} className="relative z-10 shrink-0">
                           <input 
                             type="text" 
                             value={chatInput}
                             onChange={(e) => setChatInput(e.target.value)}
                             placeholder="Ask the Oracle (Era, Secrets, Pulse)..."
                             className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-xs font-bold text-white outline-none focus:border-violet-500/50 transition-all"
                           />
                           <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all">
                              <ArrowUpRight className="w-4 h-4" />
                           </button>
                        </form>
                     </div>

                     <div className="p-10 rounded-4xl bg-violet-600 shadow-2xl space-y-8 relative overflow-hidden group border border-white/10">
                        <Waves className="absolute -right-4 -bottom-4 w-40 h-40 text-black/10 transition-transform group-hover:rotate-12 duration-1000" />
                        
                        <div className="flex items-center gap-4 relative z-10">
                           <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-xl">
                              <Radio className="w-6 h-6 text-white" />
                           </div>
                           <div>
                              <h4 className="text-xl font-black text-white italic uppercase tracking-tight">Pulse Generator</h4>
                              <p className="text-[9px] text-white/60 font-black uppercase tracking-widest">Acoustic Signature Match</p>
                           </div>
                        </div>

                        {recognitionResult ? (
                           <div className="space-y-6 relative z-10">
                              <div className="p-6 bg-black/20 rounded-3xl border border-white/10">
                                 <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-black uppercase text-white/70 tracking-widest italic">Spiritual Frequency</span>
                                    <span className="text-[10px] font-black text-white">432Hz Core</span>
                                 </div>
                                 <div className="flex items-end gap-1.5 h-16">
                                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
                                       <div key={i} className="flex-1 bg-white/30 rounded-full animate-wave" style={{ height: `${Math.random()*100}%`, animationDelay: `${i*0.1}s` }} />
                                    ))}
                                 </div>
                              </div>
                              <button className="w-full py-4 bg-white text-violet-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                                 <Play className="w-4 h-4 fill-violet-600" /> Reconstruct Audio
                              </button>
                           </div>
                        ) : (
                           <div className="py-10 text-center space-y-4 relative z-10 px-6">
                              <p className="text-sm font-black text-white/40 uppercase tracking-[0.2em] italic">Awaiting Signature...</p>
                              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-white/30 w-1/4 animate-shimmer" />
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-12 pb-20">
                {/* Learning Hub Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                   {DYNASTIES.map((d, i) => (
                     <div key={i} onClick={() => setActiveModule(d)} className="group p-8 rounded-[2.5rem] bg-slate-900 border border-white/5 hover:border-violet-500/50 transition-all cursor-pointer relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-32 h-32 ${d.color} opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity`} />
                        <BookmarkIcon className="absolute top-8 right-8 w-5 h-5 text-slate-700 group-hover:text-violet-500 transition-colors" />
                        
                        <div className="space-y-6 relative z-10">
                           <div className={`w-14 h-14 rounded-2xl ${d.color} shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <GraduationCap className="w-7 h-7 text-white" />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{d.period}</p>
                              <h4 className="text-xl font-black text-white italic uppercase tracking-tight">{d.name}</h4>
                           </div>
                           <div className="flex items-center justify-between pt-4 border-t border-white/5">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{d.lessons} Modules</span>
                              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="grid grid-cols-12 gap-8 lg:gap-12">
                   <div className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] shadow-sm space-y-8 flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                        <ScanSearch className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Initialize <span className="text-blue-600">Scan</span></h3>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider leading-relaxed">Activate LiDAR-X Optical Matrix to identify structural nodes.</p>
                    </div>
                    <button className="btn-perfect-align w-full bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-slate-950 border-none transition-all group">
                       <span className="btn-icon-box group-hover:rotate-12">
                          <Camera className="w-5 h-5" />
                       </span>
                       <span className="btn-text">Start Neural Scan</span>
                    </button>
                  </div>

                  <div className="p-10 bg-slate-950 border border-white/5 rounded-[3rem] shadow-2xl space-y-8 flex flex-col justify-between text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl -mr-16 -mt-16" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-blue-400 mb-6 group-hover:rotate-6 transition-transform">
                        <Upload className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Upload <span className="text-blue-400">Memory</span></h3>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-wider leading-relaxed">Stream localized heritage captures into the Neural Hub.</p>
                    </div>
                    <button className="btn-perfect-align w-full bg-white text-slate-950 rounded-2xl shadow-2xl hover:bg-blue-600 hover:text-white border-none transition-all group relative z-10">
                       <span className="btn-icon-box">
                          <Layers className="w-5 h-5" />
                       </span>
                       <span className="btn-text">Transmission Start</span>
                    </button>
                  </div>

                   <div className="col-span-12 lg:col-span-4 p-10 rounded-4xl bg-violet-600 shadow-2xl space-y-8 flex flex-col justify-center border border-white/10">
                      <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl">
                         <Award className="w-10 h-10 text-white" />
                      </div>
                      <div className="space-y-3">
                         <h4 className="text-2xl font-black text-white uppercase italic leading-none">Global Ranking</h4>
                         <p className="text-sm font-medium text-white/80 leading-relaxed italic">"You are currently in the top 4% of active users identifying monuments in the Indian Subcontinent."</p>
                      </div>
                      <div className="pt-6 border-t border-white/10">
                         <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Next Achievement</span>
                            <span className="text-xs font-bold text-white">88%</span>
                         </div>
                         <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-[88%]" />
                         </div>
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
        @keyframes wave {
          0%, 100% { height: 10%; }
          50% { height: 100%; }
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </main>
  );
}

function BookmarkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  )
}
