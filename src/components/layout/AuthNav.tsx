import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { signOut } from "@/app/connexion/actions";

// Rendu côté serveur (session lue depuis les cookies) → état fiable dès le
// premier rendu, sur desktop comme mobile.
export async function AuthNav() {
  const user = await getSessionUser();

  if (!user) {
    return (
      <Link
        href="/connexion"
        className="rounded-full border border-prune/30 px-4 py-1.5 text-sm font-medium text-prune transition-colors hover:bg-prune/5"
      >
        Connexion
      </Link>
    );
  }

  const isAdmin = user.role === "admin";
  return (
    <div className="flex items-center gap-3">
      <Link
        href={isAdmin ? "/admin" : "/espace"}
        className="rounded-full bg-prune px-4 py-1.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
      >
        {isAdmin ? "Mon tableau de bord" : "Mon espace"}
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
  );
}
