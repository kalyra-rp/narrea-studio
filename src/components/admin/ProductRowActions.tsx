"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteProduct, toggleProductStatut } from "@/app/admin/produits/actions";
import type { Product } from "@/lib/products";

export function ProductRowActions({ product }: { product: Product }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isPublished = product.statut === "publie";

  function onToggle() {
    startTransition(async () => {
      const res = await toggleProductStatut(
        product.id,
        isPublished ? "brouillon" : "publie",
      );
      if ("error" in res) alert(res.error);
      else router.refresh();
    });
  }

  function onDelete() {
    if (!confirm(`Supprimer le produit « ${product.nom} » ?`)) return;
    startTransition(async () => {
      const res = await deleteProduct(product.id);
      if ("error" in res) alert(res.error);
      else router.refresh();
    });
  }

  return (
    <div className="flex items-center justify-end gap-2 text-sm">
      <Link
        href={`/admin/produits/${product.id}`}
        className="rounded-full border border-prune/20 px-3 py-1.5 font-medium text-prune transition-colors hover:bg-prune/5"
      >
        Éditer
      </Link>
      <button
        type="button"
        onClick={onToggle}
        disabled={isPending}
        className="rounded-full border border-prune/20 px-3 py-1.5 font-medium text-prune transition-colors hover:bg-prune/5 disabled:opacity-60"
      >
        {isPublished ? "Dépublier" : "Publier"}
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={isPending}
        className="rounded-full border border-red-200 px-3 py-1.5 font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
      >
        Supprimer
      </button>
    </div>
  );
}
