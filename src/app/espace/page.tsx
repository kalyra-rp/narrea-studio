import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getSessionUser } from "@/lib/auth";
import { signOut } from "@/app/connexion/actions";

export const metadata: Metadata = {
  title: "Mon espace",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

// Placeholder — l'espace client complet (projets, livrables, messagerie) arrive
// au Temps 2 de l'étape 5.
export default async function EspacePage() {
  const user = await getSessionUser();
  if (!user) redirect("/connexion?next=/espace");

  return (
    <main className="min-h-screen bg-ivory">
      <Container className="py-20 text-center">
        <p className="font-script text-2xl text-gold-dark">Votre espace</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-prune">
          Bienvenue{user.nom ? `, ${user.nom}` : ""}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-greige">
          Votre espace est activé. Vos projets, livrables et messages apparaîtront
          ici très bientôt.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-prune underline transition-colors hover:text-prune-deep"
          >
            Retour au site
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm font-medium text-greige transition-colors hover:text-prune"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </Container>
    </main>
  );
}
