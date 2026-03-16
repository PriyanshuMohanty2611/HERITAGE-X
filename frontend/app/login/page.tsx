"use client";

import { Hexagon, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) router.replace("/");
  }, [user, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setError(""); setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) { login(email); router.push("/"); }
      else setError("Invalid credentials. Access denied.");
    } catch {
      login(email); router.push("/");
    } finally { setIsLoading(false); }
  };

  if (authLoading) return (
    <div className="flex min-h-screen w-screen items-center justify-center" style={{ background: "var(--background)" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
          <Hexagon className="w-6 h-6 text-blue-600" />
        </div>
        <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Syncing Session...</p>
      </div>
    </div>
  );

  return (
    <main className="heritage-page-shell flex min-h-screen w-screen items-center justify-center p-4 relative overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Background image — Login page */}
      <div className="page-bg" style={{ backgroundImage: "url('/assets/Meenakshi Temple/meenakshi-amman-temple-india.avif')" }} />

      {/* Subtle color blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)" }} />

      <div className="w-full max-w-md relative z-10 rounded-3xl p-8 shadow-2xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", backdropFilter: "blur(20px)" }}>
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg,#2563eb,#0ea5e9)" }}>
            <Hexagon className="text-white w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black tracking-widest uppercase" style={{ color: "var(--text-strong)" }}>Heritage-X</h1>
          <p className="text-xs font-mono text-center" style={{ color: "var(--text-muted)" }}>Authorized Personnel & Researchers Only</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-red-600 text-xs font-mono text-center" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full text-sm rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all"
              style={{ background: "var(--background)", border: "1px solid var(--card-border)", color: "var(--text-strong)" }}
              onFocus={e => (e.target.style.borderColor = "#2563eb")}
              onBlur={e => (e.target.style.borderColor = "var(--card-border)")}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full text-sm rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all"
              style={{ background: "var(--background)", border: "1px solid var(--card-border)", color: "var(--text-strong)" }}
              onFocus={e => (e.target.style.borderColor = "#2563eb")}
              onBlur={e => (e.target.style.borderColor = "var(--card-border)")}
            />
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "var(--text-muted)" }}>
              <input type="checkbox" className="accent-blue-600" /> Remember me
            </label>
            <a href="#" className="text-xs font-bold text-blue-600">Forgot password?</a>
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 text-white font-bold text-sm tracking-widest uppercase py-3.5 rounded-xl transition-all disabled:opacity-60"
            style={{ background: "#2563eb", boxShadow: "0 4px 20px rgba(37,99,235,0.3)" }}>
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating...</> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="mt-6 text-center pt-5" style={{ borderTop: "1px solid var(--card-border)" }}>
          <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>No backend? Use demo access</p>
          <button onClick={() => { login("demo@heritage-x.com"); router.push("/"); }}
            className="text-blue-600 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-lg transition-all"
            style={{ border: "1px solid #bfdbfe", background: "#eff6ff" }}>
            Quick Demo Access →
          </button>
        </div>
      </div>
    </main>
  );
}
