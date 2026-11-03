import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  action?: { href: string; label: string };
  className?: string;
  children: ReactNode;
};

export function Section({ id, title, action, className, children }: Props) {
  return (
    <section aria-labelledby={id} className={className}>
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 id={id} className="font-display text-3xl leading-none">
          {title}
        </h2>
        {action ? (
          <Link
            href={action.href}
            className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft underline-offset-4 hover:text-ink hover:underline"
          >
            {action.label}
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}