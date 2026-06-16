import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getSessionUser } from "@/lib/auth";
import { signOut } from "@/app/connexion/actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const adminNav = [
  { label: "Vue d'ensemble", href: "/admin" },
  { label: "Articles", href: "/admin/articles" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Projets", href: "/admin/projets" },
];

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Double sécurité (en plus du middleware) : rôle admin requis.
  const user = await getSessionUser();
  if (!user) redirect("/connexion?next=/admin");
  if (user.role !== "admin") redirect("/connexion?erreur=acces-refuse");

  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      <header className="border-b border-prune/10 bg-prune-deep text-ivory">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-serif text-lg font-semibold">
              Narrea · Admin
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              {adminNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-ivory/80 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/"
              className="text-ivory/70 transition-colors hover:text-gold"
            >
              ← Voir le site
            </Link>
            <span className="hidden text-ivory/50 sm:inline">{user.email}</span>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-ivory/30 px-3 py-1.5 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </Container>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
