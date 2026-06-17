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
  hook?: string; // accroche éditoriale, sous le sous-titre (optionnel)
  problem?: string; // « Le problème » — paragraphe d'intro (optionnel)
  whatItIs?: string; // « Ce que c'est » — description (optionnel)
  forWhom: string;
  formulas: OfferFormulas;
  howItWorks: [string, string, string];
  difference?: { title: string; text: string }; // comparaison avec une autre offre (optionnel)
  premiumNote?: string; // mise en avant « sur-mesure » (Discord)
};

export const services: Offer[] = [
  {
    slug: "audit-clarte",
    title: "Audit Clarté",
    tagline: "Voir clair sur ce qui bloque votre offre.",
    priceFrom: "À partir de 97 €",
    promise:
      "Je repère ce qui bloque dans votre offre ou votre présence, et je vous dis quoi corriger en priorité.",
    forWhom:
      "Vous hésitez à investir dans un accompagnement complet, mais vous voulez un regard professionnel — ou votre offre ne « parle » pas et vous ne savez pas pourquoi.",
    formulas: {
      kind: "single",
      price: "97 €",
      priceNote: "Tarif de lancement, puis 149 €",
      includes: [
        "L'analyse de votre offre, de votre bio et de votre page ou profil",
        "L'analyse de vos visuels actuels (si vous en avez)",
        "Les points de blocage identifiés + des recommandations concrètes",
        "Une checklist d'actions priorisée",
        "Format : un document PDF de synthèse, soigné et complet",
      ],
    },
    howItWorks: [
      "Vous remplissez un court questionnaire",
      "J'analyse et je prépare vos recommandations",
      "Vous recevez votre vidéo + synthèse, et on échange si besoin",
    ],
  },
  {
    slug: "clarte-pro",
    title: "Clarté Pro",
    tagline: "Votre offre clarifiée et rédigée, prête à publier.",
    priceFrom: "290 €",
    promise: "Votre offre clarifiée et rédigée, prête à publier.",
    hook: "Vous savez ce que vous valez. Il est temps qu'on le comprenne au premier regard.",
    problem:
      "Vous avez une offre solide, mais elle reste floue dans sa formulation : trop large, trop vague, ou simplement « dans votre tête ». Vous l'expliquez différemment à chaque fois, et vous sentez que ça vous fait perdre des clients. Vous n'avez pas besoin qu'on vous dise quoi corriger — vous avez besoin qu'on le fasse avec vous, jusqu'au texte final.",
    whatItIs:
      "Clarté Pro, c'est l'étape où votre offre passe du flou au limpide — et du limpide à l'écrit. Ensemble, on clarifie le fond, puis je rédige votre présentation d'offre, prête à publier sur votre site, votre page ou vos profils.",
    forWhom:
      "Les indépendants, créateurs et petites structures qui ont une vraie offre, mais peinent à la formuler clairement — et veulent un résultat abouti, pas seulement des pistes.",
    formulas: {
      kind: "single",
      price: "290 €",
      includes: [
        "Votre promesse formulée en une phrase claire (qui vous aidez, à quoi, comment)",
        "Votre cible définie précisément (et qui n'en fait pas partie)",
        "La structure complète de votre offre : ce que vous proposez, ce qui est inclus, le résultat, ce qui vous distingue",
        "La rédaction finale de votre présentation d'offre, prête à copier-coller",
        "Le tout livré dans un document soigné, à votre image",
        "Un échange pour cadrer le travail + une révision incluse",
      ],
    },
    howItWorks: [
      "Un échange de cadrage pour cerner votre offre et vos objectifs",
      "Je clarifie le fond, puis je rédige votre présentation d'offre",
      "Vous validez (une révision incluse) et recevez votre document prêt à publier",
    ],
    difference: {
      title: "La différence avec l'Audit Clarté",
      text: "L'Audit Clarté identifie ce qui bloque. Clarté Pro résout : on clarifie ET on rédige votre offre finale.",
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
      "Toute la communication pour lancer votre offre avec clarté, cohérence et confiance.",
    forWhom:
      "Vous lancez (ou relancez) une offre, une formation, un ebook, un programme, une boutique ou une nouvelle activité.",
    formulas: {
      kind: "table",
      tiers: [
        { name: "Lancement", price: "900 €" },
        { name: "Lancement +", price: "1 500 €", featured: true },
      ],
      rows: [
        { label: "Stratégie + angle de lancement", values: [true, true] },
        { label: "Page de vente", values: [true, true] },
        { label: "Séquence email", values: ["3 emails", "5 emails"] },
        { label: "Posts de lancement", values: ["12", "15"] },
        { label: "Visuels", values: [true, true] },
        { label: "Calendrier de lancement", values: [true, true] },
        {
          label: "Serveur Discord pro (structure + accueil)",
          values: [false, true],
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
      "Un soutien régulier, mois après mois, pour garder une présence cohérente et professionnelle — sans vous éparpiller.",
    forWhom:
      "Vous avez déjà une base, et vous voulez avancer dans la durée avec un interlocuteur unique qui connaît votre univers.",
    formulas: {
      kind: "table",
      note: "Sans engagement.",
      tiers: [
        { name: "Présence", price: "450 €/mois" },
        { name: "Présence +", price: "750 €/mois", featured: true },
      ],
      rows: [
        { label: "Posts + visuels / mois", values: ["8", "12"] },
        { label: "Newsletter", values: ["1", "2"] },
        { label: "Visuels promo", values: ["2", "4"] },
        { label: "Optimisation offre/page", values: ["1", "1"] },
        { label: "Appel de suivi mensuel", values: ["1", "1"] },
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
    tagline: "Un espace communautaire clair, beau et bien rangé.",
    priceFrom: "À partir de 95 €",
    promise:
      "Je conçois votre serveur Discord — clair, pratique et à votre image. Un espace où chaque membre trouve sa place tout de suite.",
    forWhom:
      "Une marque, un créateur, une formation ou une équipe qui veut un espace communautaire professionnel et bien rangé.",
    premiumNote:
      "Chaque serveur est pensé sur-mesure, dans le moindre détail. Le prix reste indicatif : c'est le soin apporté et le résultat qui comptent.",
    formulas: {
      kind: "table",
      tiers: [
        { name: "Structure", price: "95 €" },
        { name: "Complet", price: "180 €", featured: true },
        { name: "Clé en main", price: "280 €" },
      ],
      rows: [
        { label: "Arborescence + rôles + accueil", values: [true, true, true] },
        {
          label: "Habillage visuel (icône, bannière, emojis)",
          values: [false, true, true],
        },
        { label: "Onboarding des membres", values: [false, true, true] },
        { label: "Bots & automatisations", values: [false, false, true] },
        { label: "Mini-guide de gestion", values: [true, true, true] },
      ],
    },
    howItWorks: [
      "Vous me décrivez votre projet et votre univers",
      "Je construis (ou réorganise) votre serveur",
      "Vous validez, j'ajuste, et je vous remets un mini-guide pour le gérer",
    ],
  },
];

// Accès rapide par slug.
export function getOffer(slug: string): Offer | undefined {
  return services.find((o) => o.slug === slug);
}
