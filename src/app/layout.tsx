import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, Caveat } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";

// Titres — serif élégante
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

// Texte — sans
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Accent manuscrit — usage parcimonieux
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const description =
  "Studio digital qui aide les indépendants, créateurs et petites entreprises à clarifier leur offre, structurer leur présence en ligne et créer des supports prêts à vendre.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Narrea Studio — Clarifiez votre offre. Structurez votre présence.",
    template: "%s · Narrea Studio",
  },
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: "Narrea Studio — Clarifiez votre offre. Structurez votre présence.",
    description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Narrea Studio",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${hanken.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        {children}
      </body>
    </html>
  );
}
