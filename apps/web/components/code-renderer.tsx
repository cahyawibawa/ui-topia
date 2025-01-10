import CopyButton from "@/components/copy-btn";
import React from "react";
import type { CodePreviewProps } from "types/component";

export function CodeRenderer({ code, highlightedCode }: CodePreviewProps) {
  return (
    <div className="group/item relative">
      <CopyButton componentSource={code} />
      <div className="max-h-[550px] overflow-auto rounded-md">
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
