// Configuration globale du site — réutilisée par le header, le footer et le SEO.

export const site = {
  name: "Narrea Studio",
  baseline: "Clarifiez votre offre. Structurez votre présence. Vendez plus simplement.",
  est: "EST. 2026",
} as const;

// Réseaux et contact — réutilisés partout (header, footer, contact).
export const socials = {
  email: "contact@narrea.studio",
  linkedin: "https://www.linkedin.com/in/christelle-faggi",
  comeup: "https://comeup.com/fr/@narrea-studio",
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
  includesLabel?: string; // intitulé du bloc « inclus » (défaut : « Ce qui est inclus »)
  price: string;
  cta: { label: string; href: string };
};

export const services: Offer[] = [
  {
    slug: "audit-clarte",
    title: "Audit Clarté",
    promise:
      "Je repère ce qui bloque dans votre offre ou votre présence, et je vous dis quoi corriger en priorité.",
    forWhom:
      "Vous hésitez à investir dans un accompagnement complet, mais vous voulez un regard professionnel — ou votre offre ne « parle » pas et vous ne savez pas pourquoi.",
    includes: [
      "L'analyse de votre offre, de votre bio et de votre page ou profil",
      "L'analyse de vos visuels actuels (si vous en avez)",
      "Les points faibles identifiés, et des recommandations concrètes",
      "Une checklist d'actions priorisée, par où commencer",
      "Format : une vidéo explicative (20-30 min) + un document de synthèse",
    ],
    price: "À partir de 97 € (tarif de lancement)",
    cta: { label: "Réserver mon Audit", href: "/contact" },
  },
  {
    slug: "kit-presence-pro",
    title: "Kit Présence Pro",
    promise:
      "Une offre clarifiée, des textes prêts à publier, des visuels professionnels et une mini-page : votre socle complet.",
    forWhom:
      "Vous savez ce que vous vendez, mais vous l'expliquez mal et tout est dispersé. Vous voulez une présence soignée et homogène, sans devoir tout faire vous-même.",
    includes: [
      "La clarification de votre offre + une promesse reformulée",
      "Une fiche d'offre professionnelle",
      "Vos textes : bio courte, bio longue, pitch",
      "Une bannière (réseau au choix)",
      "6 visuels Canva coordonnés à votre identité",
      "6 textes de posts prêts à publier",
      "Une mini-page de présentation",
      "Un calendrier de publication sur 14 jours",
      "Un mini-guide pour tout utiliser",
    ],
    price: "À partir de 450 € (tarif de lancement)",
    cta: { label: "Me contacter", href: "/contact" },
  },
  {
    slug: "lancement-signature",
    title: "Lancement Signature",
    promise:
      "Toute la communication pour lancer votre offre avec clarté, cohérence et confiance.",
    forWhom:
      "Vous lancez (ou relancez) une offre, une formation, un ebook, un programme, une boutique ou une nouvelle activité.",
    includes: [
      "La clarification stratégique de l'offre + l'angle de lancement",
      "Une page de vente",
      "Une séquence de 3 à 5 emails",
      "12 à 15 posts pour accompagner le lancement",
      "Les visuels nécessaires",
      "Un calendrier de lancement, étape par étape",
      "Une FAQ commerciale et des appels à l'action",
    ],
    price: "À partir de 900 €",
    cta: { label: "Me contacter", href: "/contact" },
  },
  {
    slug: "studio-mensuel",
    title: "Studio Mensuel",
    promise:
      "Un soutien régulier, mois après mois, pour garder une présence cohérente sans vous éparpiller.",
    forWhom:
      "Vous avez déjà une base, et vous voulez avancer dans la durée avec un interlocuteur unique qui connaît votre univers.",
    includes: [
      "8 posts + 8 visuels",
      "1 newsletter",
      "2 visuels promotionnels",
      "1 mini-optimisation d'offre ou de page",
      "1 appel mensuel de suivi",
      "Un calendrier éditorial",
    ],
    includesLabel: "Ce qui est inclus (chaque mois)",
    price: "À partir de 450 € / mois",
    cta: { label: "Me contacter", href: "/contact" },
  },
  {
    slug: "discord",
    title: "Serveur Discord pro",
    promise:
      "Je conçois votre serveur Discord — clair, pratique et à votre image. Un espace où chacun trouve sa place tout de suite.",
    forWhom:
      "Une marque, un créateur, une formation ou une équipe qui veut un espace communautaire professionnel et bien rangé. (Cadrage B2B / pro — pas de serveurs de jeu ou de RP loisir.)",
    includes: [
      "Une arborescence pensée (catégories et salons utiles, sans superflu)",
      "Des rôles et permissions propres et logiques",
      "Un salon d'accueil et des règles soignés",
      "Un mini-guide pour gérer votre serveur",
      "En option : habillage visuel (icône, bannière, emojis), bots & automatisations, onboarding des membres",
    ],
    price: "À partir de 95 €",
    cta: { label: "Commander sur ComeUp", href: socials.comeup },
  },
];

// Les 3 offres mises en avant sur l'accueil (sans duplication des données).
export const mainOffers = services.slice(0, 3);
