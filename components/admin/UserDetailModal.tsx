"use client";

import { useState } from "react";
import { Ban, CheckCircle2, PauseCircle } from "lucide-react";
import type { Order, UserStatus } from "@/lib/models/types";
import type { PublicUser } from "@/lib/hooks/useUsers";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { UserStatusBadge, OrderStatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDisplayDate, formatDisplayTime } from "@/lib/utils/date";

export function UserDetailModal({
  user,
  orders,
  onClose,
  onSetStatus,
}: {
  user: PublicUser | null;
  orders: Order[];
  onClose: () => void;
  onSetStatus: (id: string, status: UserStatus) => Promise<void>;
}) {
  const [pending, setPending] = useState<UserStatus | null>(null);

  if (!user) return null;
  const currentUser = user;

  async function handleSetStatus(status: UserStatus) {
    setPending(status);
    try {
      await onSetStatus(currentUser.id, status);
    } finally {
      setPending(null);
    }
  }

  return (
    <Modal open={!!user} onClose={onClose} title={user.name} widthClassName="max-w-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-primary-900/70">{user.email}</p>
          <p className="text-sm text-primary-900/50">{user.phone}</p>
        </div>
        <UserStatusBadge status={user.status} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          loading={pending === "active"}
          disabled={user.status === "active"}
          onClick={() => handleSetStatus("active")}
        >
          <CheckCircle2 size={14} /> Activate
        </Button>
        <Button
          size="sm"
          variant="outline"
          loading={pending === "suspended"}
          disabled={user.status === "suspended"}
          onClick={() => handleSetStatus("suspended")}
        >
          <PauseCircle size={14} /> Suspend
        </Button>
        <Button
          size="sm"
          variant="danger"
          loading={pending === "blocked"}
          disabled={user.status === "blocked"}
          onClick={() => handleSetStatus("blocked")}
        >
          <Ban size={14} /> Block
        </Button>
      </div>

      <div className="mt-6 border-t border-primary-900/8 pt-4">
        <p className="text-sm font-medium text-primary-900">Order history</p>
        <div className="mt-3 max-h-64 space-y-2 overflow-y-auto">
          {orders.length === 0 && (
            <p className="text-sm text-primary-900/50">No orders yet.</p>
          )}
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-primary-900/8 p-3 text-sm"
            >
              <div>
                <p className="font-medium text-primary-950">{order.serviceName}</p>
                <p className="text-xs text-primary-900/50">
                  {formatDisplayDate(order.date)} · {formatDisplayTime(order.time)} · {formatCurrency(order.price)}
                </p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
