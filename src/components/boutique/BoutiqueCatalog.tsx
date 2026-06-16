"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/boutique/ProductCard";
import type { Product } from "@/lib/products";

type Sort = "recent" | "prix-asc" | "prix-desc" | "alpha";

const SORTS: { value: Sort; label: string }[] = [
  { value: "recent", label: "Plus récents" },
  { value: "prix-asc", label: "Prix croissant" },
  { value: "prix-desc", label: "Prix décroissant" },
  { value: "alpha", label: "A → Z" },
];

function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

// Extrait un nombre du libellé de prix (« 29 € » → 29) ; null si absent.
function priceValue(prix: string | null): number | null {
  if (!prix) return null;
  const m = prix.replace(",", ".").match(/\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
}

export function BoutiqueCatalog({ products }: { products: Product[] }) {
  const categories = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.categorie).filter(Boolean) as string[]),
      ).sort((a, b) => a.localeCompare(b, "fr")),
    [products],
  );
  const allTags = useMemo(
    () =>
      Array.from(new Set(products.flatMap((p) => p.tags))).sort((a, b) =>
        a.localeCompare(b, "fr"),
      ),
    [products],
  );

  const [category, setCategory] = useState<string | "all">("all");
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("recent");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    let list = products.filter((p) => {
      if (category !== "all" && p.categorie !== category) return false;
      if (tags.size > 0 && !p.tags.some((t) => tags.has(t))) return false;
      if (q) {
        const hay = normalize(`${p.nom} ${p.description ?? ""}`);
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "alpha":
          return a.nom.localeCompare(b.nom, "fr");
        case "prix-asc":
        case "prix-desc": {
          const pa = priceValue(a.prix);
          const pb = priceValue(b.prix);
          if (pa === null && pb === null) return 0;
          if (pa === null) return 1; // sans prix → à la fin
          if (pb === null) return -1;
          return sort === "prix-asc" ? pa - pb : pb - pa;
        }
        default:
          return (
            new Date(b.date_publication).getTime() -
            new Date(a.date_publication).getTime()
          );
      }
    });
    return list;
  }, [products, category, tags, query, sort]);

  function toggleTag(tag: string) {
    setTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  function reset() {
    setCategory("all");
    setTags(new Set());
    setQuery("");
  }

  const hasFilters = category !== "all" || tags.size > 0 || query.trim() !== "";

  const filters = (
    <div className="flex flex-col gap-8">
      {/* Catégories */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Catégories
        </p>
        <ul className="mt-3 flex flex-col gap-1 text-sm">
          <li>
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={`rounded-lg px-2 py-1 transition-colors ${
                category === "all"
                  ? "font-medium text-prune"
                  : "text-greige hover:text-prune"
              }`}
            >
              Toutes
            </button>
          </li>
          {categories.map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-lg px-2 py-1 transition-colors ${
                  category === c
                    ? "font-medium text-prune"
                    : "text-greige hover:text-prune"
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      {allTags.length > 0 ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            Tags
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {allTags.map((t) => {
              const active = tags.has(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                    active
                      ? "border-prune bg-prune text-ivory"
                      : "rule-gold text-prune hover:bg-prune/5"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {hasFilters ? (
        <button
          type="button"
          onClick={reset}
          className="self-start text-sm text-greige underline transition-colors hover:text-prune"
        >
          Réinitialiser les filtres
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12">
      {/* Sidebar desktop */}
      <aside className="hidden lg:block">{filters}</aside>

      <div>
        {/* Barre : recherche + tri + filtrer (mobile) */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit…"
            className="w-full rounded-full border border-prune/20 bg-ivory px-5 py-2.5 text-sm text-ink placeholder:text-greige/60 focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Trier"
            className="rounded-full border border-prune/20 bg-ivory px-4 py-2.5 text-sm text-prune focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-full border border-prune/20 px-5 py-2.5 text-sm font-medium text-prune transition-colors hover:bg-prune/5 lg:hidden"
          >
            {mobileOpen ? "Masquer les filtres" : "Filtrer"}
          </button>
        </div>

        {/* Panneau filtres mobile */}
        {mobileOpen ? (
          <div className="mt-4 rounded-2xl border rule-gold bg-champagne/20 p-5 lg:hidden">
            {filters}
          </div>
        ) : null}

        <p className="mt-6 text-sm text-greige">
          {filtered.length} produit{filtered.length > 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border rule-gold bg-champagne/30 p-10 text-center">
            <p className="font-serif text-xl font-semibold text-prune">
              Aucun produit ne correspond
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-greige">
              Essayez d&apos;élargir votre recherche ou de réinitialiser les
              filtres.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
