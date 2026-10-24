import "server-only";
import { cookies } from "next/headers";
import { decodeSession, SESSION_COOKIE_NAME } from "@/lib/session";
import { getUserById } from "@/lib/repositories/usersRepository";
import type { User } from "@/lib/models/types";

export async function getSessionUser(): Promise<User | null> {
  const store = await cookies();
  const session = decodeSession(store.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return null;
  const user = await getUserById(session.userId);
  return user ?? null;
}

export function toPublicUser(user: User) {
  const { password, ...rest } = user;
  void password;
  return rest;
}
