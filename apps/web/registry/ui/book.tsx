import type React from "react";
import { cn } from "@/lib/utils";
import { Stack } from "@/registry/ui/stack";

interface BookProps {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  texture?: boolean;
  depth?: number;
  variant?: "default" | "simple";
  illustration?: React.ReactNode;
  width?: number;
}

export function Book(props: BookProps) {
  const {
    children,
    color = "#f50537",
    depth,
    texture,
    variant = "default",
    textColor,
    illustration,
    width,
  } = props;
  return (
    <div
      className={cn("group inline-block w-fit [perspective:900px]")}
      style={
        {
          "--book-color": color,
          "--book-depth": `${depth || 4}cqw`,
          "--book-width": `${width || 196}px`,
          "--text-color": textColor,
        } as React.CSSProperties
      }
    >
      <div className="relative aspect-[49/60] w-fit min-w-[calc(var(--book-width))] rotate-0 transition-transform duration-500 ease-out contain-inline-size [transform-style:preserve-3d] group-hover:[transform:rotateY(-20deg)_scale(1.066)translateX(-8px)]">
        <Stack
          align="stretch"
          className="absolute size-full overflow-hidden rounded-r rounded-l border border-border bg-[var(--book-color)] bg-stone-100 shadow-book dark:bg-stone-800"
        >
          {variant !== "simple" && (
            <Stack
              className={cn(
                "relative min-w-[calc(var(--book-width))] overflow-hidden bg-[var(--book-color)]",
              )}
              direction={{ md: "row", sm: "column" }}
              grow
              shrink
            >
              <div className="bg absolute inset-y-0 min-w-[8.2%] bg-book-bind opacity-100 mix-blend-overlay" />
              {illustration && (
                <div className="object-cover">{illustration}</div>
              )}
            </Stack>
          )}
          <Stack
            className="h-fit"
            direction={{ md: "row", sm: "column" }}
            grow={variant === "simple"}
          >
            <div className="h-full min-w-[8.2%] bg-book-bind bg-opacity-100 mix-blend-overlay" />
            <div className="w-full contain-inline-size">{children}</div>
          </Stack>
          {texture && (
            <div
              aria-hidden={true}
              className="absolute inset-0 bg-ali bg-cover bg-no-repeat opacity-60 mix-blend-hard-light"
            />
          )}
        </Stack>
        <div
          aria-hidden={true}
          className="absolute top-[3px] h-[calc(100%-2*6px)] w-[calc(var(--book-depth)-2px)] bg-book-pages"
          style={{
            transform:
              "translateX(calc(var(--book-width) - var(--book-depth) / 2 - 3px)) rotateY(90deg) translateX(calc(var(--book-depth) / 2))",
          }}
        />
        <div
          aria-hidden={true}
          className="book-bg absolute left-0 h-full w-full rounded-r rounded-l-md bg-[var(--book-color)]"
          style={{
            transform: "translateZ(calc(-1 * var(--book-depth)))",
          }}
        />
      </div>
    </div>
  );
}
