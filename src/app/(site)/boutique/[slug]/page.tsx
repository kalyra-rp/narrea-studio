import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/boutique/ProductCard";
import {
  getPublishedProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

export const revalidate = 60;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);
  if (!product) return { title: "Produit introuvable" };
  const description = product.description ?? undefined;
  return {
    title: product.nom,
    description,
    openGraph: {
      type: "website",
      title: product.nom,
      description,
      images: product.image ? [{ url: product.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.nom,
      description,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categorie, product.id);
  const available = Boolean(product.payhip_url);

  return (
    <>
      <section>
        <Container className="py-12 sm:py-16">
          <Link
            href="/boutique"
            className="text-sm text-greige underline transition-colors hover:text-prune"
          >
            ← La boutique
          </Link>

          <div className="mt-6 grid gap-10 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-3xl border rule-gold bg-champagne/40">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.nom}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-script text-3xl text-gold-dark">
                  {product.nom}
                </div>
              )}
            </div>

            {/* Infos */}
            <div>
              {product.categorie ? (
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                  {product.categorie}
                </span>
              ) : null}
              <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight text-prune sm:text-5xl">
                {product.nom}
              </h1>
              {product.prix ? (
                <p className="mt-4 font-serif text-2xl font-semibold text-prune">
                  {product.prix}
                </p>
              ) : null}

              {product.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border rule-gold px-3 py-1 text-xs text-prune"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-8">
                {available ? (
                  <a
                    href={product.payhip_url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full bg-prune px-8 py-3 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
                  >
                    Acheter sur Payhip
                  </a>
                ) : (
                  <span className="inline-flex rounded-full bg-champagne px-6 py-3 text-sm font-medium text-greige">
                    Bientôt disponible
                  </span>
                )}
              </div>

              {product.inclus.length > 0 ? (
                <div className="mt-8">
                  <p className="font-serif text-lg font-semibold text-prune">
                    Ce qui est inclus
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {product.inclus.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-ink/80">
                        <span aria-hidden="true" className="mt-0.5 text-gold-dark">
                          ✦
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          {/* Description complète */}
          {product.description ? (
            <div className="mt-12 max-w-2xl">
              <h2 className="font-serif text-2xl font-semibold text-prune">
                Description
              </h2>
              <div className="article-prose mt-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {product.description}
                </ReactMarkdown>
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      {/* Vous aimerez aussi */}
      {related.length > 0 ? (
        <section className="bg-champagne/30">
          <Container className="py-16 sm:py-20">
            <h2 className="font-serif text-2xl font-semibold text-prune sm:text-3xl">
              Vous aimerez aussi
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
