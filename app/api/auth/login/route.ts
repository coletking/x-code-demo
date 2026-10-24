import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/repositories/usersRepository";
import { encodeSession, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/session";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  if (user.status === "blocked") {
    return NextResponse.json(
      { error: "This account has been blocked. Contact the clinic." },
      { status: 403 }
    );
  }
  if (user.status === "suspended") {
    return NextResponse.json(
      { error: "This account is suspended. Contact the clinic." },
      { status: 403 }
    );
  }

  const response = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
  response.cookies.set(SESSION_COOKIE_NAME, encodeSession({ userId: user.id, role: user.role }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
