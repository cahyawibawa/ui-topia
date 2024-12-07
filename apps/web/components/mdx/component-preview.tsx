"use client";
import { cn } from "@/lib/utils";
import { Icons } from "@ui/topia/icons";
import { cloneElement, useState } from "react";

type ComponentPreviewProps = {
  component: React.ReactElement;
  hasReTrigger?: boolean;
  className?: string;
};

export default function ComponentPreview({
  component,
  hasReTrigger = false,
  className,
}: ComponentPreviewProps) {
  const [reTriggerKey, setReTriggerKey] = useState<number>(Date.now());

  const reTrigger = () => {
    setReTriggerKey(Date.now());
  };

  return (
    <div
      className={cn(
        "flex min-h-[350px] w-full items-center justify-center rounded-md",
        className,
      )}
    >
      {hasReTrigger && (
        <div
          className="absolute top-3 right-4 cursor-pointer"
          onClick={reTrigger}
        >
          <Icons.refresh className="size-4 text-zinc-500" />
        </div>
      )}
      {hasReTrigger
        ? cloneElement(component, { key: reTriggerKey })
        : component}
    </div>
  );
}
