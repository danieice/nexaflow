import type { ReactNode } from "react";

type Props = {
  title: string;
  message: string;
  children?: ReactNode;
};

export function EmptyState({ title, message, children }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-line px-6 py-12 text-center">
      <p className="font-display text-2xl">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">{message}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}