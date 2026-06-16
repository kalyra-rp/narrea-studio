import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal, GoldRule } from "@/components/ui/motion";
import { site } from "@/lib/site";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark";
const sectionTitle =
  "font-serif text-4xl font-semibold leading-tight text-prune sm:text-5xl";

// Les 3 piliers (reprend la baseline : Clarifiez · Structurez · Vendez).
const piliers = [
  {
    title: "Clarifier",
    text: "Une offre qu'on comprend en quelques secondes, sans jargon.",
  },
  {
    title: "Structurer",
    text: "Une présence en ligne nette, cohérente et professionnelle.",
  },
  {
    title: "Vendre",
    text: "Des supports prêts à l'emploi qui donnent envie de passer à l'action.",
  },
];

// Comment ça se passe.
const etapes = [
  { title: "On échange", text: "Vous me parlez de votre projet et de vos objectifs." },
  { title: "Je crée", text: "Je clarifie, je rédige et je conçois vos supports." },
  { title: "Vous recevez", text: "Des livrables clairs, prêts à utiliser tout de suite." },
];

// Pour qui c'est fait.
const audiences = [
  "Indépendants",
  "Coachs",
  "Consultants",
  "Thérapeutes",
  "Créateurs",
  "Formateurs",
  "Artisans",
  "Petites entreprises",
];

export default function Home() {
  return (
    <>
      {/* ───────────────────────── 1. Hero ───────────────────────── */}
      <section className="relative overflow-hidden">
        <Container className="py-28 text-center sm:py-36">
          <Reveal>
            <p className="font-script text-6xl leading-none text-gold-dark sm:text-8xl">
              Narrea Studio
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mx-auto mt-8 max-w-3xl font-serif text-4xl font-semibold leading-[1.1] text-prune sm:text-5xl">
              Votre savoir-faire mérite d&apos;être vu, compris et acheté.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-greige sm:text-xl">
              {site.baseline}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/services"
                className="inline-flex w-full justify-center rounded-full bg-prune px-7 py-3 text-sm font-medium text-ivory shadow-sm transition-all hover:-translate-y-0.5 hover:bg-prune-deep hover:shadow-md motion-reduce:hover:translate-y-0 sm:w-auto"
              >
                Voir les offres
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full justify-center rounded-full border border-prune/30 px-7 py-3 text-sm font-medium text-prune transition-all hover:-translate-y-0.5 hover:border-prune hover:bg-prune/5 motion-reduce:hover:translate-y-0 sm:w-auto"
              >
                Me contacter
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ───────────────────── 2. Le problème ───────────────────── */}
      <section className="bg-champagne/40">
        <Container className="py-24 text-center sm:py-28">
          <Reveal>
            <p className={eyebrow}>Ça vous parle ?</p>
            <h2 className={`mx-auto mt-4 max-w-3xl ${sectionTitle}`}>
              Vous savez faire votre métier. Le présenter, c&apos;est autre chose.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-greige sm:text-lg">
              Une offre difficile à expliquer, des supports éparpillés, un site qui
              ne vous ressemble pas… On transforme ce flou en une présence claire et
              prête à vendre.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ─────────────── 3. La solution en 3 piliers ─────────────── */}
      <section>
        <Container className="py-24 sm:py-32">
          <Reveal className="text-center">
            <p className={eyebrow}>La méthode</p>
            <h2 className={`mx-auto mt-4 max-w-2xl ${sectionTitle}`}>
              Clarifier, structurer, vendre
            </h2>
            <GoldRule className="mx-auto mt-6" />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {piliers.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 120}
                className="rounded-2xl border rule-gold bg-ivory p-8 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-prune/5 motion-reduce:hover:translate-y-0"
              >
                <span className="font-script text-3xl text-gold-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-prune">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-greige">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ──────────────────── 4. Les offres ──────────────────── */}
      <section className="bg-prune-deep text-champagne">
        <Container className="py-24 text-center sm:py-32">
          <Reveal>
            <p className={`${eyebrow} text-gold`}>Les offres</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-ivory sm:text-5xl">
              De l&apos;audit à l&apos;accompagnement complet
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-champagne/85 sm:text-lg">
              Selon là où vous en êtes, je vous aide à clarifier votre offre, à
              structurer une présence soignée ou à lancer un projet de A à Z, avec la
              possibilité d&apos;un suivi mensuel. Le détail complet vit sur la page
              services.
            </p>
            <div className="mt-9">
              <Link
                href="/services"
                className="inline-flex rounded-full bg-gold px-7 py-3 text-sm font-semibold text-prune-deep shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-md motion-reduce:hover:translate-y-0"
              >
                Voir le catalogue
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ─────────────── 5. Comment ça se passe ─────────────── */}
      <section>
        <Container className="py-24 sm:py-32">
          <Reveal className="text-center">
            <p className={eyebrow}>Simple et fluide</p>
            <h2 className={`mx-auto mt-4 max-w-2xl ${sectionTitle}`}>
              Comment ça se passe
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {etapes.map((step, i) => (
              <Reveal key={step.title} delay={i * 120} className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold font-serif text-xl font-semibold text-prune">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-serif text-2xl font-semibold text-prune">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-greige">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ──────────────────── 6. Pour qui ──────────────────── */}
      <section className="bg-champagne/40">
        <Container className="py-24 text-center sm:py-28">
          <Reveal>
            <p className={eyebrow}>Pour qui c&apos;est fait</p>
            <h2 className={`mx-auto mt-4 max-w-2xl ${sectionTitle}`}>
              À qui s&apos;adresse Narrea Studio
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-greige sm:text-lg">
              Indépendants, créateurs et petites structures qui veulent une présence
              à la hauteur de leur savoir-faire.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-3">
              {audiences.map((a) => (
                <li
                  key={a}
                  className="rounded-full border rule-gold bg-ivory px-4 py-2 text-sm font-medium text-prune"
                >
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>

          {/*
            Témoignages — à réactiver quand de vrais retours clients existeront.
            (Anciennes cartes « Témoignage à venir » retirées : elles faisaient inachevé.)
          */}
        </Container>
      </section>

      {/* ─────────────── 7. Boutique (bloc intermédiaire) ─────────────── */}
      <section>
        <Container className="py-16 sm:py-20">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl border rule-gold bg-champagne/30 px-8 py-10 text-center sm:px-12 sm:py-12">
            <p className={eyebrow}>La boutique</p>
            <h2 className="font-serif text-3xl font-semibold text-prune sm:text-4xl">
              Des supports prêts à l&apos;emploi
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-greige">
              Modèles, guides et kits numériques pour structurer votre présence
              sans repartir de zéro — à télécharger et utiliser tout de suite.
            </p>
            <Link
              href="/boutique"
              className="inline-flex rounded-full bg-prune px-6 py-2.5 text-sm font-medium text-ivory shadow-sm transition-all hover:-translate-y-0.5 hover:bg-prune-deep hover:shadow-md motion-reduce:hover:translate-y-0"
            >
              Découvrir la boutique
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* ──────────────────── 8. Newsletter ──────────────────── */}
      <section className="bg-champagne/40">
        <Container className="py-24 text-center sm:py-28">
          <Reveal>
            <p className={eyebrow}>La newsletter</p>
            <h2 className={`mx-auto mt-4 max-w-xl ${sectionTitle}`}>
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
                className="shrink-0 rounded-full bg-prune px-6 py-3 text-sm font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-prune-deep motion-reduce:hover:translate-y-0"
              >
                S&apos;inscrire
              </button>
            </form>
            <p className="mt-3 text-xs text-greige">
              Inscription activée prochainement.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ──────────────────── 9. CTA final ──────────────────── */}
      <section className="bg-prune text-ivory">
        <Container className="py-24 text-center sm:py-32">
          <Reveal>
            <p className="font-script text-2xl text-gold">On y va ?</p>
            <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl font-semibold leading-snug text-ivory sm:text-5xl">
              Envie d&apos;y voir plus clair ?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-champagne/85 sm:text-lg">
              Commencez par un Audit Clarté, ou écrivez-moi simplement pour me parler
              de votre projet.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/services/audit-clarte"
                className="inline-flex w-full justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold text-prune-deep shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-md motion-reduce:hover:translate-y-0 sm:w-auto"
              >
                Réserver un Audit
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full justify-center rounded-full border border-ivory/40 px-7 py-3 text-sm font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-ivory/10 motion-reduce:hover:translate-y-0 sm:w-auto"
              >
                M&apos;écrire
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
