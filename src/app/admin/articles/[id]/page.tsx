import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { getPostByIdAdmin } from "@/lib/posts-admin";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostByIdAdmin(id);

  if (!post) {
    notFound();
  }

  return (
    <Container className="py-12">
      <Link
        href="/admin/articles"
        className="text-sm text-greige underline transition-colors hover:text-prune"
      >
        ← Retour aux articles
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-prune">
        Éditer l&apos;article
      </h1>
      <div className="mt-8">
        <ArticleForm post={post} />
      </div>
    </Container>
  );
}
