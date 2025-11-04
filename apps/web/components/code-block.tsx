"use client";

import { useEffect, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { highlightCode } from "@/lib/highlight-code";
import { getIconForLanguageExtension } from "@/registry/components/icons";

export function CodeBlock({
  code,
  language = "tsx",
  title,
  copyButton = true,
  showLineNumbers = false,
}: {
  code: string;
  language?: string;
  title?: string;
  copyButton?: boolean;
  showLineNumbers?: boolean;
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
    <figure data-rehype-pretty-code-figure="" className="!m-0 !mt-0 relative">
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
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </figure>
  );
}
