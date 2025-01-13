"use client";

import { CodeRenderer } from "@/components/code-renderer";
import { ComponentLoader } from "@/components/component-loader";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/uitopia/collapsible";
import { Icons } from "@/uitopia/icons";
import React, { useState } from "react";
import type { ComponentPreviewProps } from "types/component";

export function ComponentCollapse({
  name,
  code,
  highlightedCode,
  hasReTrigger = false,
  classNameComponentContainer,
}: ComponentPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="not-prose relative w-full rounded-md border"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex min-h-[100px] flex-1 items-center justify-center px-4">
          <ComponentLoader
            name={name}
            hasReTrigger={hasReTrigger}
            classNameComponentContainer={classNameComponentContainer}
          />
        </div>
        <CollapsibleTrigger asChild>
          <div className="flex cursor-pointer items-center gap-2 rounded-b-md border-t bg-secondary px-4 py-2 text-muted-foreground text-sm hover:text-foreground">
            <Icons.chevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
            {isOpen ? "Hide" : "Show"} code
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="border-t">
          <CodeRenderer code={code} highlightedCode={highlightedCode} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
