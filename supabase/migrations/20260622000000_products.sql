-- ============================================================================
-- Narrea Studio — Table `products` (boutique)
-- ============================================================================

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  slug text not null unique,
  description text,
  prix text, -- libellé affiché (ex. « 29 € »)
  image text,
  categorie text,
  tags text[] not null default '{}',
  payhip_url text, -- lien Payhip ; null = « bientôt »
  statut text not null default 'brouillon' check (statut in ('brouillon', 'publie')),
  date_publication timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_statut_date_idx
  on public.products (statut, date_publication desc);

alter table public.products enable row level security;

-- Lecture publique des produits publiés.
drop policy if exists "Produits publiés visibles par tous" on public.products;
create policy "Produits publiés visibles par tous"
  on public.products
  for select
  using (statut = 'publie');

-- Gestion réservée aux admins (écritures réelles via service_role côté serveur).
drop policy if exists "Admins gèrent les produits" on public.products;
create policy "Admins gèrent les produits"
  on public.products
  for all
  using (public.is_admin())
  with check (public.is_admin());
