"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/posts";

export type ProductInput = {
  nom: string;
  slug: string;
  description: string;
  prix: string;
  image: string;
  categorie: string;
  tags: string; // saisis séparés par des virgules
  payhip_url: string;
  statut: "brouillon" | "publie";
};

type ActionResult = { ok: true } | { error: string };

const BUCKET = "blog-images"; // bucket public déjà en place (réutilisé)
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

function revalidateShop() {
  revalidatePath("/admin/produits");
  revalidatePath("/boutique");
}

function normalize(values: ProductInput) {
  const nom = values.nom.trim();
  const slug = (values.slug.trim() || slugify(nom)) as string;
  const tags = values.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return {
    nom,
    slug,
    description: values.description.trim() || null,
    prix: values.prix.trim() || null,
    image: values.image.trim() || null,
    categorie: values.categorie.trim() || null,
    tags,
    payhip_url: values.payhip_url.trim() || null,
    statut: values.statut,
  };
}

export async function saveProduct(
  values: ProductInput,
  id?: string,
): Promise<ActionResult> {
  if (!values.nom.trim()) return { error: "Le nom est obligatoire." };
  const supabase = createAdminClient();
  const row = normalize(values);
  if (!row.slug) return { error: "Le slug est obligatoire." };

  if (id) {
    const { error } = await supabase
      .from("products")
      .update({ ...row, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return { error: friendly(error.code, error.message) };
  } else {
    const { error } = await supabase.from("products").insert(row);
    if (error) return { error: friendly(error.code, error.message) };
  }
  revalidateShop();
  return { ok: true };
}

export async function toggleProductStatut(
  id: string,
  next: "brouillon" | "publie",
): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("products")
    .update({ statut: next, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidateShop();
  return { ok: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateShop();
  return { ok: true };
}

export async function uploadProductImage(
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
  const { error: bucketErr } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: MAX_IMAGE_BYTES,
  });
  if (bucketErr && !/exist/i.test(bucketErr.message)) {
    return { error: bucketErr.message };
  }

  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const path = `products/${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: file.type, upsert: false });
  if (upErr) return { error: upErr.message };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}

function friendly(code: string | undefined, message: string): string {
  if (code === "23505") {
    return "Ce slug est déjà utilisé par un autre produit.";
  }
  return message;
}
