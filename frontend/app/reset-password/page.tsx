"use client";

import { Hexagon, Lock, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            setError("Invalid or missing reset token.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, new_password: password }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => router.push("/login"), 3000);
            } else {
                setError(data.detail || "Failed to reset password.");
            }
        } catch (err) {
            setError("Network error. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center space-y-4">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold" style={{ color: "var(--text-strong)" }}>Security Restored</h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Your password has been updated successfully.</p>
                <p className="text-xs opacity-60" style={{ color: "var(--text-muted)" }}>Redirecting to sign in...</p>
                <div className="pt-4">
                    <Link href="/login" className="text-blue-600 text-xs font-bold tracking-widest uppercase">
                        Login Now →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
                <input type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full text-sm rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all"
                    style={{ background: "var(--background)", border: "1px solid var(--card-border)", color: "var(--text-strong)" }}
                />
            </div>
            <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
                <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full text-sm rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all"
                    style={{ background: "var(--background)", border: "1px solid var(--card-border)", color: "var(--text-strong)" }}
                />
            </div>

            {error && (
                <div className="px-4 py-3 rounded-xl text-red-600 text-xs font-mono text-center" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
                    {error}
                </div>
            )}

            <button type="submit" disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 text-white font-bold text-sm tracking-widest uppercase py-3.5 rounded-xl transition-all disabled:opacity-60"
                style={{ background: "#2563eb", boxShadow: "0 4px 20px rgba(37,99,235,0.3)" }}>
                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</> : <>Update Password <ArrowRight className="w-4 h-4" /></>}
            </button>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <main className="heritage-page-shell flex min-h-screen w-screen items-center justify-center p-4 relative overflow-hidden" style={{ background: "var(--background)" }}>
            <div className="page-bg" style={{ backgroundImage: "url('/assets/Meenakshi Temple/meenakshi-amman-temple-india.avif')" }} />

            <div className="w-full max-w-md relative z-10 rounded-3xl p-8 shadow-2xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", backdropFilter: "blur(20px)" }}>
                <div className="flex flex-col items-center gap-3 mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg,#2563eb,#0ea5e9)" }}>
                        <Hexagon className="text-white w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-black tracking-widest uppercase" style={{ color: "var(--text-strong)" }}>Final Recovery</h1>
                    <p className="text-xs font-mono text-center" style={{ color: "var(--text-muted)" }}>Secure your account with a new password</p>
                </div>

                <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin opacity-20" /></div>}>
                    <ResetPasswordForm />
                </Suspense>

                <div className="mt-6 text-center pt-5" style={{ borderTop: "1px solid var(--card-border)" }}>
                    <p className="text-[10px] opacity-40 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Personnel Security Protocol</p>
                </div>
            </div>
        </main>
    );
}
