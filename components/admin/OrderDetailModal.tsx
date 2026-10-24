"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/models/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/Field";
import { InvoiceCard } from "@/components/shared/InvoiceCard";
import { orderStatusMeta } from "@/lib/utils/statusColor";

const statusOptions: OrderStatus[] = ["pending", "confirmed", "completed", "cancelled", "closed"];

export function OrderDetailModal({
  order,
  onClose,
  onChangeStatus,
}: {
  order: Order | null;
  onClose: () => void;
  onChangeStatus: (id: string, status: OrderStatus) => Promise<void>;
}) {
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);

  if (!order) return null;
  const currentOrder = order;

  async function handleChange(status: OrderStatus) {
    setPendingStatus(status);
    try {
      await onChangeStatus(currentOrder.id, status);
    } finally {
      setPendingStatus(null);
    }
  }

  return (
    <Modal open={!!order} onClose={onClose} title="Order details" widthClassName="max-w-xl">
      <InvoiceCard order={order} />

      <div className="mt-5 space-y-3">
        <SelectField
          label="Update status"
          value={order.status}
          disabled={pendingStatus !== null}
          onChange={(e) => handleChange(e.target.value as OrderStatus)}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {orderStatusMeta[status].label}
            </option>
          ))}
        </SelectField>

        {order.status !== "closed" && (
          <Button
            variant="outline"
            className="w-full"
            loading={pendingStatus === "closed"}
            onClick={() => handleChange("closed")}
          >
            <Lock size={15} /> Close order
          </Button>
        )}
      </div>
    </Modal>
  );
}
