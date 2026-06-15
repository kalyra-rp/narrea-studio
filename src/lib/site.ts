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
