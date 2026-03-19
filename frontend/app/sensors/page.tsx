"use client";

import { useState, useEffect } from "react";
import { 
  Wind, ShieldAlert, Activity, Thermometer, 
  Droplets, Waves, ArrowLeft, Wifi, Zap, 
  ChevronRight, BrainCircuit, ShieldCheck,
  Target, Globe
} from "lucide-react";
import Link from "next/link";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";

const SensorNode = ({ label, hardware, value, unit, purpose, status, icon: Icon }: any) => (
  <div className="group bg-white/60 backdrop-blur-xl border border-slate-100 p-8 rounded-4xl transition-all hover:shadow-2xl hover:scale-[1.02] flex flex-col justify-between h-full shadow-sm hover:border-blue-500/20">
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-blue-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
           <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">
            {status}
          </span>
        </div>
      </div>
      
      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">
        {label} <span className="text-blue-400 opacity-50 font-medium lowercase">({hardware})</span>
      </h4>
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-5xl font-black text-slate-900 tracking-tighter">{value}</span>
        <span className="text-sm font-black text-blue-600 uppercase italic tracking-widest">{unit}</span>
      </div>
    </div>
    
    <div className="border-t border-slate-100 pt-6 mt-4">
      <p className="text-[11px] leading-relaxed text-slate-500 font-bold uppercase tracking-wider">
        <span className="text-blue-600">STRATEGIC FOCUS:</span> {purpose}
      </p>
      <div className="mt-4 flex items-center justify-between text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">
         <span>Calibration: v2.4.0</span>
         <span>Sync: Live</span>
      </div>
    </div>
  </div>
);

export default function SensorIntelligenceHub() {
  const [readings, setReadings] = useState({
    atm: 412,
    toxic: 0.15,
    seismic: 0.002,
    thermal: 28,
    hydro: 64,
    sub: 12
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setReadings(prev => {
        const nextSeismic = Number((prev.seismic + (Math.random() * 0.0004 - 0.0002)).toFixed(3));
        
        // SECURITY ALERT TRIGGER: Red Ripple if vibration exceeds threshold
        if (nextSeismic > 0.0025) { // Arbitrary "critical" floor for demo
          window.dispatchEvent(createRedPulse());
        }

        return {
          atm: Number((prev.atm + (Math.random() * 2 - 1)).toFixed(0)),
          toxic: Number((prev.toxic + (Math.random() * 0.02 - 0.01)).toFixed(2)),
          seismic: nextSeismic,
          thermal: Number((prev.thermal + (Math.random() * 0.4 - 0.2)).toFixed(1)),
          hydro: Number((prev.hydro + (Math.random() * 0.6 - 0.3)).toFixed(1)),
          sub: Number((prev.sub + (Math.random() * 0.2 - 0.1)).toFixed(1))
        };
      });
    }, 3000);

    function createRedPulse() {
      return new CustomEvent("heritage-pulse", { 
        detail: { color: "rgba(239, 68, 68,", x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight } 
      });
    }

    return () => clearInterval(interval);
  }, []);

  const sensorData = [
    {
      label: "Atmospheric Grid",
      hardware: "MQ-135 / MG-811",
      value: readings.atm,
      unit: "PPM (CO2)",
      purpose: "Monitoring carbon footprint and air toxicity levels across the solar circuit.",
      status: "OPTIMIZED",
      icon: Wind
    },
    {
      label: "Toxic Gas Matrix",
      hardware: "MQ-7 & MICS-2714",
      value: readings.toxic,
      unit: "mg/m³ (CO/NO2)",
      purpose: "Detecting vehicle emissions and industrial hazardous leaks in the protected zone.",
      status: "SECURE",
      icon: ShieldAlert
    },
    {
      label: "Tectonic Shield",
      hardware: "ADXL-345",
      value: readings.seismic,
      unit: "g (Force)",
      purpose: "Real-time vibration analysis for earthquake early warning and structural safety.",
      status: "STABLE",
      icon: Activity
    },
    {
      label: "Climate Sync",
      hardware: "DHT22 / BME280",
      value: readings.thermal,
      unit: "°C",
      purpose: "Tracking ambient heat signatures for long-term structural integrity monitoring.",
      status: "NOMINAL",
      icon: Thermometer
    },
    {
      label: "Moisture Matrix",
      hardware: "SHT31-D",
      value: readings.hydro,
      unit: "%",
      purpose: "Humidity and condensation tracking for heritage stone preservation protocol.",
      status: "SYNCED",
      icon: Droplets
    },
    {
      label: "Ground Stability",
      hardware: "Capacitive v1.2",
      value: readings.sub,
      unit: "%",
      purpose: "Monitoring soil moisture to prevent architectural sinking and foundation decay.",
      status: "ACTIVE",
      icon: Waves
    }
  ];

  return (
    <main className="heritage-page-shell flex h-screen w-screen font-sans overflow-hidden bg-transparent">
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1) rotate(-5deg); opacity: 0.05; }
          50% { transform: scale(1.05) rotate(-3deg); opacity: 0.08; }
        }
        .animate-breathe {
          animation: breathe 20s ease-in-out infinite;
        }
      `}</style>

      {/* Glassmorphic Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/assets/KONARK/download.jpg" 
          className="absolute top-[-10%] right-[-5%] w-[80%] lg:w-[60%] h-auto 
                     opacity-[0.05] grayscale blur-[2px] rotate-[-5deg] 
                     animate-breathe"
          alt="Background Sculpture"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-slate-50 via-slate-50/80 to-transparent" />
      </div>

      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <div className="header-neural h-20 flex items-center justify-between px-6 z-20 shrink-0">
          <TopHeader />
        </div>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide relative z-0 neural-content-shell">
          <div className="max-w-[1600px] mx-auto space-y-12 pb-24">
            
            {/* Header Section */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="space-y-4">
                <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
                  <ArrowLeft className="w-3 h-3" /> Back to Terminal
                </Link>
                <div className="flex items-center gap-6">
                  <div className="w-5 h-5 rounded-full bg-blue-600 shadow-[0_0_20px_#2563eb]" />
                  <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase leading-none text-slate-950">
                    Sensor <span className="text-blue-600">Intelligence</span>
                  </h1>
                </div>
                <p className="text-[12px] text-slate-400 font-black uppercase tracking-[0.5em] flex items-center gap-4">
                  <div className="w-10 h-[2px] bg-blue-500" />
                  Sovereign Neural Matrix Monitor
                </p>
              </div>

              <div className="flex items-center gap-6">
                 <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-4xl flex items-center gap-6 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                       <Wifi className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                       <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Global Sync Status</p>
                       <p className="text-xl font-black text-slate-950">9 Active Nodes</p>
                    </div>
                 </div>
              </div>
            </header>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { label: "Stability", val: "99.98", unit: "%", icon: ShieldCheck },
                 { label: "Signal Latency", val: "12", unit: "ms", icon: Zap },
                 { label: "Active Guards", val: "24", unit: "Nodes", icon: Target },
                 { label: "Global Coverage", val: "100", unit: "%", icon: Globe }
               ].map((stat, i) => (
                 <div key={i} className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/40 flex items-center gap-5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600">
                       <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                       <p className="text-lg font-black text-slate-950">{stat.val} <span className="text-[10px] text-blue-600">{stat.unit}</span></p>
                    </div>
                 </div>
               ))}
            </div>

            {/* Main Sensor Intelligence Matrix */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black uppercase italic tracking-tight text-slate-950">Intelligence Matrix</h2>
                  <p className="text-slate-500 text-sm mt-1">Real-time hardware telemetry and strategic structural monitoring.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-load">
                {sensorData.map((node, i) => (
                  <SensorNode key={i} {...node} />
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
