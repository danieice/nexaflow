import clsx from "clsx";
import { colorHex } from "@/lib/colors";
import { daysUntil, formatDate } from "@/lib/dates";
import type { Project } from "@/lib/types";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusTag } from "./status-tag";

type Props = {
  project: Project;
  progress: number;
  managerName: string;
};

export function ProjectCard({ project, progress, managerName }: Props) {
  const color = colorHex[project.color];
  const late = project.status !== "Completed" && daysUntil(project.deadline) < 0;

  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-line bg-card p-5 pt-7">
      <span
        aria-hidden
        className="absolute -top-px left-5 h-2.5 w-12 rounded-b-md"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-2xl leading-tight">{project.name}</h3>
        <StatusTag status={project.status} />
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{project.description}</p>

      <dl className="mt-5 grid grid-cols-2 gap-3 font-mono text-[11px]">
        <div>
          <dt className="uppercase tracking-[0.14em] text-ink-soft">Lead</dt>
          <dd className="mt-1 text-ink">{managerName}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-[0.14em] text-ink-soft">Deadline</dt>
          <dd className={clsx("mt-1", late ? "text-accent" : "text-ink")}>
            <time dateTime={project.deadline}>{formatDate(project.deadline)}</time>
            {late ? " · late" : null}
          </dd>
        </div>
      </dl>

      <div className="mt-auto pt-5">
        <div className="mb-1.5 flex justify-between font-mono text-[11px] text-ink-soft">
          <span>Progress</span>
          <span className="text-ink">{progress}%</span>
        </div>
        <ProgressBar value={progress} color={color} label={`${project.name} progress`} />
      </div>
    </article>
  );
}