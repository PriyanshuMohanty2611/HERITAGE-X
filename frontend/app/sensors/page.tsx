"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Droplets,
  Gauge,
  Shield,
  ShieldAlert,
  Thermometer,
  Wind,
  RefreshCcw,
  Clock,
  Radio,
  AlertOctagon,
  Factory,
  ClipboardList,
} from "lucide-react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { Footer } from "../../components/Footer";

type SensorReading = {
  label: string;
  value: number;
  unit: string;
  status: "ok" | "warn" | "alert";
  source: string;
  change: string;
  color: string;
  max?: number;
};

type Incident = {
  title: string;
  date: string;
  type: "accident" | "incident" | "maintenance";
  desc: string;
};

const LIVE_READINGS: SensorReading[] = [
  {
    label: "PM2.5 (Delhi)",
    value: 244,
    unit: "AQI",
    status: "warn",
    source: "CPCB SAFAR bulletin",
    change: "↑ +12 vs yesterday",
    color: "bg-orange-500",
    max: 500,
  },
  {
    label: "Temperature (Safdarjung)",
    value: 36.4,
    unit: "°C",
    status: "warn",
    source: "IMD METAR 2026-03-16 12:00 IST",
    change: "↑ +1.3°C vs last 24h",
    color: "bg-amber-500",
    max: 50,
  },
  {
    label: "Humidity (Safdarjung)",
    value: 24,
    unit: "%",
    status: "ok",
    source: "IMD METAR 2026-03-16 12:00 IST",
    change: "↓ -6% vs morning",
    color: "bg-sky-500",
    max: 100,
  },
  {
    label: "Ground Vibration (Qutub)",
    value: 0.6,
    unit: "mm/s",
    status: "ok",
    source: "ASI seismo baseline (<2.5 mm/s)",
    change: "Stable",
    color: "bg-emerald-500",
    max: 2.5,
  },
];

const INCIDENT_LOG: Incident[] = [
  {
    title: "Scaffold slip – parapet repair",
    date: "2025-11-12",
    type: "accident",
    desc: "Minor injury (ankle) during scaffold descent at Red Fort façade repaint.",
  },
  {
    title: "Dust exposure exceedance",
    date: "2026-01-08",
    type: "incident",
    desc: "PM2.5 exceeded 300 AQI during sandstone cutting; work paused 2 hrs; N95 mandate reinforced.",
  },
  {
    title: "Seismic micro-tremor survey",
    date: "2025-09-30",
    type: "maintenance",
    desc: "Baseline vibration mapping at Qutub; peak 0.9 mm/s under tourist load—within ASI tolerance.",
  },
  {
    title: "Roof drainage audit",
    date: "2025-12-05",
    type: "maintenance",
    desc: "Cleared blocked gargoyles on Konark north aisle to reduce humidity creep into mandapa.",
  },
];

export default function ConservationHub() {
  const [time] = useState("12:05 IST");

  const riskStatus = useMemo(() => {
    const anyAlert = LIVE_READINGS.some((r) => r.status === "alert");
    const anyWarn = LIVE_READINGS.some((r) => r.status === "warn");
    return anyAlert ? "Critical" : anyWarn ? "Caution" : "Stable";
  }, []);

  return (
    <main className="heritage-page-shell flex h-dvh w-screen font-sans overflow-hidden bg-slate-950 text-white relative">
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div className="absolute top-0 left-1/5 w-[520px] h-[520px] bg-emerald-500/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 right-1/6 w-[540px] h-[540px] bg-sky-500/10 blur-[180px] rounded-full" />
      </div>

      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <TopHeader />

        <div className="flex-1 overflow-y-auto p-6 lg:p-12 scrollbar-hide">
          <div className="max-w-[1700px] mx-auto space-y-14 pb-20">
            <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-2xl">
                  <Shield className="w-10 h-10 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter">
                    Conservation Hub
                  </h1>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.45em] mt-2 ml-1 underline decoration-emerald-400/60 underline-offset-8">
                    IoT monitoring + labour safety
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full xl:w-auto">
                <MiniStat label="Live Nodes" value="62" icon={<Radio className="w-4 h-4" />} />
                <MiniStat label="Risk Mode" value={riskStatus} icon={<AlertTriangle className="w-4 h-4" />} />
                <MiniStat label="Last Sync" value={time} icon={<Clock className="w-4 h-4" />} />
                <MiniStat label="Maintenance Open" value="7" icon={<ClipboardList className="w-4 h-4" />} />
              </div>
            </header>

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 rounded-[32px] border border-white/10 bg-slate-900/70 backdrop-blur-2xl shadow-3xl p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      IoT sensor dashboard
                    </p>
                    <h2 className="text-3xl font-black uppercase italic tracking-tight">
                      Real-time environment
                    </h2>
                  </div>
                  <button className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-2 hover:border-emerald-400/40 transition-all">
                    <RefreshCcw className="w-4 h-4" /> Refresh
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {LIVE_READINGS.map((r) => (
                    <SensorCard key={r.label} reading={r} />
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-emerald-600/25 via-slate-900/80 to-slate-900/80 p-8 shadow-3xl flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <AlertOctagon className="w-6 h-6 text-emerald-300" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200">Live alert</p>
                    <h3 className="text-xl font-black uppercase">Humidity drift under control</h3>
                  </div>
                </div>
                <p className="text-sm text-emerald-50/80 leading-relaxed">
                  Safdarjung feed shows 24% RH; dehumidifiers at archives remain within ASI safe band (20–60%). Continuous watch on mid-day heat index due to 36.4°C spike.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.25em] text-slate-200">
                    <span>Risk Band</span>
                    <span>Ok</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[32%]" />
                  </div>
                  <p className="text-[10px] text-slate-300">
                    Source: IMD METAR 2026-03-16 12:00 IST; CPCB SAFAR bulletin (PM2.5 244, Delhi).
                  </p>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 rounded-[32px] border border-white/10 bg-slate-900/70 backdrop-blur-2xl shadow-3xl p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      Sensor trendlines
                    </p>
                    <h2 className="text-3xl font-black uppercase italic tracking-tight">
                      24h monitoring window
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TrendChart title="Humidity (Safdarjung)" unit="%" color="bg-sky-400" data={[32, 28, 26, 24, 27, 29]} labels={["06h", "08h", "10h", "12h", "14h", "16h"]} />
                  <TrendChart title="PM2.5 (Delhi)" unit="AQI" color="bg-orange-400" data={[210, 224, 238, 244, 239, 228]} labels={["06h", "08h", "10h", "12h", "14h", "16h"]} />
                  <TrendChart title="Temperature (°C)" unit="°C" color="bg-amber-400" data={[27, 30, 33, 36.4, 35, 32]} labels={["06h", "08h", "10h", "12h", "14h", "16h"]} />
                  <TrendChart title="Vibration (mm/s)" unit="mm/s" color="bg-emerald-400" data={[0.4, 0.5, 0.6, 0.6, 0.7, 0.6]} labels={["06h", "08h", "10h", "12h", "14h", "16h"]} />
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-3xl space-y-6">
                <div className="flex items-center gap-3">
                  <Factory className="w-6 h-6 text-orange-300" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Labour Safety</p>
                    <h3 className="text-2xl font-black uppercase italic tracking-tight">Incident Log</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {INCIDENT_LOG.map((item) => (
                    <div key={item.title} className="p-4 rounded-2xl border border-white/10 bg-white/5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.25em] ${item.type === "accident" ? "bg-red-500/15 text-red-300" : item.type === "incident" ? "bg-amber-500/15 text-amber-200" : "bg-emerald-500/15 text-emerald-200"}`}>
                          {item.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                      </div>
                      <p className="text-sm font-black text-white mt-2">{item.title}</p>
                      <p className="text-xs text-slate-300 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-red-600/20 via-amber-500/20 to-emerald-500/20 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-300" />
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Safety posture</p>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-amber-400 w-[54%]" />
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Reinforce PPE audits; dust exceedance logged on 2026-01-08. Next training: 2026-04-02 (heat & AQI response).
                  </p>
                </div>
              </div>
            </section>

            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}

function MiniStat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
        {icon}
      </div>
      <div className="text-right">
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">{label}</p>
        <p className="text-lg font-black text-white">{value}</p>
      </div>
    </div>
  );
}

function SensorCard({ reading }: { reading: SensorReading }) {
  const width = reading.max ? Math.min(100, (reading.value / reading.max) * 100) : 100;
  const statusColor =
    reading.status === "alert" ? "text-red-400" : reading.status === "warn" ? "text-amber-400" : "text-emerald-400";

  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-3 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${reading.status === "alert" ? "bg-red-400" : reading.status === "warn" ? "bg-amber-400" : "bg-emerald-400"} animate-pulse`} />
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300">{reading.label}</p>
        </div>
        {reading.unit.includes("AQI") ? <Wind className="w-4 h-4 text-orange-300" /> : reading.unit.includes("%") ? <Droplets className="w-4 h-4 text-sky-300" /> : reading.unit.includes("°") ? <Thermometer className="w-4 h-4 text-amber-300" /> : <Activity className="w-4 h-4 text-emerald-300" />}
      </div>
      <div className="flex items-center gap-3">
        <p className="text-3xl font-black text-white">{reading.value}</p>
        <p className="text-sm font-black text-slate-500 uppercase tracking-[0.2em]">{reading.unit}</p>
      </div>
      <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${statusColor}`}>{reading.change}</p>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full rounded-full ${reading.color}`} style={{ width: `${width}%` }} />
      </div>
      <p className="text-[10px] text-slate-400">Source: {reading.source}</p>
    </div>
  );
}

function TrendChart({
  title,
  unit,
  color,
  data,
  labels,
}: {
  title: string;
  unit: string;
  color: string;
  data: number[];
  labels: string[];
}) {
  const max = Math.max(...data);
  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/5 shadow-2xl space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-white">{title}</p>
        <Gauge className="w-5 h-5 text-slate-400" />
      </div>
      <div className="grid grid-cols-6 gap-2 items-end h-32">
        {data.map((v, i) => (
          <div key={labels[i]} className="flex flex-col items-center gap-1">
            <div className="w-full rounded-full bg-white/10 overflow-hidden h-full flex items-end">
              <div className={`${color}`} style={{ width: "100%", height: `${(v / max) * 100}%` }} />
            </div>
            <span className="text-[10px] text-slate-500">{labels[i]}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>Peak: {max} {unit}</span>
        <span>Unit: {unit}</span>
      </div>
    </div>
  );
}
