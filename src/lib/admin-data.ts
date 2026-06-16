import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  Client,
  Deliverable,
  Project,
  ProjectMessage,
} from "@/lib/client-space";

export type ClientWithMeta = Client & {
  profiles: { email: string | null } | null;
};

export type ProjectWithClient = Project & {
  clients: {
    entreprise: string | null;
    contact_nom: string | null;
    profile_id?: string | null;
  } | null;
};

export async function getClientsAdmin(): Promise<ClientWithMeta[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*, profiles(email)")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getClientsAdmin :", error.message);
    return [];
  }
  return (data as ClientWithMeta[]) ?? [];
}

export async function getClientAdmin(
  id: string,
): Promise<{ client: ClientWithMeta; projects: Project[] } | null> {
  const supabase = createAdminClient();
  const { data: client, error } = await supabase
    .from("clients")
    .select("*, profiles(email)")
    .eq("id", id)
    .maybeSingle();
  if (error || !client) return null;

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  return {
    client: client as ClientWithMeta,
    projects: (projects as Project[]) ?? [],
  };
}

export async function getProjectsAdmin(): Promise<ProjectWithClient[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*, clients(entreprise, contact_nom)")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getProjectsAdmin :", error.message);
    return [];
  }
  return (data as ProjectWithClient[]) ?? [];
}

export async function getProjectAdmin(id: string): Promise<{
  project: ProjectWithClient;
  deliverables: Deliverable[];
  messages: ProjectMessage[];
} | null> {
  const supabase = createAdminClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select("*, clients(entreprise, contact_nom, profile_id)")
    .eq("id", id)
    .maybeSingle();
  if (error || !project) return null;

  const [{ data: deliverables }, { data: messages }] = await Promise.all([
    supabase
      .from("deliverables")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("project_messages")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: true }),
  ]);

  return {
    project: project as ProjectWithClient,
    deliverables: (deliverables as Deliverable[]) ?? [],
    messages: (messages as ProjectMessage[]) ?? [],
  };
}

// URL signée (bucket privé) pour télécharger un livrable fichier — admin.
export async function signedDeliverableUrl(
  path: string,
  expiresIn = 3600,
): Promise<string | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from("deliverables")
    .createSignedUrl(path, expiresIn);
  if (error) {
    console.error("signedDeliverableUrl :", error.message);
    return null;
  }
  return data.signedUrl;
}
