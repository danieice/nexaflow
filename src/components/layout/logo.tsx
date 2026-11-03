import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="font-display text-2xl leading-none tracking-tight">
      Nexa<em className="text-accent">flow</em>
    </Link>
  );
}