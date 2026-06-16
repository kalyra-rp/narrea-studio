import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Narrea Studio : données collectées, usage et droits.",
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="16/06/2026">
      <p>
        Narrea Studio (Christelle Faggi) accorde une grande importance à la
        protection de vos renseignements personnels, conformément à la{" "}
        <strong>Loi 25</strong> (Loi modernisant des dispositions législatives en
        matière de protection des renseignements personnels) du Québec.
      </p>

      <h2>Responsable de la protection des renseignements personnels (RPRP)</h2>
      <p>
        La personne responsable est <strong>Christelle Faggi</strong>. Pour toute
        question ou demande : <strong>contact@narrea.studio</strong>.
      </p>

      <h2>Quels renseignements sont collectés, et pourquoi</h2>
      <ul>
        <li>
          <em>Formulaire de contact</em> : nom et courriel, ainsi que le contenu
          de votre message — pour répondre à votre demande.
        </li>
        <li>
          <em>Ressource gratuite / communications</em> : votre courriel — pour
          vous envoyer la ressource demandée et, avec votre consentement, des
          conseils et nouvelles de Narrea Studio.
        </li>
        <li>
          <em>Espace client</em> : nom, courriel, informations relatives à votre
          projet et fichiers livrables — pour assurer le suivi de la prestation.
        </li>
        <li>
          <em>Données techniques</em> : le site utilise uniquement des témoins
          (cookies) <strong>nécessaires à son fonctionnement</strong> (session,
          sécurité, connexion). Aucun témoin publicitaire ou de suivi n&apos;est
          utilisé. <em>(À mettre à jour si tu ajoutes un outil de statistiques.)</em>
        </li>
      </ul>

      <h2>Consentement</h2>
      <p>
        Vos renseignements ne sont collectés qu&apos;avec votre consentement,
        libre et éclairé, et uniquement aux fins indiquées ci-dessus. Vous pouvez
        retirer votre consentement à tout moment.
      </p>

      <h2>Communication à des tiers</h2>
      <p>
        Vos renseignements ne sont jamais vendus. Ils peuvent être traités par
        nos prestataires techniques agissant pour notre compte : Supabase (base de
        données, UE), Vercel (hébergement, États-Unis), Resend (courriels), Payhip
        (paiement des produits). Certains traitements impliquent un{" "}
        <strong>transfert hors du Québec</strong> ; nous nous assurons que ces
        prestataires offrent une protection adéquate.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Vos renseignements sont conservés le temps nécessaire aux finalités
        ci-dessus (par exemple : la durée de la relation client, puis la période
        exigée par la loi), puis détruits ou anonymisés.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez, à tout moment : accéder à vos renseignements, les faire
        rectifier, retirer votre consentement, demander leur suppression, ou
        demander la portabilité de vos données. Pour exercer un droit, écrivez à{" "}
        <strong>contact@narrea.studio</strong> ; une réponse vous sera fournie
        dans les délais prévus par la loi.
      </p>

      <h2>Incident de confidentialité</h2>
      <p>
        En cas d&apos;incident présentant un risque sérieux de préjudice, les
        personnes concernées et la{" "}
        <strong>Commission d&apos;accès à l&apos;information du Québec (CAI)</strong>{" "}
        seront avisées conformément à la loi.
      </p>

      <h2>Plainte</h2>
      <p>
        Vous pouvez adresser une plainte à la Commission d&apos;accès à
        l&apos;information du Québec (cai.gouv.qc.ca).
      </p>
    </LegalLayout>
  );
}
