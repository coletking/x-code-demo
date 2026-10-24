CREATE TYPE "public"."acquisition_source" AS ENUM('Google', 'Direct', 'Social', 'Referral', 'Other');--> statement-breakpoint
CREATE TYPE "public"."contact_source" AS ENUM('contact-form', 'manual');--> statement-breakpoint
CREATE TYPE "public"."contact_status" AS ENUM('new', 'responded');--> statement-breakpoint
CREATE TYPE "public"."order_created_by" AS ENUM('patient', 'admin');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('pending', 'confirmed', 'completed', 'cancelled', 'closed');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('unpaid', 'paid');--> statement-breakpoint
CREATE TYPE "public"."service_category" AS ENUM('medical', 'aesthetic');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'patient');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'suspended', 'blocked');--> statement-breakpoint
CREATE TABLE "acquisition_events" (
	"id" text PRIMARY KEY NOT NULL,
	"source" "acquisition_source" NOT NULL,
	"referrer" text NOT NULL,
	"path" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"message" text NOT NULL,
	"source" "contact_source" DEFAULT 'manual' NOT NULL,
	"status" "contact_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"invoice_number" text NOT NULL,
	"user_id" text NOT NULL,
	"patient_name" text NOT NULL,
	"patient_email" text NOT NULL,
	"patient_phone" text NOT NULL,
	"service_id" text NOT NULL,
	"service_name" text NOT NULL,
	"service_category" "service_category" NOT NULL,
	"price" integer NOT NULL,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"status" "order_status" DEFAULT 'pending' NOT NULL,
	"payment_status" "payment_status" DEFAULT 'unpaid' NOT NULL,
	"notes" text,
	"created_by" "order_created_by" DEFAULT 'patient' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "orders_invoice_number_unique" UNIQUE("invoice_number")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "user_role" DEFAULT 'patient' NOT NULL,
	"status" "user_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;