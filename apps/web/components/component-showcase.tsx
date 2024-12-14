"use client";

import { cn } from "@/lib/utils";
import { Icons } from "@ui/topia/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/topia/tabs";
import { cloneElement, useEffect, useState } from "react";
import React from "react";

import CopyButton from "./copy-btn";

type ComponentShowcaseProps = {
  name: string;
  code: string;
  highlightedCode: string;
  hasReTrigger?: boolean;
  classNameComponentContainer?: string;
};

export default function ComponentShowcase({
  name,
  code,
  highlightedCode,
  hasReTrigger = false,
  classNameComponentContainer,
}: ComponentShowcaseProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [activeTab, setActiveTab] = useState("preview");
  const [reTriggerKey, setReTriggerKey] = useState<number>(Date.now());

  useEffect(() => {
    import("@ui/topia").then((module) => {
      const component = module.registry[name]?.component;
      if (component) {
        setComponent(() => component);
      }
    });
  }, [name]);

  const reTrigger = () => {
    setReTriggerKey(Date.now());
  };

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
                  reTriggerKey={reTriggerKey}
                  reTrigger={reTrigger}
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

type ComponentPreviewProps = {
  component: React.ReactElement;
  hasReTrigger: boolean;
  className?: string;
  reTriggerKey: number;
  reTrigger: () => void;
};

function ComponentPreview({
  component,
  hasReTrigger,
  className,
  reTriggerKey,
  reTrigger,
}: ComponentPreviewProps) {
  return (
    <div
      className={cn(
        "flex min-h-[350px] w-full items-center justify-center rounded-md",
        className,
      )}
    >
      {hasReTrigger && (
        <div
          className="absolute top-3 right-4 cursor-pointer"
          onClick={reTrigger}
        >
          <Icons.refresh className="size-4 text-zinc-500" />
        </div>
      )}
      {hasReTrigger
        ? cloneElement(component, { key: reTriggerKey })
        : component}
    </div>
  );
}

type CodePreviewProps = {
  code: string;
  highlightedCode: string;
};

function CodePreview({ code, highlightedCode }: CodePreviewProps) {
  return (
    <div className="group/item relative">
      <CopyButton componentSource={code} />
      <div className="no-scrollbar max-h-[550px] overflow-auto rounded-md">
        <div className="[&_pre]:!bg-transparent inline-block overflow-x-auto bg-background p-4">
          <div
            className="[&_.shiki]:!bg-transparent font-mono text-sm [&_.only-dark]:hidden [&_.only-dark]:dark:block [&_.only-light]:block [&_.only-light]:dark:hidden"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
      </div>
    </div>
  );
}
