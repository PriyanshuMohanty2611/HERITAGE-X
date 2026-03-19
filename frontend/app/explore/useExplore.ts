"use client";

import { useState, useEffect, useCallback } from "react";
import { Monument, Booking, BookingDetails } from "./types";
import { MONUMENTS as FALLBACK_MONUMENTS } from "./constants";
import { api } from "./api";

export function useExplore() {
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
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({ date: "2026-03-25", time: "10:00 AM - 12:00 PM", days: 1, type: "Monument Visit" });
  const [viewMode, setViewMode] = useState<"explore" | "bookings">("explore");
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

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

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const found = monuments.find((m: Monument) => m.name.toLowerCase().includes(query.toLowerCase()));
    if (found) {
      setSelectedMonument(found);
      setShowSpidercam(true);
    }
  }, [monuments, query]);

  const getAiSuggestion = useCallback(async () => {
    if (!selectedMonument) return;
    setAiLoading(true);
    try {
      const data = await api.getAiSuggestion(`Analyze the structural integrity and historical importance of ${selectedMonument.name}`);
      setAiSuggestion(data.response || data.suggestion || "Structural analysis complete. Optimal preservation identified.");
    } catch (err) {
      setTimeout(() => {
        setAiSuggestion(`AI Analysis for ${selectedMonument.name}: Best explored at dawn. Use the Spidercam's altitude mode to see the geometric precision of the structure.`);
        setAiLoading(false);
      }, 1500);
      return;
    }
    setAiLoading(false);
  }, [selectedMonument]);

  const handleBookingStart = useCallback((m?: Monument) => {
    if (m) setSelectedMonument(m);
    setBookingStep("location");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
      }, () => setUserLocation("Access Denied (Odisha, India)"));
    }
  }, []);

  const [myPayments, setMyPayments] = useState<{id: string, amount: string, method: string, date: string, status: string}[]>([]);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);

  useEffect(() => {
    // Mock initial payments
    setMyPayments([
      { id: "PAY-9821", amount: "$15.00", method: "UPI", date: "2026-03-10", status: "Success" },
      { id: "PAY-4412", amount: "$15.00", method: "Card", date: "2026-02-28", status: "Success" }
    ]);
  }, []);

  const getAiInsight = useCallback(async () => {
     setInsightLoading(true);
     try {
       const prompt = "Generate a brief premium strategic insight for a heritage researcher about their recent bookings and conservation trends.";
       const data = await api.getAiSuggestion(prompt);
       setAiInsight(data.response || data.suggestion || "Active preservation cycles detected. Your current routes are optimized for maximum cultural exposure.");
     } catch (err) {
       setAiInsight("Neural Insight: Your frequent sessions at 'Konark' suggest a high affinity for Kalinga architecture. We recommend 'Taj Mahal' at 6:00 AM for the next session.");
     } finally {
       setInsightLoading(false);
     }
  }, []);

  const finalizeBooking = useCallback(async () => {
    setIsProcessing(true);
    setBookingStatus("idle");
    
    const payload = {
      username: "user_session",
      monument_name: selectedMonument?.name || "Neural Session",
      date: bookingDetails.date,
      time: bookingDetails.time,
      type: bookingDetails.type,
      total_price: 15.00
    };

    try {
      await api.createBooking(payload);
      const bookingId = `HB-${Math.floor(Math.random() * 9000) + 1000}`;
      const newBooking: Booking = {
        id: bookingId,
        name: selectedMonument?.name || "Neural Guide Session",
        image: selectedMonument?.image || "/assets/KONARK/konark_hero.png",
        date: bookingDetails.date,
        time: bookingDetails.time,
        status: "Confirmed",
        type: bookingDetails.type,
        location: selectedMonument?.desc?.split(",")[0] || "Cultural Site",
        qr: "/scanner.jpg"
      };
      const newPayment = {
        id: `PAY-${Math.floor(Math.random() * 9000) + 1000}`,
        amount: "$15.00",
        method: paymentMethod || "Neural Link",
        date: new Date().toISOString().split('T')[0],
        status: "Success"
      };
      setMyBookings((prev: Booking[]) => [newBooking, ...prev]);
      setMyPayments(prev => [newPayment, ...prev]);
      setBookingStatus("success");
    } catch (err) {
      setBookingStatus("success"); // Fallback for demo
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setBookingStep("idle");
        setViewMode("bookings");
      }, 3000);
    }
  }, [selectedMonument, bookingDetails, paymentMethod]);

  const openDetail = useCallback((m: Monument) => {
    setActiveDetail(m);
    setShowDetailCard(true);
  }, []);

  const openGallery = useCallback((m: Monument) => {
    setGalleryImages(m.gallery || [m.image]);
    setActiveGalleryName(m.name);
    setActiveFacts(m.facts || [m.desc]);
    setShowGallery(true);
  }, []);

  const selectMonument = useCallback((m: Monument | null) => {
    setSelectedMonument(m);
    setAiSuggestion(null);
  }, []);

  return {
    monuments, loading, query, setQuery, aiLoading, aiSuggestion, getAiSuggestion,
    bookingStep, setBookingStep, selectedMonument, setSelectedMonument: selectMonument, showSpidercam, setShowSpidercam,
    userLocation, paymentMethod, setPaymentMethod, isProcessing, bookingStatus,
    showGallery, setShowGallery, galleryImages, activeGalleryName, activeFacts,
    showDetailCard, setShowDetailCard, activeDetail, detailTab, setDetailTab,
    targetLang, setTargetLang, showTranslator, setShowTranslator,
    bookingDetails, setBookingDetails, viewMode, setViewMode, myBookings, myPayments,
    aiInsight, insightLoading, getAiInsight,
    handleSearch, handleBookingStart, finalizeBooking, openDetail, openGallery
  };
}
