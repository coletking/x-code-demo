"use client";

import { useCallback, useEffect, useState } from "react";
import type { Order, OrderStatus } from "@/lib/models/types";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data as T;
}

export function useAllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchJson<{ orders: Order[] }>("/api/orders");
      setOrders(data.orders);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const closeOrder = useCallback(
    async (id: string) => {
      await fetchJson(`/api/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "closed" }),
      });
      await reload();
    },
    [reload]
  );

  const changeStatus = useCallback(
    async (id: string, status: OrderStatus) => {
      await fetchJson(`/api/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await reload();
    },
    [reload]
  );

  const addOrderForUser = useCallback(
    async (input: {
      targetUserId: string;
      serviceId: string;
      date: string;
      time: string;
      status?: OrderStatus;
      notes?: string;
    }) => {
      const data = await fetchJson<{ order: Order }>("/api/orders", {
        method: "POST",
        body: JSON.stringify(input),
      });
      await reload();
      return data.order;
    },
    [reload]
  );

  return { orders, isLoading, reload, closeOrder, changeStatus, addOrderForUser };
}

export function useUserOrders(userId: string | undefined) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    if (!userId) {
      setOrders([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = await fetchJson<{ orders: Order[] }>("/api/orders");
      setOrders(data.orders);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    reload();
  }, [reload]);

  const bookOrder = useCallback(
    async (input: { serviceId: string; date: string; time: string; notes?: string }) => {
      const data = await fetchJson<{ order: Order }>("/api/orders", {
        method: "POST",
        body: JSON.stringify(input),
      });
      await reload();
      return data.order;
    },
    [reload]
  );

  return { orders, isLoading, reload, bookOrder };
}
