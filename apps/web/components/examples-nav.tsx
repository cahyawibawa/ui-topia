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
    <div className="flex justify-end">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("my-5 flex items-center", className)} {...props}>
          {examples.map((example, index) => (
            <Link
              href={example.href}
              key={example.href}
              className={cn(
                "relative flex h-7 items-center justify-center rounded-xl px-4 text-center text-[13px] transition-colors",
                pathname?.startsWith(example.href) ||
                  (index === 0 && pathname === "/")
                  ? "bg-neutral-200 font-medium text-primary dark:bg-slated dark:text-white"
                  : "text-muted-foreground",
              )}
            >
              <span className="relative">
                {example.name}
                <Badge
                  variant="secondary"
                  className="-top-3.5 -right-5 absolute flex size-5 items-center justify-center rounded-full border-1 border-muted bg-muted p-0 font-light text-[10px] text-muted-foreground"
                >
                  {example.getCount()}
                </Badge>
              </span>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
