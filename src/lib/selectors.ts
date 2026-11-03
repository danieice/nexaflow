import { daysUntil } from "./dates";
import type { Member, Project, ProjectStatus, Task } from "./types";

export function memberName(team: Member[], id: string) {
  return team.find((member) => member.id === id)?.name ?? "Unassigned";
}

export function projectProgress(project: Project, tasks: Task[]) {
  if (project.status === "Completed") return 100;
  const own = tasks.filter((task) => task.projectId === project.id);
  if (own.length === 0) return 0;
  const done = own.filter((task) => task.status === "Done").length;
  return Math.round((done / own.length) * 100);
}

export function isOverdue(task: Task) {
  return task.status !== "Done" && daysUntil(task.deadline) < 0;
}

export function getStats(projects: Project[], tasks: Task[]) {
  return {
    activeProjects: projects.filter((p) => p.status === "In Progress").length,
    completedTasks: tasks.filter((t) => t.status === "Done").length,
    overdueTasks: tasks.filter(isOverdue).length,
    totalTasks: tasks.length,
  };
}

export function upcomingTasks(tasks: Task[], limit = 5) {
  return tasks
    .filter((task) => task.status !== "Done" && daysUntil(task.deadline) >= 0)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, limit);
}

export function recentProjects(projects: Project[], limit = 4) {
  return [...projects].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

export type StatusFilter = ProjectStatus | "All";
export type ProjectSort = "deadline" | "newest" | "progress";

export type ProjectQuery = {
  search: string;
  status: StatusFilter;
  sort: ProjectSort;
};

export function queryProjects(
  projects: Project[],
  tasks: Task[],
  team: Member[],
  query: ProjectQuery
) {
  const term = query.search.trim().toLowerCase();

  const matches = projects.filter((project) => {
    if (query.status !== "All" && project.status !== query.status) return false;
    if (!term) return true;
    return [project.name, project.description, memberName(team, project.managerId)].some((text) =>
      text.toLowerCase().includes(term)
    );
  });

  return matches.sort((a, b) => {
    if (query.sort === "progress") return projectProgress(b, tasks) - projectProgress(a, tasks);
    if (query.sort === "newest") return b.createdAt.localeCompare(a.createdAt);
    return a.deadline.localeCompare(b.deadline);
  });
}

export const TASK_FILTERS = ["all", "overdue", "week", "done"] as const;
export type TaskFilter = (typeof TASK_FILTERS)[number];

export function isTaskFilter(value: unknown): value is TaskFilter {
  return typeof value === "string" && (TASK_FILTERS as readonly string[]).includes(value);
}

export function filterTasks(tasks: Task[], filter: TaskFilter, projectId: string) {
  return tasks
    .filter((task) => {
      if (projectId !== "all" && task.projectId !== projectId) return false;
      if (filter === "overdue") return isOverdue(task);
      if (filter === "done") return task.status === "Done";
      if (filter === "week") {
        const days = daysUntil(task.deadline);
        return task.status !== "Done" && days >= 0 && days <= 7;
      }
      return true;
    })
    .sort((a, b) => a.deadline.localeCompare(b.deadline));
}