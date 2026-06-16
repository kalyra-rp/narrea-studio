"use client";

import { useState } from "react";
import Link from "next/link";
import { mainNav } from "@/lib/site";
import { signOut } from "@/app/connexion/actions";

export function MobileNav({ role }: { role: "admin" | "client" | null }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const espaceHref = role === "admin" ? "/admin" : "/espace";

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="menu-mobile"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-prune/20 text-prune transition-colors hover:bg-prune/5"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {open ? (
        <div
          id="menu-mobile"
          className="absolute inset-x-0 top-full border-b rule-gold bg-ivory shadow-lg"
        >
          <nav aria-label="Navigation mobile" className="px-6 py-4">
            <ul className="flex flex-col">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block border-b border-prune/10 py-3 text-base font-medium text-ink transition-colors hover:text-prune"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-3">
              {role ? (
                <>
                  <Link
                    href={espaceHref}
                    onClick={close}
                    className="inline-flex justify-center rounded-full bg-prune px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-prune-deep"
                  >
                    {role === "admin" ? "Mon tableau de bord" : "Mon espace"}
                  </Link>
                  <form action={signOut}>
                    <button
                      type="submit"
                      className="w-full rounded-full border border-prune/20 px-5 py-2.5 text-sm font-medium text-prune transition-colors hover:bg-prune/5"
                    >
                      Déconnexion
                    </button>
                  </form>
                </>
              ) : (
                <Link
                  href="/connexion"
                  onClick={close}
                  className="inline-flex justify-center rounded-full border border-prune/30 px-5 py-2.5 text-sm font-medium text-prune transition-colors hover:bg-prune/5"
                >
                  Connexion
                </Link>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
