import { config } from "dotenv";
config({ path: ".env.local" });

import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db/client";
import { acquisitionEvents, contacts, orders, users } from "@/lib/db/schema";
import { services } from "@/lib/data/services";
import { toDateKey } from "@/lib/utils/date";
import {
  DEMO_ADMIN_EMAIL,
  DEMO_ADMIN_PASSWORD,
  DEMO_PATIENT_EMAIL,
  DEMO_PATIENT_PASSWORD,
} from "@/lib/demoAccounts";
import type { OrderStatus } from "@/lib/models/types";

async function main() {
  console.log("Clearing existing demo data...");
  await db.delete(orders);
  await db.delete(contacts);
  await db.delete(acquisitionEvents);
  await db.delete(users);

  console.log("Seeding users...");
  const now = new Date();

  const userRows = [
    {
      id: randomUUID(),
      name: "Clinic Admin",
      email: DEMO_ADMIN_EMAIL,
      phone: "+234 801 000 0000",
      passwordHash: await bcrypt.hash(DEMO_ADMIN_PASSWORD, 10),
      role: "admin" as const,
      status: "active" as const,
    },
    {
      id: randomUUID(),
      name: "Amara Okafor",
      email: DEMO_PATIENT_EMAIL,
      phone: "+234 802 111 2222",
      passwordHash: await bcrypt.hash(DEMO_PATIENT_PASSWORD, 10),
      role: "patient" as const,
      status: "active" as const,
    },
    {
      id: randomUUID(),
      name: "Tunde Bakare",
      email: "tunde.bakare@example.com",
      phone: "+234 803 222 3333",
      passwordHash: await bcrypt.hash("patient123", 10),
      role: "patient" as const,
      status: "active" as const,
    },
    {
      id: randomUUID(),
      name: "Chidinma Eze",
      email: "chidinma.eze@example.com",
      phone: "+234 804 333 4444",
      passwordHash: await bcrypt.hash("patient123", 10),
      role: "patient" as const,
      status: "suspended" as const,
    },
  ];

  await db.insert(users).values(userRows);
  const patients = userRows.filter((u) => u.role === "patient");

  console.log("Seeding orders...");
  const statuses: OrderStatus[] = ["pending", "confirmed", "completed", "cancelled", "closed"];
  const times = ["09:00", "10:30", "11:00", "13:00", "14:30", "15:30", "16:00"];

  const orderRows = Array.from({ length: 16 }).map((_, i) => {
    const patient = patients[i % patients.length];
    const service = services[i % services.length];
    const dayOffset = (i % 9) - 4;
    const date = new Date(now);
    date.setDate(now.getDate() + dayOffset);
    const status = statuses[i % statuses.length];
    const createdAt = new Date(date);
    createdAt.setDate(createdAt.getDate() - 2);

    return {
      id: randomUUID(),
      invoiceNumber: `LUXE-${String(1001 + i).padStart(5, "0")}`,
      userId: patient.id,
      patientName: patient.name,
      patientEmail: patient.email,
      patientPhone: patient.phone,
      serviceId: service.id,
      serviceName: service.name,
      serviceCategory: service.category,
      price: service.price,
      date: toDateKey(date),
      time: times[i % times.length],
      status,
      paymentStatus: (status === "completed" || status === "closed" ? "paid" : "unpaid") as
        | "paid"
        | "unpaid",
      notes: i % 4 === 0 ? "Follow-up requested after visit." : null,
      createdBy: (i % 5 === 0 ? "admin" : "patient") as "admin" | "patient",
      createdAt,
      updatedAt: createdAt,
    };
  });

  await db.insert(orders).values(orderRows);

  console.log("Seeding contacts...");
  const nowMs = Date.now();
  await db.insert(contacts).values([
    {
      id: randomUUID(),
      name: "Blessing Adeyemi",
      email: "blessing.a@example.com",
      phone: "+234 805 444 5555",
      message: "Do you accept Hygeia HMO for diagnostic lab tests?",
      source: "contact-form",
      status: "new",
      createdAt: new Date(nowMs - 1000 * 60 * 60 * 5),
    },
    {
      id: randomUUID(),
      name: "Ifeanyi Obi",
      email: "ifeanyi.obi@example.com",
      phone: "+234 806 555 6666",
      message: "Called to ask about microneedling aftercare. Advised to review post-care email.",
      source: "manual",
      status: "responded",
      createdAt: new Date(nowMs - 1000 * 60 * 60 * 24 * 2),
    },
    {
      id: randomUUID(),
      name: "Grace Umeh",
      email: "grace.umeh@example.com",
      phone: "+234 807 666 7777",
      message: "Interested in booking a women's health screening next week. What are your morning slots?",
      source: "contact-form",
      status: "new",
      createdAt: new Date(nowMs - 1000 * 60 * 30),
    },
  ]);

  console.log("Done. Admin login:", DEMO_ADMIN_EMAIL, "/", DEMO_ADMIN_PASSWORD);
  console.log("Patient login:", DEMO_PATIENT_EMAIL, "/", DEMO_PATIENT_PASSWORD);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
