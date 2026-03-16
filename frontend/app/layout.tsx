import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import FloatingChatbot from "../components/FloatingChatbot";
import FloatingTranslator from "../components/FloatingTranslator";
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

export const metadata: Metadata = {
  title: "HERITAGE-X | AI Cultural Intelligence Platform",
  description: "Digitizing, preserving, and analyzing global cultural heritage through artificial intelligence and IoT.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <AuthProvider>
            <RouteBackdrop />
            {children}
            <FloatingTranslator />
            <FloatingChatbot />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
