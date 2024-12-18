"use client";

import { cn } from "@/lib/utils";
import { Button } from "@ui/topia/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/topia/collapsible";
import * as React from "react";
import CopyButton from "./copy-btn";

interface ComponentBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  name: string;
  highlightedCode: string;
  expandButtonTitle?: string;
  defaultExpanded?: boolean;
  maxHeight?: string;
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
  const [Component, setComponent] = React.useState<React.ComponentType | null>(
    null,
  );

  React.useEffect(() => {
    import("@ui/topia").then((module) => {
      const component = module.registry[name]?.component;
      if (component) {
        setComponent(() => component);
      }
    });
  }, [name]);

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
        <CopyButton componentSource={code} />

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
            }} // Added overflow: 'auto'
          >
            <div className="[&_pre]:!bg-transparent inline-block w-full overflow-x-auto bg-background p-4">
              <div
                className="[&_.shiki]:!bg-transparent font-mono text-sm [&_.only-dark]:hidden [&_.only-dark]:dark:block [&_.only-light]:block [&_.only-light]:dark:hidden"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </div>
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
