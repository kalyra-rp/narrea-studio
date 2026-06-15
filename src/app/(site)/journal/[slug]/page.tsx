import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/ui/Container";
import { formatPostDate, getPublishedPostBySlug } from "@/lib/posts";

export const revalidate = 60;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return { title: "Article introuvable" };
  }

  const description = post.extrait ?? undefined;
  return {
    title: post.titre,
    description,
    openGraph: {
      type: "article",
      title: post.titre,
      description,
      publishedTime: post.date_publication,
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.titre,
      description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      {/* En-tête de l'article */}
      <header className="border-b rule-gold bg-champagne/30">
        <Container className="py-16 text-center sm:py-20">
          {post.pilier ? (
            <p className="font-script text-2xl text-gold-dark">{post.pilier}</p>
          ) : null}
          <h1 className="mx-auto mt-2 max-w-3xl font-serif text-4xl font-semibold leading-tight text-prune sm:text-5xl">
            {post.titre}
          </h1>
          <time
            dateTime={post.date_publication}
            className="mt-5 block text-sm text-greige"
          >
            {formatPostDate(post.date_publication)}
          </time>
        </Container>
      </header>

      {/* Image principale */}
      {post.image ? (
        <Container className="py-10 sm:py-12">
          <div className="relative mx-auto aspect-[16/9] max-w-3xl overflow-hidden rounded-3xl border rule-gold bg-champagne/40">
            <Image
              src={post.image}
              alt={post.titre}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
        </Container>
      ) : null}

      {/* Contenu */}
      <Container className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          {post.extrait ? (
            <p className="font-serif text-xl italic leading-relaxed text-prune/80">
              {post.extrait}
            </p>
          ) : null}
          <div className="article-prose mt-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.contenu ?? ""}
            </ReactMarkdown>
          </div>

          <div className="mt-14 border-t rule-gold pt-8 text-center">
            <Link
              href="/journal"
              className="text-sm font-medium text-prune underline transition-colors hover:text-prune-deep"
            >
              ← Retour au journal
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}
