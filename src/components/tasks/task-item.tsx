import clsx from "clsx";
import { colorHex } from "@/lib/colors";
import { dueLabel, formatDate } from "@/lib/dates";
import { isOverdue } from "@/lib/selectors";
import type { Priority, Project, Task, TaskStatus } from "@/lib/types";
import { StatusSelect } from "./status-select";

const priorityTone: Record<Priority, string> = {
  High: "text-accent",
  Medium: "text-ink",
  Low: "text-ink-soft",
};

type Props = {
  task: Task;
  project?: Project;
  onStatusChange: (status: TaskStatus) => void;
};

export function TaskItem({ task, project, onStatusChange }: Props) {
  const done = task.status === "Done";

  return (
    <article className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
      <div className="min-w-0 flex-1">
        <h3 className={clsx("text-[15px] leading-snug", done && "text-ink-soft line-through")}>
          {task.title}
        </h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-ink-soft">
          {project ? (
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden
                className="size-2 rounded-[2px]"
                style={{ backgroundColor: colorHex[project.color] }}
              />
              {project.name}
            </span>
          ) : null}
          <time dateTime={task.deadline} className={clsx(isOverdue(task) && "text-accent")}>
            {done ? formatDate(task.deadline) : dueLabel(task.deadline)}
          </time>
          <span className={priorityTone[task.priority]}>{task.priority} priority</span>
        </p>
      </div>
      <StatusSelect
        value={task.status}
        label={`Status for ${task.title}`}
        onChange={onStatusChange}
      />
    </article>
  );
}