"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui-topia/tabs";
import React, { useState } from "react";
import type { ComponentPreviewProps } from "types/component";
import { CodeRenderer } from "../code-renderer";
import { ComponentLoader } from "./component-loader";

export function ComponentPreview({
  name,
  code,
  highlightedCode,
  hasReTrigger = false,
  classNameComponentContainer,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState("preview");

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
            <ComponentLoader
              name={name}
              hasReTrigger={hasReTrigger}
              className={classNameComponentContainer}
            />
          </div>
        </TabsContent>
        <TabsContent value="code">
          <CodeRenderer code={code} highlightedCode={highlightedCode} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
