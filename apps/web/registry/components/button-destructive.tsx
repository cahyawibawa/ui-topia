"use client";

import { Button } from "@/registry/ui/button";
import { Stack } from "@/registry/ui/stack";

export default function ButtonDestructive() {
  return (
    <Stack
      align="start"
      direction={{ sm: "column", md: "row" }}
      gap={4}
      justify="space-between"
    >
      <Button
        variant="destructive"
        className="border border-zinc-950/25 bg-gradient-to-t from-destructive to-destructive/85 text-white shadow-md shadow-zinc-950/20 ring-1 ring-white/20 ring-inset transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:border-white/15 dark:ring-transparent"
      >
        Destructive
      </Button>

      <Button
        variant="destructive"
        className="inset-shadow-2xs inset-shadow-white/25 border border-zinc-950/35 bg-linear-to-b from-destructive/85 to-destructive text-white shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95 dark:border-0 dark:border-zinc-950/50 dark:bg-linear-to-t dark:from-destructive/75"
      >
        <span className="relative [text-shadow:0_1px_0_var(--color-red-800)]">
          Destructive
        </span>
      </Button>

      <Button
        variant="destructive"
        className="border border-zinc-950/40 border-b-2 bg-linear-to-t from-destructive to-destructive/85 text-white shadow-md shadow-zinc-950/20 ring-1 ring-white/25 ring-inset transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:inset-shadow-2xs dark:inset-shadow-white/10 dark:border-zinc-950/50 dark:border-x-0 dark:border-t-0 dark:ring-white/5"
      >
        <span className="[text-shadow:0_1px_0_var(--color-red-800)]">
          Destructive
        </span>
      </Button>
    </Stack>
  );
}
