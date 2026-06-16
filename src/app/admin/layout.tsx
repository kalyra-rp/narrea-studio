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
  { label: "Produits", href: "/admin/produits" },
  { label: "Services", href: "/admin/services" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Projets", href: "/admin/projets" },
  { label: "Abonnés", href: "/admin/abonnes" },
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
        <Container className="flex h-16 items-center justify-between gap-3">
          <Link
            href="/admin"
            className="shrink-0 font-serif text-lg font-semibold"
          >
            Narrea · Admin
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/"
              className="hidden text-ivory/70 transition-colors hover:text-gold sm:inline"
            >
              ← Voir le site
            </Link>
            <span className="hidden text-ivory/50 lg:inline">{user.email}</span>
            <form action={signOut}>
              <button
                type="submit"
                className="shrink-0 rounded-full border border-ivory/30 px-3 py-1.5 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </Container>
        {/* Onglets : défilables horizontalement sur mobile */}
        <Container className="-mb-px">
          <nav className="flex gap-5 overflow-x-auto whitespace-nowrap pb-px text-sm">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b-2 border-transparent py-3 text-ivory/80 transition-colors hover:border-gold/60 hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
