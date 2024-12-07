"use client";

import { Icons } from "@ui/topia/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/topia/tabs";
import { useEffect, useState } from "react";
import React from "react";
import CodePreview from "./code-preview";
import ComponentPreview from "./component-preview";

type ComponentCodePreviewProps = {
  name: string;
  code: string;
  highlightedCode: string;
  hasReTrigger?: boolean;
  classNameComponentContainer?: string;
};

export default function ComponentCodePreview({
  name,
  code,
  highlightedCode,
  hasReTrigger,
  classNameComponentContainer,
}: ComponentCodePreviewProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [activeTab, setActiveTab] = useState("preview");

  useEffect(() => {
    import("@ui/topia").then((module) => {
      const component = module.registry[name]?.component;
      if (component) {
        setComponent(() => component);
      }
    });
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
          <div className="preview flex min-h-[450px] w-full justify-center p-4">
            <React.Suspense
              fallback={
                <div className="flex w-full items-center justify-center text-muted-foreground text-sm">
                  <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {Component && (
                <ComponentPreview
                  component={<Component />}
                  hasReTrigger={hasReTrigger}
                  className={classNameComponentContainer}
                />
              )}
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <CodePreview code={code} highlightedCode={highlightedCode} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
