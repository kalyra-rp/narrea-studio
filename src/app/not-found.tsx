import Link from "next/link";

// 404 globale du site — autonome (rendue dans le layout racine).
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 py-16 text-center">
      <Link
        href="/"
        className="flex items-center gap-3"
        aria-label="Narrea Studio — accueil"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold font-serif text-xl font-semibold text-prune">
          N
        </span>
        <span className="font-serif text-xl font-semibold tracking-wide text-prune">
          NARREA STUDIO
        </span>
      </Link>

      <p className="mt-10 font-script text-3xl text-gold-dark">Oups</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-prune sm:text-5xl">
        Cette page n&apos;existe pas
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-greige">
        Le lien est peut-être erroné ou la page a été déplacée.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <Link
          href="/"
          className="inline-flex w-full justify-center rounded-full bg-prune px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep sm:w-auto"
        >
          Retour au site
        </Link>
        <Link
          href="/services"
          className="inline-flex w-full justify-center rounded-full border border-prune/30 px-7 py-3 text-sm font-medium text-prune transition-colors hover:bg-prune/5 sm:w-auto"
        >
          Voir les offres
        </Link>
      </div>
    </main>
  );
}
