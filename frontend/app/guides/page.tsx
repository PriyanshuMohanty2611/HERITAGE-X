"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Search, 
  Globe, 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  X, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Star, 
  Filter, 
  Compass, 
  Landmark, 
  ExternalLink,
  Sparkles,
  Instagram,
  Facebook,
  Mic,
  Languages,
  Send,
  Anchor
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { TopHeader } from "@/components/TopHeader";
import dynamic from "next/dynamic";

const NeuralRouteMap = dynamic(() => import("@/components/NeuralRouteMap"), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 z-2000 bg-slate-950/20 backdrop-blur-2xl flex items-center justify-center text-white font-black animate-pulse uppercase tracking-[0.5em]">Initializing Neural Map...</div>
});

// ENHANCED GLOBAL SPECIALIST MATRIX
const GLOBAL_GUIDE_NODES = [
  {
    id: 1,
    name: "Ranjan Mohapatra",
    location: "Bhubaneshwar",
    specialty: "Lingaraj Temple Specialist",
    experience: "12 Years",
    age: 42,
    rating: 4.9,
    reviews: 1240,
    address: "Old Town Heritage Sector, Bhubaneswar, Odisha",
    trust: true,
    quote: "Expert in Kalinga Architecture & Saivism history. National award winner 2022.",
    tags: ["Sanskrit Expert", "Architecture", "Photography"],
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=800&auto=format&fit=crop&q=60",
    phone: "094370 12345",
    socials: { ig: "@ranjan_heritage", tw: "@ranjan_kalinga" },
    languages: ["Odia", "Hindi", "English", "German"]
  },
  {
    id: 2,
    name: "Suchitra Dash",
    location: "Konark",
    specialty: "Sun Temple Archaeologist",
    experience: "8 Years",
    age: 35,
    rating: 4.8,
    reviews: 890,
    address: "Marine Drive Road, Konark, Odisha",
    trust: true,
    quote: "Passionate about Sun Temple's celestial geometry and stone carvings.",
    tags: ["Astronomy", "Vedic History", "Art History"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60",
    phone: "099371 67890",
    socials: { ig: "@suchitra_konark", tw: "@suchitra_heritage" },
    languages: ["Odia", "English", "Bengali"]
  },
  {
    id: 3,
    name: "Sandeep Mishra",
    location: "Varanasi",
    specialty: "Ghat & Ritual Specialist",
    experience: "15 Years",
    age: 48,
    rating: 5.0,
    reviews: 3100,
    address: "Dashashwamedh Ghat region, Varanasi, UP",
    trust: true,
    quote: "Exploring the spiritual heartbeat of Kashi since 2008.",
    tags: ["Spirituality", "Sanskrit", "Mythology"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60",
    phone: "098610 56789",
    socials: { ig: "@sandeep_kashi", tw: "@benares_guide" },
    languages: ["Hindi", "Sanskrit", "English", "French"]
  }
];

export default function GuideFinderPage() {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [locationQuery, setLocationQuery] = useState("Bhubaneshwar");
  const [searchQuery, setSearchQuery] = useState("Tourist Guide Services");
  const [showProtocolDropdown, setShowProtocolDropdown] = useState(false);
  
  // GEOLOCATION PROTOCOL STATE
  const [sourceCoords, setSourceCoords] = useState<{lat: number, lng: number} | null>(null);
  const [destCoords, setDestCoords] = useState<{lat: number, lng: number}>({lat: 20.2961, lng: 85.8245}); // Default: BBSR
  const [showMapModal, setShowMapModal] = useState(false);

  const handleSyncCurrentNode = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSourceCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationQuery("User Active Node Sync");
        },
        (err) => console.error("Geolocation Protocol Denied", err)
      );
    }
  };

  const filteredGuides = GLOBAL_GUIDE_NODES.filter(guide => 
    guide.location.toLowerCase().includes(locationQuery.toLowerCase())
  );

  const handleEnquiry = (guide: any) => {
    setSelectedGuide(guide);
    setShowEnquiry(true);
  };

  return (
    <main className="heritage-page-shell flex h-screen w-screen font-sans overflow-hidden bg-slate-50 text-slate-950 relative">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <div className="bg-white h-20 flex items-center justify-between px-6 z-20 shrink-0 border-b border-slate-200 shadow-sm">
          <TopHeader />
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* JUSTDIAL STYLE SEARCH BAR (Enhanced) */}
          <div className="bg-white border-b border-slate-200 py-6 px-4 md:px-10 sticky top-0 z-30 shadow-lg backdrop-blur-3xl bg-white/95 transition-all duration-300">
             <div className="max-w-[1500px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-16">
                
                {/* LOGO NODE - High Visibility */}
                <Link href="/" className="flex items-center gap-5 shrink-0 group">
                   <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-blue-600/30 shadow-2xl group-hover:rotate-12 transition-transform">
                      <Zap className="w-7 h-7 text-white" />
                   </div>
                   <div className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight italic whitespace-nowrap">
                      Heritage<span className="text-blue-600 px-1">X</span> marketplace
                   </div>
                </Link>
                
                 {/* SEARCH MATRIX - High Clarity 'FROM -> TO' Protocol */}
                 <div className="flex-1 flex flex-col md:flex-row items-center gap-0 w-full shadow-[0_20px_80px_rgba(37,99,235,0.12)] rounded-4xl overflow-hidden border-2 border-slate-100 bg-white group/matrix relative">
                    {/* FROM: Location Node */}
                    <div className="flex flex-col flex-1 px-10 py-4 border-r-2 border-slate-50 group/loc focus-within:bg-slate-50/50 transition-all relative">
                       <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-3">
                             <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">From:</span>
                             <MapPin className="w-4 h-4 text-blue-500 group-hover/loc:scale-110 transition-transform" />
                          </div>
                          <button 
                            onClick={handleSyncCurrentNode}
                            className="text-[8px] font-black text-slate-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-widest transition-colors"
                            title="Sync Current Node"
                          >
                             <Zap className="w-2.5 h-2.5 animate-pulse" /> USE_CURRENT
                          </button>
                       </div>
                       <input 
                         type="text" 
                         value={locationQuery}
                         onChange={(e) => setLocationQuery(e.target.value)}
                         placeholder="Origin City..."
                         className="bg-transparent text-[14px] font-black w-full outline-none text-slate-950 uppercase tracking-tight placeholder:text-slate-300" 
                       />
                       {sourceCoords && (
                          <div className="absolute bottom-2 left-10 text-[7px] font-black text-emerald-500 uppercase tracking-widest">
                             SRC_COORD: {sourceCoords.lat.toFixed(4)}N, {sourceCoords.lng.toFixed(4)}E
                          </div>
                       )}
                    </div>

                    {/* ORBITAL SEPARATOR (The 'To' Bridge) */}
                    <button 
                       onClick={() => setShowMapModal(true)}
                       className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border-2 border-slate-100 rounded-full items-center justify-center shadow-lg group-hover/matrix:scale-110 transition-transform hover:bg-blue-600 hover:text-white group/mapbtn"
                    >
                       <ChevronRight className="w-5 h-5 text-blue-600 group-hover/mapbtn:text-white animate-pulse" />
                       <div className="absolute -bottom-6 text-[7px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-0 group-hover/mapbtn:opacity-100 whitespace-nowrap">VIEW_ROUTE_MAP</div>
                    </button>

                    {/* TO: Specialist Node */}
                    <div className="flex flex-col flex-1 px-10 py-4 pl-12 group/search w-full overflow-hidden">
                       <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em]">To:</span>
                          <Search className="w-4 h-4 text-slate-400 group-focus-within/search:text-rose-500 transition-colors" />
                       </div>
                       <input 
                         type="text" 
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         placeholder="Specialist Service..."
                         className="bg-transparent text-[14px] font-black w-full outline-none text-slate-950 uppercase tracking-tight truncate" 
                       />
                       <div className="absolute bottom-2 left-12 text-[7px] font-black text-rose-500 uppercase tracking-widest">
                          DEST_COORD: {destCoords.lat.toFixed(4)}N, {destCoords.lng.toFixed(4)}E
                       </div>
                    </div>

                    {/* NEURAL SEARCH TRIGGER */}
                    <div className="p-2 shrink-0">
                       <button className="w-16 h-16 bg-slate-950 text-white rounded-[1.8rem] flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-all shadow-2xl active:scale-90 group/btn">
                          <Search className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                       </button>
                    </div>
                 </div>

                {/* PROTOCOL ACCESS - Aligned */}
                <div className="flex items-center gap-8 md:gap-12 shrink-0">
                   <div className="flex items-center gap-4 group translate-y-0.5 cursor-pointer">
                      <div className="flex flex-col text-right">
                         <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Language</span>
                         <span className="text-xs font-black text-slate-950 tracking-tighter">EN_GLOBAL</span>
                      </div>
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 transition-all shadow-sm">
                         <Globe className="w-5 h-5 text-blue-600 group-hover:text-white group-hover:rotate-12 transition-all" />
                      </div>
                   </div>
                   <div className="hidden lg:block w-px h-8 bg-slate-200" />
                   <button className="px-8 md:px-12 py-4 md:py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl active:scale-95 whitespace-nowrap border border-white/10">Merchant Sign In</button>
                </div>
             </div>
          </div>

          <div className="max-w-[1400px] mx-auto p-10">
             <div className="flex flex-col lg:flex-row gap-12">
                
                {/* LISTING PROTOCOL (Left Side) */}
                <div className="flex-1 space-y-10">
                   <div className="space-y-6">
                      <nav className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                         <span>{locationQuery || "Global Matrix"}</span> <ChevronRight className="w-3 h-3" />
                         <span className="text-blue-600">Verified Personnel Hub</span> <ChevronRight className="w-3 h-3" />
                         <span className="text-slate-950">{filteredGuides.length} Active Nodes</span>
                      </nav>
                      <div className="flex justify-between items-end border-b border-slate-200 pb-8">
                         <div className="space-y-2">
                           <h1 className="text-4xl lg:text-5xl font-black text-slate-950 italic tracking-tighter uppercase leading-none">Specialist <span className="text-blue-600">Guide</span> Suggestion</h1>
                           <p className="text-sm font-medium text-slate-500">Sovereign Deployment of Certified Archaeological Specialists in {locationQuery || "India"}.</p>
                         </div>
                         <button onClick={() => { setLocationQuery(""); setSearchQuery(""); }} className="px-6 py-3 border-2 border-slate-950 text-[10px] font-black text-slate-950 uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all rounded-xl">Reset Hub Matrix</button>
                      </div>
                   </div>

                   {/* DYNAMIC FILTER MATRIX */}
                   <div className="flex flex-wrap items-center gap-3 bg-slate-100/50 p-4 rounded-3xl border border-slate-100">
                      <button className="px-6 py-3 bg-white border border-blue-200 rounded-2xl text-[10px] font-black text-blue-600 flex items-center gap-3 shadow-sm">
                         <Filter className="w-3.5 h-3.5" /> RELEVANCE SORT
                      </button>
                      <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-500 flex items-center gap-3 hover:border-blue-500 transition-all">
                         <Star className="w-3.5 h-3.5" /> TOP RATINGS
                      </button>
                      <div className="w-px h-6 bg-slate-200 mx-2" />
                      <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-500 flex items-center gap-2">✓ JD_VERIFIED</button>
                      <div className="flex-1" />
                      <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 flex items-center gap-3">
                         <Compass className="w-4 h-4" /> ALL PROTOCOLS
                      </button>
                   </div>

                   {/* CARDS GRID */}
                   <div className="space-y-8">
                      {filteredGuides.length > 0 ? filteredGuides.map((guide) => (
                         <div key={guide.id} className="bg-white border-2 border-slate-100 rounded-4xl p-10 flex flex-col md:flex-row gap-10 hover:border-blue-600/30 transition-all group shadow-2xl shadow-blue-900/5 relative overflow-hidden">
                            {/* Card Media node */}
                            <div className="w-full md:w-80 h-[420px] rounded-4xl overflow-hidden relative shrink-0 shadow-2xl border-4 border-white">
                               <img src={guide.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" alt={guide.name} />
                               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10" />
                               
                               <div className="absolute top-5 left-5 px-4 py-2 bg-blue-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl border border-blue-400/30 z-20">
                                  {guide.experience} Exp
                               </div>

                               <div className="absolute bottom-6 left-6 right-6 z-20">
                                  <div className="flex items-center gap-4 mb-5">
                                     <a href={`https://instagram.com/${guide.socials.ig}`} target="_blank" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-pink-600 transition-all border border-white/20">
                                        <Instagram className="w-4 h-4" />
                                     </a>
                                     <a href={`https://twitter.com/${guide.socials.tw}`} target="_blank" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-blue-400 transition-all border border-white/20">
                                        <Facebook className="w-4 h-4" />
                                     </a>
                                  </div>
                                  <div className="flex items-center gap-3">
                                     <div className="w-12 h-1 bg-blue-600 rounded-full" />
                                     <span className="text-[10px] font-black text-white uppercase tracking-widest opacity-80">Verified Guide #{guide.id}</span>
                                  </div>
                               </div>
                            </div>

                            {/* Info node */}
                            <div className="flex-1 flex flex-col justify-between py-2">
                               <div className="space-y-6">
                                  <div className="flex justify-between items-start">
                                     <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                           <h2 className="text-4xl font-black text-slate-950 group-hover:text-blue-600 transition-colors uppercase italic tracking-tight leading-none">{guide.name}</h2>
                                           {guide.trust && <ShieldCheck className="w-6 h-6 text-emerald-500" />}
                                        </div>
                                        <div className="flex items-center gap-4">
                                           <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">{guide.specialty}</p>
                                           <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{guide.age} Years Old</p>
                                        </div>
                                     </div>
                                     <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-2 bg-slate-950 text-white px-4 py-2 rounded-2xl text-[14px] font-black shadow-lg">
                                           {guide.rating} <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        </div>
                                        <p className="text-[9px] font-black text-slate-400 mt-2 uppercase tracking-widest">{guide.reviews} Connections</p>
                                     </div>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-3">
                                     {guide.languages.map(lang => (
                                        <span key={lang} className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 shadow-sm">
                                           <Globe className="w-3 h-3" /> {lang}
                                        </span>
                                     ))}
                                     <div className="w-px h-6 bg-slate-100 mx-2" />
                                     {guide.tags.map(tag => (
                                        <span key={tag} className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-[9px] font-black text-blue-600 uppercase tracking-widest transition-all hover:bg-blue-600 hover:text-white cursor-help">
                                           {tag}
                                        </span>
                                     ))}
                                  </div>

                                  <div className="space-y-5">
                                     <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 shrink-0 mt-0.5">
                                           <MapPin className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="space-y-1">
                                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Operational Sector</p>
                                           <p className="text-[13px] font-bold text-slate-600 leading-relaxed italic">{guide.address}</p>
                                        </div>
                                     </div>
                                     <div className="flex items-start gap-4 px-6 py-4 border-l-4 border-emerald-500 bg-emerald-50/30 rounded-r-2xl">
                                        <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                                        <p className="text-xs font-black text-slate-950 italic opacity-90 leading-relaxed">{guide.quote}</p>
                                     </div>
                                  </div>
                               </div>

                               <div className="flex flex-wrap items-center gap-4 mt-10">
                                  <a href={`tel:${guide.phone}`} className="h-16 px-10 bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-slate-950 transition-all shadow-2xl shadow-emerald-900/20 active:scale-95">
                                     <Phone className="w-4 h-4" /> {guide.phone}
                                  </a>
                                  <button onClick={() => window.open(`https://wa.me/${guide.phone.replace(/\s/g, '')}`, '_blank')} className="h-16 px-10 bg-white border-2 border-slate-950 text-slate-950 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-slate-950 hover:text-white transition-all active:scale-95">
                                     <MessageSquare className="w-4 h-4" /> WHATSAPP_SYNC
                                  </button>
                                  <button onClick={() => handleEnquiry(guide)} className="h-16 flex-1 lg:flex-none px-12 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-slate-950 transition-all shadow-2xl shadow-blue-900/30 active:scale-95">
                                     SECURE BOOKING <ChevronRight className="w-5 h-5" />
                                  </button>
                               </div>
                            </div>
                         </div>
                      )) : (
                        <div className="p-24 bg-white border-4 border-dashed border-slate-100 rounded-4xl text-center space-y-8 shadow-sm">
                           <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto border-2 border-slate-100 shadow-inner">
                              <Compass className="w-12 h-12 text-slate-300 animate-spin-slow" />
                           </div>
                           <div className="max-w-md mx-auto space-y-3">
                              <h3 className="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">No Active Specialist Nodes</h3>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed">Heritage-X protocols for <span className="text-blue-600 font-black">"{locationQuery}"</span> are currently initializing. Try **Bhubaneshwar**, **Konark**, or **Varanasi**.</p>
                           </div>
                           <button onClick={() => { setLocationQuery("Bhubaneshwar"); setSearchQuery("Tourist Guide Services"); }} className="px-12 py-5 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-blue-600/30 hover:bg-slate-950 transition-all">REBOOT SEARCH ARCHIVE</button>
                        </div>
                      )}
                   </div>

                   {/* VERIFIED EXTERNAL LINK PROTOCOL */}
                   <div className="p-10 bg-slate-950 rounded-[3rem] flex flex-col lg:flex-row items-center justify-between gap-10 group relative overflow-hidden">
                      <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-8 relative z-10">
                         <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                            <Anchor className="w-10 h-10 text-white" />
                         </div>
                         <div>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Verified Global Data Feed</h3>
                            <p className="text-sm font-bold text-slate-400">Cross-reference with real-time JustDial archives for Bhubaneshwar Tourist Guide Services.</p>
                         </div>
                      </div>
                      <a href="https://www.justdial.com/Bhubaneshwar/Tourist-Guide-Services/nct-10489777" target="_blank" className="px-12 py-6 bg-white text-slate-950 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all flex items-center gap-4 relative z-10 shadow-3xl">
                         ACCESS SOURCE MATRIX <ExternalLink className="w-5 h-5" />
                      </a>
                   </div>
                </div>

                {/* RIGHT CONSOLE (SIDEBAR) */}
                <div className="w-full lg:w-[420px] space-y-10 relative">
                   {/* ENQUIRY DROPDOWN PROTOCOL */}
                   <div className="relative group/protocol sticky top-44 z-40">
                      <button 
                        onClick={() => setShowProtocolDropdown(!showProtocolDropdown)}
                        className="w-full py-8 bg-white border-2 border-slate-950 rounded-[2.5rem] flex items-center justify-center gap-6 shadow-3xl hover:bg-slate-950 hover:text-white transition-all group/pbtn active:scale-95"
                      >
                         <Sparkles className="w-6 h-6 text-blue-600 group-hover/pbtn:rotate-12 transition-transform" />
                         <span className="text-xl font-black uppercase italic tracking-tighter">Best Specialist Protocol</span>
                         <ChevronLeft className={`w-5 h-5 transition-transform ${showProtocolDropdown ? '-rotate-90' : 'rotate-0'}`} />
                      </button>

                      {/* DROPDOWN MENU - Aligned Right */}
                      {showProtocolDropdown && (
                         <div className="absolute top-[110%] right-0 w-full bg-white border-2 border-slate-100 rounded-[3.5rem] p-10 space-y-8 shadow-4xl animate-in fade-in slide-in-from-top-4 duration-300 z-50">
                            <div className="space-y-3">
                               <div className="flex items-center justify-between">
                                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Integrated Enquiry Node</p>
                                  <div className="w-8 h-2 bg-blue-600 rounded-full" />
                               </div>
                               <h4 className="text-2xl font-black text-slate-950 italic tracking-tighter uppercase leading-none">Initialize <span className="text-blue-600">Contact</span></h4>
                               <div className="h-0.5 w-full bg-slate-100" />
                            </div>

                            <div className="space-y-5">
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity*</label>
                                  <input type="text" placeholder="Full Name Node" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-black outline-none focus:border-blue-600 transition-all italic" />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Channel*</label>
                                  <input type="text" placeholder="+91 Node ID" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-black outline-none focus:border-blue-600 transition-all italic" />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Specialist Select*</label>
                                  <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-black outline-none focus:border-blue-600 transition-all italic appearance-none cursor-pointer">
                                     <option>Auto-Detect Closest Node</option>
                                     {filteredGuides.map(g => <option key={g.id}>{g.name} - {g.location}</option>)}
                                  </select>
                               </div>
                               <button className="w-full py-6 bg-blue-600 text-white font-black uppercase tracking-[0.3em] text-[11px] rounded-3xl shadow-xl hover:bg-slate-950 transition-all active:scale-95 flex items-center justify-center gap-4 mt-4">
                                  BROADCAST ENQUIRY <ChevronRight className="w-5 h-5" />
                               </button>
                            </div>
                         </div>
                      )}
                   </div>

                   {/* ADVERTISEMENT MATRIX */}
                   <div className="bg-linear-to-br from-blue-700 via-blue-800 to-slate-950 rounded-[3.5rem] p-12 space-y-10 text-white relative overflow-hidden group border border-white/20 shadow-3xl sticky top-[550px]">
                      <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-blue-500/30 blur-[100px] group-hover:bg-blue-400/50 transition-all duration-700" />
                      <div className="relative z-10 space-y-8">
                         <div className="flex items-center gap-3">
                            <Landmark className="w-5 h-5 text-blue-400" />
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-300">Merchant Connect Protocol</p>
                         </div>
                         <h3 className="text-5xl font-black italic tracking-tighter leading-[1.1]">Connect with <span className="text-blue-400">19.3 Crore+</span> Sovereign Buyers</h3>
                         <div className="h-1 w-20 bg-white/20" />
                         <p className="text-[11px] font-black text-slate-300 leading-relaxed uppercase tracking-[0.2em]">Scale your heritage assets to a global audience via the Heritage-X Integration Hub.</p>
                         <button className="w-full py-6 bg-white text-slate-950 font-black uppercase tracking-[0.25em] text-[11px] rounded-3xl flex items-center justify-center gap-4 hover:shadow-2xl transition-all active:scale-95 group/btn">
                            LIST ASSETS <span className="text-emerald-600 font-bold">NODE_FREE</span> <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                         </button>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </div>

      {/* ENQUIRY OVERLAY TERMINAL */}
      {showEnquiry && selectedGuide && (
         <div className="fixed inset-0 z-2000 flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-2xl" onClick={() => setShowEnquiry(false)} />
            <div className="relative w-full max-w-xl bg-white rounded-[4rem] shadow-4xl overflow-hidden p-16 space-y-10 animate-in fade-in zoom-in duration-500 border border-slate-100">
               <div className="flex justify-between items-start">
                  <div className="space-y-3">
                     <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em]">Live Enquiry Broadcast</p>
                     <h3 className="text-4xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">{selectedGuide.name}</h3>
                     <div className="h-1 w-12 bg-blue-600" />
                  </div>
                  <button onClick={() => setShowEnquiry(false)} className="w-14 h-14 rounded-full bg-slate-50 hover:bg-slate-950 hover:text-white flex items-center justify-center text-slate-400 transition-all shadow-sm"><X className="w-8 h-8" /></button>
               </div>
               
               <div className="space-y-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Requester Identity Node</label>
                     <input type="text" placeholder="Verification Name" className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-xs font-black outline-none focus:border-blue-600 transition-all text-slate-950 italic" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Protocol Number</label>
                     <input type="text" placeholder="+91 Node ID" className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-xs font-black outline-none focus:border-blue-600 transition-all text-slate-950 italic" />
                  </div>
                  <button className="w-full py-7 bg-blue-600 text-white font-black uppercase tracking-[0.4em] text-[12px] rounded-full shadow-[0_20px_60px_rgba(37,99,235,0.3)] hover:bg-slate-950 transition-all flex items-center justify-center gap-6 active:scale-95">CONFIRM BROADCAST <Send className="w-6 h-6" /></button>
               </div>
               
               <div className="flex items-center justify-center gap-4 pt-10 border-t border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Sovereign Data Shield v5.2 Active</p>
               </div>
            </div>
         </div>
      )}

      {/* NEURAL ROUTE TERMINAL */}
      {showMapModal && (
        <NeuralRouteMap 
          source={sourceCoords}
          destination={destCoords}
          onClose={() => setShowMapModal(false)}
          onUpdateDestination={(coords) => setDestCoords(coords)}
          onUpdateSource={(coords) => setSourceCoords(coords)}
        />
      )}
    </main>
  );
}
