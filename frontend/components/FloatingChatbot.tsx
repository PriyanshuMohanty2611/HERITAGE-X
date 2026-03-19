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
    <div className="group flex flex-col items-center gap-3">
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-blue-600 font-black uppercase tracking-widest bg-white/80 px-3 py-1.5 rounded-full shadow-sm border border-slate-100 backdrop-blur-md">PrinceAI v4.5</p>

      {/* ── Floating Bubble ── */}
      {!open && (
         <button
            onClick={() => setOpen(true)}
            aria-label="Open PrinceAI Chat"
            className="w-14 h-14 rounded-full border-[3px] border-white flex items-center justify-center transition-all group overflow-hidden relative active:scale-90 hover:scale-110 shadow-2xl"
            style={{ 
               background: "linear-gradient(135deg, #2563eb, #3b82f6)",
               boxShadow: "0 10px 30px rgba(37, 99, 235, 0.3)"
            }}
         >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <MessageCircle className="w-6 h-6 text-white transition-transform group-hover:scale-110 group-hover:-rotate-12 relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            <div className="absolute top-0 right-0 w-4 h-4 bg-amber-400 rounded-full border-[2.5px] border-white flex items-center justify-center shadow-md">
               <span className="text-[6px] font-black text-black">AI</span>
            </div>
         </button>
      )}

      {/* ── Chat Window ── */}
      {open && (
         <div 
            className="chat-overlay flex flex-col shadow-4xl overflow-hidden animate-in fade-in zoom-in duration-200"
            style={{
               bottom: "100px",
               right: "0",
               width: "380px",
               height: "560px",
               borderRadius: "3rem",
               border: "1px solid rgba(226, 232, 240, 0.8)",
               background: "rgba(255, 255, 255, 0.98)",
               position: "absolute",
               zIndex: 1000,
               backdropFilter: "blur(12px)", 
               padding: "2rem",
               boxShadow: "0 30px 60px -12px rgba(37, 99, 235, 0.15)",
               transform: "translate3d(0, 0, 0)"
            }}
         >
          {/* Header */}
          <div className="flex items-center gap-4 px-8 py-5 shrink-0"
            style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg,#2563eb,#3b82f6)" }}>
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-black leading-none truncate text-slate-950 uppercase italic tracking-tighter">PrinceAI Compass</p>
              <p className="text-[9px] font-black truncate text-blue-600 uppercase tracking-widest mt-1">Sovereign Neural Assistant</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => setMinimized(m => !m)} className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-all">
                <Minimize2 className="w-4 h-4" />
              </button>
              <button onClick={() => setOpen(false)} className="w-10 h-10 rounded-xl hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-slate-400 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Quick prompts */}
              <div className="flex gap-3 px-6 py-4 overflow-x-auto scrollbar-hide shrink-0" style={{ borderBottom: "1px solid #f1f5f9" }}>
                {QUICK.map(p => (
                  <button key={p} onClick={() => send(p)}
                    className="whitespace-nowrap text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-full transition-all border border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm">
                    {p}
                  </button>
                ))}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-hide bg-slate-50/30">
                {msgs.map((m, i) => (
                  <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "bot" && (
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-md"
                        style={{ background: "linear-gradient(135deg,#2563eb,#3b82f6)" }}>
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[85%] p-5 rounded-4xl shadow-sm shadow-blue-900/5 ${
                      m.role === "user" ? "rounded-tr-none bg-blue-600 text-white font-bold" : "rounded-tl-none bg-white border border-slate-100 text-slate-800"
                    }`}>
                      {m.role === "bot" ? <MiniMarkdownLight text={m.text} /> : <p className="text-[13px] italic">{m.text}</p>}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3 justify-start animate-in fade-in duration-300">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#2563eb,#3b82f6)" }}>
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="p-5 rounded-4xl rounded-tl-none flex gap-2 bg-white border border-slate-100 shadow-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* Input */}
              <div className="px-6 py-6 shrink-0" style={{ borderTop: "1px solid #f1f5f9", background: "#ffffff" }}>
                <div className="flex items-center gap-3 rounded-4xl px-6 py-4 border-2 border-slate-100 bg-slate-50 focus-within:border-blue-500/30 focus-within:bg-white transition-all shadow-inner">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                    placeholder="Ask about budgets, monuments..."
                    className="flex-1 bg-transparent border-none outline-none text-[13px] font-bold italic placeholder-slate-400 text-slate-950"
                  />
                  <button
                    onClick={() => send()}
                    disabled={loading || !input.trim()}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:opacity-40 transition-all shrink-0 hover:rotate-12 active:scale-90 shadow-lg"
                    style={{ background: "linear-gradient(135deg,#2563eb,#3b82f6)" }}
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>
                <div className="flex items-center justify-center gap-3 mt-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Neural Uplink v2.5 Stable</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
    </>
  );
}
