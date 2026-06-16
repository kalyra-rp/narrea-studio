import { Container } from "@/components/ui/Container";
import { ExportSubscribersButton } from "@/components/admin/ExportSubscribersButton";
import { getSubscribersAdmin } from "@/lib/admin-data";
import { formatDateFr } from "@/lib/client-space";

export const dynamic = "force-dynamic";

export default async function AdminAbonnesPage() {
  const subscribers = await getSubscribersAdmin();

  return (
    <Container className="py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-prune">Abonnés</h1>
          <p className="mt-2 text-sm text-greige">
            {subscribers.length} inscrit{subscribers.length > 1 ? "s" : ""}.
          </p>
        </div>
        <ExportSubscribersButton subscribers={subscribers} />
      </div>

      {subscribers.length === 0 ? (
        <p className="mt-10 rounded-2xl border rule-gold bg-champagne/30 p-8 text-center text-greige">
          Aucun abonné pour l&apos;instant.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-prune/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-champagne/40 text-prune">
              <tr>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-prune/10">
              {subscribers.map((s) => (
                <tr key={s.id}>
                  <td className="px-5 py-4 text-ink">{s.email}</td>
                  <td className="px-5 py-4 text-greige">
                    {formatDateFr(s.created_at)}
                  </td>
                  <td className="px-5 py-4 text-greige">{s.source ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}
