"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AccessibilityContextType {
  contrast: boolean;
  setContrast: (val: boolean) => void;
  saturation: boolean;
  setSaturation: (val: boolean) => void;
  highlightLinks: boolean;
  setHighlightLinks: (val: boolean) => void;
  fontSize: number;
  setFontSize: (val: number | ((prev: number) => number)) => void;
  largeCursor: boolean;
  setLargeCursor: (val: boolean) => void;
  heavyFont: boolean;
  setHeavyFont: (val: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  // Persistence Helper
  const getStored = (key: string, def: any) => {
    if (typeof window === "undefined") return def;
    const val = localStorage.getItem(`hx_access_${key}`);
    return val !== null ? JSON.parse(val) : def;
  };

  const [contrast, setContrast] = useState(() => getStored("contrast", false));
  const [saturation, setSaturation] = useState(() => getStored("saturation", true));
  const [highlightLinks, setHighlightLinks] = useState(() => getStored("highlightLinks", false));
  const [fontSize, setFontSize] = useState(() => getStored("fontSize", 100));
  const [largeCursor, setLargeCursor] = useState(() => getStored("largeCursor", true));
  const [heavyFont, setHeavyFont] = useState(() => getStored("heavyFont", true));

  useEffect(() => {
    localStorage.setItem("hx_access_contrast", JSON.stringify(contrast));
    localStorage.setItem("hx_access_saturation", JSON.stringify(saturation));
    localStorage.setItem("hx_access_highlightLinks", JSON.stringify(highlightLinks));
    localStorage.setItem("hx_access_fontSize", JSON.stringify(fontSize));
    localStorage.setItem("hx_access_largeCursor", JSON.stringify(largeCursor));
    localStorage.setItem("hx_access_heavyFont", JSON.stringify(heavyFont));

    // Apply Filters
    let filter = "";
    if (contrast) filter += "contrast(1.6) ";
    if (saturation) filter += "saturate(2.2) ";
    document.documentElement.style.filter = filter || "none";

    // Apply Font Size
    document.documentElement.style.fontSize = `${fontSize}%`;

    // Apply Font Weight (Heavy Dark Fonts)
    document.documentElement.style.fontWeight = heavyFont ? "800" : "normal";
    if (heavyFont) {
        document.documentElement.classList.add('heavy-fonts-active');
    } else {
        document.documentElement.classList.remove('heavy-fonts-active');
    }

    // Apply Cursor
    document.documentElement.style.cursor = largeCursor ? "crosshair" : "default";

    // Apply Highlight Links
    const applyHighlight = () => {
      const links = document.querySelectorAll("a, button");
      links.forEach((l) => {
        if (highlightLinks) {
          (l as HTMLElement).style.outline = "3px solid #f59e0b";
          (l as HTMLElement).style.outlineOffset = "3px";
        } else {
          (l as HTMLElement).style.outline = "none";
        }
      });
    };

    applyHighlight();
    const observer = new MutationObserver(applyHighlight);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [contrast, saturation, highlightLinks, fontSize, largeCursor, heavyFont]);

  return (
    <AccessibilityContext.Provider
      value={{
        contrast, setContrast,
        saturation, setSaturation,
        highlightLinks, setHighlightLinks,
        fontSize, setFontSize,
        largeCursor, setLargeCursor,
        heavyFont, setHeavyFont,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
