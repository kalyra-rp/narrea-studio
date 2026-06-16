import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { services, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlez-moi de votre projet. Narrea Studio vous répond rapidement pour clarifier votre offre et structurer votre présence.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sujet?: string }>;
}) {
  const { sujet } = await searchParams;
  // Pré-sélection du sujet depuis l'URL (?sujet=slug), sinon « autre ».
  const selectedSujet = services.some((o) => o.slug === sujet) ? sujet! : "autre";

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de votre projet"
        intro="Une question, une envie, un projet en tête ? Écrivez-moi : je vous réponds rapidement."
      />

      <section>
        <Container className="py-20 sm:py-24">
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
            {/* Coordonnées */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-prune">
                Me joindre directement
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-greige">
                Vous préférez écrire directement ? C&apos;est par ici.
              </p>
              <dl className="mt-6 flex flex-col gap-4 text-sm">
                <div>
                  <dt className="font-medium text-prune">Email</dt>
                  <dd className="mt-1 text-greige">
                    <a
                      href={`mailto:${socials.email}`}
                      className="underline transition-colors hover:text-prune"
                    >
                      {socials.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Formulaire (envoi via Resend) */}
            <ContactForm initialSujet={selectedSujet} />
          </div>
        </Container>
      </section>
    </>
  );
}
