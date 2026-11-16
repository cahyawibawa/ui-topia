/**
 * Adapted from the stamp-collection lab on Sanyam Punia's site
 * (https://github.com/SanyamPunia/www), used with his permission.
 */

"use client";

import {
  animate,
  type MotionValue,
  motion,
  type Transition,
  useMotionValue,
} from "motion/react";
import { useId, useMemo } from "react";
import { cn } from "@/lib/utils";
import { FIELD, Motif, type MotifKind, PALETTE } from "./motifs";
import {
  FRAME,
  HOLE_RADIUS,
  holes,
  PERSPECTIVE,
  type Pose,
  VIEW,
} from "./poses";

export interface StampDef {
  id: string;
  /** runs up the left edge of the print */
  title: string;
  /** the denomination, top right */
  value: string;
  kind: MotifKind;
  /** type colour, which depends on what the print's field is */
  ink: string;
}

/*
 * One stamp: perforated paper, a print under a window, and its lettering.
 *
 * The paper is an SVG rather than a div with a CSS mask. Both can punch the
 * holes, but only the SVG gives a `drop-shadow` that follows the scallops
 * instead of the bounding box, and a stamp whose shadow is a rectangle is a
 * rectangle.
 */
const PERFS = holes();

/**
 * The lift, and it is a tween rather than a spring on purpose.
 *
 * Opening a stamp feels fast and the lift felt slow while the lift's spring was
 * mathematically the quicker of the two, 160ms against 277ms. Distance is the
 * reason. Opening moves a stamp about 150px and grows it about 100px, so every
 * frame carries a lot of change. The lift covers 14px, which on a spring is
 * about 1.5px a frame, and a spring spends most of its time on the last couple
 * of pixels. Sub-pixel creep for a dozen frames reads as sluggish however short
 * the total is.
 *
 * A sharp ease-out front-loads it instead: roughly 60% of the distance lands in
 * the first quarter of the time, so the first two frames cover about 8px of the
 * 14 and the rest is a settle nobody is watching.
 */
const LIFT = { duration: 0.14, ease: [0.22, 1, 0.36, 1] } as const;

/** the picture window, the box the print is clipped to */
const WINDOW = {
  x: FRAME,
  y: FRAME,
  width: VIEW.width - FRAME * 2,
  height: VIEW.height - FRAME * 2,
} as const;

export function Stamp({
  stamp,
  pose,
  focused,
  transition,
  parallax,
  tilt,
  lift,
  onSelect,
}: {
  stamp: StampDef;
  pose: Pose;
  focused: boolean;
  transition: Transition;
  /**
   * The print's offset inside its window, shared by every stamp and only ever
   * non-zero for the focused one. Passing the same pair to all three is what
   * keeps the springs from being rebuilt when the selection changes.
   */
  parallax: { x: MotionValue<number>; y: MotionValue<number> };
  /**
   * The lean, in degrees, shared the same way the parallax is.
   *
   * Every stamp reads the same pair. Only the focused one is ever driven, and at
   * rest the pair is zero, so the two behind it lean invisibly and no stamp
   * needs to be told whether it is the one in focus.
   */
  tilt: { x: MotionValue<number>; y: MotionValue<number> };
  /** how far this stamp rises on hover, in px, or 0 while it may not */
  lift: number;
  onSelect: () => void;
}) {
  /*
   * The hover lift, driven from the event handler and never from a render.
   *
   * It was parent state, and `pointerenter` to the first pixel of movement
   * measured 21 to 24ms unthrottled: React had to handle the event, re-render
   * three stamps, commit, and only then could Motion pick up a new target on the
   * following frame. A late response to input is what reads as lag, whatever the
   * settle time says. Driving the value here starts the tween on the frame the
   * pointer arrived, and the parent no longer tracks hover at all.
   */
  const y = useMotionValue(0);

  // faded out behind the focused stamp: not a control until it comes back
  const hidden = pose.opacity === 0;

  const uid = useId();
  const perfId = `perf-${uid}`;
  const windowId = `window-${uid}`;
  const waveId = `wave-${uid}`;

  /*
   * The paper and the print, built once.
   *
   * A stamp is 91 to 121 SVG nodes and there are three of them, so a hover used
   * to hand React 309 nodes to reconcile for a state change that moves one stamp
   * 14px. Measured under a 4x CPU throttle: one 37.9ms frame at the instant the
   * pointer arrived, then 8 to 17ms for the rest of the lift. A stall at the
   * start of a gesture is what reads as lag, whatever the settle time says.
   *
   * Every dependency here is stable for the component's life, so this runs once
   * and React skips the whole subtree on every later render. Nothing in it
   * depends on the pose: the parallax arrives as motion values, which Motion
   * writes to the DOM without a render.
   */
  const drawing = useMemo(
    () => (
      <>
        <defs>
          {/*
           * The holes sit on the edge line itself, so half of each one bites
           * into the paper. That is what leaves convex paper between them, which
           * is the shape a torn perforation actually has.
           */}
          <mask id={perfId}>
            <rect width={VIEW.width} height={VIEW.height} fill="#fff" />
            {PERFS.map((hole) => (
              <circle
                key={`${hole.cx}-${hole.cy}`}
                cx={hole.cx}
                cy={hole.cy}
                r={HOLE_RADIUS}
                fill="#000"
              />
            ))}
          </mask>

          <clipPath id={windowId}>
            <rect
              x={WINDOW.x}
              y={WINDOW.y}
              width={WINDOW.width}
              height={WINDOW.height}
            />
          </clipPath>
        </defs>

        <g mask={`url(#${perfId})`}>
          <rect width={VIEW.width} height={VIEW.height} fill={PALETTE.paper} />

          <g clipPath={`url(#${windowId})`}>
            {/*
             * The print slides inside the window. It is drawn larger than the
             * window on every side, so no edge of it reaches the cream frame
             * however far the pointer pushes it.
             */}
            <motion.g style={{ x: parallax.x, y: parallax.y }}>
              <g transform={`translate(${FIELD.x} ${FIELD.y})`}>
                <Motif kind={stamp.kind} id={waveId} />
              </g>
            </motion.g>
          </g>
        </g>
      </>
    ),
    [stamp.kind, perfId, windowId, waveId, parallax.x, parallax.y],
  );

  return (
    <motion.button
      type="button"
      aria-label={`${stamp.title}, ${stamp.value} yen`}
      aria-pressed={focused}
      inert={hidden}
      onClick={() => {
        // the pointer is still over the stamp, so no `pointerleave` is coming to
        // put the lift back
        animate(y, 0, LIFT);
        onSelect();
      }}
      onPointerEnter={(event) => {
        // a touch tap fires enter and click together, and a lift that plays
        // under the selection it triggered reads as a stutter
        if (event.pointerType !== "mouse") return;
        animate(y, -lift, LIFT);
      }}
      onPointerLeave={() => animate(y, 0, LIFT)}
      /*
       * `container-type` on the button, so the lettering below can be a
       * proportion of the stamp rather than a fixed size. An element is a query
       * container for its descendants and never for itself, so nothing on this
       * element may use `cqw`.
       */
      /*
       * The focus ring is an `outline` on the button's own box, so it is a
       * rectangle round a scalloped object. Tight and rounded and in the paper's
       * own tone, it reads as a selection frame. At `offset-4` and grey it read
       * as a stray box beside the stamp.
       */
      /*
       * `will-change: transform` is not a hint here, it is the fix.
       *
       * The stamp is a masked SVG behind three stacked `drop-shadow` filters.
       * Without its own compositor layer the browser re-rasters that whole chain
       * on every frame the stamp moves, and the hover lift dropped 13 frames in a
       * 900ms window against 0 idle, measured under a 4x CPU throttle. Promoted,
       * the filter rasters once and the lift is a layer translate: 2 dropped
       * frames, which is the floor.
       *
       * None of the main-thread probes could see this. `Layerize` was 0.6ms a
       * frame and rAF deltas were 8 to 17ms while the screen was missing every
       * other frame, because raster and compositing do not happen on the thread
       * rAF runs on. Trace `DroppedFrame` for this class of problem.
       *
       * Removing the filter chain instead does nothing: 4 dropped frames without
       * it against 1 with it, on the same run. It is the layer, not the shadows.
       */
      className={cn(
        "absolute cursor-pointer rounded-md [container-type:inline-size]",
        "[will-change:transform]",
        "focus-visible:outline-2 focus-visible:outline-white/60 focus-visible:outline-offset-2",
      )}
      style={{
        left: pose.left,
        top: pose.top,
        width: pose.width,
        height: pose.height,
        zIndex: pose.zIndex,
        y,
        // the lean, composed by Motion with the flat `rotate` the pose animates
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformPerspective: PERSPECTIVE,
      }}
      animate={{
        left: pose.left,
        top: pose.top,
        width: pose.width,
        height: pose.height,
        rotate: pose.rotate,
        opacity: pose.opacity,
      }}
      transition={transition}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
        preserveAspectRatio="none"
        className="block size-full"
        /*
         * Three shadows, faint each. One dark contact shadow to seat the paper,
         * one mid layer for form, one wide ambient. A single shadow heavy enough
         * to read at this size looks like a drop shadow rather than like light.
         */
        style={{
          filter: focused
            ? "drop-shadow(0 1px 1px rgb(0 0 0 / 0.5)) drop-shadow(0 10px 18px rgb(0 0 0 / 0.45)) drop-shadow(0 26px 50px rgb(0 0 0 / 0.4))"
            : "drop-shadow(0 1px 1px rgb(0 0 0 / 0.45)) drop-shadow(0 5px 10px rgb(0 0 0 / 0.4)) drop-shadow(0 14px 28px rgb(0 0 0 / 0.3))",
        }}
      >
        {drawing}
      </svg>

      {/*
       * Real text over the drawing rather than SVG `<text>`, so it takes the
       * stylesheet's lowercasing and the site's own face. Sized in `cqw`, since
       * a stamp goes from 160px wide to 236px and its lettering has to go with
       * it.
       */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ color: stamp.ink }}
      >
        <span className="absolute top-[9.5%] right-[11%] text-[4.4cqw] leading-none tracking-wide">
          {stamp.value}
        </span>
        <span className="absolute top-[11%] left-[11.5%] text-[4cqw] leading-none tracking-[0.18em] [writing-mode:vertical-rl]">
          {stamp.title}
        </span>
      </span>
    </motion.button>
  );
}
