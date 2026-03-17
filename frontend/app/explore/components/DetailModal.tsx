"use client";

import React from "react";
import { 
  X, MapPin, Compass, Utensils, AlertCircle, 
  User, Star, ExternalLink, ShieldCheck, Phone,
  MessageSquare, UserCheck, Check
} from "lucide-react";
import { Monument } from "../types";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  monument: Monument;
  activeTab: "info" | "guides" | "itinerary" | "food";
  setActiveTab: (tab: "info" | "guides" | "itinerary" | "food") => void;
  onHandleBookingStart: (type: string, data?: any) => void;
  guides: any[];
  itineraries: any;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  monument,
  activeTab,
  setActiveTab,
  onHandleBookingStart,
  guides,
  itineraries
}) => {
  if (!isOpen || !monument) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 lg:p-16 bg-white/95 backdrop-blur-3xl animate-in fade-in duration-700 overflow-y-auto scrollbar-hide">
      
      {/* Background Decorative Sculpture */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-[-1] overflow-hidden">
         <img src={monument.image} className="w-full h-full object-cover grayscale" alt="decoration" />
      </div>

      <div className="w-full max-w-7xl flex flex-col gap-12 py-10">
        
        {/* Modal Navigation - Floating Premium Bar */}
        <div className="flex justify-between items-center sticky top-0 z-50 px-4">
           <div className="flex gap-4 p-2.5 bg-slate-950/90 rounded-[2.5rem] border border-white/10 w-fit backdrop-blur-3xl shadow-2xl">
            <button onClick={() => setActiveTab("info")} className={`px-10 py-4 rounded-[1.8rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'info' ? 'bg-white text-slate-950 shadow-xl scale-105' : 'text-slate-400 hover:text-white'}`}>Intelligence</button>
            <button onClick={() => setActiveTab("food")} className={`px-10 py-4 rounded-[1.8rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'food' ? 'bg-white text-slate-950 shadow-xl scale-105' : 'text-slate-400 hover:text-white'}`}>Local Food</button>
            <button onClick={() => setActiveTab("guides")} className={`px-10 py-4 rounded-[1.8rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'guides' ? 'bg-white text-slate-950 shadow-xl scale-105' : 'text-slate-400 hover:text-white'}`}>Elite Guides</button>
            <button onClick={() => setActiveTab("itinerary")} className={`px-10 py-4 rounded-[1.8rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'itinerary' ? 'bg-white text-slate-950 shadow-xl scale-105' : 'text-slate-400 hover:text-white'}`}>Smart Tours</button>
          </div>

          <button
            onClick={onClose}
            className="w-16 h-16 rounded-[1.8rem] bg-slate-950 text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-2xl group border border-white/5 active:scale-95"
          >
            <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>

        <div className="flex-1 animate-in slide-in-from-bottom-8 duration-1000">
          {activeTab === 'info' && (
            <div className="relative rounded-[4rem] overflow-hidden border border-slate-200 shadow-[0_60px_100px_rgba(0,0,0,0.1)] min-h-[700px] flex flex-col justify-end bg-white group/info">
              <div className="absolute inset-0">
                <img src={monument.image} className="w-full h-full object-cover grayscale transition-all duration-[10s] group-hover/info:scale-105 group-hover/info:grayscale-0" alt={monument.name} />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
              </div>
              
              <div className="relative p-12 lg:p-24 grid grid-cols-12 gap-16 items-end">
                <div className="col-span-12 lg:col-span-7 space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600 flex items-center justify-center shadow-xl border border-white/20">
                      <Compass className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-1">
                       <p className="text-xs font-black uppercase tracking-[0.5em] text-blue-400">Node Archive ID: {monument.id}</p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-white/40 font-mono">Status: SECURE_ARCHIVE_ACCESSED</p>
                    </div>
                  </div>
                  <h2 className="text-7xl lg:text-9xl font-black text-white italic uppercase tracking-tighter leading-none mb-4">{monument.name}</h2>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-white">Verified Site</span>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-white">{monument.query?.split("+").join(" ")}</span>
                    </div>
                  </div>
                  <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-3xl italic opacity-90 drop-shadow-lg">
                    {monument.history}
                  </p>
                </div>

                <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-6">
                  <div className="p-8 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 group hover:border-blue-500/50 transition-all flex flex-col justify-between min-h-[160px]">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Architecture Style</p>
                    <p className="text-lg font-black text-white uppercase italic tracking-tighter">{monument.architecture}</p>
                  </div>
                  <div className="p-8 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 group hover:border-blue-500/50 transition-all flex flex-col justify-between min-h-[160px]">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Prime Access Node</p>
                    <p className="text-lg font-black text-white uppercase italic tracking-tighter">{monument.bestTime}</p>
                  </div>
                  <button onClick={() => onHandleBookingStart("Monument Visit")} className="col-span-2 py-8 bg-white text-slate-950 rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.5em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 border-none">
                    Synchronize Access Pass
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'food' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-16">
              {monument.foodIntel?.map((food, i) => (
                <div key={i} className="bg-white p-12 rounded-[4rem] shadow-xl border border-slate-100 group hover:border-orange-500 hover:shadow-2xl transition-all relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-50/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-20 h-20 rounded-[2rem] bg-orange-50 flex items-center justify-center mb-10 border border-orange-100 group-hover:scale-110 group-hover:bg-orange-600 transition-all shadow-sm">
                    <Utensils className="w-10 h-10 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-4xl font-black text-slate-950 uppercase tracking-tighter mb-3 italic">{food.item}</h4>
                  <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.3em] mb-10 border-b border-slate-100 pb-6">{food.spot}</p>
                  <div className="flex justify-between items-center bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Est. Allocation</span>
                    <span className="text-3xl font-black text-orange-600 italic tracking-tighter">{food.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'guides' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
              {guides.map((guide) => (
                <div key={guide.id} className="bg-slate-950 p-10 rounded-[4rem] border border-slate-800 shadow-2xl group hover:border-blue-500/50 transition-all flex flex-col items-center text-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-5">
                      <UserCheck className="w-32 h-32 text-blue-400" />
                   </div>
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-10 border-8 border-white/5 shadow-2xl group-hover:scale-105 transition-transform group-hover:border-blue-500/30">
                    <img src={guide.img} className="w-full h-full object-cover" alt={guide.name} />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{guide.name}</h4>
                    {guide.verified && <div className="p-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"><Check className="w-3 h-3 text-white" /></div>}
                  </div>
                  <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.4em] mb-8 font-mono">{guide.exp} EXPERIENCE</p>
                  <div className="flex gap-2 mb-10">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform" />)}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed font-bold mb-10 italic uppercase tracking-tighter opacity-80">"{guide.bio}"</p>
                  <button onClick={() => onHandleBookingStart("Guided Tour", guide)} className="w-full py-6 bg-white/5 border border-white/10 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-slate-950 transition-all active:scale-95 shadow-xl">Contact Guide</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pb-16">
              {/* Budget Mode */}
              <div className="p-12 rounded-[5rem] bg-white border border-slate-200 shadow-xl space-y-12 relative overflow-hidden group hover:border-emerald-500 transition-all">
                 <div className="absolute top-0 right-0 p-12 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-50" />
                 <div className="flex justify-between items-center relative z-10 border-b border-slate-100 pb-10">
                    <div>
                      <h4 className="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">Value <span className="text-emerald-500">Circuit</span></h4>
                      <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.4em] mt-3">Elite Efficiency / Optimized Access</p>
                    </div>
                    <div className="px-8 py-3 bg-emerald-500 text-[13px] font-black text-white rounded-full shadow-2xl tracking-tighter italic">₹290 TOTAL</div>
                 </div>
                 <div className="space-y-10 relative z-10">
                    {itineraries.budget.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-10 items-start group/step">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981] group-hover/step:scale-125 transition-transform" />
                          {idx !== itineraries.budget.length - 1 && <div className="w-0.5 h-20 bg-slate-100" />}
                        </div>
                        <div className="flex-1 pb-10 group-last/step:pb-0">
                          <p className="text-[11px] text-emerald-500 font-black font-mono tracking-[0.3em] mb-2">{item.time}</p>
                          <p className="text-lg font-black text-slate-900 uppercase mb-3 group-hover/step:text-emerald-600 transition-colors tracking-tight italic">{item.task}</p>
                          <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 uppercase tracking-[0.2em]">{item.cost}</span>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Luxury Mode */}
              <div className="p-12 rounded-[5rem] bg-slate-950 border border-slate-800 shadow-2xl space-y-12 relative overflow-hidden group hover:border-blue-500 transition-all">
                 <div className="absolute top-0 right-0 p-12 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
                 <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-10">
                    <div>
                      <h4 className="text-4xl font-black text-white uppercase italic tracking-tighter">Elite <span className="text-blue-500">Matrix</span></h4>
                      <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.4em] mt-3">VIP Priority / Private Spatial Feed</p>
                    </div>
                    <div className="px-8 py-3 bg-blue-600 text-[13px] font-black text-white rounded-full shadow-2xl tracking-tighter italic">₹4100 TOTAL</div>
                 </div>
                 <div className="space-y-10 relative z-10">
                    {itineraries.luxury.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-10 items-start group/step">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_#3b82f6] group-hover/step:scale-125 transition-transform" />
                          {idx !== itineraries.luxury.length - 1 && <div className="w-0.5 h-20 bg-white/5" />}
                        </div>
                        <div className="flex-1 pb-10 group-last/step:pb-0">
                          <p className="text-[11px] text-blue-400 font-black font-mono tracking-[0.3em] mb-2">{item.time}</p>
                          <p className="text-lg font-black text-white uppercase mb-3 group-hover/step:text-blue-500 transition-colors tracking-tight italic">{item.task}</p>
                          <span className="text-[10px] font-black text-slate-500 bg-white/5 px-4 py-2 rounded-xl border border-white/5 uppercase tracking-[0.2em]">{item.cost}</span>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

          <div className="pt-24 text-center pb-32">
             <button onClick={onClose} className="px-32 py-8 bg-slate-950 text-white font-black uppercase text-[13px] tracking-[0.8em] rounded-[3rem] hover:bg-red-600 transition-all shadow-2xl hover:scale-105 active:scale-90 border-none"> DEACTIVATE INTELLIGENCE LINK </button>
          </div>
        </div>
      </div>
    </div>
  );
};
