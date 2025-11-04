"use client";

import { useEffect, useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { ComponentLoader } from "@/components/component-loader";
import type { RegistryItem } from "@/lib/registry";
import { convertRegistryPaths, getComponentsByName } from "@/lib/registry";
import { cn } from "@/lib/utils";
import { Icons } from "@/registry/components/icons";
import type { ComponentPreviewProps } from "@/types/component";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/uitopia/collapsible";

export function ComponentCollapse({
  name,
  hasReTrigger = false,
  classNameComponentContainer,
}: ComponentPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
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
      className="not-prose relative w-full rounded-lg border"
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <div className="flex flex-col">
        <div className="flex min-h-[100px] flex-1 items-center justify-center">
          <ComponentLoader
            classNameComponentContainer={classNameComponentContainer}
            hasReTrigger={hasReTrigger}
            name={name}
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
    </Collapsible>
  );
}
