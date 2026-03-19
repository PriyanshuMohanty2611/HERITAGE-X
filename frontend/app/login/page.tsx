"use client";

import { Hexagon, Lock, Mail, ArrowRight, Loader2, ShieldCheck, Fingerprint } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
      // Mock SaaS Login Protocol
      setTimeout(() => {
        login(email);
        router.push("/");
      }, 1500);
    } catch {
      setError("Neutral Link Interrupted. Retry Verification.");
    } finally {
      // Logic handled in timeout for demo
    }
  };

  return (
    <main className="min-h-screen w-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Dynamic Background is handled by RootLayout's NeuralBackground */}

      <div className="w-full max-w-[480px] relative z-20 glass-card p-10 lg:p-14 rounded-[3.5rem] border border-white/40 shadow-3xl animate-reveal">
         <header className="text-center space-y-6 mb-12">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-600/30 rotate-3 hover:rotate-0 transition-transform duration-500">
               <Fingerprint className="w-10 h-10" />
            </div>
            <div className="space-y-2">
               <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-950">System <span className="text-blue-600">Access</span></h1>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Initialize Neural Protocol v5.0</p>
            </div>
         </header>

         {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase text-center tracking-widest animate-shake">
               {error}
            </div>
         )}

         <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Operator ID</label>
               <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="Enter Credentials..." 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full h-16 bg-white/50 border border-slate-200 rounded-2xl pl-14 pr-6 outline-none text-sm font-bold focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Access Key</label>
               <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full h-16 bg-white/50 border border-slate-200 rounded-2xl pl-14 pr-6 outline-none text-sm font-bold focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                  />
               </div>
            </div>

            <div className="flex items-center justify-between px-1 mb-4">
               <label className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer select-none">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  Remember Sync
               </label>
               <Link href="/forgot-password" title="Key Recovery" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline decoration-2">
                  Key Recovery
               </Link>
            </div>

            <button 
               type="submit" 
               disabled={isLoading}
               className="btn-perfect-align w-full h-16 bg-slate-950 text-white rounded-3xl hover:bg-blue-600 shadow-2xl border-none group transition-all"
            >
               {isLoading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Verifying Node...</>
               ) : (
                  <>
                    <span className="btn-icon-box">
                       <ShieldCheck className="w-5 h-5" />
                    </span>
                    <span className="btn-text">Authorize Entrance</span>
                  </>
               )}
            </button>
         </form>

         <footer className="mt-12 pt-10 border-t border-slate-100/50 text-center space-y-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unauthenticated Access Forbidden</p>
            <Link href="/signup" className="inline-flex items-center gap-2 text-[11px] font-black text-blue-600 uppercase tracking-widest hover:translate-x-1 transition-transform">
               Apply for Neural Credentials <ArrowRight className="w-4 h-4" />
            </Link>
         </footer>
      </div>
    </main>
  );
}
