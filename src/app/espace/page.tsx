import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getSessionUser } from "@/lib/auth";
import { getMyProjects } from "@/lib/client-data";
import {
  STATUT_LABELS,
  formatDateFr,
  statutBadgeClass,
} from "@/lib/client-space";

export const dynamic = "force-dynamic";

export default async function EspacePage() {
  const user = await getSessionUser();
  const projects = await getMyProjects();

  return (
    <Container className="py-12 sm:py-16">
      <p className="font-script text-2xl text-gold-dark">Bonjour{user?.nom ? ` ${user.nom}` : ""}</p>
      <h1 className="mt-1 font-serif text-3xl font-semibold text-prune sm:text-4xl">
        Vos projets
      </h1>

      {projects.length === 0 ? (
        <div className="mt-10 rounded-2xl border rule-gold bg-champagne/30 p-8 text-center sm:p-10">
          <p className="font-serif text-xl font-semibold text-prune">
            Aucun projet pour l&apos;instant
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-greige">
            Vos projets apparaîtront ici dès qu&apos;ils seront créés. Je vous
            tiens au courant !
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/espace/projets/${p.id}`}
              className="flex flex-col rounded-2xl border rule-gold bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-serif text-xl font-semibold text-prune">
                  {p.titre}
                </h2>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statutBadgeClass(p.statut)}`}
                >
                  {STATUT_LABELS[p.statut]}
                </span>
              </div>
              {p.offre ? (
                <p className="mt-2 text-sm text-greige">{p.offre}</p>
              ) : null}
              <p className="mt-4 text-xs text-greige">
                Échéance : {formatDateFr(p.echeance)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
