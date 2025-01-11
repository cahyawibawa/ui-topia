import { cn } from "@/lib/utils";
import { badgeVariants } from "@/uitopia/badge";
import { ExternalLinkIcon } from "@/uitopia/icons";
import Link from "next/link";
import type React from "react";

interface LinkItem {
  link: string;
  label: string;
}

export function References({ children }: React.PropsWithChildren) {
  return <div className="mb-4 flex items-center space-x-2">{children}</div>;
}

export function Reference({ label, link }: LinkItem) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noreferrer"
      className={cn(
        badgeVariants({ variant: "secondary" }),
        "gap-1 px-2 font-medium no-underline",
      )}
    >
      {label}
      <ExternalLinkIcon className="ml-0.5" />
    </Link>
  );
}
