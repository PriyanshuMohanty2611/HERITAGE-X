"use client";

import { Hexagon, Lock, Mail, ArrowRight, Loader2, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Log in after successful signup
                login(email);
                router.push("/");
            } else {
                setError(data.detail || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="heritage-page-shell flex min-h-screen w-screen items-center justify-center p-4 relative overflow-hidden" style={{ background: "var(--background)" }}>
            <div className="page-bg" style={{ backgroundImage: "url('/assets/Meenakshi Temple/meenakshi-amman-temple-india.avif')" }} />

            <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)" }} />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)" }} />

            <div className="w-full max-w-md relative z-10 rounded-3xl p-8 shadow-2xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", backdropFilter: "blur(20px)" }}>
                <div className="flex flex-col items-center gap-3 mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg,#2563eb,#0ea5e9)" }}>
                        <Hexagon className="text-white w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-black tracking-widest uppercase" style={{ color: "var(--text-strong)" }}>Join Heritage-X</h1>
                    <p className="text-xs font-mono text-center" style={{ color: "var(--text-muted)" }}>Begin Your Cultural Intelligence Journey</p>
                </div>

                {error && (
                    <div className="mb-4 px-4 py-3 rounded-xl text-red-600 text-xs font-mono text-center" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
                        <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}
                            className="w-full text-sm rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all"
                            style={{ background: "var(--background)", border: "1px solid var(--card-border)", color: "var(--text-strong)" }}
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
                        <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                            className="w-full text-sm rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all"
                            style={{ background: "var(--background)", border: "1px solid var(--card-border)", color: "var(--text-strong)" }}
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
                        <input type="password" placeholder="Create Password" value={password} onChange={e => setPassword(e.target.value)}
                            className="w-full text-sm rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all"
                            style={{ background: "var(--background)", border: "1px solid var(--card-border)", color: "var(--text-strong)" }}
                        />
                    </div>

                    <button type="submit" disabled={isLoading}
                        className="w-full flex justify-center items-center gap-2 text-white font-bold text-sm tracking-widest uppercase py-3.5 rounded-xl transition-all disabled:opacity-60"
                        style={{ background: "#2563eb", boxShadow: "0 4px 20px rgba(37,99,235,0.3)" }}>
                        {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Registering...</> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                    </button>
                </form>

                <div className="mt-6 text-center pt-5" style={{ borderTop: "1px solid var(--card-border)" }}>
                    <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>Already have an account?</p>
                    <Link href="/login" className="text-blue-600 text-xs font-bold tracking-widest uppercase transition-all">
                        Sign In Instead →
                    </Link>
                </div>
            </div>
        </main>
    );
}
