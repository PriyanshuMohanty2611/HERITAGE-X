"use client";

import { Hexagon, Mail, ArrowRight, Loader2, ChevronLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError("Email is required.");
            return;
        }
        setError("");
        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || "A reset link has been sent to your email.");
            } else {
                setError(data.detail || "Failed to process request. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="heritage-page-shell flex h-dvh w-screen font-sans overflow-hidden bg-transparent text-white relative">
            <div className="page-bg" style={{ backgroundImage: "url('/assets/Meenakshi Temple/meenakshi-amman-temple-india.avif')" }} />

            <div className="w-full max-w-md relative z-10 rounded-3xl p-8 shadow-2xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", backdropFilter: "blur(20px)" }}>
                <div className="flex flex-col items-center gap-3 mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg,#2563eb,#0ea5e9)" }}>
                        <Hexagon className="text-white w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-black tracking-widest uppercase" style={{ color: "var(--text-strong)" }}>Reset Security</h1>
                    <p className="text-xs font-mono text-center" style={{ color: "var(--text-muted)" }}>Enter your email to receive recovery instructions</p>
                </div>

                {error && (
                    <div className="mb-4 px-4 py-3 rounded-xl text-red-600 text-xs font-mono text-center" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
                        {error}
                    </div>
                )}

                {message && (
                    <div className="mb-4 px-4 py-3 rounded-xl text-green-600 text-xs font-mono text-center" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
                        <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                            className="w-full text-sm rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all"
                            style={{ background: "var(--background)", border: "1px solid var(--card-border)", color: "var(--text-strong)" }}
                        />
                    </div>

                    <button type="submit" disabled={isLoading || !!message}
                        className="w-full flex justify-center items-center gap-2 text-white font-bold text-sm tracking-widest uppercase py-3.5 rounded-xl transition-all disabled:opacity-60"
                        style={{ background: "#2563eb", boxShadow: "0 4px 20px rgba(37,99,235,0.3)" }}>
                        {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <>Send Recovery Link <ArrowRight className="w-4 h-4" /></>}
                    </button>
                </form>

                <div className="mt-6 text-center pt-5" style={{ borderTop: "1px solid var(--card-border)" }}>
                    <Link href="/login" className="flex items-center justify-center gap-2 text-blue-600 text-xs font-bold tracking-widest uppercase transition-all">
                        <ChevronLeft className="w-4 h-4" /> Back to Sign In
                    </Link>
                </div>
            </div>
        </main>
    );
}
