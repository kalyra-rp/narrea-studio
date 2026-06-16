"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { CONTACT_EMAIL, FROM_EMAIL, getResend } from "@/lib/resend";

export type SubscribeResult = { ok: true } | { error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      subject: "Votre ressource Narrea Studio",
      text: [
        "Bonjour,",
        "",
        "Merci pour votre inscription ! Votre ressource arrive très bientôt :",
        "le guide est en cours de finalisation et vous le recevrez dès qu'il sera prêt.",
        "",
        "En attendant, vous recevrez de temps en temps quelques conseils utiles",
        "pour clarifier votre offre et structurer votre présence.",
        "",
        "À très vite,",
        "Christelle — Narrea Studio",
      ].join("\n"),
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
