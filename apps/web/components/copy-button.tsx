"use client";

import * as React from "react";
import { CopyIcon } from "@/components/copy-icon";
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
  // Always controlled: hover/focus opens it, and a fresh copy keeps it open to
  // show "Copied". Switching between undefined and a value would flip it
  // between uncontrolled and controlled, which Base UI warns about.
  const [hovered, setHovered] = React.useState(false);

  return (
    <Tooltip onOpenChange={setHovered} open={hovered || isCopied}>
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
            <CopyIcon copied={isCopied} />
          </Button>
        }
      />
      <TooltipPopup sideOffset={4}>
        {isCopied ? "Copied" : "Copy to Clipboard"}
      </TooltipPopup>
    </Tooltip>
  );
}
