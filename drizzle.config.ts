import { defineConfig } from "drizzle-kit";
import fs from "node:fs";
import path from "node:path";

function loadDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const envPath = path.join(__dirname, ".env.local");
  const content = fs.readFileSync(envPath, "utf-8");
  const match = content.match(/^DATABASE_URL=(.+)$/m);
  if (!match) throw new Error("DATABASE_URL not found in .env.local");
  return match[1].trim();
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: loadDatabaseUrl(),
  },
});
