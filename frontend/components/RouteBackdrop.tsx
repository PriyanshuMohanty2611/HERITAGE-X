"use client";

import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

type BackdropTheme = {
  image: string;
  position?: string;
  glow?: string;
};

const DEFAULT_THEME: BackdropTheme = {
  image:
    "/assets/Taj Mahal/sunrise-at-taj-mahal--agra--uttar-pradash--india-583682538-5b91840bc9e77c0050bdc67b.jpg",
  position: "center center",
  glow:
    "radial-gradient(circle at 18% 20%, rgba(245, 158, 11, 0.18), transparent 34%), radial-gradient(circle at 82% 18%, rgba(56, 189, 248, 0.14), transparent 30%)",
};

const ROUTE_THEMES: Array<{
  match: (pathname: string) => boolean;
  theme: BackdropTheme;
}> = [
  {
    match: (pathname) => pathname.startsWith("/repository/details"),
    theme: {
      image: "/assets/Ajanta Caves/Sculptures-inside-the-rock-cut-caves-1.jpg",
      position: "center center",
      glow:
        "radial-gradient(circle at 22% 18%, rgba(59, 130, 246, 0.16), transparent 32%), radial-gradient(circle at 80% 22%, rgba(245, 158, 11, 0.14), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname === "/",
    theme: DEFAULT_THEME,
  },
  {
    match: (pathname) => pathname.startsWith("/explore"),
    theme: {
      image: "/assets/KONARK/konark_hero.png",
      position: "center center",
      glow:
        "radial-gradient(circle at 18% 18%, rgba(251, 146, 60, 0.18), transparent 34%), radial-gradient(circle at 82% 22%, rgba(14, 165, 233, 0.14), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/circuits"),
    theme: {
      image: "/assets/Amer Fort/amer_fort.png",
      position: "center center",
      glow:
        "radial-gradient(circle at 16% 20%, rgba(250, 204, 21, 0.16), transparent 32%), radial-gradient(circle at 80% 18%, rgba(59, 130, 246, 0.14), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/festivals"),
    theme: {
      image: "/assets/Hampi Ruins/vitthala-temple-complex-hampi-tri-hero.jpg",
      position: "center center",
      glow:
        "radial-gradient(circle at 18% 18%, rgba(249, 115, 22, 0.18), transparent 34%), radial-gradient(circle at 78% 22%, rgba(16, 185, 129, 0.14), transparent 30%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/repository"),
    theme: {
      image: "/assets/Ajanta Caves/Sculptures-inside-the-rock-cut-caves-1.jpg",
      position: "center center",
      glow:
        "radial-gradient(circle at 22% 18%, rgba(56, 189, 248, 0.15), transparent 32%), radial-gradient(circle at 82% 24%, rgba(245, 158, 11, 0.12), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/traditions"),
    theme: {
      image: "/assets/Meenakshi Temple/meenakshi-amman-temple-india.avif",
      position: "center center",
      glow:
        "radial-gradient(circle at 20% 18%, rgba(234, 179, 8, 0.16), transparent 30%), radial-gradient(circle at 80% 22%, rgba(236, 72, 153, 0.12), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/activities"),
    theme: {
      image: "/assets/Khajuraho Temples/khajuraho-fi.webp",
      position: "center center",
      glow:
        "radial-gradient(circle at 20% 18%, rgba(251, 146, 60, 0.16), transparent 30%), radial-gradient(circle at 80% 22%, rgba(168, 85, 247, 0.14), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/guides"),
    theme: {
      image: "/assets/Harmandir Sahib/The_Golden_Temple_of_Amrithsar_7.jpg",
      position: "center center",
      glow:
        "radial-gradient(circle at 18% 20%, rgba(250, 204, 21, 0.16), transparent 32%), radial-gradient(circle at 82% 22%, rgba(14, 165, 233, 0.12), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/ai"),
    theme: {
      image: "/assets/Ellora Caves/images.jpg",
      position: "center center",
      glow:
        "radial-gradient(circle at 18% 20%, rgba(14, 165, 233, 0.16), transparent 32%), radial-gradient(circle at 80% 18%, rgba(99, 102, 241, 0.12), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/logistics"),
    theme: {
      image: "/assets/Red Fort/red_fort.png",
      position: "center center",
      glow:
        "radial-gradient(circle at 20% 18%, rgba(249, 115, 22, 0.16), transparent 32%), radial-gradient(circle at 82% 24%, rgba(14, 165, 233, 0.12), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/transport"),
    theme: {
      image: "/assets/Gol Gumbaz/gol_gumbaz.png",
      position: "center center",
      glow:
        "radial-gradient(circle at 18% 20%, rgba(249, 115, 22, 0.16), transparent 32%), radial-gradient(circle at 82% 18%, rgba(59, 130, 246, 0.12), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/sensors"),
    theme: {
      image: "/assets/Ellora Caves/the-kailasa-temple-in-maharashtra-india-carved-out-of-one-v0-8t7tjutdl0x61.webp",
      position: "center center",
      glow:
        "radial-gradient(circle at 18% 20%, rgba(14, 165, 233, 0.14), transparent 32%), radial-gradient(circle at 82% 22%, rgba(234, 179, 8, 0.12), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/vlogs"),
    theme: {
      image: "/assets/Mahabalipuram/shore-temple-mahabalipuram-1.webp",
      position: "center center",
      glow:
        "radial-gradient(circle at 18% 18%, rgba(14, 165, 233, 0.16), transparent 34%), radial-gradient(circle at 80% 24%, rgba(245, 158, 11, 0.12), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/safety"),
    theme: {
      image: "/assets/Ellora Caves/kailasa-temple-an-underrated-engineering-marvel-carved-out-v0-zxbpze3e08md1.webp",
      position: "center center",
      glow:
        "radial-gradient(circle at 20% 18%, rgba(250, 204, 21, 0.15), transparent 32%), radial-gradient(circle at 80% 24%, rgba(59, 130, 246, 0.12), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/info"),
    theme: {
      image: "/assets/Sanchi Stupa/sanchi-great-stupa.jpg",
      position: "center center",
      glow:
        "radial-gradient(circle at 18% 20%, rgba(245, 158, 11, 0.14), transparent 32%), radial-gradient(circle at 80% 24%, rgba(14, 165, 233, 0.12), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/profile"),
    theme: {
      image: "/assets/Victoria Memorial/Victoria-Memorial-Hall-Kolkata-India-West-Bengal.webp",
      position: "center center",
      glow:
        "radial-gradient(circle at 18% 18%, rgba(59, 130, 246, 0.16), transparent 34%), radial-gradient(circle at 82% 24%, rgba(245, 158, 11, 0.12), transparent 28%)",
    },
  },
  {
    match: (pathname) => pathname.startsWith("/login"),
    theme: {
      image: "/assets/Taj Mahal/images.jpg",
      position: "center center",
      glow:
        "radial-gradient(circle at 18% 18%, rgba(245, 158, 11, 0.16), transparent 34%), radial-gradient(circle at 82% 22%, rgba(59, 130, 246, 0.12), transparent 28%)",
    },
  },
];

function getBackdropTheme(pathname: string): BackdropTheme {
  return (
    ROUTE_THEMES.find((entry) => entry.match(pathname))?.theme ?? DEFAULT_THEME
  );
}

export default function RouteBackdrop() {
  const pathname = usePathname();
  const theme = getBackdropTheme(pathname);

  const style = {
    "--heritage-route-image": `url("${theme.image}")`,
    "--heritage-route-position": theme.position ?? "center center",
    "--heritage-route-glow": theme.glow ?? DEFAULT_THEME.glow,
  } as CSSProperties;

  return (
    <div aria-hidden="true" className="heritage-route-backdrop" style={style}>
      <div className="heritage-route-backdrop__image" />
      <div className="heritage-route-backdrop__veil" />
      <div className="heritage-route-backdrop__glow" />
    </div>
  );
}
