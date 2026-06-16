"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClientAccount } from "@/app/admin/clients/actions";

const field =
  "mt-1.5 w-full rounded-xl border border-prune/20 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-greige/60 focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40";
const label = "text-sm font-medium text-prune";

export function CreateClientForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const values = {
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
      entreprise: String(data.get("entreprise") ?? ""),
      contactNom: String(data.get("contactNom") ?? ""),
      infos: String(data.get("infos") ?? ""),
    };
    startTransition(async () => {
      const res = await createClientAccount(values);
      if ("error" in res) setError(res.error);
      else {
        setOpen(false);
        router.refresh();
      }
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex rounded-full bg-prune px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
      >
        + Nouveau client
      </button>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border rule-gold bg-champagne/30 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={label}>
            Email du client
          </label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
        <div>
          <label htmlFor="password" className={label}>
            Mot de passe temporaire
          </label>
          <input
            id="password"
            name="password"
            type="text"
            required
            minLength={8}
            placeholder="8 caractères minimum"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="contactNom" className={label}>
            Nom du contact
          </label>
          <input id="contactNom" name="contactNom" type="text" className={field} />
        </div>
        <div>
          <label htmlFor="entreprise" className={label}>
            Entreprise
          </label>
          <input id="entreprise" name="entreprise" type="text" className={field} />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="infos" className={label}>
          Infos (optionnel)
        </label>
        <textarea id="infos" name="infos" rows={2} className={`${field} resize-y`} />
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex rounded-full bg-prune px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
        >
          {isPending ? "Création…" : "Créer le compte"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-greige underline transition-colors hover:text-prune"
        >
          Annuler
        </button>
      </div>
      <p className="mt-3 text-xs text-greige">
        Le client reçoit un email avec le lien de connexion. Transmettez-lui le mot
        de passe temporaire par un autre canal.
      </p>
    </form>
  );
}
