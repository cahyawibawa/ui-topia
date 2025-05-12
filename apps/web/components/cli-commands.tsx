"use client";

import CopyButton from "@/components/copy-button";
import { useConfig } from "@/hooks/use-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/uitopia/tabs";

export default function CliCommands({ name }: { name: string }) {
  const [config, setConfig] = useConfig();
  const packageManager = config.packageManager || "pnpm";

  const commands = {
    pnpm: `pnpm dlx shadcn@latest add https://uitopia.vercel.app/r/${name}.json`,
    npm: `npx shadcn@latest add https://uitopia.vercel.app/r/${name}.json`,
    yarn: `npx shadcn@latest add https://uitopia.vercel.app/r/${name}.json`,
    bun: `bunx --bun shadcn@latest add https://uitopia.vercel.app/r/${name}.json`,
  };

  return (
    <div className="relative my-3 max-h-[650px] overflow-x-auto rounded-xl">
      <Tabs
        value={packageManager}
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          });
        }}
        className="rounded-lg bg-zinc-950 dark:bg-zinc-900"
      >
        <div className="flex items-center justify-between border-zinc-800 border-b px-3 pt-2.5">
          <TabsList className="h-7 translate-y-[2px] gap-3 bg-transparent p-0 pl-1">
            <TabsTrigger
              className="rounded-none border-transparent border-b bg-transparent p-0 pb-1.5 font-mono text-zinc-400 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50"
              value="pnpm"
            >
              pnpm
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none border-transparent border-b bg-transparent p-0 pb-1.5 font-mono text-zinc-400 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50"
              value="npm"
            >
              npm
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none border-transparent border-b bg-transparent p-0 pb-1.5 font-mono text-zinc-400 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50"
              value="yarn"
            >
              yarn
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none border-transparent border-b bg-transparent p-0 pb-1.5 font-mono text-zinc-400 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50"
              value="bun"
            >
              bun
            </TabsTrigger>
          </TabsList>
        </div>
        {Object.entries(commands).map(([pkg, command]) => (
          <TabsContent className="m-0" key={pkg} value={pkg}>
            <pre className="overflow-auto p-4 font-mono text-[12.8px] text-zinc-100">
              {command}
            </pre>
          </TabsContent>
        ))}
      </Tabs>
      <CopyButton
        componentSource={commands[packageManager as keyof typeof commands]}
      />
    </div>
  );
}
