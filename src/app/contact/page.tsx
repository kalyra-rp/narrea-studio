import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlez-moi de votre projet. Narrea Studio vous répond rapidement pour clarifier votre offre et structurer votre présence.",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-prune/20 bg-ivory px-4 py-3 text-sm text-ink placeholder:text-greige/60 focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40";

export default function ContactPage() {
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
                      href="mailto:contact@narrea.studio"
                      className="underline transition-colors hover:text-prune"
                    >
                      contact@narrea.studio
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-prune">Communauté</dt>
                  <dd className="mt-1 text-greige">
                    Rejoignez le Discord depuis la page Services.
                  </dd>
                </div>
              </dl>
            </div>

            {/* Formulaire (branchement Resend à l'étape 6) */}
            <form className="rounded-3xl border rule-gold bg-champagne/30 p-8 sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-prune">
                    Nom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Votre nom"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-prune">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="vous@exemple.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="subject" className="text-sm font-medium text-prune">
                  Sujet
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="L'objet de votre message"
                  className={inputClass}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="text-sm font-medium text-prune">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Parlez-moi de votre projet…"
                  className={`${inputClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full justify-center rounded-full bg-prune px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep sm:w-auto"
              >
                Envoyer le message
              </button>
              <p className="mt-3 text-xs text-greige">
                L&apos;envoi sera activé prochainement (intégration en cours).
              </p>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
