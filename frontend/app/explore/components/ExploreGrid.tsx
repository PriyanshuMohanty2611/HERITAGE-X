"use client";

import React from "react";
import { 
  Navigation2, ShieldCheck, Eye, Camera, Star, Clock, MapPin
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
    <div className="flex flex-col gap-12">
      <div className="heritage-section-bg" style={{ backgroundImage: "url('/assets/Taj Mahal/gettyimages-155096944-612x612.jpg')", opacity: 0.03, filter: "blur(80px) grayscale(1)" }} />

      <header className="px-4 space-y-4">
        <h1 className="text-7xl font-black tracking-tighter mb-2 italic uppercase leading-none" style={{ color: "var(--text-strong)" }}>
          Imperative <span className="text-blue-600">Access</span>
        </h1>
        <div className="flex items-center gap-6 text-[11px] text-slate-500 uppercase tracking-[0.4em] font-black bg-white/50 backdrop-blur-sm w-fit py-2 px-4 rounded-full border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
            Live Node: Active
          </div>
          <span className="opacity-20 text-slate-300">|</span>
          <span>Global Portal Interface v5.0</span>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8 px-4">
        <div className="col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {monuments.map(m => (
              <div key={m.id} className="p-8 rounded-[3rem] bg-white border border-slate-200 hover:border-blue-500 hover:shadow-[0_40px_100px_rgba(59,130,246,0.15)] transition-all group overflow-hidden relative shadow-sm flex flex-col h-full min-h-[620px]">
                
                {/* Header: Name and Quick Actions */}
                <div className="flex justify-between items-start mb-8 h-20">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                       <MapPin className="w-3 h-3 text-blue-500" />
                       <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.4em] truncate">Sovereign Node</p>
                    </div>
                    <h3 className="font-black uppercase tracking-tighter text-3xl group-hover:text-blue-600 transition-colors line-clamp-1 italic" style={{ color: "var(--text-strong)" }}>{m.name}</h3>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button onClick={() => onOpenDetail(m)} className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-950 hover:text-white transition-all shadow-sm active:scale-90 border border-slate-200 flex items-center justify-center">
                       <Eye className="w-6 h-6" />
                    </button>
                    <button onClick={() => { onSelectMonument(m); onShowSpidercam(true); }} className="w-14 h-14 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-xl active:scale-90 shadow-blue-600/20 border border-blue-500 flex items-center justify-center">
                       <Navigation2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Main Media Zone */}
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
                  <div className="absolute top-4 right-4 z-10">
                     <div className="px-4 py-2 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/20 flex items-center gap-2">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-black text-white italic">9.8 Rank</span>
                     </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       <p className="text-[10px] font-black text-white uppercase tracking-[0.4em] font-mono">Status: Authenticated</p>
                    </div>
                  </div>
                </div>

                {/* Descriptive Meta - Fixed Alignment */}
                <div className="mt-8 flex items-center justify-between px-2">
                   <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest italic">Best Time: 06:30 AM</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter underline underline-offset-4 decoration-emerald-500/30">Verified Node</span>
                   </div>
                </div>

                {/* Action Section - Using Perfect Alignment Protocol */}
                <div className="mt-8 flex items-center justify-between pt-8 border-t border-slate-100">
                  <button onClick={() => onOpenGallery(m)} className="text-[11px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-4 hover:text-blue-600 transition-all group/gal py-2">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover/gal:bg-blue-600 group-hover/gal:shadow-2xl transition-all border border-slate-100 group-hover/gal:border-blue-500">
                      <Camera className="w-6 h-6 text-slate-400 group-hover/gal:text-white transition-colors" />
                    </div>
                    Visual Archive
                  </button>
                  
                  <button 
                    onClick={() => { onSelectMonument(m); onHandleBookingStart(m); }} 
                    className="btn-perfect-align bg-blue-600 hover:bg-slate-950 text-white rounded-2xl shadow-xl shadow-blue-500/20 border-none group/pass"
                  >
                    <span className="btn-icon-box group-hover/pass:rotate-12 transition-transform">
                      <ShieldCheck className="w-5 h-5" />
                    </span>
                    <span className="btn-text">Access Pass</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
