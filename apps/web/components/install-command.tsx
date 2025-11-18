"use client";

import { ComputerTerminal02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { CopyButton } from "@/components/copy-button";
import { useConfig } from "@/hooks/use-config";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/ui/tabs";

export function InstallCommand({ packages }: { packages: string }) {
  const [config, setConfig] = useConfig();

  const packageManager = config.packageManager || "pnpm";
  const tabs = React.useMemo(() => {
    return {
      pnpm: `pnpm add ${packages}`,
      npm: `npm install ${packages}`,
      yarn: `yarn add ${packages}`,
      bun: `bun add ${packages}`,
    };
  }, [packages]);

  return (
    <div className="not-prose relative overflow-hidden rounded-lg border border-muted-foreground/10 bg-code-surface">
      <Tabs
        value={packageManager}
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          });
        }}
        className="gap-0"
      >
        <div className="flex items-center gap-2 border-border/64 border-b bg-muted/50 px-4 py-1 font-mono">
          <HugeiconsIcon
            icon={ComputerTerminal02Icon}
            strokeWidth={2}
            className="size-5 text-code-foreground sm:size-4"
          />
          <TabsList className="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none">
            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTab key={key} value={key} className="rounded-lg">
                  {key}
                </TabsTab>
              );
            })}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto bg-code-surface">
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <TabsPanel
                key={key}
                value={key}
                className="mt-0 bg-code-surface px-4 py-3.5"
              >
                <pre className="m-0 bg-code-surface p-0">
                  <code
                    className="relative bg-code-surface font-mono text-[.8125rem] text-foreground leading-none"
                    data-language="bash"
                  >
                    {value}
                  </code>
                </pre>
              </TabsPanel>
            );
          })}
        </div>
      </Tabs>
      <CopyButton value={tabs[packageManager]} />
    </div>
  );
}
