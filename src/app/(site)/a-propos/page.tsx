import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Christelle et Narrea Studio : une approche élégante et concrète pour clarifier votre offre et structurer votre présence en ligne.",
};

const values = [
  {
    title: "Clarté",
    text: "Dire les choses simplement, sans jargon, pour que votre message soit compris du premier coup.",
  },
  {
    title: "Élégance",
    text: "Une esthétique soignée et éditoriale, au service de votre crédibilité.",
  },
  {
    title: "Concret",
    text: "Des livrables que vous pouvez vraiment utiliser, et de l'autonomie pour la suite.",
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title="Christelle & Narrea"
        intro="Le studio est né d'une conviction : votre savoir-faire mérite une présence à sa hauteur."
      />

      <section>
        <Container className="py-20 sm:py-24">
          <div className="grid items-start gap-12 md:grid-cols-[1.2fr_1fr]">
            <div className="max-w-2xl">
              <p className="text-base leading-relaxed text-ink/80 sm:text-lg">
                Je suis Christelle, fondatrice de Narrea Studio. J&apos;accompagne
                les indépendants, créateurs et petites entreprises qui savent
                faire leur métier, mais qui peinent à le présenter clairement en
                ligne.
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink/80 sm:text-lg">
                Mon approche est simple : on clarifie votre offre, on structure
                votre présence, et on crée des supports prêts à vendre. Sans
                surcharge, sans superflu — juste ce qui compte, fait avec soin.
              </p>
              <p className="mt-5 font-script text-2xl text-gold-dark">
                Au plaisir de raconter votre histoire.
              </p>
            </div>

            <aside className="rounded-3xl border rule-gold bg-champagne/30 p-8">
              <p className="font-serif text-lg font-semibold text-prune">
                Mes valeurs
              </p>
              <ul className="mt-5 flex flex-col gap-5">
                {values.map((v) => (
                  <li key={v.title}>
                    <p className="font-serif text-base font-semibold text-prune">
                      {v.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-greige">
                      {v.text}
                    </p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-prune text-ivory">
        <Container className="py-16 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold text-ivory sm:text-4xl">
            On fait connaissance ?
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/services"
              className="inline-flex w-full justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold text-prune-deep transition-colors hover:bg-gold-dark sm:w-auto"
            >
              Voir les offres
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full justify-center rounded-full border border-ivory/40 px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-ivory/10 sm:w-auto"
            >
              Me contacter
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
