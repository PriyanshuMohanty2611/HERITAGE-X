"use client";

import React from "react";
import { MapPin, QrCode, Calendar, Clock, ChevronRight } from "lucide-react";
import { Booking } from "../types";

interface SovereignLedgerProps {
  myBookings: Booking[];
  onViewPass: () => void;
}

export const SovereignLedger: React.FC<SovereignLedgerProps> = ({ myBookings, onViewPass }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-[-1]">
         <img src="/assets/KONARK/konark_hero.png" className="w-full h-full object-contain grayscale" alt="decor" />
      </div>

      <header className="px-4">
        <h2 className="text-7xl font-black italic uppercase tracking-tighter text-slate-950 leading-none">
          Sovereign <span className="text-blue-600">Ledger</span>
        </h2>
        <p className="text-[12px] text-slate-400 font-black uppercase tracking-[0.5em] mt-6 flex items-center gap-4">
          <div className="w-8 h-[2px] bg-blue-500" />
          Active Nodes & Historical Passports
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 px-4">
        {myBookings.map((b) => (
          <div key={b.id} className="bg-white border border-slate-200 rounded-[4rem] p-10 hover:border-blue-500 hover:shadow-[0_50px_100px_rgba(0,0,0,0.08)] transition-all group relative overflow-hidden flex flex-col gap-10">
            
            {/* Unique sculpture background per card */}
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 scale-150 group-hover:scale-100 italic pointer-events-none">
               <img src={b.image} className="w-64 h-64 object-cover rounded-full grayscale" alt="bg" />
            </div>

            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-2xl group-hover:scale-105 transition-all duration-700">
                  <img src={b.image} className="w-full h-full object-cover group-hover:brightness-110" alt={b.name} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-100">{b.type}</span>
                    <span className="text-[10px] text-slate-400 font-bold font-mono tracking-widest">ID: {b.id}</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black text-slate-950 italic tracking-tighter uppercase leading-tight group-hover:text-blue-600 transition-colors">{b.name}</h3>
                  <p className="text-sm text-slate-500 mt-2 flex items-center gap-3 font-medium uppercase tracking-widest"><MapPin className="w-4 h-4 text-blue-500" /> {b.location}</p>
                </div>
              </div>
              <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${b.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full animate-pulse ${b.status === 'Confirmed' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                   {b.status}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 group-hover:bg-white transition-all shadow-inner">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                   <Calendar className="w-3.5 h-3.5" /> Temporal Sync
                </p>
                <p className="text-lg font-black text-slate-950 tracking-tight italic uppercase">{b.date}</p>
              </div>
              <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 group-hover:bg-white transition-all shadow-inner">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                   <Clock className="w-3.5 h-3.5" /> Node Access
                </p>
                <p className="text-lg font-black text-slate-950 tracking-tight italic uppercase">{b.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-slate-100 relative z-10">
              <button 
                onClick={onViewPass} 
                className="flex-1 flex items-center justify-center gap-4 bg-slate-950 text-white py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 hover:shadow-2xl transition-all shadow-xl active:scale-95 border-none group/btn"
              >
                <QrCode className="w-6 h-6 group-hover/btn:scale-110 transition-transform" /> View Neural Pass
              </button>
              <button className="p-6 rounded-[2rem] bg-white border border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all shadow-sm active:scale-90">
                <ChevronRight className="w-8 h-8 rotate-90" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {myBookings.length === 0 && (
         <div className="flex flex-col items-center justify-center py-40 gap-8 grayscale opacity-40">
            <div className="w-40 h-40 rounded-full border-8 border-slate-200 flex items-center justify-center">
               <MapPin className="w-20 h-20 text-slate-200" />
            </div>
            <p className="text-2xl font-black text-slate-400 uppercase tracking-[0.8em] italic">No Nodes Detected</p>
         </div>
      )}
    </div>
  );
};
