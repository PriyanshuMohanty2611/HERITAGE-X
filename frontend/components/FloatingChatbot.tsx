"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle, X, Send, BrainCircuit, Loader2,
  IndianRupee, Sparkles, Minimize2
} from "lucide-react";

// ── Budget model ────────────────────────────────────────────────────
const COST_MODEL: Record<string, any> = {
  konark:        { hotel: 1800, food: 450,  vehicle: 300, entry: 40   },
  "taj mahal":   { hotel: 8500, food: 900,  vehicle: 500, entry: 1100 },
  hampi:         { hotel: 2500, food: 400,  vehicle: 350, entry: 40   },
  meenakshi:     { hotel: 2200, food: 380,  vehicle: 250, entry: 50   },
  ajanta:        { hotel: 1600, food: 350,  vehicle: 300, entry: 40   },
  ellora:        { hotel: 1600, food: 350,  vehicle: 280, entry: 40   },
  khajuraho:     { hotel: 3200, food: 500,  vehicle: 400, entry: 40   },
  varanasi:      { hotel: 2800, food: 500,  vehicle: 350, entry: 0    },
  "red fort":    { hotel: 5500, food: 700,  vehicle: 400, entry: 35   },
  "amer fort":   { hotel: 4200, food: 600,  vehicle: 350, entry: 100  },
  sanchi:        { hotel: 1400, food: 300,  vehicle: 250, entry: 40   },
  puri:          { hotel: 2000, food: 400,  vehicle: 280, entry: 0    },
};

function getBudget(q: string, days: number) {
  const lower = q.toLowerCase();
  const key = Object.keys(COST_MODEL).find(k => lower.includes(k));
  const d = key ? COST_MODEL[key] : { hotel: 2500, food: 500, vehicle: 350, entry: 50 };
  return { ...d, days, total: (d.hotel + d.food + d.vehicle) * days + d.entry };
}

/** Minimal markdown renderer — no external deps */
function MiniMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (line.startsWith("## "))
          return <p key={i} className="font-black text-white text-sm">{line.slice(3)}</p>;
        if (line.startsWith("### "))
          return <p key={i} className="font-bold text-violet-300 text-xs mt-2">{line.slice(4)}</p>;
        if (line.startsWith("- ") || line.startsWith("• "))
          return <p key={i} className="flex gap-1.5 text-[11px] text-gray-300"><span className="text-violet-400 shrink-0">•</span>{line.slice(2)}</p>;
        if (line.startsWith("> "))
          return <blockquote key={i} className="border-l-2 border-amber-400/50 pl-2 text-[10px] text-amber-400/80 italic">{line.slice(2)}</blockquote>;
        if (line.startsWith("---") || line === "")
          return <div key={i} className="my-1" />;
        // Bold tokens
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className="text-[11px] text-gray-300 leading-relaxed">
            {parts.map((p2, j) =>
              p2.startsWith("**") && p2.endsWith("**")
                ? <strong key={j} className="text-white font-bold">{p2.slice(2, -2)}</strong>
                : p2
            )}
          </p>
        );
      })}
    </div>
  );
}

/** Light-mode markdown renderer using CSS variables */
function MiniMarkdownLight({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (line.startsWith("## "))
          return <p key={i} className="font-black text-sm" style={{ color: "var(--text-strong)" }}>{line.slice(3)}</p>;
        if (line.startsWith("### "))
          return <p key={i} className="font-bold text-xs mt-2 text-violet-600">{line.slice(4)}</p>;
        if (line.startsWith("- ") || line.startsWith("• "))
          return <p key={i} className="flex gap-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}><span className="text-violet-500 shrink-0">•</span>{line.slice(2)}</p>;
        if (line.startsWith("> "))
          return <blockquote key={i} className="border-l-2 border-amber-400 pl-2 text-[10px] text-amber-600 italic">{line.slice(2)}</blockquote>;
        if (line.startsWith("---") || line === "")
          return <div key={i} className="my-1" />;
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {parts.map((p2, j) =>
              p2.startsWith("**") && p2.endsWith("**")
                ? <strong key={j} className="font-bold" style={{ color: "var(--text-strong)" }}>{p2.slice(2, -2)}</strong>
                : p2
            )}
          </p>
        );
      })}
    </div>
  );
}

const QUICK = [
  "Spiritual heritage of Varanasi",
  "Nearby temples in Konark",
  "Budget for Taj Mahal 2 days",
  "Local festivals in Hampi",
  "Cultural places near Meenakshi",
];

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      role: "bot",
      text: "👋 **Namaste!** I'm PrinceAI, your **Indian Compass** and Heritage-X Assistant.\n\nI'm here to help you explore India's spiritual and cultural heritage. Ask me about:\n- **Traditions & Festivals** across India\n- **Nearby attractions** (Temples, Lakes, Rivers)\n- **Local customs & cuisines**\n- **Budget & Logistics** for your travels\n\nHow can I guide you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);

  const send = async (text: string = input) => {
    const q = text.trim();
    if (!q) return;
    setMsgs(p => [...p, { role: "user", text: q }]);
    setInput("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 750));

    const dayM = q.match(/(\d+)\s*(day|days|night|nights)/i);
    const days = dayM ? parseInt(dayM[1]) : 2;

    if (/budget|cost|how much|price|spend|₹|rupee|expense|plan/i.test(q)) {
      const b = getBudget(q, days);
      const dest = q.split(/\bfor\b/i)[0].trim() || "your destination";
      setMsgs(p => [...p, {
        role: "bot",
        text: `## 💰 Budget: ${dest} (${days} day${days > 1 ? "s" : ""})\n\n🏨 **Hotel:** ₹${(b.hotel * days).toLocaleString()} (₹${b.hotel.toLocaleString()}/night)\n🍛 **Food:** ₹${(b.food * days).toLocaleString()} (₹${b.food.toLocaleString()}/day)\n🚗 **Transport:** ₹${(b.vehicle * days).toLocaleString()} (₹${b.vehicle.toLocaleString()}/day)\n🏛️ **Entry Fees:** ₹${b.entry.toLocaleString()}\n\n### Grand Total: **₹${b.total.toLocaleString()}**\n\n> 💡 Book hotels 15 days ahead for ~30% savings!`
      }]);
    } else if (/hotel|stay|accommodation|room/i.test(q)) {
      setMsgs(p => [...p, { role: "bot", text: "🏨 **Hotel Ranges Near Heritage Sites**\n\n- **Budget:** ₹600–₹1,500/night (MTDC, Govt Bungalows)\n- **Mid-range:** ₹1,500–₹5,000/night (OYO, FabHotels)\n- **Premium:** ₹8,000–₹25,000/night (Oberoi, Rambagh, Evolve Back)\n\nTell me a specific destination for exact prices!" }]);
    } else if (/food|eat|restaurant|meal|thali/i.test(q)) {
      setMsgs(p => [...p, { role: "bot", text: "🍛 **Food Budget Guide**\n\n- **Street food:** ₹50–₹150/meal\n- **Dhaba/local:** ₹150–₹350/meal\n- **Restaurant:** ₹350–₹800/meal\n- **Heritage dining:** ₹300–₹600/thali\n\n**Daily avg:** ₹400–₹900 per person" }]);
    } else if (/transport|bus|auto|cab|rapido|ola|train/i.test(q)) {
      setMsgs(p => [...p, { role: "bot", text: "🚌 **Local Transport Costs**\n\n- 🛺 **Auto/Rapido:** ₹8–₹15/km\n- 🏍️ **Bike Ride:** ₹6–₹10/km\n- 🚖 **Ola Mini:** ₹15–₹20/km\n- 🚗 **Ola Prime:** ₹22–₹30/km\n- 🚌 **City Bus:** ₹5–₹15/trip\n\nUse the **Mobility Hub** section to book directly!" }]);
    } else if (/entry|ticket|fee|visit/i.test(q)) {
      setMsgs(p => [...p, { role: "bot", text: "🏛️ **Monument Entry Fees (Indians)**\n\n- **Taj Mahal:** ₹50 (Free under 15)\n- **Red Fort:** ₹35\n- **Ajanta / Ellora:** ₹40 each\n- **Hampi:** ₹40\n- **Khajuraho:** ₹40\n- **Amer Fort:** ₹100\n- **Jagannath Temple:** Free (Hindus only)\n- **Meenakshi Temple:** ₹50 (Camera: ₹50)" }]);
    } else {
      try {
        const res = await fetch("http://localhost:8000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: q + "\n\nAnswer as PrinceAI, your Indian Compass and Heritage-X assistant. Guide the user through India's spiritual and cultural landscape. Suggest nearby attractions, local customs, and traditions. Be concise and use markdown." }),
        });
        const data = await res.json();
        setMsgs(p => [...p, { role: "bot", text: data.response }]);
      } catch {
        setMsgs(p => [...p, { role: "bot", text: "Try asking: **Budget for Hampi 3 days** — I'll break down every cost! 🏛️" }]);
      }
    }
    setLoading(false);
  };

  return (
    <>
      {/* ── Floating Bubble ── */}
      {!open && (
        <div className="chat-fab flex flex-col items-center">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open PrinceAI Chat"
            className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-violet-500/30 animate-chatPulse"
            style={{ background: "linear-gradient(135deg, #7c3aed, #0ea5e9)" }}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 rounded-full border-2 border-[#060b18] flex items-center justify-center text-[9px] font-black text-black">AI</span>
          </button>
          <p className="text-[8px] text-gray-600 mt-1 font-bold uppercase tracking-widest text-center">PrinceAI</p>
        </div>
      )}

      {/* ── Chat Window ── */}
      {open && (
        <div
          className="chat-fab flex flex-col shadow-2xl overflow-hidden transition-all duration-200"
          style={{
            bottom: 0,
            width: minimized ? "280px" : "380px",
            height: minimized ? "56px" : "560px",
            borderRadius: "1.25rem",
            border: "1px solid var(--card-border)",
            background: "var(--card-bg)",
            position: "fixed",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{ borderBottom: "1px solid var(--card-border)", background: "var(--header-bg)" }}>
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7c3aed,#0ea5e9)" }}>
                <BrainCircuit className="w-4 h-4 text-white" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#090f1e]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-none truncate" style={{ color: "var(--text-strong)" }}>PrinceAI</p>
              <p className="text-[10px] font-mono truncate" style={{ color: "var(--text-muted)" }}>Budget · Travel · History</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => setMinimized(m => !m)} className="p-1.5 rounded-lg transition-colors" style={{ color: "var(--text-muted)" }}>
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg transition-colors" style={{ color: "var(--text-muted)" }}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Quick prompts */}
              <div className="flex gap-2 px-3 py-2.5 overflow-x-auto scrollbar-hide shrink-0" style={{ borderBottom: "1px solid var(--card-border)" }}>
                {QUICK.map(p => (
                  <button key={p} onClick={() => send(p)}
                    className="whitespace-nowrap text-[9px] font-bold px-2.5 py-1.5 rounded-lg transition-colors"
                    style={{ color: "#2563eb", border: "1px solid rgba(37,99,235,0.2)", background: "rgba(37,99,235,0.05)" }}>
                    {p}
                  </button>
                ))}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-hide">
                {msgs.map((m, i) => (
                  <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "bot" && (
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "linear-gradient(135deg,#7c3aed,#0ea5e9)" }}>
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[82%] p-3 rounded-2xl ${
                      m.role === "user" ? "rounded-tr-none" : "rounded-tl-none"
                    }`} style={m.role === "user"
                      ? { background: "linear-gradient(135deg,#5b21b6,#7c3aed)", color: "white" }
                      : { background: "var(--background)", border: "1px solid var(--card-border)" }}>
                      {m.role === "bot" ? <MiniMarkdownLight text={m.text} /> : <p className="text-[12px]">{m.text}</p>}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#7c3aed,#0ea5e9)" }}>
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-none flex gap-1.5" style={{ background: "var(--background)", border: "1px solid var(--card-border)" }}>
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* Input */}
              <div className="px-3 py-3 shrink-0" style={{ borderTop: "1px solid var(--card-border)", background: "var(--header-bg)" }}>
                <div className="flex items-center gap-2 rounded-xl px-3 py-2 transition-colors" style={{ background: "var(--background)", border: "1px solid var(--card-border)" }}>
                  <IndianRupee className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                    placeholder="Ask about budgets, monuments..."
                    className="flex-1 bg-transparent border-none outline-none text-xs placeholder-gray-400"
                    style={{ color: "var(--text-strong)" }}
                  />
                  <button
                    onClick={() => send()}
                    disabled={loading || !input.trim()}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white disabled:opacity-40 transition-opacity shrink-0"
                    style={{ background: "linear-gradient(135deg,#7c3aed,#0ea5e9)" }}
                  >
                    {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[8px] text-center mt-1.5" style={{ color: "var(--text-muted)" }}>PrinceAI · Powered by Gemini</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
