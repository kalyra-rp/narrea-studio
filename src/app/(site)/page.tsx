import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden">
        <Container className="py-24 text-center sm:py-32">
          <p className="font-script text-6xl leading-none text-gold-dark sm:text-8xl">
            Narrea Studio
          </p>
          <h1 className="mx-auto mt-8 max-w-3xl font-serif text-4xl font-semibold leading-[1.1] text-prune sm:text-5xl">
            Votre savoir-faire mérite d&apos;être vu, compris et acheté.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-greige sm:text-xl">
            Clarifiez votre offre. Structurez votre présence. Vendez plus simplement.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/services"
              className="inline-flex w-full justify-center rounded-full bg-prune px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep sm:w-auto"
            >
              Voir les offres
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full justify-center rounded-full border border-prune/30 px-7 py-3 text-sm font-medium text-prune transition-colors hover:border-prune hover:bg-prune/5 sm:w-auto"
            >
              Me contacter
            </Link>
          </div>
        </Container>
      </section>

      {/* ──────────────── Le problème de la cible ──────────────── */}
      <section className="bg-champagne/40">
        <Container className="py-20 text-center sm:py-24">
          <p className="font-script text-xl text-gold-dark">Ça vous parle ?</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-serif text-3xl font-semibold leading-snug text-prune sm:text-4xl">
            Vous savez faire votre métier, mais le présenter clairement en ligne,
            c&apos;est autre chose.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-greige sm:text-lg">
            Site qui ne ressemble pas à votre valeur, offre difficile à expliquer,
            supports éparpillés… On transforme ce flou en une présence claire,
            cohérente et prête à vendre.
          </p>
        </Container>
      </section>

      {/* ─────────────── Présentation de Narrea ─────────────── */}
      <section>
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-script text-xl text-gold-dark">Le studio</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-prune sm:text-4xl">
              Un studio digital pensé pour les indépendants
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/80 sm:text-lg">
              Narrea Studio accompagne les indépendants, créateurs et petites
              entreprises pour clarifier leur offre, structurer leur présence en
              ligne et créer des supports prêts à vendre. Une approche élégante et
              concrète : on pose les bonnes questions, on met de l&apos;ordre, et on
              livre des outils que vous pouvez vraiment utiliser.
            </p>
          </div>
        </Container>
      </section>

      {/* ───────────────── Les offres (aperçu → catalogue) ───────────────── */}
      <section className="bg-prune-deep text-champagne">
        <Container className="py-20 text-center sm:py-24">
          <p className="font-script text-xl text-gold">Les offres</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-semibold text-ivory sm:text-4xl">
            De l&apos;audit à l&apos;accompagnement complet
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-champagne/85 sm:text-lg">
            Selon là où vous en êtes, je vous aide à clarifier votre offre, à
            structurer une présence soignée ou à lancer un projet de A à Z — avec
            la possibilité d&apos;un accompagnement continu. Audits, kits prêts à
            l&apos;emploi, lancements et suivi mensuel : tout le détail vit sur la
            page services.
          </p>
          <div className="mt-9">
            <Link
              href="/services"
              className="inline-flex rounded-full bg-gold px-7 py-3 text-sm font-semibold text-prune-deep transition-colors hover:bg-gold-dark"
            >
              Voir le catalogue
            </Link>
          </div>
        </Container>
      </section>

      {/* ───────────── Aperçu produits numériques ───────────── */}
      <section>
        <Container className="py-20 sm:py-24">
          <div className="flex flex-col items-center gap-8 rounded-3xl border rule-gold bg-champagne/40 p-10 text-center sm:p-14 md:flex-row md:text-left">
            <div className="flex-1">
              <p className="font-script text-xl text-gold-dark">La boutique</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-prune sm:text-4xl">
                Des supports prêts à l&apos;emploi
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/80">
                Modèles, guides et kits numériques pour structurer votre présence
                sans repartir de zéro. À télécharger et utiliser tout de suite.
              </p>
            </div>
            <Link
              href="/boutique"
              className="inline-flex shrink-0 justify-center rounded-full bg-prune px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
            >
              Découvrir la boutique
            </Link>
          </div>
        </Container>
      </section>

      {/* ──────────────────── Témoignages ──────────────────── */}
      <section className="bg-champagne/40">
        <Container className="py-20 sm:py-24">
          <div className="text-center">
            <p className="font-script text-xl text-gold-dark">On en parle</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-prune sm:text-4xl">
              Ce qu&apos;en disent mes clients
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <figure
                key={i}
                className="flex flex-col rounded-2xl border rule-gold bg-ivory p-8"
              >
                <blockquote className="flex-1 font-serif text-lg italic leading-relaxed text-prune/70">
                  « Témoignage à venir — un retour client apparaîtra ici. »
                </blockquote>
                <figcaption className="mt-6 text-sm font-medium text-greige">
                  — Prénom, activité
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────────── CTA final ───────────────────── */}
      <section className="bg-prune text-ivory">
        <Container className="py-20 text-center sm:py-28">
          <p className="font-script text-2xl text-gold">On commence ?</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-semibold leading-snug text-ivory sm:text-4xl">
            Envie de clarifier votre offre et de structurer votre présence ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-champagne/85 sm:text-lg">
            Commencez par un Audit Clarté, ou écrivez-moi simplement pour me parler
            de votre projet.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/services/audit-clarte"
              className="inline-flex w-full justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold text-prune-deep transition-colors hover:bg-gold-dark sm:w-auto"
            >
              Réserver un Audit Clarté
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full justify-center rounded-full border border-ivory/40 px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-ivory/10 sm:w-auto"
            >
              M&apos;écrire
            </Link>
          </div>
        </Container>
      </section>

      {/* ───────────────────── Newsletter ───────────────────── */}
      <section className="bg-champagne/40">
        <Container className="py-16 text-center sm:py-20">
          <p className="font-script text-xl text-gold-dark">La newsletter</p>
          <h2 className="mx-auto mt-2 max-w-xl font-serif text-3xl font-semibold text-prune sm:text-4xl">
            Des idées claires, dans votre boîte mail
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-greige">
            Quelques conseils concrets pour clarifier votre offre et structurer
            votre présence. Sans spam, désinscription en un clic.
          </p>

          {/* Branché plus tard sur MailerLite (étape 6), comme /ressources. */}
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="vous@exemple.com"
              aria-label="Votre email"
              className="w-full rounded-full border border-prune/20 bg-ivory px-5 py-3 text-sm text-ink placeholder:text-greige/60 focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-prune px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
            >
              S&apos;inscrire
            </button>
          </form>
          <p className="mt-3 text-xs text-greige">
            Inscription activée prochainement.
          </p>
        </Container>
      </section>
    </>
  );
}
