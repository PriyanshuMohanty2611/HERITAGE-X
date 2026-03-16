"use client";

import { useState, useEffect, useRef } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { 
  Search, Users, Languages, Star, Phone, Mail, 
  MessageCircle, Facebook, Instagram, Linkedin, 
  ExternalLink, Clock, ShieldCheck, ChevronRight,
  Filter, Award, MapPin, Loader2, Sparkles, X,
  Globe, Share2
} from "lucide-react";

// ─── Local Guide Data ─────────────────────────────────────────────────────────
const GUIDES_DATABASE = [
  {
    id: 1,
    name: "Dr. Tushar Dutt",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    experience: 15,
    languages: ["English", "Hindi", "German"],
    specialization: "History & Mughal Architecture",
    phone: "+91 98765 43210",
    email: "tushar.dutt@heritage-x.ai",
    bio: "Ministry of Tourism certified guide. Specializes in Mughal Architecture and Taj Mahal deep-dives with a PhD in Ancient History.",
    rating: 4.9,
    reviews: 1240,
    location: "Agra, Uttar Pradesh",
    social: {
      whatsapp: "919876543210",
      facebook: "tusharguide",
      instagram: "tushar_heritage",
      linkedin: "dr-tushar-dutt"
    }
  },
  {
    id: 2,
    name: "Madhu Pulipati",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    experience: 10,
    languages: ["English", "Kannada", "Telugu"],
    specialization: "Vijayanagara Archaeology",
    phone: "+91 87654 32109",
    email: "madhu.p@hampiexplorer.com",
    bio: "Archaeology expert and licensed facilitator for the Hampi heritage circuit. Passionate about storytelling and ruined empires.",
    rating: 4.8,
    reviews: 890,
    location: "Hampi, Karnataka",
    social: {
      whatsapp: "918765432109",
      facebook: "madhuhampi",
      instagram: "madhu_hampi_explorer",
      linkedin: "madhu-pulipati"
    }
  },
  {
    id: 3,
    name: "Chelliah Balu",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    experience: 20,
    languages: ["English", "Tamil", "French"],
    specialization: "Dravidian Temple Architecture",
    phone: "+91 76543 21098",
    email: "balu.madurai@heritage.org",
    bio: "Senior Regional Guest Guide for Madurai. Deep expertise in Vedic rituals and Chola dynasty temple engineering.",
    rating: 4.7,
    reviews: 2100,
    location: "Madurai, Tamil Nadu",
    social: {
      whatsapp: "917654321098",
      facebook: "balutours",
      instagram: "balu_madurai_tours",
      linkedin: "chelliah-balu"
    }
  },
  {
    id: 4,
    name: "Arjun Bhat",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    experience: 8,
    languages: ["English", "Hindi", "Kannada"],
    specialization: "Nature & Heritage Trails",
    phone: "+91 65432 10987",
    email: "arjun.bhat@explorehampi.in",
    bio: "Founder of Explore Hampi. Storyteller and professional heritage photographer who brings ruins to life with visuals.",
    rating: 4.6,
    reviews: 670,
    location: "Hampi, Karnataka",
    social: {
      whatsapp: "916543210987",
      facebook: "explorehampi",
      instagram: "explorehampi",
      linkedin: "arjun-bhat-hampi"
    }
  },
  {
    id: 5,
    name: "Anjali Sharma",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    experience: 12,
    languages: ["English", "Hindi", "Spanish"],
    specialization: "Cultural & Culinary Heritage",
    phone: "+91 99887 76655",
    email: "anjali.s@varanasiexperience.com",
    bio: "Anthropology graduate specialized in the oral traditions and culinary history of Varanasi. Expert in spiritual heritage.",
    rating: 5.0,
    reviews: 1540,
    location: "Varanasi, UP",
    social: {
      whatsapp: "919988776655",
      facebook: "anjalivaranasi",
      instagram: "anjali_banaras",
      linkedin: "anjali-sharma-heritage"
    }
  },
  {
    id: 6,
    name: "Vikram Rathore",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    experience: 18,
    languages: ["English", "Hindi", "Marwari"],
    specialization: "Military History & Forts",
    phone: "+91 88776 65544",
    email: "vikram.rathore@rajasthantours.com",
    bio: "Descendant of the Rathores of Amer. Specialized in Rajput military strategy and fort defense architecture.",
    rating: 4.9,
    reviews: 1120,
    location: "Jaipur, Rajasthan",
    social: {
      whatsapp: "918877665544",
      facebook: "vikramforts",
      instagram: "vikram_rathore_jaipur",
      linkedin: "vikram-rathore"
    }
  }
];

export default function GuideFinderPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredGuides, setFilteredGuides] = useState(GUIDES_DATABASE);
  const [sortBy, setSortBy] = useState<"rating" | "experience">("rating");

  // Filter and Sort Logic
  useEffect(() => {
    let result = GUIDES_DATABASE.filter(guide => 
      guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => b.experience - a.experience);
    }

    setFilteredGuides(result);
  }, [searchQuery, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate real-time fetch
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <main className="heritage-page-shell flex h-dvh w-screen font-sans overflow-hidden bg-slate-950 text-white relative">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-600/10 blur-[120px] rounded-full" />
      </div>

      <Sidebar />
      
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <TopHeader />
        
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide">
          <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-2xl">
                    <Users className="w-7 h-7 text-amber-500" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase italic text-white flex items-center gap-3">
                      Local Guide <span className="text-amber-500">Finder</span>
                    </h1>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em] mt-1">Certified Heritage Deployment Matrix</p>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
                  <Search className="w-5 h-5 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Monument Name, City or Specialized Venue..."
                  className="w-full bg-slate-900/50 border border-white/10 rounded-3xl py-6 pl-16 pr-6 text-sm text-white outline-none focus:border-amber-500/50 focus:bg-slate-900 transition-all shadow-2xl backdrop-blur-xl"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase text-[10px] tracking-widest rounded-2xl transition-all shadow-xl active:scale-95"
                >
                  Locate
                </button>
              </form>
            </header>

            {/* Filter & Sort Bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                  <Globe className="w-4 h-4 text-amber-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Global Coverage</span>
                </div>
                <div className="text-xs text-slate-500 font-bold">
                  Showing <span className="text-white">{filteredGuides.length}</span> active specialists in your sector
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sort By Matrix</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-amber-500/50 cursor-pointer"
                >
                  <option value="rating">Highest Precision (Rating)</option>
                  <option value="experience">Maximum Experience</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="h-[400px] flex flex-col items-center justify-center gap-6">
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-amber-500 animate-spin" />
                  <div className="absolute inset-0 w-16 h-16 bg-amber-500/20 blur-2xl animate-pulse rounded-full" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 animate-pulse">Syncing Directory Nodes...</p>
              </div>
            ) : filteredGuides.length > 0 ? (
              /* Guide Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredGuides.map((guide, idx) => (
                  <div 
                    key={guide.id}
                    className="bg-slate-900/40 border border-white/5 rounded-4xl p-8 flex flex-col gap-8 group hover:bg-slate-900/60 hover:border-amber-500/30 transition-all duration-500 relative overflow-hidden shadow-2xl hover:-translate-y-2"
                  >
                    {/* Background Glow */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-500/5 blur-3xl rounded-full group-hover:bg-amber-500/10 transition-all" />
                    
                    {/* Profile Header */}
                    <div className="flex items-start justify-between relative z-10">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full p-1 border-2 border-amber-500/20 group-hover:border-amber-500/50 transition-all overflow-hidden relative">
                          <img 
                            src={guide.img} 
                            alt={guide.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        {guide.rating >= 4.9 && (
                          <div className="absolute -bottom-1 -right-1 bg-amber-500 text-black p-1.5 rounded-full shadow-lg border-2 border-slate-900">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="text-[10px] font-black text-amber-500">{guide.rating}</span>
                        </div>
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{guide.reviews} REVIEWS</div>
                      </div>
                    </div>

                    {/* Guide Info */}
                    <div className="space-y-4 relative z-10">
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter group-hover:text-amber-500 transition-colors">{guide.name}</h3>
                        <p className="text-[10px] text-amber-500/80 font-black uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
                          <Award className="w-3.5 h-3.5" /> {guide.experience} Years Experience
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {guide.languages.map(lang => (
                          <span key={lang} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-all">
                            {lang}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-bold line-clamp-3">
                        {guide.bio}
                      </p>

                      <div className="pt-4 space-y-3">
                        <div className="flex items-center gap-3 text-xs text-slate-300 font-bold">
                          <MapPin className="w-4 h-4 text-amber-500" />
                          {guide.location}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300 font-bold">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          {guide.specialization}
                        </div>
                      </div>
                    </div>

                    {/* Social & Contact */}
                    <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5 relative z-10">
                      <div className="flex items-center gap-4">
                        <a href={`https://wa.me/${guide.social.whatsapp}`} target="_blank" className="p-2.5 bg-white/5 hover:bg-emerald-500/10 rounded-xl border border-white/10 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-500 transition-all">
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <a href={`https://instagram.com/${guide.social.instagram}`} target="_blank" className="p-2.5 bg-white/5 hover:bg-pink-500/10 rounded-xl border border-white/10 hover:border-pink-500/30 text-slate-400 hover:text-pink-500 transition-all">
                          <Instagram className="w-4 h-4" />
                        </a>
                        <a href={`https://linkedin.com/in/${guide.social.linkedin}`} target="_blank" className="p-2.5 bg-white/5 hover:bg-blue-500/10 rounded-xl border border-white/10 hover:border-blue-500/30 text-slate-400 hover:text-blue-500 transition-all">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </div>
                      
                      <button className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-amber-500 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl group/btn active:scale-95">
                        Connect Guide <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="h-[500px] flex flex-col items-center justify-center text-center p-8 bg-slate-900/30 border border-white/5 rounded-4xl backdrop-blur-3xl animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-8 border border-white/10">
                  <X className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">No Specialists Detected</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto font-bold uppercase tracking-widest leading-relaxed">
                  The requested node "<span className="text-amber-500">{searchQuery}</span>" has no active guide matrix. <br/><br/>
                  <span className="text-[10px] text-slate-600">Try searching for broader regions like "Hampi", "Rajasthan" or "Varanasi".</span>
                </p>
                <div className="mt-12 flex flex-col items-center gap-4">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Recommended Proxies</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {["Taj Mahal", "Hampi Ruins", "Konark Temple", "Agra", "Jaipur"].map(t => (
                      <button 
                        key={t}
                        onClick={() => setSearchQuery(t)}
                        className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-amber-500 hover:border-amber-500/50 transition-all"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
