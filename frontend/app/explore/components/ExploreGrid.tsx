"use client";

import React from "react";
import { 
  Navigation2, ShieldCheck, Eye, Camera, 
  ScanSearch, Sparkles, Globe, ChevronRight 
} from "lucide-react";
import { Monument } from "../types";

interface ExploreGridProps {
  monuments: Monument[];
  onSelectMonument: (m: Monument) => void;
  onShowSpidercam: (show: boolean) => void;
  onHandleBookingStart: (m: Monument) => void;
  onOpenDetail: (m: Monument) => void;
  onOpenGallery: (m: Monument) => void;
}

export const ExploreGrid: React.FC<ExploreGridProps> = ({
  monuments,
  onSelectMonument,
  onShowSpidercam,
  onHandleBookingStart,
  onOpenDetail,
  onOpenGallery
}) => {
  if (monuments.length === 0) return null;

  return (
    <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Background Decorative Sculpture (Blurred/Transparent) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] opacity-5 pointer-events-none z-[-1] blur-2xl">
         <img src="/assets/KONARK/konark_hero.png" className="w-full h-full object-contain grayscale" alt="background deco" />
      </div>

      <header className="px-4 space-y-4">
        <h1 className="text-7xl font-black tracking-tighter text-slate-900 mb-2 italic uppercase leading-none">
          Imperative <span className="text-blue-600">Access</span>
        </h1>
        <div className="flex items-center gap-6 text-[11px] text-slate-500 uppercase tracking-[0.4em] font-black bg-white/50 backdrop-blur-sm w-fit py-2 px-4 rounded-full border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
            Live Node: Active
          </div>
          <span className="opacity-20 text-slate-300">|</span>
          <span>Global Portal Interface v5.0</span>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8 px-4">
        {/* Left Column: Featured & Secondary Listings */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-10">
          
          {/* Featured Card - Modern Premium Look */}
          <div className="rounded-[3rem] overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.1)] relative border border-slate-200 bg-slate-900 aspect-video lg:aspect-[21/9] flex flex-col justify-end">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-105"
              style={{ backgroundImage: `url('${monuments[0].image}')` }}
            >
              <div className="w-full h-full bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>
            
            <div className="absolute inset-0 p-10 lg:p-16 flex flex-col justify-end z-10">
              <div className="flex flex-col items-start gap-6">
                <span className="px-6 py-2 bg-blue-600 text-white text-[10px] font-black tracking-widest uppercase rounded-2xl shadow-2xl border border-blue-500/50">Primary Node: Cultural Apex</span>
                <h2 className="text-5xl lg:text-8xl font-black text-white drop-shadow-2xl tracking-tighter uppercase italic leading-none">{monuments[0].name}</h2>
                <div className="flex flex-wrap gap-4 mt-8">
                  <button onClick={() => { onSelectMonument(monuments[0]); onShowSpidercam(true); }} className="flex items-center justify-center gap-4 bg-white text-slate-950 px-12 py-6 rounded-[2rem] font-black tracking-widest text-[11px] uppercase hover:bg-blue-600 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95">
                    <Navigation2 className="w-5 h-5" /> Initiate Scan
                  </button>
                  <button onClick={() => { onSelectMonument(monuments[0]); onHandleBookingStart(monuments[0]); }} className="flex items-center justify-center gap-4 bg-slate-950/50 backdrop-blur-3xl border border-white/20 text-white px-12 py-6 rounded-[2rem] font-black tracking-widest text-[11px] uppercase hover:bg-white hover:text-slate-950 transition-all shadow-2xl hover:scale-105 active:scale-95">
                    <ShieldCheck className="w-5 h-5 text-blue-400" /> Secure Access
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Cards Grid - Light Theme with Dark Elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {monuments.slice(1).map(m => (
              <div key={m.id} className="p-8 rounded-[3.5rem] bg-white border border-slate-200 hover:border-blue-500 hover:shadow-[0_30px_70px_rgba(59,130,246,0.15)] transition-all group overflow-hidden relative shadow-sm flex flex-col h-full min-h-[550px]">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-[10px] text-blue-600 font-black uppercase mb-1 tracking-[0.4em]">Strategic Hub</p>
                    <h3 className="font-black text-slate-900 uppercase tracking-tighter text-3xl group-hover:text-blue-600 transition-colors line-clamp-1 italic">{m.name}</h3>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => onOpenDetail(m)} className="p-4 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-950 hover:text-white transition-all shadow-sm active:scale-90 border border-slate-200">
                      <Eye className="w-6 h-6" />
                    </button>
                    <button onClick={() => { onSelectMonument(m); onShowSpidercam(true); }} className="p-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-xl active:scale-90 shadow-blue-600/20 border border-blue-500">
                      <Navigation2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div
                  onClick={() => onOpenDetail(m)}
                  className="relative flex-1 rounded-[2.5rem] overflow-hidden cursor-pointer group/img border border-slate-100 shadow-inner bg-slate-50"
                >
                  <img
                    src={m.image}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[6s] group-hover/img:scale-110"
                    alt={m.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/KONARK/download (1).jpg";
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col gap-3">
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.5em] font-mono">Status: Verified</p>
                    <div className="w-20 h-1.5 bg-white/20 rounded-full overflow-hidden">
                       <div className="w-full h-full bg-blue-500 animate-[progress_2s_ease-out]" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-8 border-t border-slate-100">
                  <button onClick={() => onOpenGallery(m)} className="text-[11px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-4 hover:text-blue-600 transition-all group/gal">
                    <div className="p-3 rounded-2xl bg-slate-50 group-hover/gal:bg-blue-50 transition-all"><Camera className="w-5 h-5 text-blue-500" /></div>
                    Visual Archive
                  </button>
                  <button onClick={() => { onSelectMonument(m); onHandleBookingStart(m); }} className="py-4 px-8 bg-slate-950 hover:bg-blue-600 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-slate-900/10">
                    Access Pass -$15
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Scan Matrix (Dark Box Style) */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-10">
          <div className="p-10 border border-slate-200 bg-white shadow-[0_40px_80px_rgba(0,0,0,0.06)] rounded-[3.5rem] flex flex-col h-full max-h-[1000px]">
            <h3 className="font-black text-[12px] text-slate-900 uppercase tracking-[0.5em] mb-10 pb-6 border-b border-slate-100 flex items-center gap-5">
              <ScanSearch className="w-6 h-6 text-blue-600" /> Scan Matrix
            </h3>

            {/* VR Entry - Dark/Contrast Box */}
            <div className="mb-10 p-8 rounded-[2.5rem] bg-slate-950 shadow-2xl shadow-blue-900/20 group cursor-pointer hover:scale-[1.02] transition-all relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-150 transition-transform duration-[10s]">
                <Sparkles className="w-40 h-40 text-blue-400" />
              </div>
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-600/40">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-4 py-1.5 bg-white/10 rounded-full text-[9px] font-black text-white uppercase tracking-[0.2em] border border-white/10 backdrop-blur-md">Active Simulation</span>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">Launch <span className="text-blue-400">VR Matrix</span></h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Immersive 3D Heritage Tours</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-6 border-t border-white/5">
                  <span className="text-[11px] font-black text-white/50 uppercase tracking-widest flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" /> Live Node
                  </span>
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all">
                    <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide space-y-4">
              {monuments.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => { onSelectMonument(m); onShowSpidercam(true); }}
                  className="w-full text-left p-5 rounded-3xl border border-slate-50 bg-slate-50 hover:bg-white hover:shadow-2xl hover:border-blue-200 transition-all flex justify-between items-center group/item animate-in slide-in-from-right duration-500"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-cover bg-center border border-slate-200 group-hover/item:scale-110 transition-transform shadow-md" style={{ backgroundImage: `url('${m.image}')` }} />
                    <div>
                      <p className="text-slate-950 font-black text-sm tracking-tight uppercase mb-1">{m.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_#10b981]" />
                        <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">Sync Active</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center group-hover/item:bg-slate-950 group-hover/item:text-white transition-all shadow-sm">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Elite Access Box - High Contrast Dark */}
          <div className="p-10 bg-slate-950 rounded-[3.5rem] shadow-2xl relative overflow-hidden group cursor-pointer mt-auto border border-white/5 shadow-blue-900/10">
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-8 shadow-inner">
                <ShieldCheck className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-white font-black uppercase tracking-[0.3em] text-lg mb-3">Guardian <span className="text-blue-500">Pro</span></h4>
              <p className="text-slate-400 text-[11px] leading-relaxed font-bold uppercase tracking-widest opacity-80 mb-8 max-w-[240px]">Upgrade to Elite Access for 8K drone synchronization and neural historical reconstruction.</p>
              <button className="w-full py-5 bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl">Enable Elite Link</button>
            </div>
            <div className="absolute top-0 right-0 p-10">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_#3b82f6]" />
            </div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] group-hover:bg-blue-600/20 transition-all duration-1000" />
          </div>
        </div>
      </div>
    </div>
  );
};
