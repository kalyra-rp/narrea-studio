import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ChangePasswordForm } from "@/components/espace/ChangePasswordForm";

export const dynamic = "force-dynamic";

export default function ChangePasswordPage() {
  return (
    <Container className="py-12 sm:py-16">
      <Link
        href="/espace"
        className="text-sm text-greige underline transition-colors hover:text-prune"
      >
        ← Mon espace
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-prune">
        Changer mon mot de passe
      </h1>
      <p className="mt-2 text-sm text-greige">
        Choisissez un nouveau mot de passe pour votre compte.
      </p>
      <div className="mt-8">
        <ChangePasswordForm />
      </div>
    </Container>
  );
}
