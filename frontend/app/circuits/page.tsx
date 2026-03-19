"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { 
  MapPin, Calendar, Compass, Wallet, Car, Search, 
  Map as MapIcon, ChevronRight, Clock, Users, Star, 
  Sparkles, Info, ArrowRight, ShieldCheck, Heart,
  Sunrise, Sunset, Coffee, Hotel, ExternalLink, Plus,
  Navigation, Timer, BarChart, Flag, ChevronLeft,
  Utensils, Loader2, Radio, Zap, Waves, Activity,
  Globe, Eye, Footprints, Bike, Crown, Play
} from "lucide-react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../../components/MapComponent"), { ssr: false });

// ─── Circuit Data & Mock Engine ──────────────────────────────────────────────
interface CircuitStop {
  id: string;
  name: string;
  time: string;
  duration: string;
  type: string;
  crowd: "Low" | "Medium" | "High";
  energy: number;
  vibe: "Spiritual" | "Historical" | "Bustling" | "Serene";
  img: string;
}

interface DayItinerary {
  day: number;
  stops: CircuitStop[];
}

const GENERATION_LOGS = [
  "Initializing Spatio-Temporal Matrix...",
  "Scanning Cultural Data Repositories...",
  "Calculating Optimal Proximity Vectors...",
  "Filtering Verified Sustenance Nodes...",
  "Synthesizing Spiritual Energy Paths...",
  "Route Pulse 99.2% Secure. Rendering Interface."
];

const DATA_HUB: Record<string, { temples: any[], food: any[], accommodations: any[] }> = {
  "PURI": {
    temples: [
      { id: "P1", name: "Shree Jagannath Temple", time: "05:30 AM", duration: "3.5 hrs", type: "Main Temple", crowd: "High", energy: 98, vibe: "Spiritual", img: "/assets/PURI/shrine_v1.png" }, 
      { id: "P2", name: "Gundicha Temple", time: "10:00 AM", duration: "1.5 hrs", type: "Garden Temple", crowd: "Medium", energy: 85, vibe: "Serene", img: "/assets/PURI/shrine_v2.png" },
      { id: "P3", name: "Narendra Tank", time: "12:30 PM", duration: "1 hr", type: "Holy Lake", crowd: "Low", energy: 70, vibe: "Bustling", img: "/assets/KONARK/download (4).jpg" },
      { id: "P4", name: "Lokanath Temple", time: "04:30 PM", duration: "1.5 hrs", type: "Shaivite Shrine", crowd: "Medium", energy: 90, vibe: "Spiritual", img: "/assets/PURI/shrine_v2.png" },
      { id: "P5", name: "Swargadwar Beach Front", time: "06:30 PM", duration: "1 hr", type: "Culture", crowd: "High", energy: 60, vibe: "Serene", img: "/assets/PURI/jagannath_temple.png" }
    ],
    food: [
      { name: "Ananda Bazar (Mahaprasad)", cuisine: "Authentic Chappan Bhog", rating: 5.0, price: "₹200/p", img: "/assets/Taj Mahal/temple_flavour_prasad_thali.png" },
      { name: "WildGrass Restaurant", cuisine: "Sustainable Heritage", rating: 4.8, price: "₹1,200/p", img: "/assets/KONARK/download (1).jpg" }
    ],
    accommodations: [
      { name: "Puri Heritage Palace", area: "Coastal", budget: "Luxury", price: "₹15,000/n" }
    ]
  },
  "BHUBANESWAR": {
    temples: [
      { id: "B1", name: "Lingaraj Temple", time: "06:00 AM", duration: "3 hrs", type: "Ancient Kalinga", crowd: "High", energy: 99, vibe: "Spiritual", img: "/assets/BHUBANESWAR/lingaraj_temple.png" },
      { id: "B2", name: "Mukteswar Temple", time: "09:30 AM", duration: "1.5 hrs", type: "Odishan Art", crowd: "Medium", energy: 88, vibe: "Serene", img: "/assets/BHUBANESWAR/sunset_v1.png" },
      { id: "B3", name: "Rajarani Gardens", time: "11:30 AM", duration: "1.5 hrs", type: "Archaeological", crowd: "Low", energy: 75, vibe: "Historical", img: "/assets/Victoria Memorial/Victoria-Memorial-Hall-Kolkata-India-West-Bengal.webp" },
      { id: "B4", name: "Udayagiri Caves", time: "03:30 PM", duration: "2.5 hrs", type: "Rock-cut Jain", crowd: "Medium", energy: 82, vibe: "Historical", img: "/assets/Ellora Caves/images.jpg" },
      { id: "B5", name: "Dhauli Shanti Stupa", time: "06:00 PM", duration: "1.5 hrs", type: "Peace Pagoda", crowd: "High", energy: 95, vibe: "Spiritual", img: "/assets/Sanchi Stupa/sanchi-great-stupa.jpg" }
    ],
    food: [
      { name: "Dalma Pure Odia", cuisine: "Regional Traditional", rating: 4.9, price: "₹600/p", img: "/assets/Taj Mahal/temple_flavour_prasad_thali.png" }
    ],
    accommodations: [
      { name: "The Trident", area: "Capital City", budget: "Luxury", price: "₹12,000/n" }
    ]
  }
};

export default function HeritageCircuitGenerator() {
  const [location, setLocation] = useState("Bhubaneswar");
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState("Premium");
  const [transportMode, setTransportMode] = useState<"Walk" | "E-Rick" | "Royal">("E-Rick");
  const [isGenerating, setIsGenerating] = useState(false);
  const [logIndex, setLogIndex] = useState(0);
  const [itinerary, setItinerary] = useState<DayItinerary[] | null>(null);
  const [localFood, setLocalFood] = useState<any[]>([]);
  const [activeStay, setActiveStay] = useState<any>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setItinerary(null);
    setLogIndex(0);

    const logInterval = setInterval(() => {
      setLogIndex(prev => (prev < GENERATION_LOGS.length - 1 ? prev + 1 : prev));
    }, 400);

    setTimeout(() => {
      clearInterval(logInterval);
      setIsGenerating(false);

      const loc = location.toUpperCase().trim();
      const cluster = DATA_HUB[loc] || DATA_HUB["BHUBANESWAR"];

      setItinerary([{ day: 1, stops: cluster.temples.slice(0, 5) }]);
      setLocalFood(cluster.food.slice(0, 5));
      setActiveStay(cluster.accommodations[0]);
    }, 2500);
  };

  return (
    <main className="heritage-page-shell flex min-h-screen w-screen font-sans overflow-hidden bg-transparent text-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-20 overflow-hidden neural-content-shell">
        <div className="header-neural h-20 flex items-center justify-between px-6 z-20 shrink-0 border-b border-slate-50 bg-white/40 backdrop-blur-xl">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
                {(["Walk", "E-Rick", "Royal"] as const).map(mode => (
                  <button 
                    key={mode}
                    onClick={() => setTransportMode(mode)}
                    className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${transportMode === mode ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                     {mode === 'Walk' && <Footprints className="w-3 h-3" />}
                     {mode === 'E-Rick' && <Bike className="w-3 h-3" />}
                     {mode === 'Royal' && <Crown className="w-3 h-3" />}
                     {mode}
                  </button>
                ))}
             </div>
          </div>
          <TopHeader />
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-hide">
          <div className="max-w-[1400px] mx-auto space-y-12 pb-24">
            
            {/* Control Matrix - FIXED: Flexible Width & Prevent Overlap */}
            <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-10 bg-slate-900 p-10 lg:p-14 rounded-[3.5rem] shadow-3xl relative overflow-hidden text-white border border-white/5 group">
               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] -mr-48 -mt-48 group-hover:bg-blue-600/20 transition-all duration-1000" />
               
               <div className="flex-1 space-y-8 relative z-10 w-full text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-8">
                     <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl bg-blue-600 flex items-center justify-center shadow-2xl animate-pulse">
                        <Navigation className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                     </div>
                     <div className="space-y-2">
                        <h1 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tighter leading-none">Circuit <span className="text-blue-500">Generator</span></h1>
                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.8em]">Proprietary Spatial Synthesis 7.3</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Spatial Node</label>
                      <div className="relative group">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 group-focus-within:animate-ping" />
                        <input 
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 text-xs font-black uppercase text-white outline-none focus:border-blue-500/50 transition-all"
                          placeholder="e.g. VARANASI"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Circuit Scale</label>
                      <select 
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-xs font-black uppercase text-white outline-none cursor-pointer hover:bg-white/10 transition-all appearance-none"
                      >
                        {[1, 2, 3, 5].map(d => <option key={d} value={d} className="bg-slate-900">{d} Day Matrix</option>)}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Energy Budget</label>
                      <select 
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-xs font-black uppercase text-white outline-none cursor-pointer hover:bg-white/10 transition-all appearance-none"
                      >
                        {["Economy", "Premium", "Luxury"].map(b => <option key={b} value={b} className="bg-slate-900">{b}</option>)}
                      </select>
                    </div>
                    <div className="md:col-span-2 pt-6">
                       <button onClick={handleGenerate} disabled={isGenerating} className="btn-perfect-align w-full h-16 bg-blue-600 text-white rounded-2xl hover:bg-white hover:text-slate-950 border-none group transition-all">
                          {isGenerating ? (
                             <><Loader2 className="w-5 h-5 animate-spin" /> Synthesizing Node Path...</>
                          ) : (
                             <>
                                <span className="btn-icon-box group-hover:rotate-45 transition-transform">
                                   <Zap className="w-5 h-5 fill-current" />
                                </span>
                                <span className="btn-text">Initialize Heritage Circuit</span>
                             </>
                          )}
                       </button>
                    </div>
                  </div>
               </div>
            </div>

            {/* Itinerary Visualization */}
            {itinerary && (
              <div className="grid grid-cols-12 gap-12 animate-reveal">
                {/* Timeline */}
                <div className="col-span-12 lg:col-span-8 space-y-12">
                   <div className="flex items-center gap-4 mb-8">
                      <Calendar className="w-6 h-6 text-blue-600" />
                      <h2 className="text-3xl font-black uppercase italic tracking-tighter">Sequence Log: Day 01</h2>
                   </div>
                   
                   <div className="space-y-8 relative pl-8 border-l-2 border-slate-100">
                      {itinerary[0].stops.map((stop, i) => (
                        <div key={stop.id} className="relative group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all">
                           <div className="absolute -left-[45px] top-10 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-lg z-10" />
                           
                           <div className="flex flex-col md:flex-row gap-8">
                              <div className="w-full md:w-48 h-48 rounded-3xl overflow-hidden shrink-0 border border-slate-100">
                                 <img src={stop.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={stop.name} />
                              </div>
                              <div className="flex-1 space-y-4">
                                 <div className="flex items-center justify-between">
                                    <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest">{stop.time}</div>
                                    <div className="flex items-center gap-2">
                                       <Activity className="w-4 h-4 text-emerald-500" />
                                       <span className="text-[10px] font-black uppercase text-emerald-600">{stop.energy}% Energy</span>
                                    </div>
                                 </div>
                                 <h3 className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-blue-600 transition-colors">{stop.name}</h3>
                                 <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {stop.duration}</div>
                                    <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> {stop.crowd} Crowd</div>
                                    <div className="flex items-center gap-2 text-blue-500"><Sparkles className="w-3.5 h-3.5" /> {stop.vibe}</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Logistics Sidekick */}
                <div className="col-span-12 lg:col-span-4 space-y-12">
                   <div className="p-10 glass-card rounded-[3rem] space-y-8 border border-white/50">
                      <h4 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-3">
                         <Utensils className="w-6 h-6 text-blue-600" /> Sustenance Nexus
                      </h4>
                      <div className="space-y-6">
                         {localFood.map((food, i) => (
                           <div key={i} className="flex gap-4 group cursor-pointer">
                              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                                 <img src={food.img} className="w-full h-full object-cover" alt={food.name} />
                              </div>
                              <div className="space-y-1">
                                 <h5 className="text-[11px] font-black uppercase italic tracking-tight text-slate-950 truncate max-w-[150px]">{food.name}</h5>
                                 <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{food.cuisine}</p>
                                 <div className="flex items-center gap-2 text-[9px] font-black text-amber-500">
                                    <Star className="w-3 h-3 fill-amber-500" /> {food.rating}
                                 </div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   {activeStay && (
                      <div className="p-10 bg-slate-950 rounded-[3rem] text-white space-y-8 shadow-3xl">
                         <h4 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-3">
                            <Hotel className="w-6 h-6 text-blue-500" /> Sleeping Node
                         </h4>
                         <div className="space-y-4">
                            <p className="text-xs font-black uppercase text-blue-400 tracking-[0.3em]">Authorized Residence</p>
                            <h3 className="text-3xl font-black italic tracking-tighter">{activeStay.name}</h3>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-white/50 uppercase tracking-widest">
                               <span>{activeStay.area}</span>
                               <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                               <span>{activeStay.budget}</span>
                            </div>
                         </div>
                         <button className="btn-perfect-align w-full h-14 bg-white text-slate-950 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all border-none">
                            Book Node Sync
                         </button>
                      </div>
                   )}
                </div>
              </div>
            )}

            {/* Progress Log */}
            {isGenerating && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
                 <div className="w-full max-w-md p-12 text-center space-y-8 animate-reveal">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
                    <div className="space-y-2">
                       <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Synthesizing Circuit</h3>
                       <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em] animate-pulse">
                          {GENERATION_LOGS[logIndex]}
                       </p>
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
      `}</style>
    </main>
  );
}
