"use client";

import { useCallback, useEffect, useState } from "react";
import type { UserStatus } from "@/lib/models/types";

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "patient";
  status: UserStatus;
  createdAt: string;
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data as T;
}

export function useUsers() {
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchJson<{ users: PublicUser[] }>("/api/users");
      setUsers(data.users);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const setStatus = useCallback(
    async (id: string, status: UserStatus) => {
      await fetchJson(`/api/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await reload();
    },
    [reload]
  );

  const addUser = useCallback(
    async (input: { name: string; email: string; phone: string; password: string }) => {
      try {
        const data = await fetchJson<{ user: PublicUser }>("/api/users", {
          method: "POST",
          body: JSON.stringify(input),
        });
        await reload();
        return { ok: true as const, user: data.user };
      } catch (err) {
        return { ok: false as const, error: (err as Error).message };
      }
    },
    [reload]
  );

  return { users, isLoading, reload, setStatus, addUser };
}
