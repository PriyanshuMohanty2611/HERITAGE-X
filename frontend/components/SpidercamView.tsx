"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Camera, PlaySquare, ShieldCheck, BrainCircuit, Loader2, Bed, Star, ArrowUpRight } from "lucide-react";
import { Monument } from "../app/types";

const MapComponent: any = dynamic(() => import("./MapComponent"), { ssr: false });

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
    <div className="grid grid-cols-12 gap-10 min-h-full px-4">
      {/* Visual Background Asset */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[-1]">
         <img src={selectedMonument.image} className="w-full h-full object-cover grayscale blur-3xl scale-110" alt="bg blur" />
      </div>

      {/* Part 1: Neural Map (Spans 5/12) - Light Premium Look */}
      <div className="col-span-12 xl:col-span-5 rounded-[3.5rem] border border-slate-200 bg-white shadow-xl overflow-hidden relative min-h-[500px] lg:min-h-[700px] group">
        <div className="absolute top-10 left-10 z-20 bg-white/80 backdrop-blur-3xl px-6 py-3 rounded-2xl border border-slate-100 shadow-xl">
          <p className="text-[10px] text-blue-600 uppercase tracking-[0.4em] font-black mb-1">Vector 01: Neural Matrix</p>
          <p className="text-xl font-black text-slate-950 tracking-tight italic uppercase">{selectedMonument.name}</p>
        </div>
        <div className="w-full h-full opacity-90 hover:opacity-100 transition-opacity">
          <MapComponent activeLocation={{ coords: selectedMonument.coords }} />
        </div>

        {/* Interactive Image Gallery Overlay */}
        <div className="absolute bottom-10 left-10 right-10 z-20 flex gap-4 overflow-x-auto p-5 bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-slate-100 shadow-xl scrollbar-hide">
          {selectedMonument.gallery?.map((img, i) => (
            <div key={i} onClick={() => onOpenGallery(selectedMonument)} className="w-32 h-20 rounded-2xl overflow-hidden border-2 border-slate-100 shrink-0 cursor-pointer group/item hover:border-blue-500 transition-all relative">
              <img
                src={img}
                className="w-full h-full object-cover"
                alt="Archive"
              />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/item:opacity-100" />
            </div>
          ))}
          <div onClick={() => onOpenGallery(selectedMonument)} className="w-24 h-20 rounded-2xl bg-blue-50 border-2 border-blue-100 flex flex-col items-center justify-center shrink-0 cursor-pointer hover:bg-blue-600 transition-all group/matrix shadow-sm">
            <Camera className="w-7 h-7 text-blue-600 group-hover:text-white mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-black text-blue-600 group-hover:text-white uppercase tracking-tighter">Photos</span>
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
            className="w-full h-full border-none opacity-90 group-hover:opacity-100"
            allowFullScreen
            title="3D Scan Feed"
          />
          <div className="absolute inset-x-0 top-0 h-1 bg-blue-500/20" />
        </div>

        <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-between">
           <div>
             <p className="text-[9px] text-blue-600 font-black uppercase tracking-[0.3em]">Stability</p>
             <p className="text-xl font-black text-slate-950 italic tracking-tighter">99.8% SYNC</p>
           </div>
           <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-60" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-30" />
           </div>
        </div>
      </div>

      {/* Logistics Panel (Spans 3/12) */}
      <div className="col-span-12 xl:col-span-3 flex flex-col gap-10">
        {/* Heritage Feed Box - Light Premium */}
        <div className="p-10 rounded-[3.5rem] shadow-xl relative overflow-hidden group border border-slate-200 bg-white transition-all flex flex-col flex-1">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-[100px]" />
          
          <h3 className="font-black uppercase tracking-[0.5em] text-[11px] mb-8 flex items-center gap-5 text-slate-950">
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 shadow-sm"><PlaySquare className="w-6 h-6 text-blue-600" /></div>
            Heritage Feed
          </h3>

          <div className="rounded-[2.5rem] overflow-hidden aspect-video bg-slate-950 border border-slate-100 mb-10 shadow-xl relative group/video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedMonument.videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`}
              className="w-full h-full opacity-90 group-hover/video:opacity-100 transition-opacity"
              allowFullScreen
              title="Heritage Video Feed"
            />
          </div>

          <div className="space-y-4 mt-auto">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.5em] mb-4 text-center">Authorization Required</p>
            <button
              className="w-full bg-blue-600 text-white hover:bg-slate-950 py-6 rounded-4xl text-[11px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95 border-none"
              onClick={() => onHandleBookingStart("Monument Visit")}
            >
              <ShieldCheck className="w-5 h-5 text-white" /> Secure Pass v2.5
            </button>
          </div>
        </div>

        {/* Neural Analysis & Stay Matrix Box */}
        <div className="flex-1 flex flex-col gap-8">
           <div className="p-10 rounded-[3.5rem] shadow-xl relative overflow-hidden group border border-slate-200 bg-white transition-all">
             <h3 className="font-black uppercase tracking-[0.5em] text-[11px] mb-8 flex items-center gap-5 text-slate-900 border-b border-slate-50 pb-4">
               <div className="p-3 rounded-2xl bg-blue-50"><Bed className="w-6 h-6 text-blue-600" /></div>
               Stay Matrix
             </h3>
             <div className="space-y-4 max-h-[250px] overflow-y-auto scrollbar-hide pr-2">
                {selectedMonument.hotels?.map((hotel, i) => (
                   <div key={i} className="p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white transition-all group/hotel cursor-pointer">
                      <div className="flex gap-4">
                         <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                            <img src={hotel.img} className="w-full h-full object-cover group-hover/hotel:scale-110 transition-transform" />
                         </div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start">
                               <h4 className="text-[11px] font-black italic text-slate-950 uppercase">{hotel.name}</h4>
                               <div className="flex items-center gap-1">
                                  <Star className="w-2.5 h-2.5 text-orange-500 fill-orange-500" />
                                  <span className="text-[9px] font-black">{hotel.rating}</span>
                               </div>
                            </div>
                            <p className="text-[9px] text-slate-500 font-bold mt-1 line-clamp-1">{hotel.desc}</p>
                            <div className="flex items-center justify-between mt-2">
                               <span className="text-[10px] font-black text-blue-600">{hotel.price}<span className="text-[8px] text-slate-400">/night</span></span>
                               <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover/hotel:text-blue-600 transition-colors" />
                            </div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
           </div>

           <div className="p-10 rounded-[3.5rem] shadow-xl relative overflow-hidden group border border-slate-200 bg-white transition-all">
             <h3 className="font-black uppercase tracking-[0.5em] text-[11px] mb-8 flex items-center gap-5 text-slate-900 text-center justify-center">
               <div className="p-3 rounded-2xl bg-blue-50"><BrainCircuit className="w-6 h-6 text-blue-600" /></div>
               Intelligence
             </h3>
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
    </div>
  );
};
