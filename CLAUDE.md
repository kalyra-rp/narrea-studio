
# CLAUDE.md — Narrea Studio

> Fichier d'instructions pour Claude Code. À placer à la **racine du repo**.

---

## 🗣️ Règles de travail (IMPORTANT)

- **Communique toujours en français.**
- **Après chaque étape terminée :**
  1. **Commit + push** automatiquement sur la branche `main`, avec un message clair en français (ex. `feat: page services`).
  2. **Fais-moi un récap en français** de ce que tu viens de faire : fichiers créés/modifiés, décisions prises, et la prochaine étape proposée.
- **Avance étape par étape** selon l'« Ordre de construction » ci-dessous. Ne fais **pas** tout d'un coup. **Demande ma validation** avant de passer à une étape majeure.
- **Petits commits fréquents** plutôt qu'un gros bloc.
- **Ne committe JAMAIS de secrets** (`.env.local`, clés Supabase / Resend / Payhip). Vérifie que `.env*` est bien dans `.gitignore`.
- **Demande-moi confirmation** avant toute action destructrice (suppression de fichiers, reset de base, migration risquée).
- Respecte la **Direction artistique** ci-dessous pour tout le style.
- Code **clair, typé, accessible, responsive**, et **SEO-friendly** (surtout le blog).

---

## 🎯 Le projet

**Narrea Studio** — studio digital qui aide les indépendants, créateurs et petites entreprises à **clarifier leur offre, structurer leur présence en ligne et créer des supports prêts à vendre.**

Baseline : *Clarifiez votre offre. Structurez votre présence. Vendez plus simplement.*

Ce site est la « maison mère » : vitrine + offres + boutique + **blog géré depuis un dashboard admin** + **espace client**.

---

## 🧱 Stack

- **Next.js** (App Router, TypeScript, Tailwind, dossier `src/`)
- **Supabase** — base (Postgres) + Auth + Storage
- **Resend** — emails transactionnels (contact, notifs client)
- **MailerLite** — newsletter / lead magnet (intégration formulaire)
- **Payhip** — produits numériques (paiement + TVA + livraison ; on embarque leurs boutons)
- **Vercel** — déploiement (push sur `main` = déploiement auto)

Le blog est **géré en base via `/admin`** (pas de fichiers MDX, pas d'outil tiers).

---

## 🎨 Direction artistique

**Couleurs** (à mettre en tokens Tailwind) :

| Rôle | Nom | Hex |
| --- | --- | --- |
| Marque | Prune | `#5B2E4E` |
| Prune profond | Prune deep | `#3F2138` |
| Accent | Doré miel | `#E3AC3A` |
| Doré foncé | Doré sombre | `#C8902A` |
| Fond doux | Champagne | `#F1DFB8` |
| Fond principal | Ivoire | `#FAF4E8` |
| Texte | Encre | `#2E1826` |
| Texte secondaire | Greige | `#7C6B74` |

**Typographies** (via `next/font/google`) :

- **Titres** → **Cormorant Garamond** (serif élégante, weight 500/600)
- **Texte** → **Hanken Grotesk** (sans, 400/500/600)
- **Accent manuscrit** → **Caveat** (pour les petites touches, citations, signatures — usage parcimonieux)

**Logo** : « le sceau » — un **N** serif dans un sceau doré à double filet (texte en arc « NARREA STUDIO · EST. 2026 · »). Décliner en favicon/avatar (cercle + N, sans micro-texte en petit format).

**Style général** : élégant, éditorial, premium accessible. Beaucoup d'air, formes douces, filets dorés fins. Jamais chargé.

---

## 🗺️ Architecture

### Site public
- `/` Accueil — promesse, problème cible, présentation, les 3 offres, aperçu produits, témoignages, CTA
- `/services` — Audit Clarté · Kit Présence Pro · Lancement Signature · Studio Mensuel · Discord
- `/boutique` — produits numériques (Payhip)
- `/portfolio` — réalisations & cas clients (avant/après)
- `/journal` + `/journal/[slug]` — le blog
- `/a-propos` — Christelle & Narrea
- `/contact` — formulaire (Resend) + liens
- `/ressources` — lead magnet gratuit (→ MailerLite)
- Légal : `/mentions-legales` · `/cgv` · `/confidentialite`

### Espace client (auth, lien magique)
- `/connexion`
- `/espace` — mes projets
- `/espace/projets/[id]` — statut, livrables à télécharger, messages, factures

### Admin — back-office (rôle admin uniquement)
- `/admin` — vue d'ensemble
- `/admin/articles` (+ éditeur `nouveau` / `[id]`) — le dashboard blog
- `/admin/clients`
- `/admin/projets` — projets, statuts, dépôt de livrables
- `/admin/messages`

---

## 🗂️ Modèle de données (Supabase)

| Table | Champs clés | Rôle |
| --- | --- | --- |
| `posts` | slug, titre, extrait, contenu, image, pilier, statut (brouillon/publié), date | blog |
| `profiles` | id, rôle (admin/client), nom, email | comptes |
| `clients` | entreprise, contact, infos | clients directs |
| `projects` | client_id, titre, offre, statut, échéance, notes | suivi |
| `deliverables` | project_id, nom, type (fichier/lien), url | livrables |
| `messages` | project_id, auteur, contenu, date | option |
| `invoices` | client_id, n°, montant, statut, fichier | option |

**Sécurité** : Supabase Auth (lien magique). `profiles.role` = `admin` (tout) ou `client` (accès limité). **RLS** : chaque client ne voit **que ses propres** projets & livrables. Buckets Storage : `deliverables` (privé), `blog-images` (public).

---

## 🚧 Ordre de construction (étape par étape — attendre validation entre les grosses étapes)

1. **Setup** — tokens DA dans Tailwind, polices (`next/font`), layout de base, structure `src/`.
2. **Site public** — toutes les pages vitrine, responsive, dans la DA.
3. **Blog** — affichage public `/journal` + dashboard `/admin/articles` (éditeur création/édition/publication).
4. **Auth + rôles** — Supabase Auth (lien magique), rôles admin/client, protection des routes.
5. **Espace client** — projets + livrables + statuts (avec RLS).
6. **Intégrations** — Resend (contact), MailerLite (newsletter), Payhip (boutique).
7. **Finitions** — légal, SEO (sitemap, metadata, Open Graph), déploiement Vercel.

> Note : l'espace client (étapes 4-5) est un mini-CRM — la partie la plus lourde. Mettre d'abord le site + blog en ligne (étapes 1-3).