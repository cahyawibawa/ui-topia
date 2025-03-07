"use client";

import { cn } from "@/lib/utils";

type Direction = "row" | "column";
type ResponsiveDirection = {
  sm?: Direction;
  md?: Direction;
};

type StackProps = React.PropsWithChildren<{
  direction?: ResponsiveDirection;
  gap?: number;
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end" | "space-between" | "space-around";
  className?: string;
}>;

export function Stack({
  direction = { sm: "column", md: "row" },
  gap = 4,
  align = "start",
  justify = "start",
  children,
  className,
}: StackProps) {
  // Map justify value to appropriate Tailwind class
  const justifyClass = justify.includes("space-")
    ? `justify-${justify.replace("space-", "")}`
    : `justify-${justify}`;

  return (
    <div
      className={cn(
        "flex",
        direction.sm === "row" ? "flex-row" : "flex-col",
        direction.md === "row" ? "md:flex-row" : "md:flex-col",
        "gap-2 md:gap-5 lg:gap-10 xl:gap-[60px]",
        `items-${align}`,
        justifyClass,
        className,
      )}
    >
      {children}
    </div>
  );
}
