// Configuration globale du site — réutilisée par le header, le footer et le SEO.

export const site = {
  name: "Narrea Studio",
  baseline: "Clarifiez votre offre. Structurez votre présence. Vendez plus simplement.",
  est: "EST. 2026",
} as const;

// URL publique du site (configurable via Vercel ; sinon valeur par défaut).
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://narrea.studio"
).replace(/\/$/, "");

// Contact — réutilisé partout (header, footer, contact).
export const socials = {
  email: "contact@narrea.studio",
} as const;

// Navigation principale (site public)
export const mainNav: { label: string; href: string }[] = [
  { label: "Services", href: "/services" },
  { label: "Boutique", href: "/boutique" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Journal", href: "/journal" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

// Liens légaux (footer)
export const legalNav: { label: string; href: string }[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGV", href: "/cgv" },
  { label: "Confidentialité", href: "/confidentialite" },
];

// ----------------------------------------------------------------------------
// Offres du studio — source unique pour le catalogue /services, les pages
// dédiées /services/[slug], l'accueil et le formulaire de contact.
// ----------------------------------------------------------------------------

// Une formule : un palier (nom, prix, mise en avant éventuelle).
export type OfferTier = {
  name: string;
  price: string;
  featured?: boolean;
};

// Une ligne de comparatif : une valeur par palier (aligné par index).
// boolean = inclus / non inclus ; string = détail (« 6 », « 14 jours »…).
export type OfferRow = {
  label: string;
  values: (boolean | string)[];
};

// Les formules d'une offre : soit une formule unique, soit un comparatif.
export type OfferFormulas =
  | {
      kind: "single";
      price: string;
      priceNote?: string;
      includes: string[];
      option?: string;
    }
  | {
      kind: "table";
      tiers: OfferTier[];
      rows: OfferRow[];
      note?: string;
    };

export type Offer = {
  slug: string; // URL /services/[slug] et valeur ?sujet= du formulaire
  title: string;
  tagline: string; // une ligne pour la carte catalogue
  priceFrom: string; // « À partir de … » (carte catalogue)
  promise: string;
  forWhom: string;
  formulas: OfferFormulas;
  howItWorks: [string, string, string];
  difference?: { title: string; text: string }; // « La différence » — Audit Clarté & Clarté Pro
};

export const services: Offer[] = [
  {
    slug: "audit-clarte",
    title: "Audit Clarté",
    tagline: "Voir clair sur ce qui bloque votre offre.",
    priceFrom: "À partir de 97 €",
    promise:
      "Un regard extérieur qui identifie ce qui bloque dans votre offre — et quoi corriger en priorité.",
    forWhom:
      "Vous hésitez à investir dans un accompagnement complet, mais vous voulez un regard professionnel — ou votre offre ne « parle » pas et vous ne savez pas pourquoi.",
    formulas: {
      kind: "table",
      tiers: [
        { name: "Essentiel", price: "97 €" },
        { name: "Approfondi", price: "149 €", featured: true },
      ],
      rows: [
        { label: "Analyse de votre offre", values: [true, true] },
        { label: "Analyse de votre bio + page ou profil", values: [true, true] },
        { label: "Analyse de vos visuels actuels", values: [true, true] },
        {
          label: "Points de blocage + recommandations concrètes",
          values: [true, true],
        },
        { label: "Checklist d'actions priorisée", values: [true, true] },
        { label: "Synthèse PDF soignée", values: [true, true] },
        { label: "Analyse concurrence / positionnement", values: [false, true] },
        { label: "Pistes de reformulation rédigées", values: [false, true] },
        { label: "Échange de débrief", values: [false, true] },
      ],
    },
    howItWorks: [
      "Vous remplissez un court questionnaire",
      "J'analyse et je prépare vos recommandations",
      "Vous recevez votre synthèse PDF, et on échange si besoin",
    ],
    difference: {
      title: "La différence avec Clarté Pro",
      text: "L'Audit Clarté identifie ce qui bloque dans votre offre. Clarté Pro va plus loin : on clarifie ET on rédige votre offre finale, prête à publier.",
    },
  },
  {
    slug: "clarte-pro",
    title: "Clarté Pro",
    tagline: "Votre offre clarifiée et rédigée, prête à publier.",
    priceFrom: "À partir de 290 €",
    promise:
      "Votre offre clarifiée, rédigée et prête à publier — du fond jusqu'au texte final.",
    forWhom:
      "Les indépendants, créateurs et petites structures qui ont une vraie offre, mais peinent à la formuler clairement — et veulent un résultat abouti, pas seulement des pistes.",
    formulas: {
      kind: "table",
      tiers: [
        { name: "Essentiel", price: "290 €" },
        { name: "Complet", price: "450 €", featured: true },
        { name: "Signature", price: "690 €" },
      ],
      rows: [
        { label: "Offre clarifiée + promesse", values: [true, true, true] },
        { label: "Cible précise définie", values: [true, true, true] },
        { label: "Structure complète de l'offre", values: [true, true, true] },
        { label: "Présentation d'offre rédigée", values: [true, true, true] },
        { label: "Bio courte alignée", values: [false, true, true] },
        { label: "Déclinaison sur 2 plateformes", values: [false, true, true] },
        { label: "Page de vente complète rédigée", values: [false, false, true] },
        { label: "Révisions incluses", values: ["1", "2", "3"] },
      ],
    },
    howItWorks: [
      "Un échange de cadrage pour cerner votre offre et vos objectifs",
      "Je clarifie le fond, puis je rédige votre présentation d'offre",
      "Vous validez (révisions incluses) et recevez votre document prêt à publier",
    ],
    difference: {
      title: "La différence avec l'Audit Clarté",
      text: "L'Audit Clarté identifie ce qui bloque. Clarté Pro résout : on clarifie ET on rédige votre offre finale, prête à publier.",
    },
  },
  {
    slug: "kit-presence-pro",
    title: "Kit Présence Pro",
    tagline: "Votre présence en ligne complète et cohérente.",
    priceFrom: "À partir de 450 €",
    promise:
      "Une offre clarifiée, des textes prêts à publier, des visuels professionnels et une mini-page : votre présence en ligne complète, d'un coup.",
    forWhom:
      "Vous savez ce que vous vendez, mais vous l'expliquez mal et tout est dispersé. Vous voulez une présence soignée et homogène, sans devoir tout faire vous-même.",
    formulas: {
      kind: "table",
      tiers: [
        { name: "Essentiel", price: "450 €" },
        { name: "Complet", price: "750 €", featured: true },
        { name: "Signature", price: "1 200 €" },
      ],
      rows: [
        { label: "Offre clarifiée + promesse", values: [true, true, true] },
        { label: "Fiche d'offre rédigée", values: [true, true, true] },
        { label: "Bio (courte + longue)", values: [true, true, true] },
        { label: "Visuels Canva coordonnés", values: [false, "6", "10"] },
        { label: "Mini-page de présentation", values: [false, true, true] },
        { label: "Calendrier de contenu", values: [false, "14 jours", "30 jours"] },
        { label: "Bannière", values: [false, false, true] },
      ],
    },
    howItWorks: [
      "Échange de cadrage + questionnaire détaillé",
      "Je construis votre présence, étape par étape",
      "Vous validez (allers-retours inclus), je vous livre le tout + un mini-guide",
    ],
  },
  {
    slug: "lancement-signature",
    title: "Lancement Signature",
    tagline: "Lancez votre offre avec clarté et confiance.",
    priceFrom: "À partir de 900 €",
    promise:
      "Lancez votre offre avec clarté et confiance — du positionnement jusqu'au dernier email.",
    forWhom:
      "Vous lancez (ou relancez) une offre, une formation, un ebook, un programme, une boutique ou une nouvelle activité.",
    formulas: {
      kind: "table",
      tiers: [
        { name: "Lancement", price: "900 €" },
        { name: "Signature", price: "1 500 €", featured: true },
        { name: "Prestige", price: "2 200 €" },
      ],
      rows: [
        {
          label: "Offre clarifiée + positionnement",
          values: [true, true, true],
        },
        { label: "Page de vente complète rédigée", values: [true, true, true] },
        { label: "Structure de prix et d'offre", values: [true, true, true] },
        {
          label: "Visuels de lancement coordonnés",
          values: [true, true, true],
        },
        {
          label: "Séquence d'emails de lancement",
          values: [false, "3 emails", "5 emails"],
        },
        { label: "Plan de contenu de lancement", values: [false, true, true] },
        { label: "Bio & profils alignés", values: [false, true, true] },
        { label: "Mini-page / espace dédié", values: [false, false, true] },
        {
          label: "Accompagnement pendant le lancement",
          values: [false, false, true],
        },
      ],
    },
    howItWorks: [
      "Atelier de cadrage : on définit l'offre, l'angle, le calendrier",
      "Je produis toute la communication de lancement",
      "Vous validez, et vous lancez avec un plan clair en main",
    ],
  },
  {
    slug: "studio-mensuel",
    title: "Studio Mensuel",
    tagline: "Une présence régulière, sans vous éparpiller.",
    priceFrom: "À partir de 450 €/mois",
    promise:
      "Une présence en ligne régulière et soignée, mois après mois — sans vous éparpiller.",
    forWhom:
      "Vous avez déjà une base, et vous voulez avancer dans la durée avec un interlocuteur unique qui connaît votre univers.",
    formulas: {
      kind: "table",
      note: "Sans engagement.",
      tiers: [
        { name: "Présence", price: "450 €/mois" },
        { name: "Croissance", price: "750 €/mois", featured: true },
        { name: "Signature", price: "1 200 €/mois" },
      ],
      rows: [
        { label: "Échange mensuel de cadrage", values: [true, true, true] },
        { label: "Visuels / contenus par mois", values: ["4", "8", "15"] },
        { label: "Ligne éditoriale tenue à jour", values: [true, true, true] },
        { label: "Révisions et ajustements", values: [true, true, true] },
        { label: "Calendrier de contenu mensuel", values: [false, true, true] },
        { label: "Rédaction de posts / textes", values: [false, true, true] },
        { label: "Priorité de traitement", values: [false, false, true] },
        { label: "Bilan stratégique trimestriel", values: [false, false, true] },
      ],
    },
    howItWorks: [
      "On définit ensemble vos priorités du mois",
      "Je produis et vous validez au fil de l'eau",
      "Un appel mensuel pour faire le point et ajuster",
    ],
  },
  {
    slug: "serveur-discord-pro",
    title: "Serveur Discord pro",
    tagline: "Un serveur clair et structuré, que vous gérez ensuite vous-même.",
    priceFrom: "À partir de 95 €",
    promise:
      "Un espace Discord clair, structuré et esthétique — que vous gérez ensuite en toute autonomie.",
    forWhom:
      "Une marque, un créateur, une formation ou une équipe qui veut un serveur Discord professionnel et bien rangé, livré prêt à l'emploi pour le gérer soi-même ensuite.",
    formulas: {
      kind: "table",
      note: "Chaque serveur est pensé sur-mesure : le prix reste indicatif, c'est le soin apporté et le résultat qui comptent.",
      tiers: [
        { name: "Essentiel", price: "95 €" },
        { name: "Complet", price: "180 €", featured: true },
        { name: "Signature", price: "280 €" },
      ],
      rows: [
        { label: "Structure (salons + catégories)", values: [true, true, true] },
        { label: "Rôles et permissions de base", values: [true, true, true] },
        {
          label: "Message d'accueil + salon règles",
          values: [true, true, true],
        },
        {
          label: "Esthétique soignée (noms, émojis)",
          values: [true, true, true],
        },
        { label: "Mini-guide de gestion", values: [true, true, true] },
        { label: "Bots & automatisations", values: [false, true, true] },
        { label: "Structure étendue (usage avancé)", values: [false, true, true] },
        {
          label: "Salons premium (vocal, événements…)",
          values: [false, false, true],
        },
        {
          label: "Accompagnement à la prise en main",
          values: [false, false, true],
        },
      ],
    },
    howItWorks: [
      "Vous me décrivez votre projet et votre univers",
      "Je construis (ou réorganise) votre serveur",
      "Vous validez, j'ajuste, et je vous remets un mini-guide pour le gérer en autonomie",
    ],
  },
];

// Accès rapide par slug.
export function getOffer(slug: string): Offer | undefined {
  return services.find((o) => o.slug === slug);
}
