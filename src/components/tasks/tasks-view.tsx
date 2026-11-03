"use client";

import { useState } from "react";
import clsx from "clsx";
import { X } from "lucide-react";
import { plural } from "@/lib/format";
import { filterTasks, type TaskFilter } from "@/lib/selectors";
import { TASK_STATUSES, type Task, type TaskStatus } from "@/lib/types";
import { useWorkspace } from "@/store/workspace";
import { EmptyState } from "@/components/ui/empty-state";
import { inputClass } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { TaskItem } from "./task-item";

const filterLabels: Record<TaskFilter, string> = {
  all: "All",
  overdue: "Overdue",
  week: "Due this week",
  done: "Done",
};

const filterOptions = Object.keys(filterLabels) as TaskFilter[];

type Props = {
  initialFilter: TaskFilter;
};

export function TasksView({ initialFilter }: Props) {
  const { tasks, projects, setTaskStatus } = useWorkspace();
  const notify = useToast();
  const [filter, setFilter] = useState<TaskFilter>(initialFilter);
  const [projectId, setProjectId] = useState("all");

  const visible = filterTasks(tasks, filter, projectId);
  const openCount = tasks.filter((task) => task.status !== "Done").length;
  const isFiltered = filter !== "all" || projectId !== "all";

  function changeStatus(task: Task, status: TaskStatus) {
    setTaskStatus(task.id, status);
    notify(`"${task.title}" moved to ${status}`);
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-5xl leading-none sm:text-6xl">Tasks</h1>
        <p className="mt-3 text-ink-soft">
          {plural(openCount, "open task")} across {plural(projects.length, "project")}.
        </p>
      </header>

      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-4 lg:flex-row lg:items-center">
        <fieldset className="flex flex-1 flex-wrap gap-1.5">
          <legend className="sr-only">Show tasks</legend>
          {filterOptions.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="task-filter"
                value={option}
                checked={filter === option}
                onChange={() => setFilter(option)}
                className="peer sr-only"
              />
              <span
                className={clsx(
                  "block rounded-full border border-line px-3 py-1.5 text-xs transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-card peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink",
                  option === "overdue" && "text-accent"
                )}
              >
                {filterLabels[option]}
              </span>
            </label>
          ))}
        </fieldset>

        <div className="flex items-center gap-2">
          <label
            htmlFor="task-project"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft"
          >
            Project
          </label>
          <select
            id="task-project"
            value={projectId}
            onChange={(event) => setProjectId(event.target.value)}
            className={clsx(inputClass, "w-auto py-2")}
          >
            <option value="all">All projects</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {isFiltered ? (
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setProjectId("all");
            }}
            className="inline-flex items-center gap-1 self-start text-xs text-ink-soft underline-offset-4 hover:text-ink hover:underline lg:self-center"
          >
            <X className="size-3.5" aria-hidden />
            Clear
          </button>
        ) : null}
      </div>

      {tasks.length === 0 ? (
        <EmptyState title="No tasks yet" message="Tasks added to projects will show up here." />
      ) : (
        <div className="grid gap-6 xl:grid-cols-3">
          {TASK_STATUSES.map((status) => {
            const column = visible.filter((task) => task.status === status);
            const headingId = `column-${status.toLowerCase().replace(" ", "-")}`;

            return (
              <section
                key={status}
                aria-labelledby={headingId}
                className="rounded-2xl border border-line bg-card"
              >
                <div className="flex items-baseline justify-between border-b border-line px-5 py-4">
                  <h2 id={headingId} className="font-display text-2xl leading-none">
                    {status}
                  </h2>
                  <span className="font-mono text-xs text-ink-soft">{column.length}</span>
                </div>

                {column.length === 0 ? (
                  <p className="px-5 py-10 text-center text-sm text-ink-soft">Nothing here.</p>
                ) : (
                  <ul className="divide-y divide-line px-5">
                    {column.map((task) => (
                      <li key={task.id}>
                        <TaskItem
                          task={task}
                          project={projects.find((p) => p.id === task.projectId)}
                          onStatusChange={(next) => changeStatus(task, next)}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}