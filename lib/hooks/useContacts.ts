"use client";

import { useCallback, useEffect, useState } from "react";
import type { Contact } from "@/lib/models/types";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data as T;
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchJson<{ contacts: Contact[] }>("/api/contacts");
      setContacts(data.contacts);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const addContact = useCallback(
    async (input: {
      name: string;
      email: string;
      phone: string;
      message: string;
      source?: "contact-form" | "manual";
    }) => {
      await fetchJson("/api/contacts", {
        method: "POST",
        body: JSON.stringify({ ...input, source: input.source ?? "manual" }),
      });
      await reload();
    },
    [reload]
  );

  const markResponded = useCallback(
    async (id: string) => {
      await fetchJson(`/api/contacts/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "responded" }),
      });
      await reload();
    },
    [reload]
  );

  return { contacts, isLoading, reload, addContact, markResponded };
}
