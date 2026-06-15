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

const BUCKET = "blog-images";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 Mo
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

// S'assure que le bucket public existe (idempotent).
async function ensureBucket(
  supabase: ReturnType<typeof createAdminClient>,
): Promise<void> {
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: MAX_IMAGE_BYTES,
  });
  // « already exists » est attendu après la première création : on l'ignore.
  if (error && !/exist/i.test(error.message)) {
    throw new Error(error.message);
  }
}

// Téléverse une image vers Supabase Storage et renvoie son URL publique.
// Passe par la clé service_role (côté serveur) — jamais exposée au client.
export async function uploadArticleImage(
  formData: FormData,
): Promise<{ url: string } | { error: string }> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Aucun fichier reçu." };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Format non supporté (JPEG, PNG, WebP, GIF ou AVIF)." };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { error: "Image trop lourde (5 Mo maximum)." };
  }

  const supabase = createAdminClient();
  try {
    await ensureBucket(supabase);
  } catch (e) {
    return { error: `Impossible de préparer le stockage : ${(e as Error).message}` };
  }

  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const path = `articles/${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: file.type, upsert: false });
  if (uploadError) {
    return { error: uploadError.message };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}

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
