import Link from "next/link";
import { Container } from "@/components/ui/Container";

// 404 de l'espace client — rendue dans le layout /espace (chrome dédié).
export default function EspaceNotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-script text-2xl text-gold-dark">Oups</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-prune sm:text-4xl">
        Cette page n&apos;existe pas ou ne vous est pas accessible
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-greige">
        Vous ne pouvez consulter que vos propres projets. Si vous pensez qu&apos;il
        s&apos;agit d&apos;une erreur, écrivez-moi.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <Link
          href="/espace"
          className="inline-flex w-full justify-center rounded-full bg-prune px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep sm:w-auto"
        >
          Retour à mon espace
        </Link>
        <Link
          href="/"
          className="inline-flex w-full justify-center rounded-full border border-prune/30 px-6 py-2.5 text-sm font-medium text-prune transition-colors hover:bg-prune/5 sm:w-auto"
        >
          Retour au site
        </Link>
      </div>
    </Container>
  );
}
