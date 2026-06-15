import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// Protège l'admin (et prépare l'espace client — étape 5).
export const config = {
  matcher: ["/admin/:path*", "/espace/:path*"],
};
