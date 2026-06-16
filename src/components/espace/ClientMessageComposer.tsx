"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { postClientMessage } from "@/app/espace/actions";

export function ClientMessageComposer({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLTextAreaElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const contenu = ref.current?.value ?? "";
    startTransition(async () => {
      const res = await postClientMessage(projectId, contenu);
      if ("error" in res) setError(res.error);
      else {
        if (ref.current) ref.current.value = "";
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-4">
      <textarea
        ref={ref}
        rows={3}
        required
        placeholder="Écrire un message…"
        className="w-full rounded-xl border border-prune/20 bg-white px-4 py-2.5 text-sm text-ink focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40"
      />
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-3 inline-flex rounded-full bg-prune px-5 py-2 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
      >
        {isPending ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
