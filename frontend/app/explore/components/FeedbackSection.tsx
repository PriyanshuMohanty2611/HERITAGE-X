"use client";

import React from "react";
import { Globe, Instagram, Twitter, User, Star, Quote } from "lucide-react";

export const FeedbackSection: React.FC = () => {
  const feedbacks = [
    { name: "Priyanshu Mohanty", role: "Lead Dev @ Heritage-X", platform: "linkedin", text: "The alignment of the Konark Voxel scan is now perfect. The responsiveness is exactly what we needed for the government nodes.", date: "LinkedIn · 1h ago" },
    { name: "Anita Rao", role: "UNESCO Observer", platform: "twitter", text: "Real-time humidity tracking at Ajanta is a lifesaver. Heritage-X is the future of conservation.", date: "Twitter · 4h ago" },
    { name: "Traveler101", role: "Premium Member", platform: "instagram", text: "Booking was seamless. The high-res hero images make the decision so much easier!", date: "Instagram · 12h ago" }
  ];

  return (
    <div className="mt-40 pt-32 border-t border-slate-100 pb-40 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.01] pointer-events-none scale-150 grayscale blur-sm">
         <Quote className="w-[800px] h-[800px] text-slate-900" />
      </div>

      <header className="mb-20 text-center flex flex-col items-center">
        <div className="w-24 h-24 rounded-[2rem] bg-blue-600 flex items-center justify-center mb-10 shadow-3xl shadow-blue-600/20">
           <Globe className="w-12 h-12 text-white animate-[pulse_3s_infinite]" />
        </div>
        <h2 className="text-6xl lg:text-8xl font-black text-slate-950 uppercase italic tracking-tighter leading-none mb-6">
          Peer <span className="text-blue-600">Network</span>
        </h2>
        <p className="text-[13px] font-black text-slate-400 uppercase tracking-[0.6em] mt-2">Verification from Global Heritage Nodes</p>
      </header>
      
      <div className="grid grid-cols-12 gap-10 max-w-7xl mx-auto">
        {feedbacks.map((feedback, i) => (
          <div key={i} className="col-span-12 lg:col-span-4 p-12 rounded-[4rem] bg-white border border-slate-100 hover:border-blue-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] transition-all group relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-6 right-6 p-10 opacity-5 group-hover:opacity-30 transition-all scale-150 group-hover:scale-100 group-hover:text-blue-600">
              {feedback.platform === "linkedin" ? <Instagram className="w-12 h-12" /> : feedback.platform === "twitter" ? <Twitter className="w-12 h-12" /> : <Instagram className="w-12 h-12" />}
            </div>
            
            <Quote className="w-16 h-16 text-slate-100 group-hover:text-blue-50 transition-colors absolute bottom-12 right-12 z-0 scale-x-[-1]" />

            <div className="flex items-center gap-6 mb-12 relative z-10">
              <div className="w-20 h-20 rounded-[1.8rem] bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner group-hover:bg-slate-950 transition-all duration-500">
                <User className="w-10 h-10 text-slate-300 group-hover:text-white transition-colors" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-950 uppercase tracking-tighter italic leading-none">{feedback.name}</h4>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.3em] font-mono">{feedback.role}</p>
              </div>
            </div>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-12 font-medium italic grow relative z-10 opacity-90">
               "{feedback.text}"
            </p>
            
            <div className="flex items-center justify-between pt-10 border-t border-slate-50 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 relative z-10">
              <span>{feedback.date}</span>
              <div className="flex gap-1.5 p-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
