"use client";

import CopyButton from "@/components/copy-btn";
import { cn } from "@/lib/utils";
import { Button } from "@/uitopia/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/uitopia/collapsible";
import { Icons } from "@/uitopia/icons";
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
    import("@ui/topia/registry").then((module) => {
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 cursor-pointer text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                      onClick={reTrigger}
                      aria-label="Refresh component"
                    >
                      <svg
                        width="16"
                        height="16"
                        className="size-4"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.8 5.1541V2.5a.7.7 0 0 1 1.4 0v5a.7.7 0 0 1-.7.7h-5a.7.7 0 0 1 0-1.4h3.573c-.7005-1.8367-2.4886-3.1-4.5308-3.1C4.8665 3.7 2.7 5.85 2.7 8.5s2.1665 4.8 4.8422 4.8c1.3035 0 2.523-.512 3.426-1.4079a.7.7 0 0 1 .986.9938C10.7915 14.0396 9.2186 14.7 7.5422 14.7 4.0957 14.7 1.3 11.9257 1.3 8.5s2.7957-6.2 6.2422-6.2c2.1801 0 4.137 1.1192 5.2578 2.8541z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </Button>
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
