import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatPostDate, getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Le journal de Narrea Studio : conseils et réflexions pour clarifier votre offre, structurer votre présence et vendre plus simplement.",
};

// Revalidation périodique : le journal reste frais sans rebuild manuel.
export const revalidate = 60;

export default async function JournalPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHeader
        eyebrow="Le journal"
        title="Clarté, présence et ventes"
        intro="Des idées concrètes pour présenter votre savoir-faire avec justesse et vendre plus simplement."
      />

      <section>
        <Container className="py-20 sm:py-24">
          {posts.length === 0 ? (
            <p className="text-center text-greige">
              Les premiers articles arrivent bientôt.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border rule-gold bg-ivory"
                >
                  <Link href={`/journal/${post.slug}`} className="flex flex-1 flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-champagne/50">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.titre}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {post.pilier ? (
                        <span className="text-xs font-medium uppercase tracking-wider text-gold-dark">
                          {post.pilier}
                        </span>
                      ) : null}
                      <h2 className="mt-2 font-serif text-xl font-semibold leading-snug text-prune transition-colors group-hover:text-prune-deep">
                        {post.titre}
                      </h2>
                      {post.extrait ? (
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-greige">
                          {post.extrait}
                        </p>
                      ) : null}
                      <time
                        dateTime={post.date_publication}
                        className="mt-5 text-xs text-greige/80"
                      >
                        {formatPostDate(post.date_publication)}
                      </time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
