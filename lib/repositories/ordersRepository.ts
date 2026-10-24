import "server-only";
import { randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { orders } from "@/lib/db/schema";
import type { Order, OrderStatus, PaymentStatus } from "@/lib/models/types";

function toOrder(row: typeof orders.$inferSelect): Order {
  return {
    id: row.id,
    invoiceNumber: row.invoiceNumber,
    userId: row.userId,
    patientName: row.patientName,
    patientEmail: row.patientEmail,
    patientPhone: row.patientPhone,
    serviceId: row.serviceId,
    serviceName: row.serviceName,
    serviceCategory: row.serviceCategory,
    price: row.price,
    date: row.date,
    time: row.time,
    status: row.status,
    paymentStatus: row.paymentStatus,
    notes: row.notes ?? undefined,
    createdBy: row.createdBy,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function getAllOrders(): Promise<Order[]> {
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt));
  return rows.map(toOrder);
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const [row] = await db.select().from(orders).where(eq(orders.id, id));
  return row ? toOrder(row) : undefined;
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));
  return rows.map(toOrder);
}

export async function createOrder(input: {
  userId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: "medical" | "aesthetic";
  price: number;
  date: string;
  time: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdBy: "patient" | "admin";
}): Promise<Order> {
  const countRow = await db.select().from(orders);
  const invoiceNumber = `LUXE-${String(countRow.length + 1001).padStart(5, "0")}`;

  const [row] = await db
    .insert(orders)
    .values({
      id: randomUUID(),
      invoiceNumber,
      ...input,
      notes: input.notes ?? null,
    })
    .returning();
  return toOrder(row);
}

export async function updateOrderStatus(
  id: string,
  patch: { status: OrderStatus; paymentStatus?: PaymentStatus }
): Promise<Order | undefined> {
  const [row] = await db
    .update(orders)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(orders.id, id))
    .returning();
  return row ? toOrder(row) : undefined;
}
