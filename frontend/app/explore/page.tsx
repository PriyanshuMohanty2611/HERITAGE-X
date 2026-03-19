"use client";

import React from "react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { Footer } from "../../components/Footer";
import { ChevronLeft, Search, Loader2 } from "lucide-react";
import { GUIDES, TIME_SLOTS, ITINERARIES } from "./constants";
import { useExplore } from "./useExplore";

// Sub-components
import { SovereignLedger } from "./components/SovereignLedger";
import { ExploreGrid } from "./components/ExploreGrid";
import { FeedbackSection } from "./components/FeedbackSection";
import { GalleryModal } from "../../components/GalleryModal";
import { DetailModal } from "./components/DetailModal";
import { BookingModal } from "./components/BookingModal";
import { SpidercamView } from "../../components/SpidercamView";

export default function ExploreBookingPage() {
  const {
    monuments, loading, query, setQuery, aiLoading, aiSuggestion, getAiSuggestion,
    bookingStep, setBookingStep, selectedMonument, setSelectedMonument, showSpidercam, setShowSpidercam,
    userLocation, paymentMethod, setPaymentMethod, isProcessing, bookingStatus,
    showGallery, setShowGallery, galleryImages, activeFacts,
    showDetailCard, setShowDetailCard, activeDetail, detailTab, setDetailTab,
    targetLang, setTargetLang, showTranslator, setShowTranslator,
    bookingDetails, setBookingDetails, viewMode, setViewMode, myBookings, myPayments,
    aiInsight, insightLoading, getAiInsight,
    handleSearch, handleBookingStart, finalizeBooking, openDetail, openGallery
  } = useExplore();

  if (loading && monuments.length === 0) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white gap-8 font-sans">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
        <p className="text-[12px] font-black uppercase tracking-[0.8em] text-slate-400">Synchronizing Nodes...</p>
      </div>
    );
  }

  return (
    <main className="heritage-page-shell flex h-screen w-screen font-sans overflow-hidden relative bg-transparent text-slate-950">
      
      {/* Immersive Background Sculpture - Arcaheological Assets */}
      <div 
        className="heritage-section-bg" 
        style={{ backgroundImage: `url(${selectedMonument?.image || "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg"})`, opacity: 0.05, filter: "blur(40px) grayscale(1)" }} 
      />

      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        {/* Navigation Interface */}
        <div className="h-28 flex items-center justify-between px-8 z-20 shrink-0 pt-10 lg:pt-0 header-neural border-b border-white/10">
          <div className="flex items-center gap-12">
            <div className="flex p-2 bg-white/40 backdrop-blur-md rounded-2xl border border-white/20">
              <button 
                onClick={() => setViewMode("explore")} 
                className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${viewMode === 'explore' ? 'text-blue-600 border border-blue-600/30 bg-blue-600/5 shadow-md' : 'text-slate-400 hover:text-blue-600'}`}
              >
                Explore
              </button>
              <button 
                onClick={() => setViewMode("bookings")} 
                className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${viewMode === 'bookings' ? 'text-blue-600 border border-blue-600/30 bg-blue-600/5 shadow-md' : 'text-slate-400 hover:text-blue-600'}`}
              >
                Passports
              </button>
            </div>

            <form onSubmit={handleSearch} className="flex items-center gap-4 rounded-2xl px-6 py-4 w-80 lg:w-[400px] transition-all focus-within:shadow-2xl focus-within:scale-[1.02] bg-white/40 backdrop-blur-md border border-white/20 group">
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
            {(selectedMonument || query) && (
              <button 
                onClick={() => {setSelectedMonument(null); setShowSpidercam(false); setQuery("");}} 
                className="text-[11px] font-black text-white uppercase tracking-widest px-8 py-4 rounded-xl flex items-center gap-3 transition-all hover:bg-blue-700 shadow-md bg-blue-600 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" /> Back to Dashboard
              </button>
            )}
            <TopHeader />
          </div>
        </div>

        {/* Viewport content */}
        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide scroll-smooth neural-content-shell">
          {viewMode === "bookings" ? (
            <SovereignLedger 
              myBookings={myBookings} 
              myPayments={myPayments}
              onViewPass={(b) => {
                setSelectedMonument(monuments.find(m => m.name === b.name) || null);
                setBookingStep("scanner");
              }}
              aiInsight={aiInsight}
              insightLoading={insightLoading}
              onGetInsight={getAiInsight}
            />
          ) : showSpidercam && selectedMonument ? (
            <SpidercamView 
              selectedMonument={selectedMonument}
              onOpenGallery={openGallery}
              getAiSuggestion={getAiSuggestion}
              aiLoading={aiLoading}
              aiSuggestion={aiSuggestion}
              onHandleBookingStart={(type: string) => {
                setBookingDetails((prev: any) => ({...prev, type}));
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

      {/* Persistence Overlays */}
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
        onHandleBookingStart={(type: string) => handleBookingStart(activeDetail!)}
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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
