import { cn } from "@/lib/utils";
import Link from "next/link";
import type React from "react";
import { ExternalLinkIcon } from "../../../../apps/web/registry/components/icons";
import { badgeVariants } from "./badge";

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
        badgeVariants({ variant: "outline" }),
        "gap-1 px-2 font-medium no-underline",
      )}
    >
      {label}
      <ExternalLinkIcon className="ml-0.5" />
    </Link>
  );
}
