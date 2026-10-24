"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { useUsers } from "@/lib/hooks/useUsers";
import { services } from "@/lib/data/services";
import { formatCurrency } from "@/lib/utils/date";
import { useToast } from "@/components/ui/Toast";
import type { OrderStatus } from "@/lib/models/types";

export function CreateOrderModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (input: {
    targetUserId: string;
    serviceId: string;
    date: string;
    time: string;
    status: OrderStatus;
    notes?: string;
  }) => Promise<void>;
}) {
  const { users } = useUsers();
  const toast = useToast();
  const patients = users.filter((u) => u.role === "patient" && u.status === "active");

  const [targetUserId, setTargetUserId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<OrderStatus>("confirmed");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function reset() {
    setTargetUserId("");
    setServiceId("");
    setDate("");
    setTime("");
    setStatus("confirmed");
    setNotes("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!targetUserId || !serviceId || !date || !time) return;
    setIsSubmitting(true);
    try {
      await onCreate({ targetUserId, serviceId, date, time, status, notes });
      toast.success("Order created and added to the schedule.");
      reset();
      onClose();
    } catch {
      toast.error("Couldn't create the order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="New order / scheduled booking" widthClassName="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <SelectField label="Patient" required value={targetUserId} onChange={(e) => setTargetUserId(e.target.value)}>
          <option value="">Select a patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.email})
            </option>
          ))}
        </SelectField>

        <SelectField label="Service" required value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {formatCurrency(s.price)}
            </option>
          ))}
        </SelectField>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            label="Time"
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <SelectField label="Initial status" value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)}>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
        </SelectField>

        <TextAreaField
          label="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <Button type="submit" className="w-full" loading={isSubmitting}>
          Create order
        </Button>
      </form>
    </Modal>
  );
}
