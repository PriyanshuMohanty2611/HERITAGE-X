"use client";

import { useState, useEffect, useMemo, memo, useRef } from "react";
import {
  Globe, BrainCircuit, Activity, Search, Send,
  Loader2, TrendingUp, Shield, Zap, Eye, Clock, AlertTriangle,
  CheckCircle2, Wifi, RefreshCw, ChevronRight, MapPin, Star,
  ArrowRight, User, Users, Calendar, Thermometer, Droplets,
  Wind, ZapOff, Plane
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { TopHeader } from "../components/TopHeader";

// ─── Utility: Animated Counter ───────────────────────────────────
function AnimatedCounter({ value, duration = 2000, suffix = "" }: { value: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    let start = prevValue.current;
    const end = value;
    const range = end - start;
    let startTime: number | null = null;

    if (range === 0) return;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * range + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
    prevValue.current = value;
  }, [value, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

// ─── Component: Live Stat Card ───────────────────────────────────
const StatCard = memo(({ icon: Icon, label, value, trend, color, suffix }: any) => (
  <div className="group relative bg-[#0a1120] border border-white/5 rounded-[2rem] p-6 overflow-hidden transition-all hover:border-blue-500/50 hover:bg-slate-900/40">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon className="w-24 h-24" />
    </div>
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center`} style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest flex items-center gap-1.5 ${trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
        <TrendingUp className="w-3 h-3" /> {trend}
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-3xl font-black text-white leading-none mb-1">
        <AnimatedCounter value={value} suffix={suffix} />
      </h3>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{label}</p>
    </div>
  </div>
));

StatCard.displayName = "StatCard";

// ─── Component: IoT Sensor Hub ──────────────────────────────────
function IoTSensorHub() {
  const sensors = [
    { label: "Humidity", val: 64, icon: Droplets, color: "#3b82f6", unit: "%" },
    { label: "Pollution", val: 42, icon: Wind, color: "#f59e0b", unit: " AQI" },
    { label: "Vibration", val: 0.2, icon: Activity, color: "#ef4444", unit: " mm/s" },
    { label: "Luminosity", val: 850, icon: Zap, color: "#a855f7", unit: " Lux" }
  ];

  return (
    <div className="card p-8 bg-[#0a1120] border border-white/5 rounded-[2.5rem] h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-white uppercase italic tracking-tight">IoT Neural Grid</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Live Sensor Synchrony</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <Wifi className="w-5 h-5 text-blue-500 animate-pulse" />
        </div>
      </div>
      <div className="space-y-6">
        {sensors.map(s => (
          <div key={s.label} className="space-y-2 group">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-3">
                <s.icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300">{s.label}</span>
              </div>
              <span className="text-xs font-mono font-bold text-white tracking-widest">{s.val}{s.unit}</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(100, (s.val / 1000) * 100 || s.val)}%`, background: s.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Component: Health Monitoring ────────────────────────────────
function HeritageHealthMonitor() {
  const sites = [
    { name: "Konark Node", health: 94, status: "Stabilized", color: "#10b981" },
    { name: "Ajanta Core", health: 82, status: "Critical RH", color: "#ef4444" },
    { name: "Hampi Grid", health: 91, status: "Optimized", color: "#3b82f6" },
    { name: "Taj Matrix", health: 88, status: "Air Shield Active", color: "#f59e0b" }
  ];

  return (
    <div className="card p-8 bg-[#0a1120] border border-white/5 rounded-[2.5rem] h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Health Integrity</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Real-time Structural Health</p>
        </div>
        <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all">
          <RefreshCw className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {sites.map(site => (
          <div key={site.name} className="p-5 rounded-3xl bg-white/5 border border-white/5 flex flex-col justify-between group hover:border-blue-500/30 transition-all">
            <div className="flex items-start justify-between">
              <div className="w-2.5 h-2.5 rounded-full mt-1.5" style={{ background: site.color, boxShadow: `0 0 10px ${site.color}` }} />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{site.health}%</span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-black text-white uppercase tracking-tight">{site.name}</p>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">{site.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Component: Live Visitors Chart ──────────────────────────────
function VisitorFlowChart() {
  return (
    <div className="card p-8 bg-[#0a1120] border border-white/5 rounded-[2.5rem] h-full relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Visitor Dynamics</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Live Flow Density</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Domestic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">International</span>
          </div>
        </div>
      </div>
      <div className="h-48 w-full flex items-end gap-1 px-2">
        {[20, 35, 45, 30, 55, 70, 65, 80, 45, 60, 85, 95, 80, 100].map((h, i) => (
          <div key={i} className="flex-1 group relative">
            <div
              className="w-full bg-blue-600/40 rounded-t-sm group-hover:bg-blue-500 transition-all duration-500"
              style={{ height: `${h}%` }}
            />
            {i % 4 === 0 && (
              <span className="absolute -bottom-6 left-0 text-[8px] font-black text-slate-600 uppercase tracking-widest">0{i}:00</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Component: Operations Feed (Events & Bookings) ──────────────
function OperationsFeed() {
  const events = [
    { time: "09:30 AM", label: "Puri Chariot Phase A Sync", type: "RITUAL", status: "LIVE", color: "#f97316" },
    { time: "11:00 AM", label: "Konark Laser Calibration", type: "MAINTENANCE", status: "PENDING", color: "#3b82f6" },
    { time: "02:00 PM", label: "Ajanta Humidity Extraction", type: "CRITICAL", status: "AUTO", color: "#ef4444" },
    { time: "05:15 PM", label: "Hampi Global Stream", type: "EVENT", status: "SCHEDULED", color: "#10b981" }
  ];

  return (
    <div className="card p-8 bg-[#0a1120] border border-white/5 rounded-[2.5rem] h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Active Operations</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Real-time Logistics Queue</p>
        </div>
        <Calendar className="w-5 h-5 text-slate-600" />
      </div>
      <div className="space-y-4">
        {events.map((e, i) => (
          <div key={i} className="group p-5 rounded-[1.5rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all flex items-center gap-5">
            <div className="w-16 flex flex-col items-center shrink-0">
              <span className="text-[10px] font-black text-white leading-none mb-1">{e.time.split(' ')[0]}</span>
              <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{e.time.split(' ')[1]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-white uppercase truncate tracking-tight mb-1">{e.label}</p>
              <p className="text-[8px] font-black uppercase tracking-widest" style={{ color: e.color }}>{e.type}</p>
            </div>
            <div className="px-3 py-1 rounded-lg bg-black/40 border border-white/5 shrink-0">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{e.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ─────────────────────────────────────────
export default function CommandCenter() {
  const [livePulse, setPulse] = useState(true);
  const [visitorSeed, setVisitorSeed] = useState(0);
  const [signal, setSignal] = useState(99.98);

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

    const id = setInterval(() => {
      setPulse(p => !p);
      setSignal(s => Math.min(100, Math.max(99.5, s + (Math.random() * 0.04 - 0.02))));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="heritage-page-shell flex h-dvh w-screen overflow-hidden font-sans bg-[#060b18] text-white selection:bg-blue-500/30">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full min-w-0 relative z-10 overflow-hidden">
        <TopHeader />

        <div className="flex-1 overflow-y-auto scrollbar-hide p-6 lg:p-10 xl:p-14">
          <div className="max-w-[1700px] mx-auto space-y-12">

            {/* Header Section */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className={`w-3.5 h-3.5 rounded-full ${livePulse ? 'bg-blue-500 shadow-[0_0_20px_#3b82f6]' : 'bg-blue-900'} transition-all duration-1000`} />
                  <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase leading-none">Command Centre</h1>
                </div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] flex items-center gap-3">
                  Sovereign Intelligence Stack <ArrowRight className="w-3 h-3 text-blue-500" /> Phase 04 Active <span className="text-blue-600 block w-1 h-1 rounded-full animate-ping" />
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="px-8 py-5 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-end backdrop-blur-xl">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-60">System Stability</span>
                  <span className="text-sm font-mono font-black text-emerald-400">{signal.toFixed(2)}% LIVE</span>
                </div>
                <button className="h-20 px-10 rounded-[2rem] bg-blue-600 border border-blue-400/50 text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-blue-500 hover:scale-[1.02] transition-all shadow-2xl shadow-blue-900/40 active:scale-95"> Initialize Neural Scan </button>
              </div>
            </header>

            {/* Top Stat Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard icon={Users} label="Flow Sync" value={visitorSeed} trend="+12.4%" color="#3b82f6" suffix="" />
              <StatCard icon={Activity} label="Active Nodes" value={12} trend="+0.0%" color="#10b981" suffix="" />
              <StatCard icon={Plane} label="Transit Ops" value={342} trend="+8.2%" color="#f59e0b" suffix="" />
              <StatCard icon={AlertTriangle} label="Anomalies" value={4} trend="-25.0%" color="#ef4444" suffix="" />
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-12 gap-8 items-stretch">

              {/* Site Health Monitor: Span 4 */}
              <div className="col-span-12 lg:col-span-4">
                <HeritageHealthMonitor />
              </div>

              {/* Visitor Dynamics Chart: Span 5 */}
              <div className="col-span-12 lg:col-span-5">
                <VisitorFlowChart />
              </div>

              {/* IoT Hub: Span 3 */}
              <div className="col-span-12 lg:col-span-3">
                <IoTSensorHub />
              </div>

              {/* Active Ops / Events: Span 8 */}
              <div className="col-span-12 lg:col-span-8">
                <OperationsFeed />
              </div>

              {/* AI Signal Monitor / Quick Insights: Span 4 */}
              <div className="col-span-12 lg:col-span-4">
                <div className="p-10 bg-linear-to-br from-blue-600 to-blue-800 rounded-[2.5rem] relative overflow-hidden group h-full flex flex-col justify-between">
                  <BrainCircuit className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 group-hover:rotate-12 transition-transform duration-1000" />
                  <div>
                    <h4 className="text-2xl font-black text-white italic tracking-tight mb-2">Neural Insight Dashboard</h4>
                    <p className="text-xs text-blue-100/70 font-bold uppercase tracking-widest leading-relaxed">
                      AI Historical context synchronized with live telemetry.
                      Detected vibration shift in Hampi Vittal Node core.
                    </p>
                  </div>
                  <button className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-white text-blue-600 px-6 py-4 rounded-2xl w-fit hover:bg-slate-100 transition-all">
                    Analyze Anomaly <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
