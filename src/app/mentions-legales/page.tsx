import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Narrea Studio.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales" updated="à compléter">
      <p>
        <em>
          Modèle à compléter avec vos informations réelles avant la mise en
          ligne.
        </em>
      </p>

      <h2>Éditeur du site</h2>
      <p>
        Narrea Studio — [raison sociale / nom de l&apos;entrepreneur]
        <br />
        [forme juridique], [adresse]
        <br />
        SIRET : [numéro] · TVA intracommunautaire : [numéro]
        <br />
        Email : contact@narrea.studio
      </p>

      <h2>Directeur·rice de la publication</h2>
      <p>[Nom du ou de la responsable de la publication].</p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par [nom de l&apos;hébergeur], [adresse de
        l&apos;hébergeur].
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus présents sur ce site (textes, visuels,
        logo, identité) est la propriété de Narrea Studio, sauf mention
        contraire. Toute reproduction sans autorisation est interdite.
      </p>
    </LegalLayout>
  );
}
