import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Réalisations et cas clients de Narrea Studio : avant / après, et les résultats obtenus.",
};

// Placeholders de cas clients en attendant les vraies réalisations.
const cases = [
  {
    title: "Cas client à venir",
    sector: "Indépendante · service",
    summary:
      "Un avant / après illustrant la mise au clair de l'offre et la nouvelle présence en ligne.",
  },
  {
    title: "Cas client à venir",
    sector: "Créateur · produit",
    summary:
      "La structuration d'un lancement, de l'offre aux supports de vente.",
  },
  {
    title: "Cas client à venir",
    sector: "Petite entreprise",
    summary:
      "Une présence cohérente et professionnelle, déployée en quelques semaines.",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Réalisations"
        title="Des avant / après qui parlent"
        intro="Bientôt, vous retrouverez ici des cas clients concrets : la situation de départ, le travail mené, et le résultat."
      />

      <section>
        <Container className="py-20 sm:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            {cases.map((item, i) => (
              <article
                key={i}
                className="flex flex-col overflow-hidden rounded-2xl border rule-gold bg-ivory"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-prune-deep">
                  <span className="font-script text-2xl text-gold">
                    Avant / Après
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-gold-dark">
                    {item.sector}
                  </p>
                  <h2 className="mt-2 font-serif text-xl font-semibold text-prune">
                    {item.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-greige">
                    {item.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-champagne/40">
        <Container className="py-16 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold text-prune sm:text-4xl">
            Envie d&apos;être le prochain cas client ?
          </h2>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-prune px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
            >
              Me parler de votre projet
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
