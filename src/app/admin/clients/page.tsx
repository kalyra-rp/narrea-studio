import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CreateClientForm } from "@/components/admin/CreateClientForm";
import { getClientsAdmin } from "@/lib/admin-data";
import { formatDateFr } from "@/lib/client-space";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const clients = await getClientsAdmin();

  return (
    <Container className="py-12">
      <h1 className="font-serif text-3xl font-semibold text-prune">Clients</h1>
      <p className="mt-2 text-sm text-greige">
        {clients.length} client{clients.length > 1 ? "s" : ""}.
      </p>

      <div className="mt-8">
        <CreateClientForm />
      </div>

      {clients.length === 0 ? (
        <p className="mt-10 rounded-2xl border rule-gold bg-champagne/30 p-8 text-center text-greige">
          Aucun client pour l&apos;instant.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-prune/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-champagne/40 text-prune">
              <tr>
                <th className="px-5 py-3 font-medium">Entreprise / Contact</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Créé le</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-prune/10">
              {clients.map((c) => (
                <tr key={c.id}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink">{c.entreprise ?? "—"}</p>
                    <p className="text-xs text-greige">{c.contact_nom ?? ""}</p>
                  </td>
                  <td className="px-5 py-4 text-greige">
                    {c.contact_email ?? c.profiles?.email ?? "—"}
                    {c.profiles?.must_change_password ? (
                      <span className="ml-2 inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                        mdp à changer
                      </span>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 text-greige">
                    {formatDateFr(c.created_at)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/clients/${c.id}`}
                      className="rounded-full border border-prune/20 px-3 py-1.5 text-sm font-medium text-prune transition-colors hover:bg-prune/5"
                    >
                      Voir
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
