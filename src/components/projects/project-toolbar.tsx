"use client";

import clsx from "clsx";
import { Search, X } from "lucide-react";
import type { ProjectQuery, ProjectSort, StatusFilter } from "@/lib/selectors";
import { PROJECT_STATUSES } from "@/lib/types";
import { inputClass } from "@/components/ui/field";

const statusOptions: StatusFilter[] = ["All", ...PROJECT_STATUSES];

const sortOptions: { value: ProjectSort; label: string }[] = [
  { value: "deadline", label: "Deadline, soonest" },
  { value: "newest", label: "Newest first" },
  { value: "progress", label: "Most progress" },
];

type Props = {
  query: ProjectQuery;
  onChange: (query: ProjectQuery) => void;
};

export function ProjectToolbar({ query, onChange }: Props) {
  const update = (patch: Partial<ProjectQuery>) =>
    onChange({ ...query, ...patch });
  const isFiltered = query.search.trim() !== "" || query.status !== "All";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-4 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <label htmlFor="project-search" className="sr-only">
          Search projects
        </label>
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-soft"
        />
        <input
          id="project-search"
          type="search"
          value={query.search}
          onChange={(event) => update({ search: event.target.value })}
          placeholder="Search by name, description or lead"
          className={clsx(inputClass, "pl-10")}
        />
      </div>

      <fieldset className="flex flex-wrap gap-1.5">
        <legend className="sr-only">Filter by status</legend>
        {statusOptions.map((option) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              name="status-filter"
              value={option}
              checked={query.status === option}
              onChange={() => update({ status: option })}
              className="peer sr-only"
            />
            <span className="block rounded-full border border-line px-3 py-1.5 text-xs transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-card peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
              {option}
            </span>
          </label>
        ))}
      </fieldset>

      {isFiltered ? (
        <button
          type="button"
          onClick={() => update({ search: "", status: "All" })}
          className="inline-flex items-center gap-1 self-start text-xs text-ink-soft underline-offset-4 hover:text-ink hover:underline lg:self-center"
        >
          <X className="size-3.5" aria-hidden />
          Clear
        </button>
      ) : null}

      <div className="flex items-center gap-2">
        <label
          htmlFor="project-sort"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft"
        >
          Sort
        </label>
        <select
          id="project-sort"
          value={query.sort}
          onChange={(event) => {
            const picked = sortOptions.find(
              (option) => option.value === event.target.value,
            );
            if (picked) update({ sort: picked.value });
          }}
          className={clsx(inputClass, "w-auto py-2")}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
