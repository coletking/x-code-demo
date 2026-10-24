import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth-server";
import { updateContactStatus } from "@/lib/repositories/contactsRepository";

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
  const { status } = body as { status?: "new" | "responded" };
  if (!status) return NextResponse.json({ error: "Status is required." }, { status: 400 });

  const contact = await updateContactStatus(id, status);
  if (!contact) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ contact });
}
