"use client";

import { cn } from "@/lib/utils";

/** Frame for an inline docs demo: centered stage with room to breathe. */
export function Demo({
  children,
  className,
  ...props
}: React.ComponentProps<"figure">) {
  return (
    <figure
      className={cn(
        "not-prose my-8 flex min-h-48 flex-col items-center justify-center gap-6 px-6 py-10",
        className,
      )}
      {...props}
    >
      {children}
    </figure>
  );
}

/** Small pill switcher used under a demo to flip between two or more states. */
export function DemoToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {options.map((option) => (
        <button
          aria-pressed={value === option.value}
          className={cn(
            "rounded-full px-3 py-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground",
            value === option.value && "bg-accent font-medium text-foreground",
          )}
          key={option.value}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
