# Ignite Gym ERP Deployment Guide

## Supabase

1. Create a Supabase project.
2. Open the SQL editor and run `supabase/schema.sql`.
3. Run `supabase/seed.sql` for sample plans, members, trainers, payments, attendance, expenses, and inventory.
4. Enable email/password auth in Supabase Auth.
5. Create your first owner user in Auth.
6. Add a profile row for that user:

```sql
insert into users_profiles (id, full_name, email, role)
values ('AUTH_USER_ID', 'Gym Owner', 'owner@example.com', 'owner');
```

## Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Set the framework preset to Next.js.
4. Add environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

5. Deploy.
6. In Supabase Auth URL settings, set the site URL and redirect URLs to your Vercel domain.

## Production Checklist

- Confirm RLS is enabled on every ERP table.
- Confirm the owner profile exists before testing protected routes.
- Rotate the service role key if it was ever exposed locally.
- Replace sample seed data before real operations.
- Add backups and point-in-time recovery for the Supabase database.
