"use client";

import * as React from "react";
import { CopyButton } from "@/components/copy-button";
import { PackageManagerIcon } from "@/components/package-manager-icon";
import { useConfig } from "@/hooks/use-config";
import { playSound } from "@/lib/sounds";
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
    <div className="not-prose relative overflow-hidden rounded-[17px] border border-muted-foreground/10 bg-code-surface">
      <Tabs
        value={packageManager}
        onValueChange={(value) => {
          playSound("select");
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          });
        }}
        className="gap-0"
      >
        <div className="flex items-center border-border/64 border-b px-2 py-2 font-mono">
          <TabsList
            activateOnFocus
            className="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none"
          >
            {Object.keys(tabs).map((key) => (
              <TabsTab className="gap-1.5 rounded-lg" key={key} value={key}>
                <PackageManagerIcon name={key} />
                {key}
              </TabsTab>
            ))}
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
      <CopyButton className="top-2 right-2" value={tabs[packageManager]} />
    </div>
  );
}
