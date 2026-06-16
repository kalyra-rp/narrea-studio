import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResourceForm } from "@/components/forms/ResourceForm";

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

export default function RessourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gratuit"
        title="Votre ressource pour y voir clair"
        intro="Un guide offert pour clarifier votre offre et structurer votre présence. En le recevant, vous rejoignez aussi ma liste email : quelques conseils utiles, de temps en temps."
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

            {/* Inscription (Supabase subscribers + emails via Resend) */}
            <ResourceForm />
          </div>
        </Container>
      </section>
    </>
  );
}
