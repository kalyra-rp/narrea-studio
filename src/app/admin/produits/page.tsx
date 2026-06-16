import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductRowActions } from "@/components/admin/ProductRowActions";
import { getAllProductsAdmin } from "@/lib/products-admin";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProductsAdmin();

  return (
    <Container className="py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-prune">Produits</h1>
          <p className="mt-2 text-sm text-greige">
            {products.length} produit{products.length > 1 ? "s" : ""}.
          </p>
        </div>
        <Link
          href="/admin/produits/nouveau"
          className="inline-flex shrink-0 rounded-full bg-prune px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
        >
          + Nouveau produit
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-10 rounded-2xl border rule-gold bg-champagne/30 p-8 text-center text-greige">
          Aucun produit pour l&apos;instant.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-prune/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-champagne/40 text-prune">
              <tr>
                <th className="px-5 py-3 font-medium">Produit</th>
                <th className="px-5 py-3 font-medium">Prix</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 font-medium">Payhip</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-prune/10">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink">{p.nom}</p>
                    <p className="font-mono text-xs text-greige">/{p.slug}</p>
                  </td>
                  <td className="px-5 py-4 text-greige">{p.prix ?? "—"}</td>
                  <td className="px-5 py-4">
                    {p.statut === "publie" ? (
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
                    {p.payhip_url ? "Lié" : "Bientôt"}
                  </td>
                  <td className="px-5 py-4">
                    <ProductRowActions product={p} />
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
