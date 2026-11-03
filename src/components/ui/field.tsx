import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/70 aria-[invalid=true]:border-accent";

type Props = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export function Field({ id, label, error, children }: Props) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}