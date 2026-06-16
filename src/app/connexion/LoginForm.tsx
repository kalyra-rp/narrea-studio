"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/client";

export function LoginForm() {
  const searchParams = useSearchParams();
  const erreur = searchParams.get("erreur");
  const accesRefuse = erreur === "acces-refuse";
  const lienInvalide = erreur === "lien-invalide";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createBrowserSupabase();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !data.user) {
      setLoading(false);
      setError(
        signInError?.message === "Invalid login credentials"
          ? "Email ou mot de passe incorrect."
          : (signInError?.message ?? "Connexion impossible."),
      );
      return;
    }

    // Redirection selon le rôle (relu depuis la table profiles).
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError) {
      // Ne pas masquer un échec de lecture du rôle (ex. policy RLS cassée).
      setLoading(false);
      setError(
        `Connexion réussie mais impossible de lire votre rôle : ${profileError.message}`,
      );
      return;
    }

    const dest = profile?.role === "admin" ? "/admin" : "/espace";
    window.location.assign(dest);
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
      {accesRefuse ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Accès réservé. Connectez-vous avec un compte autorisé.
        </p>
      ) : null}
      {lienInvalide ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Le lien d&apos;invitation est invalide ou a expiré. Demandez un nouveau
          lien.
        </p>
      ) : null}

      <div>
        <label htmlFor="email" className="text-sm font-medium text-prune">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@exemple.com"
          className="mt-1.5 w-full rounded-xl border border-prune/20 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-greige/60 focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium text-prune">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-1.5 w-full rounded-xl border border-prune/20 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-greige/60 focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center rounded-full bg-prune px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
      >
        {loading ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
