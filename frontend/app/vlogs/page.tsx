"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { 
  Youtube, Play, Clock, Eye, Share2, Search,
  Filter, Award, Globe, Heart, MessageSquare, 
  MapPin, Calendar, Sparkles, ChevronRight, X, Maximize2,
  Minimize2, Volume2, SkipForward, SkipBack, Share, Camera, Info, Bookmark, User, Star
} from "lucide-react";

// ─── Tourism Multimedia Repository ──────────────────────────────────────────
const VLOGS_DATA = [
  // --- LONG VLOGS ---
  {
    id: 1,
    type: "vlogs",
    title: "Konark Sun Temple: The Mathematical Chariot",
    vlogger: "Heritage Explorer",
    thumbnail: "/assets/KONARK/konark_hero.png",
    videoId: "v1eK7fP8j9o",
    duration: "18:45",
    views: "1.2M",
    tags: ["Engineering", "Odisha", "History"],
    desc: "A deep dive into the 13th-century engineering marvel and its solar precision."
  },
  {
    id: 2,
    type: "vlogs",
    title: "Taj Mahal: Secrets of the Marble Symphony",
    vlogger: "Global Nomad",
    thumbnail: "/assets/Taj Mahal/97.png",
    videoId: "e_W2pGj02t0",
    duration: "21:20",
    views: "850K",
    tags: ["Architecture", "Mughal", "Travel"],
    desc: "Exploring the symmetrical perferction and hidden acoustics of the ivory mausoleum."
  },
  {
    id: 3,
    type: "vlogs",
    title: "Puri Rath Yatra: The Divine Pulse",
    vlogger: "Soulful Odyssey",
    thumbnail: "/assets/PURI/jagannath_temple.png",
    videoId: "WlqIe75fDkc",
    duration: "28:10",
    views: "2.5M",
    tags: ["Festival", "Puri", "Spirituality"],
    desc: "Capturing the raw energy of the world's largest chariot pilgrimage."
  },
  {
    id: 4,
    type: "vlogs",
    title: "Lingaraj: The Kalinga Zenith",
    vlogger: "Temple Chronicles",
    thumbnail: "/assets/BHUBANESWAR/lingaraj_temple.png",
    videoId: "3-pL1qfS0Lw",
    duration: "15:30",
    views: "640K",
    tags: ["Odisha", "Shaivism", "Art"],
    desc: "Decoding the structural evolution of the 1,000-year-old sanctuary."
  },
  {
    id: 5,
    type: "vlogs",
    title: "Hampi: Traversing the Vijayanagara Echoes",
    vlogger: "Ancient Trails",
    thumbnail: "/assets/Hampi Ruins/vitthala-temple-complex-hampi-tri-hero.jpg",
    videoId: "vXm80E1O0T8",
    duration: "24:05",
    views: "1.8M",
    tags: ["UNESCO", "Karnataka", "Ruins"],
    desc: "Walking through the boulders and musical pillars of the forgotten capital."
  },
  {
    id: 6,
    type: "vlogs",
    title: "Madurai Meenakshi: The Hall of 1000 Pillars",
    vlogger: "Dravidian Diaries",
    thumbnail: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800",
    videoId: "r4mG_Yw8vY8",
    duration: "22:15",
    views: "920K",
    tags: ["Tamil Nadu", "Dravidian", "Divine"],
    desc: "Uncovering the cosmic energy and intricate gopurams of Madurai."
  },
  {
    id: 7,
    type: "vlogs",
    title: "Khajuraho: The Poetry in Stone",
    vlogger: "Artistic India",
    thumbnail: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800",
    videoId: "zN3GNRn2K2k",
    duration: "19:40",
    views: "710K",
    tags: ["Sandstone", "MP", "Heritage"],
    desc: "Exploring the Chandela Rajput architecture and its sensual stone cravings."
  },
  {
    id: 8,
    type: "vlogs",
    title: "Varanasi: The Oldest Living City",
    vlogger: "Soulful Odyssey",
    thumbnail: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800",
    videoId: "WlqIe75fDkc",
    duration: "25:30",
    views: "3.2M",
    tags: ["Ganga", "Ancient", "Banaras"],
    desc: "Day in the life of the eternal city of lights and liberation."
  },
  {
    id: 9,
    type: "vlogs",
    title: "Kochi: The Colonial Matrix",
    vlogger: "Coastal Nomad",
    thumbnail: "https://images.unsplash.com/photo-1602216056096-3c40cc0c9944?auto=format&fit=crop&q=80&w=800",
    videoId: "vXm80E1O0T8",
    duration: "14:50",
    views: "440K",
    tags: ["Kerala", "Port", "Synagogue"],
    desc: "Traversing the spice markets and chinese fishing nets of Fort Kochi."
  },
  {
    id: 10,
    type: "vlogs",
    title: "Golden Temple: Seva & Spirit",
    vlogger: "Faith Walker",
    thumbnail: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=800",
    videoId: "r4mG_Yw8vY8",
    duration: "18:10",
    views: "2.8M",
    tags: ["Amritsar", "Sikhism", "Gold"],
    desc: "The incredible logistics of the world's largest free kitchen."
  },

  // --- SHORTS ---
  {
    id: 101,
    type: "shorts",
    title: "Hampi's Musical Pillars in 60s",
    vlogger: "Short Travels",
    thumbnail: "/assets/Hampi Ruins/download.jpg",
    videoId: "v0XW_Yw8vY8",
    duration: "0:59",
    views: "4.2M",
    tags: ["Magic", "Hampi"],
    desc: "Hear the acoustic resonance of the stone pillars."
  },
  {
    id: 102,
    type: "shorts",
    title: "Taj Mahal Sunrise Matrix",
    vlogger: "Epic Clips",
    thumbnail: "/assets/Taj Mahal/sunrise-at-taj-mahal--agra--uttar-pradash--india-583682538-5b91840bc9e77c0050bdc67b.jpg",
    videoId: "pX9_zZ1_X8",
    duration: "0:45",
    views: "3.1M",
    tags: ["Aesthetic", "Agra"],
    desc: "The golden hour at the world's most beautiful tomb."
  },
  {
    id: 103,
    type: "shorts",
    title: "Puri Flag Mystery",
    vlogger: "Fact Hub",
    thumbnail: "/assets/KONARK/download (5).jpg",
    videoId: "9y9tX8e_X5s",
    duration: "0:55",
    views: "5.5M",
    tags: ["Miracle", "Puri"],
    desc: "Why does the flag fly against the wind?"
  },
  {
    id: 104,
    type: "shorts",
    title: "Jaipur: The Pink City Glow",
    vlogger: "Vibe Check",
    thumbnail: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=400",
    videoId: "n7H3d_z7vYw",
    duration: "1:00",
    views: "2.2M",
    tags: ["Rajasthan", "Vibe"],
    desc: "Hawa Mahal lit up like a neural board."
  },
  {
    id: 105,
    type: "shorts",
    title: "Varanasi Ganga Arati",
    vlogger: "Soul Clips",
    thumbnail: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=400",
    videoId: "v_r8_f9_X8s",
    duration: "0:58",
    views: "6.8M",
    tags: ["Spiritual", "Banaras"],
    desc: "The cosmic energy of the evening prayers."
  },
  {
    id: 106,
    type: "shorts",
    title: "Ellora: The Monolithic Marvel",
    vlogger: "Rock Cut",
    thumbnail: "https://images.unsplash.com/photo-1621251842825-70e0a4f5cc11?auto=format&fit=crop&q=80&w=400",
    videoId: "X-v-r-9-8-X",
    duration: "0:52",
    views: "1.9M",
    tags: ["Kailash", "Cave"],
    desc: "How was this carved out of a single mountain?"
  },
  {
    id: 107,
    type: "shorts",
    title: "Udaipur Lake Palace Glow",
    vlogger: "Vibe Check",
    thumbnail: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=400",
    videoId: "pX9_zZ1_00",
    duration: "0:50",
    views: "1.1M",
    tags: ["Udaipur", "Luxury"],
    desc: "The white city at midnight."
  },
  {
    id: 108,
    type: "shorts",
    title: "Bhangarh: The Haunted Node",
    vlogger: "Mystery Hunter",
    thumbnail: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=400",
    videoId: "zN3GNRn2K2k",
    duration: "0:60",
    views: "2.4M",
    tags: ["Ghost", "Fort"],
    desc: "Exploring the forbidden fort after sunset."
  },
  {
    id: 109,
    type: "shorts",
    title: "Mysore Palace Lights",
    vlogger: "Royal Clips",
    thumbnail: "https://images.unsplash.com/photo-1621251842825-70e0a4f5cc11?auto=format&fit=crop&q=80&w=400",
    videoId: "e_W2pGj02t0",
    duration: "0:48",
    views: "3.7M",
    tags: ["Mysore", "Illumination"],
    desc: "100,000 bulbs lighting up history."
  },
  {
    id: 110,
    type: "shorts",
    title: "Kerala Backwaters Flow",
    vlogger: "Nature Zen",
    thumbnail: "https://images.unsplash.com/photo-1583062839210-9171b3127521?auto=format&fit=crop&q=80&w=400",
    videoId: "v1eK7fP8j9o",
    duration: "0:56",
    views: "1.8M",
    tags: ["Kerala", "Serene"],
    desc: "The biological pulse of the backwaters."
  },

  // --- CINEMATIC ---
  {
    id: 201,
    type: "cinema",
    title: "INDIA: The Eternal Echoes (4K)",
    vlogger: "Cinema Matrix",
    thumbnail: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1200",
    videoId: "d1p_zZ1Y9sI",
    duration: "05:20",
    views: "10M",
    tags: ["4K", "Cinematic", "Epic"],
    desc: "A high-octane visual journey through the soul of Bharat."
  },
  {
    id: 202,
    type: "cinema",
    title: "Odisha: The Land of Gods",
    vlogger: "Drona View",
    thumbnail: "https://images.unsplash.com/photo-1605649443918-158fa3628379?auto=format&fit=crop&q=80&w=1200",
    videoId: "zN3GNRn2K2k",
    duration: "04:15",
    views: "2.1M",
    tags: ["Drone", "Coastal", "Ancient"],
    desc: "Aerial stabilization of the temple coastal corridor."
  },
  {
    id: 203,
    type: "cinema",
    title: "Rajasthan: The Desert Symphony",
    vlogger: "Visual Art",
    thumbnail: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=1200",
    videoId: "e_W2pGj02t0",
    duration: "06:40",
    views: "4.5M",
    tags: ["Royal", "Cinematic", "Sands"],
    desc: "Majestic forts and floating palaces in high-fidelity."
  },
  {
    id: 204,
    type: "cinema",
    title: "Western Ghats: The Monsoon Matrix",
    vlogger: "Nature Pulse",
    thumbnail: "https://images.unsplash.com/photo-1583062839210-9171b3127521?auto=format&fit=crop&q=80&w=1200",
    videoId: "v1eK7fP8j9o",
    duration: "03:50",
    views: "1.5M",
    tags: ["Bio-Matrix", "Rain", "Lush"],
    desc: "The biological heritage of India's green heart."
  },
  {
    id: 205,
    type: "cinema",
    title: "Varanasi: The City of Light",
    vlogger: "Ethereal India",
    thumbnail: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1200",
    videoId: "WlqIe75fDkc",
    duration: "05:10",
    views: "3.7M",
    tags: ["Ethereal", "Banaras", "Slow-Mo"],
    desc: "Capturing the smoke, the bells, and the eternal flow."
  },
  {
    id: 206,
    type: "cinema",
    title: "Ladakh: The High Altitude Matrix",
    vlogger: "Drona View",
    thumbnail: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1200",
    videoId: "WlqIe75fDkc",
    duration: "04:45",
    views: "2.9M",
    tags: ["Himalayas", "Buddhism"],
    desc: "Cinematic flyovers of the highest monasteries on earth."
  },
  {
    id: 207,
    type: "cinema",
    title: "Golden Triangle: Epic Aerials",
    vlogger: "Visual Art",
    thumbnail: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200",
    videoId: "r4mG_Yw8vY8",
    duration: "07:20",
    views: "5.1M",
    tags: ["Jaipur", "Delhi", "Agra"],
    desc: "A transition-heavy journey through north India's majesty."
  },
  {
    id: 208,
    type: "cinema",
    title: "Spirit of Puri: Grand Chariots",
    vlogger: "Cinema Matrix",
    thumbnail: "/assets/PURI/jagannath_temple.png",
    videoId: "WlqIe75fDkc",
    duration: "03:15",
    views: "1.2M",
    tags: ["4K", "Spirituality"],
    desc: "Slow-motion capture of the million-strong procession."
  },
  {
    id: 209,
    type: "cinema",
    title: "Hampi: Boulder Symphony",
    vlogger: "Epic Clips",
    thumbnail: "/assets/Hampi Ruins/vitthala-temple-complex-hampi-tri-hero.jpg",
    videoId: "zN3GNRn2K2k",
    duration: "08:00",
    views: "3.4M",
    tags: ["4K", "History"],
    desc: "A wide-angle cinematic exploration of the Vijayanagara core."
  },
  {
    id: 210,
    type: "cinema",
    title: "Bharat: A Celebration of Light",
    vlogger: "Drona View",
    thumbnail: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1200",
    videoId: "e_W2pGj02t0",
    duration: "05:55",
    views: "8.9M",
    tags: ["Festivals", "Global"],
    desc: "The ultimate compilation of India's cultural brilliance."
  }
];

const SHAYARI_LIST = [
  { text: "Khayal-e-Yaar me jab-jab palke jhapakti hai, In pattharo me bhi ek jaan dhadakti hai.", author: "Heritage Soul" },
  { text: "Waqt ki dhul ne chehra chhupa rakha hai, In imarato ne sadiyo ka raaz daba rakha hai.", author: "Blogger's Pen" },
  { text: "Kala ki ye misaal hai, Sadiyo ka ye kamaal hai.", author: "Priyanshu Mohanty" },
  { text: "In deewaro pe likha hai dastaan purani, Har ek pathhar sunata hai ek nayi kahani.", author: "Sovereign Poet" }
];

const FOLK_MUSIC = [
  { title: "Odissi Mangalacharan", artist: "Kelucharan Mahapatra", duration: "06:12", type: "Classical" },
  { title: "Baul Geeti: Moner Manush", artist: "Lalon Fakir Tradition", duration: "04:45", type: "Folk" },
  { title: "Sufi Qawwali: Tajdar-e-Haram", artist: "Nizami Bandhu", duration: "12:30", type: "Sufi" },
  { title: "Rajasthani Maand: Kesariya Balam", artist: "Allah Jilai Bai", duration: "05:15", type: "Folk" },
  { title: "Carnatic Thillana", artist: "M.S. Subbulakshmi", duration: "08:20", type: "Classical" }
];

export default function TourismVlogs() {
  const [activeTab, setActiveTab] = useState<"vlogs" | "shorts" | "cinema">("vlogs");
  const [query, setQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVideo, setActiveVideo] = useState(VLOGS_DATA.find(v => v.type === "vlogs")!);

  const filteredVideos = useMemo(() => {
    return VLOGS_DATA.filter(v => 
      v.type === activeTab && 
      (v.title.toLowerCase().includes(query.toLowerCase()) || 
       v.tags.some(t => t.toLowerCase().includes(query.toLowerCase())))
    );
  }, [activeTab, query]);

  useEffect(() => {
    if (filteredVideos.length > 0) {
      setActiveVideo(filteredVideos[0]);
      setIsPlaying(false);
    }
  }, [activeTab]);

  const activeVideoUrl = useMemo(() => {
    return `https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&mute=0&rel=0`;
  }, [activeVideo]);

  return (
    <main className="heritage-page-shell flex min-h-screen w-full font-sans overflow-x-hidden bg-transparent text-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10">
        <div className="header-neural h-20 flex items-center justify-between px-6 z-20 shrink-0 border-b border-slate-100 bg-white/40 backdrop-blur-xl">
          <TopHeader />
        </div>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12 xl:p-16 scrollbar-hide relative z-0">
          <div className="w-full space-y-12 pb-24">
            <header className="flex flex-col lg:flex-row justify-between items-center gap-8">
               <div className="space-y-4 w-full lg:w-auto text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 justify-center lg:justify-start">
                     <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <Youtube className="w-8 h-8 text-white relative z-10" />
                     </div>
                     <div>
                        <h1 className="text-[clamp(1.5rem,8vw,4rem)] font-black tracking-tighter uppercase italic text-slate-950 leading-none">
                           Tourism <span className="text-red-600">Vlogs</span>
                        </h1>
                        <p className="text-[10px] text-red-600 font-black uppercase tracking-[0.4em] mt-2 border-b border-red-600/10 pb-2">Interactive Multimedia Archive</p>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto">
                  <div className="relative group w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600" />
                    <input 
                      type="text" 
                      placeholder="Search archives..." 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full bg-slate-100 border border-slate-200 rounded-2xl py-3 pl-12 pr-6 text-xs font-bold outline-none focus:border-red-600/30"
                    />
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-3xl border border-slate-200 shrink-0">
                    <button onClick={() => setActiveTab("vlogs")} className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'vlogs' ? 'bg-white text-red-600 shadow-md' : 'text-slate-400 hover:text-slate-900'}`}>Full Series</button>
                    <button onClick={() => setActiveTab("shorts")} className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'shorts' ? 'bg-white text-red-600 shadow-md' : 'text-slate-400 hover:text-slate-900'}`}>Short Clips</button>
                    <button onClick={() => setActiveTab("cinema")} className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'cinema' ? 'bg-white text-red-600 shadow-md' : 'text-slate-400 hover:text-slate-900'}`}>Cinematic</button>
                  </div>
               </div>
            </header>

            <div className="grid grid-cols-12 gap-12">
               {/* Main Theatre (8/12) */}
               <div className="col-span-12 xl:col-span-8 space-y-10">
                  <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-slate-950 shadow-3xl group border-8 border-white/50 ring-1 ring-slate-200 ring-offset-8 ring-offset-transparent">
                     {isPlaying ? (
                       <iframe 
                         src={activeVideoUrl}
                         className="w-full h-full"
                         allow="autoplay; encrypted-media"
                         allowFullScreen
                       />
                     ) : (
                       <div className="relative w-full h-full">
                          <img src={activeVideo.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2000ms]" />
                          <button onClick={() => setIsPlaying(true)} className="absolute inset-0 flex items-center justify-center group/btn">
                             <div className="w-24 h-24 rounded-full bg-red-600/90 flex items-center justify-center shadow-2xl group-hover/btn:scale-125 transition-all duration-500">
                                <Play className="w-10 h-10 text-white fill-white ml-1" />
                             </div>
                             <div className="absolute inset-x-8 bottom-8 text-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/70">Neural Link Stable</p>
                                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">{activeVideo.title}</h2>
                             </div>
                          </button>
                       </div>
                     )}
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between items-start gap-8 p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl">
                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center overflow-hidden">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeVideo.vlogger}`} className="w-full h-full" />
                           </div>
                           <div>
                              <p className="text-xs font-black text-slate-950 uppercase">{activeVideo.vlogger}</p>
                              <div className="flex items-center gap-2">
                                 <Award className="w-3 h-3 text-red-600" />
                                 <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">Verified Heritage Creator</span>
                              </div>
                           </div>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black italic uppercase tracking-tighter text-slate-950">{activeVideo.title}</h2>
                        <p className="text-sm font-bold text-slate-500 max-w-2xl leading-relaxed italic">"{activeVideo.desc}"</p>
                     </div>
                     <div className="flex items-center gap-4 shrink-0">
                        <button className="px-6 py-3 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-red-600/20 active:scale-95 transition-all">
                           <Heart className="w-4 h-4" /> {activeVideo.views}
                        </button>
                        <button className="px-6 py-3 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-all">
                           <Share2 className="w-4 h-4" /> Distribute
                        </button>
                     </div>
                  </div>

                  {/* Shayari & Music Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        {SHAYARI_LIST.map((sh, idx) => (
                           <div key={idx} className="p-8 bg-slate-900 rounded-[2.5rem] border border-white/5 space-y-6 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 blur-3xl -mr-8 -mt-8" />
                              <MessageSquare className="w-6 h-6 text-red-600/50" />
                              <p className="text-sm font-medium text-white/90 leading-relaxed italic">"{sh.text}"</p>
                              <div className="pt-4 border-t border-white/5">
                                 <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">— {sh.author}</p>
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl space-y-8">
                        <header className="flex justify-between items-center">
                           <div className="space-y-1">
                              <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tight">Acoustic Archives</h3>
                              <p className="text-[9px] text-red-600 font-bold uppercase tracking-widest">Heritage Soundscape</p>
                           </div>
                           <Music className="w-6 h-6 text-red-600" />
                        </header>
                        <div className="space-y-4">
                           {FOLK_MUSIC.map((track, i) => (
                             <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-red-50 hover:border-red-100 transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                      <Play className="w-4 h-4 text-red-600 fill-red-600" />
                                   </div>
                                   <div>
                                      <p className="text-xs font-black text-slate-950 uppercase">{track.title}</p>
                                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{track.artist}</p>
                                   </div>
                                </div>
                                <span className="text-[9px] font-black text-slate-400 uppercase">{track.duration}</span>
                             </div>
                           ))}
                        </div>
                        <button className="w-full py-4 border-2 border-dashed border-slate-200 text-slate-400 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:border-red-200 hover:text-red-600 transition-all">Expand Sound Library</button>
                     </div>
                  </div>
               </div>

               {/* Playlist Matrix (4/12) */}
               <div className="col-span-12 xl:col-span-4 space-y-10">
                  <div className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-xl space-y-8">
                     <header className="flex justify-between items-center">
                        <div className="space-y-1">
                           <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tight">Transmission Nodes</h3>
                           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Type: {activeTab.toUpperCase()}</p>
                        </div>
                        <div className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase">{filteredVideos.length} Items</div>
                     </header>

                     <div className="space-y-6 max-h-[1000px] overflow-y-auto pr-2 scrollbar-hide">
                        {filteredVideos.map((v) => (
                          <div 
                            key={v.id} 
                            onClick={() => { setActiveVideo(v); setIsPlaying(false); }}
                            className={`group p-4 rounded-3xl border transition-all cursor-pointer flex gap-4 ${activeVideo.id === v.id ? 'bg-red-50 border-red-100 shadow-lg scale-[1.02]' : 'bg-slate-50 border-slate-100 hover:border-red-200'}`}
                          >
                             <div className={`w-24 h-24 rounded-2xl overflow-hidden relative shrink-0 shadow-lg border-2 ${activeVideo.id === v.id ? 'border-red-500' : 'border-white'}`}>
                                <img src={v.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                {activeVideo.id === v.id && (
                                  <div className="absolute inset-0 bg-red-600/40 flex items-center justify-center">
                                     <Volume2 className="w-6 h-6 text-white animate-pulse" />
                                  </div>
                                )}
                             </div>
                             <div className="flex-1 space-y-2 py-1">
                                <p className="text-[8px] font-black text-red-600 uppercase tracking-widest">{v.vlogger}</p>
                                <h4 className="text-xs font-black text-slate-950 uppercase leading-snug line-clamp-2">{v.title}</h4>
                                <div className="flex items-center gap-3">
                                   <div className="flex items-center gap-1">
                                      <Eye className="w-3 h-3 text-slate-400" />
                                      <span className="text-[9px] font-bold text-slate-500">{v.views}</span>
                                   </div>
                                   <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-slate-400" />
                                      <span className="text-[9px] font-bold text-slate-500">{v.duration}</span>
                                   </div>
                                </div>
                             </div>
                          </div>
                        ))}
                     </div>

                     <button className="w-full py-5 bg-slate-950 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl active:scale-95">Load Next Matrix Segment</button>
                  </div>

                  <div className="p-8 rounded-[3rem] bg-linear-to-br from-slate-900 to-slate-800 shadow-2xl space-y-6">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                           <Globe className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                           <h4 className="text-lg font-black text-white italic uppercase tracking-tight">Neural Sync</h4>
                           <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest">Active Observers</p>
                        </div>
                     </div>
                     <p className="text-xs font-medium text-white/70 leading-relaxed italic">"Witness the pulse of Bharat's heritage through thousands of verified visual nodes."</p>
                     <div className="pt-2">
                        <div className="flex -space-x-4">
                           {[1,2,3,4,5,6].map(i => (
                             <div key={i} className="w-11 h-11 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden shadow-2xl">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} className="w-full h-full" />
                             </div>
                           ))}
                           <div className="w-11 h-11 rounded-full border-2 border-slate-900 bg-red-600 flex items-center justify-center text-[9px] font-black text-white shadow-2xl">+4.8k</div>
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
