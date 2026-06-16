"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveServiceOverride } from "@/app/admin/services/actions";

const field =
  "mt-1.5 w-full rounded-xl border border-prune/20 bg-white px-4 py-2.5 text-sm text-ink focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40";
const label = "text-xs font-medium text-prune";

type Service = { slug: string; titre: string; prix: string; promesse: string };

export function ServiceEditor({ service }: { service: Service }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [titre, setTitre] = useState(service.titre);
  const [prix, setPrix] = useState(service.prix);
  const [promesse, setPromesse] = useState(service.promesse);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await saveServiceOverride(service.slug, { titre, prix, promesse });
      if ("error" in res) setError(res.error);
      else {
        setSaved(true);
        router.refresh();
      }
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border rule-gold bg-white p-6"
    >
      <p className="font-mono text-xs text-greige">/{service.slug}</p>

      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Titre</label>
          <input value={titre} onChange={(e) => setTitre(e.target.value)} className={field} />
        </div>
        <div>
          <label className={label}>Prix (« à partir de »)</label>
          <input value={prix} onChange={(e) => setPrix(e.target.value)} className={field} />
        </div>
      </div>
      <div className="mt-4">
        <label className={label}>Promesse</label>
        <textarea
          value={promesse}
          onChange={(e) => setPromesse(e.target.value)}
          rows={2}
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
