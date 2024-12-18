"use client";

import CopyButton from "@/components/copy-btn";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/topia/collapsible";
import { Icons } from "@ui/topia/icons";
import { ChevronDown } from "lucide-react";
import React, { cloneElement, useEffect, useState } from "react";

import type { ComponentPreviewProps } from "types/component";

export function ComponentCollapse({
  name,
  code,
  highlightedCode,
  hasReTrigger = false,
  classNameComponentContainer,
}: ComponentPreviewProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
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
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="not-prose relative w-full rounded-md border"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex min-h-[100px] flex-1 items-center justify-center px-4">
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center text-muted-foreground text-sm">
                <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </div>
            }
          >
            {Component && (
              <div
                className={cn(
                  "flex w-full items-center justify-center",
                  classNameComponentContainer,
                )}
              >
                {hasReTrigger ? (
                  <>
                    <div
                      className="absolute top-3 right-4 cursor-pointer"
                      onClick={reTrigger}
                    >
                      <Icons.refresh className="size-4 text-zinc-500" />
                    </div>
                    {cloneElement(<Component />, { key: reTriggerKey })}
                  </>
                ) : (
                  <Component />
                )}
              </div>
            )}
          </React.Suspense>
        </div>
        <CollapsibleTrigger asChild>
          <div className="flex cursor-pointer items-center gap-2 rounded-b-md border-t bg-fd-primary/10 px-4 py-2 text-muted-foreground text-sm hover:text-foreground">
            <ChevronDown
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
          <div className="group/item relative">
            <CopyButton componentSource={code} />
            <div className="max-h-[350px] overflow-auto">
              <div className="[&_pre]:!bg-transparent inline-block w-full overflow-x-auto bg-background p-4">
                <div
                  className="[&_.shiki]:!bg-transparent font-mono text-sm [&_.only-dark]:hidden [&_.only-dark]:dark:block [&_.only-light]:block [&_.only-light]:dark:hidden"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
