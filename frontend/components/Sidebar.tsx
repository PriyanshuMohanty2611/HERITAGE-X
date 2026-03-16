"use client";

import {
  Globe, Map, BrainCircuit, Activity, User,
  LogOut, Utensils, Zap, Play,
  ShieldCheck, Sun, Moon, Menu, X, Calendar, Compass, Car,
  Library, Gamepad2, Flame, ChevronLeft, ChevronRight as ChevronRightIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState, memo } from "react";

type SidebarInnerProps = {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  pathname: string;
  logout: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  setMobileOpen: (value: boolean) => void;
};

const NAV_ITEMS = [
  { href: "/",          icon: Globe,        label: "Command Center",  accent: "#2563eb" },
  { href: "/explore",   icon: Map,          label: "Visit & Booking", accent: "#10b981" },
  { href: "/circuits",  icon: Compass,      label: "Circuit Generator", accent: "#3b82f6" },
  { href: "/festivals", icon: Calendar,     label: "Cultural Calendar", accent: "#f97316" },
  { href: "/repository", icon: Library,      label: "Heritage Library", accent: "#f59e0b" },
  { href: "/traditions", icon: Flame,        label: "Living Traditions", accent: "#f59e0b" },
  { href: "/activities", icon: Gamepad2,     label: "Cultural Nexus",  accent: "#a855f7" },
  { href: "/guides",    icon: User,         label: "Guide Hub",       accent: "#f59e0b" },
  { href: "/ai",        icon: BrainCircuit, label: "Neural Compass",  accent: "#8b5cf6" },
  { href: "/logistics", icon: Utensils,     label: "Hotels & Food",   accent: "#f59e0b" },
  { href: "/transport", icon: Car,          label: "Mobility Hub",    accent: "#f97316" },
  { href: "/sensors",   icon: Activity,     label: "Conservation Hub", accent: "#06b6d4" },
  { href: "/vlogs",     icon: Play,         label: "Tourism Vlogs",   accent: "#ec4899" },
  { href: "/safety",    icon: ShieldCheck,  label: "Labor Safety",    accent: "#f97316" },
];

// Moving SidebarContent outside to prevent remount "refreshing" bug
const SidebarInner = memo(({
  isCollapsed,
  setIsCollapsed,
  pathname,
  logout,
  isDark,
  toggleTheme,
  setMobileOpen,
}: SidebarInnerProps) => {
  return (
    <div className="flex flex-col h-full bg-[#060b18]/95 backdrop-blur-3xl overflow-hidden border-r border-white/5">
      {/* Logo Area */}
      <div className="flex items-center gap-4 px-6 py-6 border-b shrink-0 relative group/logo" style={{ borderColor: "var(--card-border)" }}>
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xl relative" style={{ background: "linear-gradient(135deg,#2563eb,#0ea5e9)" }}>
          <Zap className="w-5 h-5 text-white animate-pulse" />
          {isCollapsed && (
             <div className="absolute left-full ml-6 px-3 py-1.5 bg-black/90 text-[10px] font-black text-white rounded-lg opacity-0 group-hover/logo:opacity-100 transition-opacity whitespace-nowrap z-100 pointer-events-none tracking-widest border border-white/10 uppercase">
                Heritage-X OS
             </div>
          )}
        </div>
        {!isCollapsed && (
          <div className="hidden lg:block overflow-hidden animate-in fade-in slide-in-from-left-4 duration-500">
            <p className="text-sm font-black tracking-widest leading-none uppercase" style={{ color: "var(--text-strong)" }}>HERITAGE-X</p>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] mt-1.5 opacity-70" style={{ color: "var(--text-muted)" }}>Cultural AI Platform</p>
          </div>
        )}
        
        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-[#0a1120] border border-white/10 rounded-full items-center justify-center hover:border-blue-500/50 hover:bg-slate-800 transition-all z-20 group/toggle"
        >
          {isCollapsed ? <ChevronRightIcon className="w-3 h-3 text-slate-500 group-hover/toggle:text-white" /> : <ChevronLeft className="w-3 h-3 text-slate-500 group-hover/toggle:text-white" />}
        </button>

        <button className="lg:hidden ml-auto w-10 h-10 rounded-xl flex items-center justify-center" onClick={() => setMobileOpen(false)}>
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <nav className="flex flex-col gap-1.5 flex-1 w-full p-4 overflow-y-auto scrollbar-hide py-8">
        {NAV_ITEMS.map(({ href, icon: Icon, label, accent }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              onDoubleClick={(e) => {
                e.preventDefault();
                setIsCollapsed(false);
              }}
              className={`group flex items-center relative transition-all duration-300 active:scale-95 border border-transparent ${isCollapsed ? "justify-center px-0 py-4" : "gap-3 px-3.5 py-3 rounded-2xl"}`}
              style={{
                background: !isCollapsed && active ? `${accent}14` : "transparent",
                borderColor: !isCollapsed && active ? `${accent}30` : "transparent",
                borderRadius: isCollapsed ? '1rem' : '1.25rem'
              }}
            >
              <div
                className={`flex items-center justify-center shrink-0 transition-all duration-300 relative ${isCollapsed ? "w-12 h-12 rounded-2xl" : "w-10 h-10 rounded-xl"}`}
                style={{ background: active ? (isCollapsed ? accent : `${accent}20`) : "rgba(255,255,255,0.03)" }}
              >
                <Icon className={`transition-all duration-300 ${isCollapsed ? (active ? "w-6 h-6" : "w-5 h-5") : "w-4.5 h-4.5"}`} style={{ color: active ? (isCollapsed ? "#fff" : accent) : "var(--text-muted)" }} />
                {isCollapsed && active && (
                   <div className="absolute -left-1 w-1 h-6 bg-white rounded-full shadow-[0_0_10px_#fff]" />
                )}
              </div>

              {!isCollapsed && (
                <span
                  className="hidden lg:block text-[13px] font-bold tracking-tight flex-1 truncate transition-colors duration-200"
                  style={{ color: active ? "var(--text-strong)" : "var(--text-muted)" }}
                >
                  {label}
                </span>
              )}

              {/* Tooltip for Collapsed Mode */}
              {isCollapsed && (
                 <div className="absolute left-full ml-4 px-4 py-2 bg-slate-900 border border-white/10 text-[11px] font-black text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-100 pointer-events-none shadow-2xl tracking-widest uppercase">
                    {label}
                 </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className={`p-4 border-t space-y-2 mt-auto transition-all ${isCollapsed ? "items-center" : ""}`} style={{ borderColor: "var(--card-border)" }}>
        <div className={`flex items-center bg-black/20 backdrop-blur-xl border border-white/5 rounded-2xl transition-all ${isCollapsed ? "px-2 py-4 flex-col gap-4" : "px-4 py-3 gap-3"}`}>
          <div className="w-8 h-8 flex items-center justify-center shrink-0 relative group/theme">
            <Sun className="w-4.5 h-4.5" style={{ color: isDark ? "var(--text-muted)" : "#f59e0b" }} />
          </div>
          <button
            onClick={toggleTheme}
            className={`theme-toggle shrink-0 transition-transform ${isDark ? "dark-mode" : ""} ${isCollapsed ? "rotate-90 scale-125" : ""}`}
            style={{ background: isDark ? "#2563eb" : "#3b82f6" }}
          >
            <div className="theme-toggle-knob" />
          </button>
          <div className="w-8 h-8 flex items-center justify-center shrink-0 relative group/dark">
            <Moon className="w-4.5 h-4.5" style={{ color: isDark ? "#93c5fd" : "var(--text-muted)" }} />
          </div>
        </div>

        <button
          onClick={logout}
          className={`group flex items-center transition-all duration-300 hover:bg-red-500/10 rounded-2xl relative ${isCollapsed ? "justify-center p-4" : "gap-4 px-4 py-3 w-full"}`}
          style={{ color: "var(--text-muted)" }}
        >
          <div className={`rounded-xl flex items-center justify-center shrink-0 bg-red-500/5 group-hover:bg-red-500/20 transition-all ${isCollapsed ? "w-12 h-12" : "w-9 h-9"}`}>
            <LogOut className={`${isCollapsed ? "w-6 h-6" : "w-4.5 h-4.5"} transition-colors group-hover:text-red-500`} />
          </div>
          {!isCollapsed && <span className="hidden lg:block text-[13px] font-black uppercase tracking-widest group-hover:text-red-500">Sign Out</span>}
        </button>
      </div>
    </div>
  );
});

SidebarInner.displayName = "SidebarInner";

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Simple, stable UI state - no flickering resize listeners that reset state
  return (
    <>
      <button
        className="fixed top-4 left-4 z-[200] lg:hidden w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-slate-900 border border-white/10 text-white"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[150] lg:hidden"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-[160] w-64 lg:hidden transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarInner 
          isCollapsed={false} 
          setIsCollapsed={() => {}} 
          pathname={pathname} 
          logout={logout} 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
          setMobileOpen={setMobileOpen}
        />
      </aside>

      <aside 
        className={`hidden lg:flex flex-col shrink-0 z-50 transition-all duration-500 shadow-2xl relative ${isCollapsed ? "w-24" : "w-64 xl:w-72"}`}
        onDoubleClick={() => setIsCollapsed(!isCollapsed)}
      >
        <SidebarInner 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
          pathname={pathname} 
          logout={logout} 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
          setMobileOpen={setMobileOpen}
        />
      </aside>
    </>
  );
}
