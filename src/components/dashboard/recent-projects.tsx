"use client";

import { memberName, projectProgress, recentProjects } from "@/lib/selectors";
import { useWorkspace } from "@/store/workspace";
import { EmptyState } from "@/components/ui/empty-state";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/projects/project-card";

export function RecentProjects() {
  const { projects, tasks, team } = useWorkspace();
  const recent = recentProjects(projects, 4);

  return (
    <Section
      id="recent-heading"
      title="Recent projects"
      action={{ href: "/projects", label: "All projects" }}
    >
      {recent.length === 0 ? (
        <EmptyState title="No projects yet" message="Start one and it will show up here." />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {recent.map((project) => (
            <li key={project.id}>
              <ProjectCard
                project={project}
                progress={projectProgress(project, tasks)}
                managerName={memberName(team, project.managerId)}
              />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}