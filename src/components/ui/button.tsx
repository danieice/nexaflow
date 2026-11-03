import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", type = "button", className, ...props }: Props) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50",
        variant === "primary" ? "bg-ink text-card hover:bg-ink/85" : "border border-line text-ink hover:bg-paper",
        className
      )}
      {...props}
    />
  );
}