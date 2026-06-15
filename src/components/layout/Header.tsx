import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { mainNav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b rule-gold bg-ivory/85 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        {/* Logo « le sceau » — placeholder typographique en attendant le SVG */}
        <Link href="/" className="flex items-center gap-3.5" aria-label={`${site.name} — accueil`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold text-prune font-serif text-xl font-semibold">
            N
          </span>
          <span className="font-serif text-xl font-semibold tracking-wide text-prune">
            NARREA STUDIO
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-ink">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-prune"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/services#audit-clarte"
          className="rounded-full bg-prune px-5 py-2 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
        >
          Réserver un Audit
        </Link>
      </Container>
    </header>
  );
}
