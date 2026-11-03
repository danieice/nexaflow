"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { isActive, navItems } from "./nav-items";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="fixed inset-x-3 bottom-3 z-30 lg:hidden">
      <ul className="flex rounded-full border border-line/80 bg-card/70 p-1.5 shadow-[0_8px_30px_-12px_rgba(29,27,24,0.3)] backdrop-blur-xl">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "flex flex-col items-center gap-0.5 rounded-full py-2 text-[11px] transition-colors",
                  active ? "bg-ink text-card" : "text-ink-soft"
                )}
              >
                <Icon className="size-[18px]" aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}