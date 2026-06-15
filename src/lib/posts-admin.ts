import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Post } from "@/lib/posts";

// ----------------------------------------------------------------------------
// Lectures ADMIN (tous statuts) — via la clé service_role, code serveur only.
// ----------------------------------------------------------------------------
export async function getAllPostsAdmin(): Promise<Post[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("date_publication", { ascending: false });

  if (error) {
    console.error("Erreur de chargement (admin) :", error.message);
    return [];
  }
  return data ?? [];
}

export async function getPostByIdAdmin(id: string): Promise<Post | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Erreur de chargement de l'article (admin) :", error.message);
    return null;
  }
  return data;
}
