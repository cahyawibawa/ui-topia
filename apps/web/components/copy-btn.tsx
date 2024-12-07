"use client";

import { cn } from "@/lib/utils";
import { Button } from "@ui/topia/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/topia/tooltip";
import { useState } from "react";
import { CopyIcon } from "./copy-icon";

interface CopyButtonProps {
  componentSource: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ componentSource }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(componentSource);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div
      className={cn(
        "absolute top-2 right-2 transition-opacity",
        !copied &&
          "lg:opacity-0 lg:group-hover/item:opacity-100 lg:group-focus-within/item:opacity-100",
      )}
    >
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground/80 hover:bg-transparent hover:text-foreground disabled:opacity-100"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy component source"}
              disabled={copied}
            >
              {copied ? (
                <svg
                  className="scale-100 opacity-100 transition-all"
                  data-testid="geist-icon"
                  height="14"
                  strokeLinejoin="round"
                  viewBox="0 0 16 16"
                  width="14"
                  style={{ color: "currentColor" }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ) : (
                <CopyIcon />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-muted px-2 py-1 text-muted-foreground text-xs">
            {copied ? "Copied!" : "Copy"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CopyButton;
