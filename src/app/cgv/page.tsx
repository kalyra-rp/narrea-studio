import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de Narrea Studio.",
};

export default function CgvPage() {
  return (
    <LegalLayout title="Conditions générales de vente" updated="à compléter">
      <p>
        <em>
          Modèle à compléter et à faire valider avant la mise en ligne. Les
          paiements des produits numériques sont opérés via Payhip.
        </em>
      </p>

      <h2>Objet</h2>
      <p>
        Les présentes conditions régissent les ventes de prestations et de
        produits numériques proposés par Narrea Studio.
      </p>

      <h2>Prestations et produits</h2>
      <p>
        Les services (Audit Clarté, Kit Présence Pro, Lancement Signature,
        Studio Mensuel) et les produits numériques sont décrits sur le site. Les
        prix sont indiqués en euros, [TTC / HT selon le statut].
      </p>

      <h2>Commande et paiement</h2>
      <p>
        Les produits numériques sont vendus via la plateforme Payhip, qui gère
        le paiement, la TVA et la livraison des fichiers. Les prestations font
        l&apos;objet d&apos;un devis ou d&apos;une commande dédiée.
      </p>

      <h2>Livraison</h2>
      <p>
        Les produits numériques sont accessibles après paiement. Les délais des
        prestations sont précisés lors de la commande.
      </p>

      <h2>Droit de rétractation</h2>
      <p>
        Conformément à la réglementation applicable aux contenus numériques et
        aux prestations sur mesure, [préciser les conditions de rétractation].
      </p>

      <h2>Réclamations</h2>
      <p>Pour toute question : contact@narrea.studio.</p>
    </LegalLayout>
  );
}
