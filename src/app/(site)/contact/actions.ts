"use server";

import { CONTACT_EMAIL, FROM_EMAIL, getResend } from "@/lib/resend";
import { getOffer } from "@/lib/site";

export type ContactValues = {
  name: string;
  email: string;
  sujet: string;
  message: string;
};

export type ContactResult = { ok: true } | { error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  values: ContactValues,
): Promise<ContactResult> {
  const name = values.name?.trim();
  const email = values.email?.trim();
  const message = values.message?.trim();

  if (!name || !email || !message) {
    return { error: "Merci de remplir votre nom, votre email et votre message." };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: "Cette adresse email semble invalide." };
  }

  const offer = getOffer(values.sujet);
  const sujetLabel = offer ? offer.title : "Autre / question";

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Contact — ${sujetLabel} — ${name}`,
      text: [
        `Nom : ${name}`,
        `Email : ${email}`,
        `Sujet : ${sujetLabel}`,
        "",
        "Message :",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend (contact) :", error);
      return { error: "L'envoi a échoué. Réessayez ou écrivez-moi directement." };
    }
    return { ok: true };
  } catch (e) {
    console.error("Contact :", e);
    return { error: "L'envoi a échoué. Réessayez ou écrivez-moi directement." };
  }
}
