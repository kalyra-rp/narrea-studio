"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { CONTACT_EMAIL, FROM_EMAIL, getResend } from "@/lib/resend";

export type CreateClientValues = {
  email: string;
  password: string;
  entreprise: string;
  contactNom: string;
  infos: string;
};

export type ActionResult = { ok: true } | { error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function siteOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function createClientAccount(
  values: CreateClientValues,
): Promise<ActionResult> {
  const email = values.email?.trim().toLowerCase();
  const password = values.password ?? "";
  const contactNom = values.contactNom?.trim() || null;
  const entreprise = values.entreprise?.trim() || null;
  const infos = values.infos?.trim() || null;

  if (!email || !EMAIL_RE.test(email)) {
    return { error: "Email invalide." };
  }
  if (password.length < 8) {
    return { error: "Le mot de passe temporaire doit faire au moins 8 caractères." };
  }

  const supabase = createAdminClient();

  // 1) Création du compte Auth (confirmé d'emblée → connexion immédiate).
  const { data: created, error: createErr } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createErr || !created.user) {
    const msg = /already|exist/i.test(createErr?.message ?? "")
      ? "Un compte existe déjà avec cet email."
      : (createErr?.message ?? "Création du compte impossible.");
    return { error: msg };
  }
  const userId = created.user.id;

  // 2) Profil : rôle client + doit changer son mot de passe.
  // Upsert (robuste si le trigger n'a pas encore inséré la ligne).
  const { error: profErr } = await supabase
    .from("profiles")
    .upsert(
      { id: userId, role: "client", must_change_password: true, nom: contactNom, email },
      { onConflict: "id" },
    );
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

  // 4) Email « votre accès est prêt » (sans le mot de passe en clair).
  try {
    const origin = await siteOrigin();
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Votre accès à l'espace client Narrea Studio",
      text: [
        `Bonjour${contactNom ? ` ${contactNom}` : ""},`,
        "",
        "Votre espace client Narrea Studio est prêt.",
        "",
        `Connectez-vous ici : ${origin}/connexion`,
        "",
        "Votre mot de passe temporaire vous est transmis séparément.",
        "À la première connexion, il vous sera demandé de le changer.",
        "",
        "À très vite,",
        "Christelle — Narrea Studio",
      ].join("\n"),
    });
    await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: "Compte client créé",
      text: `Nouveau client : ${email}${entreprise ? ` (${entreprise})` : ""}`,
    });
  } catch (e) {
    console.error("Resend (création client) :", e);
    // Le compte est créé : on ne bloque pas si l'email échoue.
  }

  revalidatePath("/admin/clients");
  return { ok: true };
}
