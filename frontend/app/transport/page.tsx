"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { TopHeader } from "../../components/TopHeader";
import { Sidebar } from "../../components/Sidebar";
import {
  MapPin, Navigation2, Clock, Star, Zap, Car, Bike, Bus,
  ChevronRight, X, CheckCircle2, Loader2, Send, IndianRupee,
  User, TrendingUp, Phone, Wallet, RefreshCw, Locate, Crosshair,
  Search, Shield, AlertCircle, ArrowDown, Sparkles, Map as MapIcon,
  ChevronDown, MessageSquare, BrainCircuit
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic Map Import to prevent SSR issues
const NeuralRouteMap = dynamic(() => import("../../components/NeuralRouteMap"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center gap-6">
       <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
       <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Initializing Neural Topology...</p>
    </div>
  )
});

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
  const [selectedVehicle, setV] = useState<string>("auto");
  const [bookingState, setBookingState] = useState<"idle" | "searching" | "found" | "booked">("idle");
  const [nearbyDrivers, setNearbyDrivers] = useState<any[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [fare, setFare] = useState(0);
  const [locating, setLocating] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"idle" | "payment" | "scanner">("idle");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookId] = useState(() => `HTX-${Math.floor(Math.random() * 90000 + 10000)}`);

  // Map States
  const [sourceCoords, setSourceCoords] = useState<[number, number]>([20.2961, 85.8245]); // Default Bhubaneswar
  const [destCoords, setDestCoords] = useState<[number, number]>([19.8876, 86.0945]); // Default Konark

  const v = VEHICLE_TYPES.find(x => x.id === selectedVehicle);

  const detectLocation = () => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setSourceCoords([latitude, longitude]);
        setPickup("Current Location (Synced)");
        setLocating(false);
      }, () => {
        setPickup("Bhubaneswar CBD Node");
        setLocating(false);
      });
    } else {
      setTimeout(() => { setPickup("Manual Node Input Required"); setLocating(false); }, 1000);
    }
  };

  const searchVehicles = () => {
    if (!pickup || !drop || !selectedVehicle) return;
    setBookingState("searching");
    setTimeout(() => {
      setFare(v!.min + 40);
      setNearbyDrivers(DRIVERS[selectedVehicle!] || []);
      setBookingState("found");
    }, 2000);
  };

  const confirmBooking = (driver: any) => { setSelectedDriver(driver); setPaymentStep("payment"); };
  const finalizePayment = () => { setIsProcessing(true); setTimeout(() => { setIsProcessing(false); setPaymentStep("idle"); setBookingState("booked"); }, 2000); };
  const reset = () => { setBookingState("idle"); setSelectedDriver(null); setPaymentStep("idle"); };

  return (
    <main className="heritage-page-shell flex h-screen w-full font-sans overflow-hidden bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <div className="header-neural h-20 flex items-center justify-between px-6 z-30 shrink-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
          <TopHeader />
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

          {/* Left Panel: Alpha Fleet Control (Spans 1/3) */}
           <div className="w-full lg:w-[480px] h-full bg-slate-900/90 backdrop-blur-3xl border-r border-white/10 z-20 flex flex-col shadow-2xl animate-in slide-in-from-left duration-700">
              <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-16 scrollbar-hide space-y-16">
                 <header className="flex flex-wrap items-center justify-between gap-8">
                    <div className="flex items-center gap-4 lg:gap-8">
                       <div className="w-16 h-16 rounded-2xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                         <Navigation2 className="w-8 h-8 text-orange-500" />
                       </div>
                       <div>
                         <h2 className="text-[clamp(1.5rem,5vw,2.5rem)] font-black text-white uppercase italic tracking-tight">Fleet Commander</h2>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 border-b border-orange-500/20 pb-2">Multi-Vendor Sync Active</p>
                       </div>
                    </div>
                   <div className="p-1 px-3 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                     <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Neural Link</span>
                   </div>
                </header>

                <div className="space-y-6">
                   <div className="relative space-y-2">
                      <div className="absolute left-[21px] top-10 bottom-10 w-0.5 bg-linear-to-b from-emerald-500 to-rose-500 opacity-20" />
                      <LocationInput
                         value={pickup}
                         onChange={setPickup}
                         onSelect={(name: string) => { setPickup(name); setSourceCoords([20.2961, 85.8245]); }} // Demo Coords
                         onLocate={detectLocation}
                         locating={locating}
                         placeholder="Current Node Location..."
                         dotColor="#10b981"
                      />
                      <LocationInput
                         value={drop}
                         onChange={setDrop}
                         onSelect={(name: string) => { setDrop(name); setDestCoords([19.8876, 86.0945]); }} // Demo Coords
                         placeholder="Designate Target Node..."
                         dotColor="#f43f5e"
                      />
                   </div>

                   {bookingState === "booked" && selectedDriver ? (
                      <div className="p-8 rounded-4xl bg-emerald-500/5 border border-emerald-500/20 space-y-8 animate-in zoom-in duration-500">
                         <div className="flex items-center gap-5">
                            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                            <div>
                               <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Deployment Ready</h3>
                               <p className="text-[10px] text-emerald-500 font-black tracking-widest uppercase">Mission ID: {bookId}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-5 p-6 bg-white/5 rounded-3xl border border-white/10">
                            <img src={selectedDriver.img} className="w-20 h-20 rounded-2xl object-cover border border-white/10" alt="" />
                            <div className="flex-1">
                               <p className="text-lg font-black text-white uppercase tracking-tight">{selectedDriver.name}</p>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{selectedDriver.vehicle} · {selectedDriver.plate}</p>
                            </div>
                            <p className="text-3xl font-black text-emerald-400">₹{fare}</p>
                         </div>
                         <button onClick={reset} className="w-full py-5 bg-white text-black font-black rounded-2xl uppercase text-[11px] tracking-widest hover:bg-blue-600 hover:text-white transition-all">End Mission</button>
                      </div>
                   ) : bookingState === "found" ? (
                      <div className="space-y-4">
                         <div className="flex justify-between items-center mb-4">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available Units nearby</h4>
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{nearbyDrivers.length} Found</span>
                         </div>
                         {nearbyDrivers.map((d, i) => (
                            <button key={i} onClick={() => confirmBooking(d)} className="w-full text-left p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-6 group hover:border-blue-500/50 hover:bg-white/10 transition-all">
                               <img src={d.img} className="w-14 h-14 rounded-2xl border border-white/10" alt="" />
                               <div className="flex-1">
                                  <p className="font-black text-white uppercase text-base tracking-tight">{d.name}</p>
                                  <div className="flex items-center gap-3 mt-1">
                                     <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{d.vehicle}</span>
                                     <div className="w-1 h-1 bg-slate-700 rounded-full" />
                                     <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest">{d.rating} ★</span>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <p className="text-xl font-black text-white">₹{fare}</p>
                                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">ETA: 4 MIN</p>
                               </div>
                            </button>
                         ))}
                         <button onClick={() => setBookingState("idle")} className="w-full py-4 text-slate-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all">Cancel Scan</button>
                      </div>
                   ) : (
                      <>
                         <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                            {VEHICLE_TYPES.map(vt => {
                               const selected = selectedVehicle === vt.id;
                               return (
                                 <button key={vt.id} onClick={() => setV(vt.id)} className={`p-4 lg:p-8 rounded-4xl border transition-all flex flex-col items-center justify-center gap-4 group/v ${selected ? "border-blue-500 bg-blue-600/10 ring-4 ring-blue-500/20" : "bg-white/5 border-white/5 hover:border-white/10"}`}>
                                    <div className={`text-4xl transform transition-transform duration-500 ${selected ? "scale-110" : "group-hover/v:scale-110"}`}>
                                       {vt.emoji}
                                    </div>
                                    <div className="text-center">
                                       <p className="text-[11px] font-black text-white uppercase tracking-tighter">{vt.label}</p>
                                       <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">₹{vt.rate}/KM</p>
                                    </div>
                                 </button>
                               );
                            })}
                         </div>
                        <button onClick={searchVehicles} disabled={!pickup || !drop || !selectedVehicle || bookingState === "searching"} className="group w-full py-6 bg-linear-to-r from-orange-600 to-blue-600 text-white font-black rounded-3xl uppercase text-xs tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-40 shadow-xl overflow-hidden relative">
                           <div className="absolute inset-x-0 bottom-0 top-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                           <div className="flex items-center justify-center gap-3 relative z-10">
                              {bookingState === "searching" ? <Loader2 className="w-6 h-6 animate-spin mx-auto text-white" /> : <><Car className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Sync Fleet Fleet Units</>}
                           </div>
                        </button>
                      </>
                   )}
                </div>

                <div className="pt-10 border-t border-white/5">
                   <h5 className="text-[10px] font-black text-violet-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                      <Sparkles className="w-4 h-4" /> AI Tactical Advisor
                   </h5>
                   <div className="p-6 rounded-3xl bg-violet-600/5 border border-violet-500/20 space-y-4">
                      <div className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-2xl bg-violet-600/20 flex items-center justify-center shrink-0">
                            <BrainCircuit className="w-5 h-5 text-violet-400" />
                         </div>
                         <p className="text-xs text-slate-300 italic leading-relaxed">"Traffic density near {drop || 'Target Node'} is moderate. Opt for a 2-Wheeler for 15% speed optimization."</p>
                      </div>
                      <div className="flex gap-4">
                         <input type="text" placeholder="Query Intelligence..." className="flex-1 bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white outline-none focus:border-violet-500/50" />
                         <button className="w-10 h-10 bg-violet-600 text-white rounded-xl flex items-center justify-center hover:bg-violet-500 transition-all">
                            <Send className="w-4 h-4" />
                         </button>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Panel: Topological Command Map */}
          <div className="flex-1 h-full relative z-10 bg-slate-950">
             <NeuralRouteMap 
                source={{ lat: sourceCoords[0], lng: sourceCoords[1] }}
                destination={{ lat: destCoords[0], lng: destCoords[1] }}
                onUpdateSource={(coords) => setSourceCoords([coords.lat, coords.lng])}
                onUpdateDestination={(coords) => setDestCoords([coords.lat, coords.lng])}
                onClose={() => {}} 
                inline={true}
             />
             
             {/* Map Overlay: Live Stats */}
             <div className="absolute top-10 right-10 z-30 space-y-4 pointer-events-none">
                <div className="p-8 rounded-[2.5rem] bg-slate-900/80 backdrop-blur-3xl border border-white/10 shadow-2xl flex items-center gap-8 animate-in slide-in-from-right duration-700">
                   <div className="flex items-center gap-6 pr-8 border-r border-white/10">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Optimal Node</p>
                        <p className="text-xl font-black text-white uppercase italic">Active</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <IndianRupee className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Fleet Yield</p>
                        <p className="text-xl font-black text-white uppercase italic">₹{fare || '0'}</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Map Controls: Bottom Layer */}
             <div className="absolute bottom-10 left-10 right-10 z-30 flex items-center justify-between pointer-events-none">
                <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-3xl border border-white/10 shadow-2xl pointer-events-auto animate-in slide-in-from-bottom duration-700">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Tactical Insights</p>
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                      {[
                        { label: "Transit Time", val: "24 MIN", color: "text-blue-400" },
                        { label: "Corridor Risk", val: "LOW", color: "text-emerald-400" },
                        { label: "Energy Cost", val: "₹12/KM", color: "text-amber-400" },
                        { label: "Sync Units", val: "128 LIVE", color: "text-violet-400" },
                      ].map(stat => (
                        <div key={stat.label} className="space-y-1">
                           <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{stat.label}</p>
                           <p className={`text-sm font-black uppercase ${stat.color}`}>{stat.val}</p>
                        </div>
                      ))}
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
