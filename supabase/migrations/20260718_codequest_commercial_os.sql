
create table if not exists public.user_entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan_id text not null default 'free',
  status text not null default 'active',
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_checkout_session_id text,
  access_started_at timestamptz,
  access_ends_at timestamptz,
  cancel_at_period_end boolean not null default false,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.entitlement_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id text not null,
  status text not null,
  source text not null,
  source_event_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create unique index if not exists entitlement_history_source_event_idx
  on public.entitlement_history(source_event_id)
  where source_event_id is not null;

create table if not exists public.webhook_events (
  event_id text primary key,
  event_type text not null,
  processed_at timestamptz not null default now(),
  payload_summary jsonb not null default '{}'::jsonb
);

create table if not exists public.feature_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  feature_key text not null,
  period_key text not null,
  usage_count integer not null default 0,
  updated_at timestamptz not null default now(),
  unique(user_id, feature_key, period_key)
);

create table if not exists public.activation_milestones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  milestone text not null,
  metadata jsonb not null default '{}'::jsonb,
  achieved_at timestamptz not null default now(),
  unique(user_id, milestone)
);

create table if not exists public.lifecycle_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id text not null,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_user_id uuid not null references auth.users(id) on delete cascade,
  invited_user_id uuid references auth.users(id) on delete cascade,
  referral_code text not null unique,
  status text not null default 'invited',
  rewarded_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.user_entitlements enable row level security;
alter table public.feature_usage enable row level security;
alter table public.activation_milestones enable row level security;
alter table public.lifecycle_notifications enable row level security;
alter table public.referrals enable row level security;

create policy "Users read own entitlements"
  on public.user_entitlements for select
  using (auth.uid() = user_id);

create policy "Users read own usage"
  on public.feature_usage for select
  using (auth.uid() = user_id);

create policy "Users read own milestones"
  on public.activation_milestones for select
  using (auth.uid() = user_id);

create policy "Users read own notifications"
  on public.lifecycle_notifications for select
  using (auth.uid() = user_id);

create policy "Users update own notifications"
  on public.lifecycle_notifications for update
  using (auth.uid() = user_id);

create policy "Users read referral participation"
  on public.referrals for select
  using (auth.uid() = referrer_user_id or auth.uid() = invited_user_id);
