"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateProjectStatut } from "@/app/admin/projets/actions";
import { STATUT_ORDER, STATUT_LABELS, type ProjectStatut } from "@/lib/client-space";

export function StatutSelect({
  projectId,
  current,
}: {
  projectId: string;
  current: ProjectStatut;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<ProjectStatut>(current);

  function onChange(next: ProjectStatut) {
    setValue(next);
    startTransition(async () => {
      const res = await updateProjectStatut(projectId, next);
      if ("error" in res) {
        alert(res.error);
        setValue(current);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <select
      value={value}
      disabled={isPending}
      onChange={(e) => onChange(e.target.value as ProjectStatut)}
      className="rounded-full border border-prune/20 bg-white px-4 py-1.5 text-sm font-medium text-prune focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-60"
    >
      {STATUT_ORDER.map((s) => (
        <option key={s} value={s}>
          {STATUT_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
