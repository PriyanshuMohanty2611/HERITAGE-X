import { Monument } from "./types";

export const TIME_SLOTS: { time: string; limit: number; left: number }[] = [
  { time: "06:00 AM - 08:00 AM", limit: 450, left: 120 },
  { time: "09:00 AM - 11:00 AM", limit: 600, left: 45 },
  { time: "12:00 PM - 02:00 PM", limit: 600, left: 210 },
  { time: "03:00 PM - 05:00 PM", limit: 600, left: 15 },
  { time: "06:00 PM - 08:00 PM", limit: 300, left: 88 }
];

export const GUIDES = [
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

export const ITINERARIES = {
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

export const MONUMENTS: Monument[] = [
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
    image: "/assets/Taj Mahal/Taj_Mahal.png", 
    gallery: [
      "/assets/Taj Mahal/Taj_Mahal.png",
      "/assets/Taj Mahal/Taj_Mahal.png",
      "/assets/Taj Mahal/Taj_Mahal.png",
      "/assets/Taj Mahal/Taj_Mahal.png",
      "/assets/Taj Mahal/Taj_Mahal.png"
    ],
    desc: "Ivory-white marble mausoleum on the south bank of the Yamuna river.", 
    facts: ["Built by Shah Jahan", "Symbol of eternal love", "Persian and Mughal architecture", "Optical illusions in design", "Changing colors with daylight"],
    videoId: "49HToQHBycI",
    architecture: "Mughal Architecture",
    history: "Commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.",
    bestTime: "Full moon night (rare) or early morning sunrise.",
    foodIntel: [
      { item: "Agra Petha", price: "₹150", spot: "Panchi Petha" },
      { item: "Mughlai Korma", price: "₹500", spot: "Joney's Place" }
    ],
    feedback: "@UNESCO: 'A jewel of Muslim art in India and one of the universally admired masterpieces.'"
  },
  { 
    id: 3, 
    name: "Hampi Ruins", 
    query: "Hampi+Ruins+Karnataka+India", 
    coords: [15.3350, 76.4600],
    zoom: 18, 
    image: "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg", 
    gallery: [
      "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg",
      "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg",
      "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg",
      "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg",
      "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg"
    ],
    desc: "The capital of the Vijayanagara Empire, featuring stunning boulder-strewn landscapes and ancient temples.", 
    facts: ["Musical stone pillars", "Vittala Temple stone chariot", "Underground Shiva temple", "Virupaksha's inverted shadow", "World's largest open-air museum"],
    videoId: "vXm80E1O0T8",
    architecture: "Vijayanagara Architecture",
    history: "Prosperous capital until 1565. Famous for the Virupaksha Temple and Vitthala Temple complex.",
    bestTime: "November (Hampi Utsav)",
    foodIntel: [
      { item: "South Indian Thali", price: "₹200", spot: "Mango Tree Restaurant" }
    ],
    feedback: "@NatGeo: 'The landscape of Hampi is otherworldly, blending nature and ruins perfectly.'"
  },
  { 
    id: 4, 
    name: "Ajanta Caves", 
    query: "Ajanta+Caves+Maharashtra+India", 
    coords: [20.5519, 75.7507],
    zoom: 18, 
    image: "/assets/Ajanta Caves/ajanta_cave.png", 
    gallery: [
      "/assets/Ajanta Caves/ajanta_cave.png",
      "/assets/Ajanta Caves/ajanta_cave.png"
    ],
    desc: "Rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE.", 
    facts: ["Jataka tale murals", "Mastery of natural pigments", "Hidden for centuries", "Panoramic river horseshoe view", "Stunning rock-cut sculptures"],
    videoId: "3-pL1qfS0Lw",
    architecture: "Buddhist Rock-cut Architecture",
    history: "Discovered by a British officer in 1819 while tiger hunting.",
    bestTime: "Monsoon (August-September) for lush greenery.",
    foodIntel: [
      { item: "Maharashtrian Puran Poli", price: "₹80", spot: "MTDC Resort" }
    ],
    feedback: "@Historian_X: 'The frescoes at Ajanta remain the pinnacle of Indian classical art.'"
  },
  { 
    id: 5, 
    name: "Qutub Minar", 
    query: "Qutub+Minar+Delhi+India", 
    coords: [28.5244, 77.1855],
    zoom: 18, 
    image: "/assets/Qutub Minar/qutub_minar.png", 
    gallery: [
      "/assets/Qutub Minar/qutub_minar.png",
      "/assets/Qutub Minar/qutub_minar.png"
    ],
    desc: "A 73-metre tall tapering tower of five storeys, with a 14.3 metres base diameter.", 
    facts: ["Iron pillar rust-resistance", "Calligraphic inscriptions", "Indo-Islamic architecture", "Highest brick minaret", "Quwwat-ul-Islam mosque site"],
    videoId: "3-pL1qfS0Lw",
    architecture: "Indo-Islamic (Afghan style)",
    history: "Construction started by Qutb-ud-din Aibak in 1192 CE.",
    bestTime: "Evening for the light illumination.",
    foodIntel: [
      { item: "Dilli ki Chaat", price: "₹60", spot: "Nearby Kiosks" }
    ],
    feedback: "@ArcheologyToday: 'The iron pillar's metallurgical secrets still baffle scientists.'"
  },
  { 
    id: 6, 
    name: "Ellora Caves", 
    query: "Ellora+Caves+Maharashtra+India", 
    coords: [20.0258, 75.1771],
    zoom: 18, 
    image: "/assets/Ellora Caves/ellora.png", 
    gallery: [
      "/assets/Ellora Caves/ellora.png",
      "/assets/Ellora Caves/ellora.png"
    ],
    desc: "One of the largest rock-cut monastery-temple cave complexes in the world.", 
    facts: ["Kailasa temple monolith", "Multifaith coexistence", "Downward construction method", "World's largest monolithic excavation", "34 distinct cave monasteries"],
    videoId: "wVlMInscR3M",
    architecture: "Dravidian & Chalukya influence",
    history: "The Kailash Temple (Cave 16) was carved out of a single rock top-down.",
    bestTime: "November to March.",
    foodIntel: [
      { item: "Naan Khaliya", price: "₹250", spot: "Aurangabad Local" }
    ],
    feedback: "@GlobalTravel: 'No amount of photos can prepare you for the scale of Kailasa Temple.'"
  }
];
