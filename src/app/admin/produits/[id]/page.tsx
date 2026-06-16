import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductByIdAdmin } from "@/lib/products-admin";

export const dynamic = "force-dynamic";

export default async function EditProduitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductByIdAdmin(id);
  if (!product) notFound();

  return (
    <Container className="py-12">
      <Link
        href="/admin/produits"
        className="text-sm text-greige underline transition-colors hover:text-prune"
      >
        ← Retour aux produits
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-prune">
        Éditer le produit
      </h1>
      <div className="mt-8">
        <ProductForm product={product} />
      </div>
    </Container>
  );
}
