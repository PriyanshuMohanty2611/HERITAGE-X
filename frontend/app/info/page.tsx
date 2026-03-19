"use client";

import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { Footer } from "../../components/Footer";
import { 
  Users, Briefcase, GraduationCap, Mail, Phone, 
  MapPin, Send, MessageCircle, Handshake, Globe,
  ShieldCheck, Info, ChevronRight, ArrowRight
} from "lucide-react";

export default function InfoPage() {
  return (
    <main className="heritage-page-shell flex h-dvh w-screen font-sans overflow-hidden bg-transparent text-white relative">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_0%_100%,#0ea5e9,transparent_70%)]" />

      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <div className="header-neural h-20 flex items-center justify-between px-6 z-20 shrink-0">
          <TopHeader />
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 lg:p-12 scrollbar-hide neural-content-shell">
          <div className="max-w-[1700px] mx-auto space-y-20 pb-20">
            
            {/* Header */}
            <header className="space-y-6">
               <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-2xl skew-x-2">
                     <Info className="w-10 h-10 text-blue-500" />
                  </div>
                  <div>
                     <h1 className="text-5xl lg:text-8xl font-black text-white uppercase italic tracking-tighter">Sovereign Protocol</h1>
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.5em] mt-2 ml-1 underline decoration-blue-500/50 underline-offset-8">Organizational Vectors & Human Capital</p>
                  </div>
               </div>
            </header>

            <div className="grid grid-cols-12 gap-12">
               {/* About Us (6/12) */}
               <div className="col-span-12 lg:col-span-6 space-y-10 p-12 rounded-[50px] bg-slate-900 border border-white/5 shadow-3xl">
                  <div className="flex items-center gap-6">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-500"><Handshake /></div>
                     <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">Our Mission Matrix</h2>
                  </div>
                  <p className="text-lg font-medium text-slate-400 italic leading-relaxed">
                     "Heritage-X is a unified digital infrastructure designed to preserve, visualize, and synchronize the cultural wealth of the subcontinent. We operate at the intersection of archaeological precision and next-gen spatial computing."
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-6">
                     <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-2">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Archives</p>
                        <p className="text-2xl font-black text-white italic">1.2M+ Nodes</p>
                     </div>
                     <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-2">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Sectors</p>
                        <p className="text-2xl font-black text-white italic">450+ Sites</p>
                     </div>
                  </div>
               </div>

               {/* Job Opportunities (6/12) - Screenshot 2 Style */}
               <div className="col-span-12 lg:col-span-6 space-y-10 p-12 rounded-[50px] bg-linear-to-br from-slate-900 to-indigo-950/20 border border-white/5 shadow-3xl flex flex-col">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500"><Briefcase /></div>
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">Tactical Openings</h2>
                     </div>
                     <span className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 animate-pulse">Hiring Now</span>
                  </div>
                  
                  <div className="space-y-6 flex-1">
                     {[
                       { role: "Archaeological Data Architect", type: "On-Site / Hampi", pay: "₹18.5L - 25L" },
                       { role: "Spatial Asset Visualizer", type: "Remote / Bengaluru", pay: "₹14.2L - 22L" }
                     ].map(job => (
                        <div key={job.role} className="group p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all flex items-center justify-between cursor-pointer">
                           <div className="space-y-1">
                              <p className="text-base font-black text-white uppercase tracking-tight italic">{job.role}</p>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{job.type} · Full Time</p>
                           </div>
                           <ArrowRight className="w-5 h-5 text-slate-700 group-hover:text-emerald-500 transition-all" />
                        </div>
                     ))}
                  </div>

                  <button className="w-full py-5 bg-white text-black font-black rounded-3xl uppercase text-[10px] tracking-widest shadow-2xl hover:scale-[1.02] transition-all">View Career Portal</button>
               </div>
            </div>

            {/* Campus Ambassador Program (Screenshot 2 Style) */}
            <div className="p-16 rounded-[60px] bg-linear-to-r from-blue-600/40 via-indigo-600/20 to-transparent border border-white/10 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 group">
               <div className="absolute inset-0 bg-dot-white/[0.1] pointer-events-none" />
               <div className="relative z-10 space-y-8 max-w-2xl">
                  <div className="flex items-center gap-4">
                     <GraduationCap className="w-8 h-8 text-blue-400" />
                     <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Youth Engagement Node</p>
                  </div>
                  <h3 className="text-5xl lg:text-7xl font-black text-white uppercase italic tracking-tighter leading-tight">Campus Ambassador</h3>
                  <p className="text-xl font-medium text-slate-200 italic leading-relaxed">
                     Bridge the gap between your university and the national heritage repository. Lead digital preservation drives and represent the Heritage-X protocol on campus.
                  </p>
                  <div className="flex items-center gap-6">
                     <button className="px-12 py-6 bg-white text-black font-black rounded-3xl uppercase text-xs tracking-widest shadow-2xl hover:bg-blue-600 hover:text-white transition-all">Initialize Enrollment</button>
                     <span className="text-[11px] font-black text-blue-200 uppercase tracking-widest underline decoration-blue-500 underline-offset-8 cursor-pointer">View Benefits Node</span>
                  </div>
               </div>
               <div className="w-full lg:w-[450px] aspect-video rounded-4xl bg-slate-950/80 backdrop-blur-2xl border border-white/10 p-10 shadow-3xl flex flex-col justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Enrollment Cycle: March 2026</p>
                  </div>
                  <div className="space-y-6">
                     <div className="flex justify-between text-[10px] font-black text-white uppercase">
                        <span>Applications</span>
                        <span>4.2k Submissions</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[65%] shadow-[0_0_15px_#3b82f6]" />
                     </div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic leading-relaxed">"Join 250+ active campus nodes across the national network."</p>
               </div>
            </div>

            {/* Contact Matrix (Screenshot 2 style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
               {[
                 { label: "Direct Comm Feed", val: "+91 800-HERITAGE", icon: Phone, color: "blue" },
                 { label: "Neural Inbox", val: "arch@heritagex.gov.in", icon: Mail, color: "emerald" },
                 { label: "Central Command", val: "New Delhi, Sector 42", icon: MapPin, color: "amber" }
               ].map(item => (
                  <div key={item.label} className="p-10 rounded-4xl bg-slate-900 border border-white/5 flex flex-col items-center text-center space-y-6 group hover:border-white/20 transition-all">
                     <div className={`w-14 h-14 rounded-2xl bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                        <item.icon className={`w-7 h-7 text-${item.color}-500`} />
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-xl font-black text-white italic tracking-tight uppercase">{item.val}</p>
                     </div>
                  </div>
               ))}
            </div>

            <Footer />
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
