"use client";

import type { Order } from "@/lib/models/types";
import { Modal } from "@/components/ui/Modal";
import { OrderStatusBadge } from "@/components/shared/StatusBadge";
import { formatDisplayDate, formatDisplayTime } from "@/lib/utils/date";

export function DayOrdersPanel({
  dateKey,
  orders,
  onClose,
  onSelectOrder,
}: {
  dateKey: string | null;
  orders: Order[];
  onClose: () => void;
  onSelectOrder: (order: Order) => void;
}) {
  if (!dateKey) return null;

  return (
    <Modal open={!!dateKey} onClose={onClose} title={formatDisplayDate(dateKey)}>
      <div className="space-y-2">
        {orders
          .slice()
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((order) => (
            <button
              key={order.id}
              onClick={() => onSelectOrder(order)}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-primary-900/8 p-3 text-left transition-colors hover:border-primary-300 hover:bg-primary-50/60"
            >
              <div>
                <p className="text-sm font-medium text-primary-950">{order.patientName}</p>
                <p className="text-xs text-primary-900/55">
                  {formatDisplayTime(order.time)} · {order.serviceName}
                </p>
              </div>
              <OrderStatusBadge status={order.status} />
            </button>
          ))}
      </div>
    </Modal>
  );
}
