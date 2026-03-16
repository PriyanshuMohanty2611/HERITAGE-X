"use client";

import { 
  Instagram, Facebook, Mail, Zap, Globe, 
  MapPin, Phone, ShieldCheck, Heart, ArrowUp
} from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-20 border-t border-white/5 bg-slate-950/50 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-amber-500/5 pointer-events-none" />
      
      <div className="max-w-[1700px] mx-auto px-10 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Brand Vector (4/12) */}
          <div className="md:col-span-12 lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4 group">
               <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:rotate-12 transition-transform shadow-2xl shadow-amber-500/10">
                  <Globe className="w-7 h-7" />
               </div>
               <div>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Heritage-X</h2>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Sovereign Intelligence Node</p>
               </div>
            </div>
            <p className="text-lg font-medium text-slate-400 italic leading-relaxed max-w-sm">
               "Empowering the future of cultural preservation through digitized intelligence and decentralized heritage matrices."
            </p>
            <div className="flex items-center gap-4 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
               <ShieldCheck className="w-4 h-4" /> 256-Bit GNC Encryption Active
            </div>
          </div>

          {/* Social Matrix (4/12) - Connect with us as requested */}
          <div className="md:col-span-6 lg:col-span-4 space-y-10">
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] flex items-center gap-4">
               Connect with us <div className="h-px flex-1 bg-white/5" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
               <div className="flex items-center gap-5 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-blue-600 transition-all shadow-xl">
                     <Mail className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-sm font-black text-white uppercase tracking-tight">Email</p>
                     <p className="text-[10px] text-slate-500 font-bold tracking-tight">indian-culture@gov.in</p>
                  </div>
               </div>
               <div className="flex items-center gap-5 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-pink-600 transition-all shadow-xl">
                     <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-sm font-black text-white uppercase tracking-tight">Instagram</p>
                     <p className="text-[10px] text-slate-500 font-bold tracking-tight">@indiancultureportal</p>
                  </div>
               </div>
               <div className="flex items-center gap-5 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-blue-800 transition-all shadow-xl">
                     <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-sm font-black text-white uppercase tracking-tight">Facebook</p>
                     <p className="text-[10px] text-slate-500 font-bold tracking-tight">@INDCulturePortal</p>
                  </div>
               </div>
               <div className="flex items-center gap-5 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-slate-800 transition-all shadow-xl">
                     <Zap className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-sm font-black text-white uppercase tracking-tight">X</p>
                     <p className="text-[10px] text-slate-500 font-bold tracking-tight">@_indianculture</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Quick Nodes (4/12) */}
          <div className="md:col-span-6 lg:col-span-4 space-y-10">
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] flex items-center gap-4">
               Navigation <div className="h-px flex-1 bg-white/5" />
            </h3>
            <div className="grid grid-cols-2 gap-4">
               {['Archives', 'Circuit Gen', 'Guide Hub', 'About Us', 'Jobs', 'Terms'].map(link => (
                  <button key={link} className="text-left py-2 text-[11px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2 group">
                     <div className="w-1 h-1 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                     {link}
                  </button>
               ))}
            </div>
            
            <div className="pt-10 space-y-6 border-t border-white/5">
               <button 
                 onClick={scrollToTop}
                 className="flex items-center gap-4 text-[10px] font-black text-amber-500 hover:text-white uppercase tracking-[0.3em] transition-all group"
               >
                  Back to Zenith <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
               </button>
            </div>
          </div>

        </div>

        {/* Binary Footer */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">
              © 2026 HERITAGE-X PLATFORM · INDIAN CULTURE INTEGRATION MODULE
           </p>
           <div className="flex items-center gap-8">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 Created with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by Antigravity Agency
              </p>
              <div className="flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[8px] font-black uppercase">
                 Verified Protocol
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}
