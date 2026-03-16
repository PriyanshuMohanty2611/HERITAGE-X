"use client";

import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { Footer } from "../../components/Footer";
import { 
  Search, MapPin, Bed, Utensils, Navigation2, Ticket, 
  BrainCircuit, PlaySquare, X, Star, Camera, ShieldCheck, 
  CreditCard, QrCode, Smartphone, Map as MapIcon, Loader2,
  ChevronRight, ChevronLeft, Eye, Shield, Play, Instagram, Twitter, Globe,
  Languages, MessageSquare, Phone, UserCheck, Compass, AlertCircle, User, ScanSearch, Sparkles, Users
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import dynamic from "next/dynamic";

const MapComponent: any = dynamic(() => import("../../components/MapComponent"), { ssr: false });

interface Monument {
  id: number;
  name: string;
  image: string;
  desc: string;
  gallery?: string[];
  facts?: string[];
  videoId?: string;
  coords?: number[];
  zoom?: number;
  query?: string;
}

export default function ExploreBookingPage() {
  const [query, setQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<"idle" | "location" | "payment" | "scanner">("idle");
  const [selectedMonument, setSelectedMonument] = useState<any | null>(null);
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
  const [activeDetail, setActiveDetail] = useState<any | null>(null);
  const [detailTab, setDetailTab] = useState<"info" | "guides" | "itinerary" | "food">("info");
  const [targetLang, setTargetLang] = useState("Hindi");
  const [translatedText, setTranslatedText] = useState("");
  const [showTranslator, setShowTranslator] = useState(false);
  const [showGuideBooking, setShowGuideBooking] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<any | null>(null);
  const [activeGuide, setActiveGuide] = useState<any | null>(null);
  const [bookingDetails, setBookingDetails] = useState({ date: "", time: "", days: 1, type: "Monument Visit" });
  const [viewMode, setViewMode] = useState<"explore" | "bookings">("explore");
  const [myBookings, setMyBookings] = useState<any[]>([
    {
      id: "HB-8821",
      name: "Konark Sun Temple",
      image: "/assets/KONARK/konark_hero.png",
      date: "2026-03-20",
      time: "09:00 AM - 11:00 AM",
      status: "Confirmed",
      type: "Site Access",
      location: "Puri, Odisha",
      qr: "/scanner.jpg"
    },
    {
      id: "HB-9012",
      name: "Tushar Dutt (Elite Guide)",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      date: "2026-03-22",
      time: "10:00 AM - 01:00 PM",
      status: "Confirmed",
      type: "Guided Pulse",
      location: "Agra, Uttar Pradesh",
      qr: "/scanner.jpg"
    }
  ]);

  const TIME_SLOTS: { time: string; limit: number; left: number }[] = [
    { time: "06:00 AM - 08:00 AM", limit: 450, left: 120 },
    { time: "09:00 AM - 11:00 AM", limit: 600, left: 45 },
    { time: "12:00 PM - 02:00 PM", limit: 600, left: 210 },
    { time: "03:00 PM - 05:00 PM", limit: 600, left: 15 },
    { time: "06:00 PM - 08:00 PM", limit: 300, left: 88 }
  ];

  const GUIDES = [
    { 
      id: 1, 
      name: "Tushar Dutt", 
      languages: ["English", "Hindi", "German"], 
      contact: "+91 98765 43210", 
      exp: "15 Years", 
      rating: 4.9, 
      bio: "Ministry of Tourism certified guide. Specializes in Mughal Architecture and Taj Mahal deep-dives.", 
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      social: "@tusharguide_official",
      verified: true
    },
    { 
      id: 2, 
      name: "Madhu Pulipati", 
      languages: ["English", "Kannada", "Telugu"], 
      contact: "+91 87654 32109", 
      exp: "10 Years", 
      rating: 4.8, 
      bio: "Vijayanagara Archeology expert. Licensed by Ministry of Tourism for the Hampi heritage circuit.", 
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      social: "@madhu_hampi_explorer",
      verified: true
    },
    { 
      id: 3, 
      name: "Chelliah Balu", 
      languages: ["English", "Tamil", "French"], 
      contact: "+91 76543 21098", 
      exp: "20 Years", 
      rating: 4.7, 
      bio: "Senior Regional Guest Guide for Madurai. Deep expertise in Dravidian Temple Architecture.", 
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
      social: "@balu_madurai_tours",
      verified: true
    },
    { 
      id: 4, 
      name: "Arjun Bhat", 
      languages: ["English", "Hindi", "Kannada"], 
      contact: "+91 65432 10987", 
      exp: "8 Years", 
      rating: 4.6, 
      bio: "Founder of Explore Hampi. Storyteller and heritage photographer with massive social influence.", 
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      social: "@explorehampi",
      verified: true
    }
  ];

  const ITINERARIES = {
    budget: [
      { time: "08:00 AM", task: "Sunrise view at Chandrabhaga Beach", cost: "Free" },
      { time: "10:00 AM", task: "Konark Sun Temple Guided Walk", cost: "₹40" },
      { time: "01:00 PM", task: "Local Odia lunch at Eco Retreat", cost: "₹200" },
      { time: "04:00 PM", task: "Visit Ramchandi Temple", cost: "₹50" }
    ],
    luxury: [
      { time: "09:00 AM", task: "Private Drone Tour of Konark", cost: "₹2000" },
      { time: "12:00 PM", task: "Fine dining at Lotus Resort", cost: "₹1500" },
      { time: "03:00 PM", task: "VIP Access to Heritage Archives", cost: "₹500" },
      { time: "06:00 PM", task: "Exclusive Light and Sound Show seat", cost: "₹300" }
    ]
  };

  const openDetail = (m: any) => {
     setActiveDetail(m);
     setShowDetailCard(true);
  };

   const openGallery = (m: any) => {
     setGalleryImages(m.gallery || [m.image]);
     setActiveGalleryName(m.name);
     setActiveFacts(m.facts || [m.desc]);
     setShowGallery(true);
  };

   const MONUMENTS: Monument[] = [
    { 
      id: 1, 
      name: "Konark Sun Temple", 
      query: "Konark+Sun+Temple+Odisha+India", 
      coords: [19.8876, 86.0945], 
      zoom: 18, 
      image: "/assets/KONARK/konark_hero.png", 
      gallery: [
        "/assets/KONARK/konark_hero.png",
        "/assets/KONARK/download (2).jpg",
        "/assets/KONARK/download (3).jpg",
        "/assets/KONARK/download (4).jpg",
        "/assets/KONARK/download (5).jpg"
      ],
      desc: "A 13th-century chariot temple dedicated to Surya, known for its intricate stone carvings.", 
      facts: ["Engineering marvel of stone wheels", "Sundial precision within seconds", "UNESCO World Heritage Site", "Khondalite rock structure", "Arka Kshetra significance"],
      videoId: "v1eK7fP8j9o",
      architecture: "Kalinga Style (Rekha Deulas)",
      history: "Built by King Narasimhadeva I of Eastern Ganga Dynasty in 1250 CE. It represents the Sun God's chariot with 24 wheels.",
      bestTime: "October to March (Konark Festival timing)",
      foodIntel: [
        { item: "Prawn Rolls / Seafood", price: "₹100-200", spot: "Hotel Chandrabhaga" },
        { item: "Traditional Odia Thali", price: "₹200", spot: "Wildgrass Restaurant" }
      ],
      feedback: "Verified by @OdishaTourism: 'The spiritual energy at sunrise is unmatched.' - LinkedIn Review"
    },
    { 
      id: 2, 
      name: "Taj Mahal", 
      query: "Taj+Mahal+Agra+India", 
      coords: [27.1751, 78.0421], 
      zoom: 18, 
      image: "/assets/Taj Mahal/gettyimages-155096944-612x612.jpg", 
      gallery: [
        "/assets/Taj Mahal/gettyimages-155096944-612x612.jpg",
        "/assets/Taj Mahal/sunrise-at-taj-mahal--agra--uttar-pradash--india-583682538-5b91840bc9e77c0050bdc67b.jpg",
        "/assets/Taj Mahal/download.jpg",
        "/assets/Taj Mahal/97.png",
        "/assets/Taj Mahal/images.jpg"
      ],
      desc: "An ivory-white marble mausoleum on the south bank of the Yamuna river.", 
      facts: ["Symmetrical marble perfection", "Optical illusion of entrance size", "Wonders of the World", "Makrana marble source", "22 years construction timeline"],
      videoId: "e_W2pGj02t0",
      architecture: "Mughal (Persian, Islamic, Indian fusion)",
      history: "Commissioned in 1632 by Shah Jahan for Mumtaz Mahal. Employed over 20,000 artisans.",
      bestTime: "Sunrise for the 'Pink' marble effect.",
      foodIntel: [
        { item: "Agra Petha (Sweet)", price: "₹50-100", spot: "Panchhi Petha" },
        { item: "Mughlai Dinner", price: "₹500 (2 ppl)", spot: "Joney's Place" }
      ],
      feedback: "Featured on @NationalGeographic: 'The pinnacle of Mughal architecture.' - Instagram Pulse"
    },
    { 
      id: 3, 
      name: "Hampi Ruins", 
      query: "Hampi+Group+of+Monuments+Karnataka+India", 
      coords: [15.3350, 76.4600], 
      zoom: 17, 
      image: "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg", 
      gallery: [
        "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg",
        "/assets/Hampi Ruins/virupaksha-temple-hampi-karnataka-1-attr-nearby.jpg",
        "/assets/Hampi Ruins/vitthala-temple-complex-hampi-tri-hero.jpg",
        "/assets/Hampi Ruins/images.jpg",
        "/assets/Hampi Ruins/download.jpg"
      ],
      desc: "Capital of the Vijayanagara Empire, featuring stunning stone architecture.", 
      facts: ["Monolithic Narasimha sculpture", "Musical stone pillars of Vitthala", "Rock-cut cave architecture", "Ancient stone chariot", "Tungabhadra river terrain"],
      videoId: "q_oK-rYf_Y4",
      architecture: "Vijayanagara Style",
      history: "Capital of Vijayanagara Empire (14th-16th century). Destroyed in 1565 after the Battle of Talikota.",
      bestTime: "Hampi Utsav (November)",
      foodIntel: [
        { item: "Traditional South Thali", price: "₹150", spot: "Mango Tree Restaurant" },
        { item: "Filter Coffee", price: "₹30", spot: "Hampi Bazaar" }
      ],
      feedback: "@LonelyPlanet: 'A bouldery landscape that feels like another planet.'"
    },
    { 
      id: 4, 
      name: "Meenakshi Temple", 
      query: "Meenakshi+Amman+Temple+Madurai+India", 
      coords: [9.9195, 78.1193], 
      zoom: 18, 
      image: "/assets/Meenakshi Temple/meenakshi-amman-temple-india.avif", 
      gallery: [
        "/assets/Meenakshi Temple/meenakshi-amman-temple-india.avif",
        "/assets/Meenakshi Temple/27104002564_c0e6de4e06_b.jpg",
        "/assets/Meenakshi Temple/c61a2b8259c57ff86adfd5f8180b163357b5ff80.jpg",
        "/assets/Meenakshi Temple/images.jpg",
        "/assets/Meenakshi Temple/download.jpg"
      ],
      desc: "Historic temple known for its 14 colorful gopurams and Dravidian style.", 
      facts: ["Thousands of colorful stone figures", "Hall of Thousand Pillars", "Sacred Lotus tank", "Pandyan architecture", "Celestial color palette"],
      videoId: "M4N7K1P3S5T",
      architecture: "Dravidian Architecture",
      history: "Founded by King Kulasekara Pandya. Rebuilt in the late 16th century by the Nayak dynasty.",
      bestTime: "April/May during Chithirai Festival.",
      foodIntel: [
        { item: "Madurai Bun Parotta", price: "₹40-80", spot: "Famous Bun Parotta Shop" },
        { item: "Jigarthanda (Drink)", price: "₹50", spot: "Famous Jigarthanda" }
      ],
      feedback: "Verified by @HinduTemples: 'The vibrant colors represent the living soul of Tamil Nadu.'"
    },
    { 
      id: 5, 
      name: "Khajuraho Group", 
      query: "Khajuraho+Group+of+Monuments+India", 
      coords: [24.8318, 79.9199], 
      zoom: 18, 
      image: "/assets/Khajuraho Temples/khajuraho-fi.webp", 
      gallery: [
        "/assets/Khajuraho Temples/khajuraho-fi.webp",
        "/assets/Khajuraho Temples/outlooktraveller_2024-09-28_f6onhspi_shutterstock2152949513.avif",
        "/assets/Khajuraho Temples/images.jpg",
        "/assets/Khajuraho Temples/download.jpg",
        "/assets/Khajuraho Temples/khajuraho-fi.webp"
      ],
      desc: "UNESCO group of Hindu and Jain temples known for Nagara-style architectural symbolism.", 
      facts: ["Intricate erotic sculptures", "Spiritual symbolism in stone", "Kandariya Mahadeva temple", "Chandela dynasty heritage", "Nagara architectural style"],
      videoId: "x9J0L2k8H2A",
      architecture: "Nagara Style (Shikhara towers)",
      history: "Built between 950 and 1050 CE by the Chandela Dynasty. Only 20 temples remain today.",
      bestTime: "Khajuraho Dance Festival (February).",
      foodIntel: [
        { item: "Poha / Jalebi", price: "₹60", spot: "Local Market" },
        { item: "Bafla Ri", price: "₹180", spot: "Agrasen Dhaba" }
      ],
      feedback: "@HistoryChannel: 'The most detailed stone carvings ever found in Asia.'"
    },
    { 
      id: 6, 
      name: "Ajanta Caves", 
      query: "Ajanta+Caves+Maharashtra+India", 
      coords: [20.5519, 75.7490], 
      zoom: 18, 
      image: "/assets/Ajanta Caves/ajanta-caves-5-to-8-3071.jpg", 
      gallery: [
        "/assets/Ajanta Caves/ajanta-caves-5-to-8-3071.jpg",
        "/assets/Ajanta Caves/outlooktraveller_2025-08-06_7sa66ppu_shutterstock2412374961-min.avif",
        "/assets/Ajanta Caves/Sculptures-inside-the-rock-cut-caves-1.jpg",
        "/assets/Ajanta Caves/images.jpg",
        "/assets/Ajanta Caves/download.jpg"
      ],
      desc: "Rock-cut Buddhist cave monuments including paintings and sculptures.", 
      facts: ["Ancient fresco paintings", "Masterpieces of Buddhist art", "Hidden in a horseshoe valley", "30 rock-cut caves", "2nd century BCE origins"],
      videoId: "b2S3D5F7G9H",
      architecture: "Rock-cut Architecture",
      history: "Two phases of construction: 2nd century BCE and 5th-6th centuries CE. Rediscovered by British in 1819.",
      bestTime: "Monsoon (June to September) for lush green views.",
      foodIntel: [
        { item: "Maharashtrian Thali", price: "₹250", spot: "MTDC Resort Ajanta" }
      ],
      feedback: "LinkedIn @ArchaeologyWorld: 'The frescoes remain vibrant after 2,000 years.'"
    },
    { 
      id: 7, 
      name: "Ellora Caves", 
      query: "Ellora+Caves+Maharashtra+India", 
      coords: [20.0268, 75.1771], 
      zoom: 18, 
      image: "/assets/Ellora Caves/gettyimages-481998527-1024x1024.jpg", 
      gallery: [
        "/assets/Ellora Caves/gettyimages-481998527-1024x1024.jpg",
        "/assets/Ellora Caves/kailasa-temple-an-underrated-engineering-marvel-carved-out-v0-zxbpze3e08md1.webp",
        "/assets/Ellora Caves/the-kailasa-temple-in-maharashtra-india-carved-out-of-one-v0-8t7tjutdl0x61.webp",
        "/assets/Ellora Caves/the-kailasa-temple-was-carved-out-of-one-single-rock-also-v0-9v5hegpf95t21.webp",
        "/assets/Ellora Caves/images.jpg"
      ],
      desc: "One of the largest rock-cut monastery-temple cave complexes in the world.", 
      facts: ["Kailasa temple monolith", "Multicultural cave complex", "Vibrant medieval carvings", "Rashtrakuta dynasty art", "Advanced water system"],
      videoId: "xP7Y1W3Z5Q9",
      architecture: "Multi-Faith (Buddhist, Hindu, Jain) Rock-cut",
      history: "Constructed by Rashtrakuta dynasty. Cave 16 (Kailasa) is a single monolith carved top-down.",
      bestTime: "October to March.",
      foodIntel: [
        { item: "Pithla Bhakri", price: "₹120", spot: "Local Dhaba" },
        { item: "Naan Khalia", price: "₹300", spot: "Tara Paan" }
      ],
      feedback: "@EngineeringMarvels: 'Kailasa temple is a feat that modern tech would struggle to replicate.'"
    },
    { 
      id: 8, 
      name: "Harmandir Sahib", 
      query: "Golden+Temple+Amritsar+India", 
      coords: [31.6200, 74.8765],
      zoom: 18, 
      image: "/assets/Harmandir Sahib/GoldenTemple_SriHarmandirSahib_Amritsar-SikhShrine_4dc9d3a2-dd51-4d92-8b41-d11c86a651e5.jpg", 
      gallery: [
         "/assets/Harmandir Sahib/GoldenTemple_SriHarmandirSahib_Amritsar-SikhShrine_4dc9d3a2-dd51-4d92-8b41-d11c86a651e5.jpg",
         "/assets/Harmandir Sahib/The_Golden_Temple_of_Amrithsar_7.jpg",
         "/assets/Harmandir Sahib/images.jpg",
         "/assets/Harmandir Sahib/download.jpg",
         "/assets/Harmandir Sahib/The_Golden_Temple_of_Amrithsar_7.jpg"
      ],
      desc: "The Golden Temple, a spiritual and cultural center of the Sikh religion.", 
      facts: ["Pure gold leaf exterior", "Amrit Sarovar holy lake", "World's largest community kitchen", "Foundation by Muslim Sufi Saint", "Open to all religions"],
      videoId: "y0x1z2w3v4u",
      architecture: "Sikh Architecture (Indo-Islamic + Rajput)",
      history: "Founded in 1577 by Guru Ram Das. Gold leafing added by Ranjit Singh in 1830.",
      bestTime: "Guru Nanak Jayanti or Diwali (spectacular lighting).",
      foodIntel: [
        { item: "Langar (Free Meal)", price: "Free", spot: "Golden Temple Kitchen" },
        { item: "Amritsari Kulcha", price: "₹80-120", spot: "Kulwant Singh Kulcha" }
      ],
      feedback: "@TheGuardian: 'The kitchen feeds 100,000 people daily, a true miracle of service.'"
    },
    { 
      id: 9, 
      name: "Qutub Minar", 
      query: "Qutub+Minar+Delhi+India", 
      coords: [28.5245, 77.1855],
      zoom: 18, 
      image: "/assets/Sanchi Stupa/Qutub Minar/qutub1_042717100950.jpg", 
      gallery: [
        "/assets/Sanchi Stupa/Qutub Minar/qutub1_042717100950.jpg",
        "/assets/Sanchi Stupa/Qutub Minar/m_activities_delhi_qutab_minar_l_384_574.avif",
        "/assets/Sanchi Stupa/Qutub Minar/81oouyTdp2L._AC_UF1000,1000_QL80_.jpg",
        "/assets/Sanchi Stupa/Qutub Minar/images.jpg",
        "/assets/Sanchi Stupa/Qutub Minar/download.jpg"
      ],
      desc: "A 73-metre tall tapering tower with five storeys and projecting balconies.", 
      facts: ["World's tallest brick minaret", "Indo-Islamic structural fusion", "Rust-resistant Iron Pillar", "Arabic calligraphy in stone", "UNESCO recognition 1993"],
      videoId: "rQ7s1t5u9v3",
      architecture: "Indo-Islamic Architecture",
      history: "Construction started by Qutb-ud-din Aibak in 1192 and finished by Iltutmish.",
      bestTime: "Qutub Festival (November/December).",
      foodIntel: [
        { item: "Dilli ki Chaat", price: "₹50-100", spot: "Local Stalls" },
        { item: "Fine Dining", price: "₹2000", spot: "Olive Qutub" }
      ],
      feedback: "@NatGeoTravel: 'The Iron Pillar stands as a 1600-year-old mystery of metallurgy.'"
    },
    { 
      id: 10, 
      name: "Mahabalipuram", 
      query: "Mahabalipuram+Monuments+Tamil+Nadu+India", 
      coords: [12.6163, 80.1925],
      zoom: 18, 
      image: "/assets/Mahabalipuram/Mahabalipuram.avif", 
      gallery: [
        "/assets/Mahabalipuram/Mahabalipuram.avif",
        "/assets/Mahabalipuram/shore-temple-mahabalipuram-1.webp",
        "/assets/Mahabalipuram/images.jpg",
        "/assets/Mahabalipuram/download.jpg",
        "/assets/Mahabalipuram/Mahabalipuram.avif"
      ],
      desc: "Pallava dynasty rock-cut temples and monolithic monuments by the coast.", 
      facts: ["Shore Temple sea-spray resistance", "Descent of the Ganges bas-relief", "Pancha Rathas monoliths", "Krishna's Butter Ball mystery", "UNESCO World Heritage site"],
      videoId: "Wj4l_q2m_P0",
      architecture: "Pallava (Rock-cut + Structural)",
      history: "Mainly constructed during the reigns of Narasimhavarman I and II (7th-8th century).",
      bestTime: "December to February (Mahabalipuram Dance Festival).",
      foodIntel: [
        { item: "Fresh Sea Food", price: "₹400-800", spot: "Moonrakers" },
        { item: "Filter Coffee", price: "₹40", spot: "Mamalla Heritage" }
      ],
      feedback: "@TravelWeekly: 'The rock-cut bas-reliefs are the largest in the world.'"
    },
    { 
      id: 11, 
      name: "Sanchi Stupa", 
      query: "Sanchi+Stupa+Madhya+Pradesh+India", 
      coords: [23.4807, 77.7363],
      zoom: 18, 
      image: "/assets/Sanchi Stupa/sanchi-great-stupa.jpg", 
      gallery: [
        "/assets/Sanchi Stupa/sanchi-great-stupa.jpg",
        "/assets/Sanchi Stupa/The_Sanchi_Stupas.webp",
        "/assets/Sanchi Stupa/img-2415_orig.jpg",
        "/assets/Sanchi Stupa/images.jpg",
        "/assets/Sanchi Stupa/download.jpg"
      ],
      desc: "Oldest stone structure in India commissioned by Emperor Ashoka.", 
      facts: ["Buddhist relics containment", "Intricate gateway toranas", "Third-century Mauryan architecture", "Torana carvings of Jataka tales", "Great white hemisphere dome"],
      videoId: "0N0R0M0K8C0",
      architecture: "Buddhist Architecture (Stupa Style)",
      history: "Originally built in the 3rd century BCE by Ashoka. Encased in stone during Shunga period.",
      bestTime: "Early morning for tranquil meditation energy.",
      foodIntel: [
        { item: "Bundelkhandi Meals", price: "₹200", spot: "Gateway Retreat" }
      ],
      feedback: "@LionCapital: 'The four gateways (toranas) are an open-air library of Buddhist philosophy.'"
    },
    { 
      id: 12, 
      name: "Victoria Memorial", 
      query: "Victoria+Memorial+Kolkata+India", 
      coords: [22.5448, 88.3426],
      zoom: 18, 
      image: "/assets/Victoria Memorial/victoria-memorial-kolkata-wb-2-attr-hero.jpg", 
      gallery: [
        "/assets/Victoria Memorial/victoria-memorial-kolkata-wb-2-attr-hero.jpg",
        "/assets/Victoria Memorial/Victoria-Memorial-Hall-Kolkata-India-West-Bengal.webp",
        "/assets/Victoria Memorial/1722337818478_victoriamemorial1.webp",
        "/assets/Victoria Memorial/images.jpg",
        "/assets/Victoria Memorial/download.jpg"
      ],
      desc: "Large marble building in Kolkata, a monumental tribute to Queen Victoria.", 
      facts: ["Makrana marble structure", "Indo-Saracenic revival architecture", "Angel of Victory revolving statue", "15th cent. Italian architectural link", "Largest monument dedicated to a monarch"],
      videoId: "bXqjFw8lB5k",
      architecture: "Indo-Saracenic Revival Architecture",
      history: "Constructed between 1906 and 1921. Inspired by Taj Mahal design.",
      bestTime: "Evenings for the Light & Sound show.",
      foodIntel: [
        { item: "Kolkata Jhalmuri", price: "₹30", spot: "Local Stalls" },
        { item: "Bengali Thali", price: "₹450", spot: "6 Ballygunge Place" }
      ],
      feedback: "@KolkataPulse: 'The pride of the City of Joy, a marble dream in the heart of the Maidan.'"
    },
    { 
      id: 13, 
      name: "Red Fort", 
      query: "Red+Fort+Delhi+India", 
      coords: [28.6562, 77.2410],
      zoom: 18, 
      image: "/assets/Red Fort/red_fort.png", 
      gallery: [
        "/assets/Red Fort/red_fort.png",
        "/assets/Red Fort/red_fort.png",
        "/assets/Red Fort/red_fort.png",
        "/assets/Red Fort/red_fort.png",
        "/assets/Red Fort/red_fort.png"
      ],
      desc: "Historic fort in Delhi that served as the main residence of the Mughal Emperors.", 
      facts: ["Built by Emperor Shah Jahan", "Massive red sandstone walls", "UNESCO World Heritage Site", "Lahori Gate significance", "Peacock Throne once housed here"],
      videoId: "hXF-M0fG4E0",
      architecture: "Mughal Architecture (Red Sandstone)",
      history: "Constructed in 1638 when Shah Jahan shifted the capital from Agra to Delhi.",
      bestTime: "Independence Day (Aug 15) for national pride, otherwise winters (Oct-Feb).",
      foodIntel: [
        { item: "Paranthas", price: "₹100", spot: "Paranthe Wali Gali" },
        { item: "Royal Meat Dishes", price: "₹800", spot: "Karim's Old Delhi" }
      ],
      feedback: "@DelhiTimes: 'Walking through Chhatta Chowk is like stepping back into the 17th century.'"
    },
    { 
      id: 14, 
      name: "Amer Fort", 
      query: "Amer+Fort+Jaipur+India", 
      coords: [26.9855, 75.8513],
      zoom: 18, 
      image: "/assets/Amer Fort/amer_fort.png", 
      gallery: [
        "/assets/Amer Fort/amer_fort.png",
        "/assets/Amer Fort/amer_fort.png",
        "/assets/Amer Fort/amer_fort.png",
        "/assets/Amer Fort/amer_fort.png",
        "/assets/Amer Fort/amer_fort.png"
      ],
      desc: "Magnificent fort palace in Rajasthan, known for its artistic Hindu style elements.", 
      facts: ["Famous Sheesh Mahal (Mirrored Palace)", "Integrated Maota Lake irrigation", "Hindu & Rajput architectural fusion", "Elephant ride ascent", "Silver gate of Sila Devi temple"],
      videoId: "3g60e4-B-nI",
      architecture: "Rajput Architecture (Marble & Red Sandstone)",
      history: "Originally built by Raja Man Singh and later expanded by Sawai Jai Singh.",
      bestTime: "Sunset for the golden glow on the walls.",
      foodIntel: [
        { item: "Dal Baati Churma", price: "₹350", spot: "Chokhi Dhani (Village)" },
        { item: "Royal Rajasthani Thali", price: "₹900", spot: "1135 AD (Inside Fort)" }
      ],
      feedback: "@JaipurTravel: 'The Mirror Palace is a dazzling masterpiece of royal ingenuity.'"
    },
    { 
      id: 15, 
      name: "Gol Gumbaz", 
      query: "Gol+Gumbaz+Bijapur+India", 
      coords: [16.8300, 75.7360],
      zoom: 18, 
      image: "/assets/Gol Gumbaz/gol_gumbaz.png", 
      gallery: [
        "/assets/Gol Gumbaz/gol_gumbaz.png",
        "/assets/Gol Gumbaz/gol_gumbaz.png",
        "/assets/Gol Gumbaz/gol_gumbaz.png",
        "/assets/Gol Gumbaz/gol_gumbaz.png",
        "/assets/Gol Gumbaz/gol_gumbaz.png"
      ],
      desc: "The tomb of Adil Shah, featuring the second largest dome in the world.", 
      facts: ["Whispering gallery acoustics", "Second largest dome world-wide", "Deccan architecture masterpiece", "Dark grey basalt structure", "Monolithic dome design"],
      videoId: "vXm80E1O0T8",
      architecture: "Indo-Islamic (Deccan Sultanate Style)",
      history: "Tomb of Mohammed Adil Shah, completed in 1656. Famous for its 7-storey octagonal turrets.",
      bestTime: "September to February.",
      foodIntel: [
        { item: "Jowar Roti / Enne Gai", price: "₹150", spot: "Local Mess" }
      ],
      feedback: "@AcousticWeekly: 'The whispering gallery echo is heard 7 times, a structural miracle.'"
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = MONUMENTS.find(m => m.name.toLowerCase().includes(query.toLowerCase()));
    if (found) {
      setSelectedMonument(found);
      setShowSpidercam(true);
    }
  };

  const getAiSuggestion = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiSuggestion(`AI Analysis for ${selectedMonument?.name}: Best explored at dawn. Use the Spidercam's altitude mode to see the geometric precision of the structure.`);
      setAiLoading(false);
    }, 1500);
  };

  const handleBookingStart = () => {
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
    try {
      // Simulate confirmation and add to heritage ledger
      const newBooking = {
        id: `HB-${Math.floor(Math.random() * 9000) + 1000}`,
        name: selectedMonument?.name || "Neural Guide Session",
        image: selectedMonument?.image || selectedGuide?.img || "/assets/KONARK/konark_hero.png",
        date: bookingDetails.date || "2026-03-25",
        time: bookingDetails.time || "10:00 AM - 12:00 PM",
        status: "Confirmed",
        type: bookingDetails.type,
        location: selectedMonument?.desc?.split(",")[0] || "Cultural Site",
        qr: "/scanner.jpg"
      };
      
      setMyBookings(prev => [newBooking, ...prev]);

      setTimeout(() => {
        setIsProcessing(false);
        setBookingStatus("success");
        setTimeout(() => {
           setBookingStep("idle");
           setBookingStatus("idle");
           setViewMode("bookings");
        }, 3000);
      }, 2000);
    } catch {
      setIsProcessing(false);
      setBookingStatus("error");
    }
  };

  return (
    <main className="heritage-page-shell flex h-screen w-screen font-sans overflow-hidden relative" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
        {/* Background image — Explore page */}
        <div className="page-bg" style={{ backgroundImage: "url('/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg')" }} />
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        
        {/* Top Header */}
        <div className="h-20 flex items-center justify-between px-6 md:px-8 z-20 shrink-0 pt-14 lg:pt-0 header-glass">
          <div className="flex items-center gap-8">
            <div className="flex p-1.5 bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10">
               <button 
                 onClick={() => setViewMode("explore")} 
                 className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'explore' ? 'bg-white text-black shadow-xl scale-105' : 'text-gray-400 hover:text-white'}`}
               >
                 Explore Nodes
               </button>
               <button 
                 onClick={() => setViewMode("bookings")} 
                 className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'bookings' ? 'bg-white text-black shadow-xl scale-105' : 'text-gray-400 hover:text-white'}`}
               >
                 My Reservations
               </button>
            </div>

            <form onSubmit={handleSearch} className="flex items-center gap-3 rounded-[1.25rem] px-5 py-3 w-72 lg:w-96 transition-all focus-within:shadow-xl focus-within:scale-[1.01]" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
               <div className="w-5 h-5 flex items-center justify-center shrink-0">
                 <Search className="w-4.5 h-4.5 opacity-40" style={{ color: "var(--text-strong)" }} />
               </div>
               <input 
                 type="text" 
                 placeholder="Search heritage database..." 
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 className="bg-transparent border-none outline-none text-[13px] w-full font-bold tracking-tight"
                 style={{ color: "var(--text-strong)" }}
               />
            </form>
          </div>

            <div className="hidden xl:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none opacity-60" style={{ color: "var(--text-muted)" }}>Network: Online</span>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-6 shrink-0">
            {selectedMonument && (
              <button 
                onClick={() => {setSelectedMonument(null); setShowSpidercam(false); setQuery("");}} 
                className="text-[10px] font-black text-white uppercase tracking-widest px-6 py-3.5 rounded-2xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20" 
                style={{ background: "#2563eb" }}
              >
                <ChevronLeft className="w-4 h-4" /> Return to Command
              </button>
            )}
            <TopHeader />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {viewMode === "bookings" ? (
             <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <header>
                   <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">Sovereign Ledger</h2>
                   <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em] mt-2">Active Passes & Historical Reservations</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {myBookings.map((b) => (
                      <div key={b.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:border-blue-500/50 transition-all group relative overflow-hidden flex flex-col gap-6">
                         <div className="flex items-start justify-between relative z-10">
                            <div className="flex items-center gap-6">
                               <div className="w-20 h-20 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                  <img src={b.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                               </div>
                               <div>
                                  <p className="text-[9px] text-blue-400 font-black uppercase tracking-widest mb-1">{b.type}</p>
                                  <h3 className="text-2xl font-black text-white italic tracking-tight">{b.name}</h3>
                                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-2"><MapPin className="w-3 h-3" /> {b.location}</p>
                               </div>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${b.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                               {b.status}
                            </div>
                         </div>

                         <div className="grid grid-cols-2 gap-4 relative z-10">
                            <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                               <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1">Temporal Node</p>
                               <p className="text-xs font-bold text-white tracking-wide">{b.date}</p>
                            </div>
                            <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                               <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1">Time Window</p>
                               <p className="text-xs font-bold text-white tracking-wide">{b.time}</p>
                            </div>
                         </div>

                         <div className="flex items-center gap-4 pt-4 border-t border-white/5 relative z-10">
                            <button onClick={() => { setBookingStatus("success"); setBookingStep("scanner"); }} className="flex-1 flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                               <QrCode className="w-4 h-4" /> View Pass
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-gray-400 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-all">
                               Manage Pass
                            </button>
                         </div>

                         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full" />
                      </div>
                   ))}
                </div>
             </div>
          ) : showSpidercam && selectedMonument ? (
              <div className="grid grid-cols-12 gap-6 min-h-full">
                {/* Part 1: Neural Map (Spans 5/12) */}
                <div className="col-span-12 xl:col-span-5 rounded-[2rem] border border-slate-200 bg-white shadow-2xl overflow-hidden relative min-h-[400px] lg:min-h-0 animate-in fade-in zoom-in duration-500">
                    <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-2xl border border-slate-200 shadow-xl">
                       <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black mb-0.5">Vector 01: Neural Matrix</p>
                       <p className="text-sm font-black text-slate-900 tracking-tight">{selectedMonument?.name}</p>
                    </div>
                    <MapComponent activeLocation={{ coords: selectedMonument?.coords }} />
                    
                    {/* Interactive Image Gallery Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-3 overflow-x-auto p-3 bg-white/70 backdrop-blur-2xl rounded-3xl border border-slate-100 shadow-2xl scrollbar-hide group">
                      {selectedMonument?.gallery?.map((img: string, i: number) => (
                        <div key={i} onClick={() => openGallery(selectedMonument)} className="w-24 h-16 rounded-xl overflow-hidden border-2 border-white/50 shrink-0 cursor-pointer group/item hover:scale-105 transition-all relative shadow-sm">
                           <img 
                            src={img} 
                            className="w-full h-full object-cover group-hover/item:brightness-110 transition-all" 
                            alt="Heritage" 
                            onError={(e) => {
                               (e.target as HTMLImageElement).src = "/assets/KONARK/download (1).jpg";
                            }}
                           />
                           <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                      ))}
                      <div onClick={() => openGallery(selectedMonument)} className="w-24 h-16 rounded-xl bg-blue-50 border-2 border-blue-100 flex flex-col items-center justify-center shrink-0 cursor-pointer hover:bg-blue-100 transition-all group/matrix shadow-sm">
                         <Camera className="w-5 h-5 text-blue-500 mb-1 group-hover/matrix:scale-110 transition-transform" />
                         <span className="text-[8px] font-black text-blue-600 uppercase tracking-tighter">View Matrix</span>
                      </div>
                   </div>
                </div>

                {/* Part 2: Spidercam 3D View (Spans 4/12) */}
                <div className="col-span-12 xl:col-span-4 rounded-[2rem] overflow-hidden relative shadow-2xl border border-slate-200 bg-slate-900 animate-in fade-in zoom-in duration-700 delay-100">
                   <div className="absolute top-6 left-6 z-20 backdrop-blur-xl px-4 py-2 rounded-2xl border border-blue-500/20 bg-blue-500/10 shadow-xl">
                      <p className="text-[9px] text-blue-400 uppercase tracking-widest font-black mb-0.5">Vector 02: 3D Scan</p>
                      <p className="text-xs font-bold text-white tracking-wide">Live Spatial Feed</p>
                   </div>
                      <iframe 
                      src={`https://www.google.com/maps?q=${selectedMonument?.query}&t=k&z=19&output=embed`}
                      className="w-full h-full border-none opacity-80"
                      allowFullScreen
                   />
                   <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-blue-400/30 shadow-[0_0_20px_#3b82f6] animate-scanline" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-blue-500/10 rounded-full animate-ping opacity-20" />
                   </div>
                </div>

                {/* Logistics & Action Panel (Spans 3/12) */}
                <div className="col-span-12 xl:col-span-3 flex flex-col gap-6 animate-in fade-in slide-in-from-right duration-700 delay-200">
                   {/* Media Hub */}
                   <div className="p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group border border-slate-200 bg-white hover-lift transition-all">
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all" />
                      <h3 className="font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-3 text-slate-800">
                         <div className="p-2 rounded-xl bg-blue-50"><PlaySquare className="w-4 h-4 text-blue-500" /></div>
                         Heritage Feed
                      </h3>
                      <div className="rounded-2xl overflow-hidden aspect-video bg-slate-100 border border-slate-200 mb-6 shadow-inner relative group/video">
                         <iframe 
                             src={`https://www.youtube.com/embed/${selectedMonument?.videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                             className="w-full h-full opacity-90 group-hover/video:opacity-100 transition-opacity"
                             allowFullScreen
                          />
                      </div>
                       <div className="flex flex-col gap-3">
                          <button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-95"
                            onClick={() => {
                              setSelectedMonument(selectedMonument); 
                              setBookingDetails({...bookingDetails, type: "Monument Visit"});
                              setBookingStep("location");
                            }}
                          >
                            <Ticket className="w-4.5 h-4.5" /> Book Monument Visit
                          </button>
                          
                          <button 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 active:scale-95"
                            onClick={() => {
                              setSelectedMonument(selectedMonument);
                              setBookingDetails({...bookingDetails, type: "Guided Tour"});
                              setBookingStep("location");
                            }}
                          >
                            <Users className="w-4.5 h-4.5" /> Book Guided Pulse
                          </button>

                          <button 
                            className="w-full bg-slate-900 border border-white/10 hover:border-blue-500/50 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95"
                            onClick={() => {
                              setSelectedMonument(selectedMonument);
                              setBookingDetails({...bookingDetails, type: "Heritage Circuit"});
                              setBookingStep("location");
                            }}
                          >
                            <Navigation2 className="w-4.5 h-4.5 text-blue-500" /> Reserve Circuit Pass
                          </button>
                       </div>
                   </div>
                   
                   {/* AI Historian Guide */}
                   <div className="flex-1 p-6 rounded-[2rem] border border-slate-200 bg-white shadow-2xl flex flex-col hover-lift transition-all">
                      <h3 className="font-black uppercase tracking-widest text-[10px] mb-6 flex items-center gap-3 text-slate-800">
                        <div className="p-2 rounded-xl bg-amber-50"><Star className="w-4 h-4 text-amber-500" /></div>
                        Neural Archaeologist
                      </h3>
                      <div className="space-y-4 mb-6">
                         <div className="p-4 bg-red-50 border border-red-100 rounded-2xl shadow-sm">
                            <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> Critical Node</p>
                            <p className="text-[11px] leading-relaxed font-bold text-slate-700 tracking-tight">1903: Structural collapse recorded in quadrant B-4. High alert for seismic anomalies.</p>
                         </div>
                         <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span className="text-[10px] font-black tracking-tight uppercase text-slate-600">Prime Node: Nata Mandir</span>
                         </div>
                      </div>
                      
                      <div className="rounded-2xl overflow-hidden mb-6 border border-slate-200 aspect-square relative group shadow-inner">
                         <img src={selectedMonument?.image || "/assets/KONARK/konark_hero.png"} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" />
                         <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay" />
                         <div className="absolute inset-x-0 bottom-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100">
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">Metadata: Voxel Scan Ref #772</p>
                         </div>
                      </div>

                      <button onClick={getAiSuggestion} disabled={aiLoading} className="w-full py-3.5 bg-slate-900 hover:bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                         {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
                         Query Intelligence
                      </button>
                      {aiSuggestion && (
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-[11px] font-bold leading-relaxed text-slate-700 animate-in slide-in-from-top-2">
                          {aiSuggestion}
                        </div>
                      )}
                   </div>
                </div>
              </div>
          ) : (
             <div className="flex flex-col gap-10 animate-fade-in">
                <header className="px-2">
                  <h1 className="text-6xl font-black tracking-tighter text-white mb-2 italic uppercase">Imperative Access</h1>
                  <div className="flex items-center gap-4 text-[11px] text-gray-500 uppercase tracking-[0.4em] font-black">
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
                       Live Node: Active
                    </div>
                    <span className="opacity-20">|</span>
                    <span>Global Portal Interface v4.5</span>
                  </div>
                </header>

                <div className="grid grid-cols-12 gap-8">
                  {/* Left Column: Featured & Secondary Listings (Spans 8/12) */}
                  <div className="col-span-12 xl:col-span-8 flex flex-col gap-8">
                    {/* Featured Card */}
                    <div className="rounded-[2rem] overflow-hidden group shadow-2xl relative border border-white/5 bg-slate-900 aspect-video lg:aspect-[21/9] flex flex-col justify-end">
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110"
                          style={{ backgroundImage: `url('${MONUMENTS[0].image}')` }}
                        >
                          <div className="w-full h-full bg-linear-to-t from-black via-black/40 to-transparent" />
                        </div>
                        <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                          <div className="flex flex-col items-start gap-4">
                            <span className="px-5 py-2 bg-blue-600 text-white text-[10px] font-black tracking-widest uppercase rounded-2xl shadow-2xl border border-blue-500/50 animate-bounce-subtle">Primary Node: Cultural Apex</span>
                            <h2 className="text-5xl lg:text-8xl font-black text-white drop-shadow-2xl tracking-tighter uppercase italic">{MONUMENTS[0].name}</h2>
                            <div className="flex flex-wrap gap-4 mt-6">
                              <button onClick={() => {setSelectedMonument(MONUMENTS[0]); setShowSpidercam(true);}} className="flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-black tracking-widest text-[11px] uppercase hover:bg-blue-50 transition-all shadow-2xl hover:scale-105 active:scale-95">
                                <Navigation2 className="w-5 h-5 text-blue-600" /> Initiate Scan
                              </button>
                              <button onClick={() => {setSelectedMonument(MONUMENTS[0]); handleBookingStart();}} className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-5 rounded-2xl font-black tracking-widest text-[11px] uppercase hover:bg-white/20 transition-all shadow-2xl hover:scale-105 active:scale-95">
                                <ShieldCheck className="w-5 h-5 text-blue-400" /> Secure Access
                              </button>
                            </div>
                          </div>
                        </div>
                    </div>

                    {/* Secondary Cards Grid (2-column inside 8-column space) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {MONUMENTS.slice(1).map(m => (
                           <div key={m.id} className="p-6 rounded-[2rem] bg-white/90 backdrop-blur-xl border border-slate-200 hover:border-blue-400 transition-all group overflow-hidden relative shadow-xl hover:shadow-blue-200/50 flex flex-col h-full min-h-[480px]">
                             <div className="flex justify-between items-start mb-6">
                                 <div>
                                    <p className="text-[10px] text-blue-600 font-black uppercase mb-1 tracking-[0.3em] opacity-60">Strategic Hub</p>
                                    <h3 className="font-black text-slate-900 uppercase tracking-tighter text-2xl group-hover:text-blue-600 transition-colors line-clamp-1 italic">{m.name}</h3>
                                 </div>
                                 <div className="flex gap-2">
                                    <button onClick={() => openDetail(m)} className="p-3.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white transition-all shadow-sm active:scale-90 border border-slate-200">
                                       <Eye className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => {setSelectedMonument(m); setShowSpidercam(true);}} className="p-3.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-xl active:scale-90 shadow-blue-600/20 border border-blue-500">
                                       <Navigation2 className="w-5 h-5" />
                                    </button>
                                 </div>
                             </div>
                             
                              <div 
                                 onClick={() => openDetail(m)}
                                 className="relative flex-1 rounded-3xl overflow-hidden cursor-pointer group/img border border-slate-200 shadow-inner"
                              >
                                <img 
                                   src={m.image} 
                                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-[5s] group-hover/img:scale-110" 
                                   alt={m.name}
                                   onError={(e) => {
                                      (e.target as HTMLImageElement).src = "/assets/KONARK/download (1).jpg";
                                   }}
                                />
                                 <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col gap-2">
                                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.4em] font-mono">Status: Verified</p>
                                    <div className="w-16 h-1 bg-white/30 rounded-full" />
                                 </div>
                                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all bg-black/20 backdrop-blur-[2px]">
                                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-xl shadow-2xl">
                                       <Camera className="w-8 h-8 text-white" />
                                    </div>
                                 </div>
                              </div>

                              <div className="mt-6 flex items-center justify-between pt-6 border-t border-slate-100">
                                 <button onClick={() => openGallery(m)} className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-3 hover:text-blue-600 transition-all group/gal">
                                    <div className="p-2.5 rounded-xl bg-slate-50 group-hover/gal:bg-blue-50 transition-all"><Camera className="w-4 h-4 text-blue-500" /></div>
                                    Archive
                                 </button>
                                 <button onClick={() => {setSelectedMonument(m); handleBookingStart();}} className="py-3.5 px-6 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-blue-600/10">
                                    Access Pass -$15
                                 </button>
                              </div>
                          </div>
                       ))}
                    </div>
                  </div>

                  {/* Right Column: Scan Matrix (Spans 4/12) */}
                  <div className="col-span-12 xl:col-span-4 flex flex-col gap-8">
                    <div className="p-8 border border-slate-200 bg-white shadow-2xl rounded-[2rem] flex flex-col h-full max-h-[900px]">
                       <h3 className="font-black text-[11px] text-slate-800 uppercase tracking-[0.4em] mb-8 pb-4 border-b border-slate-100 flex items-center gap-4">
                          <ScanSearch className="w-5 h-5 text-blue-600" /> Scan Matrix
                       </h3>

                       {/* VR Heritage Matrix Entry (Item 16) */}
                       <div className="mb-6 p-6 rounded-3xl bg-linear-to-br from-indigo-600 to-violet-700 shadow-xl shadow-indigo-500/30 group cursor-pointer hover:scale-[1.02] transition-all relative overflow-hidden">
                          <div className="absolute -top-6 -right-6 opacity-20 group-hover:scale-125 transition-transform duration-[5s]">
                             <Sparkles className="w-24 h-24 text-white" />
                          </div>
                          <div className="relative z-10 flex flex-col gap-4">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                                   <Globe className="w-5 h-5 text-white" />
                                </div>
                                <span className="px-3 py-1 bg-white/15 rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/10">Active Simulation</span>
                             </div>
                             <div>
                                <h4 className="text-xl font-black text-white uppercase italic tracking-tighter leading-tight">Launch VR Matrix</h4>
                                <p className="text-[9px] text-indigo-100 font-bold uppercase tracking-widest mt-1">Immersive 3D Heritage Tours</p>
                             </div>
                             <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/10">
                                <span className="text-[10px] font-black text-white/70 uppercase tracking-widest flex items-center gap-2">
                                   <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Live Now
                                </span>
                                <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform" />
                             </div>
                          </div>
                       </div>

                       <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide space-y-3">
                           {MONUMENTS.map((m, idx) => (
                               <button 
                                 key={m.id} 
                                 onClick={() => {setSelectedMonument(m); setShowSpidercam(true);}} 
                                 className="w-full text-left p-4 rounded-2xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all flex justify-between items-center group/item animate-slide-right"
                                 style={{ animationDelay: `${idx * 100}ms` }}
                               >
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-cover bg-center border border-slate-200 group-hover/item:scale-110 transition-transform shadow-sm" style={{backgroundImage: `url('${m.image}')`}} />
                                    <div>
                                       <p className="text-slate-900 font-black text-xs tracking-tight uppercase mb-0.5">{m.name}</p>
                                       <div className="flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                          <p className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em]">Sync Active</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover/item:bg-blue-600 group-hover/item:text-white transition-all">
                                    <ChevronRight className="w-5 h-5" />
                                 </div>
                              </button>
                           ))}
                       </div>
                    </div>
                    
                    <div className="p-8 bg-slate-900 rounded-[2rem] shadow-2xl relative overflow-hidden group cursor-pointer mt-auto border border-white/5">
                        <div className="relative z-10">
                           <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-6">
                              <ShieldCheck className="w-7 h-7 text-blue-500" />
                           </div>
                           <h4 className="text-white font-black uppercase tracking-[0.2em] text-[13px] mb-2">Heritage Guardian Pro</h4>
                           <p className="text-slate-400 text-[10px] leading-relaxed font-bold uppercase tracking-widest opacity-80 mb-6">Upgrade to Elite Access for 8K drone synchronization.</p>
                           <button className="w-full py-3 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 hover:text-white transition-all">Enable Link</button>
                        </div>
                        <div className="absolute top-0 right-0 p-4">
                           <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        </div>
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]" />
                    </div>
                  </div>
                </div>

                {/* Peer Feedback Section */}
                <div className="mt-32 pt-20 border-t border-slate-200 pb-32">
                   <header className="mb-12">
                      <h2 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center gap-6">
                        <Globe className="w-12 h-12 lg:w-20 lg:h-20 text-blue-500" /> Peer Network
                      </h2>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mt-4 ml-2">Verification from Global Heritage Nodes</p>
                   </header>
                   <div className="grid grid-cols-12 gap-8">
                      {[
                        { name: "Priyanshu Mohanty", role: "Lead Dev @ Heritage-X", platform: "linkedin", text: "The alignment of the Konark Voxel scan is now perfect. The responsiveness is exactly what we needed for the government nodes.", date: "LinkedIn · 1h ago" },
                        { name: "Anita Rao", role: "UNESCO Observer", platform: "twitter", text: "Real-time humidity tracking at Ajanta is a lifesaver. Heritage-X is the future of conservation.", date: "Twitter · 4h ago" },
                        { name: "Traveler101", role: "Premium Member", platform: "instagram", text: "Booking was seamless. The high-res hero images make the decision so much easier!", date: "Instagram · 12h ago" }
                      ].map((feedback, i) => (
                        <div key={i} className="col-span-12 lg:col-span-4 p-8 rounded-[2rem] bg-white border border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col h-full">
                           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-all scale-150 group-hover:scale-100">
                              {feedback.platform === "linkedin" ? <Instagram className="w-8 h-8 text-blue-500" /> : feedback.platform === "twitter" ? <Twitter className="w-8 h-8 text-blue-400" /> : <Instagram className="w-8 h-8 text-pink-500" />}
                           </div>
                           <div className="flex items-center gap-5 mb-8">
                              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 shadow-inner group-hover:bg-blue-50 transition-colors">
                                 <User className="w-8 h-8 text-slate-400 group-hover:text-blue-500" />
                              </div>
                              <div>
                                 <h4 className="text-base font-black text-slate-900 uppercase tracking-tight">{feedback.name}</h4>
                                 <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{feedback.role}</p>
                              </div>
                           </div>
                           <p className="text-slate-600 text-base leading-relaxed mb-8 font-medium italic grow">"{feedback.text}"</p>
                           <div className="flex items-center justify-between pt-6 border-t border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                              <span>{feedback.date}</span>
                              <div className="flex gap-1">
                                 {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          )}
        </div>

        {/* --- PHOTO MATRIX MODAL --- */}
        {showGallery && (
           <div className="fixed inset-0 z-500 flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-3xl animate-in fade-in duration-500 overflow-y-auto">
              <div className="w-full max-w-[1600px] h-full flex flex-col gap-12 py-10">
                 <div className="flex items-center justify-between border-b pb-12" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    <div>
                       <h2 className="text-5xl lg:text-8xl font-black tracking-tighter uppercase line-clamp-1 italic text-white">{activeGalleryName}</h2>
                       <div className="flex items-center gap-4 mt-4">
                          <p className="px-5 py-2 bg-blue-600 text-white text-[10px] font-black tracking-[0.4em] rounded-2xl">VOXEL SCAN MATRIX</p>
                          <p className="text-blue-400 text-[10px] font-black tracking-[0.2em] font-mono uppercase opacity-60">Status: Deep-Sync Active</p>
                       </div>
                    </div>
                    <button onClick={() => setShowGallery(false)} className="p-6 rounded-full border border-white/10 bg-white/5 text-white transition-all hover:scale-110 active:scale-95 shadow-2xl hover:bg-white/10">
                       <X className="w-10 h-10" />
                    </button>
                 </div>

                 <div className="grid grid-cols-12 gap-8 flex-1">
                     {galleryImages.map((img, idx) => (
                       <div key={idx} className="col-span-12 md:col-span-6 lg:col-span-3 aspect-square rounded-[2rem] overflow-hidden border border-white/10 relative shadow-2xl group/img animate-in zoom-in duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                          <img 
                            src={img} 
                            className="w-full h-full object-cover transition-transform duration-[10s] group-hover/img:scale-110" 
                            alt="Scan Matrix" 
                            onError={(e) => {
                               (e.target as HTMLImageElement).src = "/assets/KONARK/download (1).jpg";
                            }}
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                          <div className="absolute inset-0 p-8 flex flex-col justify-end">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] font-mono text-white">Channel: 0{idx + 1}</p>
                             </div>
                             <h4 className="font-black text-sm uppercase tracking-widest text-white translate-y-4 opacity-0 group-hover/img:translate-y-0 group-hover/img:opacity-100 transition-all duration-500">
                                Delta: {activeFacts[idx % activeFacts.length] || "Structural Node"}
                             </h4>
                          </div>
                          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-1000">
                             <div className="absolute top-0 left-0 right-0 h-[2px] bg-blue-400 shadow-[0_0_20px_#3b82f6] animate-scanline" />
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="pt-12 text-center pb-12">
                    <button onClick={() => setShowGallery(false)} className="px-20 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.6em] rounded-[2rem] hover:bg-blue-600 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95"> Disconnect Link </button>
                 </div>
              </div>
           </div>
        )}

        {showDetailCard && activeDetail && (
           <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-12 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-500 overflow-y-auto">
              <div className="w-full max-w-6xl space-y-10 py-10 scale-in-center">
                  
                  {/* Modal Navigation */}
                  <div className="flex gap-4 p-2 bg-white/5 rounded-3xl border border-white/10 w-fit mx-auto backdrop-blur-xl">
                    <button onClick={() => setDetailTab("info")} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${detailTab === 'info' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>Intelligence</button>
                    <button onClick={() => setDetailTab("food")} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${detailTab === 'food' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>Local Food</button>
                    <button onClick={() => setDetailTab("guides")} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${detailTab === 'guides' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>Verified Guides</button>
                    <button onClick={() => setDetailTab("itinerary")} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${detailTab === 'itinerary' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>SmartTour</button>
                  </div>

                  {detailTab === 'info' && (
                    <div className="relative rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl min-h-[600px] flex flex-col justify-end">
                       {/* Hero Image Background */}
                       <div className="absolute inset-0">
                          <img 
                            src={activeDetail?.image || ""} 
                            className="w-full h-full object-cover shadow-2xl" 
                            alt={activeDetail?.name || "Heritage detail"} 
                            onError={(e) => {
                               (e.target as HTMLImageElement).src = "/assets/KONARK/konark_hero.png";
                            }}
                          />
                          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-[#050810] via-[#050810]/80 to-transparent" />
                          <div className="absolute inset-0 bg-[#050810]/40" />
                       </div>

                       {/* Content Overlay */}
                       <div className="relative z-10 p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                          <div className="space-y-6">
                             <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-heritage-indigo/40 backdrop-blur-xl rounded-full border border-heritage-indigo/50 mb-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-heritage-cyan animate-pulse shadow-[0_0_10px_#06b6d4]" />
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Protocol Delta Verified</span>
                             </div>
                             <h2 className="text-6xl lg:text-8xl font-black text-white tracking-tighter uppercase italic leading-none">{activeDetail?.name}</h2>
                             <p className="text-gray-200 text-lg lg:text-xl font-medium leading-relaxed italic opacity-90 select-none max-w-lg">
                                "{activeDetail?.desc}"
                             </p>
                             <div className="flex flex-wrap gap-4 pt-6">
                                <button onClick={() => {setSelectedMonument(activeDetail); setShowSpidercam(true); setShowDetailCard(false);}} className="flex items-center gap-4 bg-white text-black hover:bg-heritage-cyan hover:text-white px-10 py-5 rounded-2xl font-black tracking-widest text-[11px] uppercase transition-all shadow-2xl hover:scale-105">
                                   <Navigation2 className="w-5 h-5" /> Deploy Spidercam
                                </button>
                                <button onClick={() => {openGallery(activeDetail); setShowDetailCard(false);}} className="flex items-center gap-4 bg-[#131b2f]/80 backdrop-blur-2xl border border-white/10 text-white px-10 py-5 rounded-2xl font-black tracking-widest text-[11px] uppercase hover:border-heritage-indigo transition-all">
                                   <Camera className="w-5 h-5 text-heritage-indigo" /> View Matrix
                                </button>
                             </div>
                          </div>

                          <div className="space-y-8 bg-black/60 backdrop-blur-3xl p-10 rounded-[2rem] border border-white/10 shadow-2xl">
                             <div className="flex justify-between items-center mb-4">
                                <h4 className="text-heritage-cyan text-[11px] font-black uppercase tracking-[0.5em] font-mono">Tactical Intelligence</h4>
                                <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-[8px] font-black uppercase">Active</div>
                             </div>
                             <div className="space-y-5">
                                {activeDetail?.facts?.map((fact: string, idx: number) => (
                                   <div key={idx} className="flex items-start gap-5 group hover:translate-x-2 transition-transform cursor-pointer">
                                      <div className="w-1.5 h-1.5 mt-2 rounded-full bg-heritage-gold shrink-0 group-hover:scale-150 transition-all shadow-[0_0_10px_#eab308]" />
                                      <p className="text-xs lg:text-sm font-bold text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">{fact}</p>
                                   </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>
                  )}

                  {detailTab === 'food' && (
                    <div className="p-10 rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-300" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                       <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2" style={{ color: "var(--text-strong)" }}>Local Cullinary Matrix</h3>
                       <p className="text-heritage-cyan text-[10px] font-black uppercase tracking-[0.5em] mb-10 font-mono">Top Rated Food Near {activeDetail?.name}</p>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {activeDetail?.foodIntel?.map((f: any, i: number) => (
                             <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 group hover:border-orange-500/40 transition-all">
                                <Utensils className="w-8 h-8 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl font-black text-white uppercase italic mb-2">{f.item}</h4>
                                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{f.spot}</p>
                                   <p className="text-lg font-black text-orange-400">{f.price}</p>
                                </div>
                             </div>
                          ))}
                          <div className="p-8 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity">
                             <Utensils className="w-6 h-6 text-gray-600 mb-2" />
                             <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-tight">More Recommendations in<br/>Indian Compass Chatbot</p>
                          </div>
                       </div>
                    </div>

                  )}

                  {detailTab === 'guides' && (
                    <div className="p-10 rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-300" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                      <div className="flex justify-between items-center mb-10">
                        <div>
                          <h3 className="text-3xl font-black italic uppercase tracking-tighter" style={{ color: "var(--text-strong)" }}>Multilingual Heritage Guides</h3>
                          <p className="text-heritage-cyan text-[10px] font-black uppercase tracking-[0.5em] mt-2 font-mono">Verified Operators Around {activeDetail?.name}</p>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                          <Languages className="w-6 h-6 text-heritage-cyan" />
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Translation Support</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                        {GUIDES.map(guide => (
                          <div key={guide.id} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-heritage-cyan transition-all group relative overflow-hidden">
                            <div className="flex items-center gap-5 mb-6">
                              <img src={guide.img} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 group-hover:border-heritage-cyan transition-colors" alt={guide.name} />
                              <div>
                                <h4 className="text-lg font-black text-white uppercase italic">{guide.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Star className="w-3.5 h-3.5 text-heritage-gold fill-heritage-gold shadow-lg" />
                                  <span className="text-xs font-bold text-gray-300">{guide.rating}</span>
                                  <span className="text-[10px] text-gray-500 uppercase tracking-widest ml-2 px-2 py-0.5 bg-white/5 rounded">{guide.exp} Exp</span>
                                </div>
                                <div className="mt-2 text-heritage-cyan text-[9px] font-black uppercase tracking-widest">{guide.social}</div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed italic mb-6 line-clamp-2">"{guide.bio}"</p>
                            <div className="space-y-4 pt-4 border-t border-white/5">
                              <div className="flex flex-wrap gap-2">
                                {guide.languages.map(lang => (
                                  <span key={lang} className="text-[9px] font-black text-heritage-indigo bg-heritage-indigo/10 px-2.5 py-1 rounded-full uppercase tracking-widest">{lang}</span>
                                ))}
                              </div>
                              <div className="flex gap-3 pt-2">
                                <button 
                                  onClick={() => { setSelectedGuide(guide); setShowGuideBooking(true); }}
                                  className="flex-1 bg-white text-black hover:bg-heritage-cyan hover:text-white px-4 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl"
                                >
                                  Book Pulse
                                </button>
                                <a href={`tel:${guide.contact}`} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                                  <Phone className="w-4 h-4 text-white" />
                                </a>
                              </div>
                            </div>
                            {guide.verified && (
                              <div className="absolute top-4 right-4 p-2 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {showGuideBooking && selectedGuide && (
                        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
                          <div className="bg-[#131b2f] border border-white/10 rounded-[2rem] p-10 max-w-md w-full shadow-2xl relative">
                            <button onClick={() => setShowGuideBooking(false)} className="absolute top-6 right-6 p-2 bg-white/5 rounded-full text-gray-400 hover:text-white transition-transform hover:rotate-90">
                              <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-4 mb-8">
                               <img src={selectedGuide.img} className="w-14 h-14 rounded-2xl object-cover" />
                               <div>
                                  <h3 className="text-xl font-black text-white uppercase italic">Deploy Guide</h3>
                                  <p className="text-[10px] text-heritage-cyan font-black uppercase tracking-widest">Protocol: {selectedGuide.name}</p>
                               </div>
                            </div>
                            <div className="space-y-6">
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                     <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Date</label>
                                     <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-heritage-cyan transition-all" />
                                  </div>
                                  <div className="space-y-2">
                                     <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Time</label>
                                     <input type="time" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-heritage-cyan transition-all" />
                                  </div>
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Duration (Days)</label>
                                  <div className="flex items-center gap-4">
                                     {[1, 2, 3, 5].map(d => (
                                        <button key={d} onClick={() => setBookingDetails({...bookingDetails, days: d})} className={`flex-1 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${bookingDetails.days === d ? 'bg-heritage-cyan border-heritage-cyan text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`}>
                                           {d}d
                                        </button>
                                     ))}
                                  </div>
                               </div>
                              <button onClick={() => { setBookingStep("location"); setShowGuideBooking(false); }} className="w-full py-5 bg-white text-black font-black rounded-2xl uppercase text-[11px] tracking-[0.3em] hover:bg-heritage-cyan hover:text-white shadow-2xl transition-all">
                                  Synchronize Deployment
                               </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {detailTab === 'itinerary' && (
                    <div className="p-10 rounded-[2rem] shadow-2xl animate-in fade-in duration-500" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                        <div>
                          <h3 className="text-4xl font-black italic uppercase tracking-tighter flex items-center gap-4" style={{ color: "var(--text-strong)" }}>
                            <Compass className="w-8 h-8 text-heritage-cyan" /> SmartTour Itineraries
                          </h3>
                          <p className="text-xs font-bold uppercase tracking-widest mt-3" style={{ color: "var(--text-muted)" }}>Personalized plans for {activeDetail?.name}</p>
                        </div>
                        <div className="flex gap-4 p-2 bg-white/5 rounded-2xl border border-white/5">
                           <div className="text-center px-6 py-2">
                              <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Total Distance</p>
                              <p className="text-lg font-black text-white">4.2 KM</p>
                           </div>
                           <div className="w-px bg-white/10" />
                           <div className="text-center px-6 py-2">
                              <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Optimal Time</p>
                              <p className="text-lg font-black text-white">6.5 HRS</p>
                           </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Budget Mode */}
                        <div className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 space-y-8 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-8 w-24 h-24 bg-emerald-500/10 blur-3xl rounded-full" />
                           <div className="flex items-center gap-4 mb-2">
                              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                 <Smartphone className="w-6 h-6 text-emerald-400" />
                              </div>
                              <h4 className="text-xl font-black text-white uppercase italic">Solo Adventurer <span className="text-emerald-400 opacity-50 ml-2">(Budget)</span></h4>
                           </div>
                           <div className="space-y-6 relative z-10">
                              {ITINERARIES.budget.map((item, idx) => (
                                <div key={idx} className="flex gap-6 items-start group/step">
                                  <div className="flex flex-col items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                                    {idx !== ITINERARIES.budget.length - 1 && <div className="w-0.5 h-16 bg-white/5" />}
                                  </div>
                                  <div className="flex-1 pb-8 group-last/step:pb-0">
                                    <p className="text-[10px] text-emerald-400 font-black font-mono tracking-widest mb-1">{item.time}</p>
                                    <p className="text-sm font-bold text-white uppercase mb-2 group-hover/step:text-emerald-400 transition-colors">{item.task}</p>
                                    <span className="text-[9px] font-black text-gray-500 bg-black/40 px-2 py-1 rounded ring-1 ring-white/5 uppercase">{item.cost}</span>
                                  </div>
                                </div>
                              ))}
                           </div>
                        </div>

                        {/* Luxury Mode */}
                        <div className="p-8 rounded-[2rem] bg-heritage-indigo/5 border border-heritage-indigo/10 space-y-8 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-8 w-24 h-24 bg-heritage-indigo/10 blur-3xl rounded-full" />
                           <div className="flex items-center gap-4 mb-2">
                              <div className="w-12 h-12 rounded-2xl bg-heritage-indigo/20 flex items-center justify-center border border-heritage-indigo/30">
                                 <Star className="w-6 h-6 text-heritage-indigo" />
                              </div>
                              <h4 className="text-xl font-black text-white uppercase italic">Executive Pulse <span className="text-heritage-indigo opacity-50 ml-2">(Luxury)</span></h4>
                           </div>
                           <div className="space-y-6 relative z-10">
                              {ITINERARIES.luxury.map((item, idx) => (
                                <div key={idx} className="flex gap-6 items-start group/step">
                                  <div className="flex flex-col items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-heritage-indigo shadow-[0_0_10px_#6366f1]" />
                                    {idx !== ITINERARIES.luxury.length - 1 && <div className="w-0.5 h-16 bg-white/5" />}
                                  </div>
                                  <div className="flex-1 pb-8 group-last/step:pb-0">
                                    <p className="text-[10px] text-heritage-indigo font-black font-mono tracking-widest mb-1">{item.time}</p>
                                    <p className="text-sm font-bold text-white uppercase mb-2 group-hover/step:text-heritage-indigo transition-colors">{item.task}</p>
                                    <span className="text-[9px] font-black text-gray-500 bg-black/40 px-2 py-1 rounded ring-1 ring-white/5 uppercase">{item.cost}</span>
                                  </div>
                                </div>
                              ))}
                           </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-6 text-center pb-12 px-4">
                     <button onClick={() => setShowDetailCard(false)} className="px-20 py-6 bg-white text-black font-black uppercase text-sm tracking-[0.5em] rounded-[2rem] hover:bg-red-500 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95"> Close Uplink </button>
                  </div>
              </div>
           </div>
        )}

        {/* Floating Language Translator - Stacked above Chatbot */}
        <div className="fixed bottom-36 right-8 z-100 group flex flex-col items-center gap-3">
          <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-heritage-cyan font-black uppercase tracking-widest bg-black/60 px-2 py-1 rounded">Translate</p>
          {showTranslator ? (
            <div className="bg-[#131b2f]/95 backdrop-blur-3xl border border-heritage-cyan/30 rounded-3xl p-6 shadow-2xl w-80 animate-in slide-in-from-bottom-8 duration-500">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] font-black text-heritage-cyan uppercase tracking-widest">Heritage Translator v1.0</h4>
                <button onClick={() => setShowTranslator(false)} className="text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Source: Auto (English)</p>
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs text-gray-300 italic uppercase">"Welcome to the Sun Temple of Konark."</div>
                </div>
                <div className="space-y-2">
                  <select 
                    value={targetLang} 
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full bg-[#050810] border border-white/10 rounded-xl px-3 py-2 text-[10px] font-black text-white uppercase outline-none focus:border-heritage-cyan"
                  >
                    <option>Hindi</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Japanese</option>
                    <option>Spanish</option>
                  </select>
                  <div className="p-3 bg-heritage-cyan/5 rounded-xl border border-heritage-cyan/20 text-xs text-heritage-cyan font-bold italic">
                    {targetLang === 'Hindi' ? '"कोणार्क के सूर्य मंदिर में आपका स्वागत है।"' : 
                     targetLang === 'French' ? '"Bienvenue au Temple du Soleil de Konark."' : 
                     '"[Generating neural translation...]"'}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowTranslator(true)}
              className="w-16 h-16 rounded-full bg-heritage-cyan border-4 border-white/10 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all group overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-heritage-indigo to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Languages className="w-7 h-7 text-white relative z-10" />
            </button>
          )}
        </div>


        {/* --- BOOKING MULTI-STEP MODAL --- */}
        {bookingStep !== "idle" && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/80 animate-in fade-in duration-500">
             <div className="w-full max-w-lg rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 relative" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                {/* Background Image Sub-Layer */}
                <div className="absolute inset-0 z-0 opacity-10 grayscale hover:grayscale-0 transition-all duration-1000">
                   <img src={selectedMonument?.image} className="w-full h-full object-cover" />
                </div>
                
                {/* Modal Header */}
                <div className="p-8 border-b border-heritage-surface flex items-center justify-between bg-heritage-indigo/10 relative overflow-hidden">
                   <div className="absolute -top-10 -right-10 w-32 h-32 bg-heritage-cyan/10 rounded-full blur-3xl" />
                   <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-heritage-indigo/20 border border-heritage-indigo/40 flex items-center justify-center shadow-lg">
                         <ShieldCheck className="w-6 h-6 text-heritage-cyan" />
                      </div>
                      <div>
                         <h3 className="text-base font-black text-white uppercase tracking-widest">Surveillance Access</h3>
                         <p className="text-[10px] text-heritage-cyan font-black font-mono tracking-widest mt-1">PROTOCOL: {bookingStep.toUpperCase()}</p>
                      </div>
                   </div>
                   <button onClick={() => setBookingStep("idle")} className="p-3 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-all relative z-10 border border-transparent hover:border-white/10">
                      <X className="w-6 h-6" />
                   </button>
                </div>

                <div className="p-10 flex-1">
                    {bookingStep === "location" && (
                      <div className="space-y-8 animate-in slide-in-from-right-8 duration-600">
                         <div className="text-center">
                            <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-8">Temporal Reservation</h4>
                         </div>
                         
                         <div className="space-y-6">
                            <div className="space-y-3">
                               <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest pl-2">Select Target Date</p>
                               <input 
                                  type="date" 
                                  onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                                  className="w-full bg-[#1e293b]/60 border border-white/10 rounded-2xl py-5 px-6 text-xs text-white outline-none focus:border-blue-500 transition-all" 
                               />
                            </div>

                            <div className="space-y-3">
                               <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest pl-2">Available Time Slots & Site Density</p>
                               <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
                                  {TIME_SLOTS.map((slot) => (
                                     <button 
                                       key={slot.time}
                                       onClick={() => setBookingDetails({...bookingDetails, time: slot.time})}
                                       className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${bookingDetails.time === slot.time ? 'bg-blue-600 border-blue-400 text-white shadow-xl scale-[1.02]' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                                     >
                                        <div className="text-left">
                                           <p className="text-[10px] font-black uppercase tracking-tight">{slot.time}</p>
                                           <div className="flex items-center gap-2 mt-1">
                                              <div className={`w-1.5 h-1.5 rounded-full ${slot.left < 50 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                                              <p className="text-[8px] font-bold uppercase tracking-widest opacity-60">{slot.left} / {slot.limit} Slots Remaining</p>
                                           </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4" />
                                     </button>
                                  ))}
                               </div>
                            </div>

                            <button onClick={() => setBookingStep("payment")} className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-3xl shadow-2xl transition-all mt-4">
                               Synchronize Node Access
                            </button>
                         </div>
                      </div>
                   )}

                   {bookingStep === "payment" && (
                      <div className="space-y-10 animate-in slide-in-from-right-8 duration-600">
                         <div>
                            <h4 className="text-2xl font-black text-white uppercase tracking-tighter text-center mb-10">Currency Linkage</h4>
                            <div className="grid grid-cols-1 gap-5">
                               {[
                                  { id: "upi", label: "Unified Interface (UPI)", icon: <Smartphone className="w-6 h-6" />, color: "text-blue-400", desc: "Scan to pay instantly" },
                                  { id: "card", label: "Card Matrix Terminal", icon: <CreditCard className="w-6 h-6" />, color: "text-purple-400", desc: "Secure POS processing" },
                                  { id: "crypto", label: "Heritage Ledger", icon: <QrCode className="w-6 h-6" />, color: "text-heritage-gold", desc: "Zero-fee blockchain" }
                               ].map((method) => (
                                  <button 
                                     key={method.id}
                                     onClick={() => { setPaymentMethod(method.id); setBookingStep("scanner"); }}
                                     className="flex items-center justify-between p-6 rounded-[2rem] bg-[#1e293b]/60 border border-heritage-surface hover:border-heritage-cyan hover:bg-[#1e293b] group transition-all shadow-lg active:scale-[0.98]"
                                  >
                                     <div className="flex items-center gap-5">
                                        <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${method.color} shadow-md`}>{method.icon}</div>
                                        <div className="text-left">
                                           <span className="text-sm font-black text-white uppercase tracking-tighter group-hover:text-heritage-cyan transition-colors">{method.label}</span>
                                           <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{method.desc}</p>
                                        </div>
                                     </div>
                                     <div className="w-6 h-6 rounded-full border-2 border-heritage-surface group-hover:border-heritage-cyan flex items-center justify-center transition-all p-1">
                                        <div className="w-full h-full rounded-full bg-heritage-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                                     </div>
                                  </button>
                               ))}
                            </div>
                         </div>
                      </div>
                   )}

                   {bookingStep === "scanner" && (
                      <div className="space-y-12 text-center animate-in zoom-in-95 duration-700">
                         {bookingStatus === "success" ? (
                            <div className="py-12 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
                               <div className="w-32 h-32 rounded-full bg-green-500/10 border-4 border-green-500/50 flex items-center justify-center mb-8 relative">
                                  <ShieldCheck className="w-16 h-16 text-green-500 shadow-2xl" />
                                  <div className="absolute inset-0 rounded-full border border-green-500 animate-ping opacity-20" />
                               </div>
                               <h4 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 italic">200 OK SUCCESS</h4>
                               <p className="text-xs text-green-400 font-black uppercase tracking-[0.4em] mb-10">Sync Status: Connected / pass injected</p>
                               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                  <div className="w-full h-full bg-green-500 animate-[progress_4s_linear]" />
                               </div>
                            </div>
                         ) : (
                            <>
                               <div className="relative inline-block">
                                   <div className="relative p-7 bg-white rounded-[4rem] shadow-[0_0_80px_rgba(255,255,255,0.15)] group overflow-hidden border border-white/20">
                                     <div className="w-64 h-64 bg-white p-1 rounded-[2rem] relative overflow-hidden flex items-center justify-center">
                                       <img 
                                         src="/scanner.jpg" 
                                         className="w-full h-full object-cover rounded-[2rem]" 
                                         alt="Auth QR" 
                                       />
                                        <div className="absolute inset-0 bg-linear-to-t from-heritage-indigo/30 via-transparent to-heritage-cyan/30 pointer-events-none mix-blend-overlay" />
                                        <div className="absolute inset-x-0 h-[3px] bg-heritage-cyan shadow-[0_0_20px_#06b6d4] animate-scanline z-30" />
                                     </div>
                                     <div className="absolute top-0 left-0 w-16 h-16 border-t-[10px] border-l-[10px] border-heritage-indigo rounded-tl-[4rem]" />
                                     <div className="absolute top-0 right-0 w-16 h-16 border-t-[10px] border-r-[10px] border-heritage-indigo rounded-tr-[4rem]" />
                                     <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[10px] border-l-[10px] border-heritage-indigo rounded-bl-[4rem]" />
                                     <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[10px] border-r-[10px] border-heritage-indigo rounded-br-[4rem]" />
                                  </div>
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] pointer-events-none border border-heritage-cyan/10 rounded-full animate-[spin_12s_linear_infinite] border-dashed" />
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] pointer-events-none border border-heritage-cyan/20 rounded-full animate-[spin_18s_linear_infinite_reverse] border-dotted" />
                               </div>
                               
                               <div>
                                  <div className="flex items-center justify-center gap-2 mb-3">
                                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                                     <span className="text-[9px] font-black text-green-500 uppercase tracking-[0.4em] font-mono">Status: 200 OK Initialized</span>
                                  </div>
                                  <h4 className="text-2xl font-black text-white uppercase mb-3 tracking-tighter">Terminal Scan Active</h4>
                                  <p className="text-[10px] text-gray-500 mb-8 font-black tracking-widest uppercase opacity-80 leading-relaxed max-w-[280px] mx-auto">Encryption Verified. Use any authorized terminal to authenticate currency transfer.</p>
                                  <button 
                                     onClick={finalizeBooking} 
                                     disabled={isProcessing}
                                     className="w-full py-6 bg-[#6366f1] hover:bg-[#4f46e5] hover:shadow-[#6366f1]/40 text-white text-xs font-black uppercase tracking-[0.4em] rounded-[2rem] shadow-[0_15px_45px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-4 disabled:opacity-50 group overflow-hidden"
                                  >
                                     {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                                     {isProcessing ? "Validating Ledger..." : "Authorize Payment Matrix"}
                                  </button>
                               </div>
                            </>
                         )}
                      </div>
                   )}
                </div>

                {/* Secure footer */}
                <div className="p-6 bg-[#131b2f]/60 backdrop-blur-md border-t border-heritage-surface flex items-center justify-center gap-10">
                   <div className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                        <Shield className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest group-hover:text-gray-300">SSL v3 Activated</span>
                   </div>
                   <div className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-full bg-heritage-indigo/10 border border-heritage-indigo/20 flex items-center justify-center group-hover:bg-heritage-indigo/20 transition-all">
                        <Smartphone className="w-3.5 h-3.5 text-heritage-indigo" />
                      </div>
                      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest group-hover:text-gray-300">Multi-Node Secure</span>
                   </div>
                </div>
             </div>
          </div>
        )}

             </div>
          )}

        </div>
        <Footer />
      </div>

      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-30px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(220px); opacity: 0; }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-scanline {
          animation: scanline 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
