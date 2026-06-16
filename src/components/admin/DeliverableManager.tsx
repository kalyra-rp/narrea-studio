"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  addDeliverableLink,
  deleteDeliverable,
  uploadDeliverable,
} from "@/app/admin/projets/actions";

export type DeliverableItem = {
  id: string;
  nom: string;
  type: "fichier" | "lien";
  href: string | null; // URL signée (fichier) ou URL externe (lien)
};

const field =
  "w-full rounded-xl border border-prune/20 bg-white px-4 py-2.5 text-sm text-ink focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40";

export function DeliverableManager({
  projectId,
  items,
}: {
  projectId: string;
  items: DeliverableItem[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const fileNomRef = useRef<HTMLInputElement>(null);
  const linkNomRef = useRef<HTMLInputElement>(null);
  const linkUrlRef = useRef<HTMLInputElement>(null);

  function onUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Choisissez un fichier.");
      return;
    }
    const fd = new FormData();
    fd.append("projectId", projectId);
    fd.append("nom", fileNomRef.current?.value ?? "");
    fd.append("file", file);
    startTransition(async () => {
      const res = await uploadDeliverable(fd);
      if ("error" in res) setError(res.error);
      else {
        if (fileRef.current) fileRef.current.value = "";
        if (fileNomRef.current) fileNomRef.current.value = "";
        router.refresh();
      }
    });
  }

  function onAddLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const nom = linkNomRef.current?.value ?? "";
    const url = linkUrlRef.current?.value ?? "";
    startTransition(async () => {
      const res = await addDeliverableLink(projectId, nom, url);
      if ("error" in res) setError(res.error);
      else {
        if (linkNomRef.current) linkNomRef.current.value = "";
        if (linkUrlRef.current) linkUrlRef.current.value = "";
        router.refresh();
      }
    });
  }

  function onDelete(id: string) {
    if (!confirm("Supprimer ce livrable ?")) return;
    startTransition(async () => {
      const res = await deleteDeliverable(id, projectId);
      if ("error" in res) alert(res.error);
      else router.refresh();
    });
  }

  return (
    <div>
      {items.length === 0 ? (
        <p className="text-sm text-greige">Aucun livrable.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((d) => (
            <li
              key={d.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-prune/10 bg-white px-4 py-3 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="text-gold-dark" aria-hidden="true">
                  {d.type === "fichier" ? "↓" : "↗"}
                </span>
                {d.href ? (
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-prune underline transition-colors hover:text-prune-deep"
                  >
                    {d.nom}
                  </a>
                ) : (
                  <span className="text-ink">{d.nom}</span>
                )}
              </span>
              <button
                type="button"
                onClick={() => onDelete(d.id)}
                disabled={isPending}
                className="text-xs font-medium text-red-600 transition-colors hover:text-red-700 disabled:opacity-60"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {/* Upload fichier */}
        <form onSubmit={onUpload} className="rounded-xl border rule-gold bg-champagne/20 p-4">
          <p className="text-sm font-medium text-prune">Déposer un fichier</p>
          <input
            ref={fileNomRef}
            type="text"
            placeholder="Nom affiché (optionnel)"
            className={`mt-2 ${field}`}
          />
          <input ref={fileRef} type="file" className="mt-2 block w-full text-sm" />
          <button
            type="submit"
            disabled={isPending}
            className="mt-3 inline-flex rounded-full bg-prune px-4 py-2 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
          >
            {isPending ? "Envoi…" : "Déposer"}
          </button>
        </form>

        {/* Ajouter un lien */}
        <form onSubmit={onAddLink} className="rounded-xl border rule-gold bg-champagne/20 p-4">
          <p className="text-sm font-medium text-prune">Ajouter un lien</p>
          <input
            ref={linkNomRef}
            type="text"
            placeholder="Nom du livrable"
            className={`mt-2 ${field}`}
          />
          <input
            ref={linkUrlRef}
            type="url"
            placeholder="https://…"
            className={`mt-2 ${field}`}
          />
          <button
            type="submit"
            disabled={isPending}
            className="mt-3 inline-flex rounded-full bg-prune px-4 py-2 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
