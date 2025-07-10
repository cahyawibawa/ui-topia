"use client";
import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from "motion/react";
import { Children, useEffect, useState } from "react";
import { cn } from "@/registry/lib/utils";

export type TextLoopProps = {
  children: React.ReactNode[];
  className?: string;
  interval?: number;
  transition?: Transition;
  variants?: Variants;
  onIndexChange?: (index: number) => void;
};

export default function TextLoop({
  children,
  className,
  interval = 2,
  transition = { duration: 0.3 },
  variants,
  onIndexChange,
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const intervalMs = interval * 1000;

    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange]);

  const motionVariants: Variants = {
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    initial: { opacity: 0, y: 20 },
  };

  return (
    <div className={cn("relative inline-block whitespace-nowrap", className)}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          animate="animate"
          exit="exit"
          initial="initial"
          key={currentIndex}
          transition={transition}
          variants={variants || motionVariants}
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
