-- ============================================================================
-- Narrea Studio — Correctif RLS : récursion infinie sur `profiles`
-- ----------------------------------------------------------------------------
-- La policy « Profils lisibles par les admins » faisait un sous-select sur
-- profiles à l'intérieur d'une policy DE profiles → récursion infinie, qui
-- faisait échouer TOUTE lecture de profiles (donc la relecture du rôle au
-- login). On remplace le test d'admin par une fonction SECURITY DEFINER qui
-- contourne la RLS (pas de récursion).
-- ============================================================================

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Profiles : la lecture « admin » utilise désormais la fonction (sans récursion).
drop policy if exists "Profils lisibles par les admins" on public.profiles;
create policy "Profils lisibles par les admins"
  on public.profiles
  for select
  using (public.is_admin());

-- Posts : même simplification (cohérence + évite la récursion indirecte).
drop policy if exists "Admins gèrent les articles" on public.posts;
create policy "Admins gèrent les articles"
  on public.posts
  for all
  using (public.is_admin())
  with check (public.is_admin());
