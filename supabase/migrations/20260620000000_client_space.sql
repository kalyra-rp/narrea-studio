-- ============================================================================
-- Narrea Studio — Espace client : clients, projets, livrables, messages
-- ============================================================================

-- Drapeau « doit changer son mot de passe » (1re connexion d'un client).
alter table public.profiles
  add column if not exists must_change_password boolean not null default false;

-- ----------------------------------------------------------------------------
-- Tables
-- ----------------------------------------------------------------------------
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete set null,
  entreprise text,
  contact_nom text,
  contact_email text,
  infos text,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  titre text not null,
  offre text,
  statut text not null default 'en_attente'
    check (statut in ('en_attente', 'en_cours', 'en_revision', 'livre', 'termine')),
  echeance date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.deliverables (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  nom text not null,
  type text not null default 'fichier' check (type in ('fichier', 'lien')),
  url text not null, -- chemin Storage (fichier) ou URL externe (lien)
  created_at timestamptz not null default now()
);

create table if not exists public.project_messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  author_id uuid references public.profiles (id) on delete set null,
  contenu text not null,
  created_at timestamptz not null default now()
);

create index if not exists projects_client_idx on public.projects (client_id);
create index if not exists deliverables_project_idx on public.deliverables (project_id);
create index if not exists messages_project_idx on public.project_messages (project_id, created_at);

-- ----------------------------------------------------------------------------
-- Helpers d'appartenance (SECURITY DEFINER → contournent la RLS, pas de récursion)
-- ----------------------------------------------------------------------------
create or replace function public.owns_client(p_client_id uuid)
returns boolean language sql security definer set search_path = public stable as $$
  select exists (
    select 1 from public.clients c
    where c.id = p_client_id and c.profile_id = auth.uid()
  );
$$;

create or replace function public.owns_project(p_project_id uuid)
returns boolean language sql security definer set search_path = public stable as $$
  select exists (
    select 1
    from public.projects pr
    join public.clients c on c.id = pr.client_id
    where pr.id = p_project_id and c.profile_id = auth.uid()
  );
$$;

-- ----------------------------------------------------------------------------
-- RLS : un client ne voit QUE ses données ; l'admin voit tout.
-- (Les écritures admin passent par le serveur en service_role, qui ignore la RLS.)
-- ----------------------------------------------------------------------------
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.deliverables enable row level security;
alter table public.project_messages enable row level security;

drop policy if exists "clients_select" on public.clients;
create policy "clients_select" on public.clients for select
  using (public.is_admin() or profile_id = auth.uid());

drop policy if exists "projects_select" on public.projects;
create policy "projects_select" on public.projects for select
  using (public.is_admin() or public.owns_client(client_id));

drop policy if exists "deliverables_select" on public.deliverables;
create policy "deliverables_select" on public.deliverables for select
  using (public.is_admin() or public.owns_project(project_id));

drop policy if exists "messages_select" on public.project_messages;
create policy "messages_select" on public.project_messages for select
  using (public.is_admin() or public.owns_project(project_id));

-- Un client peut écrire un message sur SON projet (en tant que lui-même).
drop policy if exists "messages_insert" on public.project_messages;
create policy "messages_insert" on public.project_messages for insert
  with check (
    public.is_admin()
    or (public.owns_project(project_id) and author_id = auth.uid())
  );

-- ----------------------------------------------------------------------------
-- Storage : bucket privé pour les livrables (téléchargement via URL signée).
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('deliverables', 'deliverables', false)
on conflict (id) do nothing;
