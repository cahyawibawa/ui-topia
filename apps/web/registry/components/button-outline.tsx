"use client";

import { Button } from "@/registry/ui/button";
import { Stack } from "@/registry/ui/stack";

export default function ButtonOutline() {
  return (
    <Stack
      align="start"
      direction={{ sm: "column", md: "row" }}
      gap={4}
      justify="space-between"
    >
      <Button
        variant="outline"
        className="relative inset-shadow-2xs inset-shadow-white flex border border-zinc-300 bg-muted shadow-sm shadow-zinc-950/10 ring-0 duration-150 hover:bg-background dark:inset-shadow-transparent dark:border-border dark:bg-muted/25 dark:hover:bg-muted/50"
      >
        Outline
      </Button>

      <Button
        variant="outline"
        className="border border-zinc-300 bg-linear-to-t from-muted to-background shadow-xs shadow-zinc-950/10 ring-0 duration-200 hover:to-muted/50 dark:border-border dark:from-muted/50"
      >
        Outline
      </Button>

      <Button
        variant="outline"
        className="relative border-input/50 border-b-2 bg-background shadow-sm shadow-zinc-950/15 ring-1 ring-zinc-300 hover:bg-muted/50 dark:border-input dark:ring-input"
      >
        Outline
      </Button>
    </Stack>
  );
}
