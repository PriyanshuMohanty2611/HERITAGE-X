"use client";

import React, { useState } from "react";
import {
  MapPin, QrCode, Calendar, Clock, ChevronRight, CreditCard,
  BrainCircuit, Loader2, Smartphone, Plane, ShieldCheck, Fingerprint,
  Globe, Stamp, CheckCircle2, Download, Share2, Star
} from "lucide-react";
import { Booking } from "../types";

interface SovereignLedgerProps {
  myBookings: Booking[];
  myPayments: { id: string; amount: string; method: string; date: string; status: string }[];
  onViewPass: (booking: Booking) => void;
  aiInsight: string | null;
  insightLoading: boolean;
  onGetInsight: () => void;
}

// Airport-style Digital Passport Card
const PassportCard: React.FC<{ b: Booking; onViewPass: (b: Booking) => void }> = ({ b, onViewPass }) => {
  const [flipped, setFlipped] = useState(false);

  const SITE_CODES: Record<string, string> = {
    "Konark Sun Temple": "KNK",
    "Taj Mahal": "TAJ",
    "Hampi Ruins": "HMP",
    "Meenakshi Temple": "MNK",
    "Ajanta Caves": "AJT",
    "Ellora Caves": "ELR",
    "Harmandir Sahib": "AMS",
    "Qutub Minar": "QTB",
    "Red Fort": "RDF",
    "Victoria Memorial": "VCM",
    "Sanchi Stupa": "SNC",
    "Mahabalipuram": "MBP",
    "Khajuraho Group": "KJR",
    "Amer Fort": "AMF",
    "Gol Gumbaz": "GGZ",
  };

  const code = SITE_CODES[b.name] || b.name.slice(0, 3).toUpperCase();
  const issueDate = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const passportNum = `HX-${b.id}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "340px",
        }}
      >
        {/* ── FRONT: Passport Cover ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border border-slate-200"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Background with light gradient */}
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 via-white to-slate-50/80" />
          {/* Security pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }}
          />

          <div className="relative z-10 p-7 flex flex-col h-full gap-4" style={{ minHeight: "340px" }}>
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[8px] text-blue-600 font-black uppercase tracking-[0.5em] mb-1">Heritage-X · Digital Passport</p>
                <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">Republic of Cultural India</p>
              </div>
              <div className="flex flex-col items-center gap-1 bg-blue-50 rounded-2xl px-4 py-2 border border-blue-100">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="text-[7px] font-black text-blue-600 uppercase tracking-widest">e-Pass</span>
              </div>
            </div>

            {/* Passport Photo + Info */}
            <div className="flex gap-5 items-center">
              <div className="w-20 h-24 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-lg shrink-0">
                <img
                  src={b.image}
                  className="w-full h-full object-cover"
                  alt={b.name}
                  onError={(e) => { (e.target as HTMLImageElement).src = "/assets/KONARK/konark_hero.png"; }}
                />
              </div>
              <div className="flex-1">
                <p className="text-[8px] text-blue-600 font-black uppercase tracking-[0.4em] mb-1">Heritage Site</p>
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight leading-tight">{b.name}</h3>
                <p className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-blue-600" /> {b.location}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-[8px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {b.status}
                  </span>
                  <span className="px-2.5 py-1 bg-blue-50 border border-blue-100 rounded-lg text-[8px] font-black text-blue-600 uppercase tracking-widest">{b.type}</span>
                </div>
              </div>
            </div>

            {/* Passport Details Grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Visit Date", value: b.date },
                { label: "Time Slot", value: b.time.split(" - ")[0] },
                { label: "Site Code", value: code },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[7px] text-blue-600 font-black uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{item.value}</p>
                </div>
              ))}
            </div>

            {/* MRZ Strip */}
            <div className="mt-auto bg-slate-100 rounded-xl p-3 border border-slate-200">
              <p className="text-[7px] font-mono text-slate-400 tracking-[0.35em] uppercase leading-relaxed">
                {`P<IND${b.name.toUpperCase().replace(/ /g, "<").slice(0, 20).padEnd(20, "<")}`}
              </p>
              <p className="text-[7px] font-mono text-slate-400 tracking-[0.35em] uppercase">
                {`${b.id}<<<${code}<<<${b.date.replace(/-/g, "")}<<<< `}
              </p>
            </div>

            <p className="text-[8px] text-slate-400 text-center font-mono tracking-widest">
              ↻ Click to view boarding pass
            </p>
          </div>
        </div>

        {/* ── BACK: Boarding Pass ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-full h-full bg-white flex flex-col" style={{ minHeight: "340px" }}>
            {/* Top: Blue header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[8px] text-blue-200 font-black uppercase tracking-widest">Heritage-X Passport</p>
                  <p className="text-sm font-black text-white uppercase tracking-tight">Boarding Pass</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[7px] text-blue-200 uppercase tracking-widest font-black">Pass Code</p>
                <p className="text-base font-black text-white font-mono">{code}</p>
              </div>
            </div>

            {/* Tear-off divider */}
            <div className="relative flex items-center px-4">
              <div className="flex-1 border-t border-dashed border-slate-300" />
              <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-slate-200 shrink-0 -ml-3 -mr-3 z-10" />
              <div className="flex-1 border-t border-dashed border-slate-300" />
            </div>

            {/* Middle: Flight info style */}
            <div className="px-5 py-4 flex gap-4 items-center justify-between">
              <div className="text-center">
                <p className="text-2xl font-black text-slate-900 font-mono">{code}</p>
                <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-0.5">Origin</p>
                <p className="text-[9px] font-bold text-slate-600 mt-0.5">Your Location</p>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="flex items-center gap-1 w-full">
                  <div className="h-[2px] flex-1 bg-slate-200" />
                  <Plane className="w-4 h-4 text-blue-500" />
                  <div className="h-[2px] flex-1 bg-slate-200" />
                </div>
                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-1">Heritage Journey</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-blue-600 font-mono">HX</p>
                <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-0.5">Destination</p>
                <p className="text-[9px] font-bold text-slate-600 mt-0.5 max-w-[80px] truncate">{b.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-0 border-t border-b border-slate-200 mx-5">
              {[
                { label: "Date", value: b.date },
                { label: "Gate", value: `T${(parseInt(b.id.replace(/\D/g, "")) % 9) + 1}` },
                { label: "Seat", value: `A${(parseInt(b.id.replace(/\D/g, "")) % 30) + 10}` },
                { label: "Departs", value: b.time.split(" - ")[0] },
                { label: "Class", value: "Heritage" },
                { label: "Pass ID", value: b.id },
              ].map((item, i) => (
                <div key={i} className={`py-3 px-2 ${i % 3 !== 2 ? "border-r border-slate-200" : ""}`}>
                  <p className="text-[7px] text-slate-400 font-black uppercase tracking-widest">{item.label}</p>
                  <p className="text-[10px] font-black text-slate-800 mt-0.5 uppercase truncate">{item.value}</p>
                </div>
              ))}
            </div>

            {/* QR code zone */}
            <div className="px-5 py-4 flex items-center gap-5">
              <div className="w-20 h-20 rounded-xl border-2 border-slate-200 flex items-center justify-center bg-slate-50 shrink-0 relative overflow-hidden">
                {/* Simulated QR */}
                <div className="grid grid-cols-7 gap-px w-14 h-14">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-sm"
                      style={{ background: Math.random() > 0.45 ? "#1e3a5f" : "transparent" }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Scan at entrance gate</p>
                <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{b.name}</p>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Verified — Ready to board</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-auto px-5 pb-4 flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onViewPass(b); }}
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                <QrCode className="w-3.5 h-3.5" /> View Full Pass
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-3 bg-slate-100 text-slate-600 rounded-xl border border-slate-200 hover:bg-slate-200 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-3 bg-slate-100 text-slate-600 rounded-xl border border-slate-200 hover:bg-slate-200 transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SovereignLedger: React.FC<SovereignLedgerProps> = ({
  myBookings,
  myPayments,
  onViewPass,
  aiInsight,
  insightLoading,
  onGetInsight,
}) => {
  const [activeTab, setActiveTab] = useState<"passports" | "financial">("passports");

  return (
    <div className="max-w-7xl mx-auto space-y-16 min-h-[80vh] relative">

      {/* Archaeological Background */}
      <div className="heritage-section-bg" style={{ backgroundImage: "url('/assets/Ajanta Caves/Sculptures-inside-the-rock-cut-caves-1.jpg')", opacity: 0.03, filter: "blur(40px) grayscale(1)" }} />

      {/* Header */}
      <header className="px-4 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div>
          <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none" style={{ color: "var(--text-strong)" }}>
            Sovereign <span className="text-blue-600">Ledger</span>
          </h2>
          <div className="text-[12px] text-slate-400 font-black uppercase tracking-[0.5em] mt-6 flex items-center gap-4">
            <div className="w-8 h-[2px] bg-blue-500" />
            Digital Heritage Passport System · Airport-Grade
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex p-2 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner self-start backdrop-blur-md">
          <button
            onClick={() => setActiveTab("passports")}
            className={`px-10 py-5 rounded-3xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === "passports" ? "bg-blue-600 text-white shadow-2xl scale-105" : "text-slate-400 hover:text-blue-600"}`}
          >
            <span className="flex items-center gap-2"><Fingerprint className="w-4 h-4" /> Passports</span>
          </button>
          <button
            onClick={() => setActiveTab("financial")}
            className={`px-10 py-5 rounded-3xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === "financial" ? "bg-blue-600 text-white shadow-2xl scale-105" : "text-slate-400 hover:text-blue-600"}`}
          >
            <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Financials</span>
          </button>
        </div>
      </header>

      {/* AI Insight Bar */}
      <div className="px-4">
        <div className="bg-white/80 backdrop-blur-xl border border-blue-100 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
            <BrainCircuit className="w-32 h-32 text-blue-600" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <button
              onClick={onGetInsight}
              disabled={insightLoading}
              className="shrink-0 w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/20 hover:scale-110 active:scale-95 transition-all border border-blue-500"
            >
              {insightLoading ? <Loader2 className="w-9 h-9 text-white animate-spin" /> : <BrainCircuit className="w-9 h-9 text-white" />}
            </button>
            <div>
              <h4 className="text-lg font-black text-slate-950 italic uppercase tracking-widest mb-1.5">Neural Strategy Insight</h4>
              <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                {aiInsight || "System standby. Click to initiate strategic cultural analysis based on your current ledger activity."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        {activeTab === "passports" ? (
          <div>
            {/* Stats banner */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { label: "Active Passes", value: myBookings.length, icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
                { label: "Sites Visited", value: myBookings.filter(b => b.status === "Confirmed").length, icon: Stamp, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
                { label: "Heritage Points", value: myBookings.length * 250, icon: Star, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
              ].map((s) => (
                <div key={s.label} className={`flex items-center gap-4 p-5 rounded-2xl border ${s.bg}`}>
                  <s.icon className={`w-8 h-8 ${s.color} shrink-0`} />
                  <div>
                    <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Passport Cards Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {myBookings.map((b) => (
                <PassportCard key={b.id} b={b} onViewPass={onViewPass} />
              ))}
              {myBookings.length === 0 && (
                <div className="xl:col-span-2 py-40 border-4 border-dashed border-slate-100 rounded-4xl flex flex-col items-center justify-center text-slate-200">
                  <Fingerprint className="w-24 h-24 mb-6 opacity-20" />
                  <p className="text-xl font-black uppercase tracking-[0.6em]">No Active Passports</p>
                  <p className="text-sm text-slate-400 mt-2">Book a heritage site visit to issue your first digital passport</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {myPayments.map((p) => (
              <div key={p.id} className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-4xl p-10 flex flex-col md:flex-row items-center justify-between gap-10 hover:border-emerald-500 hover:shadow-2xl transition-all shadow-sm group relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1.5 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-4xl" />
                <div className="flex items-center gap-10">
                  <div className="w-24 h-24 rounded-4xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 transition-all shadow-inner">
                    <CreditCard className="w-10 h-10 transition-transform duration-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 font-mono opacity-60">TX_AUTH_ID: {p.id}</p>
                    <h4 className="text-3xl font-black text-slate-950 italic uppercase tracking-tighter">Authorized Ledger Sync</h4>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-2 flex items-center gap-4">
                      <span className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-blue-600" /> {p.method} Node</span>
                      <span className="opacity-20">|</span>
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> {p.date}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-16">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-60 italic">Magnitude</p>
                    <p className="text-4xl font-black text-slate-950 italic tracking-tighter">{p.amount}</p>
                  </div>
                  <div className="px-10 py-5 bg-emerald-50 text-emerald-600 rounded-3xl text-[12px] font-black uppercase tracking-[0.3em] border border-emerald-100 shadow-sm flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    {p.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
