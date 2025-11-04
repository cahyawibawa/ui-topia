"use client";

import * as React from "react";
import { CodeBlock } from "@/components/code-block";
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper";
import type { RegistryItem } from "@/lib/registry";
import { convertRegistryPaths, getComponentsByName } from "@/lib/registry";
import { cn } from "@/lib/utils";
import type { ComponentSourceProps } from "@/types/component";

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

  const codeBlock = (
    <>
      {error ? (
        <div className="p-4 text-destructive text-sm">{error}</div>
      ) : code ? (
        <CodeBlock
          code={code}
          language="tsx"
          title={title}
          showLineNumbers={true}
        />
      ) : (
        <div className="p-4 text-muted-foreground text-sm">Loading code...</div>
      )}
    </>
  );

  if (!collapsible) {
    return <div className={cn("relative", className)}>{codeBlock}</div>;
  }

  return (
    <CodeCollapsibleWrapper className={className} {...props}>
      {codeBlock}
    </CodeCollapsibleWrapper>
  );
}
