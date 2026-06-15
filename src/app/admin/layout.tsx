import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const adminNav = [
  { label: "Vue d'ensemble", href: "/admin" },
  { label: "Articles", href: "/admin/articles" },
];

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
          <Link
            href="/"
            className="text-sm text-ivory/70 transition-colors hover:text-gold"
          >
            ← Voir le site
          </Link>
        </Container>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
