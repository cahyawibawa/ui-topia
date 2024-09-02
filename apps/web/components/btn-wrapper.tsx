"use client";

import { Icons } from "@ui/topia/icons";
import { useState } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { toast } from "sonner";

type CardComponentProps = {
  children: React.ReactNode;
};

export const ButtonWrapper: React.FC<CardComponentProps> = ({ children }) => {
  const [isCopied, setIsCopied] = useState(false);

  const getCode = () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    flushSync(() => {
      root.render(children);
    });

    const code = div.innerHTML;
    return code;
  };

  const onCopy = () => {
    const code = getCode();
    toast.success("Copied to clipboard!");
    void navigator.clipboard.writeText(code);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="relative flex items-center justify-center rounded-md border bg-card px-0 py-24 font-mono md:px-2">
      <div className="absolute top-3 right-3 cursor-pointer bg-transparent p-2">
        <div
          onClick={onCopy}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onCopy();
            }
          }}
          role="button"
          tabIndex={0}
        >
          {isCopied ? (
            <Icons.check className="size-3.5 text-muted-foreground" />
          ) : (
            <Icons.clipboard className="size-3.5 animate-jelly text-muted-foreground" />
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
