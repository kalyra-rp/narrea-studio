"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { services } from "@/lib/site";

export type ActionResult = { ok: true } | { error: string };

export async function saveServiceOverride(
  slug: string,
  values: { titre: string; prix: string; promesse: string },
): Promise<ActionResult> {
  if (!services.some((o) => o.slug === slug)) {
    return { error: "Service inconnu." };
  }
  const supabase = createAdminClient();
  const { error } = await supabase.from("service_overrides").upsert(
    {
      slug,
      titre: values.titre.trim() || null,
      prix: values.prix.trim() || null,
      promesse: values.promesse.trim() || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" },
  );
  if (error) return { error: error.message };

  revalidatePath("/services");
  revalidatePath(`/services/${slug}`);
  revalidatePath("/admin/services");
  return { ok: true };
}
