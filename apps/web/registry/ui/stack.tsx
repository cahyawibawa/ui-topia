import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Direction = "row" | "column";
type ResponsiveDirection = {
  sm?: Direction;
  md?: Direction;
};

type FlexAlignItems = "stretch" | "start" | "end" | "center";
type FlexJustifyContent =
  | "stretch"
  | "start"
  | "end"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "center";

interface StackProps extends ComponentProps<"div"> {
  children: React.ReactNode;
  direction?: ResponsiveDirection;
  gap?: number;
  padding?: number;
  grow?: boolean;
  shrink?: boolean;
  wrap?: boolean;
  align?: FlexAlignItems;
  justify?: FlexJustifyContent;
  className?: string;
}

export function Stack({
  direction = { sm: "column", md: "row" },
  align = "start",
  justify = "start",
  wrap = false,
  shrink = false,
  grow = false,
  padding = 0,
  gap = 0,
  children,
  className,
  ...etc
}: StackProps) {
  const directionClasses = [
    direction.sm === "row" ? "flex-row" : "flex-col",
    direction.md === "row" ? "md:flex-row" : "md:flex-col",
  ];

  const alignClasses = {
    stretch: "items-stretch",
    start: "items-start",
    end: "items-end",
    center: "items-center",
  }[align];

  const justifyClasses = {
    stretch: "justify-stretch",
    start: "justify-start",
    end: "justify-end",
    "space-between": "justify-between",
    "space-around": "justify-around",
    "space-evenly": "justify-evenly",
    center: "justify-center",
  }[justify];

  return (
    <div
      className={cn(
        "flex",
        wrap && "flex-wrap",
        grow && "flex-grow",
        shrink && "flex-shrink",
        directionClasses,
        alignClasses,
        justifyClasses,
        gap && `gap-${gap}`,
        padding && `p-${padding}`,
        className,
      )}
      {...etc}
    >
      {children}
    </div>
  );
}
