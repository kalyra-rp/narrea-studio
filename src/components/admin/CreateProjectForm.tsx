"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/app/admin/projets/actions";

const field =
  "mt-1.5 w-full rounded-xl border border-prune/20 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-greige/60 focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40";
const label = "text-sm font-medium text-prune";

export function CreateProjectForm({
  clients,
}: {
  clients: { id: string; label: string }[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const values = {
      clientId: String(data.get("clientId") ?? ""),
      titre: String(data.get("titre") ?? ""),
      offre: String(data.get("offre") ?? ""),
      echeance: String(data.get("echeance") ?? ""),
      notes: String(data.get("notes") ?? ""),
    };
    startTransition(async () => {
      const res = await createProject(values);
      if ("error" in res) setError(res.error);
      else {
        setOpen(false);
        router.refresh();
      }
    });
  }

  if (clients.length === 0) {
    return (
      <p className="text-sm text-greige">
        Créez d&apos;abord un client pour pouvoir ajouter un projet.
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex rounded-full bg-prune px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
      >
        + Nouveau projet
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
          <label htmlFor="clientId" className={label}>
            Client
          </label>
          <select id="clientId" name="clientId" required className={field}>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="titre" className={label}>
            Titre du projet
          </label>
          <input id="titre" name="titre" type="text" required className={field} />
        </div>
        <div>
          <label htmlFor="offre" className={label}>
            Offre (optionnel)
          </label>
          <input id="offre" name="offre" type="text" className={field} />
        </div>
        <div>
          <label htmlFor="echeance" className={label}>
            Échéance (optionnel)
          </label>
          <input id="echeance" name="echeance" type="date" className={field} />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="notes" className={label}>
          Notes (optionnel)
        </label>
        <textarea id="notes" name="notes" rows={2} className={`${field} resize-y`} />
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex rounded-full bg-prune px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
        >
          {isPending ? "Création…" : "Créer le projet"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-greige underline transition-colors hover:text-prune"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
