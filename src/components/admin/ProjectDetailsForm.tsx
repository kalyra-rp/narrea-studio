"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateProjectDetails } from "@/app/admin/projets/actions";

const field =
  "mt-1.5 w-full rounded-xl border border-prune/20 bg-white px-4 py-2.5 text-sm text-ink focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40";
const label = "text-sm font-medium text-prune";

export function ProjectDetailsForm({
  projectId,
  offre,
  echeance,
  notes,
}: {
  projectId: string;
  offre: string;
  echeance: string;
  notes: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    const data = new FormData(e.currentTarget);
    const values = {
      offre: String(data.get("offre") ?? ""),
      echeance: String(data.get("echeance") ?? ""),
      notes: String(data.get("notes") ?? ""),
    };
    startTransition(async () => {
      const res = await updateProjectDetails(projectId, values);
      if ("error" in res) setError(res.error);
      else {
        setSaved(true);
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="offre" className={label}>
            Offre
          </label>
          <input id="offre" name="offre" defaultValue={offre} className={field} />
        </div>
        <div>
          <label htmlFor="echeance" className={label}>
            Échéance
          </label>
          <input
            id="echeance"
            name="echeance"
            type="date"
            defaultValue={echeance}
            className={field}
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="notes" className={label}>
          Notes internes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={notes}
          className={`${field} resize-y`}
        />
      </div>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex rounded-full bg-prune px-5 py-2 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
        >
          {isPending ? "Enregistrement…" : "Enregistrer"}
        </button>
        {saved ? <span className="text-sm text-green-700">Enregistré ✓</span> : null}
      </div>
    </form>
  );
}
