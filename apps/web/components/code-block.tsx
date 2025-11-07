"use client";

import { useEffect, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { highlightCode } from "@/lib/highlight-code";
import { cn } from "@/lib/utils";
import { getIconForLanguageExtension } from "@/registry/components/icons";

export function CodeBlock({
  code,
  language = "tsx",
  title,
  copyButton = true,
  showLineNumbers = false,
  borderless = false,
  fullHeight = false,
}: {
  code: string;
  language?: string;
  title?: string;
  copyButton?: boolean;
  showLineNumbers?: boolean;
  borderless?: boolean;
  fullHeight?: boolean;
}) {
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    highlightCode(code, language, { showLineNumbers }).then(setHighlightedCode);
  }, [code, language, showLineNumbers]);

  if (!highlightedCode) {
    return (
      <div className="flex h-[350px] items-center justify-center p-4 text-muted-foreground text-sm">
        Highlighting code...
      </div>
    );
  }

  const icon = getIconForLanguageExtension(language);

  return (
    <figure
      data-rehype-pretty-code-figure=""
      className={cn(
        "!m-0 !mt-0 relative",
        borderless && "!border-0",
        fullHeight && "flex h-full min-h-0 flex-col",
      )}
    >
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="!pt-0 flex items-center gap-2 text-code-foreground [&_svg]:size-5 [&_svg]:text-code-foreground [&_svg]:opacity-70 sm:[&_svg]:size-4"
          data-language={language}
        >
          {icon}
          {title}
        </figcaption>
      )}
      {copyButton && <CopyButton value={code} />}
      <div
        className={cn(
          fullHeight &&
            "min-h-0 flex-1 overflow-auto [&_pre]:h-full [&_pre]:min-h-full",
        )}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </figure>
  );
}
