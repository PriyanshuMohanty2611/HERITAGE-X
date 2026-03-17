"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Camera, PlaySquare, ShieldCheck, BrainCircuit, Loader2 } from "lucide-react";
import { Monument } from "../types";

const MapComponent: any = dynamic(() => import("../../../components/MapComponent"), { ssr: false });

interface SpidercamViewProps {
  selectedMonument: Monument;
  onOpenGallery: (m: Monument) => void;
  getAiSuggestion: () => void;
  aiLoading: boolean;
  aiSuggestion: string | null;
  onHandleBookingStart: (type: string) => void;
}

export const SpidercamView: React.FC<SpidercamViewProps> = ({
  selectedMonument,
  onOpenGallery,
  getAiSuggestion,
  aiLoading,
  aiSuggestion,
  onHandleBookingStart
}) => {
  return (
    <div className="grid grid-cols-12 gap-10 min-h-full px-4 animate-in fade-in zoom-in duration-700">
      {/* Visual Background Asset */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[-1]">
         <img src={selectedMonument.image} className="w-full h-full object-cover grayscale blur-3xl scale-110" alt="bg blur" />
      </div>

      {/* Part 1: Neural Map (Spans 5/12) - High Contrast Dark Mode Box */}
      <div className="col-span-12 xl:col-span-5 rounded-[3.5rem] border border-slate-950 bg-slate-950 shadow-[0_40px_100px_rgba(0,0,0,0.2)] overflow-hidden relative min-h-[500px] lg:min-h-[700px] group">
        <div className="absolute top-10 left-10 z-20 bg-white/10 backdrop-blur-3xl px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
          <p className="text-[10px] text-blue-400 uppercase tracking-[0.4em] font-black mb-1">Vector 01: Neural Matrix</p>
          <p className="text-xl font-black text-white tracking-tight italic uppercase">{selectedMonument.name}</p>
        </div>
        <div className="w-full h-full grayscale hover:grayscale-0 transition-all duration-1000 opacity-80 hover:opacity-100">
          <MapComponent activeLocation={{ coords: selectedMonument.coords }} />
        </div>

        {/* Interactive Image Gallery Overlay */}
        <div className="absolute bottom-10 left-10 right-10 z-20 flex gap-4 overflow-x-auto p-5 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl scrollbar-hide">
          {selectedMonument.gallery?.map((img, i) => (
            <div key={i} onClick={() => onOpenGallery(selectedMonument)} className="w-32 h-20 rounded-2xl overflow-hidden border-2 border-white/10 shrink-0 cursor-pointer group/item hover:scale-105 hover:border-blue-500 transition-all relative">
              <img
                src={img}
                className="w-full h-full object-cover group-hover/item:brightness-110 transition-all"
                alt="Archive"
              />
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover/item:opacity-100 transition-opacity" />
            </div>
          ))}
          <div onClick={() => onOpenGallery(selectedMonument)} className="w-24 h-20 rounded-2xl bg-blue-600/20 border-2 border-blue-500/30 flex flex-col items-center justify-center shrink-0 cursor-pointer hover:bg-blue-600 transition-all group/matrix shadow-2xl">
            <Camera className="w-7 h-7 text-blue-400 group-hover:text-white mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-black text-blue-400 group-hover:text-white uppercase tracking-tighter">Photos</span>
          </div>
        </div>
      </div>

      {/* Part 2: Spidercam 3D View (Spans 4/12) - White Theme/Glass Look */}
      <div className="col-span-12 xl:col-span-4 rounded-[3.5rem] overflow-hidden relative shadow-2xl border border-slate-200 bg-white group p-4 flex flex-col gap-4">
        <div className="absolute top-10 left-10 z-20 backdrop-blur-2xl px-6 py-3 rounded-2xl border border-slate-100 bg-white/80 shadow-xl">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] font-black mb-1">Vector 02: 3D Scan</p>
          <p className="text-sm font-black text-slate-950 tracking-tight italic uppercase">Live Spatial Feed</p>
        </div>
        
        <div className="flex-1 rounded-[3rem] overflow-hidden relative bg-slate-50 border border-slate-100">
           <iframe
            src={`https://www.google.com/maps?q=${selectedMonument.query}&t=k&z=19&output=embed`}
            className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-all"
            allowFullScreen
            title="3D Scan Feed"
          />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-500/50 shadow-[0_0_20px_#3b82f6] animate-[scanline_4s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-blue-500/5 rounded-full animate-ping" />
          </div>
        </div>

        <div className="p-8 bg-slate-950 rounded-[2.5rem] flex items-center justify-between group-hover:shadow-2xl transition-all">
           <div>
             <p className="text-[9px] text-blue-400 font-black uppercase tracking-[0.3em]">Stability</p>
             <p className="text-xl font-black text-white italic tracking-tighter">99.8% SYNC</p>
           </div>
           <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-150" />
           </div>
        </div>
      </div>

      {/* Logistics Panel (Spans 3/12) */}
      <div className="col-span-12 xl:col-span-3 flex flex-col gap-10">
        {/* Heritage Feed Box - Dark Contrast */}
        <div className="p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group border border-slate-800 bg-slate-950 transition-all flex flex-col flex-1">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-all" />
          
          <h3 className="font-black uppercase tracking-[0.5em] text-[11px] mb-8 flex items-center gap-5 text-white">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-xl"><PlaySquare className="w-6 h-6 text-blue-400" /></div>
            Heritage Feed
          </h3>

          <div className="rounded-[2.5rem] overflow-hidden aspect-video bg-black border border-white/5 mb-10 shadow-2xl relative group/video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedMonument.videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`}
              className="w-full h-full opacity-80 group-hover/video:opacity-100 transition-opacity"
              allowFullScreen
              title="Heritage Video Feed"
            />
          </div>

          <div className="space-y-4 mt-auto">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.5em] mb-4 text-center">Authorization Required</p>
            <button
              className="w-full bg-white text-slate-950 hover:bg-blue-600 hover:text-white py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95"
              onClick={() => onHandleBookingStart("Monument Visit")}
            >
              <ShieldCheck className="w-5 h-5" /> Secure Pass v2.5
            </button>
          </div>
        </div>

        {/* Neural Analysis Box - White/Light Modern */}
        <div className="p-10 rounded-[3.5rem] shadow-xl relative overflow-hidden group border border-slate-200 bg-white transition-all">
          <h3 className="font-black uppercase tracking-[0.5em] text-[11px] mb-8 flex items-center gap-5 text-slate-900 text-center justify-center">
            <div className="p-3 rounded-2xl bg-blue-50"><BrainCircuit className="w-6 h-6 text-blue-600" /></div>
            Intelligence
          </h3>
          <p className="text-[12px] font-black text-slate-400 mb-10 leading-relaxed uppercase tracking-tighter text-center opacity-70">Automated structural analysis & predictive historical modeling.</p>

          <button onClick={getAiSuggestion} disabled={aiLoading} className="w-full py-5 bg-slate-950 hover:bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95">
            {aiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
            Query Analysis
          </button>
          
          {aiSuggestion && (
            <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-3xl text-[13px] font-bold leading-relaxed text-slate-700 animate-in slide-in-from-top-4 italic shadow-inner">
              <span className="text-blue-600 mr-2">●</span> {aiSuggestion}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
