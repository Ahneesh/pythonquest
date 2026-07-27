
-- CodeQuest v41 production cloud schema
create extension if not exists pgcrypto;

create type public.codequest_role as enum ('learner','instructor','org_admin','platform_admin');
create type public.content_status as enum ('draft','review','published','archived');
create type public.assignment_status as enum ('draft','published','closed');
create type public.submission_status as enum ('draft','submitted','reviewed','returned','missing');

create table if not exists public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  plan text not null default 'starter',
  settings jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  primary_role public.codequest_role not null default 'learner',
  active_academy text not null default 'python',
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organisation_memberships (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.codequest_role not null,
  status text not null default 'active',
  joined_at timestamptz not null default now(),
  unique(organisation_id,user_id)
);

create table if not exists public.cohorts (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete cascade,
  title text not null,
  description text,
  academy_ids text[] not null default '{}',
  start_date date,
  end_date date,
  capacity integer,
  status text not null default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cohort_memberships (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.cohorts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.codequest_role not null default 'learner',
  status text not null default 'active',
  joined_at timestamptz not null default now(),
  unique(cohort_id,user_id)
);

create table if not exists public.curriculum_items (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete cascade,
  academy_id text not null,
  item_type text not null check (item_type in ('lesson','assessment','project','simulation')),
  title text not null,
  module_title text,
  status public.content_status not null default 'draft',
  content jsonb not null default '{}'::jsonb,
  quality_score integer not null default 0,
  version integer not null default 1,
  parent_item_id uuid references public.curriculum_items(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  reviewed_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.cohorts(id) on delete cascade,
  title text not null,
  academy_id text not null,
  assignment_type text not null,
  source_id text,
  instructions text,
  due_at timestamptz,
  points integer not null default 100,
  status public.assignment_status not null default 'draft',
  rubric jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  learner_id uuid not null references auth.users(id) on delete cascade,
  status public.submission_status not null default 'draft',
  source_snapshot jsonb not null default '{}'::jsonb,
  autograde jsonb not null default '{}'::jsonb,
  score numeric(5,2),
  feedback text,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(assignment_id, learner_id)
);

create table if not exists public.learner_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  academy_id text not null,
  lesson_id text not null,
  status text not null default 'started',
  mastery numeric(5,2) not null default 0,
  confidence numeric(3,2),
  evidence jsonb not null default '{}'::jsonb,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(user_id,academy_id,lesson_id)
);

create table if not exists public.learning_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  organisation_id uuid references public.organisations(id) on delete set null,
  event_type text not null,
  academy_id text,
  concept_id text,
  payload jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists public.intervention_notes (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.cohorts(id) on delete cascade,
  learner_id uuid not null references auth.users(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  note text not null,
  visibility text not null default 'instructors',
  created_at timestamptz not null default now()
);

create table if not exists public.credentials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  academy_id text not null,
  credential_code text not null,
  title text not null,
  evidence jsonb not null default '{}'::jsonb,
  verification_code text not null unique default encode(gen_random_bytes(12),'hex'),
  issued_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique(user_id,credential_code)
);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  organisation_id uuid references public.organisations(id) on delete set null,
  entity_type text not null,
  entity_id text,
  action text not null,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_memberships_user on public.organisation_memberships(user_id);
create index if not exists idx_cohort_memberships_user on public.cohort_memberships(user_id);
create index if not exists idx_assignments_cohort on public.assignments(cohort_id);
create index if not exists idx_submissions_learner on public.submissions(learner_id);
create index if not exists idx_progress_user_academy on public.learner_progress(user_id,academy_id);
create index if not exists idx_events_user_time on public.learning_events(user_id,occurred_at desc);
create index if not exists idx_credentials_verify on public.credentials(verification_code);
