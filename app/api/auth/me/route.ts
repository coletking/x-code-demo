import { NextResponse } from "next/server";
import { getSessionUser, toPublicUser } from "@/lib/auth-server";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({ user: toPublicUser(user) });
}
