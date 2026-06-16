"use client";

import type { Subscriber } from "@/lib/admin-data";

// Échappe une valeur pour le CSV (guillemets + séparateurs).
function csvCell(value: string): string {
  if (/[",\n;]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function ExportSubscribersButton({
  subscribers,
}: {
  subscribers: Subscriber[];
}) {
  function onExport() {
    const header = ["email", "date", "source"];
    const lines = subscribers.map((s) =>
      [
        csvCell(s.email),
        csvCell(new Date(s.created_at).toISOString()),
        csvCell(s.source ?? ""),
      ].join(","),
    );
    const csv = "﻿" + [header.join(","), ...lines].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "abonnes-narrea.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={onExport}
      disabled={subscribers.length === 0}
      className="inline-flex rounded-full bg-prune px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
    >
      Exporter en CSV
    </button>
  );
}
