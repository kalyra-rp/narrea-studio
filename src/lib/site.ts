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

// Les 3 offres principales — réutilisées sur l'accueil et la future page /services.
export const mainOffers: {
  slug: string;
  title: string;
  promise: string;
}[] = [
  {
    slug: "audit-clarte",
    title: "Audit Clarté",
    promise:
      "On met votre offre au clair : message, cible et positionnement, pour savoir exactement quoi dire et à qui.",
  },
  {
    slug: "kit-presence-pro",
    title: "Kit Présence Pro",
    promise:
      "Une présence en ligne cohérente et professionnelle : les supports essentiels, prêts à l'emploi.",
  },
  {
    slug: "lancement-signature",
    title: "Lancement Signature",
    promise:
      "Votre offre structurée de A à Z et un lancement soigné, pour vendre simplement et avec confiance.",
  },
];
