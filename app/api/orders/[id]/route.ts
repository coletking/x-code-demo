import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth-server";
import { getOrderById, updateOrderStatus } from "@/lib/repositories/ordersRepository";
import type { OrderStatus } from "@/lib/models/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (session.role !== "admin" && order.userId !== session.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return NextResponse.json({ order });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const { status } = body as { status?: OrderStatus };
  if (!status) return NextResponse.json({ error: "Status is required." }, { status: 400 });

  const isSettled = status === "completed" || status === "closed";
  const order = await updateOrderStatus(
    id,
    isSettled ? { status, paymentStatus: "paid" } : { status }
  );
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ order });
}
