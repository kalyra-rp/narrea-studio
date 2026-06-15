import "server-only";
import { createClient } from "@supabase/supabase-js";

// Client Supabase ADMIN — clé service_role, contourne la RLS.
// ⚠️ Ne JAMAIS importer côté client. Réservé aux Server Actions / code serveur.
// (La protection par auth/rôle admin sera ajoutée à l'étape 4.)
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Variables Supabase admin manquantes : NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis dans .env.local",
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
