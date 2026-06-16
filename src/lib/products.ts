import { createServerClient } from "@/lib/supabase/server";

export type Product = {
  id: string;
  nom: string;
  slug: string;
  description: string | null;
  prix: string | null;
  image: string | null;
  categorie: string | null;
  tags: string[];
  inclus: string[];
  payhip_url: string | null;
  statut: "brouillon" | "publie";
  date_publication: string;
  created_at: string;
  updated_at: string;
};

// Produits publiés — lecture publique (clé anon + RLS).
export async function getPublishedProducts(): Promise<Product[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("statut", "publie")
    .order("date_publication", { ascending: false });
  if (error) {
    console.error("getPublishedProducts :", error.message);
    return [];
  }
  return (data as Product[]) ?? [];
}

export async function getPublishedProductBySlug(
  slug: string,
): Promise<Product | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("statut", "publie")
    .maybeSingle();
  if (error) {
    console.error("getPublishedProductBySlug :", error.message);
    return null;
  }
  return data as Product | null;
}

// Produits similaires (même catégorie), hors produit courant.
export async function getRelatedProducts(
  categorie: string | null,
  excludeId: string,
  limit = 3,
): Promise<Product[]> {
  if (!categorie) return [];
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("statut", "publie")
    .eq("categorie", categorie)
    .neq("id", excludeId)
    .order("date_publication", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("getRelatedProducts :", error.message);
    return [];
  }
  return (data as Product[]) ?? [];
}
