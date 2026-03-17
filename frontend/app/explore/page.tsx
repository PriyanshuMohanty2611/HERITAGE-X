"use client";

import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { Footer } from "../../components/Footer";
import { 
  ChevronLeft, Search, Loader2
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Monument, Booking } from "./types";
import { MONUMENTS as FALLBACK_MONUMENTS, GUIDES, TIME_SLOTS, ITINERARIES } from "./constants";
import { api } from "./api";

// Sub-components
import { SovereignLedger } from "./components/SovereignLedger";
import { ExploreGrid } from "./components/ExploreGrid";
import { FeedbackSection } from "./components/FeedbackSection";
import { GalleryModal } from "./components/GalleryModal";
import { DetailModal } from "./components/DetailModal";
import { BookingModal } from "./components/BookingModal";
import { TranslatorOverlay } from "./components/TranslatorOverlay";
import { SpidercamView } from "./components/SpidercamView";

export default function ExploreBookingPage() {
  const [monuments, setMonuments] = useState<Monument[]>(FALLBACK_MONUMENTS);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<"idle" | "location" | "payment" | "scanner">("idle");
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const [showSpidercam, setShowSpidercam] = useState(false);
  const [userLocation, setUserLocation] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "success" | "error">("idle");
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [activeGalleryName, setActiveGalleryName] = useState("");
  const [activeFacts, setActiveFacts] = useState<string[]>([]);
  const [showDetailCard, setShowDetailCard] = useState(false);
  const [activeDetail, setActiveDetail] = useState<Monument | null>(null);
  const [detailTab, setDetailTab] = useState<"info" | "guides" | "itinerary" | "food">("info");
  const [targetLang, setTargetLang] = useState("Hindi");
  const [showTranslator, setShowTranslator] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({ date: "", time: "", days: 1, type: "Monument Visit" });
  const [viewMode, setViewMode] = useState<"explore" | "bookings">("explore");
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  // Fetch Monuments and Bookings on Mount
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        const data = await api.getMonuments();
        if (data && data.length > 0) {
          setMonuments(data);
        }
      } catch (err) {
        console.warn("Backend unavailable, using fallback data");
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = monuments.find((m: Monument) => m.name.toLowerCase().includes(query.toLowerCase()));
    if (found) {
      setSelectedMonument(found);
      setShowSpidercam(true);
    }
  };

  const getAiSuggestion = async () => {
    if (!selectedMonument) return;
    setAiLoading(true);
    try {
      const data = await api.getAiSuggestion(`Analyze the structural integrity and historical importance of ${selectedMonument.name}`);
      setAiSuggestion(data.response || data.suggestion || "Structural analysis complete. Optimal preservation identified.");
    } catch (err) {
       // Mock fallback
      setTimeout(() => {
        setAiSuggestion(`AI Analysis for ${selectedMonument?.name}: Best explored at dawn. Use the Spidercam's altitude mode to see the geometric precision of the structure.`);
        setAiLoading(false);
      }, 1500);
      return;
    }
    setAiLoading(false);
  };

  const handleBookingStart = (m?: Monument) => {
    if (m) setSelectedMonument(m);
    setBookingStep("location");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
      }, () => setUserLocation("Access Denied (Odisha, India)"));
    }
  };

  const finalizeBooking = async () => {
    setIsProcessing(true);
    setBookingStatus("idle");
    
    const bookingPayload = {
      username: "user_session", // This should come from AuthContext in a real app
      monument_name: selectedMonument?.name || "Neural Session",
      date: bookingDetails.date || "2026-03-25",
      time: bookingDetails.time || "10:00 AM - 12:00 PM",
      type: bookingDetails.type,
      total_price: 15.00
    };

    try {
      // Create real booking in DB
      await api.createBooking(bookingPayload);
      
      const newBooking: Booking = {
        id: `HB-${Math.floor(Math.random() * 9000) + 1000}`,
        name: selectedMonument?.name || "Neural Guide Session",
        image: selectedMonument?.image || "/assets/KONARK/konark_hero.png",
        date: bookingDetails.date || "2026-03-25",
        time: bookingDetails.time || "10:00 AM - 12:00 PM",
        status: "Confirmed",
        type: bookingDetails.type,
        location: selectedMonument?.desc?.split(",")[0] || "Cultural Site",
        qr: "/scanner.jpg"
      };
      
      setMyBookings([newBooking, ...myBookings]);
      setBookingStatus("success");
    } catch (err) {
      console.error("Booking failed:", err);
      // Fallback for demo
      setBookingStatus("success");
    } finally {
      setIsProcessing(false);
      if (bookingStatus === "success" || true) {
        setTimeout(() => {
           setBookingStep("idle");
           setViewMode("bookings");
        }, 3000);
      }
    }
  };

  const openDetail = (m: Monument) => {
     setActiveDetail(m);
     setShowDetailCard(true);
  };

  const openGallery = (m: Monument) => {
     setGalleryImages(m.gallery || [m.image]);
     setActiveGalleryName(m.name);
     setActiveFacts(m.facts || [m.desc]);
     setShowGallery(true);
  };

  if (loading && monuments.length === 0) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white gap-8">
         <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
         <p className="text-[12px] font-black uppercase tracking-[0.8em] text-slate-400">Synchronizing Nodes...</p>
      </div>
    );
  }

  return (
    <main className="heritage-page-shell flex h-screen w-screen font-sans overflow-hidden relative bg-white text-slate-950">
        {/* Dynamic Background sculpture */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0">
          <img src={selectedMonument?.image || "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg"} className="w-full h-full object-cover grayscale blur-3xl scale-110 transition-all duration-1000" alt="background" />
        </div>

        <Sidebar />
        
        <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
          {/* Top Header Section - Premium Header Glass */}
          <div className="h-28 flex items-center justify-between px-8 z-20 shrink-0 pt-10 lg:pt-0 bg-white/50 backdrop-blur-xl border-b border-slate-100">
            <div className="flex items-center gap-12">
              <div className="flex p-2 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                 <button 
                   onClick={() => setViewMode("explore")} 
                   className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${viewMode === 'explore' ? 'bg-slate-950 text-white shadow-2xl scale-105' : 'text-slate-400 hover:text-slate-950'}`}
                 >
                   Explore
                 </button>
                 <button 
                   onClick={() => setViewMode("bookings")} 
                   className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${viewMode === 'bookings' ? 'bg-slate-950 text-white shadow-2xl scale-105' : 'text-slate-400 hover:text-slate-950'}`}
                 >
                   Passports
                 </button>
              </div>

              <form onSubmit={handleSearch} className="flex items-center gap-4 rounded-2xl px-6 py-4 w-80 lg:w-[400px] transition-all focus-within:shadow-2xl focus-within:scale-[1.02] bg-white border border-slate-200 group">
                 <Search className="w-5 h-5 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Access Heritage Database..." 
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                   className="bg-transparent border-none outline-none text-[14px] w-full font-bold tracking-tight text-slate-950 placeholder:text-slate-300"
                 />
              </form>
            </div>

            <div className="flex items-center gap-6">
              {selectedMonument && (
                <button 
                  onClick={() => {setSelectedMonument(null); setShowSpidercam(false); setQuery(""); setAiSuggestion(null);}} 
                  className="text-[11px] font-black text-white uppercase tracking-widest px-8 py-4 rounded-2xl flex items-center gap-3 transition-all hover:bg-slate-800 shadow-xl bg-slate-950 active:scale-95 border-none"
                >
                  <ChevronLeft className="w-5 h-5" /> Back to Dashboard
                </button>
              )}
              <TopHeader />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-10 scrollbar-hide scroll-smooth">
            {viewMode === "bookings" ? (
              <SovereignLedger 
                myBookings={myBookings} 
                onViewPass={() => { setBookingStatus("success"); setBookingStep("scanner"); }} 
              />
            ) : showSpidercam && selectedMonument ? (
              <SpidercamView 
                selectedMonument={selectedMonument}
                onOpenGallery={openGallery}
                getAiSuggestion={getAiSuggestion}
                aiLoading={aiLoading}
                aiSuggestion={aiSuggestion}
                onHandleBookingStart={(type: string) => {
                  setBookingDetails({...bookingDetails, type});
                  handleBookingStart(selectedMonument);
                }}
              />
            ) : (
              <div className="max-w-[1600px] mx-auto">
                <ExploreGrid 
                  monuments={monuments}
                  onSelectMonument={setSelectedMonument}
                  onShowSpidercam={setShowSpidercam}
                  onHandleBookingStart={handleBookingStart}
                  onOpenDetail={openDetail}
                  onOpenGallery={openGallery}
                />
                <FeedbackSection />
              </div>
            )}
            <div className="mt-20">
              <Footer />
            </div>
          </div>
        </div>

        {/* Modals & Overlays - Corrected Nesting */}
        <GalleryModal 
          isOpen={showGallery} 
          onClose={() => setShowGallery(false)} 
          images={galleryImages} 
          facts={activeFacts} 
        />

        <DetailModal 
          isOpen={showDetailCard} 
          onClose={() => setShowDetailCard(false)} 
          monument={activeDetail!} 
          activeTab={detailTab} 
          setActiveTab={setDetailTab} 
          onHandleBookingStart={(type: string, data?: any) => handleBookingStart(activeDetail!)}
          guides={GUIDES}
          itineraries={ITINERARIES}
        />

        <BookingModal 
          step={bookingStep}
          onClose={() => setBookingStep("idle")}
          selectedMonument={selectedMonument!}
          userLocation={userLocation}
          bookingDetails={bookingDetails}
          onSetBookingDetails={setBookingDetails}
          paymentMethod={paymentMethod}
          onSetPaymentMethod={setPaymentMethod}
          isProcessing={isProcessing}
          bookingStatus={bookingStatus}
          onFinalize={finalizeBooking}
          onStepChange={setBookingStep}
          timeSlots={TIME_SLOTS}
        />

        <TranslatorOverlay 
          showTranslator={showTranslator}
          setShowTranslator={setShowTranslator}
          targetLang={targetLang}
          setTargetLang={setTargetLang}
        />

      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-40px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        :root {
          --background: #ffffff;
          --foreground: #0f172a;
          --card-bg: #f8fafc;
          --card-border: #e2e8f0;
          --text-strong: #0f172a;
        }
      `}</style>
    </main>
  );
}
