-- PASS-033 — Household billing schema readiness (Stripe multi-seat deferred)

create table if not exists public.user_households (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'My Household',
  primary_user_id uuid not null references auth.users (id) on delete cascade,
  stripe_customer_id text,
  billing_status text not null default 'inactive' check (billing_status in ('inactive', 'active', 'past_due', 'canceled')),
  mastery_primary_monthly_usd numeric(6, 2) not null default 18.00,
  additional_member_monthly_usd numeric(6, 2) not null default 5.00,
  max_members int not null default 6,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_household_members (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.user_households (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'member' check (role in ('primary', 'adult', 'student', 'teen')),
  user_segment text not null default 'adult' check (user_segment in ('student', 'teen', 'parent', 'adult', 'caregiver')),
  can_access_adult_worlds boolean not null default false,
  joined_at timestamptz not null default now(),
  unique (household_id, user_id)
);

create index if not exists idx_user_households_primary on public.user_households (primary_user_id);
create index if not exists idx_household_members_user on public.user_household_members (user_id);

comment on table public.user_households is 'PASS-033 — Mastery Household billing readiness ($18 primary + $5/additional member)';
comment on column public.user_household_members.can_access_adult_worlds is 'Adult-restricted worlds require individual eligibility even in household';
