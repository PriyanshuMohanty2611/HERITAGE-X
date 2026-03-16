"use client";

import { Sidebar } from "../../components/Sidebar";
import {
  Instagram,
  Youtube,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Globe,
} from "lucide-react";
import { useMemo, useState } from "react";
import { TopHeader } from "../../components/TopHeader";

const VLOGS = [
  {
    id: 1,
    title: "Konark: The Sun Chariot Unveiled",
    creator: "Heritage Explorer",
    platform: "youtube",
    videoId: "y4v6kR_sK20",
    likes: "124K",
    description: "360° tour of the Konark Sun Temple with craft interviews and golden-hour shots.",
    comments: "2.1K",
    thumbnail: "/assets/KONARK/konark_hero.png",
    location: "Konark Sun Temple"
  },
  {
    id: 2,
    title: "Hampi's Musical Pillars Secret",
    creator: "Soul Travel India",
    platform: "youtube",
    videoId: "nF1nK3F06V8",
    likes: "98K",
    description: "Demonstration of Hampi’s musical pillars with historians explaining Vijayanagara acoustics.",
    comments: "1.4K",
    thumbnail: "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg",
    location: "Hampi Ruins"
  },
  {
    id: 3,
    title: "Ajanta Caves: 2000 Years of Art",
    creator: "Ancient Architects",
    platform: "youtube",
    videoId: "L7_W_jY1bY0",
    likes: "256K",
    description: "Walkthrough of Ajanta Cave 17 murals; low-light tips and conservation zones.",
    comments: "5.8K",
    thumbnail: "/assets/Ajanta Caves/ajanta-caves-5-to-8-3071.jpg",
    location: "Ajanta Caves"
  },
  {
     id: 4,
     title: "Madurai: The City That Never Sleeps",
     creator: "Gopuram Gaze",
     platform: "instagram",
     videoId: "1Ystj7YpB9E",
     likes: "45K",
     description: "Food, crafts, and evening aarti around Meenakshi with heritage storytelling.",
     comments: "890",
     thumbnail: "/assets/Meenakshi Temple/meenakshi-amman-temple-india.avif",
     location: "Meenakshi Temple"
  }
];

const INSTA_POSTS = [
  {
    id: 1,
    user: "travel_with_heritage",
    img: "/assets/Taj Mahal/gettyimages-155096944-612x612.jpg",
    caption: "The morning light at Taj is purely spiritual. #TajMahal #IncredibleIndia",
    likes: "12,450"
  },
  {
    id: 2,
    user: "temple_tails",
    img: "/assets/KONARK/download (2).jpg",
    caption: "Intricacy level: 1000. Konark Sun Temple wheels are mind-blowing! #OdishaArchitecture",
    likes: "8,941"
  },
  {
    id: 3,
    user: "ruins_hunter",
    img: "/assets/Hampi Ruins/vitthala-temple-complex-hampi-tri-hero.jpg",
    caption: "Walking through time at Hampi. Every stone tells a story. #Vijayanagara #HeritageX",
    likes: "15,802"
  }
];

export default function VlogsTourismPage() {
  const [activeTab, setActiveTab] = useState<"vlogs" | "social">("vlogs");
  const [activeVideo, setActiveVideo] = useState(VLOGS[0]);
  const activeVideoUrl = useMemo(() => {
    if (activeVideo.platform === "youtube") return `https://www.youtube.com/embed/${activeVideo.videoId}`;
    return `https://www.youtube.com/embed/${activeVideo.videoId}`;
  }, [activeVideo]);

  return (
    <main className="heritage-page-shell flex h-screen w-screen font-sans overflow-hidden" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Background image — Vlogs page */}
      <div className="page-bg" style={{ backgroundImage: "url('/assets/Meenakshi Temple/27104002564_c0e6de4e06_b.jpg')" }} />
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 pt-14 lg:pt-0">
        
        {/* Header Section */}
        <div className="p-5 flex items-center justify-between shrink-0 header-glass">
           <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase" style={{ color: "var(--text-strong)" }}>Tourism Hub</h1>
              <p className="text-[10px] font-black uppercase tracking-widest mt-0.5 text-blue-500">Social Feed & Voxel Logs v2.0</p>
           </div>
           <div className="flex items-center gap-4">
              <TopHeader />
              <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                 <button 
                   onClick={() => setActiveTab("vlogs")}
                   className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                   style={{ background: activeTab === "vlogs" ? "#2563eb" : "transparent", color: activeTab === "vlogs" ? "white" : "var(--text-muted)" }}
                 >Vlog Matrix</button>
                 <button 
                   onClick={() => setActiveTab("social")}
                   className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                   style={{ background: activeTab === "social" ? "#2563eb" : "transparent", color: activeTab === "social" ? "white" : "var(--text-muted)" }}
                 >Social Pulse</button>
              </div>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide relative z-0">
           {activeTab === "vlogs" ? (
             <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-8">
               <div className="card overflow-hidden border border-white/10 bg-white/5">
                 <div className="relative w-full aspect-video bg-black">
                   <iframe
                     src={activeVideoUrl}
                     title={activeVideo.title}
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                     allowFullScreen
                     className="absolute inset-0 w-full h-full"
                   />
                 </div>
                 <div className="p-6 space-y-2">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 flex items-center gap-2">
                     <Youtube className="w-3 h-3 text-red-500" /> Now Playing
                   </p>
                   <h2 className="text-2xl font-black uppercase tracking-tight text-white">{activeVideo.title}</h2>
                   <p className="text-sm text-slate-300">By {activeVideo.creator} · {activeVideo.location}</p>
                   <p className="text-sm text-slate-400 leading-relaxed">{activeVideo.description}</p>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {VLOGS.map((vlog) => (
                   <button
                     key={vlog.id}
                     onClick={() => setActiveVideo(vlog)}
                     className={`group text-left rounded-3xl border overflow-hidden shadow-xl transition-all ${activeVideo.id === vlog.id ? "border-blue-500/60 bg-white/10" : "border-white/10 bg-white/5 hover:border-blue-400/40"}`}
                   >
                     <div className="relative aspect-video overflow-hidden">
                       <img
                         src={vlog.thumbnail}
                         alt={vlog.title}
                         className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                         loading="lazy"
                       />
                       <div className="absolute inset-0 bg-black/40" />
                       <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 border border-white/10 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.25em] text-white">
                         {vlog.platform === "youtube" ? <Youtube className="w-3 h-3 text-red-500" /> : <Instagram className="w-3 h-3 text-pink-500" />}
                         {vlog.platform}
                       </div>
                       <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[10px] font-black uppercase tracking-[0.25em]">
                         <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-heritage-cyan" />{vlog.location}</span>
                         <span className="flex items-center gap-2"><Heart className="w-3 h-3 text-red-500" />{vlog.likes}</span>
                       </div>
                     </div>
                     <div className="p-4 space-y-2">
                       <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Channel: {vlog.creator}</p>
                       <h3 className="text-lg font-black text-white uppercase tracking-tight">{vlog.title}</h3>
                       <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{vlog.description}</p>
                     </div>
                   </button>
                 ))}
               </div>
             </div>
           ) : (
             <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {INSTA_POSTS.map(post => (
                      <div key={post.id} className="card overflow-hidden" style={{ border: "1px solid var(--card-border)" }}>
                         <div className="p-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-heritage-gold via-pink-500 to-indigo-500 p-0.5 animate-spin-slow">
                                  <div className="w-full h-full rounded-full bg-[#131b2f] p-0.5">
                                     <div className="w-full h-full rounded-full bg-heritage-indigo/20 flex items-center justify-center font-black text-[8px] text-white">HX</div>
                                  </div>
                               </div>
                               <span className="text-[10px] font-black text-white">@{post.user}</span>
                            </div>
                            <button className="text-gray-500 hover:text-white"><Share2 className="w-4 h-4" /></button>
                         </div>
                         <div className="aspect-square overflow-hidden relative">
                       <img src={post.img} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" alt="Post" loading="lazy" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <Heart className="w-20 h-20 text-white animate-pulse" />
                            </div>
                         </div>
                         <div className="p-4">
                            <div className="flex gap-4 mb-3">
                               <Heart className="w-5 h-5 cursor-pointer" style={{ color: "var(--text-muted)" }} />
                               <MessageCircle className="w-5 h-5 cursor-pointer" style={{ color: "var(--text-muted)" }} />
                               <Share2 className="w-5 h-5 cursor-pointer" style={{ color: "var(--text-muted)" }} />
                            </div>
                            <p className="text-[10px] font-black mb-1" style={{ color: "var(--text-strong)" }}>{post.likes} likes</p>
                            <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                               <span className="font-bold mr-1" style={{ color: "var(--text-strong)" }}>@{post.user}</span>
                               {post.caption}
                            </p>
                            <p className="text-[8px] font-black uppercase tracking-widest mt-3 text-blue-500">2 hours ago · Heritage Verified</p>
                         </div>
                      </div>
                   ))}
                </div>

                {/* Peer Feedback Section */}
                <div className="pt-20 border-t border-white/5">
                   <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-12 flex items-center gap-4">
                      <Globe className="w-8 h-8 text-heritage-gold" /> Peer Feedback Network
                   </h2>
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {[
                        { name: "Arjun Mehta", role: "Archaeologist @ ASI", platform: "linkedin", text: "The Voxel imagery integration on Heritage-X is a game changer for remote monitoring of crumbling sandstone structures. Essential tech.", date: "LinkedIn · Mar 14" },
                        { name: "Sarah Jenkins", role: "Travel Vlogger", platform: "twitter", text: "Just used the Heritage-X VR booking for Konark. The level of detail on the chariot wheels is insane! 10/10 would explore again.", date: "Twitter · 2h ago" },
                      ].map((feedback, i) => (
                        <div key={i} className="card p-6" style={{ border: "1px solid var(--card-border)" }}>
                           <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-blue-600" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
                                    {feedback.name.charAt(0)}
                                 </div>
                                 <div>
                                    <h4 className="text-sm font-black uppercase" style={{ color: "var(--text-strong)" }}>{feedback.name}</h4>
                                    <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{feedback.role}</p>
                                 </div>
                              </div>
                           </div>
                           <p className="text-xs leading-relaxed italic" style={{ color: "var(--text-muted)" }}>&quot;{feedback.text}&quot;</p>
                           <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mt-3">{feedback.date}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </main>
  );
}
