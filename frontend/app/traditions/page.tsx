"use client";

import Image from "next/image";
import {
  MapPin,
  Sparkles,
  UtensilsCrossed,
  ScrollText,
  Shapes,
  PartyPopper,
  ArrowRight,
} from "lucide-react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { Footer } from "../../components/Footer";

type RegionHighlight = {
  id: string;
  name: string;
  stateTag: string;
  image: string;
  summary: string;
  food: string;
  traditions: string;
  crafts: string;
  festivals: string;
  attractions: string[];
  whyVisit: string[];
};

const REGIONS: RegionHighlight[] = [
  {
    id: "odisha",
    name: "Konark & Puri, Odisha",
    stateTag: "Eastern Coast",
    image: "/assets/KONARK/konark_hero.png",
    summary:
      "Sun-temple astronomy, Jagannath faith circuits, and coastal craft clusters keep Odisha’s ritual calendar alive.",
    food: "Pakhala bhata with chenna poda sweet and coastal prawn curry.",
    traditions: "Ratha Yatra chariot rituals, Odissi dance pedagogy, sand-art storytelling on Puri beach.",
    crafts: "Pattachitra scrolls, appliqué from Pipili, silver filigree (tarakasi).",
    festivals: "Ratha Yatra, Konark Dance Festival, Chandan Yatra.",
    attractions: ["Konark Sun Temple", "Puri Jagannath Temple", "Chilika Lake"],
    whyVisit: [
      "Iconic 13th-century solar-aligned stone chariot architecture.",
      "Living temple kitchen feeding thousands daily.",
      "Coastal wildlife experiences at Chilika with Irrawaddy dolphins.",
    ],
  },
  {
    id: "tamil-nadu",
    name: "Madurai & Thanjavur, Tamil Nadu",
    stateTag: "Southern Heritage",
    image: "/assets/Meenakshi Temple/meenakshi-amman-temple-india.avif",
    summary:
      "Dravidian temple cities pair sacred geometry with thriving street food, bronze casting, and Bharatanatyam lineages.",
    food: "Kothu parotta, jigarthanda, filter coffee, and Thanjavur vegetarian sappadu.",
    traditions: "Bharatanatyam arangetram circuits, temple car (ther) processions, kolam floor art.",
    crafts: "Tanjore bronze idols, veena making, kalamkari textiles from nearby Kallidaikurichi.",
    festivals: "Pongal, Chithirai Thiruvizha, Navaratri golu displays.",
    attractions: [
      "Meenakshi Amman Temple gopurams",
      "Brihadeeswarar Temple",
      "Thanjavur Palace & Art Gallery",
    ],
    whyVisit: [
      "UNESCO-listed Chola architecture with active puja traditions.",
      "Night bazaar food trail around temple prakarams.",
      "Workshops that let visitors cast miniature bronzes or try kolam art.",
    ],
  },
  {
    id: "punjab",
    name: "Amritsar, Punjab",
    stateTag: "Northwest Plains",
    image: "/assets/Harmandir Sahib/The_Golden_Temple_of_Amrithsar_7.jpg",
    summary:
      "Sikh sewa traditions, langar hospitality, and bhangra rhythms define Punjab’s vibrant cultural identity.",
    food: "Langar dal-roti, sarson ka saag with makki di roti, lassi from Hall Bazaar.",
    traditions: "Daily kirtan at Harmandir Sahib, gatka martial arts, community sewa and langar.",
    crafts: "Phulkari embroidery, jutti leatherwork, brass and lacquer bangles.",
    festivals: "Baisakhi, Gurpurab processions, Lohri bonfires.",
    attractions: [
      "Harmandir Sahib (Golden Temple)",
      "Jallianwala Bagh",
      "Gobindgarh Fort sound & light",
    ],
    whyVisit: [
      "24x7 free community kitchen serving tens of thousands daily.",
      "Soulful dawn kirtan mirrored in the Amrit Sarovar.",
      "Border ceremony and lively old-city bazaars for crafts and food.",
    ],
  },
  {
    id: "west-bengal",
    name: "Kolkata & Shantiniketan, West Bengal",
    stateTag: "Bengal Delta",
    image: "/assets/Victoria Memorial/victoria-memorial-kolkata-wb-2-attr-hero.jpg",
    summary:
      "Bengal’s literary salons, Durga Puja artistry, and Santiniketan craft gurukul preserve its cultural core.",
    food: "Kolkata kathi rolls, kosha mangsho, mishti doi, and puchka.",
    traditions: "Adda (salon debates), Rabindra Sangeet, Durga Puja pandal art, Baul folk music.",
    crafts: "Shantiniketan leather, kantha stitch quilts, terracotta from Bishnupur.",
    festivals: "Durga Puja, Poila Boishakh, Poush Mela.",
    attractions: [
      "Victoria Memorial",
      "Kumartuli idol-makers’ lanes",
      "Santiniketan & Visva-Bharati campus",
    ],
    whyVisit: [
      "Immersive Durga Puja installations blending tradition and avant-garde art.",
      "Literary heritage trails of Tagore and colonial-era architecture walks.",
      "Handmade leather, kantha, and terracotta markets with artisan demos.",
    ],
  },
  {
    id: "rajasthan",
    name: "Jaipur & Shekhawati, Rajasthan",
    stateTag: "Thar Heritage",
    image: "/assets/Amer Fort/amer_fort.png",
    summary:
      "Desert forts, painted havelis, block-print ateliers, and desert festivals anchor Rajasthan’s identity.",
    food: "Dal baati churma, ghewar, laal maas, and ker-sangri from the Thar.",
    traditions: "Ghoomar dance, puppetry (kathputli), rooftop folk music mehfils.",
    crafts: "Bagru block printing, blue pottery, miniature paintings, leather mojris.",
    festivals: "Pushkar Fair, Jaipur Literature Festival, Teej.",
    attractions: [
      "Amber Fort & City Palace",
      "Hawa Mahal",
      "Shekhawati fresco trails",
    ],
    whyVisit: [
      "Sunrise elephant/jeep ascents to Amber with Aravalli views.",
      "Hands-on block-print workshops and blue pottery studios.",
      "Evening folk sets in restored havelis and dunes.",
    ],
  },
  {
    id: "maharashtra",
    name: "Aurangabad & Ajanta, Maharashtra",
    stateTag: "Deccan Corridor",
    image: "/assets/Ajanta Caves/ajanta-caves-5-to-8-3071.jpg",
    summary:
      "Rock-cut Buddhist murals, Deccan multi-cuisine, Himroo looms, and wadas showcase layered Maratha and Buddhist heritage.",
    food: "Misal pav, thalipeeth, pathar ka gosht, and poha.",
    traditions: "Cave pilgrimage circuits, Paithani saree draping customs, wada courtyard gatherings.",
    crafts: "Paithani weaving, Himroo shawls, bidri-style metal inlay nearby.",
    festivals: "Ellora-Ajanta Festival, Ganesh Chaturthi, Gudi Padwa.",
    attractions: [
      "Ajanta & Ellora Caves",
      "Bibi ka Maqbara",
      "Daulatabad Fort",
    ],
    whyVisit: [
      "UNESCO-listed murals and monolithic Kailasa temple carvings.",
      "Paithani looms and Himroo workshops open to visitors.",
      "Fort-and-cave circuit that pairs archaeology with food streets.",
    ],
  },
];

export default function TraditionsPage() {
  return (
    <main className="heritage-page-shell flex h-dvh w-screen font-sans overflow-hidden bg-slate-950 text-white relative">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_100%_0%,#f59e0b,transparent_70%)]" />

      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <TopHeader />

        <div className="flex-1 overflow-y-auto p-6 lg:p-12 scrollbar-hide">
          <div className="max-w-[1700px] mx-auto space-y-16 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-2xl skew-y-1">
                    <Sparkles className="w-10 h-10 text-amber-500" />
                  </div>
                  <div>
                    <h1 className="text-5xl lg:text-8xl font-black text-white uppercase italic tracking-tighter">
                      Living Traditions
                    </h1>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.5em] mt-2 ml-1 underline decoration-amber-500/50 underline-offset-8">
                      Cultural identity, crafts, cuisine, festivals
                    </p>
                  </div>
                </div>
              </div>
            </header>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black uppercase italic tracking-tight">
                    Regional Heritage Grid
                  </h2>
                  <p className="text-sm text-slate-400">
                    Highlighting food, crafts, rituals, and festivals across India with a consistent, card-first layout.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {REGIONS.map((region) => (
                  <article
                    key={region.id}
                    className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={region.image}
                        alt={region.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1280px) 100vw, 33vw"
                        priority={region.id === "odisha"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute bottom-5 left-5 flex flex-col gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] border border-white/10">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          {region.stateTag}
                        </span>
                        <h3 className="text-2xl font-black uppercase italic tracking-tight">
                          {region.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-8 space-y-4 flex-1 flex flex-col">
                      <p className="text-sm text-slate-200 leading-relaxed">{region.summary}</p>

                      <div className="grid grid-cols-1 gap-3 text-[12px] font-semibold text-slate-200">
                        <InfoRow icon={<UtensilsCrossed className="w-4 h-4 text-amber-400" />} label="Food" value={region.food} />
                        <InfoRow icon={<ScrollText className="w-4 h-4 text-sky-300" />} label="Local Traditions" value={region.traditions} />
                        <InfoRow icon={<Shapes className="w-4 h-4 text-emerald-300" />} label="Cultural Crafts" value={region.crafts} />
                        <InfoRow icon={<PartyPopper className="w-4 h-4 text-pink-300" />} label="Festivals" value={region.festivals} />
                      </div>

                      <div className="pt-4 space-y-2">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                          Tourist Attractions
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {region.attractions.map((spot) => (
                            <span
                              key={spot}
                              className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-200"
                            >
                              {spot}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 space-y-2">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                          Why tourists visit this place
                        </p>
                        <ul className="space-y-2 text-sm text-slate-200 leading-relaxed">
                          {region.whyVisit.map((reason) => (
                            <li key={reason} className="flex items-start gap-2">
                              <ArrowRight className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <Footer />
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
      `}</style>
    </main>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
      <span className="mt-0.5">{icon}</span>
      <div className="space-y-1">
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
          {label}
        </p>
        <p className="text-sm leading-relaxed text-slate-100">{value}</p>
      </div>
    </div>
  );
}
