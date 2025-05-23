"use client";

import { useEffect, useState } from "react";
import type { RegistryItem } from "shadcn/registry";
import { CodeBlock } from "@/components/code-block";
import { ComponentLoader } from "@/components/content/component-loader";
import { convertRegistryPaths, getComponentsByName } from "@/lib/registry";
import { cn } from "@/lib/utils";
import { Badge } from "@/uitopia/badge";
import { CodeViewer } from "./showcase-code-viewer";

interface ShowcaseComponentProps {
  name: string;
  height?: string;
  showV0Button?: boolean;
}

export function ShowcaseComponent({
  name,
  height = "h-[400px] md:h-[540px]",
  showV0Button = true,
}: ShowcaseComponentProps) {
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [component, setComponent] = useState<RegistryItem | null>(null);

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

  if (!component) {
    return null;
  }

  return (
    <div className="relative my-16 flex w-full flex-col items-start gap-12 md:flex-row md:gap-x-40">
      {/* Component Display */}
      <div
        className={cn(
          "relative flex w-full items-center justify-center rounded-lg border border-grid md:flex-1 dark:border-muted",
          height,
        )}
      >
        <div className="absolute top-4 right-4 z-10">
          <CodeViewer component={component}>
            {error ? (
              <div className="p-4 text-destructive text-sm">{error}</div>
            ) : code ? (
              <CodeBlock code={code} language="tsx" />
            ) : (
              <div className="p-4 text-muted-foreground text-sm">
                Loading code...
              </div>
            )}
          </CodeViewer>
        </div>
        <ComponentLoader name={name} showV0Button={showV0Button} />
      </div>

      {/* Component Preview */}
      <div className="flex w-full flex-col gap-4 md:w-[256px] md:gap-9">
        <div className="flex w-full flex-col gap-3 text-left md:text-center">
          <h2 className="font-medium text-sm">{component.title}</h2>
          <p className="text-balance font-light text-foreground text-sm">
            {component.description}
          </p>
        </div>
        <div className="flex w-full flex-row gap-2 sm:justify-start md:items-center md:justify-center">
          {component.categories?.map((category) => (
            <Badge key={category} className="rounded-md" variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
