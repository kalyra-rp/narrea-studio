import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de Narrea Studio.",
};

export default function CgvPage() {
  return (
    <LegalLayout title="Conditions générales de vente" updated="16/06/2026">
      <h2>1. Objet et identité</h2>
      <p>
        Les présentes conditions encadrent la vente de prestations de services et
        de produits numériques proposés par <strong>Christelle Faggi</strong>,
        exerçant sous le nom <strong>Narrea Studio</strong>, travailleur autonome,
        joignable à contact@narrea.studio.
      </p>

      <h2>2. Services</h2>
      <p>
        Les prestations (audit, accompagnement, création de supports, etc.) font
        l&apos;objet d&apos;un accord préalable précisant le contenu, le prix, les
        délais et le nombre d&apos;allers-retours inclus. Le contenu exact de
        chaque prestation est celui décrit sur la page de l&apos;offre concernée
        et confirmé lors de la commande.
      </p>

      <h2>3. Produits numériques</h2>
      <p>
        Les produits numériques sont vendus et livrés via la plateforme{" "}
        <strong>Payhip</strong>. La livraison s&apos;effectue par mise à
        disposition d&apos;un lien de téléchargement après le paiement.
      </p>

      <h2>4. Prix et taxes</h2>
      <p>
        Les prix sont indiqués en euros. <strong>En tant que petit fournisseur au
        sens des règles fiscales du Québec, Narrea Studio ne perçoit pas la TPS ni
        la TVQ</strong> sur ses ventes.
      </p>

      <h2>5. Paiement</h2>
      <p>
        Le paiement des produits numériques s&apos;effectue via Payhip (et ses
        prestataires de paiement). Les prestations de services sont réglées selon
        les modalités convenues lors de la commande.
      </p>

      <h2>6. Politique de remboursement</h2>
      <p>
        En raison de leur nature, <strong>les produits numériques téléchargeables
        ne sont ni repris ni remboursés une fois le téléchargement effectué</strong>,
        sauf problème technique avéré (fichier inaccessible ou corrompu), auquel
        cas une nouvelle livraison ou un remboursement sera proposé. Pour les
        prestations de services, les modalités d&apos;annulation et de
        remboursement sont précisées lors de la commande. Cette politique
        s&apos;applique sous réserve des droits prévus par la <strong>Loi sur la
        protection du consommateur</strong> du Québec.
      </p>

      <h2>7. Propriété intellectuelle et licence d&apos;utilisation</h2>
      <p>
        Les produits et livrables sont destinés à un usage personnel de
        l&apos;acheteur. Toute revente, redistribution ou partage des fichiers est
        interdit, sauf autorisation écrite.
      </p>

      <h2>8. Responsabilité</h2>
      <p>
        Narrea Studio met tout en œuvre pour fournir des prestations et produits
        de qualité, mais ne garantit pas de résultats commerciaux spécifiques,
        ceux-ci dépendant de facteurs propres à chaque activité.
      </p>

      <h2>9. Droit applicable</h2>
      <p>
        Les présentes conditions sont régies par les lois en vigueur au Québec.
        Tout litige sera porté devant les tribunaux compétents du district
        judiciaire de Montréal.
      </p>
    </LegalLayout>
  );
}
