"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Gamepad2,
  Sparkles,
  Rocket,
  Trophy,
  RefreshCcw,
  Target,
  Timer,
  Joystick,
  ArrowRight,
} from "lucide-react";
import { Sidebar } from "../../components/Sidebar";
import { TopHeader } from "../../components/TopHeader";
import { Footer } from "../../components/Footer";

type Artifact = {
  id: string;
  name: string;
  site: string;
  image: string;
  points: number;
};

const ARTIFACTS: Artifact[] = [
  {
    id: "konark",
    name: "Solar Chariot Wheel",
    site: "Konark, Odisha",
    image: "/assets/KONARK/konark_hero.png",
    points: 15,
  },
  {
    id: "meenakshi",
    name: "Gopuram Guardians",
    site: "Madurai, Tamil Nadu",
    image: "/assets/Meenakshi Temple/meenakshi-amman-temple-india.avif",
    points: 10,
  },
  {
    id: "victoria",
    name: "Marble Dome Light",
    site: "Kolkata, West Bengal",
    image: "/assets/Victoria Memorial/victoria-memorial-kolkata-wb-2-attr-hero.jpg",
    points: 12,
  },
  {
    id: "redfort",
    name: "Lal Qila Ramparts",
    site: "Delhi, NCR",
    image: "/assets/Red Fort/red_fort.png",
    points: 10,
  },
  {
    id: "hampi",
    name: "Vijayanagara Pillars",
    site: "Hampi, Karnataka",
    image: "/assets/Hampi Ruins/places-to-visit-in-hampi-FEATURE-compressed.jpg",
    points: 14,
  },
  {
    id: "ajanta",
    name: "Cave Fresco Glow",
    site: "Aurangabad, Maharashtra",
    image: "/assets/Ajanta Caves/ajanta-caves-5-to-8-3071.jpg",
    points: 16,
  },
  {
    id: "qutub",
    name: "Victory Minaret",
    site: "Delhi, NCR",
    image: "/assets/Sanchi Stupa/Qutub Minar/qutub1_042717100950.jpg",
    points: 11,
  },
  {
    id: "taj",
    name: "Marble Inlay Bloom",
    site: "Agra, Uttar Pradesh",
    image: "/assets/Taj Mahal/sunrise-at-taj-mahal--agra--uttar-pradash--india-583682538-5b91840bc9e77c0050bdc67b.jpg",
    points: 20,
  },
  {
    id: "harmandir",
    name: "Golden Reflection",
    site: "Amritsar, Punjab",
    image: "/assets/Harmandir Sahib/The_Golden_Temple_of_Amrithsar_7.jpg",
    points: 13,
  },
];

function shuffle<T>(arr: T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function ActivitiesPage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [collected, setCollected] = useState<Set<string>>(new Set());
  const [deck, setDeck] = useState<Artifact[]>(() => shuffle(ARTIFACTS));

  const progress = useMemo(
    () => Math.round((collected.size / deck.length) * 100),
    [collected.size, deck.length],
  );

  useEffect(() => {
    if (!gameStarted) return;
    if (timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [gameStarted, timeLeft]);

  const handleStart = () => {
    setGameStarted(true);
    setTimeLeft(45);
    setScore(0);
    setCollected(new Set());
    setDeck(shuffle(ARTIFACTS));
  };

  const handleRestart = () => {
    setGameStarted(false);
    setTimeLeft(45);
    setScore(0);
    setCollected(new Set());
    setDeck(shuffle(ARTIFACTS));
  };

  const handleCollect = (artifact: Artifact) => {
    if (!gameStarted || timeLeft <= 0) return;
    if (collected.has(artifact.id)) return;
    const next = new Set(collected);
    next.add(artifact.id);
    setCollected(next);
    const nextScore = score + artifact.points;
    setScore(nextScore);
    setBestScore((prev) => Math.max(prev, nextScore));
  };

  return (
    <main className="heritage-page-shell flex h-dvh w-screen font-sans overflow-hidden bg-slate-950 text-white relative">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full" />
      </div>

      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <TopHeader />

        <div className="flex-1 overflow-y-auto p-6 lg:p-12 scrollbar-hide">
          <div className="max-w-[1600px] mx-auto space-y-14 pb-16">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-2xl skew-y-1 animate-pulse">
                  <Gamepad2 className="w-10 h-10 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-5xl lg:text-7xl font-black text-white uppercase italic tracking-tighter">
                    Cultural Nexus
                  </h1>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.5em] mt-2 ml-1 underline decoration-purple-500/50 underline-offset-8">
                    Cultural Heritage Gaming Hub
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
                <Stat label="Score" value={score} icon={<Target className="w-4 h-4" />} />
                <Stat label="Best" value={bestScore} icon={<Trophy className="w-4 h-4" />} />
                <Stat label="Time" value={`${timeLeft}s`} icon={<Timer className="w-4 h-4" />} warning={timeLeft <= 10 && gameStarted} />
              </div>
            </header>

            <section className="rounded-[32px] border border-white/10 bg-slate-900/70 backdrop-blur-2xl shadow-3xl p-6 lg:p-10 space-y-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      Heritage Game
                    </p>
                    <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">
                      Heritage Artifact Hunt
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleStart}
                    className="px-6 py-3 rounded-2xl bg-white text-black font-black uppercase text-[11px] tracking-[0.25em] shadow-2xl flex items-center gap-2 hover:bg-purple-500 hover:text-white transition-all"
                  >
                    <Joystick className="w-4 h-4" /> Start
                  </button>
                  <button
                    onClick={handleRestart}
                    className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 font-black uppercase text-[11px] tracking-[0.25em] text-white hover:border-purple-400 transition-all flex items-center gap-2"
                  >
                    <RefreshCcw className="w-4 h-4" /> Restart
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
                <div className="relative rounded-[28px] border border-white/10 bg-slate-950/70 p-4 lg:p-6 shadow-inner overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-indigo-500/5 animate-pulse" />
                  <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                    {deck.map((artifact) => {
                      const isCollected = collected.has(artifact.id);
                      return (
                        <button
                          key={artifact.id}
                          onClick={() => handleCollect(artifact)}
                          className={`group relative rounded-3xl border overflow-hidden text-left transition-all ${
                            isCollected
                              ? "border-green-400/60 bg-green-500/10"
                              : "border-white/10 bg-white/5 hover:border-purple-400/40"
                          }`}
                        >
                          <div className="relative h-40">
                            <Image
                              src={artifact.image}
                              alt={artifact.name}
                              fill
                              className={`object-cover transition-transform duration-700 ${isCollected ? "grayscale" : "group-hover:scale-105"}`}
                              sizes="(max-width: 1280px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                            <div className="absolute bottom-3 left-3">
                              <span className="inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white border border-white/10">
                                {artifact.site}
                              </span>
                            </div>
                          </div>
                          <div className="p-4 space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-purple-300">
                              +{artifact.points} pts
                            </p>
                            <p className="text-lg font-black text-white uppercase tracking-tight">
                              {artifact.name}
                            </p>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              Tap to collect this heritage node and gain points before the timer ends.
                            </p>
                          </div>
                          {isCollected && (
                            <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
                              <Sparkles className="w-8 h-8 text-green-400 animate-pulse" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-inner space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                      Gameplay Panel
                    </p>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                      <span className="text-sm text-slate-200">Collected</span>
                      <span className="text-2xl font-black text-white">
                        {collected.size}/{deck.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                      <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
                        Status
                      </p>
                      <p className="text-sm text-slate-200">
                        {gameStarted
                          ? timeLeft > 0
                            ? "Hunt in progress — collect unique artifacts to boost your score."
                            : "Time up. Restart to begin a new heritage hunt."
                          : "Press Start to begin the cultural heritage game."}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-purple-600/20 via-indigo-500/15 to-slate-900/60 p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.25em] text-white">
                        Tip
                      </p>
                      <p className="text-xs text-slate-200">
                        Collect all nine heritage nodes for a bonus and beat your best score.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  icon,
  warning = false,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  warning?: boolean;
}) {
  return (
    <div className={`rounded-2xl border px-4 py-3 shadow-2xl bg-white/5 border-white/10 flex items-center justify-between gap-2 ${warning ? "animate-pulse border-amber-400/60" : ""}`}>
      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-right">
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">{label}</p>
        <p className="text-lg font-black text-white">{value}</p>
      </div>
    </div>
  );
}
