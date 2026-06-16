import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Product } from "@/lib/products";

export async function getAllProductsAdmin(): Promise<Product[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("date_publication", { ascending: false });
  if (error) {
    console.error("getAllProductsAdmin :", error.message);
    return [];
  }
  return (data as Product[]) ?? [];
}

export async function getProductByIdAdmin(id: string): Promise<Product | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("getProductByIdAdmin :", error.message);
    return null;
  }
  return data as Product | null;
}
