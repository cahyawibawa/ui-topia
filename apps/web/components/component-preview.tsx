"use client";

import * as React from "react";
import { CodeBlock } from "@/components/code-block";
import { ComponentLoader } from "@/components/component-loader";
import type { RegistryItem } from "@/lib/registry";
import { convertRegistryPaths, getComponentsByName } from "@/lib/registry";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTab } from "@/registry/ui/tabs";
import type { ComponentPreviewProps } from "@/types/component";

export function ComponentPreview({
  name,
  align = "center",
  hasReTrigger = false,
  classNameComponentContainer,
  className,
  showV0Button = true,
}: ComponentPreviewProps & {
  align?: "center" | "start" | "end";
  className?: string;
  showV0Button?: boolean;
}) {
  const [tab, setTab] = React.useState("preview");
  const [_component, setComponent] = React.useState<RegistryItem | null>(null);
  const [code, setCode] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
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
    <div className={cn("group not-prose relative flex flex-col", className)}>
      <Tabs value={tab} onValueChange={setTab}>
        <div className="mb-2 flex items-center justify-between">
          <TabsList className="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none">
            <TabsTab value="preview" className="rounded-lg">
              Preview
            </TabsTab>
            <TabsTab value="code" className="rounded-lg">
              Code
            </TabsTab>
          </TabsList>
        </div>
      </Tabs>

      <div data-tab={tab} className="relative rounded-xl border">
        <div
          data-slot="preview"
          data-active={tab === "preview"}
          className="relative data-[active=false]:hidden"
        >
          <div
            data-align={align}
            className={cn(
              "preview flex h-[350px] w-full justify-center overflow-y-auto p-4 data-[align=start]:items-start data-[align=end]:items-end data-[align=center]:items-center max-sm:px-4",
              classNameComponentContainer,
            )}
          >
            <ComponentLoader
              classNameComponentContainer={classNameComponentContainer}
              hasReTrigger={hasReTrigger}
              name={name}
              showV0Button={showV0Button}
            />
          </div>
        </div>

        <div
          data-slot="code"
          data-active={tab === "code"}
          className="h-[350px] data-[active=false]:hidden [&_figure]:m-0 [&_pre]:h-[350px] [&_pre]:rounded-xl [&_pre]:border-0"
        >
          {error ? (
            <div className="p-4 text-destructive text-sm">{error}</div>
          ) : code ? (
            <CodeBlock
              code={code}
              language="tsx"
              copyButton={true}
              showLineNumbers={true}
            />
          ) : (
            <div className="p-4 text-muted-foreground text-sm">
              Loading code...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
