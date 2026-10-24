import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth-server";
import {
  createOrder,
  getAllOrders,
  getOrdersByUser,
} from "@/lib/repositories/ordersRepository";
import { getUserById } from "@/lib/repositories/usersRepository";
import { getServiceById } from "@/lib/data/services";

export async function GET() {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = session.role === "admin" ? await getAllOrders() : await getOrdersByUser(session.id);
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { serviceId, date, time, notes, targetUserId, status } = body as {
    serviceId?: string;
    date?: string;
    time?: string;
    notes?: string;
    targetUserId?: string;
    status?: "pending" | "confirmed";
  };

  if (!serviceId || !date || !time) {
    return NextResponse.json({ error: "Service, date, and time are required." }, { status: 400 });
  }

  const service = getServiceById(serviceId);
  if (!service) {
    return NextResponse.json({ error: "Unknown service." }, { status: 400 });
  }

  const isAdmin = session.role === "admin";
  const patient = isAdmin && targetUserId ? await getUserById(targetUserId) : session;
  if (!patient) {
    return NextResponse.json({ error: "Patient not found." }, { status: 404 });
  }

  const order = await createOrder({
    userId: patient.id,
    patientName: patient.name,
    patientEmail: patient.email,
    patientPhone: patient.phone,
    serviceId: service.id,
    serviceName: service.name,
    serviceCategory: service.category,
    price: service.price,
    date,
    time,
    status: isAdmin ? status ?? "confirmed" : "pending",
    paymentStatus: "unpaid",
    notes,
    createdBy: isAdmin ? "admin" : "patient",
  });

  return NextResponse.json({ order }, { status: 201 });
}
