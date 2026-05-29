import Link from "next/link";
import type { ReactNode } from "react";

export function DocLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center gap-0.5 text-primary hover:underline underline-offset-2"
    >
      <code className="bg-primary/10 px-1.5 py-0.5 rounded text-sm font-mono text-primary">
        {children}
      </code>
    </Link>
  );
}
