"use client";

import { 
  User, LogOut, ShieldCheck, Grid, Library, 
  Gamepad2, History, Info, Briefcase, Instagram, 
  Facebook, Twitter, Linkedin, Monitor, Sun, 
  Contrast, Droplets, Link as LinkIcon, Type, 
  Move, ChevronRight, X, LayoutGrid, Zap, Globe, Mail, Menu,
  Box, Flame, Medal, Fingerprint
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useAccessibility } from "../context/AccessibilityContext";
import { useState, useEffect } from "react";
import Link from "next/link";

export function TopHeader() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const { 
    contrast, setContrast, 
    saturation, setSaturation, 
    highlightLinks, setHighlightLinks, 
    fontSize, setFontSize, 
    largeCursor, setLargeCursor,
    heavyFont, setHeavyFont
  } = useAccessibility();
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Boundaries
      const maxX = window.innerWidth - 320;
      const maxY = window.innerHeight - 400;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div className="sticky top-0 z-20 flex items-center justify-end gap-4 px-8 py-4 bg-transparent border-b border-slate-100 animate-reveal">
      {/* ─── Accessibility Trigger (Screenshot 1 Style) ─── */}
      <button 
        onClick={() => setShowAccessibility(!showAccessibility)}
        className="btn-perfect-align hidden lg:flex rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-600 hover:bg-blue-500/20 shadow-none border-none group"
      >
        <span className="btn-icon-box group-hover:rotate-12 transition-transform">
           <Zap className="w-4 h-4" />
        </span>
        <span className="btn-text">Accessibility</span>
      </button>

      {/* ─── Global Secure Indicator ─── */}
      <div className="btn-perfect-align hidden md:flex rounded-2xl bg-violet-600/10 border border-violet-500/20 border-none cursor-default">
        <span className="btn-icon-box">
           <Medal className="w-4 h-4 text-violet-600" />
        </span>
        <span className="btn-text text-violet-600">Sovereign Pro</span>
      </div>

      <div className="btn-perfect-align hidden md:flex rounded-2xl bg-emerald-500/10 border border-emerald-500/20 border-none cursor-default">
        <span className="btn-icon-box">
           <ShieldCheck className="w-4 h-4 text-emerald-500" />
        </span>
        <span className="btn-text text-emerald-600">V 5.2.0 SECURE</span>
      </div>

      <div className="relative">
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-2xl active:scale-95 bg-transparent border border-slate-200 group shadow-sm"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="text-right hidden sm:block">
            <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-1 text-slate-400 opacity-60">Sovereign Terminal</p>
            <p className="text-[11px] font-black truncate max-w-[120px] uppercase tracking-tight text-slate-950">{user || "Guest Node"}</p>
          </div>
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xl relative" style={{ background: "linear-gradient(135deg,#2563eb,#0ea5e9)" }}>
          <Zap className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* ─── MAIN DROPDOWN (Sovereign Asset Terminal) ─── */}
        {showDropdown && (
          <>
            <div className="fixed inset-0 z-90" onClick={() => setShowDropdown(false)} />
            <div className="absolute top-full right-0 mt-4 w-[400px] rounded-[40px] shadow-[0_20px_50px_rgba(37,99,235,0.15)] p-0 z-100 animate-in fade-in zoom-in duration-300 bg-transparent border border-blue-50 overflow-hidden backdrop-blur-3xl">
              
              {/* Header */}
              <div className="p-8 bg-slate-50 flex items-center justify-between border-b border-slate-100">
                <div>
                   <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Asset Terminal</h3>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1">Heritage Integration Protocol</p>
                </div>
                <button onClick={() => setShowDropdown(false)} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400"><X className="w-5 h-5" /></button>
              </div>

              <div className="p-8 grid grid-cols-2 gap-8">
                 {/* Asset Sections */}
                  <div className="space-y-6">
                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Digital Repositories</p>
                       <div className="space-y-4">
                          <Link href="/repository" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-50 transition-all group">
                             <Library className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                             <span className="text-[11px] font-black text-slate-950 uppercase tracking-tight">Archives</span>
                          </Link>
                          <Link href="/activities" onClick={() => setShowDropdown(false)} className="nav-item-centered group transition-all">
                             <div className="icon-grid-center bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                             </div>
                             <span className="text-[11px] font-black text-slate-950 uppercase tracking-tight baseline-fix">Nexus</span>
                          </Link>
                          <Link href="/festivals" onClick={() => setShowDropdown(false)} className="nav-item-centered group transition-all">
                             <div className="icon-grid-center bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                <History className="w-5 h-5 group-hover:scale-110 transition-transform" />
                             </div>
                             <span className="text-[11px] font-black text-slate-950 uppercase tracking-tight baseline-fix">Temporal Matrix</span>
                          </Link>
                       </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Connect Protocols</p>
                    <div className="space-y-3">
                       <Link href="/info" onClick={() => setShowDropdown(false)} className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-50 transition-all group">
                          <Info className="w-5 h-5 text-slate-400" />
                          <span className="text-[11px] font-black text-slate-950 uppercase tracking-tight">About Us</span>
                       </Link>
                       <Link href="/info" onClick={() => setShowDropdown(false)} className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-50 transition-all group text-left">
                          <Briefcase className="w-5 h-5 text-slate-400" />
                          <div className="flex flex-col">
                             <span className="text-[11px] font-black text-slate-950 uppercase tracking-tight">Jobs</span>
                             <span className="text-[8px] text-blue-600 uppercase font-black">2 Nodes Open</span>
                          </div>
                       </Link>
                    </div>
                 </div>
              </div>

              {/* Social Connect (Exact Match from Image) */}
               <div className="p-8 bg-slate-50 flex flex-col gap-8">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] text-center">Connect with us</p>
                   <div className="grid grid-cols-1 gap-4">
                     {[
                        { icon: Mail, label: "Email", value: "indian-culture@gov.in" },
                        { icon: Instagram, label: "Instagram", value: "@indiancultureportal" },
                        { icon: Facebook, label: "Facebook", value: "@INDCulturePortal" },
                        { icon: Zap, label: "X (Twitter)", value: "@_indianculture" }
                     ].map(social => (
                        <div key={social.label} className="nav-item-centered group cursor-pointer">
                           <div className="icon-grid-center bg-white border border-slate-200 text-slate-950 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl">
                              <social.icon className="w-5 h-5" />
                           </div>
                           <div className="flex flex-col">
                              <p className="text-sm font-black text-slate-950 uppercase tracking-tight leading-none mb-1">{social.label}</p>
                              <p className="text-[10px] text-slate-400 font-bold tracking-tight leading-none">{social.value}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

              {/* Termination Footer */}
              <div className="p-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500" />
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Status: Synced</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); logout(); }}
                  className="flex items-center gap-3 px-6 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-all font-black uppercase text-[10px] tracking-widest"
                >
                  <LogOut className="w-4 h-4" /> Terminate Session
                </button>
              </div>

            </div>
          </>
        )}

        {/* ─── ACCESSIBILITY CONSOLE (Movable & High Visibility) ─── */}
        {showAccessibility && (
          <>
            <div className="fixed inset-0 z-110" onClick={() => setShowAccessibility(false)} />
            <div 
              className="fixed z-120 w-80 rounded-[40px] shadow-2xl bg-white border border-slate-200 overflow-hidden select-none"
              style={{ 
                left: `${position.x}px`, 
                top: `${position.y}px`,
              }}
            >
               <div 
                  className="p-6 bg-blue-600 flex items-center justify-between cursor-move active:cursor-grabbing"
                  onMouseDown={handleMouseDown}
               >
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                     </div>
                     <h4 className="text-sm font-black text-white uppercase tracking-widest italic">Accessibility Console</h4>
                  </div>
                  <button onClick={() => setShowAccessibility(false)}>
                    <X className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
                  </button>
               </div>
               
                 <div className="p-8 space-y-4 bg-white">
                  {[
                    { label: "High Contrast", icon: Contrast, state: contrast, fn: setContrast },
                    { label: "Saturation", icon: Droplets, state: saturation, fn: setSaturation },
                    { label: "Heavy Dark Fonts", icon: Type, state: heavyFont, fn: setHeavyFont },
                    { label: "Highlight Links", icon: LinkIcon, state: highlightLinks, fn: setHighlightLinks },
                    { label: "Hyper Cursor", icon: Move, state: largeCursor, fn: setLargeCursor },
                  ].map(tool => (
                    <button 
                      key={tool.label}
                      onClick={() => tool.fn(!tool.state)}
                      className={`w-full p-4 rounded-4xl flex items-center gap-4 transition-all border-2 ${tool.state ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100 hover:border-slate-200'}`}
                    >
                       <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${tool.state ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                          <tool.icon className="w-5 h-5" />
                       </div>
                       <span className="text-[11px] font-black uppercase tracking-widest leading-none">{tool.label}</span>
                       <div className={`ml-auto w-3 h-3 rounded-full border-2 ${tool.state ? 'bg-white border-blue-300' : 'bg-transparent border-slate-300'}`} />
                    </button>
                  ))}

                   <div className="pt-6 space-y-5">
                      <div className="flex items-center gap-3">
                         <div className="flex-1 h-px bg-slate-100" />
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Neural Text Scaling</p>
                         <div className="flex-1 h-px bg-slate-100" />
                      </div>
                      <div className="flex gap-3">
                         <button onClick={() => setFontSize(prev => Math.max(80, prev - 10))} className="flex-1 p-5 rounded-3xl bg-white border border-slate-200 text-slate-800 font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm">A-</button>
                         <button onClick={() => setFontSize(100)} className="flex-1 p-5 rounded-3xl bg-white border border-slate-200 text-slate-800 font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm">Reset</button>
                         <button onClick={() => setFontSize(prev => Math.min(150, prev + 10))} className="flex-1 p-5 rounded-3xl bg-white border border-slate-200 text-slate-800 font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm">A+</button>
                      </div>
                   </div>
                </div>

                <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-3">
                   <Fingerprint className="w-4 h-4 text-blue-600" />
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em]">Sovereign Assistive Protocol</p>
                </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
