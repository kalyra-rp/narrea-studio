import type { Metadata } from "next";
import Link from "next/link";
import { WelcomeForm } from "./WelcomeForm";

export const metadata: Metadata = {
  title: "Bienvenue",
  robots: { index: false, follow: false },
};

export default function BienvenuePage() {
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
          <p className="font-script text-2xl text-gold-dark">Bienvenue</p>
          <h1 className="mt-1 font-serif text-2xl font-semibold text-prune">
            Choisissez votre mot de passe
          </h1>
          <p className="mt-2 text-sm text-greige">
            Définissez votre mot de passe pour activer votre espace client.
          </p>

          <WelcomeForm />
        </div>
      </div>
    </main>
  );
}
