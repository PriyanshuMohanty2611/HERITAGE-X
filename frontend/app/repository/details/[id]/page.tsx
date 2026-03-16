"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink, Landmark } from "lucide-react";
import { Sidebar } from "../../../components/Sidebar";
import { TopHeader } from "../../../components/TopHeader";
import { Footer } from "../../../components/Footer";
import { HERITAGE_TOPICS, getRepositoryEntity, HeritageTopic, UnsungHero, VirtualExhibit } from "../data";

export default function RepositoryDetailPage({ params }: { params: { id: string } }) {
  const entity = getRepositoryEntity(params.id) as
    | { type: "topic"; data: HeritageTopic }
    | { type: "exhibit"; data: VirtualExhibit }
    | { type: "hero"; data: UnsungHero }
    | null;
  if (!entity) return notFound();

  const data: HeritageTopic | UnsungHero | VirtualExhibit = entity.data;
  const heroImage = data.image;
  const title = data.name ?? data.title;
  const subtitle =
    entity.type === "hero"
      ? `${data.title} • ${data.period}`
      : entity.type === "topic"
        ? data.category
        : data.type;

  const description =
    entity.type === "hero"
      ? data.desc
      : entity.type === "topic"
        ? data.desc
        : data.details;

  return (
    <main className="heritage-page-shell flex h-dvh w-screen font-sans overflow-hidden bg-[#060b18] text-white relative">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <TopHeader />

        <div className="flex-1 overflow-y-auto p-6 lg:p-14 scrollbar-hide">
          <div className="max-w-6xl mx-auto space-y-10 pb-20">
            <Link
              href="/repository"
              className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Heritage Library
            </Link>

            <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl bg-slate-950/70 backdrop-blur-2xl">
              <div className="relative h-[320px] w-full">
                <Image
                  src={heroImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">
                    {subtitle}
                  </p>
                  <h1 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter">
                    {title}
                  </h1>
                </div>
              </div>

              <div className="p-10 space-y-8">
                <p className="text-sm leading-relaxed text-slate-200 max-w-3xl">{description}</p>

                {entity.type === "hero" && (
                  <div className="flex flex-wrap gap-3">
                    {data.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-[0.25em] text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <ExternalLink className="w-4 h-4 text-amber-400" />
                  <a
                    href={data.source}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-white"
                  >
                    Verified source
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8">
              <h3 className="text-lg font-black uppercase tracking-[0.3em] text-slate-300 mb-4 flex items-center gap-3">
                <Landmark className="w-5 h-5 text-amber-400" /> Related Library Entries
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {HERITAGE_TOPICS.slice(0, 3).map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/repository/details/${topic.id}`}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-amber-500/30 transition-all"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-500 mb-1">
                      {topic.category}
                    </p>
                    <p className="text-sm font-black text-white">{topic.name}</p>
                  </Link>
                ))}
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
