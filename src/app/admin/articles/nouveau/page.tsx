import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default function NouvelArticlePage() {
  return (
    <Container className="py-12">
      <Link
        href="/admin/articles"
        className="text-sm text-greige underline transition-colors hover:text-prune"
      >
        ← Retour aux articles
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-prune">
        Nouvel article
      </h1>
      <div className="mt-8">
        <ArticleForm />
      </div>
    </Container>
  );
}
