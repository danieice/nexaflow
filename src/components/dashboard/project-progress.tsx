"use client";

import { colorHex } from "@/lib/colors";
import { getStats, projectProgress } from "@/lib/selectors";
import { useWorkspace } from "@/store/workspace";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Section } from "@/components/ui/section";

export function ProjectProgress() {
  const { projects, tasks } = useWorkspace();
  const { completedTasks, totalTasks } = getStats(projects, tasks);
  const overall = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const rows = projects
    .map((project) => ({ project, progress: projectProgress(project, tasks) }))
    .sort((a, b) => b.progress - a.progress);

  return (
    <Section id="progress-heading" title="Progress">
      <div className="flex flex-col gap-8 rounded-2xl border border-line bg-card p-6 sm:flex-row sm:items-center">
        <div className="flex shrink-0 flex-col items-center">
          <div className="relative">
            <ProgressRing value={overall} label={`${overall}% of all tasks done`} />
            <span aria-hidden className="absolute inset-0 grid place-items-center font-display text-4xl">
              {overall}%
            </span>
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {completedTasks} of {totalTasks} tasks done
          </p>
        </div>

        {rows.length === 0 ? (
          <p className="text-sm text-ink-soft">Projects will show up here once you create one.</p>
        ) : (
          <ul className="min-w-0 flex-1 space-y-4">
            {rows.map(({ project, progress }) => (
              <li key={project.id}>
                <div className="mb-1.5 flex justify-between gap-3 text-sm">
                  <span className="truncate">{project.name}</span>
                  <span className="font-mono text-xs text-ink-soft">{progress}%</span>
                </div>
                <ProgressBar
                  value={progress}
                  color={colorHex[project.color]}
                  label={`${project.name} progress`}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}