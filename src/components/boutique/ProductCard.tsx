import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const available = Boolean(product.payhip_url);
  return (
    <Link
      href={`/boutique/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border rule-gold bg-ivory transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-champagne/50">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.nom}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="px-4 text-center font-script text-2xl text-gold-dark">
            {product.nom}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {product.categorie ? (
          <span className="text-xs font-medium uppercase tracking-wider text-gold-dark">
            {product.categorie}
          </span>
        ) : null}
        <h3 className="mt-2 font-serif text-xl font-semibold text-prune">
          {product.nom}
        </h3>
        {product.description ? (
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-greige">
            {product.description}
          </p>
        ) : (
          <span className="flex-1" />
        )}
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-serif text-lg font-semibold text-prune">
            {product.prix ?? ""}
          </span>
          <span
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              available
                ? "bg-prune text-ivory"
                : "bg-champagne text-greige"
            }`}
          >
            {available ? "Voir" : "Bientôt"}
          </span>
        </div>
      </div>
    </Link>
  );
}
