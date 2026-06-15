"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/client";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";
  const accesRefuse = searchParams.get("erreur") === "acces-refuse";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage(null);

    const supabase = createBrowserSupabase();
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-800">
        Lien envoyé ! Ouvrez votre boîte mail (<strong>{email}</strong>) et
        cliquez sur le lien pour vous connecter. Pensez à vérifier les
        indésirables.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
      {accesRefuse ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Accès réservé. Connectez-vous avec un compte administrateur.
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

      {status === "error" && message ? (
        <p className="text-sm text-red-600">{message}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex justify-center rounded-full bg-prune px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
      >
        {status === "sending" ? "Envoi…" : "Recevoir le lien de connexion"}
      </button>
    </form>
  );
}
