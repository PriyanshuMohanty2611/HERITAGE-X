"use client";

import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { 
  ShieldAlert, Activity, Wind, Thermometer, 
  Cpu, AlertTriangle, CheckCircle2, MapPin, 
  Bot, User, Users, HardHat, Timer, 
  CheckCircle, ShieldCheck as ShieldIcon, 
  History as HistoryIcon, ChevronLeft,
  DollarSign, Utensils, Zap, BookOpen
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function SafetyHeader() {
  const { user } = useAuth();
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="text-right hidden sm:block">
          <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-0.5 text-slate-400">Authenticated Node</p>
          <p className="text-xs font-bold truncate max-w-[110px] text-slate-950">{user || "Guest"}</p>
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-600">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function SafeMinePage() {
  const [gasLevel, setGasLevel] = useState(0.045);
  const [temp, setTemp] = useState(28.4);
  const [alerts, setAlerts] = useState([
    { id: 1, type: "info", msg: "Ventilation systems at 100% capacity", time: "2 mins ago" },
    { id: 2, type: "warning", msg: "Unusual vibration detected in Sector 4", time: "15 mins ago" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGasLevel(prev => +(prev + (Math.random() - 0.5) * 0.005).toFixed(3));
      setTemp(prev => +(prev + (Math.random() - 0.5) * 0.2).toFixed(1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="heritage-page-shell flex h-screen bg-transparent text-slate-950 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-4 lg:p-10 space-y-8 scrollbar-hide relative z-10 neural-content-shell">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-50 border border-blue-100">
                <ShieldAlert className="w-5 h-5 text-blue-600" />
              </div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-slate-950">Labor Safety Matrix</h1>
            </div>
            <p className="text-[10px] font-black tracking-widest uppercase text-blue-600">Precision Archaeological Labor & Safety Intelligence</p>
          </div>
          <SafetyHeader />
        </div>

        {/* Real-time Telemetry Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Activity className="w-5 h-5 text-blue-600" />} 
            label="Neural Gas Check" 
            value={gasLevel} 
            suffix="%" 
            status={gasLevel > 0.1 ? "danger" : "safe"} 
          />
          <StatCard 
            icon={<Thermometer className="w-5 h-5 text-orange-600" />} 
            label="Excavation Temp" 
            value={temp} 
            suffix="°C" 
            status={temp > 35 ? "warning" : "safe"} 
          />
          <StatCard 
            icon={<Wind className="w-5 h-5 text-emerald-600" />} 
            label="Neural Airflow" 
            value={42.5} 
            suffix="m/s" 
            status="safe" 
          />
          <StatCard 
            icon={<ShieldAlert className="w-5 h-5 text-red-600" />} 
            label="Critical Alarms" 
            value={0} 
            suffix=" Active" 
            status="safe" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Risk Vectoring */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative overflow-hidden">
                <h3 className="text-lg font-black uppercase mb-6 flex items-center gap-3 text-slate-950">
                  <Cpu className="w-5 h-5 text-blue-600" /> Site Risk Vectoring
                </h3>
                <div className="space-y-6">
                  <RiskBar label="Structural Instability (Cave-in)" level={12} color="bg-blue-600" />
                  <RiskBar label="Hazardous Gas Accumulation" level={4} color="bg-emerald-600" />
                  <RiskBar label="Seismic Micro-vibrations" level={22} color="bg-orange-500" />
                  <RiskBar label="Water Table Encroachment" level={8} color="bg-blue-400" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50 border border-blue-100">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-black uppercase italic text-slate-950">Risk Analysis v4</h4>
                <p className="text-sm leading-relaxed text-slate-500 font-medium">
                  Deep neural networks are analyzing sub-surface seismic clusters. No immediate tectonic threat detected in the lower excavation shafts.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-50 border border-emerald-100">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="text-xl font-black uppercase italic text-slate-950">Compliance Audit</h4>
                <p className="text-sm leading-relaxed text-slate-500 font-medium">
                  Remote sensing confirms 100% PPE compliance across all active sectors. Hydration logs verified for the 08:00 AM shift.
                </p>
              </div>
            </div>
          </div>

          {/* AI Safety Consultant */}
          <div className="flex flex-col gap-6">
            <div className="p-8 rounded-3xl border border-blue-100 bg-blue-50/30 flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-white border-2 border-blue-100 shadow-xl">
                <Bot className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-2 text-slate-950">Safety Consultant</h3>
              <p className="text-[10px] font-black tracking-widest uppercase mb-6 text-blue-600">Active Protocol Guidance</p>
              <div className="p-6 text-left w-full rounded-2xl space-y-4 bg-white border border-slate-100 shadow-sm">
                <p className="text-xs italic font-semibold leading-relaxed text-slate-700">
                  "Labor safety protocol HEX-2026.4 active. Atmospheric scrubbers are synced. Ensure hydration cycles every 45 mins due to 32°C surface temp forecast."
                </p>
                <div className="flex justify-between items-center text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  <span>Logic Processor Sync: OK</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-blue-200 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
               <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Live Telemetry Logs</h4>
               <div className="space-y-4">
                  {alerts.map(a => (
                    <div key={a.id} className="flex gap-4 items-start pb-4 border-b border-slate-50">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1 ${a.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                      <div className="flex-1">
                        <p className="text-xs font-black uppercase leading-tight mb-1 text-slate-950">{a.msg}</p>
                        <p className="text-[10px] font-bold text-slate-400 italic">{a.time}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* NEW: Financial Budgeting & Planning Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <DollarSign className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-950">Safety Budget Matrix</h3>
                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Quarterly Resource Allocation FY26</p>
                 </div>
              </div>

              <div className="space-y-4">
                 {[
                   { label: "Ventilation & Scrubbing", cost: "₹1.4M", trend: "+4%", status: "Allocated" },
                   { label: "Worker PPE (Smart Gear)", cost: "₹850K", trend: "-2%", status: "Deployed" },
                   { label: "Medical Support Unit", cost: "₹620K", trend: "0%", status: "Standby" },
                   { label: "Emergency Dewatering", cost: "₹450K", trend: "+12%", status: "Critical" },
                 ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                       <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{item.label}</p>
                          <p className="text-lg font-black text-slate-950">{item.cost}</p>
                       </div>
                       <div className="text-right">
                          <p className={`text-[10px] font-black uppercase ${item.status === 'Critical' ? 'text-red-500' : 'text-blue-600'}`}>{item.status}</p>
                          <p className="text-[9px] font-bold text-slate-400">{item.trend} vs LY</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-8 shadow-sm">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                    <Utensils className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-950">Nutrition Intelligence</h3>
                    <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Optimized Labor Diet & Pricing</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2">
                    <p className="text-[10px] font-black text-emerald-700 uppercase">Optimal Food</p>
                    <p className="text-sm font-black text-slate-950">High-Protein Thali</p>
                    <p className="text-[10px] text-slate-500 font-medium italic">Sattu, Lentils, Eggs, Whole Wheat Roti, Bananas.</p>
                 </div>
                 <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 space-y-2">
                    <p className="text-[10px] font-black text-blue-700 uppercase">Est. Unit Price</p>
                    <p className="text-sm font-black text-slate-950">₹80 - ₹150 / Day</p>
                    <p className="text-[10px] text-slate-500 font-medium italic">Bulk procurement for 120+ active nodes.</p>
                 </div>
              </div>

              <div className="space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Nutritional Benchmarks</p>
                 <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                       <p className="text-sm font-black text-slate-950">4000</p>
                       <p className="text-[8px] font-black text-slate-400 uppercase">Kcal/Day</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                       <p className="text-sm font-black text-slate-950">120g</p>
                       <p className="text-[8px] font-black text-slate-400 uppercase">Protein</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                       <p className="text-sm font-black text-slate-950">75g</p>
                       <p className="text-[8px] font-black text-slate-400 uppercase">Fats</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Historical Disaster Matrix (Real Data) */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg">
                <HistoryIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-950">Historical Incident Matrix</h3>
                <p className="text-[10px] text-red-600 font-black uppercase tracking-widest">Lessons from National Mining Record</p>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                { year: "1975", event: "Chasnala Disaster", deaths: 375, cause: "Coal Dust Explosion & Inundation", icon: "🌊" },
                { year: "1965", event: "Dhori Colliery", deaths: 268, cause: "Methane Gas Catastrophe", icon: "💥" },
                { year: "1958", event: "Chinakuri Explosion", deaths: 183, cause: "Inflammable Gas Ignition", icon: "🔥" },
                { year: "2018", event: "Meghalaya Rat-Hole", deaths: 15, cause: "Flooding in Illegal Workings", icon: "⛏️" },
                { year: "2025", event: "Assam Coal Flooding", deaths: 9, cause: "Breaching Underground Water", icon: "⚠️" }
              ].map((log, i) => (
                 <div key={i} className="p-6 rounded-2xl bg-white border border-red-100 flex gap-5 items-center shadow-sm hover:border-red-300 transition-colors">
                    <div className="text-3xl grayscale group-hover:grayscale-0">{log.icon}</div>
                    <div className="flex-1">
                       <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{log.year}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.deaths} FATALITIES</span>
                       </div>
                       <h4 className="text-sm font-black uppercase text-slate-950 mb-1">{log.event}</h4>
                       <p className="text-[9px] font-bold text-slate-500 uppercase leading-relaxed">Primary Root Cause: {log.cause}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </main>
  );
}

function StatCard({ icon, label, value, suffix, status }: any) {
  const styles: any = {
    danger:  { bg: "bg-red-50", border: "border-red-100", color: "text-red-600" },
    warning: { bg: "bg-orange-50", border: "border-orange-100", color: "text-orange-600" },
    safe:    { bg: "bg-blue-50", border: "border-blue-100", color: "text-blue-600" },
  };
  const s = styles[status] || styles.safe;
  return (
    <div className={`p-6 rounded-2xl flex items-center justify-between bg-white border border-slate-200 shadow-sm relative overflow-hidden`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${s.color.replace('text', 'bg')}`} />
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-400">{label}</p>
        <p className={`text-2xl font-black tracking-tighter text-slate-900`}>{value}{suffix}</p>
      </div>
      <div className={`p-3 rounded-xl ${s.bg} border ${s.border}`}>{icon}</div>
    </div>
  );
}

function RiskBar({ label, level, color }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-950 font-black">{level}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-1000`} style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}
