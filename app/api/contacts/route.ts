import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth-server";
import { createContact, getAllContacts } from "@/lib/repositories/contactsRepository";

export async function GET() {
  const session = await getSessionUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const contacts = await getAllContacts();
  return NextResponse.json({ contacts });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, message, source } = body as {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    source?: "contact-form" | "manual";
  };

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (source === "manual") {
    const session = await getSessionUser();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const contact = await createContact({
    name,
    email,
    phone,
    message,
    source: source ?? "contact-form",
  });
  return NextResponse.json({ contact }, { status: 201 });
}
