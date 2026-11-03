import Link from "next/link";
import clsx from "clsx";

type Props = {
  label: string;
  value: number;
  note: string;
  href: string;
  alert?: boolean;
};

export function StatCard({ label, value, note, href, alert = false }: Props) {
  return (
    <Link
      href={href}
      className="block h-full rounded-2xl border border-line bg-card p-5 transition-transform duration-200 hover:-translate-y-0.5"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">{label}</p>
      <p className={clsx("mt-6 font-display text-6xl leading-none", alert && value > 0 && "text-accent")}>
        {value}
      </p>
      <p className="mt-2 text-sm text-ink-soft">{note}</p>
    </Link>
  );
}