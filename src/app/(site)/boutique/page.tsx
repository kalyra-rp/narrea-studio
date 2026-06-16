import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPublishedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Modèles, guides et kits numériques de Narrea Studio pour structurer votre présence sans repartir de zéro.",
};

export const revalidate = 60;

export default async function BoutiquePage() {
  const products = await getPublishedProducts();

  return (
    <>
      <PageHeader
        eyebrow="La boutique"
        title="Des supports prêts à l'emploi"
        intro="Modèles, guides et kits numériques à télécharger et utiliser tout de suite. Les paiements sont gérés en toute sécurité via Payhip."
      />

      <section>
        <Container className="py-20 sm:py-24">
          {products.length === 0 ? (
            <p className="rounded-2xl border rule-gold bg-champagne/30 p-10 text-center text-greige">
              Les premiers produits arrivent bientôt.{" "}
              <Link href="/ressources" className="font-medium text-prune underline">
                Recevez une ressource gratuite
              </Link>{" "}
              en attendant.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => {
                const available = Boolean(p.payhip_url);
                return (
                  <article
                    key={p.id}
                    className="flex flex-col overflow-hidden rounded-2xl border rule-gold bg-ivory transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
                  >
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-champagne/50">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.nom}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <span className="font-script text-2xl text-gold-dark">
                          {p.nom}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {p.categorie ? (
                        <span className="text-xs font-medium uppercase tracking-wider text-gold-dark">
                          {p.categorie}
                        </span>
                      ) : null}
                      <h2 className="mt-2 font-serif text-xl font-semibold text-prune">
                        {p.nom}
                      </h2>
                      {p.description ? (
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-greige">
                          {p.description}
                        </p>
                      ) : (
                        <span className="flex-1" />
                      )}
                      <div className="mt-5 flex items-center justify-between gap-3">
                        <span className="font-serif text-lg font-semibold text-prune">
                          {p.prix ?? ""}
                        </span>
                        {available ? (
                          <a
                            href={p.payhip_url!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-prune px-5 py-2 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
                          >
                            Acheter
                          </a>
                        ) : (
                          <span className="rounded-full bg-champagne px-4 py-2 text-sm font-medium text-greige">
                            Bientôt
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
