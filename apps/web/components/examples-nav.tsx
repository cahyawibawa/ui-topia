"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Badge } from "@/uitopia/badge";
import { ScrollArea, ScrollBar } from "@/uitopia/scroll-area";
import { registry } from "@ui/topia/registry";

const examples = [
  {
    name: "Button",
    href: "/examples/buttons",
    getCount: () =>
      Object.keys(registry).filter((key) => key.startsWith("button-")).length,
  },
  {
    name: "Input",
    href: "/examples/inputs",
    getCount: () =>
      Object.keys(registry).filter((key) => key.startsWith("input-")).length,
  },
];

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div
          className={cn("my-5 flex items-center justify-end", className)}
          {...props}
        >
          {examples.map((example, index) => (
            <ExampleLink
              key={example.href}
              example={example}
              isActive={
                pathname?.startsWith(example.href) ||
                (index === 0 && pathname === "/")
              }
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}

function ExampleLink({
  example,
  isActive,
}: {
  example: (typeof examples)[number];
  isActive: boolean;
}) {
  return (
    <Link
      href={example.href}
      className={cn(
        "relative flex h-7 items-center justify-center rounded-xl px-4 text-center text-xs transition-colors hover:text-foreground",
        isActive
          ? "bg-neutral-200 font-medium text-foreground dark:bg-slated dark:text-foreground"
          : "text-muted-foreground",
      )}
      data-active={isActive}
    >
      <span className="relative">
        {example.name}
        <Badge
          variant="secondary"
          className="-top-3.5 -right-4 absolute flex size-5 items-center justify-center rounded-2xl border-1 border-muted bg-muted p-0 font-light text-[10px]"
        >
          {example.getCount()}
        </Badge>
      </span>
    </Link>
  );
}
