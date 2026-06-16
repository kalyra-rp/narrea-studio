import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { BoutiqueCatalog } from "@/components/boutique/BoutiqueCatalog";
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
        <Container className="py-16 sm:py-20">
          {products.length === 0 ? (
            <p className="rounded-2xl border rule-gold bg-champagne/30 p-10 text-center text-greige">
              Les premiers produits arrivent bientôt.{" "}
              <Link href="/ressources" className="font-medium text-prune underline">
                Recevez une ressource gratuite
              </Link>{" "}
              en attendant.
            </p>
          ) : (
            <BoutiqueCatalog products={products} />
          )}
        </Container>
      </section>
    </>
  );
}
