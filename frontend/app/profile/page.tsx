"use client";

import { 
  User, Mail, MapPin, Award, ShieldCheck, 
  Settings, LogOut, ChevronRight, Activity, 
  History, Clock, Globe, Briefcase, GraduationCap,
  Sparkles, Fingerprint, Star, Binary, BookOpen
} from "lucide-react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="heritage-page-shell flex min-h-screen w-screen font-sans overflow-hidden bg-transparent">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-20 overflow-hidden text-slate-950">
        <div className="header-neural h-20 flex items-center justify-between px-6 z-20 shrink-0 border-b border-slate-50 bg-white/40 backdrop-blur-xl">
          <TopHeader />
        </div>

        <div className="flex-1 overflow-y-auto p-8 lg:p-16 xl:p-24 scrollbar-hide neural-content-shell">
          <div className="max-w-[1400px] mx-auto space-y-20">
            
            {/* Header: Symmetrical Layout */}
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-slate-100 pb-16">
               <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="relative group">
                     <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-[3.5rem] bg-blue-600 border-4 border-white shadow-3xl flex items-center justify-center text-white overflow-hidden transition-transform duration-700 hover:rotate-6">
                        <Fingerprint className="w-16 h-16 lg:w-24 lg:h-24 animate-pulse opacity-40 absolute" />
                        <span className="text-4xl lg:text-7xl font-black italic relative z-10">{user?.[0]?.toUpperCase() || "P"}</span>
                     </div>
                     <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl bg-emerald-500 border-4 border-white flex items-center justify-center text-white shadow-xl">
                        <ShieldCheck className="w-6 h-6" />
                     </div>
                  </div>
                  
                  <div className="space-y-4 text-center md:text-left">
                     <div className="flex items-center justify-center md:justify-start gap-4">
                        <h1 className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter leading-none">{user || "Priyanshu Mohanty"}</h1>
                        <div className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20">
                           Pro Node
                        </div>
                     </div>
                     <div className="flex flex-wrap justify-center md:justify-start gap-6 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                           <Briefcase className="w-4 h-4 text-blue-600" /> AIML Engineer @ ByteIQ
                        </div>
                        <div className="flex items-center gap-2">
                           <GraduationCap className="w-4 h-4 text-blue-600" /> B.Tech (NIT)
                        </div>
                        <div className="flex items-center gap-2">
                           <MapPin className="w-4 h-4 text-blue-600" /> Odisha, India
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex gap-4 self-center lg:self-end">
                  <button className="btn-perfect-align bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all">
                     <span className="btn-icon-box">
                        <Settings className="w-5 h-5 text-slate-400" />
                     </span>
                     <span className="btn-text">Edit Terminal</span>
                  </button>
                  <button onClick={logout} className="btn-perfect-align bg-red-600 text-white border-none rounded-2xl shadow-xl shadow-red-600/10 hover:bg-slate-950 transition-all group">
                     <span className="btn-icon-box group-hover:rotate-12 transition-transform">
                        <LogOut className="w-5 h-5" />
                     </span>
                     <span className="btn-text">Terminate Sync</span>
                  </button>
               </div>
            </header>

            {/* Main Content Matrix: Two-Column Symmetric Layout */}
            <div className="grid grid-cols-12 gap-12 lg:gap-24">
               
               {/* Left Column: Data Grid & Stats */}
               <div className="col-span-12 lg:col-span-8 space-y-16">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {[
                        { label: "Sovereign Rank", val: "Top 0.5%", icon: Award, color: "text-amber-500" },
                        { label: "Neural Index", val: "8.7 CGPA", icon: Binary, color: "text-blue-600" },
                        { label: "Deep-Sync Projects", val: "12 Sessions", icon: Sparkles, color: "text-violet-500" },
                        { label: "Heritage Node Access", val: "Unlimited", icon: Globe, color: "text-emerald-500" }
                     ].map((stat, i) => (
                        <div key={i} className="glass-card p-10 rounded-[3rem] border border-white/40 space-y-6 group hover:shadow-3xl transition-all">
                           <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform ${stat.color}`}>
                              <stat.icon className="w-7 h-7" />
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em]">{stat.label}</p>
                              <p className="text-3xl font-black italic tracking-tighter">{stat.val}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="space-y-8">
                     <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter">Transmission Archive</h2>
                        <Link href="/vlogs" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:translate-x-2 transition-transform">
                           View All Syncs <ChevronRight className="w-4 h-4 inline" />
                        </Link>
                     </div>
                     <div className="space-y-4">
                        {[
                           { name: "Konark Structural Scan", date: "Mar 15, 2026", type: "3D Projection" },
                           { name: "Taj Mahal Acoustics Study", date: "Mar 12, 2026", type: "Audio Link" },
                           { name: "Puri Rath Yatra Mapping", date: "Mar 08, 2026", type: "Circuit Gen" }
                        ].map((log, i) => (
                           <div key={i} className="flex items-center justify-between p-8 bg-white/50 backdrop-blur-md border border-slate-100 rounded-3xl hover:bg-white hover:shadow-xl transition-all cursor-pointer group">
                              <div className="flex items-center gap-6">
                                 <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Clock className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <h4 className="text-sm font-black uppercase italic tracking-tight">{log.name}</h4>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{log.date}</p>
                                 </div>
                              </div>
                              <div className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                                 {log.type}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Right Column: Active Terminal Info */}
               <div className="col-span-12 lg:col-span-4 space-y-12">
                  <div className="p-10 bg-slate-950 rounded-[3.5rem] text-white space-y-10 shadow-3xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -mr-16 -mt-16" />
                     <h3 className="text-2xl font-black uppercase italic tracking-tighter relative z-10 flex items-center gap-4">
                        <Activity className="w-8 h-8 text-blue-500" /> Node Status
                     </h3>
                     <div className="space-y-8 relative z-10">
                        <div className="space-y-2">
                           <div className="flex justify-between items-end mb-1">
                              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 leading-none">Transmission Integrity</span>
                              <span className="text-xl font-black italic text-blue-500">98%</span>
                           </div>
                           <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 w-[98%] shadow-[0_0_15px_#2563eb]" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <div className="flex justify-between items-end mb-1">
                              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 leading-none">Synaptic Bridge Score</span>
                              <span className="text-xl font-black italic text-violet-500">124k</span>
                           </div>
                           <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-violet-600 w-[74%] shadow-[0_0_15px_#8b5cf6]" />
                           </div>
                        </div>
                     </div>
                     <div className="space-y-6 relative z-10 pt-4">
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] leading-relaxed italic">"Your neural link is operating at peak levels. 4 artifacts identified in last session."</p>
                        <button className="btn-perfect-align w-full bg-white text-slate-950 rounded-2xl border-none font-black text-[10px] tracking-widest hover:bg-blue-600 hover:text-white group">
                           <span className="btn-icon-box">
                              <Star className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                           </span>
                           <span className="btn-text">Collect Daily XP</span>
                        </button>
                     </div>
                  </div>

                  <div className="p-10 glass-card rounded-[3rem] space-y-8 border border-white/50">
                     <div className="flex items-center gap-4">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        <h4 className="text-xl font-black uppercase italic tracking-tight">Active Studies</h4>
                     </div>
                     <div className="space-y-6">
                        {['Odisha Temple Architecture', 'Mughal Geometric Precision'].map(study => (
                           <div key={study} className="p-6 bg-white/60 rounded-3xl border border-white/40 shadow-sm flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                              <span className="text-xs font-black uppercase italic tracking-tight text-slate-700">{study}</span>
                              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                 <ChevronRight className="w-4 h-4" />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
