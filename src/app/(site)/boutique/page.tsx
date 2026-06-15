import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Modèles, guides et kits numériques de Narrea Studio pour structurer votre présence sans repartir de zéro.",
};

// Placeholders en attendant l'intégration Payhip (étape 6).
const placeholders = [0, 1, 2, 3, 4, 5];

export default function BoutiquePage() {
  return (
    <>
      <PageHeader
        eyebrow="La boutique"
        title="Des supports prêts à l'emploi"
        intro="Modèles, guides et kits numériques à télécharger et utiliser tout de suite. Les paiements seront gérés en toute sécurité via Payhip."
      />

      <section>
        <Container className="py-20 sm:py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {placeholders.map((i) => (
              <article
                key={i}
                className="flex flex-col overflow-hidden rounded-2xl border rule-gold bg-ivory"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-champagne/50">
                  <span className="font-script text-2xl text-gold-dark">
                    Bientôt disponible
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-serif text-xl font-semibold text-prune">
                    Produit à venir
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-greige">
                    Un nouveau support numérique sera bientôt disponible ici.
                  </p>
                  <span className="mt-5 text-sm font-medium text-ink/40">
                    Prochainement
                  </span>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-greige">
            La boutique se remplit petit à petit.{" "}
            <Link href="/ressources" className="font-medium text-prune underline">
              Recevez une ressource gratuite
            </Link>{" "}
            en attendant.
          </p>
        </Container>
      </section>
    </>
  );
}
