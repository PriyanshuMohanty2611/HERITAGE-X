"use client";

import { useState, useEffect, useMemo, memo, useRef } from "react";
import {
  Globe, BrainCircuit, Activity, Search, Send,
  Loader2, TrendingUp, Shield, Zap, Eye, Clock, AlertTriangle,
  CheckCircle2, Wifi, RefreshCw, ChevronRight, MapPin, Star,
  ArrowRight, User, Users, Calendar, Thermometer, Droplets,
  Wind, ZapOff, Plane, Ticket, ScanSearch, Sun, Move, CloudFog, Compass
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { TopHeader } from "../components/TopHeader";
import Link from "next/link";

// ─── Utility: Static Counter ────────────────────────────────────
function StaticCounter({ value, suffix = "" }: { value: number, suffix?: string }) {
  return <span>{value.toLocaleString()}{suffix}</span>;
}

// ─── Component: Live Stat Card ───────────────────────────────────
const StatCard = memo(({ icon: Icon, label, value, trend, color, suffix, isPrimary }: any) => {
  return (
    <div className={`group relative p-8 rounded-[2.5rem] transition-all duration-300 overflow-hidden ${
      isPrimary 
      ? 'bg-blue-600 shadow-xl' 
      : 'bg-transparent border border-slate-100 shadow-lg'
    }`}>
      <div className="flex flex-col justify-between h-full space-y-4 relative z-10">
        <div className="flex justify-between items-start">
          <p className={`text-[10px] font-black uppercase tracking-widest ${isPrimary ? 'text-blue-100' : 'text-slate-400'}`}>
            {label}
          </p>
          <div className={`p-2 rounded-lg ${isPrimary ? 'bg-white/10' : 'bg-blue-50'}`}>
            <Icon className={`w-4 h-4 ${isPrimary ? 'text-white' : 'text-blue-600'}`} />
          </div>
        </div>
        <div>
          <h3 className={`text-5xl font-black leading-none tracking-tighter italic ${isPrimary ? 'text-white' : 'text-slate-950'}`}>
            <StaticCounter value={value} suffix={suffix} />
          </h3>
          <div className={`inline-flex items-center gap-1.5 mt-3 text-[10px] font-bold ${
            trend.startsWith('+') 
            ? (isPrimary ? 'text-blue-100' : 'text-emerald-600') 
            : (isPrimary ? 'text-blue-200' : 'text-red-500')
          }`}>
            {trend.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
            {trend} phase shift
          </div>
        </div>
      </div>
    </div>
  );
});

StatCard.displayName = "StatCard";

// ─── Component: IoT Neural Grid (Static Fix) ─────────────────────
function IoTNeuralGridStatic() {
  const sensorData = [
    { name: "Pollution Grid", purpose: "Air Toxicity (CO/NO2) near Konark Ruins", value: "42 AQI", limit: "<50 AQI", icon: Wind },
    { name: "Carbon Matrix", purpose: "Tectonic Impact on Sun Temple Foundation", value: "412 PPM", limit: "<450 PPM", icon: CloudFog },
    { name: "Structural Pulse", purpose: "Real-time Vibration (ADXL) Analysis", value: "0.002g", limit: "<0.01g", icon: Activity },
    { name: "Neural Pitch", purpose: "Angular Balance & Structural Orientation", value: "0.01°", limit: "<0.1°", icon: Compass },
    { name: "Thermal Matrix", purpose: "Surface Temp Variation (Taj Marble)", value: "28.4°C", limit: "<35°C", icon: Thermometer },
    { name: "UV Exposure", purpose: "Solar Decay Tracker (Konark Sculptures)", value: "2 Index", limit: "<4 Index", icon: Sun }
  ];

  return (
    <div className="bg-transparent border border-slate-100 p-8 rounded-[2.5rem] shadow-lg h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-400">
            IOT NEURAL GRID
          </h2>
          <p className="text-[11px] font-black text-blue-600 uppercase tracking-tight mt-1">
            STATISTIC INTELLIGENCE MATRIX
          </p>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl">
          <Wifi size={16} strokeWidth={3} />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-slate-100">
            <tr>
              {["Node", "Sensor Name / Purpose", "Reading", "Threshold"].map(header => (
                <th key={header} className="text-[9px] font-black uppercase tracking-widest text-slate-500 p-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="space-y-4 before:content-[''] before:block before:h-4">
            {sensorData.map((sensor, i) => (
              <tr key={i} className="group transition-all duration-300">
                <td colSpan={4} className="p-0">
                  <div className="flex items-center bg-transparent border border-slate-100 p-4 rounded-2xl shadow-sm group-hover:shadow-md group-hover:translate-x-1 transition-all mb-3 mx-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white shadow-sm transition-all shrink-0">
                      <sensor.icon size={18} strokeWidth={2.5} />
                    </div>
                    
                    <div className="flex-1 ml-6">
                      <p className="text-xs font-black text-slate-950 uppercase italic tracking-tighter">{sensor.name}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">{sensor.purpose}</p>
                    </div>

                    <div className="px-6 text-center">
                      <p className="text-xs font-black text-slate-900">{sensor.value}</p>
                      <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-0.5">Reading</p>
                    </div>

                    <div className="px-6 text-right">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest whitespace-nowrap">{sensor.limit}</p>
                      <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-0.5">Threshold</p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Component: Health Monitoring ────────────────────────────────
function HeritageHealthMonitor() {
  const sites = [
    { name: "Konark Node", health: 94, status: "Stabilized", color: "#2563eb", img: "/assets/KONARK/download.jpg" },
    { name: "Ajanta Core", health: 82, status: "Critical RH", color: "#ef4444", img: "/assets/Ajanta Caves/download.jpg" },
    { name: "Hampi Grid", health: 91, status: "Optimized", color: "#3b82f6", img: "/assets/Hampi Ruins/download.jpg" },
    { name: "Taj Matrix", health: 88, status: "Air Shield Active", color: "#0ea5e9", img: "/assets/Taj Mahal/download.jpg" }
  ];

  return (
    <div className="bg-transparent border border-slate-100 p-8 rounded-[2.5rem] shadow-sm h-full flex flex-col transition-all">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tight">Health Integrity</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Real-time Structural Health</p>
        </div>
        <button className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-500/50 transition-all">
          <RefreshCw className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {sites.map(site => (
          <div key={site.name} className="p-6 rounded-4xl bg-transparent border border-slate-200 flex flex-col gap-6 group hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-500 shadow-xl relative overflow-hidden">
             
             {/* Gradient Accent */}
             <div className="absolute top-0 left-0 w-full h-1" style={{ background: site.color }} />

             <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md duration-500 ring-4 ring-slate-50">
                  <img src={site.img} alt={site.name} className="w-full h-full object-cover" />
                </div>
                <div 
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.1)]" 
                  style={{ background: site.color }}
                />
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-[12px] font-black text-slate-950 uppercase italic tracking-tight truncate">{site.name}</p>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">{site.status}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-slate-950 italic">{site.health}%</span>
              </div>
             </div>

             <div className="space-y-2">
               <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Structural Integrity</span>
                  <span>Target: 100%</span>
               </div>
               <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${site.health}%`, background: site.color }}
                  />
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ─────────────────────────────────────────
export default function CommandCenter() {
  const [visitorSeed, setVisitorSeed] = useState(0);
  const [signal, setSignal] = useState(99.98);

  const bgImages = [
    "/assets/KONARK/download.jpg",
    "/assets/Taj Mahal/sunrise-at-taj-mahal--agra--uttar-pradash--india-583682538-5b91840bc9e77c0050bdc67b.jpg",
    "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg",
    "/assets/Ajanta Caves/ajanta-caves-5-to-8-3071.jpg"
  ];

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/stats/user-count");
        const data = await res.json();
        setVisitorSeed(data.count || 0);
      } catch (e) {
        console.error("Failed to fetch user count", e);
      }
    };
    fetchUserCount();
  }, []);

  return (
    <main className="heritage-page-shell flex h-screen w-screen font-sans overflow-hidden relative bg-transparent text-slate-950">
      
      {/* Background Decor Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src={bgImages[0]} 
          className="absolute top-[5%] right-[-5%] w-[50%] lg:w-[40%] h-auto opacity-[0.03] grayscale blur-[20px] rotate-[-5deg]"
          alt="Background Decor"
        />
        <img 
          src={bgImages[2]} 
          className="absolute bottom-[5%] left-[-5%] w-[50%] lg:w-[40%] h-auto opacity-[0.03] grayscale blur-[20px] rotate-[5deg]"
          alt="Background Decor"
        />
      </div>
      
      <Sidebar />

      <div className="flex-1 flex flex-col h-full min-w-0 relative z-10 overflow-hidden neural-content-shell">
        <div className="header-neural h-20 flex items-center justify-between px-6 z-20 shrink-0 border-b border-slate-50">
          <TopHeader />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide p-6 lg:p-10 xl:p-14">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* ROW 1: Header & Stability Control */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter text-slate-950 mb-2 leading-none">Command <span className="text-blue-600">Centre</span></h1>
              <p className="text-xs font-black text-blue-600 uppercase tracking-[0.4em] flex items-center gap-2">
                Sovereign Intelligence Dashboard <span className="text-slate-400 font-bold ml-2">v1.2.0-SECURE</span>
              </p>
            </div>
            <div className="flex items-center justify-end gap-6 shrink-0">
              <div className="px-6 py-4 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-end shadow-sm">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">System Signal</span>
                <span className="text-sm font-mono font-black text-blue-600">{signal.toFixed(2)}% LIVE</span>
              </div>
              <button className="h-16 px-8 rounded-2xl bg-blue-600 text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl active:scale-95"> 
                Neural Scan 
              </button>
            </div>

            {/* Metrics Cluster */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-load">
              <StatCard isPrimary icon={Users} label="Total Visitors" value={visitorSeed || 12480} trend="+12.4%" color="#3b82f6" suffix="" />
              <Link href="/sensors" className="block h-full">
                <StatCard icon={Wifi} label="Active Sensors" value={124} trend="+2.1%" color="#2563eb" suffix="" />
              </Link>
              <StatCard icon={MapPin} label="Heritage Nodes" value={32} trend="+1.0%" color="#3b82f6" suffix="" />
              <StatCard icon={ScanSearch} label="AI Detections" value={433} trend="+8.5%" color="#3b82f6" suffix="" />
            </div>

            {/* ROW 2: Health Integrity & IoT Matrix */}
            <div className="h-full">
              <HeritageHealthMonitor />
            </div>
            <div className="h-full">
              <IoTNeuralGridStatic />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
