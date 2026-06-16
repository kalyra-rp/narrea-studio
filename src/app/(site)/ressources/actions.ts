"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { CONTACT_EMAIL, FROM_EMAIL, getResend } from "@/lib/resend";
import { siteUrl } from "@/lib/site";

export type SubscribeResult = { ok: true } | { error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Lien direct vers le PDF (Supabase Storage, bucket public « ressources »).
const GUIDE_URL =
  "https://hltvaqwcrbemxfvtamwb.supabase.co/storage/v1/object/public/ressources/Le-test-des-10-secondes-Narrea-Studio.pdf";
const GUIDE_TITLE = "Le test des 10 secondes — Rendez votre offre limpide";
const AUDIT_URL = `${siteUrl}/services/audit-clarte`;

export async function subscribeToResource(
  emailRaw: string,
): Promise<SubscribeResult> {
  const email = emailRaw?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return { error: "Cette adresse email semble invalide." };
  }

  // 1) Enregistrement dans Supabase (service_role, contourne la RLS).
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("subscribers")
      .upsert(
        { email, source: "ressource-gratuite" },
        { onConflict: "email", ignoreDuplicates: true },
      );
    if (error) {
      console.error("Subscribers (insert) :", error);
      return { error: "Inscription impossible pour le moment. Réessayez." };
    }
  } catch (e) {
    console.error("Subscribers :", e);
    return { error: "Inscription impossible pour le moment. Réessayez." };
  }

  // 2) Emails (confirmation à la personne + notification à Christelle).
  try {
    const resend = getResend();

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Votre guide : ${GUIDE_TITLE}`,
      text: [
        "Bonjour,",
        "",
        `Voici votre guide « ${GUIDE_TITLE} ». Bonne lecture !`,
        "",
        "Téléchargez-le ici :",
        GUIDE_URL,
        "",
        "Une fois le test fait, si vous voulez aller plus loin et rendre",
        "votre offre vraiment limpide, jetez un œil à l'Audit Clarté :",
        AUDIT_URL,
        "",
        "À très vite,",
        "Christelle — Narrea Studio",
      ].join("\n"),
      html: guideEmailHtml(),
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: "Nouvelle inscription — ressource gratuite",
      text: `Nouvelle inscription : ${email}\nSource : ressource-gratuite`,
    });
  } catch (e) {
    // L'inscription est enregistrée : on n'échoue pas si l'email rencontre un souci.
    console.error("Resend (ressource) :", e);
  }

  return { ok: true };
}

// Email HTML de remise du guide — palette Narrea (prune / doré / ivoire).
function guideEmailHtml(): string {
  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:0;background-color:#FAF4E8;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF4E8;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:36px 36px 8px;font-family:Georgia,'Times New Roman',serif;color:#5B2E4E;font-size:24px;line-height:1.3;">
                Voici votre guide, bonne lecture&nbsp;!
              </td>
            </tr>
            <tr>
              <td style="padding:8px 36px 0;font-family:Helvetica,Arial,sans-serif;color:#2E1826;font-size:16px;line-height:1.6;">
                <p style="margin:0 0 16px;">Bonjour,</p>
                <p style="margin:0 0 16px;">
                  Merci pour votre confiance&nbsp;! Comme promis, voici votre exemplaire de
                  <strong>«&nbsp;${GUIDE_TITLE}&nbsp;»</strong>. Prenez un moment au calme pour le parcourir&nbsp;: il se lit en quelques minutes.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:12px 36px 24px;">
                <a href="${GUIDE_URL}"
                   style="display:inline-block;background-color:#E3AC3A;color:#5B2E4E;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;text-decoration:none;padding:14px 28px;border-radius:9999px;">
                  Télécharger votre guide
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 28px;font-family:Helvetica,Arial,sans-serif;color:#2E1826;font-size:16px;line-height:1.6;">
                <p style="margin:0 0 16px;">
                  Une fois le test des 10 secondes passé, si vous voulez aller plus loin et rendre votre offre vraiment limpide, découvrez
                  l'<a href="${AUDIT_URL}" style="color:#5B2E4E;font-weight:bold;">Audit Clarté</a>&nbsp;: un regard extérieur complet sur votre message et votre présence en ligne.
                </p>
                <p style="margin:24px 0 0;font-family:Georgia,'Times New Roman',serif;color:#7C6B74;font-size:16px;">
                  À très vite,<br />Christelle — Narrea Studio
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
