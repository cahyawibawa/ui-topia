"use client";

import { CodeBlock } from "@/components/code-block";
import { ComponentLoader } from "@/components/content/component-loader";
import { convertRegistryPaths, getComponentsByName } from "@/lib/registry";
import type { ComponentPreviewProps } from "@/types/component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/uitopia/tabs";
import { useEffect, useState } from "react";
import type { RegistryItem } from "shadcn/registry";

export function ComponentPreview({
  name,
  hasReTrigger = false,
  classNameComponentContainer,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState("preview");
  const [component, setComponent] = useState<RegistryItem | null>(null);
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
    <div className="not-prose relative z-0 flex items-center justify-between pb-4">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="relative mr-auto w-full"
      >
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="preview"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div className="preview flex min-h-[450px] w-full justify-center rounded-md border p-4">
            <ComponentLoader
              name={name}
              hasReTrigger={hasReTrigger}
              classNameComponentContainer={classNameComponentContainer}
            />
          </div>
        </TabsContent>
        <TabsContent value="code">
          {error ? (
            <div className="p-4 text-destructive text-sm">{error}</div>
          ) : code ? (
            <CodeBlock code={code} language="tsx" />
          ) : (
            <div className="p-4 text-muted-foreground text-sm">
              Loading code...
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
