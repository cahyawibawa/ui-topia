"use client";

import { Button } from "@/registry/ui/button";
import { Stack } from "@/registry/ui/stack";

export default function ButtonColor() {
  return (
    <Stack
      align="start"
      direction={{ sm: "column", md: "row" }}
      gap={4}
      justify="space-between"
    >
      <Button className="border border-zinc-950/25 bg-gradient-to-t from-blue-600 to-blue-500/85 text-white shadow-md shadow-zinc-950/20 ring-1 ring-white/20 ring-inset transition-all duration-200 hover:brightness-110 active:brightness-90 dark:border-white/20 dark:ring-transparent">
        Primary
      </Button>

      <Button className="border border-zinc-950/35 bg-gradient-to-b from-blue-500/85 to-blue-600 text-white shadow-md shadow-zinc-950/20 transition-all duration-200 hover:brightness-110 active:brightness-95 dark:border-zinc-950/50 dark:bg-gradient-to-t dark:from-blue-600/75">
        Primary
      </Button>

      <Button className="border border-zinc-950/40 border-b-2 bg-gradient-to-t from-blue-600 to-blue-500/85 text-white shadow-md shadow-zinc-950/20 ring-1 ring-white/25 ring-inset transition-all duration-200 hover:brightness-110 active:brightness-90 dark:border-zinc-950/50 dark:border-x-0 dark:border-t-0 dark:ring-white/5">
        Primary
      </Button>
    </Stack>
  );
}
