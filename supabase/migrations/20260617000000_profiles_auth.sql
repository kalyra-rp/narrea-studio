-- ============================================================================
-- Narrea Studio — Auth & rôles : table `profiles` + trigger + RLS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Table profiles : un profil par utilisateur authentifié, avec un rôle.
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'client' check (role in ('admin', 'client')),
  nom text,
  email text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Chacun peut lire son propre profil.
drop policy if exists "Profil lisible par son propriétaire" on public.profiles;
create policy "Profil lisible par son propriétaire"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Les admins peuvent lire tous les profils (gestion clients — étape 5).
drop policy if exists "Profils lisibles par les admins" on public.profiles;
create policy "Profils lisibles par les admins"
  on public.profiles
  for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- NB : aucune politique d'UPDATE/INSERT côté client → le rôle ne peut pas être
-- modifié par l'utilisateur. Les écritures passent par le serveur (service_role)
-- ou par le trigger ci-dessous (security definer).

-- ----------------------------------------------------------------------------
-- Création automatique du profil à l'inscription (rôle 'client' par défaut).
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- RLS posts : les admins gèrent tout (les écritures réelles restent côté
-- serveur via service_role ; cette policy rend la lecture des brouillons
-- possible pour un admin authentifié et documente l'intention).
-- La policy de lecture publique des articles publiés (migration initiale) reste.
-- ----------------------------------------------------------------------------
drop policy if exists "Admins gèrent les articles" on public.posts;
create policy "Admins gèrent les articles"
  on public.posts
  for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
