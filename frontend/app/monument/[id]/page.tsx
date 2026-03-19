"use client";

import { useParams } from "next/navigation";
import { Sidebar } from "../../../components/Sidebar";
import { TopHeader } from "../../../components/TopHeader";
import { 
  ArrowLeft, MapPin, Clock, Star, Info, 
  Calendar, Rotate3d, Play, Mic, ShieldCheck,
  ChevronRight, ExternalLink, Activity, Waves, 
  Sun, Heart, Navigation, Share2, Bookmark
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// ─── Dynamic Monument Data (Mock Matrix) ───────────────────────────────────
const MONUMENT_DB: Record<string, any> = {
  "M1": {
    name: "Konark Sun Temple",
    location: "Odisha, India",
    year: "13th Century",
    tagline: "The Chariot of the Sun God",
    description: "A monumental representation of the sun god Surya's chariot, its 24 wheels are decorated with symbolic designs and it is led by a team of six horses. It is a masterpiece of Odisha's medieval architecture.",
    stats: { popularity: "98%", architectural_index: "9.9", energy: "High" },
    timeline: [
      { year: "1250 CE", event: "Commissioned by King Narasimhadeva I of the Eastern Ganga Dynasty." },
      { year: "1568 CE", event: "Suffered damage during invasions and natural decay." },
      { year: "1984 CE", event: "Declared a UNESCO World Heritage Site." }
    ],
    img: "/assets/KONARK/download.jpg"
  },
  "M2": {
    name: "Taj Mahal",
    location: "Agra, India",
    year: "1632 CE",
    tagline: "The Jewel of Muslim Art",
    description: "An ivory-white marble mausoleum on the south bank of the Yamuna river. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal.",
    stats: { popularity: "100%", architectural_index: "10.0", energy: "Serene" },
    timeline: [
      { year: "1632 CE", event: "Construction initiated by Shah Jahan." },
      { year: "1648 CE", event: "Main mausoleum completed." },
      { year: "1983 CE", event: "UNESCO World Heritage Site induction." }
    ],
    img: "/assets/Taj Mahal/download.jpg"
  }
};

export default function MonumentDetailPage() {
  const { id } = useParams();
  const monument = MONUMENT_DB[id as string] || MONUMENT_DB["M1"];
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="heritage-page-shell flex min-h-screen w-screen font-sans overflow-hidden bg-white text-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-20 overflow-hidden">
        <div className="header-neural h-20 flex items-center justify-between px-6 z-20 shrink-0 border-b border-slate-50">
          <TopHeader />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide neural-content-shell">
          {/* Hero Section */}
          <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
            <img 
              src={monument.img} 
              alt={monument.name}
              className="absolute inset-0 w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-12 lg:p-24 space-y-6">
               <div className="flex flex-col lg:flex-row items-end justify-between gap-10">
                  <div className="space-y-4">
                     <Link href="/explore" className="inline-flex items-center gap-2 text-[10px] font-black text-white/60 uppercase tracking-widest hover:text-white transition-all">
                        <ArrowLeft className="w-3 h-3" /> Return to Explorer
                     </Link>
                     <div className="space-y-2">
                        <p className="text-blue-400 font-black uppercase text-[10px] tracking-[0.6em]">{monument.year}</p>
                        <h1 className="text-6xl lg:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">{monument.name}</h1>
                        <p className="flex items-center gap-2 text-white/70 font-bold uppercase tracking-widest italic">
                           <MapPin className="w-4 h-4 text-blue-500" /> {monument.location}
                        </p>
                     </div>
                  </div>
                  
                  <div className="flex gap-4">
                     <button className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all">
                        <Share2 className="w-6 h-6" />
                     </button>
                     <button className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all">
                        <Bookmark className="w-6 h-6" />
                     </button>
                     <button className="h-16 px-10 rounded-2xl bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-blue-700 transition-all">
                        Reserve Circuit
                     </button>
                  </div>
               </div>
            </div>
          </section>

          {/* Sub-Nav Matrix */}
          <div className="px-12 lg:px-24 py-8 border-b border-slate-100 flex items-center gap-10 sticky top-0 bg-white z-40 shadow-sm">
             {["Overview", "History", "Architecture", "Neural Scan"].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab.toLowerCase())}
                 className={`text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.toLowerCase() ? 'text-blue-600 underline underline-offset-8 decoration-4' : 'text-slate-400 hover:text-slate-950'}`}
               >
                 {tab}
               </button>
             ))}
          </div>

          <div className="p-12 lg:p-24 grid grid-cols-1 lg:grid-cols-12 gap-20">
             
             {/* Left Column: Details */}
             <div className="lg:col-span-8 space-y-16">
                <div className="space-y-6">
                   <h2 className="text-3xl font-black uppercase italic tracking-tighter">The Heritage Narrative</h2>
                   <p className="text-xl font-medium text-slate-600 leading-relaxed italic">"{monument.tagline}"</p>
                   <p className="text-lg text-slate-800 leading-relaxed font-light">{monument.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                   {Object.entries(monument.stats).map(([k, v]: any) => (
                     <div key={k} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{k.replace('_', ' ')}</p>
                        <p className="text-3xl font-black text-slate-950 italic">{v}</p>
                     </div>
                   ))}
                </div>

                <div className="space-y-10">
                   <h3 className="text-2xl font-black uppercase italic tracking-tight">Timeline Matrix</h3>
                   <div className="space-y-8 relative pl-10 border-l-2 border-slate-100">
                      {monument.timeline.map((item: any, i: number) => (
                        <div key={i} className="relative">
                           <div className="absolute -left-[51px] top-1 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow-md" />
                           <p className="text-blue-600 font-black text-lg mb-1">{item.year}</p>
                           <p className="text-slate-600 font-medium">{item.event}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Right Column: Neural Tools */}
             <div className="lg:col-span-4 space-y-10">
                <div className="p-10 bg-slate-950 rounded-[3rem] text-white space-y-8 shadow-3xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -mr-16 -mt-16" />
                   
                   <div className="flex items-center gap-4 relative z-10">
                      <Rotate3d className="w-10 h-10 text-blue-500 animate-spin-slow" />
                      <div>
                         <h4 className="text-xl font-black uppercase italic">Neural Mesh</h4>
                         <p className="text-[9px] text-white/40 font-black uppercase tracking-widest leading-none mt-1">Sovereign Pro Feature</p>
                      </div>
                   </div>
                   
                   <div className="aspect-square bg-white/10 rounded-4xl border border-white/5 flex flex-col items-center justify-center text-center p-8 space-y-6">
                      <div className="w-20 h-20 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center">
                         <Play className="w-8 h-8 text-blue-500 fill-blue-500" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Initialize 3D Neural Projection for {monument.name}</p>
                   </div>

                   <button className="w-full py-5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                      Unlock Full Access
                   </button>
                </div>

                <div className="p-10 bg-slate-50 border border-slate-200 rounded-[3rem] space-y-8">
                   <div className="flex items-center gap-4">
                      <Mic className="w-6 h-6 text-blue-600" />
                      <h4 className="text-xl font-black uppercase italic tracking-tight">Audio Guide</h4>
                   </div>
                   <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <button className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                         <Play className="w-6 h-6 fill-white" />
                      </button>
                      <div className="flex-1 space-y-1">
                         <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-black uppercase text-slate-400">Track 01: Origins</span>
                            <span className="text-[9px] font-black text-blue-600">3:42</span>
                         </div>
                         <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-1/3" />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="p-10 bg-blue-600 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden">
                   <ShieldCheck className="w-16 h-16 opacity-10 absolute -right-4 -bottom-4" />
                   <h4 className="text-xl font-black uppercase italic tracking-tight">Health Status</h4>
                   <div className="flex justify-between items-end mb-2">
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Structural Integrity</span>
                       <span className="text-xl font-black italic">94%</span>
                   </div>
                   <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                       <div className="h-full bg-white w-[94%]" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </main>
  );
}
