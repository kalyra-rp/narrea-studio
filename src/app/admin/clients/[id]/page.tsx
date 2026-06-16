import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getClientAdmin } from "@/lib/admin-data";
import {
  STATUT_LABELS,
  formatDateFr,
  statutBadgeClass,
} from "@/lib/client-space";

export const dynamic = "force-dynamic";

export default async function AdminClientDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getClientAdmin(id);
  if (!data) notFound();
  const { client, projects } = data;

  return (
    <Container className="py-12">
      <Link
        href="/admin/clients"
        className="text-sm text-greige underline transition-colors hover:text-prune"
      >
        ← Tous les clients
      </Link>

      <h1 className="mt-4 font-serif text-3xl font-semibold text-prune">
        {client.entreprise ?? client.contact_nom ?? "Client"}
      </h1>

      <dl className="mt-6 grid max-w-2xl gap-4 rounded-2xl border rule-gold bg-champagne/30 p-6 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium text-prune">Contact</dt>
          <dd className="mt-1 text-greige">{client.contact_nom ?? "—"}</dd>
        </div>
        <div>
          <dt className="font-medium text-prune">Email</dt>
          <dd className="mt-1 text-greige">
            {client.contact_email ?? client.profiles?.email ?? "—"}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-medium text-prune">Infos</dt>
          <dd className="mt-1 whitespace-pre-line text-greige">
            {client.infos ?? "—"}
          </dd>
        </div>
      </dl>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-prune">Projets</h2>
        <Link
          href="/admin/projets"
          className="text-sm font-medium text-prune underline transition-colors hover:text-prune-deep"
        >
          Gérer les projets →
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="mt-6 text-sm text-greige">Aucun projet pour ce client.</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {projects.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/projets/${p.id}`}
                className="flex items-center justify-between rounded-xl border border-prune/10 bg-white px-5 py-4 transition-colors hover:border-gold"
              >
                <span>
                  <span className="font-medium text-ink">{p.titre}</span>
                  <span className="ml-2 text-xs text-greige">
                    échéance {formatDateFr(p.echeance)}
                  </span>
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statutBadgeClass(p.statut)}`}
                >
                  {STATUT_LABELS[p.statut]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
