"use client";

import { currentUser } from "@/data/seed";
import { daysUntil } from "@/lib/dates";
import { plural } from "@/lib/format";
import { isOverdue } from "@/lib/selectors";
import { useWorkspace } from "@/store/workspace";
import { NewProjectButton } from "@/components/projects/new-project-button";

function greeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function Welcome() {
  const { tasks } = useWorkspace();
  const now = new Date();

  const late = tasks.filter(isOverdue).length;
  const soon = tasks.filter((task) => {
    const days = daysUntil(task.deadline);
    return task.status !== "Done" && days >= 0 && days <= 2;
  }).length;

  const lateText =
    late > 0 ? `${plural(late, "task")} ${late === 1 ? "is" : "are"} late` : "Nothing is late";

  return (
    <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
        {now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
      </p>
      <h1 className="mt-3 font-display text-5xl leading-[0.95] sm:text-6xl">
        {greeting(now.getHours())}, <em className="text-accent">{currentUser.name}</em>.
      </h1>
      <p className="mt-4 max-w-xl text-ink-soft">
        {lateText}, and {plural(soon, "task")} {soon === 1 ? "is" : "are"} due in the next two days.
      </p>
      </div>
       <NewProjectButton />
    </header>
  );
}