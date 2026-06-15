import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { legalNav, mainNav, site, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t rule-gold bg-prune-deep text-champagne">
      <Container className="py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-2xl font-semibold text-ivory">Narrea Studio</p>
            <p className="mt-3 text-sm leading-relaxed text-champagne/80">{site.baseline}</p>
            <p className="mt-4 font-script text-lg text-gold">{site.est}</p>
          </div>

          <nav aria-label="Pied de page" className="flex flex-col gap-2 text-sm">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-champagne/80 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 text-sm">
            <p className="font-medium text-ivory">Retrouvez-moi</p>
            <a
              href={`mailto:${socials.email}`}
              className="text-champagne/80 transition-colors hover:text-gold"
            >
              Email
            </a>
            <a
              href={socials.comeup}
              target="_blank"
              rel="noopener noreferrer"
              className="text-champagne/80 transition-colors hover:text-gold"
            >
              ComeUp
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-champagne/15 pt-6 text-xs text-champagne/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Narrea Studio. Tous droits réservés.</p>
          <nav aria-label="Mentions légales" className="flex flex-wrap gap-4">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
