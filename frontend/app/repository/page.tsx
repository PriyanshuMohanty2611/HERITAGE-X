"use client";

import { useState, useMemo } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { 
  Building2, MapPin, Search, Filter, ArrowUpRight, 
  History, Landmark, ScrollText, Share2, Heart,
  TentTree, Camera, Globe, Info, Sparkles, ChevronRight,
  ShieldCheck, Award, Zap, BookOpen, User, Star
} from "lucide-react";
import Link from "next/link";

// ─── Heritage Metadata ──────────────────────────────────────────────────────
const MONUMENTS = [
  {
    id: "konark",
    name: "Sun Temple, Konark",
    location: "Odisha, India",
    year: "1250 CE",
    architect: "Bisu Maharana",
    style: "Kalinga Architecture",
    image: "/assets/KONARK/konark_hero.png",
    category: "Temples",
    status: "UNESCO Site",
    rating: 4.9,
    desc: "A colossal chariot of the Sun God with 24 intricately carved stone wheels."
  },
  {
    id: "taj",
    name: "Taj Mahal",
    location: "Agra, India",
    year: "1648 CE",
    architect: "Ustad Ahmad Lahori",
    style: "Mughal Architecture",
    image: "/assets/Taj Mahal/97.png",
    category: "Mausoleums",
    status: "World Wonder",
    rating: 5.0,
    desc: "The ultimate symphony of white marble and symmetrical perfection."
  },
  {
    id: "hampi",
    name: "Vijayanagara Ruins",
    location: "Hampi, Karnataka",
    year: "14th Century",
    architect: "Traditional Guilds",
    style: "Vijayanagara Style",
    image: "/assets/Hampi Ruins/vitthala-temple-complex-hampi-tri-hero.jpg",
    category: "Ancient Cities",
    status: "UNESCO Heritage",
    rating: 4.8,
    desc: "A surreal landscape of boulders and Dravidian temple masterpieces."
  },
  {
    id: "khajuraho",
    name: "Khajuraho Group",
    location: "Madhya Pradesh",
    year: "950 CE",
    architect: "Chandela Kings",
    style: "Nagara Style",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800",
    category: "Temples",
    status: "UNESCO Site",
    rating: 4.7,
    desc: "Renowned for its Nagara-style architectural symbolism and erotic sculptures."
  },
  {
    id: "ajanta",
    name: "Ajanta Caves",
    location: "Maharashtra",
    year: "2nd BCE - 480 BCE",
    architect: "Buddhist Monks",
    style: "Rock-cut Architecture",
    image: "https://images.unsplash.com/photo-1590050752117-23a9d7f0b5d1?auto=format&fit=crop&q=80&w=800",
    category: "Caves",
    status: "Buddhist Heritage",
    rating: 4.9,
    desc: "Masterpieces of Buddhist religious art and cave painting."
  },
  {
    id: "qutub",
    name: "Qutub Minar",
    location: "Delhi, India",
    year: "1192 CE",
    architect: "Qutb-ud-din Aibak",
    style: "Indo-Islamic",
    image: "https://images.unsplash.com/photo-1581427135111-e67c8702315b?auto=format&fit=crop&q=80&w=800",
    category: "Monuments",
    status: "UNESCO Site",
    rating: 4.6,
    desc: "The tallest brick minaret in the world, marking the start of Islamic rule."
  },
  {
    id: "red-fort",
    name: "Red Fort (Lal Qila)",
    location: "Delhi, India",
    year: "1639 CE",
    architect: "Ustad Ahmad Lahori",
    style: "Mughal",
    image: "/assets/Red Fort/red_fort.png",
    category: "Monuments",
    status: "Historical Gem",
    rating: 4.8,
    desc: "The main residence of the Mughal Emperors for nearly 200 years."
  },
  {
    id: "victoria",
    name: "Victoria Memorial",
    location: "Kolkata, WB",
    year: "1921 CE",
    architect: "William Emerson",
    style: "Indo-Saracenic",
    image: "/assets/Victoria Memorial/images.jpg",
    category: "Museums",
    status: "Colonial Heritage",
    rating: 4.7,
    desc: "A vast marble building dedicated to the memory of Queen Victoria."
  },
  {
    id: "jantar-mantar",
    name: "Jantar Mantar",
    location: "Jaipur, Rajasthan",
    year: "1734 CE",
    architect: "Sawai Jai Singh II",
    style: "Astronomical",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800",
    category: "Science",
    status: "UNESCO Heritage",
    rating: 4.9,
    desc: "A collection of nineteen architectural astronomical instruments."
  },
  {
    id: "charminar",
    name: "Charminar",
    location: "Hyderabad, TS",
    year: "1591 CE",
    architect: "Mir Momin Astarabadi",
    style: "Indo-Islamic",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800",
    category: "Monuments",
    status: "Symbol of Hyderabad",
    rating: 4.8,
    desc: "A monument and mosque with four grand arches and minarets."
  }
];

const HEROES = [
  {
    name: "Lachit Borphukan",
    title: "The Unconquerable Ahom General",
    description: "The savior of the Brahmaputra valley who defeated the Mughals in the Battle of Saraighat.",
    image: "https://images.unsplash.com/photo-1605649443918-158fa3628379?auto=format&fit=crop&q=80&w=400",
    era: "1671 CE"
  },
  {
    name: "Ahilyabai Holkar",
    title: "Philosophy of the Philosopher Queen",
    description: "A visionary ruler who rebuilt temples across India and promoted justice and welfare.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=400",
    era: "1767 CE"
  },
  {
    name: "Sudhanya Debbarma",
    title: "Echoes of the Northeast",
    description: "Preserved the indigenous architectural wisdom of the Tripura kingdom.",
    image: "https://images.unsplash.com/photo-1590133323048-faf340794fd8?auto=format&fit=crop&q=80&w=400",
    era: "19th Century"
  },
  {
    name: "Martanda Varma",
    title: "The Sword of Travancore",
    description: "The only Asian king to defeat a European naval power at the Battle of Colachel.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=400",
    era: "1741 CE"
  },
  {
    name: "Rani Velu Nachiyar",
    title: "The Veeramangai of Sivaganga",
    description: "The first Indian queen to wage war with the East India Company and win.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=400",
    era: "1780 CE"
  },
  {
    name: "Khuda Baksh",
    title: "The Bibliophile of Bihar",
    description: "Founded the legendary library containing invaluable Arabic and Persian manuscripts.",
    image: "https://images.unsplash.com/photo-1590050752117-23a9d7f0b5d1?auto=format&fit=crop&q=80&w=400",
    era: "1891 CE"
  }
];

export default function HeritageRepository() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filteredMonuments = useMemo(() => {
    return MONUMENTS.filter(m => 
      (filter === "All" || m.category === filter) &&
      (m.name.toLowerCase().includes(query.toLowerCase()) || m.location.toLowerCase().includes(query.toLowerCase()))
    );
  }, [filter, query]);

  const categories = ["All", ...Array.from(new Set(MONUMENTS.map(m => m.category)))];

  return (
    <main className="heritage-page-shell flex min-h-screen w-full font-sans overflow-x-hidden bg-transparent">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10">
        <div className="h-20 flex items-center justify-between px-6 z-20 shrink-0 border-b border-slate-100 bg-white/40 backdrop-blur-xl">
          <TopHeader />
        </div>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12 xl:p-16 scrollbar-hide">
          <div className="w-full space-y-16 pb-24">
            
            {/* Header / Search Suite */}
            <header className="flex flex-col lg:flex-row justify-between items-end gap-10">
               <div className="space-y-4">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center shadow-2xl">
                        <Landmark className="w-8 h-8 text-white" />
                     </div>
                     <div>
                        <h1 className="text-[clamp(2rem,6vw,4rem)] font-black text-slate-950 uppercase italic tracking-tighter leading-none">Heritage <span className="text-blue-600">Repository</span></h1>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mt-2 border-b border-slate-100 pb-2">Verified Architectural Intelligence</p>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
                  <div className="relative group w-full md:w-80">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                     <input 
                        type="text" 
                        placeholder="Search archives..." 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold outline-none focus:border-blue-600/30 transition-all shadow-sm"
                     />
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-3xl border border-slate-200">
                     {categories.map(cat => (
                        <button 
                          key={cat}
                          onClick={() => setFilter(cat)}
                          className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-900'}`}
                        >
                           {cat}
                        </button>
                     ))}
                  </div>
               </div>
            </header>

            {/* Monument Grid */}
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {filteredMonuments.map((m) => (
                    <Link href={`/monument/${m.id}`} key={m.id} className="group relative block rounded-[3rem] bg-white border border-slate-100 shadow-xl hover:shadow-3xl transition-all overflow-hidden">
                       <div className="aspect-[4/5] relative overflow-hidden">
                          <img src={m.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                          
                          <div className="absolute top-8 right-8 flex flex-col gap-2">
                             <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center text-white text-xs font-black">
                                {m.rating}
                             </div>
                             <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center text-white">
                                <Heart className="w-5 h-5" />
                             </div>
                          </div>

                          <div className="absolute bottom-8 left-8 right-8 space-y-3">
                             <span className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest">{m.status}</span>
                             <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">{m.name}</h3>
                             <div className="flex items-center gap-2 text-white/70 text-[10px] font-bold uppercase tracking-widest">
                                <MapPin className="w-3.5 h-3.5 text-blue-400" /> {m.location}
                             </div>
                          </div>
                       </div>
                       
                       <div className="p-10 space-y-6">
                          <p className="text-sm font-medium text-slate-500 italic leading-relaxed line-clamp-2">"{m.desc}"</p>
                          <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                             <div>
                                <p className="text-[10px] text-slate-400 font-black uppercase">Architectural Era</p>
                                <p className="text-xs font-black text-slate-950 uppercase mt-1">{m.year}</p>
                             </div>
                             <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <ArrowUpRight className="w-6 h-6" />
                             </div>
                          </div>
                       </div>
                    </Link>
                  ))}
               </div>
            </section>

            {/* Unsung Heroes Section */}
            <section className="py-20 border-t border-slate-100 space-y-12">
               <header className="flex flex-col lg:flex-row justify-between items-center gap-8">
                  <div className="space-y-2 text-center lg:text-left">
                     <h2 className="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">Unsung <span className="text-blue-600">Heroes</span></h2>
                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Guardians of India's Sovereignty & Culture</p>
                  </div>
                  <button className="px-8 py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl active:scale-95 transition-all">
                     <ScrollText className="w-4 h-4" /> Expand Matrix
                  </button>
               </header>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                  {HEROES.map((h, i) => (
                    <div key={i} className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl hover:-translate-y-2 transition-all">
                       <div className="w-20 h-20 rounded-2xl overflow-hidden mb-8 border-4 border-slate-50 shadow-lg">
                          <img src={h.image} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" />
                       </div>
                       <div className="space-y-4">
                          <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{h.era}</p>
                          <h4 className="text-xl font-black text-slate-950 italic uppercase leading-none">{h.name}</h4>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{h.title}</p>
                          <p className="text-xs font-medium text-slate-500 leading-relaxed italic border-l-2 border-slate-100 pl-4 py-1">"{h.description}"</p>
                       </div>
                       <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[8px] font-black text-slate-400 uppercase">Profile Verified</span>
                          <Sparkles className="w-4 h-4 text-amber-500" />
                       </div>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
