"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSessionUser } from "@/lib/auth";
import type { ProjectStatut } from "@/lib/client-space";

export type ActionResult = { ok: true } | { error: string };

const MAX_BYTES = 25 * 1024 * 1024; // 25 Mo

function revalidate(projectId?: string) {
  revalidatePath("/admin/projets");
  revalidatePath("/espace");
  if (projectId) {
    revalidatePath(`/admin/projets/${projectId}`);
    revalidatePath(`/espace/projets/${projectId}`);
  }
}

export async function createProject(values: {
  clientId: string;
  titre: string;
  offre: string;
  echeance: string;
  notes: string;
}): Promise<ActionResult> {
  if (!values.clientId) return { error: "Sélectionnez un client." };
  if (!values.titre.trim()) return { error: "Le titre est obligatoire." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("projects").insert({
    client_id: values.clientId,
    titre: values.titre.trim(),
    offre: values.offre.trim() || null,
    echeance: values.echeance || null,
    notes: values.notes.trim() || null,
  });
  if (error) return { error: error.message };

  revalidate();
  return { ok: true };
}

export async function updateProjectStatut(
  id: string,
  statut: ProjectStatut,
): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("projects")
    .update({ statut, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidate(id);
  return { ok: true };
}

export async function updateProjectDetails(
  id: string,
  values: { offre: string; echeance: string; notes: string },
): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("projects")
    .update({
      offre: values.offre.trim() || null,
      echeance: values.echeance || null,
      notes: values.notes.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidate(id);
  return { ok: true };
}

export async function addDeliverableLink(
  projectId: string,
  nom: string,
  url: string,
): Promise<ActionResult> {
  if (!nom.trim() || !url.trim()) return { error: "Nom et URL requis." };
  const supabase = createAdminClient();
  const { error } = await supabase.from("deliverables").insert({
    project_id: projectId,
    nom: nom.trim(),
    type: "lien",
    url: url.trim(),
  });
  if (error) return { error: error.message };
  revalidate(projectId);
  return { ok: true };
}

export async function uploadDeliverable(
  formData: FormData,
): Promise<ActionResult> {
  const projectId = String(formData.get("projectId") ?? "");
  const nom = String(formData.get("nom") ?? "").trim();
  const file = formData.get("file");

  if (!projectId) return { error: "Projet manquant." };
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Aucun fichier reçu." };
  }
  if (file.size > MAX_BYTES) return { error: "Fichier trop lourd (25 Mo max)." };

  const supabase = createAdminClient();
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const path = `${projectId}/${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: upErr } = await supabase.storage
    .from("deliverables")
    .upload(path, buffer, { contentType: file.type || undefined, upsert: false });
  if (upErr) return { error: upErr.message };

  const { error } = await supabase.from("deliverables").insert({
    project_id: projectId,
    nom: nom || file.name,
    type: "fichier",
    url: path,
  });
  if (error) return { error: error.message };

  revalidate(projectId);
  return { ok: true };
}

export async function deleteDeliverable(
  id: string,
  projectId: string,
): Promise<ActionResult> {
  const supabase = createAdminClient();
  // Supprime le fichier du Storage si c'en est un.
  const { data: row } = await supabase
    .from("deliverables")
    .select("type, url")
    .eq("id", id)
    .maybeSingle();
  if (row?.type === "fichier" && row.url) {
    await supabase.storage.from("deliverables").remove([row.url]);
  }
  const { error } = await supabase.from("deliverables").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidate(projectId);
  return { ok: true };
}

export async function postAdminMessage(
  projectId: string,
  contenu: string,
): Promise<ActionResult> {
  const text = contenu.trim();
  if (!text) return { error: "Message vide." };

  const user = await getSessionUser();
  if (!user || user.role !== "admin") return { error: "Non autorisé." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("project_messages").insert({
    project_id: projectId,
    author_id: user.id,
    contenu: text,
  });
  if (error) return { error: error.message };
  revalidate(projectId);
  return { ok: true };
}
