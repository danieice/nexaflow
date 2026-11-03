"use client";

import { plural } from "@/lib/format";
import { getStats } from "@/lib/selectors";
import { useWorkspace } from "@/store/workspace";
import { StatCard } from "./stat-card";

export function StatsRow() {
  const { projects, tasks } = useWorkspace();
  const stats = getStats(projects, tasks);

  return (
    <ul aria-label="Workspace summary" className="grid gap-4 sm:grid-cols-3">
      <li>
        <StatCard
          label="Active projects"
          value={stats.activeProjects}
          note={`of ${plural(projects.length, "project")} in total`}
          href="/projects?status=In%20Progress"
        />
      </li>
      <li>
        <StatCard
          label="Tasks completed"
          value={stats.completedTasks}
          note={`out of ${stats.totalTasks}`}
          href="/tasks?filter=done"
        />
      </li>
      <li>
        <StatCard
          label="Overdue tasks"
          value={stats.overdueTasks}
          note={stats.overdueTasks > 0 ? "past their deadline" : "nothing late"}
          href="/tasks?filter=overdue"
          alert
        />
      </li>
    </ul>
  );
}