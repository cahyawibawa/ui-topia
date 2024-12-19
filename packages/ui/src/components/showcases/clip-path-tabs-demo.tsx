"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type Path = { w: number; offset: number }[];

export default function TabsTransition() {
  const [slow, setSlow] = useState(false);
  const [clip, setClip] = useState(true);

  const [active, setActive] = useState(0);
  const [clipPaths, setClipPaths] = useState<Path>([]);
  const tabRefs = useRef<HTMLButtonElement[]>([]);

  const tabs = useMemo(
    () => [
      {
        label: "Overview",
      },
      {
        label: "Integrations",
      },
      {
        label: "Activity",
      },
      {
        label: "Domains",
      },
      {
        label: "Usage",
        hide: true,
      },
    ],
    [],
  );

  useEffect(() => {
    const newClipPaths = tabs.map((_, i) => {
      const rect = tabRefs.current[i]?.getBoundingClientRect();
      return {
        w: rect?.width || 0,
        offset:
          (rect?.left || 0) -
          (tabRefs.current[0]?.getBoundingClientRect().left || 0),
      };
    });

    setClipPaths(newClipPaths);
  }, [tabs]);

  const getClipPath = (i: number) => {
    if (clipPaths.length === 0) return "";
    const path = clipPaths[i];
    if (!path) return "";
    const { offset, w } = path;
    return `inset(4px calc(100% - (${offset + 3.5}px + ${w}px)) calc(100% - (0px + 32px)) ${offset + 3.5}px round 20px)`;
  };

  return (
    <>
      <div className={cn("relative flex w-fit items-center rounded-full p-1")}>
        {tabs.map((item, i) => (
          <button
            key={i}
            ref={(el) => {
              tabRefs.current[i] = el!;
            }}
            className={cn(
              "z-10 rounded-full px-3 py-1 text-neutral-900 text-sm tracking-tight transition-colors hover:text-neutral-500 dark:text-neutral-600",
              item.hide && "hidden sm:block",
            )}
            onClick={() => setActive(i)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <motion.div
        style={{ clipPath: clip ? getClipPath(active) : "unset" }}
        animate={{ clipPath: clip ? getClipPath(active) : "unset" }}
        transition={{
          type: slow ? "tween" : "spring",
          stiffness: 300,
          damping: 29,
          duration: slow ? 2 : 0.1,
        }}
        className={cn(
          "clip-path] -translate-x-1/2 pointer-events-none absolute left-1/2 z-20 flex w-fit items-center bg-neutral-950 p-1 [will-change: dark:bg-neutral-50",
        )}
        aria-hidden
      >
        {tabs.map((item, i) => (
          <span
            key={i}
            className={cn(
              "z-20 rounded-full px-3 py-1 text-neutral-50 text-sm tracking-tight transition-colors dark:text-neutral-950",
              item.hide && "hidden sm:block",
            )}
            aria-hidden
          >
            {item.label}
          </span>
        ))}
      </motion.div>
      <div className="absolute top-0 right-0 flex items-center gap-x-1 p-4">
        <motion.button
          className="relative flex h-6 items-center justify-center rounded-full bg-neutral-200/50 text-neutral-500 text-xs transition-all duration-200 hover:bg-neutral-200 dark:bg-neutral-50/5 dark:hover:bg-neutral-50/10"
          onClick={() => setClip((clip) => !clip)}
          style={{ width: clip ? 108 : 118 }}
        >
          <span className="absolute left-0 ml-2">clip-path:</span>{" "}
          {clip ? (
            <motion.span
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              key={0}
              className="absolute right-0 mr-2"
            >
              active
            </motion.span>
          ) : (
            <motion.span
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              key={1}
              className="absolute right-0 mr-2"
            >
              inactive
            </motion.span>
          )}
        </motion.button>
        <button
          className="flex h-6 items-center justify-center overflow-hidden rounded-full bg-neutral-200 bg-neutral-200/50 text-neutral-500 text-xs transition-all duration-200 hover:bg-neutral-200 dark:bg-neutral-50/5 dark:hover:bg-neutral-50/10"
          onClick={() => setSlow((slow) => !slow)}
          style={{ width: slow ? 48 : 32 }}
        >
          <AnimatePresence>
            {slow ? (
              <motion.span
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                key={0}
                className="absolute"
              >
                0.25x
              </motion.span>
            ) : (
              <motion.span
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                key={1}
                className="absolute"
              >
                1x
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}
