import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ClientMessageComposer } from "@/components/espace/ClientMessageComposer";
import { getSessionUser } from "@/lib/auth";
import { getMyProject } from "@/lib/client-data";
import { signedDeliverableUrl } from "@/lib/admin-data";
import {
  STATUT_LABELS,
  STATUT_ORDER,
  formatDateFr,
  statutBadgeClass,
} from "@/lib/client-space";

export const dynamic = "force-dynamic";

export default async function EspaceProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getSessionUser();
  const data = await getMyProject(id);
  if (!data) notFound(); // inexistant ou non autorisé (RLS)
  const { project, deliverables, messages } = data;

  // URLs signées pour les fichiers (bucket privé). La RLS a déjà confirmé
  // que ces livrables appartiennent au client.
  const items = await Promise.all(
    deliverables.map(async (d) => ({
      ...d,
      href: d.type === "fichier" ? await signedDeliverableUrl(d.url) : d.url,
    })),
  );

  const currentIndex = STATUT_ORDER.indexOf(project.statut);

  return (
    <Container className="py-12 sm:py-16">
      <Link
        href="/espace"
        className="text-sm text-greige underline transition-colors hover:text-prune"
      >
        ← Mes projets
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-semibold text-prune sm:text-4xl">
          {project.titre}
        </h1>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${statutBadgeClass(project.statut)}`}
        >
          {STATUT_LABELS[project.statut]}
        </span>
      </div>
      <p className="mt-2 text-sm text-greige">
        {project.offre ? `${project.offre} · ` : ""}échéance{" "}
        {formatDateFr(project.echeance)}
      </p>

      {/* Avancement */}
      <section className="mt-8">
        <h2 className="font-serif text-xl font-semibold text-prune">Avancement</h2>
        <ol className="mt-4 flex flex-wrap gap-2">
          {STATUT_ORDER.map((s, i) => {
            const done = i <= currentIndex;
            return (
              <li
                key={s}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  done
                    ? "bg-prune text-ivory"
                    : "border border-prune/15 text-greige"
                }`}
              >
                {STATUT_LABELS[s]}
              </li>
            );
          })}
        </ol>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {/* Livrables */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-prune">Livrables</h2>
          {items.length === 0 ? (
            <p className="mt-4 text-sm text-greige">
              Aucun livrable disponible pour l&apos;instant.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-2">
              {items.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-prune/10 bg-white px-4 py-3 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-gold-dark" aria-hidden="true">
                      {d.type === "fichier" ? "↓" : "↗"}
                    </span>
                    <span className="text-ink">{d.nom}</span>
                  </span>
                  {d.href ? (
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-full bg-prune px-3 py-1.5 text-xs font-medium text-ivory transition-colors hover:bg-prune-deep"
                    >
                      {d.type === "fichier" ? "Télécharger" : "Ouvrir"}
                    </a>
                  ) : (
                    <span className="text-xs text-greige">Indisponible</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Messagerie */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-prune">Messagerie</h2>
          <div className="mt-4 rounded-2xl border rule-gold bg-champagne/20 p-5">
            {messages.length === 0 ? (
              <p className="text-sm text-greige">
                Aucun message. Écrivez-moi ci-dessous si besoin.
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {messages.map((m) => {
                  const fromMe = m.author_id === user?.id;
                  return (
                    <li
                      key={m.id}
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                        fromMe
                          ? "ml-auto bg-prune text-ivory"
                          : "bg-white text-ink"
                      }`}
                    >
                      <p className="mb-1 text-xs opacity-70">
                        {fromMe ? "Vous" : "Narrea Studio"} ·{" "}
                        {formatDateFr(m.created_at)}
                      </p>
                      <p className="whitespace-pre-line leading-relaxed">
                        {m.contenu}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
            <ClientMessageComposer projectId={project.id} />
          </div>
        </section>
      </div>
    </Container>
  );
}
