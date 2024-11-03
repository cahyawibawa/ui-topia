"use client";

import { getJSXString } from "@/lib/get-jsx-string";
import { Icons } from "@ui/topia/icons";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
type CardComponentProps = {
  children: React.ReactElement;
};

export const ButtonWrapper: React.FC<CardComponentProps> = ({ children }) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    const jsxString = getJSXString(children);
    toast.success("Copied to clipboard!");
    void navigator.clipboard.writeText(jsxString);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="group relative flex items-center justify-center rounded-md border px-0 py-24 md:px-2">
      <div className="absolute top-3 right-3 cursor-pointer bg-transparent p-2">
        <button
          onClick={onCopy}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onCopy();
            }
          }}
        >
          {isCopied ? (
            <Icons.check className="size-3.5 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          ) : (
            <Icons.clipboard className="size-3.5 animate-jelly text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          )}
        </button>
      </div>
      {children}
    </div>
  );
};
