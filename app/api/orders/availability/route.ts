import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth-server";
import { getAllOrders } from "@/lib/repositories/ordersRepository";

export async function GET(request: Request) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const date = new URL(request.url).searchParams.get("date");
  if (!date) return NextResponse.json({ error: "Date is required." }, { status: 400 });

  const orders = await getAllOrders();
  const bookedTimes = orders
    .filter((o) => o.date === date && o.status !== "cancelled")
    .map((o) => o.time);

  return NextResponse.json({ bookedTimes });
}
