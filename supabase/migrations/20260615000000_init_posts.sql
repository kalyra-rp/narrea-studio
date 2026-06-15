-- ============================================================================
-- Narrea Studio — Table `posts` (blog)
-- Schéma + RLS + données de démo
-- ============================================================================

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titre text not null,
  extrait text,
  contenu text,
  image text,
  pilier text,
  statut text not null default 'brouillon' check (statut in ('brouillon', 'publie')),
  date_publication timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index pour lister rapidement les articles publiés par date décroissante
create index if not exists posts_statut_date_idx
  on public.posts (statut, date_publication desc);

-- ----------------------------------------------------------------------------
-- Row Level Security : le public ne voit QUE les articles publiés.
-- (L'écriture / la gestion admin sera ajoutée avec l'auth — étape 4.)
-- ----------------------------------------------------------------------------
alter table public.posts enable row level security;

drop policy if exists "Articles publiés visibles par tous" on public.posts;
create policy "Articles publiés visibles par tous"
  on public.posts
  for select
  using (statut = 'publie');

-- ----------------------------------------------------------------------------
-- Données de démo (idempotent : on ne réinsère pas si le slug existe déjà)
-- ----------------------------------------------------------------------------
insert into public.posts (slug, titre, extrait, contenu, image, pilier, statut, date_publication)
values
(
  'clarifier-son-offre',
  'Clarifier son offre : par où commencer',
  'Une offre claire se résume en une phrase. Voici la méthode pour y arriver, sans jargon.',
  E'Quand on connaît son métier sur le bout des doigts, on a tendance à trop en dire. Résultat : un message confus, et un visiteur qui repart sans comprendre ce que vous vendez.\n\nLa clarté ne consiste pas à tout expliquer. Elle consiste à dire l''essentiel, dans le bon ordre.\n\nCommencez par une phrase : « J''aide [qui] à [résultat], grâce à [comment]. » Si vous ne tenez pas dans cette phrase, c''est que l''offre n''est pas encore au clair.\n\nEnsuite, testez-la. Lisez-la à voix haute à quelqu''un qui ne connaît pas votre métier. S''il reformule correctement, vous tenez quelque chose.',
  'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
  'Clarté',
  'publie',
  now() - interval '12 days'
),
(
  'structurer-sa-presence-en-ligne',
  'Structurer sa présence en ligne sans s''éparpiller',
  'Trois supports bien faits valent mieux que dix pages dispersées. Comment poser une base cohérente.',
  E'On croit souvent qu''être présent partout est un gage de sérieux. En réalité, une présence éparpillée fatigue : la vôtre comme celle de votre audience.\n\nMieux vaut quelques supports cohérents, qui se répondent, qu''une multitude de profils à moitié remplis.\n\nIdentifiez le canal où se trouvent vraiment vos clients. Soignez-le. Reliez-y une page de présentation simple et une façon claire de vous contacter.\n\nLe reste viendra ensuite, une brique à la fois.',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
  'Présence',
  'publie',
  now() - interval '6 days'
),
(
  'vendre-plus-simplement',
  'Vendre plus simplement : enlever les frictions',
  'Vendre, ce n''est pas convaincre à tout prix. C''est rendre la décision facile.',
  E'La vente se complique souvent à cause de petites frictions : un prix qu''on ne trouve pas, un bouton qui manque, une promesse floue.\n\nChaque hésitation est une porte de sortie. Votre travail consiste à les refermer, une à une.\n\nRendez le prochain pas évident. Un seul appel à l''action par page, formulé simplement : « Réserver », « Me contacter », « Recevoir le guide ».\n\nQuand le chemin est clair, la vente devient une conséquence naturelle, pas un combat.',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
  'Ventes',
  'publie',
  now() - interval '2 days'
)
on conflict (slug) do nothing;
