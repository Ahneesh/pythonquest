
-- Row-level security policies
alter table public.organisations enable row level security;
alter table public.profiles enable row level security;
alter table public.organisation_memberships enable row level security;
alter table public.cohorts enable row level security;
alter table public.cohort_memberships enable row level security;
alter table public.curriculum_items enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.learner_progress enable row level security;
alter table public.learning_events enable row level security;
alter table public.intervention_notes enable row level security;
alter table public.credentials enable row level security;
alter table public.audit_log enable row level security;

create or replace function public.is_org_member(org_id uuid)
returns boolean language sql stable security definer set search_path=public as $$
  select exists(
    select 1 from public.organisation_memberships m
    where m.organisation_id=org_id and m.user_id=auth.uid() and m.status='active'
  );
$$;

create or replace function public.has_org_role(org_id uuid, allowed public.codequest_role[])
returns boolean language sql stable security definer set search_path=public as $$
  select exists(
    select 1 from public.organisation_memberships m
    where m.organisation_id=org_id and m.user_id=auth.uid() and m.status='active' and m.role=any(allowed)
  );
$$;

create or replace function public.is_cohort_member(target_cohort uuid)
returns boolean language sql stable security definer set search_path=public as $$
  select exists(
    select 1 from public.cohort_memberships cm
    where cm.cohort_id=target_cohort and cm.user_id=auth.uid() and cm.status='active'
  );
$$;

create or replace function public.is_cohort_instructor(target_cohort uuid)
returns boolean language sql stable security definer set search_path=public as $$
  select exists(
    select 1 from public.cohort_memberships cm
    where cm.cohort_id=target_cohort and cm.user_id=auth.uid()
      and cm.status='active' and cm.role in ('instructor','org_admin','platform_admin')
  );
$$;

create policy "profiles_self_read" on public.profiles for select using (user_id=auth.uid());
create policy "profiles_self_update" on public.profiles for update using (user_id=auth.uid());
create policy "profiles_self_insert" on public.profiles for insert with check (user_id=auth.uid());

create policy "org_member_read" on public.organisations for select using (public.is_org_member(id));
create policy "org_admin_update" on public.organisations for update using (public.has_org_role(id,array['org_admin','platform_admin']::public.codequest_role[]));

create policy "memberships_self_or_admin_read" on public.organisation_memberships for select
using (user_id=auth.uid() or public.has_org_role(organisation_id,array['org_admin','platform_admin']::public.codequest_role[]));

create policy "cohorts_member_read" on public.cohorts for select
using (public.is_cohort_member(id) or (organisation_id is not null and public.is_org_member(organisation_id)));
create policy "cohorts_instructor_write" on public.cohorts for all
using (organisation_id is not null and public.has_org_role(organisation_id,array['instructor','org_admin','platform_admin']::public.codequest_role[]))
with check (organisation_id is not null and public.has_org_role(organisation_id,array['instructor','org_admin','platform_admin']::public.codequest_role[]));

create policy "cohort_memberships_member_read" on public.cohort_memberships for select
using (user_id=auth.uid() or public.is_cohort_instructor(cohort_id));
create policy "cohort_memberships_instructor_write" on public.cohort_memberships for all
using (public.is_cohort_instructor(cohort_id))
with check (public.is_cohort_instructor(cohort_id));

create policy "curriculum_member_read" on public.curriculum_items for select
using (status='published' or (organisation_id is not null and public.is_org_member(organisation_id)));
create policy "curriculum_author_write" on public.curriculum_items for all
using (organisation_id is not null and public.has_org_role(organisation_id,array['instructor','org_admin','platform_admin']::public.codequest_role[]))
with check (organisation_id is not null and public.has_org_role(organisation_id,array['instructor','org_admin','platform_admin']::public.codequest_role[]));

create policy "assignments_member_read" on public.assignments for select using (public.is_cohort_member(cohort_id));
create policy "assignments_instructor_write" on public.assignments for all
using (public.is_cohort_instructor(cohort_id))
with check (public.is_cohort_instructor(cohort_id));

create policy "submissions_learner_read" on public.submissions for select
using (learner_id=auth.uid() or public.is_cohort_instructor((select a.cohort_id from public.assignments a where a.id=assignment_id)));
create policy "submissions_learner_insert" on public.submissions for insert
with check (learner_id=auth.uid() and public.is_cohort_member((select a.cohort_id from public.assignments a where a.id=assignment_id)));
create policy "submissions_learner_update" on public.submissions for update
using (learner_id=auth.uid() or public.is_cohort_instructor((select a.cohort_id from public.assignments a where a.id=assignment_id)));

create policy "progress_self" on public.learner_progress for all using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "events_self_insert" on public.learning_events for insert with check (user_id=auth.uid());
create policy "events_self_read" on public.learning_events for select using (user_id=auth.uid());

create policy "interventions_instructor_only" on public.intervention_notes for all
using (public.is_cohort_instructor(cohort_id))
with check (public.is_cohort_instructor(cohort_id));

create policy "credentials_owner_read" on public.credentials for select using (user_id=auth.uid());
create policy "credentials_public_verify" on public.credentials for select using (revoked_at is null);

create policy "audit_org_admin_read" on public.audit_log for select
using (organisation_id is not null and public.has_org_role(organisation_id,array['org_admin','platform_admin']::public.codequest_role[]));
