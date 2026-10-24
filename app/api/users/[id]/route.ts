import { NextResponse } from "next/server";
import { getSessionUser, toPublicUser } from "@/lib/auth-server";
import { updateUserStatus } from "@/lib/repositories/usersRepository";
import type { UserStatus } from "@/lib/models/types";

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
  const { status } = body as { status?: UserStatus };
  if (!status) return NextResponse.json({ error: "Status is required." }, { status: 400 });

  const user = await updateUserStatus(id, status);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ user: toPublicUser(user) });
}
