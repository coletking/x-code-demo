import "server-only";
import { randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { contacts } from "@/lib/db/schema";
import type { Contact, ContactSource, ContactStatus } from "@/lib/models/types";

function toContact(row: typeof contacts.$inferSelect): Contact {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    source: row.source,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function getAllContacts(): Promise<Contact[]> {
  const rows = await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  return rows.map(toContact);
}

export async function createContact(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
  source: ContactSource;
}): Promise<Contact> {
  const [row] = await db
    .insert(contacts)
    .values({ id: randomUUID(), ...input, status: "new" })
    .returning();
  return toContact(row);
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus
): Promise<Contact | undefined> {
  const [row] = await db
    .update(contacts)
    .set({ status })
    .where(eq(contacts.id, id))
    .returning();
  return row ? toContact(row) : undefined;
}
