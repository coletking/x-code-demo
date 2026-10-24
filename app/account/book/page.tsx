"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import { medicalServices, aestheticServices, getServiceById } from "@/lib/data/services";
import { useAuth } from "@/lib/hooks/AuthProvider";
import { useUserOrders } from "@/lib/hooks/useOrders";
import { generateTimeSlots, toDateKey, formatDisplayDate, formatDisplayTime, formatCurrency } from "@/lib/utils/date";
import { TextAreaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InvoiceCard } from "@/components/shared/InvoiceCard";
import { useToast } from "@/components/ui/Toast";
import type { Order, ServiceCategory } from "@/lib/models/types";

const steps = ["Service", "Schedule", "Review", "Invoice"] as const;

function nextDays(count: number): Date[] {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function BookAppointmentPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { bookOrder } = useUserOrders(user?.id);
  const toast = useToast();

  const [stepIndex, setStepIndex] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [category, setCategory] = useState<ServiceCategory>("medical");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [paidStatusMessage, setPaidStatusMessage] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const days = useMemo(() => nextDays(14), []);
  const slots = useMemo(() => generateTimeSlots(), []);
  const service = serviceId ? getServiceById(serviceId) : null;
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!dateKey) {
      setBookedSlots(new Set());
      return;
    }
    fetch(`/api/orders/availability?date=${dateKey}`)
      .then((res) => res.json())
      .then((data) => setBookedSlots(new Set(data.bookedTimes ?? [])))
      .catch(() => setBookedSlots(new Set()));
  }, [dateKey]);

  const list = category === "medical" ? medicalServices : aestheticServices;

  function goTo(index: number) {
    setStepIndex(Math.max(0, Math.min(steps.length - 1, index)));
  }

  async function handleConfirmBooking() {
    if (!user || !service || !dateKey || !time) return;
    setIsBooking(true);
    try {
      const order = await bookOrder({ serviceId: service.id, date: dateKey, time, notes });
      if (order) {
        setCreatedOrder(order);
        toast.success("Appointment request received — invoice generated.");
        goTo(3);
      }
    } catch {
      toast.error("Couldn't book that slot. Please try again.");
    } finally {
      setIsBooking(false);
    }
  }

  function handlePay() {
    setPaidStatusMessage(
      "Online payment isn't connected in this demo — your request has been received as Pending. Our team will confirm payment and your visit."
    );
    toast.info("Payment gateway not connected in this demo.");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl text-primary-950">Book an Appointment</h1>
      <p className="mt-1 text-sm text-primary-900/60">
        Choose a service, pick a time, and confirm — it only takes a minute.
      </p>

      <div className="mt-6 flex items-center gap-2">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                i <= stepIndex ? "bg-primary-700 text-white" : "bg-primary-900/10 text-primary-900/40"
              }`}
            >
              {i + 1}
            </div>
            <span className={`hidden text-xs font-medium sm:inline ${i <= stepIndex ? "text-primary-900" : "text-primary-900/40"}`}>
              {label}
            </span>
            {i < steps.length - 1 && <div className="h-px flex-1 bg-primary-900/10" />}
          </div>
        ))}
      </div>

      <motion.div
        key={stepIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8"
      >
        {stepIndex === 0 && (
          <div>
            <div className="flex gap-2">
              {(["medical", "aesthetic"] as ServiceCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                    category === cat
                      ? "bg-primary-800 text-white"
                      : "bg-primary-900/5 text-primary-900/60 hover:bg-primary-900/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {list.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setServiceId(s.id)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    serviceId === s.id
                      ? "border-primary-700 bg-primary-50 shadow-sm"
                      : "border-primary-900/8 bg-white hover:border-primary-300"
                  }`}
                >
                  <p className="font-medium text-primary-950">{s.name}</p>
                  <p className="mt-1 text-xs text-primary-900/55">{s.description}</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-semibold text-primary-800">{formatCurrency(s.price)}</span>
                    <span className="text-primary-900/50">{s.durationMinutes} mins</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button disabled={!serviceId} onClick={() => goTo(1)}>
                Continue <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}

        {stepIndex === 1 && (
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-primary-900">
              <CalendarDays size={16} /> Choose a date
            </p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              {days.map((d) => {
                const key = toDateKey(d);
                const active = dateKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setDateKey(key);
                      setTime(null);
                    }}
                    className={`flex shrink-0 flex-col items-center rounded-xl px-3.5 py-2.5 text-xs font-medium transition-colors ${
                      active ? "bg-primary-800 text-white" : "bg-primary-900/5 text-primary-900/70 hover:bg-primary-900/10"
                    }`}
                  >
                    <span>{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                    <span className="mt-0.5 text-sm font-semibold">{d.getDate()}</span>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm font-medium text-primary-900">Choose a time</p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((slot) => {
                const taken = bookedSlots.has(slot);
                const active = time === slot;
                return (
                  <button
                    key={slot}
                    disabled={!dateKey || taken}
                    onClick={() => setTime(slot)}
                    className={`rounded-xl px-2 py-2 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      active ? "bg-primary-800 text-white" : "bg-primary-900/5 text-primary-900/70 hover:bg-primary-900/10"
                    }`}
                  >
                    {formatDisplayTime(slot)}
                    {taken && <span className="block text-[10px] text-red-500">Booked</span>}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="ghost" onClick={() => goTo(0)}>
                <ArrowLeft size={16} /> Back
              </Button>
              <Button disabled={!dateKey || !time} onClick={() => goTo(2)}>
                Continue <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}

        {stepIndex === 2 && service && dateKey && time && (
          <div>
            <Card className="p-5">
              <p className="font-display text-lg text-primary-950">{service.name}</p>
              <p className="mt-1 text-sm text-primary-900/60">
                {formatDisplayDate(dateKey)} · {formatDisplayTime(time)}
              </p>
              <p className="mt-3 text-sm text-primary-900/70">{service.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-primary-900/8 pt-4 text-sm font-semibold">
                <span className="text-primary-950">Total</span>
                <span className="text-primary-800">{formatCurrency(service.price)}</span>
              </div>
            </Card>

            <div className="mt-5">
              <TextAreaField
                label="Anything we should know? (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g. first visit, specific concerns, previous diagnosis..."
              />
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="ghost" onClick={() => goTo(1)}>
                <ArrowLeft size={16} /> Back
              </Button>
              <Button onClick={handleConfirmBooking} loading={isBooking}>
                Confirm &amp; Generate Invoice <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}

        {stepIndex === 3 && createdOrder && (
          <div>
            <InvoiceCard order={createdOrder} />

            {!paidStatusMessage ? (
              <Button className="mt-5 w-full" size="lg" onClick={handlePay}>
                <CreditCard size={18} /> Pay Now
              </Button>
            ) : (
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <p>{paidStatusMessage}</p>
              </div>
            )}

            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() => router.push(`/account/orders/${createdOrder.id}`)}
            >
              View in My Orders
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
