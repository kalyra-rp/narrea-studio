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

export default async function EspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getSessionUser();
  if (!user) redirect("/connexion?next=/espace");

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <header className="border-b rule-gold bg-ivory/85 backdrop-blur">
        <Container className="flex h-16 items-center justify-between gap-3">
          <Link
            href="/espace"
            className="flex items-center gap-3"
            aria-label="Mon espace Narrea Studio"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold font-serif text-base font-semibold text-prune">
              N
            </span>
            <span className="font-serif text-lg font-semibold text-prune">
              Mon espace
            </span>
          </Link>

          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/espace/mot-de-passe"
              className="hidden text-greige transition-colors hover:text-prune sm:inline"
            >
              Mot de passe
            </Link>
            <Link
              href="/"
              className="hidden text-greige transition-colors hover:text-prune sm:inline"
            >
              Le site
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-prune/20 px-3 py-1.5 font-medium text-prune transition-colors hover:bg-prune/5"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </Container>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
