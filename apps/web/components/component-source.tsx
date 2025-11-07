"use client";

import * as React from "react";
import { CodeBlock } from "@/components/code-block";
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper";
import type { RegistryItem } from "@/lib/registry";
import { convertRegistryPaths, getComponentsByName } from "@/lib/registry";
import { cn } from "@/lib/utils";
import type { ComponentSourceProps } from "@/types/component";

const componentCodeCache = new Map<string, string>();

export function ComponentSource({
  name,
  title,
  collapsible = true,
  className,
  ...props
}: ComponentSourceProps & {
  title?: string;
  collapsible?: boolean;
}) {
  const [_component, setComponent] = React.useState<RegistryItem | null>(null);
  const [code, setCode] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    const registryComponent = getComponentsByName(name);
    setComponent(registryComponent);

    const cachedCode = componentCodeCache.get(name);
    if (cachedCode) {
      setCode(cachedCode);
      setError(null);
      setIsFetching(false);
      return;
    }

    setIsFetching(true);
    let isCurrent = true;

    async function loadComponentCode() {
      try {
        const response = await fetch(`/r/${name}.json`);
        const data = (await response.json()) as RegistryItem;
        const codeContent = data.files?.[0]?.content;

        if (!codeContent) {
          throw new Error("No code content found");
        }

        const converted = convertRegistryPaths(codeContent);
        componentCodeCache.set(name, converted);
        if (!isCurrent) return;
        setCode(converted);
        setError(null);
      } catch (err) {
        console.error("Error loading component:", err);
        if (!isCurrent) return;
        setCode(null);
        setError("Failed to load component code");
      } finally {
        if (isCurrent) {
          setIsFetching(false);
        }
      }
    }

    loadComponentCode();
    return () => {
      isCurrent = false;
    };
  }, [name]);

  const codeBlock = (() => {
    if (error) {
      return <div className="p-4 text-destructive text-sm">{error}</div>;
    }

    if (code) {
      return (
        <div className="relative rounded-xl bg-code-surface">
          <CodeBlock
            borderless
            code={code}
            language="tsx"
            title={title}
            showLineNumbers={true}
          />
          {isFetching && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-background/60 text-xs font-medium text-muted-foreground">
              Updating snippet…
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="p-4 text-muted-foreground text-sm">Loading code...</div>
    );
  })();

  if (!collapsible) {
    return <div className={cn("relative", className)}>{codeBlock}</div>;
  }

  return (
    <CodeCollapsibleWrapper className={className} {...props}>
      {codeBlock}
    </CodeCollapsibleWrapper>
  );
}
