"use client";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/registry/lib/utils";

export type CardStackProps = {
  /** One node per card, back to front. */
  children: React.ReactNode[];
  className?: string;
  /** Total fan angle in degrees when the deck is open. */
  spread?: number;
  /** Random-looking offset per card, 0 (tidy) to 1 (messy). */
  scatter?: number;
  /** Spring bounce, 0 (settles) to 1 (wobbles). */
  bounce?: number;
  /** Corner radius of each card, in px. */
  corner?: number;
  /** Card width and height, in px. */
  size?: { width: number; height: number };
};

/** Stable pseudo-random value in [-1, 1] for a card index. */
const jitter = (index: number, salt: number) => {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

export default function CardStack({
  children,
  className,
  spread = 60,
  scatter = 0,
  bounce = 0.3,
  corner = 14,
  size = { width: 150, height: 200 },
}: CardStackProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  // Click away (or Escape) puts the chosen card back on top of the deck.
  useEffect(() => {
    if (active === null) return;
    const away = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setActive(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const count = children.length;
  const mid = (count - 1) / 2;
  const fanned = open || active !== null;

  return (
    <div
      className={cn("relative", className)}
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => {
        setOpen(false);
        setHovered(null);
      }}
      ref={ref}
      style={{ height: size.height * 1.4, width: size.width * 2.4 }}
    >
      {children.map((child, i) => {
        const offset = i - mid;
        const isActive = active === i;
        const dimmed = active !== null && !isActive;
        const step = count > 1 ? spread / (count - 1) : 0;

        const rotate = isActive
          ? 0
          : offset * step * (fanned ? 1 : 0.15) + jitter(i, 1) * scatter * 8;
        const x = isActive
          ? 0
          : offset * (fanned ? size.width * 0.28 : 3) +
            jitter(i, 2) * scatter * 14 +
            (dimmed ? Math.sign(offset || 1) * size.width * 0.35 : 0);
        const y =
          (isActive ? -size.height * 0.04 : 0) +
          (hovered === i && !isActive ? -size.height * 0.1 : 0) +
          jitter(i, 3) * scatter * 8;

        return (
          <motion.button
            animate={{
              opacity: dimmed ? 0.6 : 1,
              rotate,
              scale: isActive ? 1.25 : dimmed ? 0.92 : 1,
              x,
              y,
            }}
            className="absolute top-1/2 left-1/2 cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring"
            initial={false}
            key={i}
            onBlur={() => setHovered(null)}
            onClick={() => setActive(isActive ? null : i)}
            onFocus={() => setHovered(i)}
            onPointerEnter={() => setHovered(i)}
            style={{
              borderRadius: corner,
              height: size.height,
              marginLeft: -size.width / 2,
              marginTop: -size.height / 2,
              width: size.width,
              zIndex: isActive ? count + 1 : hovered === i ? count : i,
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { bounce, duration: 0.55, type: "spring" }
            }
            type="button"
          >
            {child}
          </motion.button>
        );
      })}
    </div>
  );
}
