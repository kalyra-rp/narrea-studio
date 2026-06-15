"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/posts";

export type PostInput = {
  titre: string;
  slug: string;
  extrait: string;
  contenu: string;
  image: string;
  pilier: string;
  statut: "brouillon" | "publie";
};

type ActionResult = { ok: true } | { error: string };

// Revalide les pages impactées (admin + blog public).
function revalidateBlog() {
  revalidatePath("/admin/articles");
  revalidatePath("/journal");
  revalidatePath("/journal/[slug]", "page");
}

function normalize(values: PostInput) {
  const titre = values.titre.trim();
  const slug = (values.slug.trim() || slugify(titre)) as string;
  return {
    titre,
    slug,
    extrait: values.extrait.trim() || null,
    contenu: values.contenu.trim() || null,
    image: values.image.trim() || null,
    pilier: values.pilier.trim() || null,
    statut: values.statut,
  };
}

// Crée ou met à jour un article. id fourni => mise à jour.
export async function savePost(
  values: PostInput,
  id?: string,
): Promise<ActionResult> {
  if (!values.titre.trim()) {
    return { error: "Le titre est obligatoire." };
  }

  const supabase = createAdminClient();
  const row = normalize(values);

  if (!row.slug) {
    return { error: "Le slug est obligatoire." };
  }

  if (id) {
    const { error } = await supabase
      .from("posts")
      .update({ ...row, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return { error: friendly(error.code, error.message) };
  } else {
    const { error } = await supabase.from("posts").insert(row);
    if (error) return { error: friendly(error.code, error.message) };
  }

  revalidateBlog();
  return { ok: true };
}

// Bascule brouillon <-> publié.
export async function togglePublish(
  id: string,
  next: "brouillon" | "publie",
): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("posts")
    .update({ statut: next, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidateBlog();
  return { ok: true };
}

// Supprime un article.
export async function deletePost(id: string): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidateBlog();
  return { ok: true };
}

function friendly(code: string | undefined, message: string): string {
  if (code === "23505") {
    return "Ce slug est déjà utilisé par un autre article. Choisissez-en un autre.";
  }
  return message;
}
