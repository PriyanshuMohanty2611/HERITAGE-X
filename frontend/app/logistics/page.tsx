"use client";

import { Sidebar } from "../../components/Sidebar";
import { 
  Building2, Utensils, Star, MapPin, CreditCard, ChevronRight, 
  Search, Shield, CheckCircle2, Loader2, X, User, Hotel 
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { TopHeader } from "../../components/TopHeader";

export default function LogisticsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [bookingStep, setBookingStep] = useState<"idle" | "payment" | "scanner" | "success">("idle");
  const [isProcessing, setIsProcessing] = useState(false);

  const finalizeBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingStep("success");
      setTimeout(() => setBookingStep("idle"), 3000);
    }, 2000);
  };

  const LOGISTICS_DATA = [
    {
      id: 1,
      name: "The Taj Mahal Palace",
      type: "Hotel",
      location: "Colaba, Mumbai, Maharashtra",
      rating: 5.0,
      reviews: 5400,
      price: "₹18,500",
      period: "/night",
      img: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=800",
      amenities: ["Ocean View", "Royal Butler Service", "Heritage Walking Tour"],
      verified: true
    },
    {
      id: 2,
      name: "Temple Flavour",
      type: "Restaurant",
      location: "Konark Main Road, Odisha",
      rating: 4.9,
      reviews: 2100,
      price: "₹450",
      period: " (Bhog Thali)",
      img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
      amenities: ["Traditional Bhog", "UNESCO Locale", "Pristine Purity"],
      verified: true
    },
    {
      id: 3,
      name: "Oberoi Amarvilas",
      type: "Hotel",
      location: "Taj East Gate Road, Agra",
      rating: 5.0,
      reviews: 3800,
      price: "₹25,200",
      period: "/night",
      img: "https://images.unsplash.com/photo-1564507592333-c60657451dd6?auto=format&fit=crop&q=80&w=800",
      amenities: ["Taj Palace View", "Private Balcony", "Vault Security"],
      verified: true
    },
    {
      id: 4,
      name: "Karim's Original",
      type: "Restaurant",
      location: "Near Jama Masjid, Old Delhi",
      rating: 4.8,
      reviews: 12500,
      price: "₹950",
      period: " (avg for 2)",
      img: "https://images.unsplash.com/photo-1517248135467-4c7ed9d42c7b?auto=format&fit=crop&q=80&w=800",
      amenities: ["Mughlai Legacy", "Historical Spice Blends", "Ethical Source"],
      verified: true
    },
    {
      id: 5,
      name: "Evolve Back Hampi",
      type: "Hotel",
      location: "Kamalapura, Karnataka",
      rating: 4.9,
      reviews: 950,
      price: "₹22,000",
      period: "/night",
      img: "https://images.unsplash.com/photo-1590490359854-dfba19688d70?auto=format&fit=crop&q=80&w=800",
      amenities: ["Vijayanagara Style", "Lotus Mahal Pool", "Archaeo-Tours"],
      verified: true
    },
    {
      id: 6,
      name: "Dravidian Fine Dine",
      type: "Fine Dine",
      location: "Near Meenakshi Temple, Madurai",
      rating: 4.7,
      reviews: 980,
      price: "₹1,500",
      period: " (avg for 2)",
      img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800",
      amenities: ["Temple Prism View", "Ancient Spice Blends", "Traditional Service"],
      verified: true
    }
  ];

  return (
    <main className="heritage-page-shell flex h-dvh w-screen font-sans overflow-hidden bg-transparent">
      {/* Background image — Logistics page */}
      <div className="page-bg" style={{ backgroundImage: "url('/assets/Harmandir Sahib/The_Golden_Temple_of_Amrithsar_7.jpg')" }} />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        
        {/* Payment Scanner Modal */}
        {bookingStep !== "idle" && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/60">
             <div className="w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                <div className="p-8 flex items-center justify-between" style={{ borderBottom: "1px solid var(--card-border)" }}>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
                         <Shield className="w-6 h-6 text-amber-500" />
                      </div>
                      <div>
                         <h3 className="text-base font-black uppercase tracking-widest" style={{ color: "var(--text-strong)" }}>Heritage Payment</h3>
                         <p className="text-[10px] font-mono tracking-widest mt-1 text-amber-500">SECURE TERMINAL</p>
                      </div>
                   </div>
                   <button onClick={() => setBookingStep("idle")} className="p-2" style={{ color: "var(--text-muted)" }}>
                      <X className="w-6 h-6" />
                   </button>
                </div>

                <div className="p-10 text-center">
                   {bookingStep === "payment" && (
                      <div className="space-y-6">
                         <h4 className="text-xl font-black italic uppercase" style={{ color: "var(--text-strong)" }}>Select Matrix Connection</h4>
                         <div className="space-y-3">
                            {["UPI Interface", "Card Terminal", "Heritage Rewards"].map(m => (
                               <button 
                                 key={m}
                                 onClick={() => setBookingStep("scanner")}
                                 className="w-full p-6 rounded-2xl text-left transition-all"
                                 style={{ background: "var(--background)", border: "1px solid var(--card-border)" }}
                               >
                                 <span className="text-sm font-bold uppercase tracking-tighter" style={{ color: "var(--text-strong)" }}>{m}</span>
                               </button>
                            ))}
                         </div>
                      </div>
                   )}

                   {bookingStep === "scanner" && (
                      <div className="space-y-8 flex flex-col items-center">
                         <div className="relative p-6 bg-white rounded-3xl border-8 border-amber-100">
                            <img src="/scanner.jpg" className="w-48 h-48 object-cover rounded-xl" alt="QR" />
                         </div>
                         <button 
                            onClick={finalizeBooking}
                            disabled={isProcessing}
                            className="w-full py-5 text-black font-black rounded-2xl uppercase text-[11px] tracking-widest shadow-xl"
                            style={{ background: "#f59e0b" }}
                         >
                            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Authorize Matrix"}
                         </button>
                      </div>
                   )}

                   {bookingStep === "success" && (
                      <div className="py-10">
                         <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-200 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                         </div>
                         <h4 className="text-2xl font-black uppercase italic" style={{ color: "var(--text-strong)" }}>200 OK SUCCESS</h4>
                         <p className="text-[10px] text-green-500 font-mono mt-2">LINKAGE SYNCRONIZED</p>
                      </div>
                   )}
                </div>
             </div>
          </div>
        )}

        <div className="header-neural h-20 flex items-center justify-between px-6 z-20 shrink-0 capitalize">
          <TopHeader />
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-hide neural-content-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {LOGISTICS_DATA
              .filter(item => activeTab === 'all' || (activeTab === 'hotels' ? item.type === 'Hotel' : item.type !== 'Hotel'))
              .map((item) => (
              <div key={item.id} className="card overflow-hidden flex flex-col" style={{ border: "1px solid var(--card-border)" }}>
                {/* Image */}
                <div className="relative h-52 overflow-hidden shrink-0">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover"
                    alt={item.name}
                    onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090f1e] via-[#090f1e]/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Verified</span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-[10px] font-bold text-white">{item.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-300">{item.type}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-black leading-tight mb-1" style={{ color: "var(--text-strong)" }}>{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>{item.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.amenities.map(a => (
                      <span key={a} className="text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-widest" style={{ background: "var(--background)", border: "1px solid var(--card-border)", color: "var(--text-muted)" }}>{a}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-auto" style={{ borderTop: "1px solid var(--card-border)" }}>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>Price</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black" style={{ color: "var(--text-strong)" }}>{item.price}</span>
                        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{item.period}</span>
                      </div>
                    </div>
                    <button onClick={() => { setSelectedItem(item); setBookingStep("payment"); }}
                      className="px-5 py-2 text-white font-black text-[11px] uppercase tracking-widest rounded-xl flex items-center gap-2"
                      style={{ background: "#f59e0b" }}>
                      Reserve <CreditCard className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-3.5 backdrop-blur-md flex items-center justify-between gap-4" style={{ background: "var(--header-bg)", borderTop: "1px solid var(--card-border)" }}>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest hidden md:block">PCI-DSS Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                <CreditCard className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest hidden md:block">Global Payments</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Secure Link Active</span>
          </div>
        </div>
      </div>
    </main>
  );
}

function TabButton({ active, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg ${
        active
          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
          : 'text-gray-500 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );
}
