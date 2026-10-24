export type UserRole = "admin" | "patient";

export type UserStatus = "active" | "suspended" | "blocked";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export type ServiceCategory = "medical" | "aesthetic";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMinutes: number;
  description: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "closed";

export type PaymentStatus = "unpaid" | "paid";

export interface Order {
  id: string;
  invoiceNumber: string;
  userId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: ServiceCategory;
  price: number;
  date: string;
  time: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdBy: "patient" | "admin";
  createdAt: string;
  updatedAt: string;
}

export type ContactSource = "contact-form" | "manual";

export type ContactStatus = "new" | "responded";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: ContactSource;
  status: ContactStatus;
  createdAt: string;
}

export type AcquisitionSource =
  | "Google"
  | "Direct"
  | "Social"
  | "Referral"
  | "Other";

export interface AcquisitionEvent {
  id: string;
  source: AcquisitionSource;
  referrer: string;
  path: string;
  createdAt: string;
}

export interface SessionPayload {
  userId: string;
  role: UserRole;
}
