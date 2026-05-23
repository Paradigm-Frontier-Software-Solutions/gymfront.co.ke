create extension if not exists "pgcrypto";

do $$ begin
  create type app_role as enum ('owner', 'management', 'front_desk', 'trainer');
exception when duplicate_object then null; end $$;

do $$ begin
  create type member_status as enum ('active', 'expired', 'suspended');
exception when duplicate_object then null; end $$;

do $$ begin
  create type acquisition_source as enum ('customer pool', 'referral', 'walk-in');
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_method as enum ('MPESA', 'cash', 'bank');
exception when duplicate_object then null; end $$;

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists users_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role app_role not null default 'front_desk',
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists trainers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references users_profiles(id) on delete set null,
  name text not null,
  phone text,
  email text,
  specialty text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists membership_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  price numeric(12,2) not null check (price >= 0),
  duration_days integer not null check (duration_days > 0),
  commission_rate numeric(5,4) not null check (commission_rate >= 0 and commission_rate <= 1),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  member_code text not null unique,
  name text not null,
  phone text not null,
  email text,
  id_passport_number text,
  emergency_contact text,
  membership_plan_id uuid references membership_plans(id) on delete set null,
  trainer_id uuid references trainers(id) on delete set null,
  start_date date not null,
  expiry_date date not null,
  status member_status not null default 'active',
  acquisition_source acquisition_source not null default 'walk-in',
  photo_url text,
  notes text,
  created_by uuid references users_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  amount numeric(12,2) not null check (amount >= 0),
  method payment_method not null,
  reference_number text,
  payment_date date not null default current_date,
  membership_plan_id uuid references membership_plans(id) on delete set null,
  receipt_number text not null unique,
  recorded_by uuid references users_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists receipts (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid not null unique references payments(id) on delete cascade,
  receipt_number text not null unique,
  issued_to text not null,
  issued_at timestamptz not null default now(),
  subtotal numeric(12,2) not null,
  tax numeric(12,2) not null default 0,
  total numeric(12,2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists attendance (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  check_in_at timestamptz not null default now(),
  check_out_at timestamptz,
  checked_by uuid references users_profiles(id) on delete set null,
  membership_valid boolean not null default true,
  warning text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists trainer_commissions (
  id uuid primary key default gen_random_uuid(),
  trainer_id uuid not null references trainers(id) on delete cascade,
  member_id uuid references members(id) on delete set null,
  payment_id uuid references payments(id) on delete cascade,
  membership_plan_id uuid references membership_plans(id) on delete set null,
  commission_rate numeric(5,4) not null,
  gross_amount numeric(12,2) not null,
  commission_amount numeric(12,2) not null,
  earned_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  description text,
  amount numeric(12,2) not null check (amount >= 0),
  date date not null default current_date,
  payment_method payment_method not null,
  recorded_by uuid references users_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists inventory (
  id uuid primary key default gen_random_uuid(),
  item_name text not null,
  category text not null,
  quantity integer not null default 1 check (quantity >= 0),
  purchase_date date,
  condition text not null default 'good',
  depreciation_method text,
  current_value numeric(12,2) not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists daily_close (
  id uuid primary key default gen_random_uuid(),
  close_date date not null unique,
  total_cash numeric(12,2) not null default 0,
  total_mpesa numeric(12,2) not null default 0,
  total_bank numeric(12,2) not null default 0,
  expenses numeric(12,2) not null default 0,
  expected_sweep numeric(12,2) generated always as (total_cash + total_mpesa + total_bank - expenses) stored,
  actual_sweep numeric(12,2) not null default 0,
  variance numeric(12,2) generated always as (actual_sweep - (total_cash + total_mpesa + total_bank - expenses)) stored,
  variance_flag boolean generated always as (actual_sweep <> (total_cash + total_mpesa + total_bank - expenses)) stored,
  staff_closing_notes text,
  manager_approved_by uuid references users_profiles(id) on delete set null,
  approved_at timestamptz,
  recorded_by uuid references users_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_users_profiles_role on users_profiles(role);
create index if not exists idx_members_status on members(status);
create index if not exists idx_members_expiry_date on members(expiry_date);
create index if not exists idx_members_trainer_id on members(trainer_id);
create index if not exists idx_payments_payment_date on payments(payment_date);
create index if not exists idx_payments_method on payments(method);
create index if not exists idx_attendance_check_in_at on attendance(check_in_at);
create index if not exists idx_trainer_commissions_earned_date on trainer_commissions(earned_date);
create index if not exists idx_expenses_date on expenses(date);
create index if not exists idx_inventory_category on inventory(category);
create index if not exists idx_daily_close_close_date on daily_close(close_date);

drop trigger if exists set_users_profiles_updated_at on users_profiles;
create trigger set_users_profiles_updated_at before update on users_profiles for each row execute function set_updated_at();
drop trigger if exists set_trainers_updated_at on trainers;
create trigger set_trainers_updated_at before update on trainers for each row execute function set_updated_at();
drop trigger if exists set_membership_plans_updated_at on membership_plans;
create trigger set_membership_plans_updated_at before update on membership_plans for each row execute function set_updated_at();
drop trigger if exists set_members_updated_at on members;
create trigger set_members_updated_at before update on members for each row execute function set_updated_at();
drop trigger if exists set_payments_updated_at on payments;
create trigger set_payments_updated_at before update on payments for each row execute function set_updated_at();
drop trigger if exists set_receipts_updated_at on receipts;
create trigger set_receipts_updated_at before update on receipts for each row execute function set_updated_at();
drop trigger if exists set_attendance_updated_at on attendance;
create trigger set_attendance_updated_at before update on attendance for each row execute function set_updated_at();
drop trigger if exists set_trainer_commissions_updated_at on trainer_commissions;
create trigger set_trainer_commissions_updated_at before update on trainer_commissions for each row execute function set_updated_at();
drop trigger if exists set_expenses_updated_at on expenses;
create trigger set_expenses_updated_at before update on expenses for each row execute function set_updated_at();
drop trigger if exists set_inventory_updated_at on inventory;
create trigger set_inventory_updated_at before update on inventory for each row execute function set_updated_at();
drop trigger if exists set_daily_close_updated_at on daily_close;
create trigger set_daily_close_updated_at before update on daily_close for each row execute function set_updated_at();

create or replace function current_app_role()
returns app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from users_profiles where id = auth.uid()
$$;

create or replace function is_owner_or_management()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(current_app_role() in ('owner', 'management'), false)
$$;

alter table users_profiles enable row level security;
alter table trainers enable row level security;
alter table membership_plans enable row level security;
alter table members enable row level security;
alter table payments enable row level security;
alter table receipts enable row level security;
alter table attendance enable row level security;
alter table trainer_commissions enable row level security;
alter table expenses enable row level security;
alter table inventory enable row level security;
alter table daily_close enable row level security;

create policy "profiles read own or admin" on users_profiles for select using (id = auth.uid() or is_owner_or_management());
create policy "profiles update own or owner" on users_profiles for update using (id = auth.uid() or current_app_role() = 'owner');

create policy "plans readable by authenticated" on membership_plans for select to authenticated using (true);
create policy "plans managed by owner management" on membership_plans for all to authenticated using (is_owner_or_management()) with check (is_owner_or_management());

create policy "members role read" on members for select to authenticated using (
  current_app_role() in ('owner', 'management', 'front_desk') or
  exists (select 1 from trainers where trainers.id = members.trainer_id and trainers.profile_id = auth.uid())
);
create policy "members create front desk up" on members for insert to authenticated with check (current_app_role() in ('owner', 'management', 'front_desk'));
create policy "members update management up" on members for update to authenticated using (current_app_role() in ('owner', 'management', 'front_desk')) with check (current_app_role() in ('owner', 'management', 'front_desk'));
create policy "members delete owner management" on members for delete to authenticated using (is_owner_or_management());

create policy "attendance role read" on attendance for select to authenticated using (
  current_app_role() in ('owner', 'management', 'front_desk') or
  exists (select 1 from members join trainers on trainers.id = members.trainer_id where members.id = attendance.member_id and trainers.profile_id = auth.uid())
);
create policy "attendance write front desk up" on attendance for all to authenticated using (current_app_role() in ('owner', 'management', 'front_desk')) with check (current_app_role() in ('owner', 'management', 'front_desk'));

create policy "payments role read" on payments for select to authenticated using (current_app_role() in ('owner', 'management', 'front_desk'));
create policy "payments write front desk up" on payments for insert to authenticated with check (current_app_role() in ('owner', 'management', 'front_desk'));
create policy "payments update owner management" on payments for update to authenticated using (is_owner_or_management()) with check (is_owner_or_management());

create policy "receipts read finance roles" on receipts for select to authenticated using (current_app_role() in ('owner', 'management', 'front_desk'));
create policy "receipts write finance roles" on receipts for insert to authenticated with check (current_app_role() in ('owner', 'management', 'front_desk'));

create policy "trainers read management and trainers" on trainers for select to authenticated using (current_app_role() in ('owner', 'management') or profile_id = auth.uid());
create policy "trainers manage owner management" on trainers for all to authenticated using (is_owner_or_management()) with check (is_owner_or_management());

create policy "commissions owner management trainer own" on trainer_commissions for select to authenticated using (
  is_owner_or_management() or exists (select 1 from trainers where trainers.id = trainer_commissions.trainer_id and trainers.profile_id = auth.uid())
);
create policy "commissions manage owner management" on trainer_commissions for all to authenticated using (is_owner_or_management()) with check (is_owner_or_management());

create policy "expenses read owner management" on expenses for select to authenticated using (is_owner_or_management());
create policy "expenses write owner management" on expenses for all to authenticated using (is_owner_or_management()) with check (is_owner_or_management());

create policy "inventory read owner management" on inventory for select to authenticated using (is_owner_or_management());
create policy "inventory write owner management" on inventory for all to authenticated using (is_owner_or_management()) with check (is_owner_or_management());

create policy "daily close read front desk up" on daily_close for select to authenticated using (current_app_role() in ('owner', 'management', 'front_desk'));
create policy "daily close create front desk up" on daily_close for insert to authenticated with check (current_app_role() in ('owner', 'management', 'front_desk'));
create policy "daily close approve management up" on daily_close for update to authenticated using (is_owner_or_management()) with check (is_owner_or_management());
