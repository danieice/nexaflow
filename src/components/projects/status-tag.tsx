import clsx from "clsx";
import type { ProjectStatus } from "@/lib/types";

const tone: Record<ProjectStatus, string> = {
  Pending: "border-line text-ink-soft",
  "In Progress": "border-ink text-ink",
  Completed: "border-transparent bg-ink text-card",
};

export function StatusTag({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={clsx(
        "shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]",
        tone[status]
      )}
    >
      {status}
    </span>
  );
}