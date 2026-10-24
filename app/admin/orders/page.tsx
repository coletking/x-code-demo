"use client";

import { useMemo, useState } from "react";
import { Clock3, Eye, Receipt, Search, Wallet } from "lucide-react";
import { useAllOrders } from "@/lib/hooks/useOrders";
import { OrderDetailModal } from "@/components/admin/OrderDetailModal";
import { OrderStatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/admin/StatCard";
import { PageLoader } from "@/components/ui/Spinner";
import { formatCurrency, formatDisplayDate } from "@/lib/utils/date";
import type { Order, OrderStatus, PaymentStatus } from "@/lib/models/types";

type PaymentFilter = "all" | PaymentStatus;

const paymentBadge: Record<PaymentStatus, string> = {
  paid: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300",
  unpaid: "bg-amber-100 text-amber-800 ring-1 ring-amber-300",
};

export default function AdminOrdersLedgerPage() {
  const { orders, isLoading, changeStatus } = useAllOrders();
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    return orders
      .filter((o) => paymentFilter === "all" || o.paymentStatus === paymentFilter)
      .filter((o) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          o.patientName.toLowerCase().includes(q) ||
          o.invoiceNumber.toLowerCase().includes(q) ||
          o.serviceName.toLowerCase().includes(q)
        );
      });
  }, [orders, paymentFilter, search]);

  async function handleChangeStatus(id: string, status: OrderStatus) {
    await changeStatus(id, status);
    setSelectedOrder((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  }

  if (isLoading) return <PageLoader label="Loading orders…" />;

  const revenueCollected = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.price, 0);
  const revenuePending = orders
    .filter((o) => o.paymentStatus === "unpaid")
    .reduce((sum, o) => sum + o.price, 0);

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl text-primary-950">Orders</h1>
        <p className="mt-1 text-sm text-primary-900/60">
          The financial ledger — invoices and payment status for every booking.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard icon={Receipt} label="Total invoices" value={orders.length} />
        <StatCard icon={Wallet} label="Revenue collected" value={formatCurrency(revenueCollected)} tone="gold" />
        <StatCard icon={Clock3} label="Pending payment" value={formatCurrency(revenuePending)} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-900/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient, service, invoice…"
            className="w-64 rounded-xl border border-primary-900/10 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value as PaymentFilter)}
          className="rounded-xl border border-primary-900/10 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        >
          <option value="all">All payment statuses</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      <Card className="mt-5 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-primary-900/50">
            No orders match these filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary-900/8 text-xs text-primary-900/50">
                  <th className="px-5 py-3 font-medium">Invoice</th>
                  <th className="px-5 py-3 font-medium">Patient</th>
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Payment</th>
                  <th className="px-5 py-3 font-medium">Order status</th>
                  <th className="px-5 py-3 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-900/6">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-primary-50/50">
                    <td className="px-5 py-3 font-medium text-primary-950">{order.invoiceNumber}</td>
                    <td className="px-5 py-3">
                      <p className="text-primary-950">{order.patientName}</p>
                      <p className="text-xs text-primary-900/50">{order.patientEmail}</p>
                    </td>
                    <td className="px-5 py-3 text-primary-900/75">{order.serviceName}</td>
                    <td className="px-5 py-3 text-primary-900/75">{formatDisplayDate(order.date)}</td>
                    <td className="px-5 py-3 font-medium text-primary-800">{formatCurrency(order.price)}</td>
                    <td className="px-5 py-3">
                      <Badge className={paymentBadge[order.paymentStatus]}>
                        {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-50"
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onChangeStatus={handleChangeStatus}
      />
    </div>
  );
}
