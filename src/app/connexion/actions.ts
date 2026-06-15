"use server";

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/auth-server";

// Déconnexion : termine la session et renvoie vers la page de connexion.
export async function signOut() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/connexion");
}
