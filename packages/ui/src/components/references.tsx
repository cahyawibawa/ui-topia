import type React from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
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
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={cn(
        badgeVariants({ variant: "outline" }),
        "gap-1 px-2 font-medium no-underline",
      )}
    >
      {label}
      <ExternalLink className="ml-0.5" />
    </a>
  );
}
