"use client";

import { CodeRenderer } from "@/components/code-renderer";
import { cn } from "@/lib/utils";
import { Button } from "@/uitopia/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/uitopia/collapsible";
import * as React from "react";
import type { ComponentPreviewProps } from "types/component";

interface ComponentBaseProps extends ComponentPreviewProps {
  expandButtonTitle?: string;
  defaultExpanded?: boolean;
  maxHeight?: string;
  className?: string;
}

export function ComponentBase({
  code,
  name,
  highlightedCode,
  expandButtonTitle = "Expand",
  defaultExpanded = false,
  maxHeight = "550px",
  className,
  ...props
}: ComponentBaseProps) {
  const [isOpened, setIsOpened] = React.useState(defaultExpanded);

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      className="not-prose"
    >
      <div
        className={cn(
          "group/item relative my-4 overflow-hidden rounded-lg border bg-card text-card-foreground",
          className,
        )}
        {...props}
      >
        <CollapsibleContent
          forceMount
          className={cn("overflow-hidden", !isOpened && "max-h-32")}
        >
          <div
            className={cn(
              "[&_pre]:my-0 [&_pre]:pb-[100px]",
              !isOpened ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto",
            )}
            style={{
              maxHeight: isOpened ? maxHeight : "none",
              overflow: "auto",
            }}
          >
            <CodeRenderer code={code} highlightedCode={highlightedCode} />
          </div>
        </CollapsibleContent>

        <div
          className={cn(
            "absolute flex items-center justify-center bg-gradient-to-b from-background/30 to-background/90 p-2",
            isOpened ? "inset-x-0 bottom-0 h-12" : "inset-0",
          )}
        >
          <CollapsibleTrigger asChild>
            <Button variant="secondary" size="sm" className="h-8 text-xs">
              {isOpened ? "Collapse" : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}
