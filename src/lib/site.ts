// Configuration globale du site — réutilisée par le header, le footer et le SEO.

export const site = {
  name: "Narrea Studio",
  baseline: "Clarifiez votre offre. Structurez votre présence. Vendez plus simplement.",
  est: "EST. 2026",
} as const;

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
        "Format : une vidéo explicative (20-30 min) + un document de synthèse",
      ],
      option: "Appel de débrief 30 min — +50 €",
    },
    howItWorks: [
      "Vous remplissez un court questionnaire",
      "J'analyse et je prépare vos recommandations",
      "Vous recevez votre vidéo + synthèse, et on échange si besoin",
    ],
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
