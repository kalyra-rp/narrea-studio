import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CreateProjectForm } from "@/components/admin/CreateProjectForm";
import { getClientsAdmin, getProjectsAdmin } from "@/lib/admin-data";
import {
  STATUT_LABELS,
  formatDateFr,
  statutBadgeClass,
} from "@/lib/client-space";

export const dynamic = "force-dynamic";

export default async function AdminProjetsPage() {
  const [projects, clients] = await Promise.all([
    getProjectsAdmin(),
    getClientsAdmin(),
  ]);

  const clientOptions = clients.map((c) => ({
    id: c.id,
    label: c.entreprise ?? c.contact_nom ?? c.contact_email ?? "Client",
  }));

  return (
    <Container className="py-12">
      <h1 className="font-serif text-3xl font-semibold text-prune">Projets</h1>
      <p className="mt-2 text-sm text-greige">
        {projects.length} projet{projects.length > 1 ? "s" : ""}.
      </p>

      <div className="mt-8">
        <CreateProjectForm clients={clientOptions} />
      </div>

      {projects.length === 0 ? (
        <p className="mt-10 rounded-2xl border rule-gold bg-champagne/30 p-8 text-center text-greige">
          Aucun projet pour l&apos;instant.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-prune/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-champagne/40 text-prune">
              <tr>
                <th className="px-5 py-3 font-medium">Projet</th>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 font-medium">Échéance</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-prune/10">
              {projects.map((p) => (
                <tr key={p.id}>
                  <td className="px-5 py-4 font-medium text-ink">{p.titre}</td>
                  <td className="px-5 py-4 text-greige">
                    {p.clients?.entreprise ?? p.clients?.contact_nom ?? "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statutBadgeClass(p.statut)}`}
                    >
                      {STATUT_LABELS[p.statut]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-greige">
                    {formatDateFr(p.echeance)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/projets/${p.id}`}
                      className="rounded-full border border-prune/20 px-3 py-1.5 text-sm font-medium text-prune transition-colors hover:bg-prune/5"
                    >
                      Ouvrir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}
