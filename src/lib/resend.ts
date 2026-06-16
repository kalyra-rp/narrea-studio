import "server-only";
import { Resend } from "resend";

// Adresse de réception (boîte de Christelle) et expéditeur (domaine vérifié).
export const CONTACT_EMAIL = "contact@narrea.studio";
export const FROM_EMAIL = "Narrea Studio <contact@narrea.studio>";

// Client Resend — clé lue côté serveur uniquement.
export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY manquant dans .env.local");
  }
  return new Resend(key);
}
