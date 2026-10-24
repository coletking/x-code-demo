import {
  pgTable,
  text,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "patient"]);
export const userStatusEnum = pgEnum("user_status", ["active", "suspended", "blocked"]);
export const serviceCategoryEnum = pgEnum("service_category", ["medical", "aesthetic"]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "closed",
]);
export const paymentStatusEnum = pgEnum("payment_status", ["unpaid", "paid"]);
export const orderCreatedByEnum = pgEnum("order_created_by", ["patient", "admin"]);
export const contactSourceEnum = pgEnum("contact_source", ["contact-form", "manual"]);
export const contactStatusEnum = pgEnum("contact_status", ["new", "responded"]);
export const acquisitionSourceEnum = pgEnum("acquisition_source", [
  "Google",
  "Direct",
  "Social",
  "Referral",
  "Other",
]);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: userRoleEnum("role").notNull().default("patient"),
  status: userStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  patientName: text("patient_name").notNull(),
  patientEmail: text("patient_email").notNull(),
  patientPhone: text("patient_phone").notNull(),
  serviceId: text("service_id").notNull(),
  serviceName: text("service_name").notNull(),
  serviceCategory: serviceCategoryEnum("service_category").notNull(),
  price: integer("price").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  status: orderStatusEnum("status").notNull().default("pending"),
  paymentStatus: paymentStatusEnum("payment_status").notNull().default("unpaid"),
  notes: text("notes"),
  createdBy: orderCreatedByEnum("created_by").notNull().default("patient"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  source: contactSourceEnum("source").notNull().default("manual"),
  status: contactStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const acquisitionEvents = pgTable("acquisition_events", {
  id: text("id").primaryKey(),
  source: acquisitionSourceEnum("source").notNull(),
  referrer: text("referrer").notNull(),
  path: text("path").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
