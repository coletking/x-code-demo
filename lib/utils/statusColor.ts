import type { OrderStatus, UserStatus } from "@/lib/models/types";

export const orderStatusMeta: Record<
  OrderStatus,
  { label: string; dot: string; badge: string; calendar: string }
> = {
  pending: {
    label: "Pending",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-800 ring-1 ring-amber-300",
    calendar: "bg-amber-400",
  },
  confirmed: {
    label: "Confirmed",
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300",
    calendar: "bg-emerald-500",
  },
  completed: {
    label: "Completed",
    dot: "bg-blue-500",
    badge: "bg-blue-100 text-blue-800 ring-1 ring-blue-300",
    calendar: "bg-blue-500",
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-800 ring-1 ring-red-300",
    calendar: "bg-red-500",
  },
  closed: {
    label: "Closed",
    dot: "bg-slate-500",
    badge: "bg-slate-200 text-slate-700 ring-1 ring-slate-300",
    calendar: "bg-slate-500",
  },
};

export const userStatusMeta: Record<
  UserStatus,
  { label: string; badge: string }
> = {
  active: { label: "Active", badge: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300" },
  suspended: { label: "Suspended", badge: "bg-amber-100 text-amber-800 ring-1 ring-amber-300" },
  blocked: { label: "Blocked", badge: "bg-red-100 text-red-800 ring-1 ring-red-300" },
};
