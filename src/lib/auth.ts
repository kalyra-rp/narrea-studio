import { createServerSupabase } from "@/lib/supabase/auth-server";

export type SessionUser = {
  id: string;
  email: string | null;
  role: "admin" | "client";
  nom: string | null;
};

// Récupère l'utilisateur connecté et son rôle (null si non connecté).
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, nom")
    .eq("id", user.id)
    .maybeSingle();

  return {
    id: user.id,
    email: user.email ?? null,
    role: (profile?.role as "admin" | "client") ?? "client",
    nom: profile?.nom ?? null,
  };
}
