import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { StatutSelect } from "@/components/admin/StatutSelect";
import { ProjectDetailsForm } from "@/components/admin/ProjectDetailsForm";
import {
  DeliverableManager,
  type DeliverableItem,
} from "@/components/admin/DeliverableManager";
import { MessageComposer } from "@/components/admin/MessageComposer";
import { getProjectAdmin, signedDeliverableUrl } from "@/lib/admin-data";
import { formatDateFr } from "@/lib/client-space";

export const dynamic = "force-dynamic";

export default async function AdminProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProjectAdmin(id);
  if (!data) notFound();
  const { project, deliverables, messages } = data;

  // URLs signées pour les fichiers (bucket privé) ; URL directe pour les liens.
  const items: DeliverableItem[] = await Promise.all(
    deliverables.map(async (d) => ({
      id: d.id,
      nom: d.nom,
      type: d.type,
      href: d.type === "fichier" ? await signedDeliverableUrl(d.url) : d.url,
    })),
  );

  const clientProfileId = project.clients?.profile_id ?? null;

  return (
    <Container className="py-12">
      <Link
        href="/admin/projets"
        className="text-sm text-greige underline transition-colors hover:text-prune"
      >
        ← Tous les projets
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-prune">
            {project.titre}
          </h1>
          <p className="mt-1 text-sm text-greige">
            {project.clients?.entreprise ?? project.clients?.contact_nom ?? "—"}
            {" · échéance "}
            {formatDateFr(project.echeance)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-greige">Statut</span>
          <StatutSelect projectId={project.id} current={project.statut} />
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {/* Détails */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-prune">Détails</h2>
          <div className="mt-4">
            <ProjectDetailsForm
              projectId={project.id}
              offre={project.offre ?? ""}
              echeance={project.echeance ?? ""}
              notes={project.notes ?? ""}
            />
          </div>
        </section>

        {/* Livrables */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-prune">Livrables</h2>
          <div className="mt-4">
            <DeliverableManager projectId={project.id} items={items} />
          </div>
        </section>
      </div>

      {/* Messagerie */}
      <section className="mt-12">
        <h2 className="font-serif text-xl font-semibold text-prune">Messagerie</h2>
        <div className="mt-4 rounded-2xl border rule-gold bg-champagne/20 p-5">
          {messages.length === 0 ? (
            <p className="text-sm text-greige">Aucun message pour l&apos;instant.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {messages.map((m) => {
                const fromClient = m.author_id === clientProfileId;
                return (
                  <li
                    key={m.id}
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      fromClient
                        ? "bg-white text-ink"
                        : "ml-auto bg-prune text-ivory"
                    }`}
                  >
                    <p className="mb-1 text-xs opacity-70">
                      {fromClient
                        ? (project.clients?.contact_nom ?? "Client")
                        : "Narrea Studio"}{" "}
                      · {formatDateFr(m.created_at)}
                    </p>
                    <p className="whitespace-pre-line leading-relaxed">
                      {m.contenu}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
          <MessageComposer projectId={project.id} />
        </div>
      </section>
    </Container>
  );
}
