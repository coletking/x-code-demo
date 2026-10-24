import { Stethoscope } from "lucide-react";
import type { Order } from "@/lib/models/types";
import { formatCurrency, formatDisplayDate, formatDisplayTime } from "@/lib/utils/date";
import { OrderStatusBadge } from "@/components/shared/StatusBadge";

export function InvoiceCard({ order }: { order: Order }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary-900/8 bg-white shadow-[0_2px_10px_-6px_rgba(15,33,31,0.12)]">
      <div className="flex items-center justify-between bg-primary-950 px-6 py-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-gold-300">
            <Stethoscope size={16} />
          </span>
          <div>
            <p className="font-display text-sm text-white">The Luxe Medical Clinic</p>
            <p className="text-[11px] text-primary-200/70">Lekki Phase 1, Lagos</p>
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="space-y-5 px-6 py-6">
        <div className="flex flex-wrap items-start justify-between gap-4 text-sm">
          <div>
            <p className="text-primary-900/50">Invoice</p>
            <p className="font-medium text-primary-950">{order.invoiceNumber}</p>
          </div>
          <div>
            <p className="text-primary-900/50">Patient</p>
            <p className="font-medium text-primary-950">{order.patientName}</p>
          </div>
          <div>
            <p className="text-primary-900/50">Appointment</p>
            <p className="font-medium text-primary-950">
              {formatDisplayDate(order.date)} · {formatDisplayTime(order.time)}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-primary-900/8">
          <div className="flex items-center justify-between px-4 py-3 text-sm">
            <div>
              <p className="font-medium text-primary-950">{order.serviceName}</p>
              <p className="text-xs text-primary-900/50 capitalize">{order.serviceCategory} service</p>
            </div>
            <p className="font-medium text-primary-950">{formatCurrency(order.price)}</p>
          </div>
          <div className="flex items-center justify-between border-t border-primary-900/8 px-4 py-3 text-sm font-semibold">
            <p className="text-primary-950">Total due</p>
            <p className="text-primary-800">{formatCurrency(order.price)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-primary-50/70 px-4 py-3 text-xs text-primary-900/70">
          <span>Payment status</span>
          <span className="font-medium capitalize text-primary-900">
            {order.paymentStatus}
          </span>
        </div>

        {order.notes && (
          <p className="text-xs text-primary-900/50">Note: {order.notes}</p>
        )}
      </div>
    </div>
  );
}
