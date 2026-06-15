-- ============================================================================
-- Narrea Studio — Bucket de stockage `blog-images` (public en lecture)
-- ----------------------------------------------------------------------------
-- Note : le bucket est aussi créé automatiquement (idempotent) par la Server
-- Action d'upload via la clé service_role. Cette migration documente la
-- configuration et permet de la reproduire sur un nouvel environnement.
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Lecture publique des objets du bucket (en plus de l'URL publique).
drop policy if exists "Images du blog lisibles par tous" on storage.objects;
create policy "Images du blog lisibles par tous"
  on storage.objects
  for select
  using (bucket_id = 'blog-images');
