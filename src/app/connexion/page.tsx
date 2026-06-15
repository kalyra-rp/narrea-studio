import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion",
  robots: { index: false, follow: false },
};

export default function ConnexionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 py-16">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="flex items-center justify-center gap-3"
          aria-label="Narrea Studio — accueil"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold font-serif text-xl font-semibold text-prune">
            N
          </span>
          <span className="font-serif text-xl font-semibold tracking-wide text-prune">
            NARREA STUDIO
          </span>
        </Link>

        <div className="mt-8 rounded-3xl border rule-gold bg-white p-8 sm:p-10">
          <h1 className="font-serif text-2xl font-semibold text-prune">
            Connexion
          </h1>
          <p className="mt-2 text-sm text-greige">
            Espace réservé. Connectez-vous avec votre email et votre mot de
            passe.
          </p>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs text-greige">
          <Link href="/" className="underline transition-colors hover:text-prune">
            ← Retour au site
          </Link>
        </p>
      </div>
    </main>
  );
}
