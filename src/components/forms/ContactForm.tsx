"use client";

import { useState, useTransition } from "react";
import { sendContactMessage } from "@/app/(site)/contact/actions";
import { services } from "@/lib/site";

const inputClass =
  "mt-2 w-full rounded-xl border border-prune/20 bg-ivory px-4 py-3 text-sm text-ink placeholder:text-greige/60 focus:border-prune focus:outline-none focus:ring-2 focus:ring-gold/40";

export function ContactForm({ initialSujet }: { initialSujet: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      sujet: String(data.get("sujet") ?? "autre"),
      message: String(data.get("message") ?? ""),
    };

    startTransition(async () => {
      const res = await sendContactMessage(values);
      if ("error" in res) setError(res.error);
      else setSent(true);
    });
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-green-200 bg-green-50 p-8 text-center sm:p-10">
        <p className="font-serif text-2xl font-semibold text-prune">
          Message envoyé, merci !
        </p>
        <p className="mt-3 text-sm leading-relaxed text-greige">
          Je vous réponds rapidement, directement par email.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border rule-gold bg-champagne/30 p-8 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-prune">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Votre nom"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-prune">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="vous@exemple.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="sujet" className="text-sm font-medium text-prune">
          Quel sujet ?
        </label>
        <select
          id="sujet"
          name="sujet"
          defaultValue={initialSujet}
          className={inputClass}
        >
          {services.map((offer) => (
            <option key={offer.slug} value={offer.slug}>
              {offer.title}
            </option>
          ))}
          <option value="autre">Autre / question</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-medium text-prune">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Parlez-moi de votre projet…"
          className={`${inputClass} resize-y`}
        />
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-6 inline-flex w-full justify-center rounded-full bg-prune px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep disabled:opacity-60 sm:w-auto"
      >
        {isPending ? "Envoi…" : "Envoyer le message"}
      </button>
    </form>
  );
}
