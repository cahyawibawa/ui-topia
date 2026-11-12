"use client";

/**
 * Adapted from the live-activities lab on Sanyam Punia's site
 * (https://github.com/SanyamPunia/www), used with his permission.
 */

import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { cn } from "@/registry/lib/utils";

/*
 * The platform's replace transition, for a glyph or a word that changes in
 * place: the old one shrinks and blurs out while the new one grows and
 * sharpens in, on a spring. Both sit in one grid cell, so they overlap through
 * the change and the slot is never briefly empty. `MotionConfig` drops the
 * scale and the travel under reduced motion and keeps the fade.
 */

const spring = { type: "spring", duration: 0.4, bounce: 0.3 } as const;
const fade = { duration: 0.16, ease: "easeOut" } as const;

/** a glyph that replaces another, keyed by what it shows */
export function SwapIcon({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid place-items-center *:col-start-1 *:row-start-1",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={id}
          className="flex"
          initial={{ opacity: 0, scale: 0.4, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.4, filter: "blur(4px)" }}
          transition={{ scale: spring, opacity: fade, filter: fade }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** a word that replaces another, rising in as the old one rises out */
export function SwapText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={cn(
        "grid justify-items-end *:col-start-1 *:row-start-1",
        className,
      )}
      style={style}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ y: spring, opacity: fade, filter: fade }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
