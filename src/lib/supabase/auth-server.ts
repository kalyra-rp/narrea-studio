import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Client Supabase serveur lié aux cookies de session (App Router).
// À utiliser dans les Server Components, layouts et route handlers.
export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Appelé depuis un Server Component : ignorable, le middleware
            // rafraîchit déjà la session.
          }
        },
      },
    },
  );
}
