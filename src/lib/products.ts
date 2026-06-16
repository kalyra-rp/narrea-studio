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
