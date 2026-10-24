import { config } from "dotenv";
config({ path: ".env.local" });

import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] ?? "Super Admin";

if (!email || !password) {
  console.error("Usage: tsx scripts/create-admin.ts <email> <password> [name]");
  process.exit(1);
}

async function main() {
  const passwordHash = await bcrypt.hash(password, 10);
  const [existing] = await db.select().from(users).where(eq(users.email, email));

  if (existing) {
    await db
      .update(users)
      .set({ passwordHash, role: "admin", status: "active", name })
      .where(eq(users.id, existing.id));
    console.log("Updated existing user to admin:", email);
    return;
  }

  await db.insert(users).values({
    id: randomUUID(),
    name,
    email,
    phone: "+234 800 000 0000",
    passwordHash,
    role: "admin",
    status: "active",
  });
  console.log("Created admin:", email);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
