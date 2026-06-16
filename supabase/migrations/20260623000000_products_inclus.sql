-- ============================================================================
-- Narrea Studio — Produits : liste « ce qui est inclus »
-- ============================================================================

alter table public.products
  add column if not exists inclus text[] not null default '{}';
