"use client";

import { useEffect, useState } from "react";
import type { RegistryItem } from "shadcn/registry";
import { CodeBlock } from "@/components/code-block";
import { convertRegistryPaths, getComponentsByName } from "@/lib/registry";
import { cn } from "@/lib/utils";
import type { ComponentSourceProps } from "@/types/component";
import { Button } from "@/uitopia/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/uitopia/collapsible";

export function ComponentSource({
  name,
  expandButtonTitle = "Expand",
  defaultExpanded = false,
  maxHeight = "550px",
  className,
  ...props
}: ComponentSourceProps) {
  const [isOpened, setIsOpened] = useState(defaultExpanded);
  const [_component, setComponent] = useState<RegistryItem | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const registryComponent = getComponentsByName(name);
    setComponent(registryComponent);

    async function loadComponentCode() {
      try {
        const response = await fetch(`/r/${name}.json`);
        const data = (await response.json()) as RegistryItem;
        const codeContent = data.files?.[0]?.content;

        if (!codeContent) {
          throw new Error("No code content found");
        }

        setCode(convertRegistryPaths(codeContent));
        setError(null);
      } catch (err) {
        console.error("Error loading component:", err);
        setCode(null);
        setError("Failed to load component code");
      }
    }

    loadComponentCode();
  }, [name]);

  return (
    <Collapsible
      className="not-prose"
      onOpenChange={setIsOpened}
      open={isOpened}
    >
      <div
        className={cn(
          "group/item relative my-4 overflow-hidden rounded-lg border bg-card text-card-foreground",
          className,
        )}
        {...props}
      >
        <CollapsibleContent
          className={cn("overflow-hidden", !isOpened && "max-h-32")}
          forceMount
        >
          <div
            className={cn(
              "no-scrollbar [&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]",
              isOpened ? "[&_pre]:overflow-auto]" : "[&_pre]:overflow-hidden",
            )}
            style={{
              maxHeight: isOpened ? maxHeight : "none",
              overflow: "auto",
            }}
          >
            {error ? (
              <div className="p-4 text-destructive text-sm">{error}</div>
            ) : code ? (
              <CodeBlock code={code} language="tsx" />
            ) : (
              <div className="p-4 text-muted-foreground text-sm">
                Loading code...
              </div>
            )}
          </div>
        </CollapsibleContent>

        <div
          className={cn(
            "absolute flex items-center justify-center bg-gradient-to-b from-background/30 to-background/90 p-2",
            isOpened ? "inset-x-0 bottom-0 h-12" : "inset-0",
          )}
        >
          <CollapsibleTrigger asChild>
            <Button className="h-8 text-xs" size="sm" variant="secondary">
              {isOpened ? "Collapse" : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}
