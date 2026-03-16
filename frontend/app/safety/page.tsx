"use client";

import { Sidebar } from "../../components/Sidebar";
import { 
  ShieldAlert, 
  Activity, 
  Wind, 
  Thermometer, 
  Bell, 
  Cpu, 
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  MapPin,
  Bot,
  User,
  AlertCircle,
  Users,
  HardHat,
  Timer,
  Activity as VitalsIcon,
  CheckCircle,
  ShieldCheck as ShieldIcon,
  History as HistoryIcon,
  ChevronLeft
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function TopHeader() {
  const { user } = useAuth();
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 px-4 py-2 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
        <div className="text-right hidden sm:block">
          <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-0.5" style={{ color: "var(--text-muted)" }}>Authenticated</p>
          <p className="text-xs font-bold truncate max-w-[110px]" style={{ color: "var(--text-strong)" }}>{user || "Guest"}</p>
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#2563eb,#0ea5e9)" }}>
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function SafeMinePage() {
  const [gasLevel, setGasLevel] = useState(0.04);
  const [temp, setTemp] = useState(28);
  const [alerts, setAlerts] = useState([
    { id: 1, type: "info", msg: "Ventilation systems at 100% capacity", time: "2 mins ago" },
    { id: 2, type: "warning", msg: "Unusual vibration detected in Sector 4", time: "15 mins ago" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGasLevel(prev => +(prev + (Math.random() - 0.5) * 0.01).toFixed(3));
      setTemp(prev => +(prev + (Math.random() - 0.5) * 0.5).toFixed(1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="heritage-page-shell flex h-screen bg-[#050810] text-gray-100 overflow-hidden font-sans" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Background image — Safety page */}
      <div className="page-bg" style={{ backgroundImage: "url('/assets/Ellora Caves/kailasa-temple-an-underrated-engineering-marvel-carved-out-v0-zxbpze3e08md1.webp')" }} />
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-4 lg:p-10 space-y-8 scrollbar-hide relative z-10 pt-16 lg:pt-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6" style={{ borderBottom: "1px solid var(--card-border)" }}>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}>
                <ShieldAlert className="w-5 h-5 text-orange-500" />
              </div>
              <h1 className="text-2xl font-black uppercase tracking-tight" style={{ color: "var(--text-strong)" }}>SafeMine 360</h1>
            </div>
            <p className="text-[10px] font-black tracking-widest uppercase text-orange-500">Precision Mining Safety & Monitoring</p>
          </div>
          <TopHeader />
        </div>

        {/* Real-time Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Activity className="w-5 h-5 text-emerald-400" />} 
            label="Methane Level" 
            value={gasLevel} 
            suffix="%" 
            status={gasLevel > 0.1 ? "danger" : "safe"} 
          />
          <StatCard 
            icon={<Thermometer className="w-5 h-5 text-orange-400" />} 
            label="Core Temp" 
            value={temp} 
            suffix="°C" 
            status={temp > 35 ? "warning" : "safe"} 
          />
          <StatCard 
            icon={<Wind className="w-5 h-5 text-blue-400" />} 
            label="Air Flow" 
            value={42.5} 
            suffix="m/s" 
            status="safe" 
          />
          <StatCard 
            icon={<ShieldAlert className="w-5 h-5 text-red-500" />} 
            label="Alert Level" 
            value={0} 
            suffix=" Active" 
            status="safe" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Risk Prediction Panel */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-6 rounded-2xl card relative overflow-hidden" style={{ border: "1px solid var(--card-border)" }}>
              <div className="relative z-10">
                <h3 className="text-lg font-black uppercase mb-5 flex items-center gap-3" style={{ color: "var(--text-strong)" }}>
                  <Cpu className="w-5 h-5 text-orange-500" /> AI Risk Vectors
                </h3>
                <div className="space-y-6">
                  <RiskBar label="Landslide Threat" level={15} color="bg-emerald-500" />
                  <RiskBar label="Gas Leak Probability" level={4} color="bg-blue-500" />
                  <RiskBar label="Seismic Unstability" level={28} color="bg-orange-500" />
                  <RiskBar label="Illegal Mining Signal" level={2} color="bg-emerald-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-4xl border flex flex-col gap-4" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}>
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                </div>
                <h4 className="text-xl font-black uppercase italic" style={{ color: "var(--text-strong)" }}>Risk Analysis</h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Deep neural networks are analyzing sub-surface seismic clusters. No immediate tectonic threat detected in the lower shaft.
                </p>
              </div>
              <div className="p-8 rounded-4xl border flex flex-col gap-4" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-xl font-black uppercase italic" style={{ color: "var(--text-strong)" }}>Environmental Audit</h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Remote sensing confirms 0.0% illegal excavations in the protected perimeter. Flora health markers are consistent.
                </p>
              </div>
            </div>
          </div>

          {/* AI Safety Assistant */}
          <div className="flex flex-col gap-6">
            <div className="p-8 rounded-4xl border flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden" style={{ background: "var(--card-bg)", border: "1px solid #fed7aa" }}>
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: "#fff7ed", border: "2px solid #fed7aa" }}>
                <Bot className="w-10 h-10 text-orange-400" />
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-2" style={{ color: "var(--text-strong)" }}>Safety Assistant</h3>
              <p className="text-[10px] font-black tracking-widest uppercase mb-6 text-orange-500">Real-time Protocol Guidance</p>
              <div className="p-6 text-left w-full rounded-2xl space-y-4" style={{ background: "var(--background)", border: "1px solid var(--card-border)" }}>
                <p className="text-xs italic font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  "Worker safety protocol 12.4 active. Ensure oxygen scrubbers are primed before entering sector 7. Weather forecast indicates extreme heat; hydrations cycles mandatory every 45 mins."
                </p>
                <div className="flex justify-between items-center text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                  <span>AI Inference Active</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-4xl space-y-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
               <h4 className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Global Telemetry Logs</h4>
               <div className="space-y-4">
                  {alerts.map(a => (
                    <div key={a.id} className="flex gap-4 items-start pb-4" style={{ borderBottom: "1px solid var(--card-border)" }}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${a.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase leading-tight mb-1" style={{ color: "var(--text-strong)" }}>{a.msg}</p>
                        <p className="text-[10px] font-mono italic" style={{ color: "var(--text-muted)" }}>{a.time}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Worker Health & Compliance - Expanded Section */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
           {/* Worker Health Hub */}
           <div className="xl:col-span-3 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
              <div className="flex justify-between items-center mb-8">
                 <div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter" style={{ color: "var(--text-strong)" }}>Worker Health Hub</h3>
                    <p className="text-[10px] text-emerald-600 font-black tracking-widest uppercase">Live Biometric Feed: Tracking 128 Miners</p>
                 </div>
                 <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span className="text-[8px] font-black text-emerald-600 uppercase tracking-[0.2em]">All Systems Nominal</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { name: "Unit A-12 (Excavation)", pulse: 78, oxygen: 99, temp: 36.6, status: "stable" },
                   { name: "Unit B-04 (Scanning)", pulse: 82, oxygen: 98, temp: 36.8, status: "stable" },
                   { name: "Unit C-09 (Support)", pulse: 94, oxygen: 96, temp: 37.2, status: "high-intensity" }
                 ].map((worker, i) => (
                    <div key={i} className="p-6 rounded-3xl" style={{ background: "var(--background)", border: "1px solid var(--card-border)" }}>
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{worker.name}</span>
                          <span className={`w-2 h-2 rounded-full ${worker.status === 'stable' ? 'bg-emerald-500' : 'bg-orange-500 animate-pulse'}`} />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                             <p className="text-[9px] uppercase font-black" style={{ color: "var(--text-muted)" }}>Pulse</p>
                             <p className="text-lg font-black" style={{ color: "var(--text-strong)" }}>{worker.pulse} <small className="text-[10px]" style={{ color: "var(--text-muted)" }}>BPM</small></p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[9px] uppercase font-black" style={{ color: "var(--text-muted)" }}>Oxygen</p>
                             <p className="text-lg font-black" style={{ color: "var(--text-strong)" }}>{worker.oxygen}<small className="text-[10px]" style={{ color: "var(--text-muted)" }}>%</small></p>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Safety Compliance Checklist */}
           <div className="p-8 rounded-[2.5rem] space-y-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
              <h4 className="text-sm font-black uppercase tracking-[0.2em] italic flex items-center gap-2" style={{ color: "var(--text-strong)" }}>
                 <ShieldIcon className="w-4 h-4 text-orange-400" /> Safety Protocols
              </h4>
              <div className="space-y-4">
                 {[
                   { task: "Oxygen Scrubbers Primed", checked: true },
                   { task: "Seismic Nodes Active", checked: true },
                   { task: "Thermal Suits Deployed", checked: false },
                   { task: "Hydration Cycles Confirmed", checked: true }
                 ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl transition-all" style={{ background: "var(--background)", border: "1px solid var(--card-border)" }}>
                       <div className={`w-5 h-5 rounded-md flex items-center justify-center ${step.checked ? 'bg-emerald-500' : ''}`} style={!step.checked ? { border: "1px solid var(--card-border)" } : {}}>
                          {step.checked && <CheckCircle className="w-3 h-3 text-white" />}
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: step.checked ? "var(--text-strong)" : "var(--text-muted)" }}>{step.task}</span>
                    </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition-all uppercase text-[10px] tracking-widest">
                 Update Protocols
              </button>
           </div>
        </div>

        {/* Historical Disaster Logs */}
        <div className="p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
           <div className="flex items-center gap-4 mb-8">
              <HistoryIcon className="w-6 h-6 text-red-400" />
              <h3 className="text-2xl font-black uppercase italic tracking-tighter" style={{ color: "var(--text-strong)" }}>Historical Incident Logs</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { year: "2024", event: "Sector 7 Flooding", cause: "Unexpected Monsoon Surge", response: "Automation deployed, zero casualties", icon: "🌊" },
                { year: "2022", event: "Shaft 3 Seismic Shift", cause: "Deep Crustal Adjustment", response: "Immediate evacuation, robotic restoration", icon: "🌋" }
              ].map((log, i) => (
                 <div key={i} className="p-6 rounded-3xl flex gap-6 items-center" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
                    <div className="text-4xl">{log.icon}</div>
                    <div>
                       <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{log.year}</span>
                          <h4 className="text-sm font-black uppercase" style={{ color: "var(--text-strong)" }}>{log.event}</h4>
                       </div>
                       <p className="text-[10px] uppercase font-black mb-2" style={{ color: "var(--text-muted)" }}>Cause: {log.cause}</p>
                       <p className="text-[10px] italic" style={{ color: "var(--text-muted)" }}>Resolution: {log.response}</p>
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
    danger:  { bg: "#fef2f2", border: "#fecaca", color: "#ef4444" },
    warning: { bg: "#fffbeb", border: "#fde68a", color: "#f59e0b" },
    safe:    { bg: "#f0fdf4", border: "#bbf7d0", color: "#16a34a" },
  };
  const s = styles[status] || styles.safe;
  return (
    <div className="p-5 rounded-2xl flex items-center justify-between" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>{label}</p>
        <p className="text-2xl font-black tracking-tighter" style={{ color: s.color }}>{value}{suffix}</p>
      </div>
      <div className="p-3 rounded-xl" style={{ background: "white", border: `1px solid ${s.border}` }}>{icon}</div>
    </div>
  );
}

function RiskBar({ label, level, color }: any) {
  const barColors: any = { "bg-emerald-500": "#10b981", "bg-blue-500": "#3b82f6", "bg-orange-500": "#f97316" };
  const barColor = barColors[color] || "#2563eb";
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span style={{ color: "var(--text-muted)" }}>{label}</span>
        <span style={{ color: "var(--text-strong)" }}>{level}%</span>
      </div>
      <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: "var(--card-border)" }}>
        <div className="h-full rounded-full" style={{ width: `${level}%`, background: barColor }} />
      </div>
    </div>
  );
}
