"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { SearchItem } from "@/lib/docs";
import { cn } from "@/lib/utils";
import { Dialog, DialogPopup, DialogTitle } from "@/registry/ui/dialog";

export function DocsSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "");

      if (
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.key === "/" && !typing)
      ) {
        event.preventDefault();
        setOpen((value) => {
          if (value) {
            setQuery("");
            setActive(0);
          }
          return !value;
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    return items
      .filter((item) =>
        `${item.title} ${item.description}`.toLowerCase().includes(q),
      )
      .sort(
        (a, b) =>
          Number(b.title.toLowerCase().startsWith(q)) -
          Number(a.title.toLowerCase().startsWith(q)),
      )
      .slice(0, 20);
  }, [items, query]);

  function close() {
    setOpen(false);
    setQuery("");
    setActive(0);
  }

  function go(url: string) {
    close();
    router.push(url);
  }

  return (
    <>
      <button
        className="flex h-8 w-full max-w-xs items-center gap-2 rounded-lg border bg-muted/50 px-2.5 text-muted-foreground text-sm transition-colors hover:bg-muted"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Search className="size-3.5" />
        <span>Search</span>
        <kbd className="ml-auto rounded border bg-background px-1.5 font-mono text-[10px]">
          /
        </kbd>
      </button>
      <Dialog
        onOpenChange={(next) => {
          if (next) setOpen(true);
          else close();
        }}
        open={open}
      >
        <DialogPopup
          className="top-[20%] max-w-lg translate-y-0 gap-0 p-0"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Search documentation</DialogTitle>
          <input
            autoFocus
            className="h-12 w-full border-b bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((i) => Math.min(i + 1, results.length - 1));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (event.key === "Enter" && results[active]) {
                go(results[active].url);
              }
            }}
            placeholder="Search documentation..."
            value={query}
          />
          <ul className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 && (
              <li className="px-2 py-6 text-center text-muted-foreground text-sm">
                No results.
              </li>
            )}
            {results.map((item, index) => (
              <li key={item.url}>
                <button
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-lg px-2 py-2 text-left text-sm",
                    index === active && "bg-accent",
                  )}
                  onClick={() => go(item.url)}
                  onMouseMove={() => setActive(index)}
                  ref={
                    index === active
                      ? (el) => el?.scrollIntoView({ block: "nearest" })
                      : undefined
                  }
                  type="button"
                >
                  <span>{item.title}</span>
                  <span className="text-muted-foreground text-xs">
                    {item.group}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </DialogPopup>
      </Dialog>
    </>
  );
}
