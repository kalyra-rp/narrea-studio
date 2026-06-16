import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NouveauProduitPage() {
  return (
    <Container className="py-12">
      <Link
        href="/admin/produits"
        className="text-sm text-greige underline transition-colors hover:text-prune"
      >
        ← Retour aux produits
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-prune">
        Nouveau produit
      </h1>
      <div className="mt-8">
        <ProductForm />
      </div>
    </Container>
  );
}
