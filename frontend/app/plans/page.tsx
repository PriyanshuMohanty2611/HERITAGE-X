"use client";

import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { 
  Check, Zap, Shield, Globe, Cpu, Users, 
  ArrowRight, Sparkles, Award, Star, History,
  Database, Radio, BrainCircuit
} from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Explorer",
    price: "Free",
    desc: "Entry-level heritage access for casual seekers.",
    features: [
      "Standard AI Identification",
      "Limited Circuit Generation",
      "Basic Heritage Repository",
      "Mobile Sync (1 Device)"
    ],
    cta: "Start Exploring",
    highlight: false,
    color: "bg-slate-900"
  },
  {
    name: "Sovereign Pro",
    price: "₹999",
    period: "/mo",
    desc: "Unrestricted neural access for heritage professionals.",
    features: [
      "Ultra-Precision LiDAR Scanning",
      "Unlimited 3D Visualizations",
      "Priority Circuit Pathfinding",
      "Deep-State Historical Oracle",
      "Multi-Device Neural Sync",
      "V-Museum Exclusive Access"
    ],
    cta: "Initialize Pro Link",
    highlight: true,
    color: "bg-blue-600"
  },
  {
    name: "Institution",
    price: "Custom",
    desc: "Enterprise-grade mapping for museums & governments.",
    features: [
      "Full IoT Neural Grid Access",
      "White-label Heritage API",
      "Structural Health Monitoring",
      "Custom Dynasty Datasets",
      "24/7 Priority Support"
    ],
    cta: "Contact Command",
    highlight: false,
    color: "bg-slate-950"
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <main className="heritage-page-shell flex min-h-screen w-full font-sans overflow-x-hidden bg-transparent">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-20">
        <div className="header-neural h-20 flex items-center justify-between px-6 z-20 shrink-0 border-b border-slate-50 bg-white/40 backdrop-blur-xl">
          <TopHeader />
        </div>

        <div className="flex-1 p-8 lg:p-16 xl:p-24 overflow-y-auto scrollbar-hide">
          <div className="max-w-[1400px] mx-auto space-y-20">
            
            {/* Header Section */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 text-[10px] font-black uppercase tracking-widest animate-reveal">
                  <Sparkles className="w-3 h-3" /> Subscription Matrix v2.0
               </div>
               <h1 className="text-5xl lg:text-7xl font-black text-slate-950 uppercase italic tracking-tighter leading-none animate-reveal">Select Your <span className="text-blue-600">Access Level</span></h1>
               <p className="text-sm font-medium text-slate-500 italic leading-relaxed animate-reveal">Scale your heritage discovery with our proprietary neural subscription tiers. Professional-grade archaeological tools at your fingertips.</p>
               
               <div className="flex items-center justify-center gap-4 pt-6 animate-reveal">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${billingCycle === 'monthly' ? 'text-slate-950' : 'text-slate-400'}`}>Monthly Transmission</span>
                  <button 
                    onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                    className="w-16 h-8 rounded-full bg-slate-100 border border-slate-200 relative p-1 transition-all"
                  >
                     <div className={`w-6 h-6 rounded-full bg-blue-600 shadow-xl transition-all ${billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'}`} />
                  </button>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${billingCycle === 'yearly' ? 'text-slate-950' : 'text-slate-400'}`}>Yearly Deep-Sync</span>
               </div>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
               {PLANS.map((plan, idx) => (
                 <div key={plan.name} className={`relative p-10 lg:p-12 rounded-[3.5rem] border transition-all hover:-translate-y-4 hover:shadow-3xl ${plan.highlight ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white border-slate-100 text-slate-950'}`}>
                    {plan.highlight && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-slate-950 text-white text-[9px] font-black uppercase tracking-[0.4em] rounded-full shadow-2xl">
                        Recommended Link
                      </div>
                    )}

                    <div className="space-y-8">
                       <div className="space-y-2">
                          <h3 className="text-4xl font-black uppercase italic tracking-tighter">{plan.name}</h3>
                          <p className={`text-xs font-medium italic ${plan.highlight ? 'text-blue-100' : 'text-slate-500'}`}>{plan.desc}</p>
                       </div>

                       <div className="flex items-baseline gap-2">
                          <span className="text-6xl font-black italic">{plan.price}</span>
                          {plan.period && <span className={`text-sm font-black uppercase tracking-widest ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>{plan.period}</span>}
                       </div>

                       <div className="space-y-4 pt-8 border-t border-current opacity-10" />

                       <ul className="space-y-4">
                          {plan.features.map(f => (
                            <li key={f} className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-tight">
                               <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-blue-400' : 'bg-blue-600'}`}>
                                  <Check className="w-3 h-3 text-white" />
                               </div>
                               {f}
                            </li>
                          ))}
                       </ul>

                       <button className={`w-full py-6 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${plan.highlight ? 'bg-slate-950 text-white hover:bg-black' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                          {plan.cta} <ArrowRight className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
               ))}
            </div>

            {/* Trusted By Matrix */}
            <div className="pt-20 border-t border-slate-100 text-center space-y-10">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Powering Heritage Preservation At Scale</p>
               <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
                  <Globe className="w-12 h-12" />
                  <Database className="w-12 h-12" />
                  <Radio className="w-12 h-12" />
                  <BrainCircuit className="w-12 h-12" />
                  <Shield className="w-12 h-12" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
