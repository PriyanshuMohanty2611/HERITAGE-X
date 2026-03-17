"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => { },
  logout: () => { },
  isLoading: true,
});

// Pages that don't require auth
const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("hx_user_email");
      if (stored) setUser(stored);
    } catch {
      // localStorage unavailable (SSR edge case)
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Route guard: redirect to login if unauthenticated on a protected route
  useEffect(() => {
    if (isLoading) return;
    const isPublic = PUBLIC_ROUTES.some(r => pathname.startsWith(r));
    if (!user && !isPublic) {
      router.replace("/login");
    }
  }, [isLoading, user, pathname, router]);

  const login = (email: string) => {
    try {
      localStorage.setItem("hx_user_email", email);
    } catch { }
    setUser(email);
  };

  const logout = () => {
    try {
      localStorage.removeItem("hx_user_email");
    } catch { }
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
