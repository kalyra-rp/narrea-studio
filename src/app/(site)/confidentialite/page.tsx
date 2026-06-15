import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Narrea Studio : données collectées, usage et droits.",
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="à compléter">
      <p>
        <em>
          Modèle à compléter avec vos pratiques réelles (outils, durées de
          conservation) avant la mise en ligne.
        </em>
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        Narrea Studio — [raison sociale]. Pour toute question relative à vos
        données : contact@narrea.studio.
      </p>

      <h2>Données collectées</h2>
      <p>Selon vos interactions avec le site, nous pouvons collecter :</p>
      <ul>
        <li>les informations du formulaire de contact (nom, email, message) ;</li>
        <li>votre email lors de l&apos;inscription à la newsletter ;</li>
        <li>les données nécessaires au suivi de projet pour les clients.</li>
      </ul>

      <h2>Utilisation des données</h2>
      <p>
        Vos données servent à répondre à vos demandes, à vous envoyer la
        newsletter si vous y avez consenti, et à assurer le suivi des
        prestations. Elles ne sont jamais revendues.
      </p>

      <h2>Sous-traitants</h2>
      <p>
        Nous utilisons des prestataires pour le fonctionnement du site :
        Supabase (base de données et authentification), Resend (emails),
        MailerLite (newsletter), Payhip (paiements) et Vercel (hébergement).
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification et de
        suppression de vos données. Pour l&apos;exercer, écrivez à
        contact@narrea.studio.
      </p>

      <h2>Cookies</h2>
      <p>[Préciser l&apos;usage éventuel de cookies et de mesure d&apos;audience.]</p>
    </LegalLayout>
  );
}
