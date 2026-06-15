import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

// Mise en page commune aux documents légaux : en-tête + corps de texte lisible.
export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Informations légales" title={title} />
      <section>
        <Container className="py-16 sm:py-20">
          <article className="legal-prose mx-auto max-w-2xl">
            <p className="text-sm text-greige">Dernière mise à jour : {updated}</p>
            {children}
          </article>
        </Container>
      </section>
    </>
  );
}
