import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { OfferFormulas } from "@/components/services/OfferFormulas";
import { services } from "@/lib/site";
import { getMergedOffer } from "@/lib/services-content";

type Params = { slug: string };

// Génère les 5 pages dédiées au build.
export function generateStaticParams() {
  return services.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getMergedOffer(slug);
  if (!offer) return { title: "Offre introuvable" };
  return {
    title: offer.title,
    description: offer.promise,
  };
}

export default async function OfferPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const offer = await getMergedOffer(slug);
  if (!offer) notFound();

  return (
    <>
      {/* En-tête : titre + promesse */}
      <section className="border-b rule-gold bg-champagne/30">
        <Container className="py-16 text-center sm:py-20">
          <Link
            href="/services"
            className="text-sm text-greige underline transition-colors hover:text-prune"
          >
            ← Tout le catalogue
          </Link>
          <h1 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight text-prune sm:text-5xl">
            {offer.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-greige sm:text-lg">
            {offer.promise}
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            {/* Pour qui */}
            <h2 className="font-serif text-2xl font-semibold text-prune">
              Pour qui ?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/80">
              {offer.forWhom}
            </p>

            {/* Les formules */}
            <h2 className="mt-12 font-serif text-2xl font-semibold text-prune">
              Les formules
            </h2>
            <div className="mt-5">
              <OfferFormulas formulas={offer.formulas} />
            </div>

            {/* Comment ça se passe */}
            <h2 className="mt-12 font-serif text-2xl font-semibold text-prune">
              Comment ça se passe
            </h2>
            <ol className="mt-5 flex flex-col gap-4">
              {offer.howItWorks.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-prune font-serif text-sm font-semibold text-ivory">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-base leading-relaxed text-ink/80">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            {/* La différence (Audit Clarté & Clarté Pro uniquement) */}
            {offer.difference ? (
              <div className="mt-12 rounded-2xl border rule-gold bg-champagne/30 px-6 py-5">
                <h2 className="font-serif text-xl font-semibold text-prune">
                  {offer.difference.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-ink/80">
                  {offer.difference.text}
                </p>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* CTA : Me contacter, sujet pré-rempli */}
      <section className="bg-prune text-ivory">
        <Container className="py-16 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold leading-snug text-ivory sm:text-4xl">
            Envie de démarrer {offer.title} ?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-champagne/85">
            Parlez-moi de votre projet : je vous réponds rapidement.
          </p>
          <div className="mt-8">
            <Link
              href={`/contact?sujet=${offer.slug}`}
              className="inline-flex rounded-full bg-gold px-7 py-3 text-sm font-semibold text-prune-deep transition-colors hover:bg-gold-dark"
            >
              Me contacter
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
