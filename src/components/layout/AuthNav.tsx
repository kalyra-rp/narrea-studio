"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserSupabase } from "@/lib/supabase/client";

type State =
  | { status: "loading" }
  | { status: "out" }
  | { status: "in"; role: "admin" | "client" };

// Îlot client discret dans le header : « Connexion » si déconnecté,
// « Mon espace » + « Déconnexion » si connecté. Garde les pages publiques statiques.
export function AuthNav() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const supabase = createBrowserSupabase();
    let active = true;

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) {
        setState({ status: "out" });
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      if (!active) return;
      setState({
        status: "in",
        role: (profile?.role as "admin" | "client") ?? "client",
      });
    }

    load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function onSignOut() {
    const supabase = createBrowserSupabase();
    await supabase.auth.signOut();
    window.location.assign("/");
  }

  if (state.status === "loading") {
    return <span className="w-16" aria-hidden="true" />;
  }

  if (state.status === "out") {
    return (
      <Link
        href="/connexion"
        className="text-sm font-medium text-greige transition-colors hover:text-prune"
      >
        Connexion
      </Link>
    );
  }

  const dest = state.role === "admin" ? "/admin" : "/espace";
  return (
    <div className="flex items-center gap-4 text-sm">
      <Link
        href={dest}
        className="font-medium text-prune transition-colors hover:text-prune-deep"
      >
        Mon espace
      </Link>
      <button
        type="button"
        onClick={onSignOut}
        className="font-medium text-greige transition-colors hover:text-prune"
      >
        Déconnexion
      </button>
    </div>
  );
}
