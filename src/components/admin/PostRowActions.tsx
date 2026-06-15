"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deletePost, togglePublish } from "@/app/admin/articles/actions";
import type { Post } from "@/lib/posts";

export function PostRowActions({ post }: { post: Post }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isPublished = post.statut === "publie";

  function onToggle() {
    startTransition(async () => {
      const res = await togglePublish(post.id, isPublished ? "brouillon" : "publie");
      if ("error" in res) alert(res.error);
      else router.refresh();
    });
  }

  function onDelete() {
    if (
      !confirm(
        `Supprimer définitivement l'article « ${post.titre} » ? Cette action est irréversible.`,
      )
    ) {
      return;
    }
    startTransition(async () => {
      const res = await deletePost(post.id);
      if ("error" in res) alert(res.error);
      else router.refresh();
    });
  }

  return (
    <div className="flex items-center justify-end gap-2 text-sm">
      <Link
        href={`/admin/articles/${post.id}`}
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
