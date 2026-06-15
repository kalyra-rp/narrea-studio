// Configuration globale du site — réutilisée par le header, le footer et le SEO.

export const site = {
  name: "Narrea Studio",
  baseline: "Clarifiez votre offre. Structurez votre présence. Vendez plus simplement.",
  est: "EST. 2026",
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

// Les offres du studio — réutilisées sur l'accueil et la page /services.
export type Offer = {
  slug: string;
  title: string;
  promise: string;
  forWhom: string;
  includes: string[];
};

export const services: Offer[] = [
  {
    slug: "audit-clarte",
    title: "Audit Clarté",
    promise:
      "On met votre offre au clair : message, cible et positionnement, pour savoir exactement quoi dire et à qui.",
    forWhom: "Pour vous si votre offre est floue ou difficile à expliquer.",
    includes: [
      "Un échange approfondi sur votre activité et vos objectifs",
      "L'analyse de votre offre, votre cible et votre positionnement",
      "Une synthèse claire : message, promesse et pistes d'action prioritaires",
    ],
  },
  {
    slug: "kit-presence-pro",
    title: "Kit Présence Pro",
    promise:
      "Une présence en ligne cohérente et professionnelle : les supports essentiels, prêts à l'emploi.",
    forWhom: "Pour structurer rapidement une présence soignée et homogène.",
    includes: [
      "Une identité visuelle légère et cohérente",
      "Les supports clés (bio, page de présentation, visuels)",
      "Des gabarits réutilisables pour rester autonome",
    ],
  },
  {
    slug: "lancement-signature",
    title: "Lancement Signature",
    promise:
      "Votre offre structurée de A à Z et un lancement soigné, pour vendre simplement et avec confiance.",
    forWhom: "Pour lancer ou relancer une offre avec une vraie stratégie.",
    includes: [
      "La structuration complète de votre offre",
      "Les pages et supports de vente nécessaires",
      "Un plan de lancement clair, étape par étape",
    ],
  },
  {
    slug: "studio-mensuel",
    title: "Studio Mensuel",
    promise:
      "Un accompagnement continu, mois après mois, pour faire évoluer votre présence sans vous éparpiller.",
    forWhom: "Pour celles et ceux qui veulent un soutien régulier dans la durée.",
    includes: [
      "Un volume de production défini chaque mois",
      "Des points réguliers et des priorités claires",
      "Un interlocuteur unique qui connaît votre univers",
    ],
  },
  {
    slug: "discord",
    title: "Le Discord",
    promise:
      "Une communauté bienveillante pour avancer entouré·e, poser vos questions et garder le cap.",
    forWhom: "Pour ne plus avancer seul·e dans votre activité.",
    includes: [
      "Des échanges entre indépendants et créateurs",
      "Des conseils et ressources partagés",
      "Des rendez-vous réguliers pour rester motivé·e",
    ],
  },
];

// Les 3 offres mises en avant sur l'accueil (sans duplication des données).
export const mainOffers = services.slice(0, 3);
