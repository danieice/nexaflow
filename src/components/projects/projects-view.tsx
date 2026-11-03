"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { plural } from "@/lib/format";
import {
  memberName,
  projectProgress,
  queryProjects,
  type ProjectQuery,
  type StatusFilter,
} from "@/lib/selectors";
import type { Project } from "@/lib/types";
import { useWorkspace } from "@/store/workspace";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { NewProjectButton } from "./new-project-button";
import { ProjectCard } from "./project-card";
import { ProjectToolbar } from "./project-toolbar";

type Props = {
  initialStatus: StatusFilter;
};

export function ProjectsView({ initialStatus }: Props) {
  const { projects, tasks, team } = useWorkspace();
  const [query, setQuery] = useState<ProjectQuery>({
    search: "",
    status: initialStatus,
    sort: "deadline",
  });
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const visible = queryProjects(projects, tasks, team, query);

  useEffect(() => {
    if (!highlightId) return;
    const timer = window.setTimeout(() => setHighlightId(null), 2500);
    return () => window.clearTimeout(timer);
  }, [highlightId]);

  // make sure a new project is never hidden by an active filter
  function showNewProject(project: Project) {
    setQuery({ search: "", status: "All", sort: "newest" });
    setHighlightId(project.id);
  }

  let content;
  if (projects.length === 0) {
    content = (
      <EmptyState title="No projects yet" message="Create the first one and it will land here.">
        <NewProjectButton onCreated={showNewProject} />
      </EmptyState>
    );
  } else if (visible.length === 0) {
    content = (
      <EmptyState title="Nothing matches" message="Try a different search or status.">
        <Button variant="ghost" onClick={() => setQuery({ ...query, search: "", status: "All" })}>
          Clear filters
        </Button>
      </EmptyState>
    );
  } else {
    content = (
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => (
          <li
            key={project.id}
            className={clsx(
              "rounded-2xl transition-shadow duration-500",
              project.id === highlightId && "ring-2 ring-accent ring-offset-4 ring-offset-paper"
            )}
          >
            <ProjectCard
              project={project}
              progress={projectProgress(project, tasks)}
              managerName={memberName(team, project.managerId)}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl leading-none sm:text-6xl">Projects</h1>
          <p className="mt-3 text-ink-soft">{plural(projects.length, "project")} across the team.</p>
        </div>
        <NewProjectButton onCreated={showNewProject} />
      </header>

      <ProjectToolbar query={query} onChange={setQuery} />

      <p aria-live="polite" className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
        Showing {visible.length} of {projects.length}
      </p>

      {content}
    </div>
  );
}