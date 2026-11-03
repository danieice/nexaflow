"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Logo } from "./logo";
import { isActive, navItems } from "./nav-items";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-line bg-paper px-5 py-7 lg:flex">
      <Logo />

      <nav aria-label="Main" className="mt-10">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
          Workspace
        </p>
        <ul className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active ? "bg-ink text-card" : "text-ink-soft hover:bg-card hover:text-ink"
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="mt-auto font-mono text-[11px] leading-relaxed text-ink-soft">
        Demo data is saved in your browser.
      </p>
    </aside>
  );
}