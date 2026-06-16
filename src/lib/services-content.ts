import "server-only";
import { createServerClient } from "@/lib/supabase/server";
import { services, type Offer } from "@/lib/site";

type Override = {
  slug: string;
  titre: string | null;
  prix: string | null;
  promesse: string | null;
};

async function getOverrides(): Promise<Record<string, Override>> {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("service_overrides").select("*");
  if (error) {
    console.error("getOverrides :", error.message);
    return {};
  }
  const map: Record<string, Override> = {};
  for (const row of (data as Override[]) ?? []) map[row.slug] = row;
  return map;
}

function merge(offer: Offer, ov?: Override): Offer {
  if (!ov) return offer;
  return {
    ...offer,
    title: ov.titre?.trim() || offer.title,
    priceFrom: ov.prix?.trim() || offer.priceFrom,
    promise: ov.promesse?.trim() || offer.promise,
  };
}

// Les offres avec les champs principaux éventuellement surchargés (DB).
export async function getMergedServices(): Promise<Offer[]> {
  const overrides = await getOverrides();
  return services.map((o) => merge(o, overrides[o.slug]));
}

export async function getMergedOffer(slug: string): Promise<Offer | undefined> {
  const base = services.find((o) => o.slug === slug);
  if (!base) return undefined;
  const overrides = await getOverrides();
  return merge(base, overrides[slug]);
}

// Valeurs « principales » courantes (pour pré-remplir l'admin).
export async function getServiceMainFields(): Promise<
  { slug: string; titre: string; prix: string; promesse: string }[]
> {
  const merged = await getMergedServices();
  return merged.map((o) => ({
    slug: o.slug,
    titre: o.title,
    prix: o.priceFrom,
    promesse: o.promise,
  }));
}
