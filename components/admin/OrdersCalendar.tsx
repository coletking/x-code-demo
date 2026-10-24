"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/models/types";
import { getMonthMatrix, toDateKey } from "@/lib/utils/date";
import { orderStatusMeta } from "@/lib/utils/statusColor";
import { cn } from "@/lib/utils/cn";

export function OrdersCalendar({
  orders,
  onSelectDay,
}: {
  orders: Order[];
  onSelectDay: (dateKey: string, orders: Order[]) => void;
}) {
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const ordersByDate = useMemo(() => {
    const map = new Map<string, Order[]>();
    for (const order of orders) {
      const list = map.get(order.date) ?? [];
      list.push(order);
      map.set(order.date, list);
    }
    return map;
  }, [orders]);

  const weeks = useMemo(
    () => getMonthMatrix(cursor.year, cursor.month),
    [cursor]
  );
  const todayKey = toDateKey(new Date());

  function changeMonth(delta: number) {
    setCursor((prev) => {
      const next = new Date(prev.year, prev.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  return (
    <div className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-display text-base text-primary-950">
          {new Date(cursor.year, cursor.month).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => changeMonth(-1)}
            className="rounded-lg p-1.5 text-primary-900/60 hover:bg-primary-50"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="rounded-lg p-1.5 text-primary-900/60 hover:bg-primary-50"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-primary-900/40">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((date, i) => {
          if (!date) return <div key={i} className="min-h-[72px]" />;
          const key = toDateKey(date);
          const dayOrders = ordersByDate.get(key) ?? [];
          const statuses = Array.from(new Set(dayOrders.map((o) => o.status))) as OrderStatus[];
          const isToday = key === todayKey;

          return (
            <button
              key={key}
              onClick={() => dayOrders.length > 0 && onSelectDay(key, dayOrders)}
              className={cn(
                "flex min-h-[72px] flex-col items-start gap-1 rounded-lg p-1.5 text-left transition-colors",
                dayOrders.length > 0 ? "hover:bg-primary-50 cursor-pointer" : "cursor-default",
                isToday && "ring-1 ring-inset ring-primary-400"
              )}
            >
              <span className={cn("text-xs font-medium", isToday ? "text-primary-700" : "text-primary-900/60")}>
                {date.getDate()}
              </span>
              {dayOrders.length > 0 && (
                <div className="flex flex-wrap gap-0.5">
                  {statuses.slice(0, 4).map((status) => (
                    <span
                      key={status}
                      className={cn("h-1.5 w-1.5 rounded-full", orderStatusMeta[status].calendar)}
                    />
                  ))}
                </div>
              )}
              {dayOrders.length > 0 && (
                <span className="mt-auto text-[10px] font-medium text-primary-900/50">
                  {dayOrders.length} booking{dayOrders.length > 1 ? "s" : ""}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 border-t border-primary-900/8 pt-4">
        {Object.entries(orderStatusMeta).map(([status, meta]) => (
          <span key={status} className="flex items-center gap-1.5 text-xs text-primary-900/60">
            <span className={cn("h-2 w-2 rounded-full", meta.calendar)} />
            {meta.label}
          </span>
        ))}
      </div>
    </div>
  );
}
