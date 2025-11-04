"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/ui/collapsible";
import { Separator } from "@/registry/ui/separator";
import { Button } from "@/uitopia/button";

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      className={cn("group/collapsible md:-mx-1 relative", className)}
      {...props}
    >
      <CollapsiblePanel
        className="[&>figure]:!m-0 [&>figure]:!mt-0 [&>figure]:md:!mx-0 relative h-full overflow-hidden data-closed:max-h-64"
        keepMounted
        hidden={false}
      >
        {children}
      </CollapsiblePanel>
      {/* Bottom gradient trigger - shows when collapsed */}
      <CollapsibleTrigger className="-bottom-2 absolute inset-x-0 flex h-20 cursor-pointer items-center justify-center rounded-b-lg bg-gradient-to-b from-transparent via-50% via-background to-background font-medium text-muted-foreground text-sm transition-colors hover:text-foreground group-data-open/collapsible:hidden">
        Expand
      </CollapsibleTrigger>
      {/* Collapse button - shows when expanded */}
      <CollapsibleTrigger
        render={
          <Button
            variant="ghost"
            className="absolute right-2 bottom-2 z-20 hidden h-8 text-muted-foreground opacity-70 hover:opacity-100 focus-visible:opacity-100 group-data-open/collapsible:flex"
          >
            Collapse
          </Button>
        }
      />
    </Collapsible>
  );
}
