"use client";

import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

import { Button } from "@/registry/ui/button";

export function DocsCopyPage({ page }: { page: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <Button variant="outline" size="xs" onClick={() => copyToClipboard(page)}>
      {isCopied ? (
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} />
      ) : (
        <HugeiconsIcon icon={Copy01Icon} strokeWidth={2.5} />
      )}
      Copy Markdown
    </Button>
  );
}
