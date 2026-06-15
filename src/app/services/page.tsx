import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Audit Clarté, Kit Présence Pro, Lancement Signature, Studio Mensuel et le Discord : les façons de travailler avec Narrea Studio.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Les offres"
        title="Travaillons ensemble, à votre rythme"
        intro="De la mise au clair de votre offre à un accompagnement continu : choisissez le format qui correspond à là où vous en êtes."
      />

      <section>
        <Container className="py-20 sm:py-24">
          <div className="flex flex-col gap-16 sm:gap-20">
            {services.map((offer, index) => (
              <article
                key={offer.slug}
                id={offer.slug}
                className="scroll-mt-28 grid items-center gap-8 md:grid-cols-2 md:gap-12"
              >
                {/* Texte */}
                <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                  <p className="font-script text-xl text-gold-dark">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-1 font-serif text-3xl font-semibold text-prune sm:text-4xl">
                    {offer.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-ink/80 sm:text-lg">
                    {offer.promise}
                  </p>
                  <p className="mt-4 text-sm font-medium text-greige">
                    {offer.forWhom}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-7 inline-flex rounded-full bg-prune px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
                  >
                    Me contacter
                  </Link>
                </div>

                {/* Ce qui est inclus */}
                <div
                  className={`rounded-3xl border rule-gold bg-champagne/30 p-8 sm:p-10 ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <p className="font-serif text-lg font-semibold text-prune">
                    Ce qui est inclus
                  </p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {offer.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-ink/80">
                        <span aria-hidden="true" className="mt-1 text-gold-dark">
                          ✦
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="bg-prune text-ivory">
        <Container className="py-20 text-center sm:py-24">
          <p className="font-script text-2xl text-gold">Pas sûre du bon format ?</p>
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
