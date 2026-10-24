"use client";

import { useMemo, useState } from "react";
import { LayoutList, Plus, Search, CalendarDays } from "lucide-react";
import { useAllOrders } from "@/lib/hooks/useOrders";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { OrdersCalendar } from "@/components/admin/OrdersCalendar";
import { OrderDetailModal } from "@/components/admin/OrderDetailModal";
import { DayOrdersPanel } from "@/components/admin/DayOrdersPanel";
import { CreateOrderModal } from "@/components/admin/CreateOrderModal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SelectBox } from "@/components/ui/Field";
import { PageLoader } from "@/components/ui/Spinner";
import { orderStatusMeta } from "@/lib/utils/statusColor";
import type { Order, OrderStatus } from "@/lib/models/types";

type ViewMode = "table" | "calendar";

export default function AdminBookingsPage() {
  const { orders, isLoading, changeStatus, addOrderForUser } = useAllOrders();
  const [view, setView] = useState<ViewMode>("table");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedDay, setSelectedDay] = useState<{ dateKey: string; orders: Order[] } | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !o.patientName.toLowerCase().includes(q) &&
          !o.serviceName.toLowerCase().includes(q) &&
          !o.invoiceNumber.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [orders, statusFilter, search]);

  async function handleChangeStatus(id: string, status: OrderStatus) {
    await changeStatus(id, status);
    setSelectedOrder((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  }

  if (isLoading) return <PageLoader label="Loading bookings…" />;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-primary-950">Bookings</h1>
          <p className="mt-1 text-sm text-primary-900/60">
            All scheduled appointments — table and calendar views.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus size={16} /> New Booking
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex rounded-xl bg-primary-900/5 p-1">
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              view === "table" ? "bg-white text-primary-900 shadow-sm" : "text-primary-900/60"
            }`}
          >
            <LayoutList size={15} /> Table
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              view === "calendar" ? "bg-white text-primary-900 shadow-sm" : "text-primary-900/60"
            }`}
          >
            <CalendarDays size={15} /> Calendar
          </button>
        </div>

        {view === "table" && (
          <>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-900/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patient, service, invoice…"
                className="w-64 rounded-xl border border-primary-900/10 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <SelectBox
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "all")}
              className="w-44"
            >
              <option value="all">All statuses</option>
              {Object.entries(orderStatusMeta).map(([status, meta]) => (
                <option key={status} value={status}>
                  {meta.label}
                </option>
              ))}
            </SelectBox>
          </>
        )}
      </div>

      <Card className="mt-5 overflow-hidden">
        {view === "table" ? (
          <OrdersTable orders={filtered} onView={setSelectedOrder} />
        ) : (
          <OrdersCalendar
            orders={orders}
            onSelectDay={(dateKey, dayOrders) => setSelectedDay({ dateKey, orders: dayOrders })}
          />
        )}
      </Card>

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onChangeStatus={handleChangeStatus}
      />

      <DayOrdersPanel
        dateKey={selectedDay?.dateKey ?? null}
        orders={selectedDay?.orders ?? []}
        onClose={() => setSelectedDay(null)}
        onSelectOrder={(order) => {
          setSelectedDay(null);
          setSelectedOrder(order);
        }}
      />

      <CreateOrderModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={async (input) => {
          await addOrderForUser(input);
        }}
      />
    </div>
  );
}
