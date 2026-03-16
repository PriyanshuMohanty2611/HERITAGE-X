"use client";

import { 
  User, LogOut, ShieldCheck, Grid, Library, 
  Gamepad2, History, Info, Briefcase, Instagram, 
  Facebook, Twitter, Linkedin, Monitor, Sun, 
  Contrast, Droplets, Link as LinkIcon, Type, 
  Move, ChevronRight, X, LayoutGrid, Zap, Globe, Mail, Menu,
  Box, Flame, Medal
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Link from "next/link";

export function TopHeader() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);

  // Accessibility States (Functional)
  const [contrast, setContrast] = useState(false);
  const [saturation, setSaturation] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [fontSize, setFontSize] = useState(100); // Percentage
  const [largeCursor, setLargeCursor] = useState(false);

  useEffect(() => {
    // Apply contrast
    document.documentElement.style.filter = contrast ? 'contrast(1.5)' : 'none';
    if (saturation) document.documentElement.style.filter += ' saturate(2)';
    
    // Apply Font Size
    document.documentElement.style.fontSize = `${fontSize}%`;

    // Apply Highlight Links
    const links = document.querySelectorAll('a, button');
    links.forEach(l => {
        if (highlightLinks) {
            (l as HTMLElement).style.outline = '2px solid #f59e0b';
            (l as HTMLElement).style.outlineOffset = '2px';
        } else {
            (l as HTMLElement).style.outline = 'none';
        }
    });

    // Apply Cursor
    document.documentElement.style.cursor = largeCursor ? 'crosshair' : 'default';

  }, [contrast, saturation, highlightLinks, fontSize, largeCursor]);

  return (
    <div className="flex items-center gap-4 relative">
      {/* ─── Accessibility Trigger (Screenshot 1 Style) ─── */}
      <button 
        onClick={() => setShowAccessibility(!showAccessibility)}
        className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 hover:bg-amber-500/20 transition-all group"
      >
        <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Accessibility</span>
      </button>

      {/* ─── Global Secure Indicator ─── */}
      <div className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">V 1.2.0 Secure</span>
      </div>

      <div className="relative">
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-2xl active:scale-95 bg-slate-900 border border-white/10 group"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="text-right hidden sm:block">
            <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-1 text-slate-500 opacity-60">Sovereign Terminal</p>
            <p className="text-[11px] font-black truncate max-w-[120px] uppercase tracking-tight text-white">{user || "Guest Node"}</p>
          </div>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xl bg-linear-to-br from-amber-600 to-amber-700 group-hover:scale-110 transition-transform">
            <Menu className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* ─── MAIN DROPDOWN (Sovereign Asset Terminal) ─── */}
        {showDropdown && (
          <>
            <div className="fixed inset-0 z-90" onClick={() => setShowDropdown(false)} />
            <div className="absolute top-full right-0 mt-4 w-[400px] rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-0 z-[100] animate-in fade-in zoom-in duration-300 bg-slate-950 border border-white/10 overflow-hidden backdrop-blur-3xl">
              
              {/* Header */}
              <div className="p-8 bg-linear-to-br from-slate-900 to-slate-950 flex items-center justify-between border-b border-white/5">
                <div>
                   <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Asset Terminal</h3>
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">Heritage Integration Protocol</p>
                </div>
                <button onClick={() => setShowDropdown(false)} className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-slate-500"><X className="w-5 h-5" /></button>
              </div>

              <div className="p-8 grid grid-cols-2 gap-8">
                 {/* Asset Sections */}
                 <div className="space-y-6">
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Digital Repositories</p>
                    <div className="space-y-3">
                       <Link href="/repository" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all group">
                          <Library className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                          <span className="text-[11px] font-black text-white uppercase tracking-tight">Archives</span>
                       </Link>
                       <Link href="/traditions" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all group">
                          <Flame className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                          <span className="text-[11px] font-black text-white uppercase tracking-tight">Traditions</span>
                       </Link>
                       <Link href="/activities" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all group">
                          <Gamepad2 className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                          <span className="text-[11px] font-black text-white uppercase tracking-tight">Cultural Nexus</span>
                       </Link>
                       <Link href="/festivals" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all group">
                          <History className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                          <span className="text-[11px] font-black text-white uppercase tracking-tight">Temporal Matrix</span>
                       </Link>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Connect Protocols</p>
                    <div className="space-y-3">
                       <Link href="/info" onClick={() => setShowDropdown(false)} className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all group">
                          <Info className="w-5 h-5 text-slate-400" />
                          <span className="text-[11px] font-black text-white uppercase tracking-tight">About Us</span>
                       </Link>
                       <Link href="/info" onClick={() => setShowDropdown(false)} className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all group text-left">
                          <Briefcase className="w-5 h-5 text-slate-400" />
                          <div className="flex flex-col">
                             <span className="text-[11px] font-black text-white uppercase tracking-tight">Jobs</span>
                             <span className="text-[8px] text-emerald-400 uppercase font-black">2 Nodes Open</span>
                          </div>
                       </Link>
                    </div>
                 </div>
              </div>

              {/* Social Connect (Exact Match from Image) */}
              <div className="p-8 bg-slate-900/50 flex flex-col gap-8">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] text-center">Connect with us</p>
                 <div className="grid grid-cols-1 gap-6">
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
                          <Zap className="w-5 h-5" /> {/* Using Zap/X icon */}
                       </div>
                       <div>
                          <p className="text-sm font-black text-white uppercase tracking-tight">X</p>
                          <p className="text-[10px] text-slate-500 font-bold tracking-tight">@_indianculture</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Termination Footer */}
              <div className="p-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[9px] font-black text-slate-500 uppercase">Status: Synced</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); logout(); }}
                  className="flex items-center gap-3 px-6 py-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-black uppercase text-[10px] tracking-widest"
                >
                  <LogOut className="w-4 h-4" /> Terminate Session
                </button>
              </div>

            </div>
          </>
        )}

        {/* ─── ACCESSIBILITY CONSOLE (Screenshot 1 Style) ─── */}
        {showAccessibility && (
          <>
            <div className="fixed inset-0 z-110" onClick={() => setShowAccessibility(false)} />
            <div className="absolute top-full right-0 mt-4 w-72 rounded-[40px] shadow-[0_20px_50px_rgba(245,158,11,0.3)] z-120 bg-slate-950 border border-amber-500/20 overflow-hidden animate-in slide-in-from-top-4 duration-300">
               <div className="p-6 bg-amber-600 flex items-center justify-between">
                  <h4 className="text-sm font-black text-white uppercase tracking-tighter italic">Accessibility Console</h4>
                  <X className="w-4 h-4 text-white cursor-pointer" onClick={() => setShowAccessibility(false)} />
               </div>
               
               <div className="p-6 space-y-4">
                  {[
                    { label: "High Contrast", icon: Contrast, state: contrast, fn: setContrast },
                    { label: "Saturation", icon: Droplets, state: saturation, fn: setSaturation },
                    { label: "Highlight Links", icon: LinkIcon, state: highlightLinks, fn: setHighlightLinks },
                    { label: "Hyper Cursor", icon: Move, state: largeCursor, fn: setLargeCursor },
                  ].map(tool => (
                    <button 
                      key={tool.label}
                      onClick={() => tool.fn(!tool.state)}
                      className={`w-full p-4 rounded-3xl flex items-center gap-4 transition-all border ${tool.state ? 'bg-amber-600 border-amber-500 text-white shadow-xl' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                    >
                       <tool.icon className="w-5 h-5 shrink-0" />
                       <span className="text-[11px] font-black uppercase tracking-tight">{tool.label}</span>
                       <div className={`ml-auto w-2 h-2 rounded-full ${tool.state ? 'bg-white animate-pulse' : 'bg-slate-700'}`} />
                    </button>
                  ))}

                  <div className="pt-4 space-y-4">
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest text-center">Neural Text Scaling</p>
                     <div className="flex gap-2">
                        <button onClick={() => setFontSize(prev => Math.max(80, prev - 10))} className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black hover:bg-white/10">A-</button>
                        <button onClick={() => setFontSize(100)} className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black hover:bg-white/10">Reset</button>
                        <button onClick={() => setFontSize(prev => Math.min(150, prev + 10))} className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black hover:bg-white/10">A+</button>
                     </div>
                  </div>
               </div>

               <div className="p-4 bg-amber-600/10 text-center">
                  <p className="text-[8px] font-black text-amber-500 uppercase tracking-[0.4em]">Sovereign Assistive Protocol</p>
               </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
