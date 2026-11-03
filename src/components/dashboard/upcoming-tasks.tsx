"use client";

import { upcomingTasks } from "@/lib/selectors";
import { useWorkspace } from "@/store/workspace";
import { EmptyState } from "@/components/ui/empty-state";
import { Section } from "@/components/ui/section";
import { TaskItem } from "@/components/tasks/task-item";

export function UpcomingTasks() {
  const { tasks, projects, setTaskStatus } = useWorkspace();
  const next = upcomingTasks(tasks, 5);

  return (
    <Section id="upcoming-heading" title="Up next" action={{ href: "/tasks", label: "All tasks" }}>
      {next.length === 0 ? (
        <EmptyState title="Clear runway" message="No open tasks with an upcoming deadline." />
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-card px-5 py-1">
          {next.map((task) => (
            <li key={task.id}>
              <TaskItem
                task={task}
                project={projects.find((p) => p.id === task.projectId)}
                onStatusChange={(status) => setTaskStatus(task.id, status)}
              />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}