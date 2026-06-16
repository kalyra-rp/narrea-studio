-- ============================================================================
-- Narrea Studio — Édition rapide des services
-- Les formules restent en code (lib/site.ts) ; cette table ne stocke que les
-- champs principaux modifiables (titre, prix « à partir de », promesse), fusionnés
-- à l'affichage. Une ligne par slug d'offre.
-- ============================================================================

create table if not exists public.service_overrides (
  slug text primary key,
  titre text,
  prix text,
  promesse text,
  updated_at timestamptz not null default now()
);

alter table public.service_overrides enable row level security;

-- Valeurs affichées publiquement → lecture pour tous.
drop policy if exists "Overrides services lisibles par tous" on public.service_overrides;
create policy "Overrides services lisibles par tous"
  on public.service_overrides
  for select
  using (true);

-- Écriture réservée aux admins (et au service_role côté serveur).
drop policy if exists "Admins gèrent les overrides services" on public.service_overrides;
create policy "Admins gèrent les overrides services"
  on public.service_overrides
  for all
  using (public.is_admin())
  with check (public.is_admin());
