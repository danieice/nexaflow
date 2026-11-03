import { ProjectsView } from "@/components/projects/projects-view";
import { isProjectStatus } from "@/lib/types";

export const metadata = { title: "Projects · NexaFlow" };

type Props = {
  searchParams: Promise<{ status?: string }>;
};

export default async function ProjectsPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const initialStatus = isProjectStatus(status) ? status : "All";

  return <ProjectsView key={initialStatus} initialStatus={initialStatus} />;
}