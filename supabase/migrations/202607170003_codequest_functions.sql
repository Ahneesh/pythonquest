
-- Profile bootstrap
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(user_id,display_name)
  values(new.id,coalesce(new.raw_user_meta_data->>'full_name',split_part(new.email,'@',1)))
  on conflict(user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

-- Updated-at helper
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at=now(); return new; end;
$$;

do $$
declare t text;
begin
  foreach t in array array['organisations','profiles','cohorts','curriculum_items','assignments','submissions','learner_progress']
  loop
    execute format('drop trigger if exists %I_touch on public.%I',t,t);
    execute format('create trigger %I_touch before update on public.%I for each row execute function public.touch_updated_at()',t,t);
  end loop;
end $$;
