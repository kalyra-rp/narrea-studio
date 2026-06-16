"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { CONTACT_EMAIL, FROM_EMAIL, getResend } from "@/lib/resend";

export type CreateClientValues = {
  email: string;
  entreprise: string;
  contactNom: string;
  infos: string;
};

export type ActionResult = { ok: true } | { error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function siteOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto =
    h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function createClientAccount(
  values: CreateClientValues,
): Promise<ActionResult> {
  const email = values.email?.trim().toLowerCase();
  const contactNom = values.contactNom?.trim() || null;
  const entreprise = values.entreprise?.trim() || null;
  const infos = values.infos?.trim() || null;

  if (!email || !EMAIL_RE.test(email)) {
    return { error: "Email invalide." };
  }

  const supabase = createAdminClient();

  // 1) Génère un lien d'invitation sécurisé (crée le compte, sans mot de passe).
  const { data: link, error: linkErr } = await supabase.auth.admin.generateLink({
    type: "invite",
    email,
  });
  if (linkErr || !link.user || !link.properties?.hashed_token) {
    const msg = /already|exist|registered/i.test(linkErr?.message ?? "")
      ? "Un compte existe déjà avec cet email."
      : (linkErr?.message ?? "Impossible de générer l'invitation.");
    return { error: msg };
  }
  const userId = link.user.id;

  // 2) Profil : rôle client.
  const { error: profErr } = await supabase
    .from("profiles")
    .upsert({ id: userId, role: "client", nom: contactNom, email }, { onConflict: "id" });
  if (profErr) {
    return { error: `Compte créé mais profil non mis à jour : ${profErr.message}` };
  }

  // 3) Fiche client.
  const { error: clientErr } = await supabase.from("clients").insert({
    profile_id: userId,
    entreprise,
    contact_nom: contactNom,
    contact_email: email,
    infos,
  });
  if (clientErr) {
    return { error: `Compte créé mais fiche client non créée : ${clientErr.message}` };
  }

  // 4) Email d'invitation (dans la DA) avec le lien d'activation sécurisé.
  // On reconstruit le lien vers notre route /auth/confirm (verifyOtp côté serveur).
  const origin = await siteOrigin();
  const activationUrl = `${origin}/auth/confirm?token_hash=${link.properties.hashed_token}&type=invite&next=/bienvenue`;

  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Votre espace Narrea Studio est prêt",
      text: [
        `Bonjour${contactNom ? ` ${contactNom}` : ""},`,
        "",
        "Votre espace client Narrea Studio est prêt !",
        "",
        "Cliquez sur le lien ci-dessous pour l'activer et choisir votre mot de passe :",
        activationUrl,
        "",
        "Ce lien est personnel et expire après quelques heures.",
        "S'il a expiré, demandez-moi simplement un nouveau lien.",
        "",
        "À très vite,",
        "Christelle — Narrea Studio",
      ].join("\n"),
    });
    await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: "Compte client créé",
      text: `Invitation envoyée à : ${email}${entreprise ? ` (${entreprise})` : ""}`,
    });
  } catch (e) {
    console.error("Resend (invitation client) :", e);
    return {
      error:
        "Compte créé mais l'email d'invitation n'a pas pu partir. Réessayez d'envoyer l'invitation.",
    };
  }

  revalidatePath("/admin/clients");
  return { ok: true };
}
