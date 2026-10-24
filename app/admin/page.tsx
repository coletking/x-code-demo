"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  Globe2,
  MessageSquare,
  ReceiptText,
  Users as UsersIcon,
} from "lucide-react";
import { useAllOrders } from "@/lib/hooks/useOrders";
import { useUsers } from "@/lib/hooks/useUsers";
import { useContacts } from "@/lib/hooks/useContacts";
import { StatCard } from "@/components/admin/StatCard";
import { OrderStatusBadge } from "@/components/shared/StatusBadge";
import { Card } from "@/components/ui/Card";
import { PageLoader } from "@/components/ui/Spinner";
import { formatCurrency, formatDisplayDate, formatDisplayTime } from "@/lib/utils/date";
import { orderStatusMeta } from "@/lib/utils/statusColor";
import type { OrderStatus } from "@/lib/models/types";

export default function AdminDashboardPage() {
  const { orders, isLoading: ordersLoading } = useAllOrders();
  const { users, isLoading: usersLoading } = useUsers();
  const { contacts, isLoading: contactsLoading } = useContacts();
  const [breakdown, setBreakdown] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => (res.ok ? res.json() : { breakdown: {} }))
      .then((data) => setBreakdown(data.breakdown ?? {}))
      .catch(() => setBreakdown({}));
  }, []);

  if (ordersLoading || usersLoading || contactsLoading) {
    return <PageLoader label="Loading dashboard…" />;
  }

  const statusCounts = orders.reduce<Record<OrderStatus, number>>(
    (acc, o) => {
      acc[o.status] = (acc[o.status] ?? 0) + 1;
      return acc;
    },
    { pending: 0, confirmed: 0, completed: 0, cancelled: 0, closed: 0 }
  );
  const revenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.price, 0);
  const newContacts = contacts.filter((c) => c.status === "new").length;
  const recentOrders = orders.slice(0, 6);
  const totalVisits = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return (
    <div>
      <h1 className="font-display text-2xl text-primary-950">Dashboard</h1>
      <p className="mt-1 text-sm text-primary-900/60">
        Overview of appointments, patients, and inquiries.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={CalendarRange}
          label="Total orders"
          value={orders.length}
          href="/admin/orders"
        />
        <StatCard
          icon={UsersIcon}
          label="Registered patients"
          value={users.filter((u) => u.role === "patient").length}
          tone="gold"
          href="/admin/users"
        />
        <StatCard
          icon={MessageSquare}
          label="New contact inquiries"
          value={newContacts}
          href="/admin/contacts"
        />
        <StatCard
          icon={ReceiptText}
          label="Revenue collected"
          value={formatCurrency(revenue)}
          tone="gold"
          href="/admin/orders"
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <Link
            href="/admin/orders"
            className="group flex items-center justify-between font-display text-base text-primary-950"
          >
            Orders by status
            <ArrowRight size={14} className="text-primary-900/30 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <div className="mt-4 space-y-3">
            {(Object.keys(statusCounts) as OrderStatus[]).map((status) => {
              const count = statusCounts[status];
              const pct = orders.length ? Math.round((count / orders.length) * 100) : 0;
              return (
                <div key={status}>
                  <div className="flex items-center justify-between text-xs text-primary-900/60">
                    <span>{orderStatusMeta[status].label}</span>
                    <span>{count}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-primary-900/8">
                    <div
                      className={`h-2 rounded-full ${orderStatusMeta[status].calendar}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <p className="flex items-center gap-2 font-display text-base text-primary-950">
            <Globe2 size={16} className="text-gold-600" /> Acquisition sources
          </p>
          <p className="mt-1 text-xs text-primary-900/50">{totalVisits} tracked first visits</p>
          <div className="mt-4 space-y-2">
            {Object.entries(breakdown).length === 0 && (
              <p className="text-xs text-primary-900/50">No visit data yet.</p>
            )}
            {Object.entries(breakdown).map(([source, count]) => (
              <div key={source} className="flex items-center justify-between text-sm">
                <span className="text-primary-900/70">{source}</span>
                <span className="font-medium text-primary-950">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden">
        <Link
          href="/admin/orders"
          className="group flex items-center justify-between border-b border-primary-900/8 px-5 py-4"
        >
          <p className="font-display text-base text-primary-950">Recent orders</p>
          <ArrowRight size={14} className="text-primary-900/30 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <div className="divide-y divide-primary-900/8">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href="/admin/orders"
              className="flex items-center justify-between gap-4 px-5 py-3 text-sm hover:bg-primary-50/50"
            >
              <div>
                <p className="font-medium text-primary-950">{order.patientName}</p>
                <p className="text-xs text-primary-900/50">
                  {order.serviceName} · {formatDisplayDate(order.date)} · {formatDisplayTime(order.time)}
                </p>
              </div>
              <OrderStatusBadge status={order.status} />
            </Link>
          ))}
          {recentOrders.length === 0 && (
            <p className="px-5 py-6 text-center text-sm text-primary-900/50">No orders yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
