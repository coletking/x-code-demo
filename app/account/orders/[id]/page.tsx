"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import type { Order } from "@/lib/models/types";
import { InvoiceCard } from "@/components/shared/InvoiceCard";
import { Button } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/Spinner";

export default function PatientOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => (res.ok ? res.json() : { order: null }))
      .then((data) => setOrder(data.order ?? null))
      .catch(() => setOrder(null));
  }, [params.id]);

  if (order === undefined) return <PageLoader />;

  if (!order) {
    return (
      <div className="text-center">
        <p className="text-primary-900/60">Appointment not found.</p>
        <Button variant="ghost" className="mt-3" onClick={() => router.push("/account")}>
          <ArrowLeft size={16} /> Back to My Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <button
        onClick={() => router.push("/account")}
        className="mb-6 flex items-center gap-1.5 text-sm font-medium text-primary-900/60 hover:text-primary-900"
      >
        <ArrowLeft size={16} /> Back to My Orders
      </button>
      <InvoiceCard order={order} />
    </div>
  );
}
