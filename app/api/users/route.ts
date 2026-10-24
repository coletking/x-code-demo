import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSessionUser, toPublicUser } from "@/lib/auth-server";
import { createUser, getAllUsers, getUserByEmail } from "@/lib/repositories/usersRepository";

export async function GET() {
  const session = await getSessionUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const users = await getAllUsers();
  return NextResponse.json({ users: users.map(toPublicUser) });
}

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { name, email, phone, password } = body as {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
  };

  if (!name || !email || !phone || !password) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const existing = await getUserByEmail(email);
  if (existing) {
    return NextResponse.json(
      { error: "A user with this email already exists." },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({
    name,
    email,
    phone,
    passwordHash,
    role: "patient",
    status: "active",
  });

  return NextResponse.json({ user: toPublicUser(user) }, { status: 201 });
}
