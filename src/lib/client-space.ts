// Types et libellés partagés de l'espace client (admin + client).

export type ProjectStatut =
  | "en_attente"
  | "en_cours"
  | "en_revision"
  | "livre"
  | "termine";

export const STATUT_LABELS: Record<ProjectStatut, string> = {
  en_attente: "En attente",
  en_cours: "En cours",
  en_revision: "En révision",
  livre: "Livré",
  termine: "Terminé",
};

export const STATUT_ORDER: ProjectStatut[] = [
  "en_attente",
  "en_cours",
  "en_revision",
  "livre",
  "termine",
];

export type Client = {
  id: string;
  profile_id: string | null;
  entreprise: string | null;
  contact_nom: string | null;
  contact_email: string | null;
  infos: string | null;
  created_at: string;
};

export type Project = {
  id: string;
  client_id: string;
  titre: string;
  offre: string | null;
  statut: ProjectStatut;
  echeance: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Deliverable = {
  id: string;
  project_id: string;
  nom: string;
  type: "fichier" | "lien";
  url: string;
  created_at: string;
};

export type ProjectMessage = {
  id: string;
  project_id: string;
  author_id: string | null;
  contenu: string;
  created_at: string;
};

// Couleur de badge selon le statut (classes Tailwind).
export function statutBadgeClass(statut: ProjectStatut): string {
  switch (statut) {
    case "en_attente":
      return "bg-greige/15 text-greige";
    case "en_cours":
      return "bg-amber-100 text-amber-700";
    case "en_revision":
      return "bg-blue-100 text-blue-700";
    case "livre":
      return "bg-green-100 text-green-700";
    case "termine":
      return "bg-prune/10 text-prune";
  }
}

export function formatDateFr(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
