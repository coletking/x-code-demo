"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface PublicUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "patient";
  status: "active" | "suspended" | "blocked";
  createdAt: string;
}

interface AuthResult {
  ok: boolean;
  error?: string;
}

interface AuthContextValue {
  user: PublicUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (input: { name: string; email: string; phone: string; password: string }) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function postJson(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json().catch(() => ({ user: null }));
    setUser(data.user ?? null);
  }, []);

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, [refresh]);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const { ok, data } = await postJson("/api/auth/login", { email, password });
      if (!ok) return { ok: false, error: data.error ?? "Unable to log in." };
      setUser(data.user);
      return { ok: true };
    },
    []
  );

  const register = useCallback(
    async (input: { name: string; email: string; phone: string; password: string }): Promise<AuthResult> => {
      const { ok, data } = await postJson("/api/auth/register", input);
      if (!ok) return { ok: false, error: data.error ?? "Unable to create account." };
      setUser(data.user);
      return { ok: true };
    },
    []
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, login, register, logout, refresh }),
    [user, isLoading, login, register, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
