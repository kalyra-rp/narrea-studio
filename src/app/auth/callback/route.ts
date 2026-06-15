import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabase } from "@/lib/supabase/auth-server";

// Le lien magique renvoie ici : on échange le code contre une session (cookies),
// puis on redirige vers la destination demandée.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  if (code) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/connexion?erreur=lien-invalide`);
}
