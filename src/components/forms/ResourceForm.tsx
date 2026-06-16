"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { subscribeToResource } from "@/app/(site)/ressources/actions";

const inputClass =
  "w-full rounded-xl border border-prune/20 bg-ivory px-4 py-3 text-sm text-ink placeholder:text-greige/60 focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40";

export function ResourceForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");

    startTransition(async () => {
      const res = await subscribeToResource(email);
      if ("error" in res) setError(res.error);
      else setDone(true);
    });
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center sm:p-8">
        <p className="font-serif text-xl font-semibold text-prune">
          C&apos;est noté, merci !
        </p>
        <p className="mt-2 text-sm leading-relaxed text-greige">
          Vérifiez votre boîte mail : un message de confirmation vous attend (et
          pensez aux indésirables).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-ivory p-6 sm:p-8">
      <label htmlFor="email" className="text-sm font-medium text-prune">
        Votre email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="vous@exemple.com"
        className={`mt-2 ${inputClass}`}
      />
      <label className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-greige">
        <input
          type="checkbox"
          name="consentement"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-prune/30 text-prune focus:ring-gold/40"
        />
        <span>
          En vous inscrivant, vous acceptez de recevoir votre ressource et,
          occasionnellement, des conseils et nouvelles de Narrea Studio. Vous
          pouvez vous désinscrire à tout moment via le lien présent dans chaque
          courriel. Voir la{" "}
          <Link
            href="/confidentialite"
            className="underline transition-colors hover:text-prune"
          >
            Politique de confidentialité
          </Link>
          .
        </span>
      </label>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-4 inline-flex w-full justify-center rounded-full bg-prune px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60"
      >
        {isPending ? "Envoi…" : "Recevoir la ressource"}
      </button>
    </form>
  );
}
