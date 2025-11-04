"use client";

import { Check, Clipboard } from "lucide-react";
import type * as React from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/registry/ui/tooltip";

export function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string;
  src?: string;
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <Tooltip open={isCopied ? true : undefined}>
      <TooltipTrigger
        render={
          <Button
            data-slot="copy-button"
            size="icon"
            variant={variant}
            className={cn(
              "absolute top-1.5 right-1.5 z-10 size-8 opacity-70 hover:opacity-100 focus-visible:opacity-100",
              className,
            )}
            onClick={() => copyToClipboard(value)}
            {...props}
          >
            <span className="sr-only">Copy</span>
            {isCopied ? (
              <Check className="size-4" />
            ) : (
              <Clipboard className="size-4" />
            )}
          </Button>
        }
      />
      <TooltipPopup sideOffset={4}>
        {isCopied ? "Copied" : "Copy to Clipboard"}
      </TooltipPopup>
    </Tooltip>
  );
}
