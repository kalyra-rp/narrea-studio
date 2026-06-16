import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Narrea Studio.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales" updated="16/06/2026">
      <h2>Éditeur du site</h2>
      <p>
        Le présent site, accessible à l&apos;adresse narrea.studio, est édité par{" "}
        <strong>Christelle Faggi</strong>, travailleur autonome (entreprise
        individuelle), exerçant sous le nom commercial{" "}
        <strong>Narrea Studio</strong>.
      </p>
      <ul>
        <li>Nom légal : Christelle Faggi</li>
        <li>Nom commercial : Narrea Studio</li>
        <li>Courriel : contact@narrea.studio</li>
        <li>Responsable de la publication : Christelle Faggi</li>
      </ul>

      <h2>Hébergement et prestataires techniques</h2>
      <ul>
        <li>
          Hébergement du site : Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
          91789, États-Unis — vercel.com
        </li>
        <li>
          Base de données, authentification et stockage : Supabase (serveurs
          situés en Union européenne — Irlande) — supabase.com
        </li>
        <li>
          Envoi des courriels (contact, notifications) : Resend — resend.com
        </li>
        <li>
          Vente et livraison des produits numériques : Payhip — payhip.com
        </li>
      </ul>
      <p>
        Certains de ces prestataires hébergent des données <strong>hors du
        Québec</strong> ; voir la{" "}
        <a href="/confidentialite">Politique de confidentialité</a> pour les
        modalités.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus du site (textes, visuels, mise en page, nom
        et logo « Narrea Studio ») est protégé par le droit d&apos;auteur. Toute
        reproduction ou réutilisation, totale ou partielle, sans autorisation
        écrite préalable, est interdite.
      </p>
    </LegalLayout>
  );
}
