import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PostRowActions } from "@/components/admin/PostRowActions";
import { formatPostDate } from "@/lib/posts";
import { getAllPostsAdmin } from "@/lib/posts-admin";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const posts = await getAllPostsAdmin();

  return (
    <Container className="py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-prune">Articles</h1>
          <p className="mt-2 text-sm text-greige">
            {posts.length} article{posts.length > 1 ? "s" : ""} au total.
          </p>
        </div>
        <Link
          href="/admin/articles/nouveau"
          className="inline-flex shrink-0 rounded-full bg-prune px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
        >
          + Nouvel article
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 rounded-2xl border rule-gold bg-champagne/30 p-8 text-center text-greige">
          Aucun article pour l&apos;instant. Créez le premier.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-prune/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-champagne/40 text-prune">
              <tr>
                <th className="px-5 py-3 font-medium">Titre</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-prune/10">
              {posts.map((post) => (
                <tr key={post.id} className="align-middle">
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink">{post.titre}</p>
                    <p className="mt-0.5 font-mono text-xs text-greige">
                      /{post.slug}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    {post.statut === "publie" ? (
                      <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        Publié
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                        Brouillon
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-greige">
                    {formatPostDate(post.date_publication)}
                  </td>
                  <td className="px-5 py-4">
                    <PostRowActions post={post} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}
