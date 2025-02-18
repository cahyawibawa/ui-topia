"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/uitopia/button";
import { Icons } from "@/uitopia/icons";
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
    <div className={cn("absolute top-2 right-2.5", className)}>
      <Button
        size="icon"
        className={cn(
          "size-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 ",
          "[&_svg]:h-3 [&_svg]:w-3",
          className,
        )}
        onClick={() => copy(componentSource)}
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? <Icons.check /> : <Icons.copy />}
      </Button>
    </div>
  );
}

export default CopyButton;
