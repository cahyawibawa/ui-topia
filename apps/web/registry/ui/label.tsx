import type * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: the association is the caller's (htmlFor or a nested control)
    <label
      data-slot="label"
      className={cn("inline-flex items-center gap-2 text-sm/4", className)}
      {...props}
    />
  );
}

export { Label };
