import { createClient } from "@supabase/supabase-js";

// Client Supabase côté serveur (lecture publique).
// Utilise la clé anon : la RLS garantit qu'on ne lit que les articles publiés.
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Variables Supabase manquantes : renseignez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans .env.local",
    );
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
