import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getPublishedPosts } from "@/lib/posts";
import { getPublishedProducts } from "@/lib/products";
import { services } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages publiques statiques.
  const staticPaths = [
    "",
    "/services",
    "/boutique",
    "/portfolio",
    "/journal",
    "/a-propos",
    "/contact",
    "/ressources",
    "/mentions-legales",
    "/cgv",
    "/confidentialite",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${siteUrl}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));

  // Pages d'offres dédiées.
  const serviceEntries: MetadataRoute.Sitemap = services.map((o) => ({
    url: `${siteUrl}/services/${o.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Articles + produits publiés (depuis la base).
  const [posts, products] = await Promise.all([
    getPublishedPosts(),
    getPublishedProducts(),
  ]);

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/journal/${post.slug}`,
    lastModified: new Date(post.updated_at ?? post.date_publication),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/boutique/${p.slug}`,
    lastModified: new Date(p.updated_at ?? p.date_publication),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...postEntries,
    ...productEntries,
  ];
}
