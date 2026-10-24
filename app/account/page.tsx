"use client";

import Link from "next/link";
import { CalendarPlus, FileText } from "lucide-react";
import { useAuth } from "@/lib/hooks/AuthProvider";
import { useUserOrders } from "@/lib/hooks/useOrders";
import { OrderStatusBadge } from "@/components/shared/StatusBadge";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageLoader } from "@/components/ui/Spinner";
import { formatCurrency, formatDisplayDate, formatDisplayTime } from "@/lib/utils/date";

export default function AccountPage() {
  const { user, isLoading } = useAuth();
  const { orders, isLoading: ordersLoading } = useUserOrders(user?.id);

  if (isLoading || ordersLoading) return <PageLoader label="Loading your appointments…" />;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-primary-950">
            Welcome{user ? `, ${user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-1 text-sm text-primary-900/60">
            Here are your appointments and invoices.
          </p>
        </div>
        <LinkButton href="/account/book">
          <CalendarPlus size={16} /> Book Appointment
        </LinkButton>
      </div>

      {orders.length === 0 ? (
        <Card className="mt-8 flex flex-col items-center gap-3 p-12 text-center">
          <FileText size={32} className="text-primary-900/30" />
          <p className="text-sm text-primary-900/60">
            You don&rsquo;t have any appointments yet.
          </p>
          <LinkButton href="/account/book" size="sm">
            Book your first appointment
          </LinkButton>
        </Card>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <Link key={order.id} href={`/account/orders/${order.id}`}>
              <Card className="h-full p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display text-base text-primary-950">
                    {order.serviceName}
                  </p>
                  <OrderStatusBadge status={order.status} />
                </div>
                <p className="mt-2 text-sm text-primary-900/60">
                  {formatDisplayDate(order.date)} · {formatDisplayTime(order.time)}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-primary-900/50">{order.invoiceNumber}</span>
                  <span className="font-semibold text-primary-800">
                    {formatCurrency(order.price)}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
