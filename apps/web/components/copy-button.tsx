"use client";

import { cn } from "@/lib/utils";
import { Icons } from "@/registry/components/icons";
import { Button } from "@/uitopia/button";
import { useState } from "react";

interface CopyButtonProps {
  componentSource: string;
  className?: string;
  duration?: number;
}

function CopyButton({
  componentSource,
  className,
  duration = 2000,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), duration);
      return true;
    } catch (err) {
      console.error("Failed to copy text: ", err);
      return false;
    }
  }

  return (
    <div className={cn("absolute top-1.5 right-2", className)}>
      <Button
        size="icon"
        className={cn(
          "size-7 bg-transparent text-zinc-50 hover:bg-zinc-800 hover:text-zinc-50 ",
          "[&_svg]:h-3.5 [&_svg]:w-3.5",
          className,
        )}
        onClick={() => copy(componentSource)}
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? (
          <Icons.check className="size-3.5" />
        ) : (
          <Icons.copy className="size-3.5" />
        )}
      </Button>
    </div>
  );
}

export default CopyButton;
