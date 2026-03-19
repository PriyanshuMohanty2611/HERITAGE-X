"use client";

import Image from "next/image";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bookmark,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  History,
  Info,
  Landmark,
  MapPin,
  Music,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  QrCode,
} from "lucide-react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { Footer } from "../../components/Footer";

type EventType =
  | "Festival"
  | "Cultural Event"
  | "Historical Timeline"
  | "Heritage Anniversary";

type ViewMode = "cards" | "timeline" | "calendar";

type CulturalNode = {
  id: number;
  name: string;
  location: string;
  region: string;
  culture: string;
  date: string;
  endDate?: string;
  type: EventType;
  access: string;
  desc: string;
  participants: string;
  highlights: string[];
  colors: string;
  image: string;
  eraLabel: string;
  heritageNote: string;
};

const CULTURAL_NODES: CulturalNode[] = [
  {
    id: 1,
    name: "Konark Dance Festival",
    location: "Konark Sun Temple, Odisha",
    region: "East",
    culture: "Classical",
    date: "2026-12-01",
    endDate: "2026-12-05",
    type: "Festival",
    access: "Ticketed",
    desc: "A flagship open-air celebration of Odissi and allied Indian classical forms staged against the Sun Temple complex.",
    participants: "4.5K attendees",
    highlights: ["Odissi showcases", "Temple backdrop", "Evening performances"],
    colors: "from-orange-500 to-rose-500",
    image: "/assets/KONARK/konark_hero.png",
    eraLabel: "Modern performance tradition rooted in medieval temple heritage",
    heritageNote:
      "Program archives connect each edition to conservation-sensitive stage planning around the monument precinct.",
  },
  {
    id: 2,
    name: "Surajkund International Crafts Mela",
    location: "Faridabad, Haryana",
    region: "North",
    culture: "Craft",
    date: "2026-02-01",
    endDate: "2026-02-15",
    type: "Cultural Event",
    access: "Festival Pass",
    desc: "A large-format craft and performance fair bringing together regional artisans, folk ensembles, and culinary traditions.",
    participants: "200K visitors",
    highlights: ["Craft pavilions", "State showcases", "Folk stage"],
    colors: "from-amber-500 to-orange-600",
    image: "/assets/Red Fort/red_fort.png",
    eraLabel: "Annual craft marketplace with pan-Indian representation",
    heritageNote:
      "Exhibition records and artisan rosters help trace continuity in material culture and regional making traditions.",
  },
  {
    id: 3,
    name: "Ratha Yatra Procession",
    location: "Puri, Odisha",
    region: "East",
    culture: "Religious",
    date: "2026-06-20",
    endDate: "2026-06-28",
    type: "Festival",
    access: "Open Access",
    desc: "The annual chariot procession of Jagannath, Balabhadra, and Subhadra, combining ritual movement, carpentry, and urban coordination.",
    participants: "2.1M pilgrims",
    highlights: ["Chariot procession", "Temple rituals", "Mass participation"],
    colors: "from-blue-500 to-indigo-600",
    image: "/assets/KONARK/download (1).jpg",
    eraLabel: "Living ritual calendar with deep medieval roots",
    heritageNote:
      "Processional routes and chariot-making records remain essential cultural references for ritual continuity.",
  },
  {
    id: 4,
    name: "Chennai Margazhi Music Season",
    location: "Chennai, Tamil Nadu",
    region: "South",
    culture: "Classical",
    date: "2026-12-15",
    endDate: "2026-12-31",
    type: "Cultural Event",
    access: "Season Pass",
    desc: "A dense calendar of Carnatic concerts, lecture demonstrations, and dance recitals staged across the city.",
    participants: "60K listeners",
    highlights: ["Sabha concerts", "Lecture demos", "Dance recitals"],
    colors: "from-fuchsia-500 to-rose-600",
    image: "/assets/Meenakshi Temple/27104002564_c0e6de4e06_b.jpg",
    eraLabel: "Urban seasonal circuit for music, dance, and scholarship",
    heritageNote:
      "Concert listings and sabha notes provide a strong record of repertoire, pedagogy, and performance lineages.",
  },
  {
    id: 5,
    name: "Hornbill Festival",
    location: "Kisama, Nagaland",
    region: "North East",
    culture: "Tribal",
    date: "2026-12-01",
    endDate: "2026-12-10",
    type: "Festival",
    access: "Ticketed",
    desc: "A major gathering of Naga communities featuring indigenous games, ceremonial performances, food traditions, and contemporary music.",
    participants: "120K visitors",
    highlights: ["Morung showcases", "Naga cuisine", "Ethno-rock nights"],
    colors: "from-emerald-500 to-teal-600",
    image: "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg",
    eraLabel: "Contemporary festival framing multiple tribal traditions",
    heritageNote:
      "Recorded performances and village presentations act as a public-facing record of ceremonial and social practices.",
  },
  {
    id: 6,
    name: "Dandi March Memory Walk",
    location: "Dandi, Gujarat",
    region: "West",
    culture: "Freedom",
    date: "2026-03-12",
    type: "Historical Timeline",
    access: "Commemorative Walk",
    desc: "A public remembrance tracing the Salt March route and its role in shaping mass civil resistance.",
    participants: "8K participants",
    highlights: ["Route markers", "Public readings", "Freedom talks"],
    colors: "from-slate-500 to-slate-700",
    image: "/assets/Ajanta Caves/images.jpg",
    eraLabel: "Historical origin: March 12, 1930",
    heritageNote:
      "Route documentation, speeches, and local collections preserve the memory of the march as a civic timeline.",
  },
  {
    id: 7,
    name: "Ayodhya Singh Upadhyay Remembrance",
    location: "Nizamabad, Uttar Pradesh",
    region: "North",
    culture: "Literary",
    date: "2026-03-16",
    type: "Heritage Anniversary",
    access: "Public Program",
    desc: "A literary remembrance honoring the Hindi poet Ayodhya Singh Upadhyay 'Hariaudh' through readings and heritage talks.",
    participants: "Institutional programs",
    highlights: ["Poetry readings", "Hindi scholarship", "School outreach"],
    colors: "from-yellow-500 to-amber-600",
    image: "/assets/Victoria Memorial/images.jpg",
    eraLabel: "Heritage anniversary linked to early modern Hindi literary history",
    heritageNote:
      "Manuscript references, local memorial practices, and recitation programs keep the literary record active.",
  },
  {
    id: 8,
    name: "Hampi Foundation Chronicle",
    location: "Hampi, Karnataka",
    region: "South",
    culture: "Courtly",
    date: "2026-04-18",
    type: "Historical Timeline",
    access: "Interpretive Walk",
    desc: "A timeline-led heritage day narrating the rise of Vijayanagara through maps, monuments, and urban planning references.",
    participants: "3K visitors",
    highlights: ["City layout trail", "Temple routes", "Site interpretation"],
    colors: "from-stone-500 to-orange-700",
    image: "/assets/Hampi Ruins/vitthala-temple-complex-hampi-tri-hero.jpg",
    eraLabel: "Historical origin: 14th-century Vijayanagara foundation memory",
    heritageNote:
      "Archaeological surveys and urban plans provide the archival backbone for this chronological interpretation.",
  },
  {
    id: 9,
    name: "Constitution Adoption Trail",
    location: "New Delhi",
    region: "North",
    culture: "Political",
    date: "2026-11-26",
    type: "Historical Timeline",
    access: "Guided Entry",
    desc: "A civic heritage program revisiting debates, institutions, and public memory tied to the adoption of the Constitution.",
    participants: "12K visitors",
    highlights: ["Civic exhibitions", "Debate archives", "Public lectures"],
    colors: "from-sky-500 to-blue-700",
    image: "/assets/Amer Fort/amer_fort.png",
    eraLabel: "Historical origin: November 26, 1949",
    heritageNote:
      "Constituent Assembly records and public education exhibits frame the timeline in accessible civic terms.",
  },
  {
    id: 10,
    name: "Qutub Minar UNESCO Anniversary",
    location: "Delhi",
    region: "North",
    culture: "Islamic",
    date: "2026-12-11",
    type: "Heritage Anniversary",
    access: "Open Heritage Day",
    desc: "An anniversary program reflecting on inscription, conservation, and layered Sultanate-era architectural history.",
    participants: "9K visitors",
    highlights: ["Conservation talks", "Night illumination", "Guided monument circuit"],
    colors: "from-cyan-500 to-sky-600",
    image: "/assets/Sanchi Stupa/Qutub Minar/images.jpg",
    eraLabel: "Heritage anniversary linked to UNESCO inscription history",
    heritageNote:
      "Conservation files and inscription-era documentation are interpreted here as part of the public calendar.",
  },
];

const EVENT_TYPE_META: Record<
  EventType,
  { icon: LucideIcon; tone: string; badge: string }
> = {
  Festival: {
    icon: Music,
    tone: "text-orange-600",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
  },
  "Cultural Event": {
    icon: Sparkles,
    tone: "text-sky-600",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
  },
  "Historical Timeline": {
    icon: History,
    tone: "text-slate-700",
    badge: "bg-slate-50 text-slate-700 border-slate-200",
  },
  "Heritage Anniversary": {
    icon: Landmark,
    tone: "text-amber-600",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

function parseIsoDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toIsoDate(value: Date): string {
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, "0");
  const day = `${value.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatLongDate(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parseIsoDate(value));
}

function formatDateRange(start: string, end?: string): string {
  if (!end || start === end) {
    return formatLongDate(start);
  }

  const startDate = parseIsoDate(start);
  const endDate = parseIsoDate(end);
  const sameMonth = startDate.getMonth() === endDate.getMonth();
  const sameYear = startDate.getFullYear() === endDate.getFullYear();

  if (sameMonth && sameYear) {
    return `${startDate.getDate()}-${endDate.getDate()} ${new Intl.DateTimeFormat("en-IN", {
      month: "short",
      year: "numeric",
    }).format(startDate)}`;
  }

  return `${formatLongDate(start)} - ${formatLongDate(end)}`;
}

function occursOnDate(node: CulturalNode, dateValue: string): boolean {
  const target = parseIsoDate(dateValue).getTime();
  const start = parseIsoDate(node.date).getTime();
  const end = parseIsoDate(node.endDate ?? node.date).getTime();
  return target >= start && target <= end;
}

function buildCalendarDays(month: Date): Date[] {
  const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
  const mondayIndex = (monthStart.getDay() + 6) % 7;
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - mondayIndex);

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    return day;
  });
}

export default function FestivalTrackerPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [filterRegion, setFilterRegion] = useState("All Regions");
  const [filterCulture, setFilterCulture] = useState("All Cultures");
  const [filterDate, setFilterDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("2026-03-16");
  const [visibleMonth, setVisibleMonth] = useState(parseIsoDate("2026-03-01"));

  const regions = [
    "All Regions",
    ...Array.from(new Set(CULTURAL_NODES.map((node) => node.region))),
  ];
  const cultures = [
    "All Cultures",
    ...Array.from(new Set(CULTURAL_NODES.map((node) => node.culture))),
  ];

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredNodes = CULTURAL_NODES.filter((node) => {
    const matchesRegion =
      filterRegion === "All Regions" || node.region === filterRegion;
    const matchesCulture =
      filterCulture === "All Cultures" || node.culture === filterCulture;
    const matchesDate = !filterDate || occursOnDate(node, filterDate);
    const matchesSearch =
      !normalizedQuery ||
      node.name.toLowerCase().includes(normalizedQuery) ||
      node.desc.toLowerCase().includes(normalizedQuery) ||
      node.heritageNote.toLowerCase().includes(normalizedQuery);

    return matchesRegion && matchesCulture && matchesDate && matchesSearch;
  });

  const timelineNodes = [...filteredNodes].sort(
    (left, right) =>
      parseIsoDate(left.date).getTime() - parseIsoDate(right.date).getTime(),
  );

  const selectedDayNodes = filteredNodes.filter((node) =>
    occursOnDate(node, selectedDate),
  );

  const categorySummary = (Object.keys(EVENT_TYPE_META) as EventType[]).map(
    (type) => ({
      type,
      count: filteredNodes.filter((node) => node.type === type).length,
    }),
  );

  const calendarDays = buildCalendarDays(visibleMonth);
  const visibleMonthLabel = new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);

  return (
    <main className="heritage-page-shell flex min-h-screen w-full font-sans overflow-x-hidden relative bg-transparent text-slate-950">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 h-[520px] w-[520px] rounded-full bg-orange-600/10 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-[540px] w-[540px] rounded-full bg-sky-600/10 blur-[160px]" />
      </div>

      <Sidebar />

      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <div className="header-neural h-20 flex items-center justify-between px-6 z-20 shrink-0 border-b border-white/10">
          <TopHeader />
        </div>

        <div className="scrollbar-hide flex-1 overflow-y-auto p-4 md:p-8 lg:p-16 neural-content-shell">
          <div className="mx-auto max-w-[1700px] space-y-10 pb-20">
            <header className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
              <div className="space-y-5">
                 <div className="flex items-center gap-4 lg:gap-8">
                   <div className="flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-2xl lg:rounded-3xl border border-orange-500/20 bg-orange-500/10 shadow-2xl">
                     <CalendarIcon className="h-8 w-8 lg:h-10 lg:w-10 text-orange-400" />
                   </div>
                   <div>
                     <h1 className="text-[clamp(1.75rem,8vw,4.5rem)] font-black uppercase italic tracking-tight text-slate-950 leading-none">
                       Cultural Calendar
                     </h1>
                     <p className="mt-2 text-[9px] lg:text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 border-b border-orange-500/10 pb-2">
                       Festivals, cultural events, timelines, and heritage anniversaries
                     </p>
                   </div>
                 </div>

                <p className="max-w-3xl text-sm leading-relaxed text-slate-600 lg:text-base">
                  Historical timelines and archival context now sit inside one
                  calendar workspace, so festival planning, cultural programs,
                  and heritage commemorations can be explored together.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 rounded-[2.25rem] border border-white/5 bg-white/5 p-2">
                <div className="flex rounded-2xl border border-white/5 bg-black/40 p-1.5">
                  {[
                    { id: "calendar", label: "Calendar", icon: CalendarIcon },
                    { id: "timeline", label: "Timeline", icon: Clock },
                    { id: "cards", label: "Cards", icon: Sparkles },
                  ].map((view) => (
                    <button
                      key={view.id}
                      onClick={() => setViewMode(view.id as ViewMode)}
                      className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.25em] transition-all ${
                        viewMode === view.id
                          ? "scale-105 bg-white text-black shadow-xl"
                          : "text-slate-500 hover:text-white"
                      }`}
                    >
                      <view.icon className="h-3.5 w-3.5" />
                      {view.label}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            <section className="rounded-3xl lg:rounded-4xl border border-slate-200 bg-white/60 backdrop-blur-3xl p-4 lg:p-8 shadow-2xl">
               <div className="mb-8 flex items-center gap-4">
                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                   <Sparkles className="h-6 w-6 text-orange-400" />
                 </div>
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                     Filter Console
                   </p>
                   <p className="text-xl font-black uppercase italic tracking-tight text-slate-950">
                     Region, culture, and date filters
                   </p>
                 </div>
               </div>

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr_1fr_1.2fr_auto]">
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/50 px-4 py-3">
                  <Flag className="h-4 w-4 text-orange-400" />
                  <select
                    value={filterRegion}
                    onChange={(event) => setFilterRegion(event.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-950 outline-none cursor-pointer"
                  >
                    {regions.map((region) => (
                      <option key={region} value={region} className="bg-white text-slate-950">
                        {region}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/50 px-4 py-3">
                  <Bookmark className="h-4 w-4 text-sky-400" />
                  <select
                    value={filterCulture}
                    onChange={(event) => setFilterCulture(event.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-950 outline-none cursor-pointer"
                  >
                    {cultures.map((culture) => (
                      <option key={culture} value={culture} className="bg-white text-slate-950">
                        {culture}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/50 px-4 py-3">
                  <CalendarIcon className="h-4 w-4 text-amber-300" />
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(event) => {
                      const nextDate = event.target.value;
                      setFilterDate(nextDate);
                      if (nextDate) {
                        setSelectedDate(nextDate);
                        setVisibleMonth(parseIsoDate(`${nextDate.slice(0, 7)}-01`));
                      }
                    }}
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
                  />
                </label>

                <label className="group relative flex items-center rounded-2xl border border-slate-200 bg-white/50 px-4 py-3">
                  <Search className="mr-3 h-4 w-4 text-slate-500 transition-colors group-focus-within:text-orange-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search events, timelines, anniversaries..."
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-500"
                  />
                </label>

                <button
                  onClick={() => {
                    setFilterRegion("All Regions");
                    setFilterCulture("All Cultures");
                    setFilterDate("");
                    setSearchQuery("");
                  }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 transition-all hover:border-orange-500/30 hover:bg-orange-500 hover:text-white shadow-sm active:scale-95"
                >
                  Clear Filters
                </button>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
              {categorySummary.map(({ type, count }) => {
                const Icon = EVENT_TYPE_META[type].icon;
                return (
                  <div
                    key={type}
                    className="flex items-center justify-between rounded-4xl border border-white/5 bg-white/5 px-6 py-5"
                  >
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                        {type}
                      </p>
                      <p className="mt-2 text-3xl font-black italic tracking-tight text-slate-950">
                        {count}
                      </p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/30">
                      <Icon className={`h-6 w-6 ${EVENT_TYPE_META[type].tone}`} />
                    </div>
                  </div>
                );
              })}
            </section>

            {viewMode === "calendar" ? (
              <section className="grid grid-cols-12 gap-8">
                <div className="col-span-12 rounded-4xl border border-white/5 bg-white/5 p-6 shadow-2xl xl:col-span-8 lg:p-8">
                  <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                        Calendar Interface
                      </p>
                      <h2 className="mt-2 text-3xl font-black uppercase italic tracking-tight text-slate-950">
                        {visibleMonthLabel}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setVisibleMonth(
                            new Date(
                              visibleMonth.getFullYear(),
                              visibleMonth.getMonth() - 1,
                              1,
                            ),
                          )
                        }
                        className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-400 transition-all hover:border-blue-500 hover:text-blue-600 shadow-sm"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() =>
                          setVisibleMonth(
                            new Date(
                              visibleMonth.getFullYear(),
                              visibleMonth.getMonth() + 1,
                              1,
                            ),
                          )
                        }
                        className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-400 transition-all hover:border-blue-500 hover:text-blue-600 shadow-sm"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-3">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div
                        key={day}
                        className="pb-2 text-center text-[10px] font-black uppercase tracking-[0.25em] text-slate-500"
                      >
                        {day}
                      </div>
                    ))}

                    {calendarDays.map((day) => {
                      const isoDay = toIsoDate(day);
                      const dayNodes = filteredNodes.filter((node) =>
                        occursOnDate(node, isoDay),
                      );
                      const isCurrentMonth =
                        day.getMonth() === visibleMonth.getMonth();
                      const isSelected = isoDay === selectedDate;

                      return (
                        <button
                          key={isoDay}
                          onClick={() => setSelectedDate(isoDay)}
                          className={`min-h-[112px] rounded-[1.75rem] border p-3 text-left transition-all ${
                            isSelected
                              ? "border-orange-500 bg-orange-50 shadow-xl"
                              : "border-slate-100 bg-white hover:border-slate-300 hover:shadow-md"
                           } ${isCurrentMonth ? "text-slate-950" : "text-slate-400"} rounded-3xl`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-lg font-black tracking-tight">
                              {day.getDate()}
                            </span>
                            {dayNodes.length > 0 ? (
                              <span className="rounded-full bg-orange-500/15 px-2 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-orange-600">
                                {dayNodes.length}
                              </span>
                            ) : null}
                          </div>

                          <div className="mt-4 space-y-2">
                            {dayNodes.slice(0, 2).map((node) => {
                              const Icon = EVENT_TYPE_META[node.type].icon;
                              return (
                                <div
                                  key={node.id}
                                  className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-2.5 py-2 shadow-sm"
                                >
                                  <Icon className={`h-3.5 w-3.5 shrink-0 ${EVENT_TYPE_META[node.type].tone}`} />
                                  <span className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700">
                                    {node.name}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="col-span-12 space-y-6 xl:col-span-4">
                  <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-2xl lg:p-8">
                    <div className="mb-6 flex items-center gap-4 border-b border-white/5 pb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10">
                        <Clock className="h-6 w-6 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                          Selected Date
                        </p>
                        <p className="text-xl font-black uppercase italic tracking-tight text-slate-950">
                          {formatLongDate(selectedDate)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {selectedDayNodes.length > 0 ? (
                        selectedDayNodes.map((node) => {
                          const Icon = EVENT_TYPE_META[node.type].icon;
                          return (
                            <article
                              key={node.id}
                              className="rounded-4xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-orange-500/20 hover:bg-white hover:shadow-xl"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex min-w-0 items-center gap-3">
                                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                                    <Icon className={`h-5 w-5 ${EVENT_TYPE_META[node.type].tone}`} />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="truncate text-lg font-black uppercase italic tracking-tight text-slate-950">
                                      {node.name}
                                    </p>
                                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                                      {node.type}
                                    </p>
                                  </div>
                                </div>
                                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-600" />
                              </div>

                              <div className="mt-5 grid gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                <div className="flex items-center gap-3">
                                  <MapPin className="h-4 w-4 text-orange-400" />
                                  <span>{node.location}</span>
                                </div>
                                <div className="flex select-none items-center gap-3 rounded-3xl bg-orange-500/10 px-4 py-3 border border-orange-500/20">
                                  <Ticket className="h-4 w-4 text-orange-400" />
                                  <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Access Type</p>
                                    <p className="text-xs font-black uppercase italic tracking-tight text-slate-950">{node.access}</p>
                                  </div>
                                  {node.access !== "Open Access" && (
                                    <div className="ml-auto w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-400 transition-all">
                                      <QrCode className="w-4 h-4 text-blue-400 group-hover:text-white" />
                                    </div>
                                  )}
                                </div>

                                <div className="flex select-none items-center gap-3 rounded-3xl bg-sky-500/10 px-4 py-3 border border-sky-500/20">
                                  <Users className="h-4 w-4 text-sky-400" />
                                  <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Estimated Reach</p>
                                    <p className="text-xs font-black uppercase italic tracking-tight text-slate-950">{node.participants}</p>
                                  </div>
                                </div>
                              </div>
                            </article>
                          );
                        })
                      ) : (
                        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-4xl border border-dashed border-white/10 bg-black/20 px-6 text-center text-slate-500">
                          <Info className="mb-4 h-10 w-10" />
                          <p className="text-[11px] font-black uppercase tracking-[0.28em]">
                            No calendar entries match this day.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            {viewMode === "timeline" ? (
              <section className="rounded-4xl border border-slate-200 bg-white/60 backdrop-blur-3xl p-6 shadow-2xl lg:p-10">
                <div className="mb-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                    Timeline View
                  </p>
                  <h2 className="mt-2 text-3xl font-black uppercase italic tracking-tight text-slate-950">
                    Historical threads and live calendar moments
                  </h2>
                </div>

                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-orange-500/40 via-sky-500/30 to-transparent" />

                  <div className="space-y-6">
                    {timelineNodes.map((node) => {
                      const Icon = EVENT_TYPE_META[node.type].icon;
                      return (
                        <article key={node.id} className="relative pl-16">
                          <div className="absolute top-8 left-[17px] h-4 w-4 rounded-full border-4 border-orange-400 bg-slate-900 shadow-[0_0_14px_rgba(251,146,60,0.55)]" />

                          <div className="rounded-4xl border border-slate-200 bg-white/80 backdrop-blur-xl p-6 shadow-xl lg:p-8">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                              <div className="flex min-w-0 items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                                  <Icon className={`h-6 w-6 ${EVENT_TYPE_META[node.type].tone}`} />
                                </div>

                                <div className="min-w-0">
                                  <div className="mb-3 flex flex-wrap items-center gap-3">
                                    <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] ${EVENT_TYPE_META[node.type].badge}`}>
                                      {node.type}
                                    </span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                                      {formatDateRange(node.date, node.endDate)}
                                    </span>
                                  </div>

                                  <h3 className="text-2xl font-black uppercase italic tracking-tight text-slate-950 lg:text-3xl">
                                    {node.name}
                                  </h3>
                                  <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600 font-bold">
                                    {node.desc}
                                  </p>
                                </div>
                              </div>

                              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                                {node.eraLabel}
                              </div>
                            </div>

                            <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                              <div className="rounded-4xl border border-slate-100 bg-slate-50 p-6 shadow-inner">
                                <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                                  <Bookmark className="h-4 w-4 text-orange-600" />
                                  Heritage Note
                                </div>
                                <p className="text-sm leading-relaxed text-slate-700 font-bold">
                                  {node.heritageNote}
                                </p>
                              </div>

                              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                                <div className="flex items-center gap-3 rounded-[1.5rem] border border-slate-100 bg-slate-50 px-4 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                                  <MapPin className="h-4 w-4 text-orange-400" />
                                  <span>{node.region}</span>
                                </div>
                                <div className="flex items-center gap-3 rounded-[1.5rem] border border-slate-100 bg-slate-50 px-4 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                                  <Users className="h-4 w-4 text-sky-400" />
                                  <span>{node.participants}</span>
                                </div>
                                <div className="flex items-center gap-3 rounded-[1.5rem] border border-slate-100 bg-slate-50 px-4 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                                  <Ticket className="h-4 w-4 text-amber-300" />
                                  <span>{node.access}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </section>
            ) : null}

            {viewMode === "cards" ? (
              <section className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3">
                {filteredNodes.map((node) => {
                  const Icon = EVENT_TYPE_META[node.type].icon;
                  return (
                    <article
                      key={node.id}
                      className="group rounded-[3rem] border border-slate-200 bg-white/70 p-1 shadow-2xl transition-all hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
                    >
                      <div className="flex h-full min-h-[580px] flex-col overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-md">
                        <div className="relative h-64 w-full overflow-hidden">
                          <Image
                            src={node.image}
                            alt={node.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1536px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                          {node.access !== "Open Access" && (
                            <div className="absolute right-4 top-4 rounded-xl bg-slate-950/80 p-2.5 shadow-2xl backdrop-blur-md">
                              <QrCode className="h-5 w-5 text-orange-400" />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-1 flex-col p-6 lg:p-8">
                          <div className="flex items-start justify-between gap-4">
                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${node.colors} shadow-xl`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] ${EVENT_TYPE_META[node.type].badge}`}>
                              {node.type}
                            </span>
                          </div>

                          <div className="mt-6 space-y-4">
                            <h3 className="text-3xl font-black uppercase italic tracking-tight text-slate-950">
                              {node.name}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600 font-bold">
                              {node.desc}
                            </p>
                          </div>

                          <div className="mt-6 grid gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-slate-900">
                              <MapPin className="h-4 w-4 text-orange-600" />
                              <span>{node.location}</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-slate-900">
                              <Clock className="h-4 w-4 text-sky-600" />
                              <span>{formatDateRange(node.date, node.endDate)}</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-slate-900">
                              <Bookmark className="h-4 w-4 text-amber-600" />
                              <span>{node.culture}</span>
                            </div>
                          </div>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {node.highlights.map((highlight) => (
                              <span
                                key={highlight}
                                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-800"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>

                          <div className="mt-auto pt-8">
                            <div className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6 shadow-inner">
                              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 flex items-center gap-2">
                                <Landmark className="w-3.5 h-3.5" /> Heritage Note
                              </p>
                              <p className="mt-3 text-sm leading-relaxed text-slate-800 font-bold">
                                {node.heritageNote}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>
            ) : null}

            <section className="relative overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-8 shadow-2xl lg:p-12">
              <div className="absolute top-0 right-0 h-[360px] w-[360px] translate-x-1/3 -translate-y-1/3 rounded-full bg-orange-500/10 blur-[120px]" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-[1.5fr_0.8fr] lg:items-center">
                <div className="space-y-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                    Calendar Contributions
                  </p>
                  <h2 className="text-4xl font-black uppercase italic tracking-tight text-slate-950 lg:text-5xl">
                    Recommend a cultural entry
                  </h2>
                  <p className="max-w-2xl text-base leading-relaxed text-slate-600 font-bold">
                    Submit festivals, cultural programs, timeline markers, or
                    heritage anniversaries to keep the calendar complete across
                    regions and communities.
                  </p>
                  <button className="rounded-3xl bg-orange-500 px-8 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-white transition-all hover:bg-orange-400">
                    Suggest Calendar Item
                  </button>
                </div>

                <div className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 text-center shadow-inner">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] border border-orange-500/20 bg-white">
                    <ShieldCheck className="h-10 w-10 text-orange-400" />
                  </div>
                  <p className="mt-5 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Event cards, icons, and heritage notes are normalized in the
                    same layout so festivals and timelines remain visually aligned.
                  </p>
                </div>
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
