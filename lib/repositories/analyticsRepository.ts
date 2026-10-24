import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db/client";
import { acquisitionEvents } from "@/lib/db/schema";
import type { AcquisitionSource } from "@/lib/models/types";

export async function recordEvent(input: {
  source: AcquisitionSource;
  referrer: string;
  path: string;
}): Promise<void> {
  await db.insert(acquisitionEvents).values({ id: randomUUID(), ...input });
}

export async function getAcquisitionBreakdown(): Promise<Record<string, number>> {
  const rows = await db.select().from(acquisitionEvents);
  return rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.source] = (acc[row.source] ?? 0) + 1;
    return acc;
  }, {});
}
