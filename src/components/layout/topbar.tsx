"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Bell } from "lucide-react";
import { currentUser } from "@/data/seed";
import { daysUntil, dueLabel } from "@/lib/dates";
import { initials } from "@/lib/format";
import { isOverdue } from "@/lib/selectors";
import { useWorkspace } from "@/store/workspace";
import { Logo } from "./logo";
import { isActive, navItems } from "./nav-items";

export function Topbar() {
  const pathname = usePathname();
  const { tasks, projects, resetDemo } = useWorkspace();
  const alertsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const section = navItems.find((item) => isActive(pathname, item.href))?.label ?? "Overview";

  const alerts = tasks
    .filter((task) => isOverdue(task) || (task.status !== "Done" && daysUntil(task.deadline) === 0))
    .sort((a, b) => a.deadline.localeCompare(b.deadline));

  const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? "";

  return (
    <header className="sticky top-3 z-30 px-3 sm:px-6">
      <div className="flex items-center justify-between gap-4 rounded-full border border-line/80 bg-card/60 py-2 pl-5 pr-2 shadow-[0_8px_30px_-12px_rgba(29,27,24,0.25)] backdrop-blur-xl">
        <div className="lg:hidden">
          <Logo />
        </div>
        <p className="hidden font-mono text-xs uppercase tracking-[0.18em] text-ink-soft lg:block">
          {section}
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            popoverTarget="alerts"
            aria-label={
              alerts.length > 0 ? `Notifications, ${alerts.length} need attention` : "Notifications"
            }
            className="relative grid size-10 place-items-center rounded-full transition-colors hover:bg-paper"
          >
            <Bell className="size-[18px]" aria-hidden />
            {alerts.length > 0 ? (
              <span className="absolute right-1 top-1 grid min-w-4 place-items-center rounded-full bg-accent px-1 font-mono text-[10px] leading-4 text-card">
                {alerts.length}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            popoverTarget="profile"
            aria-label="Open profile menu"
            className="grid size-10 place-items-center rounded-full bg-ink font-mono text-xs text-card"
          >
            {initials(currentUser.name)}
          </button>
        </div>
      </div>

      <div
        id="alerts"
        popover="auto"
        ref={alertsRef}
        className="menu-popover w-80 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-line bg-card p-3 text-ink shadow-xl"
      >
        <h2 className="px-3 pb-2 pt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
          Needs attention
        </h2>
        {alerts.length === 0 ? (
          <p className="px-3 pb-2 text-sm text-ink-soft">Nothing late or due today.</p>
        ) : (
          <ul>
            {alerts.map((task) => (
              <li key={task.id}>
                <Link
                  href="/tasks"
                  onClick={() => alertsRef.current?.hidePopover()}
                  className="block rounded-lg px-3 py-2 transition-colors hover:bg-paper"
                >
                  <span className="block text-sm">{task.title}</span>
                  <span className="font-mono text-[11px] text-ink-soft">
                    {projectName(task.projectId)} ·{" "}
                    <span className={isOverdue(task) ? "text-accent" : undefined}>
                      {dueLabel(task.deadline)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        id="profile"
        popover="auto"
        ref={profileRef}
        className="menu-popover w-64 rounded-2xl border border-line bg-card p-4 text-ink shadow-xl"
      >
        <p className="font-display text-2xl leading-tight">{currentUser.name}</p>
        <p className="text-sm text-ink-soft">{currentUser.role}</p>
        <hr className="my-3 border-line" />
        <button
          type="button"
          onClick={() => {
            resetDemo();
            profileRef.current?.hidePopover();
          }}
          className="w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-paper"
        >
          Reset demo data
        </button>
      </div>
    </header>
  );
}