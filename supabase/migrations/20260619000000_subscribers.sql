-- ============================================================================
-- Narrea Studio — Table `subscribers` (inscriptions à la ressource / newsletter)
-- ============================================================================

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;

-- Les écritures se font côté serveur (service_role, contourne la RLS).
-- Lecture réservée aux admins (gestion future).
drop policy if exists "Subscribers lisibles par les admins" on public.subscribers;
create policy "Subscribers lisibles par les admins"
  on public.subscribers
  for select
  using (public.is_admin());
