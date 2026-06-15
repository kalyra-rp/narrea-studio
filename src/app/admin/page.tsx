import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getAllPostsAdmin } from "@/lib/posts-admin";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const posts = await getAllPostsAdmin();
  const published = posts.filter((p) => p.statut === "publie").length;
  const drafts = posts.length - published;

  return (
    <Container className="py-12">
      <h1 className="font-serif text-3xl font-semibold text-prune">
        Vue d&apos;ensemble
      </h1>
      <p className="mt-2 text-sm text-greige">
        Gérez le contenu de Narrea Studio.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Articles" value={posts.length} />
        <Stat label="Publiés" value={published} />
        <Stat label="Brouillons" value={drafts} />
      </div>

      <div className="mt-8">
        <Link
          href="/admin/articles"
          className="inline-flex rounded-full bg-prune px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
        >
          Gérer les articles
        </Link>
      </div>
    </Container>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border rule-gold bg-champagne/30 p-6">
      <p className="font-serif text-3xl font-semibold text-prune">{value}</p>
      <p className="mt-1 text-sm text-greige">{label}</p>
    </div>
  );
}
