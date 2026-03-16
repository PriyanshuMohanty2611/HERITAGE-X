"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { TopHeader } from "../../components/TopHeader";
import { Sidebar } from "../../components/Sidebar";
import {
  MapPin, Navigation2, Clock, Star, Zap, Car, Bike, Bus,
  ChevronRight, X, CheckCircle2, Loader2, Send, IndianRupee,
  User, TrendingUp, Phone, Wallet, RefreshCw, Locate, Crosshair,
  Search, Shield, AlertCircle, ArrowDown, Sparkles
} from "lucide-react";

// ─── Heritage Destinations ────────────────────────────────────────────────────
const HERITAGE_PLACES = [
  { name: "Konark Sun Temple", state: "Odisha",       img: "/assets/KONARK/konark_hero.png" },
  { name: "Jagannath Temple",  state: "Odisha",       img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=200" },
  { name: "Puri Beach",        state: "Odisha",       img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=200" },
  { name: "Taj Mahal",         state: "Agra, UP",     img: "https://images.unsplash.com/photo-1564507592333-c60657451dd6?auto=format&fit=crop&q=80&w=200" },
  { name: "Red Fort",          state: "Delhi",        img: "/assets/Red Fort/red_fort.png" },
  { name: "Hampi Ruins",       state: "Karnataka",    img: "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg" },
  { name: "Meenakshi Temple",  state: "Tamil Nadu",   img: "/assets/Meenakshi Temple/meenakshi-amman-temple-india.avif" },
  { name: "Ajanta Caves",      state: "Maharashtra",  img: "/assets/Ajanta Caves/ajanta-caves-5-to-8-3071.jpg" },
  { name: "Ellora Caves",      state: "Maharashtra",  img: "/assets/Ellora Caves/gettyimages-481998527-1024x1024.jpg" },
  { name: "Khajuraho Temples", state: "MP",           img: "/assets/Khajuraho Temples/khajuraho-fi.webp" },
  { name: "Varanasi Ghats",    state: "UP",           img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=200" },
  { name: "Amer Fort",         state: "Rajasthan",    img: "/assets/Amer Fort/amer_fort.png" },
  { name: "Sanchi Stupa",      state: "MP",           img: "/assets/Sanchi Stupa/sanchi-great-stupa.jpg" },
];

// ─── Vehicle Types ────────────────────────────────────────────────────────────
const VEHICLE_TYPES = [
  { id: "auto",    label: "Auto",      color: "#f97316", rate: 12, min: 30,  emoji: "🛺", provider: "Rapido",        baseEta: 4  },
  { id: "bike",    label: "Bike Ride", color: "#0ea5e9", rate: 8,  min: 25,  emoji: "🏍️", provider: "Rapido",        baseEta: 3  },
  { id: "cab",     label: "Mini Cab",  color: "#7c3aed", rate: 18, min: 50,  emoji: "🚖", provider: "Ola",           baseEta: 8  },
  { id: "premium", label: "Ola Prime", color: "#a855f7", rate: 28, min: 80,  emoji: "🚗", provider: "Ola Prime",     baseEta: 10 },
  { id: "share",   label: "Share Cab", color: "#10b981", rate: 6,  min: 20,  emoji: "🚐", provider: "Rapido Share",  baseEta: 12 },
  { id: "bus",     label: "City Bus",  color: "#f59e0b", rate: 2,  min: 10,  emoji: "🚌", provider: "KSRTC/OSRTC",  baseEta: 25 },
];

// ─── Drivers ──────────────────────────────────────────────────────────────────
const DRIVERS: Record<string, any[]> = {
  auto:    [{ name: "Raju Kumar",    rating: 4.8, km: 0.4, plate: "OD 01 B 3421", vehicle: "Bajaj RE Auto",   trips: 1240, img: "https://i.pravatar.cc/100?img=3" }],
  bike:    [{ name: "Vikram Singh",  rating: 4.9, km: 0.2, plate: "KA 01 M 9812", vehicle: "Honda Activa",    trips: 2100, img: "https://i.pravatar.cc/100?img=5" }],
  cab:     [{ name: "Deepak Yadav",  rating: 4.7, km: 0.6, plate: "DL 3C AB 1234", vehicle: "Maruti Dzire",   trips: 3400, img: "https://i.pravatar.cc/100?img=8" }],
  premium: [{ name: "Prashant Roy",  rating: 4.9, km: 1.0, plate: "MH 01 Z 9001", vehicle: "Honda City",      trips: 1600, img: "https://i.pravatar.cc/100?img=15" }],
  share:   [{ name: "Karan Sharma",  rating: 4.5, km: 0.3, plate: "KA 05 P 8871", vehicle: "Maruti Ertiga",   trips: 980,  img: "https://i.pravatar.cc/100?img=20" }],
  bus:     [{ name: "OSRTC Bus #42", rating: 4.2, km: 0.1, plate: "OD BUS 0042",  vehicle: "Ashok Leyland",   trips: 0,    img: "" }],
};

// ─── Cost Model ───────────────────────────────────────────────────────────────
const COST_MODEL: Record<string, any> = {
  konark:        { hotel: 1800, food: 450,  vehicle: 300, entry: 40,   stay: "Heritage Residency" },
  taj_mahal:     { hotel: 8500, food: 900,  vehicle: 500, entry: 1100, stay: "Oberoi Amarvilas" },
  hampi:         { hotel: 2500, food: 400,  vehicle: 350, entry: 40,   stay: "Evolve Back Hampi" },
};

function getBudget(q: string, days: number) {
  const lower = q.toLowerCase();
  const key = Object.keys(COST_MODEL).find(k => lower.includes(k.replace("_", " ")));
  const d = key ? COST_MODEL[key] : { hotel: 2500, food: 500, vehicle: 350, entry: 50, stay: "Heritage Hotel" };
  return { ...d, days, total: (d.hotel + d.food + d.vehicle) * days + d.entry };
}

// ─── Location Input Helper ────────────────────────────────────────────────────
function LocationInput({ value, onChange, placeholder, dotColor, onSelect, onLocate, locating }: any) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = value.length > 0 
    ? HERITAGE_PLACES.filter(p => p.name.toLowerCase().includes(value.toLowerCase())).slice(0, 5)
    : HERITAGE_PLACES.slice(0, 5);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative group/loc">
      <div className="flex items-center gap-4 bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-5 focus-within:border-blue-500/50 focus-within:bg-slate-900 transition-all shadow-inner">
        <div className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ background: dotColor }} />
        <input
          type="text"
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-xs font-bold w-full text-white placeholder-slate-500 uppercase tracking-widest"
        />
        {onLocate && (
          <button 
            onClick={onLocate} 
            disabled={locating}
            className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-emerald-400 transition-all group/btn"
          >
            {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crosshair className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />}
          </button>
        )}
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden z-100 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-[8px] font-black text-slate-500 px-5 py-3 border-b border-white/5 tracking-[0.2em] uppercase">Suggestions</p>
          {filtered.map((p, i) => (
            <button key={i} onClick={() => { onSelect(p.name); onChange(p.name); setOpen(false); }} className="w-full flex items-center justify-between px-5 py-4 hover:bg-blue-600/10 transition-all text-left group">
               <div className="flex items-center gap-4">
                  <MapPin className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white uppercase tracking-tight">{p.name}</span>
               </div>
               <span className="text-[8px] font-black text-slate-600 uppercase italic">{p.state}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Budget Planner Component ──────────────────────────────────────────────────
function BudgetPlanner() {
  const [dest, setDest] = useState("");
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState<any>(null);
  const [chatQ, setChatQ] = useState("");
  const [chatMsgs, setChatMsgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const calcBudget = () => { if (dest) setBudget(getBudget(dest, days)); };
  
  return (
    <div className="h-full flex flex-col gap-8 p-10 bg-slate-900/50">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
               <IndianRupee className="w-7 h-7 text-amber-500" />
            </div>
            <div>
               <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Financial Matrix</h2>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">AI-Engineered Forecast</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-12 gap-6 bg-white/5 border border-white/10 p-8 rounded-4xl">
         <div className="col-span-12 lg:col-span-8">
            <input 
              type="text" 
              value={dest} 
              onChange={e => setDest(e.target.value)} 
              placeholder="Search Destination Node..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-blue-500"
            />
         </div>
         <div className="col-span-6 lg:col-span-2">
            <select value={days} onChange={e => setDays(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none font-black uppercase tracking-widest">
               {[1,2,3,4,5,7,10].map(d => <option key={d} value={d} className="bg-slate-900">{d}D</option>)}
            </select>
         </div>
         <div className="col-span-6 lg:col-span-2">
            <button onClick={calcBudget} className="w-full h-full bg-amber-500 text-black font-black rounded-2xl uppercase text-[10px] tracking-widest hover:bg-amber-400 transition-all shadow-lg active:scale-95">Phase Sync</button>
         </div>
      </div>

      {budget && (
        <div className="grid grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           {[
             { l: "Hotel Matrix", v: `₹${(budget.hotel * days).toLocaleString()}`, c: "text-blue-400" },
             { l: "Energy Units", v: `₹${(budget.food * days).toLocaleString()}`, c: "text-emerald-400" },
             { l: "Mobility",     v: `₹${(budget.vehicle * days).toLocaleString()}`, c: "text-orange-400" },
             { l: "Access",       v: `₹${budget.entry.toLocaleString()}`, c: "text-rose-400" },
           ].map(s => (
             <div key={s.l} className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-2">
                <p className={`text-2xl font-black ${s.c}`}>{s.v}</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{s.l}</p>
             </div>
           ))}
           <div className="col-span-4 p-8 rounded-3xl bg-blue-600 border border-blue-400/50 flex items-center justify-between shadow-2xl">
              <div>
                 <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1">Total Forecasted Capital</p>
                 <p className="text-sm font-bold text-white/80 italic">{budget.stay} Connection</p>
              </div>
              <p className="text-4xl font-black text-white">₹{budget.total.toLocaleString()}</p>
           </div>
        </div>
      )}

      <div className="flex-1 bg-white/5 border border-white/10 rounded-4xl p-8 flex flex-col gap-6 overflow-hidden">
         <div className="flex items-center gap-3 opacity-60">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">AI Consultation Active</span>
         </div>
         <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
            <TrendingUp className="w-12 h-12 mb-4" />
            <p className="text-sm font-bold uppercase tracking-widest">Connect with Heritage AI for <br/>Strategic Planning</p>
         </div>
         <div className="flex gap-4">
            <input type="text" placeholder="Prompt AI Intelligence..." className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none" />
            <button className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
               <Send className="w-5 h-5" />
            </button>
         </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TransportPage() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [selectedVehicle, setV] = useState<string | null>(null);
  const [bookingState, setBookingState] = useState<"idle" | "searching" | "found" | "booked">("idle");
  const [nearbyDrivers, setNearbyDrivers] = useState<any[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [distance, setDistance] = useState(0);
  const [eta, setEta] = useState(0);
  const [fare, setFare] = useState(0);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState("");
  const [bookId] = useState(() => `HTX-${Math.floor(Math.random() * 90000 + 10000)}`);
  const [paymentStep, setPaymentStep] = useState<"idle" | "payment" | "scanner">("idle");
  const [isProcessing, setIsProcessing] = useState(false);

  const v = VEHICLE_TYPES.find(x => x.id === selectedVehicle);

  const detectLocation = () => {
    setLocating(true);
    setTimeout(() => {
      setPickup("PRE SENT LOCATION");
      setLocating(false);
    }, 1500);
  };

  const searchVehicles = () => {
    if (!pickup || !drop || !selectedVehicle) return;
    setBookingState("searching");
    setTimeout(() => {
      setDistance(4.2);
      setFare(v!.min + 40);
      setEta(v!.baseEta + 2);
      setNearbyDrivers(DRIVERS[selectedVehicle!] || []);
      setBookingState("found");
    }, 2000);
  };

  const confirmBooking = (driver: any) => { setSelectedDriver(driver); setPaymentStep("payment"); };
  const finalizePayment = () => { setIsProcessing(true); setTimeout(() => { setIsProcessing(false); setPaymentStep("idle"); setBookingState("booked"); }, 2000); };
  const reset = () => { setBookingState("idle"); setSelectedDriver(null); setPaymentStep("idle"); };

  return (
    <main className="heritage-page-shell flex h-dvh w-screen font-sans overflow-hidden bg-slate-950 text-white relative">
      <div className="absolute inset-x-0 top-0 h-[500px] z-0 opacity-40 bg-linear-to-b from-blue-600/20 to-transparent pointer-events-none" />
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <TopHeader />
        
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide">
          <div className="max-w-[1600px] mx-auto space-y-10">
            <div className="grid grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Booking Terminal (Spans 4/12) */}
              <div className="col-span-12 xl:col-span-4 flex flex-col gap-10">
                <div className="p-10 rounded-4xl bg-slate-900 border border-white/5 shadow-2xl space-y-10">
                   <header className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center">
                          <Navigation2 className="w-7 h-7 text-orange-500" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Mobility Hub</h2>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Multi-Vendor Sync Active</p>
                        </div>
                      </div>
                      <div className="px-4 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter animate-pulse">Live</span>
                      </div>
                   </header>

                   {/* States Logic */}
                   {bookingState === "booked" && selectedDriver ? (
                     <div className="space-y-8 animate-in zoom-in duration-500">
                        <div className="p-8 rounded-4xl bg-emerald-500/5 border border-emerald-500/20">
                           <div className="flex items-center gap-5 mb-8">
                              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                              <div>
                                 <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Deployment Ready</h3>
                                 <p className="text-[10px] text-emerald-500 font-black tracking-widest uppercase">ID: {bookId}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-5 p-6 bg-white/5 rounded-3xl border border-white/10 mb-8">
                              <img src={selectedDriver.img} className="w-20 h-20 rounded-2xl object-cover border border-white/10" alt="" />
                              <div className="flex-1">
                                 <p className="text-lg font-black text-white uppercase tracking-tight">{selectedDriver.name}</p>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{selectedDriver.vehicle} · {selectedDriver.plate}</p>
                              </div>
                              <p className="text-3xl font-black text-emerald-400">₹{fare}</p>
                           </div>
                           <button onClick={reset} className="w-full py-5 bg-white text-black font-black rounded-2xl uppercase text-[11px] tracking-widest hover:bg-blue-600 hover:text-white transition-all">Phase Completion</button>
                        </div>
                     </div>
                   ) : bookingState === "found" ? (
                      <div className="space-y-6">
                         {nearbyDrivers.map((d, i) => (
                            <div key={i} className="p-8 shadow-inner rounded-3xl bg-white/5 border border-white/5 flex items-center gap-6 group hover:border-blue-500/50 transition-all">
                               <img src={d.img} className="w-16 h-16 rounded-2xl" alt="" />
                               <div className="flex-1">
                                  <p className="font-black text-white uppercase text-base tracking-tight">{d.name}</p>
                                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{d.vehicle} · {d.plate}</p>
                               </div>
                               <button onClick={() => confirmBooking(d)} className="px-8 py-4 bg-white text-black hover:bg-blue-600 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Engage</button>
                            </div>
                         ))}
                      </div>
                   ) : (
                      <div className="space-y-10">
                         <div className="space-y-6">
                            <LocationInput 
                               value={pickup} 
                               onChange={setPickup} 
                               onSelect={setPickup} 
                               onLocate={detectLocation}
                               locating={locating}
                               placeholder="Establish Origin Node..." 
                               dotColor="#10b981" 
                            />
                            <LocationInput 
                               value={drop} 
                               onChange={setDrop} 
                               onSelect={setDrop} 
                               placeholder="Designate Target..." 
                               dotColor="#f43f5e" 
                            />
                         </div>
                         <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {VEHICLE_TYPES.map(vt => {
                               const selected = selectedVehicle === vt.id;
                               return (
                                 <button key={vt.id} onClick={() => setV(vt.id)} className={`p-8 rounded-[2.5rem] border transition-all flex flex-col items-center justify-center gap-4 group/v ${selected ? "border-blue-500 bg-blue-600/10 ring-8 ring-blue-500/10" : "bg-white/5 border-white/5 hover:border-white/10"}`}>
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-4xl transform transition-transform duration-500 ${selected ? "scale-110" : "group-hover/v:scale-110"}`}>
                                       {vt.emoji}
                                    </div>
                                    <span className="text-[10px] font-black text-white uppercase tracking-tighter text-center">{vt.label}</span>
                                 </button>
                               );
                            })}
                         </div>
                         <button onClick={searchVehicles} disabled={!pickup || !drop || !selectedVehicle || bookingState === "searching"} className="group w-full py-6 bg-linear-to-r from-orange-600 to-blue-600 text-white font-black rounded-3xl uppercase text-xs tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-40 shadow-xl overflow-hidden relative">
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <div className="flex items-center justify-center gap-3 relative z-10">
                               {bookingState === "searching" ? <Loader2 className="w-6 h-6 animate-spin mx-auto text-white" /> : <><Zap className="w-5 h-5 animate-pulse" /> Initialize Deployment</>}
                            </div>
                         </button>
                      </div>
                   )}
                </div>
              </div>

              {/* Right Column: Insights & Budget (Spans 8/12) */}
              <div className="col-span-12 xl:col-span-8 flex flex-col gap-10">
                 <div className="grid grid-cols-2 gap-10">
                    <div className="p-10 rounded-4xl bg-slate-900 border border-white/5 shadow-2xl space-y-10">
                       <header className="flex items-center gap-5">
                          <IndianRupee className="w-8 h-8 text-amber-500" />
                          <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Market Analytics</h3>
                       </header>
                       <div className="grid grid-cols-2 gap-6">
                          {[
                            { l: "HOUSING", v: "₹2,500+", c: "text-blue-400" },
                            { l: "ENERGY", v: "₹450", c: "text-emerald-400" },
                          ].map(s => (
                            <div key={s.l} className="p-8 rounded-3xl bg-white/5 border border-white/10">
                               <p className={`text-3xl font-black ${s.c}`}>{s.v}</p>
                               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">{s.l}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="p-10 rounded-4xl bg-slate-900 border border-white/5 shadow-2xl space-y-10">
                       <header className="flex items-center gap-5">
                          <TrendingUp className="w-8 h-8 text-blue-500" />
                          <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Live Intelligence</h3>
                       </header>
                       <div className="space-y-5">
                          {["CONGESTION NEAR KONARK NODE", "NEW GREEN CORRIDOR ACTIVE"].map((t, i) => (
                             <div key={i} className="flex items-center gap-5 p-5 bg-white/5 rounded-2xl border border-white/5">
                                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
                                <p className="text-[11px] font-bold text-slate-200 uppercase tracking-widest">{t}</p>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
                 <div className="flex-1 rounded-4xl bg-slate-900 border border-white/5 shadow-2xl overflow-hidden min-h-[700px]">
                    <BudgetPlanner />
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Modal Layer */}
        {paymentStep !== "idle" && (
          <div className="fixed inset-0 z-500 flex items-center justify-center p-8 backdrop-blur-3xl bg-black/80 animate-in fade-in duration-500">
             <div className="w-full max-w-xl rounded-4xl shadow-2xl overflow-hidden flex flex-col bg-slate-900 border border-orange-500/50">
                <div className="p-10 border-b border-white/10 flex items-center justify-between">
                   <div className="flex items-center gap-5">
                      <Shield className="w-8 h-8 text-orange-500" />
                      <h3 className="text-xl font-black text-white uppercase tracking-widest">TLS Secure Payment</h3>
                   </div>
                   <button onClick={() => setPaymentStep("idle")} className="p-2 text-slate-500 hover:text-white transition-all"><X className="w-8 h-8" /></button>
                </div>
                <div className="p-14 text-center">
                   {paymentStep === "payment" ? (
                      <div className="space-y-4">
                         {["UPI Matrix Connect", "Card Terminal Alpha"].map(m => (
                            <button key={m} onClick={() => setPaymentStep("scanner")} className="w-full p-8 rounded-3xl border border-white/10 hover:border-orange-500/50 text-white font-black uppercase text-xs tracking-widest transition-all">{m}</button>
                         ))}
                      </div>
                   ) : (
                      <div className="flex flex-col items-center gap-10">
                         <div className="p-6 bg-white rounded-4xl border-8 border-orange-500 shadow-2xl">
                            <img src="/scanner.jpg" className="w-56 h-56 object-cover rounded-2xl" alt="QR" />
                         </div>
                         <button onClick={finalizePayment} disabled={isProcessing} className="w-full py-6 bg-orange-500 text-black font-black rounded-3xl uppercase text-xs tracking-widest shadow-lg">
                            {isProcessing ? <Loader2 className="w-8 h-8 animate-spin mx-auto text-black" /> : "Authorize Phase Completion"}
                         </button>
                      </div>
                   ) }
                </div>
             </div>
          </div>
        )}
      </div>
    </main>
  );
}
