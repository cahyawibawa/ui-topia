"use client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/uitopia/button";
import { TextMorph } from "@/uitopia/examples/texts/text-morph";
import { Check, Share } from "lucide-react";
import { useState } from "react";

export function Control({ url }: { url: string }): React.ReactElement {
  const [text, setText] = useState("Share Post");

  const onClick = async (): Promise<void> => {
    await navigator.clipboard.writeText(`${window.location.origin}${url}`);
    setText("Copied");

    // Reset after 2 seconds
    setTimeout(() => {
      setText("Share Post");
    }, 2000);
  };

  return (
    <button
      className={cn(
        buttonVariants({ className: "gap-2", variant: "secondary" }),
      )}
      onClick={onClick}
    >
      {text === "Share Post" ? (
        <Share className="size-4" />
      ) : (
        <Check className="size-4" />
      )}
      <TextMorph>{text}</TextMorph>
    </button>
  );
}
