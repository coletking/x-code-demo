import "server-only";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import type { User, UserStatus } from "@/lib/models/types";

function toUser(row: typeof users.$inferSelect): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    password: row.passwordHash,
    role: row.role,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function getAllUsers(): Promise<User[]> {
  const rows = await db.select().from(users);
  return rows.map(toUser);
}

export async function getUserById(id: string): Promise<User | undefined> {
  const [row] = await db.select().from(users).where(eq(users.id, id));
  return row ? toUser(row) : undefined;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const normalized = email.trim().toLowerCase();
  const rows = await db.select().from(users);
  const row = rows.find((u) => u.email.toLowerCase() === normalized);
  return row ? toUser(row) : undefined;
}

export async function createUser(input: {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: "admin" | "patient";
  status: UserStatus;
}): Promise<User> {
  const [row] = await db
    .insert(users)
    .values({ id: randomUUID(), ...input })
    .returning();
  return toUser(row);
}

export async function updateUserStatus(id: string, status: UserStatus): Promise<User | undefined> {
  const [row] = await db.update(users).set({ status }).where(eq(users.id, id)).returning();
  return row ? toUser(row) : undefined;
}
