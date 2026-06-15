import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Rafraîchit la session et protège /admin (connecté + rôle admin).
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT : ne pas exécuter de code entre createServerClient et getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isEspaceRoute = pathname.startsWith("/espace");

  // Espace client (étape 5) : connexion requise, tout rôle.
  if (isEspaceRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/connexion";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAdminRoute) {
    // Non connecté → page de connexion (avec retour vers la page demandée).
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/connexion";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    // Connecté mais pas admin → refusé.
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/connexion";
      url.searchParams.set("erreur", "acces-refuse");
      return NextResponse.redirect(url);
    }
  }

  return response;
}
