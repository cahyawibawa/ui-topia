"use client";

import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  HOLD,
  liftFor,
  offsetIn,
  PARALLAX,
  type Phase,
  pose,
  STAGE_ASPECT,
  TILT,
  TRAVEL,
} from "./poses";
import { Stamp, type StampDef } from "./stamp";

/*
 * Three stamps laid out by hand. Hovering one lifts it, clicking one brings it
 * to the front of the stage, and the print inside a focused stamp slides under
 * its window as the pointer moves.
 *
 * The layout is poses in stage pixels, because a
 * stamp is staged by animating its `width` and `height` and never by scaling it.
 * A scale would take the perforated edge and the drop shadow with it, and both
 * are the reason the paper is drawn as an SVG in the first place.
 */

/**
 * Denominations are real: 63, 84 and 94 yen are current Japanese rates. Titles
 * are the print, not a language, since nothing here loads a CJK face and a
 * missing glyph is worse than an English word.
 */
const STAMPS: StampDef[] = [
  { id: "sun", title: "Rising sun", value: "84", kind: "sun", ink: "#23201c" },
  {
    id: "wave",
    title: "Wave crest",
    value: "63",
    kind: "wave",
    ink: "#efe7d7",
  },
  {
    id: "kiku",
    title: "Chrysanthemum",
    value: "94",
    kind: "chrysanthemum",
    ink: "#efe7d7",
  },
];

/**
 * A stamp travelling between poses: across the stage, and growing into focus.
 *
 * Not the hover lift, which the stamp drives itself so it can start on the frame
 * the pointer arrived rather than after a render.
 */
const SETTLE = {
  type: "spring",
  stiffness: 260,
  damping: 26,
  mass: 0.9,
} as const;

/**
 * The print's own spring, looser than the stamp's.
 *
 * The stamp arrives and stops. The print keeps drifting for a moment after the
 * pointer does, which is what makes it read as sitting behind glass rather than
 * as being dragged.
 */
const DRIFT = { stiffness: 90, damping: 18, mass: 0.6 } as const;

/**
 * The lean's spring, stiffer than the print's.
 *
 * The stamp is the object being moved and answers the pointer almost at once.
 * The print is behind glass and lags. Running both on one spring loses that
 * separation and the two read as a single flat thing rotating.
 */
const LEAN = { stiffness: 200, damping: 22, mass: 0.5 } as const;

/** width and height are not transforms, so reduced motion has to name them */
const INSTANT = { duration: 0 } as const;

export interface StampCollectionProps {
  className?: string;
}

export default function StampCollection({ className }: StampCollectionProps) {
  const [phase, setPhase] = useState<Phase>({ kind: "fan", lead: null });
  const [stage, setStage] = useState({ width: 0, height: 0 });

  const stageRef = useRef<HTMLDivElement>(null);
  const step = useRef(0);
  const reduce = useReducedMotion();

  /*
   * Both journeys run in two beats through the pile, and the pile is the same
   * arrangement either way: fan, pile, focus going in, focus, pile, fan coming
   * out. Letting one move land before the next starts is the whole point, so the
   * second beat is a timer rather than a chained animation callback, which would
   * fire per property and per stamp.
   *
   * Reduced motion skips the middle. The sequence is choreography, and there is
   * nothing to read in it when nothing moves.
   */
  const sequence = (steps: Array<{ to: Phase; after?: number }>) => {
    window.clearTimeout(step.current);

    if (reduce) {
      const last = steps.at(-1);
      if (last) setPhase(last.to);
      return;
    }

    const play = (i: number) => {
      const current = steps[i];
      if (!current) return;
      setPhase(current.to);
      const wait = current.after;
      if (wait === undefined) return;
      step.current = window.setTimeout(() => play(i + 1), wait);
    };
    play(0);
  };

  useEffect(() => () => window.clearTimeout(step.current), []);

  /*
   * The lift is armed only by a fan that has finished arriving, which the phase
   * already says: a fan still carrying a lead is one mid-return. Nothing else
   * needs to know, since `lift` is a prop, so a stamp crossing the pointer
   * mid-flight is handed 0.
   */
  const armed = phase.kind === "fan" && phase.lead === null;

  /**
   * Puts the open stamp back, from wherever the request came.
   *
   * Three callers now, so it is one function: the stamp itself, Escape, and a
   * click on the bare stage.
   */
  const release = (index: number) => {
    rest();
    /*
     * Three beats out against two in. The stamp that was open shrinks back on
     * top of the pile, travels to its own slot still raised, and only then tucks
     * into the row. Going in it never has to give up any stacking, so there is
     * nothing to cover and no third beat to spend.
     */
    sequence([
      { to: { kind: "pile", lead: index }, after: HOLD },
      { to: { kind: "fan", lead: index }, after: TRAVEL },
      { to: { kind: "fan", lead: null } },
    ]);
  };

  const select = (index: number) => {
    // a click mid-sequence is ignored rather than queued. The stamps are in
    // flight and there is nothing under the pointer that means what it looks
    // like it means.
    if (phase.kind === "pile") return;

    if (phase.kind === "focus") {
      release(phase.index);
      return;
    }

    sequence([
      { to: { kind: "pile", lead: index }, after: HOLD },
      { to: { kind: "focus", index } },
    ]);
  };

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setStage({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /*
   * One pair for the whole stage, handed to all three stamps.
   *
   * Only the focused one is ever driven, so a pair per stamp would be two idle
   * springs, and swapping which pair a stamp reads would rebuild its spring on
   * every selection.
   */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, DRIFT);
  const driftY = useSpring(pointerY, DRIFT);

  /*
   * The lean, off the same pointer.
   *
   * Two more values rather than deriving these from the drift, because the drift
   * is already sprung and a transform of it would arrive with that lag baked in,
   * which is the one thing separating the stamp from the print.
   */
  const leanX = useMotionValue(0);
  const leanY = useMotionValue(0);
  const tiltX = useSpring(leanX, LEAN);
  const tiltY = useSpring(leanY, LEAN);

  /* Escape leaves the stamp, since clicking it again is the only other way out
     and a focused stamp covers most of the stage it would otherwise be clicked
     off. */
  useEffect(() => {
    if (phase.kind !== "focus") return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || phase.kind !== "focus") return;
      release(phase.index);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  /*
   * Clicking the bare table puts the stamp back, alongside clicking the stamp and
   * Escape.
   *
   * Bound to the node rather than written as a JSX prop: the stage is not a
   * control, it is a region the pointer passes through, and it has no honest
   * interactive role to carry. As a prop it is a roleless `div` with an
   * `onClick` and no keyboard equivalent Biome can see, since Escape lives on
   * the window.
   *
   * The target test is what tells a table click from a stamp click, since the
   * stamps are children and their clicks bubble here. A stamp reports the button,
   * the table reports itself, and the grain layer cannot report anything, being
   * `pointer-events-none`. Nothing needs `stopPropagation`.
   */
  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const onClick = (event: MouseEvent) => {
      if (event.target !== node || phase.kind !== "focus") return;
      release(phase.index);
    };
    node.addEventListener("click", onClick);
    return () => node.removeEventListener("click", onClick);
  });

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = stageRef.current;
    // only a stamp that has arrived, never one still gathering
    if (phase.kind !== "focus" || reduce || !node) return;

    const rect = node.getBoundingClientRect();
    const offset = offsetIn({ x: event.clientX, y: event.clientY }, rect);
    // the print slides against the pointer, which is what looking through a
    // window does
    pointerX.set(-offset.x * PARALLAX);
    pointerY.set(-offset.y * PARALLAX);

    /*
     * The stamp leans toward the pointer, so its near edge comes forward.
     *
     * Positive `rotateX` takes the bottom toward the viewer and positive
     * `rotateY` takes the right edge away, so the pointer's own offset works
     * unchanged on one axis and negated on the other.
     */
    leanX.set(offset.y * TILT);
    leanY.set(-offset.x * TILT);
  };

  const rest = () => {
    pointerX.set(0);
    pointerY.set(0);
    leanX.set(0);
    leanY.set(0);
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerLeave={rest}
      /*
       * A dark ground, and not because it looks better: the paper is cream, and
       * cream on a light page would put every value within a few percent of every
       * other, so the stamps would read as three faint rectangles. The clip is what
       * stops a stamp's corner poking past the rounded edge mid-transition.
       */
      className={cn(
        "relative w-full select-none overflow-hidden rounded-lg bg-[#0a0a0a]",
        className,
      )}
      style={{
        aspectRatio: STAGE_ASPECT,
        /*
         * A light over the ground, not a second colour. Flat black read as a dead
         * rectangle, so this is white at low alpha, brightest under the stamps and
         * fading to the ground at the corners, which is a table with a lamp over it.
         */
        backgroundImage:
          "radial-gradient(115% 90% at 50% 44%, rgb(255 255 255 / 0.075), rgb(255 255 255 / 0.025) 55%, rgb(255 255 255 / 0) 100%)",
      }}
    >
      {/*
       * The grain, one inline `feTurbulence` so the page makes no request for
       * it. `overlay` does nothing to pure black and everything to a mid tone, so
       * it lands on the stamps and stays out of the ground, which is the right
       * way round for a printed object on a dark table.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {stage.width > 0 &&
        STAMPS.map((stamp, index) => (
          <Stamp
            key={stamp.id}
            stamp={stamp}
            focused={phase.kind === "focus" && phase.index === index}
            transition={reduce ? INSTANT : SETTLE}
            parallax={{ x: driftX, y: driftY }}
            tilt={{ x: tiltX, y: tiltY }}
            pose={pose({ index, count: STAMPS.length, phase, stage })}
            /*
             * The lift belongs to the fan and nowhere else. A stamp that is
             * selected has nowhere to rise to, and one still gathering is in
             * flight, so in both cases hovering does nothing.
             */
            lift={armed && phase.kind === "fan" && !reduce ? liftFor(stage) : 0}
            onSelect={() => select(index)}
          />
        ))}

      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-1.5 z-50 text-center text-[11px] text-white/40 uppercase tracking-[0.18em]"
      >
        {phase.kind === "focus" ? "Esc to put back" : "Press a stamp"}
      </p>
    </div>
  );
}
