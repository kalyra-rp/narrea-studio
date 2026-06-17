import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getMergedServices } from "@/lib/services-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Le catalogue des offres Narrea Studio : Audit Clarté, Clarté Pro, Kit Présence Pro, Lancement Signature, Studio Mensuel et Serveur Discord pro.",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getMergedServices();
  return (
    <>
      <PageHeader
        eyebrow="Le catalogue"
        title="Travaillons ensemble, à votre rythme"
        intro="De la mise au clair de votre offre à un accompagnement continu : choisissez le format adapté à là où vous en êtes."
      />

      <section>
        <Container className="py-20 sm:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((offer) => (
              <article
                key={offer.slug}
                className="flex flex-col rounded-2xl border rule-gold bg-ivory p-8 transition-colors hover:border-gold"
              >
                <h2 className="font-serif text-2xl font-semibold text-prune">
                  {offer.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-greige">
                  {offer.tagline}
                </p>
                <p className="mt-5 font-serif text-lg font-semibold text-prune">
                  {offer.priceFrom}
                </p>
                <Link
                  href={`/services/${offer.slug}`}
                  className="mt-6 inline-flex w-fit rounded-full bg-prune px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
                >
                  Découvrir
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="bg-prune text-ivory">
        <Container className="py-20 text-center sm:py-24">
          <p className="font-script text-2xl text-gold">Pas sûr du bon format ?</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-semibold leading-snug text-ivory sm:text-4xl">
            Parlons-en, et trouvons ce qui vous convient
          </h2>
          <div className="mt-9">
            <Link
              href="/contact"
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
