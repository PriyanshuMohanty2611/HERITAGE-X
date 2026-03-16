"use client";

import { useState, useEffect, useRef } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { 
  MapPin, Calendar, Compass, Wallet, Car, Search, 
  Map as MapIcon, ChevronRight, Clock, Users, Star, 
  Sparkles, Info, ArrowRight, ShieldCheck, Heart,
  Sunrise, Sunset, Coffee, Hotel, ExternalLink, Plus,
  Navigation, Timer, BarChart, Flag
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
  travelToNext?: string;
  distance?: string;
}

interface DayItinerary {
  day: number;
  stops: CircuitStop[];
}

const BHUBANESWAR_CIRCUIT: DayItinerary[] = [
  {
    day: 1,
    stops: [
      { id: "L1", name: "Lingaraj Temple", time: "09:00 AM", duration: "1.5 hours", type: "Temple", crowd: "Medium", travelToNext: "15 min", distance: "3 km" },
      { id: "L2", name: "Mukteshwar Temple", time: "11:00 AM", duration: "1 hour", type: "Temple", crowd: "Low", travelToNext: "25 min", distance: "8 km" },
      { id: "L3", name: "Dhauli Shanti Stupa", time: "02:30 PM", duration: "1 hour", type: "Architecture", crowd: "Medium" }
    ]
  },
  {
    day: 2,
    stops: [
      { id: "L4", name: "Konark Sun Temple", time: "07:00 AM", duration: "2 hours", type: "Temple", crowd: "Medium", travelToNext: "10 min", distance: "2 km" },
      { id: "L5", name: "Chandrabhaga Beach", time: "10:00 AM", duration: "1.5 hours", type: "Nature", crowd: "Low", travelToNext: "1 hr 15 min", distance: "35 km" },
      { id: "L6", name: "Puri Jagannath Temple", time: "01:30 PM", duration: "2 hours", type: "Temple", crowd: "High" }
    ]
  }
];

const SUGGESTED_GUIDES = [
  { name: "Ravi Sharma", exp: "8 years", lang: "English, Hindi, Odia", rating: 4.9, img: "https://i.pravatar.cc/150?u=ravi" },
  { name: "Anita Patnaik", exp: "12 years", lang: "English, Odia, Bengali", rating: 5.0, img: "https://i.pravatar.cc/150?u=anita" }
];

const SUGGESTED_HOTELS = [
  { name: "Lotus Eco Resort", dist: "2 km", rating: 4.2, price: "₹4,500/night" },
  { name: "Hotel Mayfair Palm", dist: "5 km", rating: 4.8, price: "₹8,200/night" }
];

export default function HeritageCircuitGenerator() {
  const [location, setLocation] = useState("Bhubaneswar");
  const [days, setDays] = useState(2);
  const [interest, setInterest] = useState("Temples");
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<DayItinerary[] | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setItinerary(null);
    setTimeout(() => {
      setIsGenerating(false);
      setItinerary(BHUBANESWAR_CIRCUIT);
    }, 2000);
  };

  return (
    <main className="heritage-page-shell flex h-dvh w-screen font-sans overflow-hidden bg-slate-950 text-white relative">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_50%_0%,#2563eb,transparent_50%)]" />
      </div>

      <Sidebar />
      <div className="flex-1 flex flex-col relative z-20 overflow-hidden">
        <TopHeader />
        
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-12 h-full">
            
            {/* LEFT SIDE: Interactive Map (5/12) */}
            <div className="hidden xl:block xl:col-span-5 relative border-r border-white/5 bg-slate-900 animate-in slide-in-from-left duration-700">
               <div className="absolute top-8 left-8 z-30 space-y-4">
                  <div className="px-6 py-3 bg-white/90 backdrop-blur-2xl rounded-2xl border border-white shadow-2xl flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                        <Navigation className="w-5 h-5 animate-pulse" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Circuit Map</p>
                        <p className="text-sm font-black text-slate-900 uppercase">{location} Heritage Hub</p>
                     </div>
                  </div>
               </div>

               <div className="w-full h-full opacity-80 grayscale-[0.2] contrast-[1.1]">
                  <MapComponent activeLocation={{ coords: [20.2444, 85.8439] }} />
               </div>

               {/* Route Path Indicator overlay */}
               <div className="absolute bottom-8 left-8 right-8 z-30 p-8 rounded-4xl bg-slate-950/80 backdrop-blur-3xl border border-white/10 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                     <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Live Route Progression</h4>
                     <Flag className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                     <div className="h-0.5 flex-1 bg-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-500 w-1/3 animate-[progress_3s_ease-in-out_infinite]" />
                     </div>
                     <div className="w-3 h-3 rounded-full border-2 border-white/20" />
                     <div className="h-0.5 flex-1 bg-white/10" />
                     <div className="w-3 h-3 rounded-full border-2 border-white/20" />
                  </div>
                  <div className="flex justify-between mt-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                     <span>Bhubaneswar</span>
                     <span>Dhauli</span>
                     <span>Konark</span>
                  </div>
               </div>
            </div>

            {/* RIGHT SIDE: Route Planner Panel (7/12) */}
            <div className="col-span-12 xl:col-span-7 flex flex-col bg-slate-950/50 overflow-hidden">
               
               {/* Step 1: User Input Panel */}
               <div className="p-10 border-b border-white/5 space-y-10 shrink-0">
                  <header className="flex items-center justify-between">
                     <div className="space-y-2">
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
                           <Sparkles className="w-10 h-10 text-blue-500" /> Circuit Generator
                        </h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">Proprietary Route Optimization Engine</p>
                     </div>
                     <button onClick={handleGenerate} className="px-10 py-5 bg-white text-black font-black rounded-2xl uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3 group">
                        {isGenerating ? <Timer className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />}
                        Plan My Heritage Trip
                     </button>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                     <div className="space-y-3">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Starting Location</label>
                        <div className="relative">
                           <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                           <input 
                             value={location}
                             onChange={(e) => setLocation(e.target.value)}
                             className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase text-white outline-none focus:border-blue-500/50 transition-all shadow-inner" 
                             placeholder="Search City..."
                           />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Days</label>
                        <div className="relative">
                           <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                           <select 
                             value={days}
                             onChange={(e) => setDays(Number(e.target.value))}
                             className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase text-white outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                           >
                              {[1,2,3,4,5,7].map(d => <option key={d} value={d} className="bg-slate-900">{d} Days</option>)}
                           </select>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Interest</label>
                        <div className="relative">
                           <Compass className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                           <select 
                             value={interest}
                             onChange={(e) => setInterest(e.target.value)}
                             className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase text-white outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                           >
                              {["Temples", "Forts", "Museums", "Nature", "Architecture", "Festivals"].map(lvl => <option key={lvl} value={lvl} className="bg-slate-900">{lvl}</option>)}
                           </select>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Budget</label>
                        <div className="relative">
                           <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                           <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase text-white outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer">
                              <option className="bg-slate-900">Standard</option>
                              <option className="bg-slate-900">Premium</option>
                              <option className="bg-slate-900">Sovereign</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Step 3 & UI: Itinerary Result Flow */}
               <div className="flex-1 overflow-y-auto p-10 scrollbar-hide space-y-12">
                  {!itinerary && !isGenerating && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-1000">
                       <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-700">
                          <MapIcon className="w-16 h-16" />
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-2xl font-black text-white uppercase italic tracking-tight">System Idle</h4>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest max-w-[300px] mx-auto leading-relaxed">Enter parameters above to generate 100% verified heritage circuit nodes.</p>
                       </div>
                    </div>
                  )}

                  {isGenerating && (
                    <div className="h-full flex flex-col items-center justify-center space-y-10 animate-pulse">
                       <div className="relative">
                          <div className="w-24 h-24 rounded-full border-4 border-t-blue-500 border-white/10 animate-spin" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <Sparkles className="w-8 h-8 text-blue-500" />
                          </div>
                       </div>
                       <div className="text-center space-y-2">
                          <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em] animate-pulse">Running Spatio-Temporal Algorithm</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Cross-referencing UNESCO integrity scores...</p>
                       </div>
                    </div>
                  )}

                  {itinerary && (
                    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                       {itinerary.map(day => (
                          <div key={day.day} className="space-y-10">
                             <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-500/20 flex flex-col items-center justify-center shadow-2xl">
                                   <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Day</p>
                                   <p className="text-4xl font-black text-white italic tracking-tighter">0{day.day}</p>
                                </div>
                                <div>
                                   <h3 className="text-3xl font-black text-white uppercase italic tracking-tight">Heritage Expansion</h3>
                                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Target Intensity: Balanced Exploration</p>
                                </div>
                             </div>

                             <div className="relative pl-10 border-l border-white/10 space-y-8 ml-10">
                                {day.stops.map((stop, i) => (
                                   <div key={stop.id} className="relative group">
                                      {/* Connector Line Dot */}
                                      <div className="absolute -left-[50px] top-10 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 z-10 group-hover:scale-125 transition-transform" />
                                      
                                      <div className="p-8 rounded-4xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all flex flex-col md:flex-row gap-8 items-start md:items-center">
                                         <div className="w-24 h-24 rounded-2xl bg-slate-800 border border-white/10 flex flex-col items-center justify-center shrink-0 shadow-2xl">
                                            <Clock className="w-5 h-5 text-blue-500 mb-1" />
                                            <p className="text-[10px] font-black text-white tabular-nums">{stop.time}</p>
                                         </div>
                                         <div className="flex-1 space-y-4">
                                            <div className="flex items-center gap-4">
                                               <h5 className="text-xl font-black text-white uppercase tracking-tight italic">{stop.name}</h5>
                                               <span className="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black uppercase text-slate-400 border border-white/5">{stop.type}</span>
                                            </div>
                                            <div className="flex items-center gap-8">
                                               <div className="flex items-center gap-2">
                                                  <Timer className="w-3.5 h-3.5 text-emerald-500" />
                                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration: {stop.duration}</span>
                                               </div>
                                               <div className="flex items-center gap-2">
                                                  <BarChart className="w-3.5 h-3.5 text-orange-500" />
                                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Crowd: {stop.crowd}</span>
                                               </div>
                                            </div>
                                         </div>
                                         <button className="p-6 rounded-3xl bg-white/5 border border-white/10 text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                                            <Plus className="w-6 h-6" />
                                         </button>
                                      </div>

                                      {stop.travelToNext && (
                                        <div className="py-6 flex items-center gap-6 ml-4">
                                           <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                                              <Car className="w-4 h-4 text-slate-600" />
                                           </div>
                                           <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Travel Vector: {stop.travelToNext} · {stop.distance}</p>
                                           <div className="flex-1 h-px bg-white/5" />
                                        </div>
                                      )}
                                   </div>
                                ))}
                             </div>

                             {/* Nearby Add-ons (Bonus Section) */}
                             <div className="ml-2 pt-6 space-y-6">
                                <h5 className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.4em] ml-10 flex items-center gap-3">
                                   <Plus className="w-3.5 h-3.5" /> High-Value Addons (Day {day.day})
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-10">
                                   {[
                                     { name: "Rajarani Temple", type: "ASI Museum", xp: "+450 XP" },
                                     { name: "Udayagiri Caves", type: "Ancient Rock-cut", xp: "+800 XP" }
                                   ].map(add => (
                                     <div key={add.name} className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between group cursor-pointer hover:bg-emerald-500/10 transition-all">
                                        <div>
                                           <p className="text-sm font-black text-white uppercase italic tracking-tight">{add.name}</p>
                                           <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">{add.type}</p>
                                        </div>
                                        <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest group-hover:scale-110 transition-transform">{add.xp}</div>
                                     </div>
                                   ))}
                                </div>
                             </div>
                          </div>
                       ))}

                       {/* Hotels & Guides Section (Smart Enhancements) */}
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-20 border-t border-white/5">
                          {/* Suggested Hotels */}
                          <div className="space-y-8">
                             <div className="flex items-center gap-4">
                                <Hotel className="w-6 h-6 text-blue-500" />
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Stay Logistics</h3>
                             </div>
                             <div className="space-y-4">
                                {SUGGESTED_HOTELS.map(hotel => (
                                   <div key={hotel.name} className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between">
                                      <div className="space-y-1">
                                         <p className="text-base font-black text-white uppercase tracking-tight">{hotel.name}</p>
                                         <div className="flex items-center gap-3">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{hotel.dist} from Sector 1</span>
                                            <div className="flex items-center gap-1 text-amber-500">
                                               <Star className="w-3 h-3 fill-amber-500" />
                                               <span className="text-[9px] font-black">{hotel.rating}</span>
                                            </div>
                                         </div>
                                      </div>
                                      <div className="text-right">
                                         <p className="text-xs font-black text-white uppercase">{hotel.price}</p>
                                         <button className="text-[9px] font-black text-blue-500 uppercase tracking-widest mt-1 hover:underline">Reserve Node</button>
                                      </div>
                                   </div>
                                ))}
                             </div>
                          </div>

                          {/* Suggested Guides */}
                          <div className="space-y-8">
                             <div className="flex items-center gap-4">
                                <Users className="w-6 h-6 text-orange-500" />
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Guide Synchronization</h3>
                             </div>
                             <div className="space-y-4">
                                {SUGGESTED_GUIDES.map(guide => (
                                   <div key={guide.name} className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-6">
                                      <img src={guide.img} className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
                                      <div className="flex-1 space-y-1">
                                         <div className="flex items-center justify-between">
                                            <p className="text-base font-black text-white uppercase tracking-tight">{guide.name}</p>
                                            <div className="flex items-center gap-1 text-amber-500">
                                               <Star className="w-3 h-3 fill-amber-500" />
                                               <span className="text-[9px] font-black">{guide.rating}</span>
                                            </div>
                                         </div>
                                         <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{guide.exp} Experience · {guide.lang}</p>
                                         <button className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-2 flex items-center gap-2 hover:gap-4 transition-all">
                                            Connect via WhatsApp <ArrowRight className="w-3 h-3" />
                                         </button>
                                      </div>
                                   </div>
                                ))}
                             </div>
                          </div>
                       </div>

                       {/* Export / Finalize */}
                       <div className="pt-10 flex items-center justify-between">
                          <p className="text-xs font-medium text-slate-500 italic max-w-sm">"This route has been optimized for minimal carbon footprint and maximum historical preservation awareness."</p>
                          <div className="flex items-center gap-4">
                             <button className="px-8 py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-white hover:bg-white/5 transition-all">Save as Draft</button>
                             <button className="px-10 py-4 bg-emerald-600 text-white font-black rounded-2xl uppercase text-[10px] tracking-widest shadow-2xl hover:bg-emerald-500 transition-all flex items-center gap-3">
                                <ShieldCheck className="w-4 h-4" /> Finalize Circuit
                             </button>
                          </div>
                       </div>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes progress {
          0% { left: -100%; width: 30%; }
          100% { left: 100%; width: 30%; }
        }
      `}</style>
    </main>
  );
}
