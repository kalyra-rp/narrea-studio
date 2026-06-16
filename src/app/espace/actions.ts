"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/auth-server";

export type ActionResult = { ok: true } | { error: string };

// Message client → inséré via la session : la RLS vérifie qu'il s'agit bien
// de son projet et que author_id = lui-même.
export async function postClientMessage(
  projectId: string,
  contenu: string,
): Promise<ActionResult> {
  const text = contenu.trim();
  if (!text) return { error: "Message vide." };

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non connecté." };

  const { error } = await supabase.from("project_messages").insert({
    project_id: projectId,
    author_id: user.id,
    contenu: text,
  });
  if (error) return { error: error.message };

  revalidatePath(`/espace/projets/${projectId}`);
  revalidatePath(`/admin/projets/${projectId}`);
  return { ok: true };
}

// Changement de mot de passe depuis l'espace.
export async function changePassword(
  password: string,
): Promise<ActionResult> {
  if (password.length < 8) {
    return { error: "Le mot de passe doit faire au moins 8 caractères." };
  }
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };
  return { ok: true };
}
