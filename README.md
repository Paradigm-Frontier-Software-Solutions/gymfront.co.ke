# Ignite Gym ERP

Ignite Gym ERP is a full-stack gym management dashboard built with Next.js, TypeScript, Tailwind CSS, Supabase PostgreSQL, Supabase Auth, and row-level security.

## Modules

- Role-based authentication for Owner, Management, Front Desk, and Trainer users
- Member CRUD workspace with plans, status, acquisition source, photo URL, and notes
- Attendance check-in/check-out with member code input and expiry warnings
- Payments with MPESA, cash, bank methods and auto-generated receipt numbers
- Membership plans for Daily, Monthly, Quarterly, and Annual packages
- Trainer commission reporting using 50%, 40%, 30%, and 20% plan rules
- Expenses, inventory, daily close, reports, and copyable WhatsApp/SMS reminders
- Premium responsive admin UI with dark navy navigation, teal accents, and white cards

## Tech Stack

- Next.js 15, compatible with the requested Next.js 14+ baseline
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL with RLS policies

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill in `.env.local` with your Supabase project values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

Run the schema in `supabase/schema.sql` in the Supabase SQL editor, or apply the migration in `supabase/migrations/202605230001_ignite_gym_erp.sql`.

Then paste and run `supabase/seed.sql` in the Supabase SQL editor. If using the Supabase CLI, apply migrations and seed data with your normal local workflow.

## Auth and RBAC

User roles live in `users_profiles.role`:

- `owner`: full access
- `management`: members, payments, reports, inventory, trainers, expenses, plans, attendance
- `front_desk`: member registration, attendance, payment recording, receipts
- `trainer`: assigned clients, attendance view, routines placeholder, own commissions

The schema enables RLS on every ERP table and adds role policies for each module.

## Deployment: Vercel + Supabase

1. Create a Supabase project.
2. Apply `supabase/schema.sql`.
3. Run `supabase/seed.sql` for sample data.
4. Create at least one Supabase Auth user.
5. Add a matching `users_profiles` row with role `owner`.
6. Push the repository to GitHub.
7. Import the project into Vercel.
8. Add environment variables from `.env.example` in Vercel Project Settings.
9. Deploy.

## Notes

The UI ships with local sample data so the ERP is browsable before Supabase credentials are configured. Once real Supabase keys are added, the schema and RLS policies are ready for database-backed implementation of mutations and exports.
