import { createServerClient } from "@/lib/supabase/server";

export type Post = {
  id: string;
  slug: string;
  titre: string;
  extrait: string | null;
  contenu: string | null;
  image: string | null;
  pilier: string | null;
  statut: "brouillon" | "publie";
  date_publication: string;
  created_at: string;
  updated_at: string;
};

// Liste des articles publiés, du plus récent au plus ancien.
export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("statut", "publie")
    .order("date_publication", { ascending: false });

  if (error) {
    console.error("Erreur de chargement des articles :", error.message);
    return [];
  }
  return data ?? [];
}

// Un article publié par son slug (null si introuvable / non publié).
export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("statut", "publie")
    .maybeSingle();

  if (error) {
    console.error("Erreur de chargement de l'article :", error.message);
    return null;
  }
  return data;
}

// Formatte une date ISO en français lisible (ex. « 12 juin 2026 »).
export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
