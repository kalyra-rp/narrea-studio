import "server-only";
import { createServerSupabase } from "@/lib/supabase/auth-server";
import type { Deliverable, Project, ProjectMessage } from "@/lib/client-space";

// Lectures CÔTÉ CLIENT : via la session (cookies) → la RLS garantit que le
// client ne voit QUE ses propres données.

export async function getMyProjects(): Promise<Project[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getMyProjects :", error.message);
    return [];
  }
  return (data as Project[]) ?? [];
}

export async function getMyProject(id: string): Promise<{
  project: Project;
  deliverables: Deliverable[];
  messages: ProjectMessage[];
} | null> {
  const supabase = await createServerSupabase();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!project) return null; // inexistant OU non autorisé (RLS) → 404

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
    project: project as Project,
    deliverables: (deliverables as Deliverable[]) ?? [],
    messages: (messages as ProjectMessage[]) ?? [],
  };
}
