import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { isTaskStatus, TASK_STATUSES, type TaskStatus } from "@/lib/types";

const tone: Record<TaskStatus, string> = {
  "To Do": "bg-paper",
  "In Progress": "bg-[#f6e6bf]",
  Done: "bg-[#dfe8d6]",
};

type Props = {
  value: TaskStatus;
  label: string;
  onChange: (status: TaskStatus) => void;
};

export function StatusSelect({ value, label, onChange }: Props) {
  return (
    <div className="relative shrink-0">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => {
          if (isTaskStatus(event.target.value)) onChange(event.target.value);
        }}
        className={clsx(
          "cursor-pointer appearance-none rounded-full border border-line py-1.5 pl-3 pr-8 text-xs font-medium text-ink",
          tone[value],
        )}
      >
        {TASK_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-soft"
      />
    </div>
  );
}