"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const modes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border p-0.5",
        className,
      )}
      data-slot="theme-toggle"
    >
      {modes.map(({ value, label, icon: Icon }) => (
        <button
          aria-pressed={mounted && theme === value}
          aria-label={label}
          className="inline-flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-accent aria-pressed:text-foreground"
          key={value}
          onClick={() => setTheme(value)}
          type="button"
        >
          <Icon className="size-3.5" />
        </button>
      ))}
    </div>
  );
}
