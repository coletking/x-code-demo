# x-demo — The Luxe Medical Clinic

A pitch demo for The Luxe Medical Clinic's new site: a modern, medical-first
marketing site plus a patient portal and admin dashboard. Built with
**Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**, backed
by **Postgres on Neon via Drizzle ORM**.

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@theluxemedicalclinic.com` | `admin123` |
| Super Admin | `superadmin@theluxemedicalclinic.com` | `SuperAdmin123!` |
| Patient | `amara.okafor@example.com` | `patient123` |

There is only one admin role in the data model (`admin`) — "Super Admin" is
simply a second seeded admin account for separate testing; it has the same
full access to Orders, Users, Contacts, and the Dashboard as any admin.

## What's here

**Public site** — `/`, `/services`, `/insurance`, `/about`, `/contact`.
Homepage leads with primary/medical care (consultations, diagnostics,
chronic care) with aesthetic treatments (laser, pigmentation, microneedling,
Botox/filler) positioned as a complementary offering — reversing the current
live site's aesthetics-first framing.

**Patient portal** (`/account`, requires login) — "My Orders" (appointment +
invoice history) and a booking flow (`/account/book`): pick a service → pick
a date/time → review → on-screen invoice → "Pay Now" shows a clear demo
notice ("payment gateway not connected in this demo") and the order is saved
as `pending`, visible immediately to the clinic in the admin dashboard.

**Admin portal** (`/admin`, requires an admin account):
- **Dashboard** — order/user/contact stats and acquisition-source breakdown,
  each stat card links through to its full page.
- **Orders** — table view and month calendar view of every booking; calendar
  days are colour-coded by the statuses booked that day, click a day to see
  that day's bookings. Admin can create an order for any patient (a
  scheduled booking), change status, or close an order.
- **Users** — list all patients, create a patient account, suspend/block/
  reactivate, and drill into a patient's order history.
- **Contacts** — every website contact-form submission, plus a way to log
  one manually (e.g. a phone inquiry).

## Stack & architecture

- **Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion**
- **Postgres (Neon) via Drizzle ORM** — schema in `lib/db/schema.ts`
- Layered roughly as MVC:
  - **Model** — `lib/models/types.ts` (types) + `lib/repositories/*.ts`
    (server-only Drizzle queries, guarded with `server-only`)
  - **Controller** — `app/api/**/route.ts` (auth/authorization + business
    rules) and `lib/hooks/*.ts` (client-side data hooks used by pages)
  - **View** — `app/**/page.tsx` + `components/**`
- Auth is a custom httpOnly session cookie (`luxe_session`) set by
  `/api/auth/login` and `/api/auth/register`; passwords are hashed with
  bcrypt. `proxy.ts` (Next 16's middleware convention) guards `/account/*`
  and `/admin/*` by role.

## Local setup

```bash
npm install
# .env.local already has DATABASE_URL for the Neon database this demo uses
npm run db:migrate   # applies drizzle/*.sql to the database
npm run db:seed       # wipes and reseeds demo users/orders/contacts
npm run dev
```

Other scripts:
- `npm run db:generate` — regenerate migration SQL after a schema change
- `npx tsx --env-file=.env.local scripts/create-admin.ts <email> <password> [name]` —
  create or promote an admin account without touching seed data

## Deploying (Vercel + Neon)

1. Push this repo to GitHub (already set up for `coletking/x-code-demo`).
2. Import the repo in Vercel.
3. Add the `DATABASE_URL` environment variable in the Vercel project
   settings (same Neon connection string as `.env.local`).
4. Deploy. Run `npm run db:migrate` (and `npm run db:seed` once) against the
   same `DATABASE_URL` locally before/after the first deploy so the
   production database has its tables and demo data.

## Known demo limitations (by design, for the pitch)

- **Payment is a stub.** "Pay Now" explains no gateway is connected yet;
  the order is still recorded as `pending` so the clinic sees every request.
  Wiring a real gateway (Paystack/Flutterwave) is a follow-up, not a rebuild.
- **Acquisition tracking is first-touch only** (referrer/UTM classified into
  Google/Direct/Social/Referral/Other on first visit) — shown on the admin
  dashboard. Actually improving Google Business Profile visibility is a
  manual, non-code task outside this build.
- **"Order" and "booking" are the same entity** in the data model — a
  scheduled appointment that carries its own invoice and status. If the
  clinic wants these as genuinely separate concepts, that's a schema change,
  not a rebuild, thanks to the repository layer above.
