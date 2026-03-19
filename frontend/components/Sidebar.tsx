"use client";

import {
  Globe, Map, BrainCircuit, Activity, User,
  LogOut, Utensils, Zap, Play,
  ShieldCheck, Sun, Moon, Menu, X, Calendar, Compass, Car,
  Library, Gamepad2, Flame, ChevronLeft, ChevronRight as ChevronRightIcon,
  Award, Home, Search, Camera, Settings
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState, memo } from "react";

const NAV_ITEMS = [
  { href: "/",          icon: Globe,        label: "Sovereign Dashboard", accent: "#2563eb" },
  { href: "/repository", icon: Map,          label: "Repository & Booking", accent: "#10b981" },
  { href: "/plans",     icon: Award,        label: "Subscription Matrix", accent: "#3b82f6" },
  { href: "/circuits",  icon: Compass,      label: "Circuit Generator", accent: "#3b82f6" },
  { href: "/festivals", icon: Calendar,     label: "Cultural Calendar", accent: "#f97316" },
  { href: "/activities", icon: Gamepad2,     label: "Cultural Nexus",  accent: "#a855f7" },
  { href: "/guides",    icon: User,         label: "Guide Hub",       accent: "#f59e0b" },
  { href: "/ai",        icon: BrainCircuit, label: "Neural Compass",  accent: "#8b5cf6" },
  { href: "/logistics", icon: Utensils,     label: "Hotels & Food",   accent: "#f59e0b" },
  { href: "/transport", icon: Car,          label: "Mobility Hub",    accent: "#f97316" },
  { href: "/sensors",   icon: Activity,     label: "Conservation Hub", accent: "#06b6d4" },
  { href: "/vlogs",     icon: Play,         label: "Tourism Vlogs",   accent: "#ec4899" },
  { href: "/safety",    icon: ShieldCheck,  label: "Labor Safety",    accent: "#f97316" },
];

const MOBILE_NAV = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/explore", icon: Search, label: "Explore" },
    { href: "/vlogs", icon: Play, label: "Live" },
    { href: "/plans", icon: Award, label: "Pro" }
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ─── PC SIDEBAR ─── */}
      <aside 
        className={`hidden lg:flex fixed left-0 top-0 h-screen z-100 transition-all duration-500 ease-in-out bg-white border-r border-slate-100 ${isCollapsed ? 'w-24' : 'w-80'}`}
      >
        <div className="flex flex-col h-full w-full">
           <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              {!isCollapsed && (
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                       <Zap className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="space-y-0.5">
                       <p className="text-sm font-black uppercase tracking-tighter">Heritage <span className="text-blue-600 italic">AI</span></p>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sovereign OS</p>
                    </div>
                 </div>
              )}
              <button onClick={() => setIsCollapsed(!isCollapsed)} className={`p-3 rounded-xl hover:bg-slate-50 transition-all ${isCollapsed ? 'mx-auto' : ''}`}>
                 {isCollapsed ? <ChevronRightIcon className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
           </div>

           <nav className="flex-1 overflow-y-auto p-4 scrollbar-hide space-y-2">
              {NAV_ITEMS.map((item) => {
                 const active = pathname === item.href;
                 return (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                       <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'group-hover:text-blue-600 transition-colors'}`} style={{ color: !active ? item.accent : '' }} />
                       {!isCollapsed && <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>}
                    </Link>
                 );
              })}
           </nav>

           <div className="p-4 border-t border-slate-50">
              <button 
                onClick={logout}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all group"
              >
                 <LogOut className="w-5 h-5" />
                 {!isCollapsed && <span className="text-[11px] font-black uppercase tracking-widest">Terminate Session</span>}
              </button>
           </div>
        </div>
      </aside>

      {/* ─── MOBILE BOTTOM NAV ─── */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full h-[80px] bg-white/80 backdrop-blur-3xl border-t border-slate-100 px-6 flex items-center justify-around z-1000">
         {MOBILE_NAV.map((item) => {
            const active = pathname === item.href;
            return (
               <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1.5 relative group">
                  <div className={`p-3 rounded-2xl transition-all ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/20 -translate-y-4' : 'text-slate-400'}`}>
                     <item.icon className="w-6 h-6" />
                  </div>
                  {!active && <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>}
                  {active && <div className="absolute -bottom-1 w-1 h-1 bg-blue-600 rounded-full" />}
               </Link>
            );
         })}
         <button onClick={() => setMobileOpen(!mobileOpen)} className="flex flex-col items-center gap-1.5 text-slate-400">
            <div className="p-3 rounded-2xl bg-slate-50">
               <Menu className="w-6 h-6" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest">Matrix</span>
         </button>
      </nav>

      {/* ─── MOBILE DRAWER (For extra nodes) ─── */}
      {mobileOpen && (
         <div className="lg:hidden fixed inset-0 z-100 flex justify-end">
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative w-80 h-full bg-white shadow-3xl flex flex-col animate-in slide-in-from-right duration-500">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter">Matrix <span className="text-blue-600">Nexus</span></h3>
                  <button onClick={() => setMobileOpen(false)} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                     <X className="w-5 h-5" />
                  </button>
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {NAV_ITEMS.map((item) => (
                     <Link 
                       key={item.href} 
                       href={item.href} 
                       onClick={() => setMobileOpen(false)}
                       className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-slate-50 transition-all"
                     >
                        <item.icon className="w-5 h-5" style={{ color: item.accent }} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{item.label}</span>
                     </Link>
                  ))}
               </div>
               <div className="p-8 border-t border-slate-50">
                  <button onClick={logout} className="w-full py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl">
                     Emergency Logout
                  </button>
               </div>
            </div>
         </div>
      )}
    </>
  );
};
