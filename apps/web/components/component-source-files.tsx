"use client";

import * as React from "react";
import { CopyButton } from "@/components/copy-button";
import { playSound } from "@/lib/sounds";
import { getIconForLanguageExtension } from "@/registry/components/icons";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/ui/tabs";

export type SourceFile = {
  /** Tab label, e.g. `sheet.tsx`. */
  name: string;
  /** Full install path shown above a single file. */
  title: string;
  language: string;
  raw: string;
  /** Pre-highlighted on the server. */
  html: string;
};

export function ComponentSourceFiles({ files }: { files: SourceFile[] }) {
  const [active, setActive] = React.useState(files[0]?.name ?? "");
  const tabsRef = React.useRef<HTMLDivElement>(null);

  // With many files the row scrolls; keep the selected tab in view, including
  // when it was reached with the arrow keys.
  React.useEffect(() => {
    tabsRef.current
      ?.querySelector('[role="tab"][aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  if (files.length === 0) return null;

  // One file: same look as a code block, no tab row.
  if (files.length === 1) {
    const [file] = files as [SourceFile];
    return (
      <div className="relative rounded-xl border border-muted-foreground/10 bg-code-surface">
        <figure
          className="!m-0 !mt-0 !border-0 relative"
          data-rehype-pretty-code-figure=""
        >
          <figcaption
            className="flex items-center gap-2 text-code-foreground [&_svg]:size-5 [&_svg]:text-code-foreground [&_svg]:opacity-70 sm:[&_svg]:size-4"
            data-language={file.language}
            data-rehype-pretty-code-title=""
          >
            {getIconForLanguageExtension(file.language)}
            {file.title}
          </figcaption>
          <CopyButton value={file.raw} />
          <div
            className="[&_pre]:!bg-transparent [&_[data-line]]:before:!bg-code-surface"
            dangerouslySetInnerHTML={{ __html: file.html }}
          />
        </figure>
      </div>
    );
  }

  const current = files.find((file) => file.name === active) ?? files[0];

  return (
    <div className="not-prose relative overflow-hidden rounded-[17px] border border-muted-foreground/10 bg-code-surface">
      <Tabs
        className="gap-0"
        onValueChange={(value) => {
          playSound("select");
          setActive(value as string);
        }}
        value={active}
      >
        {/* The copy button owns the right edge, so the tabs scroll inside the
            space left of it instead of running underneath. */}
        <div className="border-border/64 border-b py-2 pr-12 pl-2 font-mono">
          <div className="no-scrollbar overflow-x-auto" ref={tabsRef}>
            <TabsList
              activateOnFocus
              className="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none"
            >
              {files.map((file) => (
                <TabsTab
                  className="gap-1.5 rounded-lg"
                  key={file.name}
                  value={file.name}
                >
                  <span className="text-code-foreground [&_svg]:size-3.5 [&_svg]:opacity-70">
                    {getIconForLanguageExtension(file.language)}
                  </span>
                  {file.name}
                </TabsTab>
              ))}
            </TabsList>
          </div>
        </div>
        {files.map((file) => (
          <TabsPanel
            className="mt-0 bg-code-surface"
            key={file.name}
            value={file.name}
          >
            <div
              className="[&_pre]:!bg-transparent [&_[data-line]]:before:!bg-code-surface"
              dangerouslySetInnerHTML={{ __html: file.html }}
            />
          </TabsPanel>
        ))}
      </Tabs>
      <CopyButton className="top-2 right-2" value={current?.raw ?? ""} />
    </div>
  );
}
