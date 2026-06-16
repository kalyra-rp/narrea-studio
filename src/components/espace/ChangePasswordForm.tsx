"use client";

import { useState, useTransition } from "react";
import { changePassword } from "@/app/espace/actions";

const field =
  "mt-1.5 w-full rounded-xl border border-prune/20 bg-white px-4 py-2.5 text-sm text-ink focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40";

export function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setDone(false);
    const form = e.currentTarget;
    const data = new FormData(form);
    const password = String(data.get("password") ?? "");
    const confirm = String(data.get("confirm") ?? "");
    if (password.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    startTransition(async () => {
      const res = await changePassword(password);
      if ("error" in res) setError(res.error);
      else {
        setDone(true);
        form.reset();
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md">
      <div>
        <label htmlFor="password" className="text-sm font-medium text-prune">
          Nouveau mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          placeholder="8 caractères minimum"
          className={field}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="confirm" className="text-sm font-medium text-prune">
          Confirmer
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          autoComplete="new-password"
          className={field}
        />
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {done ? (
        <p className="mt-3 text-sm text-green-700">
          Mot de passe mis à jour ✓
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-5 inline-flex rounded-full bg-prune px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
      >
        {isPending ? "Mise à jour…" : "Changer mon mot de passe"}
      </button>
    </form>
  );
}
