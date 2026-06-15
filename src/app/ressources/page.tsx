import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Ressources",
  description:
    "Recevez gratuitement une ressource Narrea Studio pour clarifier votre offre et structurer votre présence en ligne.",
};

const benefits = [
  "Mettre votre offre au clair en quelques questions",
  "Identifier ce qui bloque dans votre présence en ligne",
  "Savoir par quoi commencer, concrètement",
];

const inputClass =
  "w-full rounded-xl border border-prune/20 bg-ivory px-4 py-3 text-sm text-ink placeholder:text-greige/60 focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40";

export default function RessourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gratuit"
        title="Votre ressource pour y voir clair"
        intro="Un guide offert pour clarifier votre offre et structurer votre présence — à recevoir directement par email."
      />

      <section>
        <Container className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-4xl items-center gap-10 rounded-3xl border rule-gold bg-champagne/30 p-8 sm:p-12 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-prune sm:text-3xl">
                Ce que vous y trouverez
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-ink/80">
                    <span aria-hidden="true" className="mt-1 text-gold-dark">
                      ✦
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inscription (branchement MailerLite à l'étape 6) */}
            <form className="rounded-2xl bg-ivory p-6 sm:p-8">
              <label
                htmlFor="email"
                className="text-sm font-medium text-prune"
              >
                Votre email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="vous@exemple.com"
                className={`mt-2 ${inputClass}`}
              />
              <button
                type="submit"
                className="mt-4 inline-flex w-full justify-center rounded-full bg-prune px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
              >
                Recevoir la ressource
              </button>
              <p className="mt-3 text-xs leading-relaxed text-greige">
                Pas de spam. Désinscription en un clic. L&apos;inscription sera
                activée prochainement.
              </p>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
