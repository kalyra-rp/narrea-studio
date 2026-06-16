import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { legalNav, site, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t rule-gold bg-prune-deep text-champagne">
      <Container className="py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-2xl font-semibold text-ivory">
              Narrea Studio
            </p>
            <p className="mt-2 text-sm leading-relaxed text-champagne/80">
              {site.baseline}
            </p>
            <p className="mt-3 font-script text-lg text-gold">{site.est}</p>
          </div>

          <div className="text-sm sm:text-right">
            <p className="font-medium text-ivory">Me contacter</p>
            <a
              href={`mailto:${socials.email}`}
              className="mt-1 inline-block text-champagne/80 transition-colors hover:text-gold"
            >
              {socials.email}
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-champagne/15 pt-5 text-xs text-champagne/60 sm:flex-row sm:items-center sm:justify-between">
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
