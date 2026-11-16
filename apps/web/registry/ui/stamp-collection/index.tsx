"use client";

/**
 * Adapted from the stamp-collection lab on Sanyam Punia's site
 * (https://github.com/SanyamPunia/www), used with his permission.
 */

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/*
 * Three stamps on a table. They rest in a fanned row and lift when you reach
 * for one. Press a stamp and it comes to the front, the others settle behind
 * it, and the print slides under its own window as you move.
 *
 * The paper is one SVG path with the perforation cut out of its edge, so the
 * shadow follows the scallops instead of the box. The lift is a tween: a
 * spring spends its last frames creeping the final pixel, which reads as lag
 * on a movement this short.
 */

const W = 160;
const H = 200;
const FRAME = 14;
const FOOT = 38;
const PITCH = 14;
const BITE = 3.4;

const INK = "oklch(0.145 0 0)";
const PAPER = "oklch(0.965 0.012 85)";
const BLUE = "oklch(0.623 0.214 259.815)";
const RED = "oklch(0.577 0.245 27.325)";
const YELLOW = "oklch(0.89 0.17 96)";

const LIFT = {
  type: "tween",
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1],
} as const;
const SETTLE = { type: "spring", stiffness: 240, damping: 30 } as const;
const INSTANT = { duration: 0 } as const;

/** Half circles bitten out of every edge, walked clockwise. */
function paperPath(w: number, h: number): string {
  const edge = (len: number) => {
    const n = Math.round(len / PITCH);
    return { n, step: len / n };
  };
  const top = edge(w);
  const side = edge(h);
  const d: string[] = ["M0 0"];

  for (let i = 0; i < top.n; i++) {
    const x = i * top.step + top.step / 2;
    d.push(`L${x - BITE} 0A${BITE} ${BITE} 0 0 0 ${x + BITE} 0`);
  }
  d.push(`L${w} 0`);
  for (let i = 0; i < side.n; i++) {
    const y = i * side.step + side.step / 2;
    d.push(`L${w} ${y - BITE}A${BITE} ${BITE} 0 0 0 ${w} ${y + BITE}`);
  }
  d.push(`L${w} ${h}`);
  for (let i = top.n - 1; i >= 0; i--) {
    const x = i * top.step + top.step / 2;
    d.push(`L${x + BITE} ${h}A${BITE} ${BITE} 0 0 0 ${x - BITE} ${h}`);
  }
  d.push(`L0 ${h}`);
  for (let i = side.n - 1; i >= 0; i--) {
    const y = i * side.step + side.step / 2;
    d.push(`L0 ${y + BITE}A${BITE} ${BITE} 0 0 0 0 ${y - BITE}`);
  }
  d.push("Z");
  return d.join("");
}

const PAPER_PATH = paperPath(W, H);

type Stamp = { id: string; value: string; label: string; print: ReactNode };

const STAMPS: Stamp[] = [
  {
    id: "dusk",
    value: "84",
    label: "Dusk, 84 yen",
    print: (
      <>
        <rect fill={BLUE} height="150" width="140" />
        <circle cx="70" cy="62" fill={YELLOW} r="30" />
        <path d="M0 150V108Q70 70 140 108V150Z" fill={INK} />
        <path
          d="M0 118Q70 84 140 118"
          fill="none"
          stroke={RED}
          strokeWidth="5"
        />
      </>
    ),
  },
  {
    id: "grid",
    value: "63",
    label: "Grid, 63 yen",
    print: (
      <>
        <rect fill={INK} height="150" width="140" />
        <rect fill={RED} height="52" width="52" x="18" y="22" />
        <rect fill={YELLOW} height="52" width="52" x="70" y="74" />
        <rect fill={BLUE} height="52" width="52" x="18" y="74" />
        <circle
          cx="96"
          cy="48"
          fill="none"
          r="22"
          stroke={PAPER}
          strokeWidth="4"
        />
      </>
    ),
  },
  {
    id: "tide",
    value: "94",
    label: "Tide, 94 yen",
    print: (
      <>
        <rect fill={RED} height="150" width="140" />
        <circle cx="70" cy="75" fill={PAPER} r="52" />
        <circle cx="70" cy="75" fill={BLUE} r="34" />
        <circle cx="70" cy="75" fill={YELLOW} r="14" />
      </>
    ),
  },
];

/** Where each stamp rests in the fan, relative to the stage centre. */
const FAN = [
  { x: -1, y: 8, r: -7 },
  { x: 0, y: -4, r: 1 },
  { x: 1, y: 10, r: 8 },
];

type Size = { w: number; h: number };

export interface StampCollectionProps {
  className?: string;
}

export default function StampCollection({ className }: StampCollectionProps) {
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const grainId = `stamp-grain-${useId().replace(/:/g, "")}`;
  const [size, setSize] = useState<Size>({ w: 640, h: 400 });
  const [focused, setFocused] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // Pointer position over the stage, -0.5 to 0.5. Two springs of different
  // stiffness so the stamp leans and the print slides at their own pace.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const lean = { stiffness: 140, damping: 18 };
  const slide = { stiffness: 80, damping: 16 };
  const leanX = useSpring(px, lean);
  const leanY = useSpring(py, lean);
  const slideX = useSpring(px, slide);
  const slideY = useSpring(py, slide);
  const rotateY = useTransform(leanX, (v) => v * 14);
  const rotateX = useTransform(leanY, (v) => v * -14);
  const printX = useTransform(slideX, (v) => v * -26);
  const printY = useTransform(slideY, (v) => v * -26);

  useLayoutEffect(() => {
    const node = stage.current;
    if (!node) {
      return;
    }
    const measure = () =>
      setSize({ w: node.clientWidth, h: node.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (focused === null) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFocused(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focused]);

  const onMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (focused === null || reduced) {
        return;
      }
      const box = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - box.left) / box.width - 0.5);
      py.set((e.clientY - box.top) / box.height - 0.5);
    },
    [focused, reduced, px, py],
  );

  const onLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  const rowScale = Math.min(1, Math.max(0.55, size.w / 640));
  const spread = Math.min(size.w * 0.27, 190);
  const focusScale = Math.min((size.h * 0.86) / H, (size.w * 0.8) / W);

  const poseOf = (i: number) => {
    if (focused === null) {
      const f = FAN[i] ?? { x: 0, y: 0, r: 0 };
      return {
        x: f.x * spread,
        y: f.y - (hovered === i ? 14 : 0),
        rotate: f.r,
        scale: rowScale,
      };
    }
    if (focused === i) {
      return { x: 0, y: 0, rotate: 0, scale: focusScale };
    }
    // Settled behind the front stamp, peeking out on alternate sides.
    const behind = i < focused ? i : i - 1;
    const side = behind === 0 ? -1 : 1;
    return {
      x: side * focusScale * 46,
      y: 14,
      rotate: side * 9,
      scale: focusScale * 0.9,
    };
  };

  return (
    <div
      className={className}
      onPointerLeave={onLeave}
      onPointerMove={onMove}
      ref={stage}
      style={{
        height: "25rem",
        position: "relative",
        overflow: "hidden",
        borderRadius: "var(--radius-xl, 1rem)",
        background:
          "radial-gradient(120% 90% at 50% 20%, oklch(0.27 0 0), oklch(0.16 0 0))",
      }}
    >
      <button
        aria-hidden
        className="absolute inset-0 cursor-default"
        onClick={() => setFocused(null)}
        tabIndex={-1}
        type="button"
      />
      <Grain id={grainId} />
      {STAMPS.map((stamp, i) => {
        const pose = poseOf(i);
        const isFront = focused === i;
        const behindRank = focused === null ? i : isFront ? 10 : i;
        return (
          <motion.button
            animate={pose}
            aria-label={stamp.label}
            aria-pressed={isFront}
            className="absolute top-1/2 left-1/2 cursor-pointer outline-none focus-visible:[&>div]:ring-2 focus-visible:[&>div]:ring-[oklch(0.623_0.214_259.815)]"
            initial={false}
            key={stamp.id}
            onBlur={() => setHovered((h) => (h === i ? null : h))}
            onClick={() => setFocused((f) => (f === i ? null : i))}
            onFocus={() => setHovered(i)}
            onPointerEnter={() => setHovered(i)}
            onPointerLeave={() => setHovered((h) => (h === i ? null : h))}
            style={{
              width: W,
              height: H,
              marginLeft: -W / 2,
              marginTop: -H / 2,
              zIndex: behindRank,
              perspective: 900,
            }}
            transition={reduced ? INSTANT : { y: LIFT, default: SETTLE }}
            type="button"
          >
            <motion.div
              className="relative size-full rounded-[2px]"
              style={{
                rotateX: isFront && !reduced ? rotateX : 0,
                rotateY: isFront && !reduced ? rotateY : 0,
              }}
            >
              <svg
                aria-hidden
                className="absolute inset-0 size-full overflow-visible"
                style={{
                  filter:
                    "drop-shadow(0 1px 1px rgb(0 0 0 / 0.35)) drop-shadow(0 10px 14px rgb(0 0 0 / 0.4))",
                }}
                viewBox={`0 0 ${W} ${H}`}
              >
                <path d={PAPER_PATH} fill={PAPER} />
              </svg>
              <div
                className="absolute overflow-hidden"
                style={{
                  left: FRAME,
                  top: FRAME,
                  right: FRAME,
                  bottom: FOOT,
                  background: INK,
                }}
              >
                <motion.svg
                  aria-hidden
                  className="absolute"
                  style={{
                    left: -14,
                    top: -14,
                    width: W - FRAME * 2 + 28,
                    height: H - FRAME - FOOT + 28,
                    x: isFront && !reduced ? printX : 0,
                    y: isFront && !reduced ? printY : 0,
                  }}
                  viewBox="-14 -14 168 178"
                >
                  {stamp.print}
                </motion.svg>
              </div>
              <span
                className="absolute right-[14px] bottom-[9px] text-[20px] leading-none"
                style={{
                  color: INK,
                  fontFamily: "var(--font-redaction), serif",
                }}
              >
                {stamp.value}
              </span>
              <span
                className="absolute bottom-[11px] left-[14px] text-[7px] uppercase leading-none tracking-[0.2em]"
                style={{ color: INK, opacity: 0.55 }}
              >
                Nippon
              </span>
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}

/** Paper grain over the table. The filter id is per instance, so two
 * collections on a page never resolve to each other's filter. */
function Grain({ id }: { id: string }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full opacity-[0.18] mix-blend-overlay"
    >
      <filter id={id}>
        <feTurbulence
          baseFrequency="0.8"
          numOctaves="2"
          stitchTiles="stitch"
          type="fractalNoise"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect filter={`url(#${id})`} height="100%" width="100%" />
    </svg>
  );
}
