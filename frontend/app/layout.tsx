import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import FloatingChatbot from "@/components/FloatingChatbot";
import FloatingTranslator from "@/components/FloatingTranslator";
import { NeuralMagnifier } from "@/components/NeuralMagnifier";
import { NeuralBackground } from "../components/NeuralBackground";
import RouteBackdrop from "../components/RouteBackdrop";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

import { AccessibilityProvider } from "../context/AccessibilityContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "HERITAGE-X | AI Cultural Intelligence Platform",
  description: "Digitizing, preserving, and analyzing global cultural heritage through artificial intelligence and IoT.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans">
        <AccessibilityProvider>
          <ThemeProvider>
            <AuthProvider>
              {/* GLOBAL BACKGROUND LAYER */}
              <NeuralBackground />
              <RouteBackdrop />
              <NeuralMagnifier />

              {/* CONTENT LAYER - Transparent so the dots show through */}
              <div className="relative z-10 w-full h-screen bg-transparent">
                <div className="relative h-full w-full overflow-hidden">
                  {children}
                  <div className="fixed bottom-8 right-8 flex flex-col-reverse items-center gap-5 z-[2000] pointer-events-none">
                    <div className="pointer-events-auto flex flex-col-reverse items-center gap-5">
                       <FloatingChatbot />
                       <FloatingTranslator />
                    </div>
                  </div>
                </div>
              </div>
            </AuthProvider>
          </ThemeProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
