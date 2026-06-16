"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase/client";

export function WelcomeForm() {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabase();
    supabase.auth.getUser().then(({ data }) => {
      setAllowed(Boolean(data.user));
      setChecking(false);
    });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setSaving(true);
    const supabase = createBrowserSupabase();
    const { error: updErr } = await supabase.auth.updateUser({ password });
    if (updErr) {
      setSaving(false);
      setError(updErr.message);
      return;
    }
    // Mot de passe défini : direction l'espace client.
    window.location.assign("/espace");
  }

  if (checking) {
    return <p className="mt-6 text-sm text-greige">Vérification du lien…</p>;
  }

  if (!allowed) {
    return (
      <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Ce lien d&apos;invitation est invalide ou a expiré. Demandez un nouveau
        lien à Narrea Studio.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
      <div>
        <label htmlFor="password" className="text-sm font-medium text-prune">
          Choisissez un mot de passe
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="8 caractères minimum"
          className="mt-1.5 w-full rounded-xl border border-prune/20 bg-white px-4 py-2.5 text-sm text-ink focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
      </div>
      <div>
        <label htmlFor="confirm" className="text-sm font-medium text-prune">
          Confirmez le mot de passe
        </label>
        <input
          id="confirm"
          type="password"
          required
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-prune/20 bg-white px-4 py-2.5 text-sm text-ink focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={saving}
        className="inline-flex justify-center rounded-full bg-prune px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
      >
        {saving ? "Activation…" : "Activer mon espace"}
      </button>
    </form>
  );
}
