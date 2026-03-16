"use client";

import { Sidebar } from "../../components/Sidebar";
import { User, Shield, Clock, Activity, Settings, TrendingUp, Cpu, Award, BookMarked, HeartHandshake, MapPin } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="heritage-page-shell flex h-screen w-screen font-sans" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Background image — Profile page */}
      <div className="page-bg" style={{ backgroundImage: "url('/assets/Victoria Memorial/Victoria-Memorial-Hall-Kolkata-India-West-Bengal.webp')" }} />
      <Sidebar />
      <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 pt-14 lg:pt-0">
        
        {/* Banner */}
        <div className="h-48 relative" style={{ background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 50%, #bfdbfe 100%)" }}>
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/assets/Taj Mahal/gettyimages-155096944-612x612.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        </div>

        <div className="max-w-6xl mx-auto px-8 -mt-24 relative z-10 pb-20">
          
          {/* Header Card */}
          <div className="card p-6 shadow-xl flex flex-col md:flex-row items-center md:items-end gap-5 mb-6" style={{ border: "1px solid var(--card-border)" }}>
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "#eff6ff", border: "2px solid #bfdbfe" }}>
               <User className="w-12 h-12 text-blue-500" />
            </div>
            <div className="flex-1 text-center md:text-left space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-2xl font-black uppercase tracking-wider" style={{ color: "var(--text-strong)" }}>Admin Alpha</h1>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1" style={{ background: "#fffbeb", border: "1px solid #fde68a", color: "#d97706" }}>
                  <Shield className="w-3 h-3" /> Level 5
                </span>
              </div>
              <p className="text-sm font-mono tracking-widest" style={{ color: "var(--text-muted)" }}>Global Architect · Joined 2024</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase transition-all" style={{ background: "var(--background)", border: "1px solid var(--card-border)", color: "var(--text-muted)" }}>
                <Settings className="w-4 h-4" /> Config
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase text-white" style={{ background: "#2563eb" }}>
                Access Logs
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Col: Analytics & Crowdfunding */}
            <div className="space-y-6 lg:col-span-1">
              {/* Gamification Passport & Stats */}
              <div className="rounded-2xl p-6 shadow-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                <h3 className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 mb-6" style={{ color: "var(--text-strong)" }}>
                  <TrendingUp className="w-4 h-4 text-heritage-cyan" /> Influence & Passport
                </h3>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                     <div className="p-3 rounded-xl border text-center relative overflow-hidden group hover:border-heritage-gold transition-all" style={{ background: "var(--background)", borderColor: "var(--card-border)" }}>
                       <Award className="w-6 h-6 text-heritage-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
                       <p className="text-[10px] uppercase font-bold" style={{ color: "var(--text-muted)" }}>Temple Expert</p>
                       <p className="text-sm font-bold font-mono mt-1" style={{ color: "var(--text-strong)" }}>Lvl 12</p>
                     </div>
                     <div className="p-3 rounded-xl border text-center relative overflow-hidden group hover:border-pink-400 transition-all" style={{ background: "var(--background)", borderColor: "var(--card-border)" }}>
                       <MapPin className="w-6 h-6 text-pink-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                       <p className="text-[10px] uppercase font-bold" style={{ color: "var(--text-muted)" }}>Global Explorer</p>
                       <p className="text-sm font-bold font-mono mt-1" style={{ color: "var(--text-strong)" }}>42 Stamps</p>
                     </div>
                  </div>

                  <div>
                     <div className="flex justify-between items-center px-3 py-2 rounded-lg border mb-2 pointer-events-none" style={{ background: "var(--background)", borderColor: "var(--card-border)" }}>
                       <span className="text-[10px] uppercase font-bold" style={{ color: "var(--text-strong)" }}>Konark Passport</span>
                       <span className="text-green-400 text-[10px] font-bold tracking-widest uppercase">Verified ✔</span>
                     </div>
                     <div className="flex justify-between items-center px-3 py-2 rounded-lg border mb-2 pointer-events-none" style={{ background: "var(--background)", borderColor: "var(--card-border)" }}>
                       <span className="text-[10px] uppercase font-bold" style={{ color: "var(--text-strong)" }}>Machu Picchu Passport</span>
                       <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Pending ✖</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* Conservation Crowdfunding */}
              <div className="rounded-2xl p-6 shadow-xl relative overflow-hidden group" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                 <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-pink-500/10 blur-2xl group-hover:bg-pink-500/20 transition-all"></div>
                 <h3 className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 mb-4 relative z-10" style={{ color: "var(--text-strong)" }}>
                   <HeartHandshake className="w-4 h-4 text-pink-400" /> Crowdfunding
                 </h3>
                 <p className="text-xs leading-relaxed mb-4 font-mono relative z-10" style={{ color: "var(--text-muted)" }}>You have actively supported the restoration of 3 UNESCO protected murals in Hampi.</p>
                 <div className="w-full rounded-full overflow-hidden mb-4 relative z-10 h-2 border" style={{ background: "var(--background)", borderColor: "var(--card-border)" }}>
                     <div className="h-full bg-gradient-to-r from-pink-500 to-red-500 w-[65%]"></div>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest mb-4 z-10 relative" style={{ color: "var(--text-strong)" }}>
                     <span>$1,450 Donated</span>
                     <span className="text-pink-400">$2,000 Target</span>
                 </div>
                 <button className="text-[10px] font-bold uppercase tracking-widest bg-pink-400 border border-pink-400/30 rounded-lg px-4 py-2.5 w-full relative z-10 hover:bg-pink-300 transition shadow-lg" style={{ color: "#0B1120" }}>Allocate Funds</button>
              </div>
            </div>

            {/* Right Col: Timeline & Bookings */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl p-6 shadow-xl relative z-10" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                 <h3 className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 mb-6 border-b pb-4" style={{ color: "var(--text-strong)", borderColor: "var(--card-border)" }}>
                  <Clock className="w-4 h-4" style={{ color: "var(--text-strong)" }} /> Recent Engagements & Archiving Logs
                </h3>
                
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
                  
                  {/* Item 1 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 bg-heritage-indigo text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" style={{ borderColor: "var(--background)" }}>
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl shadow-md" style={{ background: "var(--background)", border: "1px solid var(--card-border)" }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm uppercase tracking-wider" style={{ color: "var(--text-strong)" }}>Crowd Algorithm Trigger</span>
                        <span className="text-[10px] font-mono text-heritage-cyan font-semibold">March 24</span>
                      </div>
                      <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Analyzed tourist influx at Taj Mahal. &quot;High Crowd&quot; warning triggered for peak hours (14:00 - 18:00).</p>
                      <button className="mt-3 text-[10px] uppercase font-bold text-white bg-heritage-indigo hover:bg-heritage-cyan px-3 py-1.5 rounded-lg transition-colors">Review Dashboard</button>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 bg-emerald-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" style={{ borderColor: "var(--background)" }}>
                      <BookMarked className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl hover:border-emerald-500/50 transition-colors shadow-md" style={{ background: "var(--background)", border: "1px solid var(--card-border)" }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm uppercase tracking-wider" style={{ color: "var(--text-strong)" }}>Folklore Uploaded</span>
                        <span className="text-[10px] font-mono font-semibold" style={{ color: "var(--text-muted)" }}>March 12</span>
                      </div>
                      <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Community user submitted a local oral history audio file regarding the original artisans of Konark.</p>
                      <button className="mt-3 text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">Approve Audio Archive</button>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 text-gray-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" style={{ background: "var(--background)", borderColor: "var(--background)" }}>
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl shadow-md opacity-70" style={{ background: "var(--background)", border: "1px solid var(--card-border)" }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Photo Recognition API</span>
                        <span className="text-[10px] font-mono font-semibold" style={{ color: "var(--text-muted)" }}>Feb 12</span>
                      </div>
                      <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>AI successfully verified and labelled 1,024 tourist-uploaded photos against Lingaraj Temple architectures.</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
