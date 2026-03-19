"use client";

import React from "react";
import { 
  Globe, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Cpu, 
  ChevronRight,
  Heart
} from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-slate-200 bg-white/40 backdrop-blur-xl py-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-12 lg:gap-20">
          {/* Brand Section */}
          <div className="col-span-12 lg:col-span-5">
             <div className="flex items-center gap-3 mb-8 group">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                   <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                   <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Heritage-X</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1.5">Sovereign Cultural OS</p>
                </div>
             </div>
             <p className="text-slate-600 text-sm leading-relaxed max-w-sm font-medium">
                The world's first AI-driven cultural intelligence platform dedicated to the 
                digitization, preservation, and strategic analysis of global heritage assets.
             </p>
             
             <div className="flex items-center gap-4 mt-10">
                {[Twitter, Instagram, Linkedin, Mail].map((Icon, i) => (
                   <button key={i} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-500/50 hover:bg-blue-50 transition-all active:scale-90">
                      <Icon className="w-5 h-5" />
                   </button>
                ))}
             </div>
          </div>

          {/* Links Sections */}
          <div className="col-span-12 md:col-span-4 lg:col-span-2">
             <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                <div className="w-4 h-[2px] bg-blue-500" /> Infrastructure
             </h4>
             <ul className="space-y-4">
                {[
                  { label: "Command Center", href: "/" },
                  { label: "Heritage Matrix", href: "/repository" },
                  { label: "Neural Compass", href: "/ai" },
                  { label: "V-Museum Node", href: "/activities" }
                ].map((link) => (
                   <li key={link.label}>
                      <Link href={link.href} className="text-slate-500 text-sm font-bold uppercase tracking-widest hover:text-blue-600 flex items-center gap-2 group">
                         <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500" />
                         {link.label}
                      </Link>
                   </li>
                ))}
             </ul>
          </div>

          <div className="col-span-12 md:col-span-4 lg:col-span-2">
             <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                <div className="w-4 h-[2px] bg-blue-500" /> Operations
             </h4>
             <ul className="space-y-4">
                {[
                  { label: "Visit & Booking", href: "/repository" },
                  { label: "Mobility Hub", href: "/transport" },
                  { label: "Hotel Assets", href: "/logistics" },
                  { label: "Labor Protocol", href: "/safety" }
                ].map((link) => (
                   <li key={link.label}>
                      <Link href={link.href} className="text-slate-500 text-sm font-bold uppercase tracking-widest hover:text-blue-600 flex items-center gap-2 group">
                         <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500" />
                         {link.label}
                      </Link>
                   </li>
                ))}
             </ul>
          </div>

          <div className="col-span-12 md:col-span-4 lg:col-span-3">
             <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
                   <Cpu className="w-20 h-20" />
                </div>
                <h5 className="text-lg font-black uppercase tracking-tighter italic mb-2 relative z-10">Neural Pulse Subscription</h5>
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest mb-6 relative z-10">Get real-time conservation alerts.</p>
                <div className="relative z-10 flex gap-2">
                   <input 
                      type="text" 
                      placeholder="HEX_NODE_ID" 
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-[10px] font-bold tracking-widest outline-none focus:bg-white/20 w-full placeholder:text-white/40" 
                   />
                   <button className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all">
                      <ChevronRight className="w-5 h-5" />
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* Global Footer */}
        <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">
              © 2026 HERITAGE-X PLATFORM · INDIAN CULTURE INTEGRATION MODULE
           </p>
           <div className="flex items-center gap-8">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 Built for GIET University · B.Tech Final Project 2026
              </p>
              <div className="flex items-center gap-2 px-3 py-1 rounded bg-blue-600/10 text-blue-600 border border-blue-500/20 text-[8px] font-black uppercase">
                 Verified Protocol
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
