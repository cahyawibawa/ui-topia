"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { Search } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { SearchItem } from "@/lib/docs";
import { playSound } from "@/lib/sounds";
import { cn } from "@/lib/utils";

export function DocsSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // Where the pill sits, so the panel can grow out of it. Keyboard shortcuts
  // are used all day, so those skip the morph (origin null) and open instantly.
  const [origin, setOrigin] = useState<{ top: number; width: number } | null>(
    null,
  );
  const [pillHidden, setPillHidden] = useState(false);
  const pillRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

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
        setOrigin(null);
        setPillHidden(true);
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Browsing: cluster by group, in the order each group first appears.
      const order = [...new Set(items.map((item) => item.group))];
      return [...items].sort(
        (a, b) => order.indexOf(a.group) - order.indexOf(b.group),
      );
    }
    return items
      .filter((item) =>
        `${item.title} ${item.description}`.toLowerCase().includes(q),
      )
      .sort(
        (a, b) =>
          Number(b.title.toLowerCase().startsWith(q)) -
          Number(a.title.toLowerCase().startsWith(q)),
      );
  }, [items, query]);

  const grouped = query.trim() === "";

  function go(url: string) {
    playSound("navigate");
    setOpen(false);
    router.push(url);
  }

  const instant = origin === null || reduceMotion;
  const targetWidth = Math.min(
    576,
    typeof window === "undefined" ? 576 : window.innerWidth - 32,
  );
  const top = origin?.top ?? 10;
  const grow = instant
    ? { duration: 0 }
    : ({ type: "spring", duration: 0.42, bounce: 0.12 } as const);
  const shrink = instant
    ? { duration: 0 }
    : ({ type: "spring", duration: 0.2, bounce: 0 } as const);

  return (
    <Dialog.Root
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setQuery("");
          setActive(0);
        }
      }}
      onOpenChangeComplete={(next) => {
        if (!next) setPillHidden(false);
      }}
      open={open}
    >
      <button
        className={cn(
          "hidden h-9 w-40 items-center gap-2 rounded-full bg-muted px-3.5 text-muted-foreground text-sm transition-[background-color,scale] duration-150 ease-out hover:bg-muted/70 active:scale-[0.96] sm:flex",
          pillHidden && "invisible",
        )}
        onClick={() => {
          const rect = pillRef.current?.getBoundingClientRect();
          setOrigin(rect ? { top: rect.top, width: rect.width } : null);
          setPillHidden(true);
          playSound("open");
          setOpen(true);
        }}
        ref={pillRef}
        type="button"
      >
        <Search className="size-4" />
        <span>Search</span>
        <kbd className="ml-auto font-sans text-xs opacity-70">⌘K</kbd>
      </button>
      <Dialog.Portal>
        {/* The backdrop blur ramps up over the page instead of snapping on. */}
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[6px] transition-[opacity,backdrop-filter] duration-300 ease-out data-ending-style:bg-transparent data-starting-style:bg-transparent data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:backdrop-blur-0 data-starting-style:backdrop-blur-0 data-ending-style:duration-150" />
        {/* Closing waits on this transition so the children can animate out. */}
        <Dialog.Popup
          className="fixed inset-0 z-50 outline-none transition-opacity duration-200 data-ending-style:opacity-[0.99]"
          initialFocus={inputRef}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <Dialog.Title className="sr-only">Search documentation</Dialog.Title>
          <motion.div
            animate={{
              width: open ? targetWidth : (origin?.width ?? targetWidth),
            }}
            className="absolute inset-x-0 mx-auto"
            initial={instant ? false : { width: origin?.width }}
            style={{ top }}
            transition={open ? grow : shrink}
          >
            <motion.div
              animate={{ height: open ? 56 : 36 }}
              className={cn(
                // Closed, this is pixel-for-pixel the header pill, so the
                // hand-off at the end of the exit isn't visible.
                "flex items-center gap-2 overflow-hidden rounded-full border px-[calc(--spacing(3.5)-1px)] text-sm transition-[background-color,border-color,box-shadow] duration-200",
                open
                  ? "border-border bg-popover shadow-lg/5"
                  : "border-transparent bg-muted shadow-none",
              )}
              initial={instant ? false : { height: 36 }}
              transition={open ? grow : shrink}
            >
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <div className="relative h-full min-w-0 flex-1">
                <input
                  className={cn(
                    "h-full w-full bg-transparent outline-none placeholder:transition-colors placeholder:duration-150",
                    open
                      ? "placeholder:text-muted-foreground"
                      : "placeholder:text-transparent",
                  )}
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
                  ref={inputRef}
                  value={query}
                />
                {/* The pill's label crossfades with the placeholder. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-y-0 left-0 flex items-center text-muted-foreground transition-opacity duration-150",
                    open && "opacity-0",
                  )}
                >
                  Search
                </span>
              </div>
              <kbd
                className={cn(
                  "font-sans text-muted-foreground text-xs transition-opacity duration-150",
                  open ? "opacity-0" : "opacity-70",
                )}
              >
                ⌘K
              </kbd>
            </motion.div>
            {/* Hangs below the bar and widens with it, fading in out of a blur. */}
            <motion.div
              animate={
                open
                  ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, scale: 0.97, y: -6, filter: "blur(4px)" }
              }
              className="mt-2 origin-top rounded-3xl border bg-popover shadow-lg/5"
              initial={
                instant
                  ? false
                  : { opacity: 0, scale: 0.92, y: -8, filter: "blur(8px)" }
              }
              transition={
                open
                  ? { ...grow, delay: instant ? 0 : 0.06 }
                  : { duration: 0.15, ease: "easeOut" }
              }
            >
              <ul className="max-h-[min(24rem,calc(100svh-7rem))] overflow-y-auto overscroll-contain p-2">
                {results.length === 0 && (
                  <li className="px-2 py-6 text-center text-muted-foreground text-sm">
                    No results.
                  </li>
                )}
                {results.map((item, index) => (
                  <li key={item.url}>
                    {grouped && item.group !== results[index - 1]?.group && (
                      <p
                        className={cn(
                          "px-3 pb-1 font-medium text-muted-foreground text-xs",
                          index === 0 ? "pt-1" : "pt-3",
                        )}
                      >
                        {item.group}
                      </p>
                    )}
                    <button
                      className={cn(
                        "flex w-full items-center justify-between gap-4 rounded-2xl px-3 py-2 text-left text-sm",
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
                      {!grouped && (
                        <span className="text-muted-foreground text-xs">
                          {item.group}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
