/**
 * Adapted from the stamp-collection lab on Sanyam Punia's site
 * (https://github.com/SanyamPunia/www), used with his permission.
 */

/*
 * Where each stamp sits, and the holes punched round its edge.
 *
 * Pure geometry in stage pixels: the stage is measured once and every pose is
 * derived from that one number, so nothing in the component carries a size.
 *
 * Stage pixels rather than percentages because a stamp is staged by animating
 * its `width` and `height`, never by scaling it. A scale would blow the
 * perforated edge and the drop shadow up with the stamp, and the whole point of
 * drawing the paper as an SVG is that its edge stays the same weight at any size.
 */

/** the stage's own shape, wide enough for three stamps side by side */
export const STAGE_ASPECT = 1.5;

/** one stamp's shape, close to a real commemorative */
const STAMP_ASPECT = 0.75;

/** a stamp at rest, and one in focus, as a share of the stage's height */
const FAN_HEIGHT = 0.6;
const FOCUS_HEIGHT = 0.86;

/** how far along its own width the next stamp in the fan starts */
const FAN_STEP = 0.7;

/** the lift a hovered stamp takes, as a share of the stage's height */
const HOVER_LIFT = 0.04;

/**
 * That lift in pixels.
 *
 * A number rather than part of a pose, because the lift is not driven by a
 * render. Hovering sets a motion value in the event handler, so the spring starts
 * on the frame the pointer arrived rather than after React has been round the
 * houses. See `Stamp`.
 */
export function liftFor(stage: Stage): number {
  return HOVER_LIFT * stage.height;
}

/**
 * How far each stamp sits from the middle of the pile, as a share of the stage.
 *
 * 0.012 was the first value and the pile read as one stamp: 6px of offset behind
 * a stamp carrying a drop shadow shows nothing but a dark sliver, so the beat the
 * gather exists for was invisible. The spread of angles does the same job, since
 * three stamps at the same angle are one silhouette however far apart they are.
 */
const PILE_STEP = 0.032;

/**
 * How far the lead stamp rises out of the pile, as a share of the stage's height.
 *
 * This exists to cover a pop. `zIndex` is a discrete value, so the selected stamp
 * arrives in front of the others in a single frame however smoothly everything
 * else is moving, and against a gather that reads as the stack glitching rather
 * than as a stamp coming forward.
 *
 * It cannot be fixed by delaying the swap. The stamps overlap most when the pile
 * is tight, so later is worse, and a stamp translated up but left behind in
 * `zIndex` is occluded where it overlaps, which looks broken rather than early.
 * So the swap keeps its frame and gets something to hide behind: the lead rises
 * and squares up in the same frame, and the eye reads the movement instead of
 * the layer order.
 */
const LEAD_RISE = 0.07;

export interface Pose {
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
  opacity: number;
  zIndex: number;
}

export interface Stage {
  width: number;
  height: number;
}

/**
 * What the stage is doing.
 *
 * `pile` is the middle of both journeys: every stamp gathered into a stack at the
 * centre, on its way into a selection or back out of one. Selecting runs fan,
 * pile, focus. Leaving runs focus, pile, fan. One arrangement serves both, which
 * is why the sequence reverses cleanly rather than needing a second set of poses
 * read backwards.
 *
 * `lead` is the stamp on top of that stack, and it is the selected one in both
 * directions: the one about to grow on the way in, the one that just shrank on
 * the way out. Without it the selection sat wherever its index put it, so a
 * middle stamp had to grow out from behind another one, and shrink back into
 * hiding.
 *
 * **The fan carries a lead too, and that is a whole beat on the way out.** A
 * stamp returning to the bottom of the row has to give up its `zIndex`, which is
 * discrete: stamp 0 went from in front of everything to behind everything in one
 * frame, while the other two were still piled on top of it, so nearly the whole
 * stamp vanished at once. So it travels to its own slot while still raised and
 * still on top, and only then tucks in. By then the row has spread and the
 * overlap it has to lose is one neighbour instead of two.
 */
export type Phase =
  | { kind: "fan"; lead: number | null }
  | { kind: "pile"; lead: number }
  | { kind: "focus"; index: number };

/**
 * How long the stage holds each arrangement before moving to the next.
 *
 * The pose spring settles in about 280ms, so this is most of it rather than all
 * of it: the second move starts on the tail of the first, which reads as one
 * gesture in two beats. Waiting the full settle reads as two separate
 * animations with a gap.
 */
export const HOLD = 220;

/**
 * How long a stamp takes to reach a pose, near enough.
 *
 * Used to keep the hover lift disarmed until the stamps have stopped. Closing
 * spreads them back out under a pointer that has not moved, and every stamp that
 * crosses it fires its own `pointerenter` on the way past, so each one lifted and
 * dropped as it went. That is hover in reverse: the pointer moved onto nothing,
 * the stamps moved onto the pointer.
 *
 * Disarming is enough on its own and needs no test for whether the pointer
 * moved. A stamp that arrives under a stationary pointer has already had its
 * `pointerenter`, so it stays flat until the pointer leaves and comes back, which
 * is the right answer: you did not hover it, it came to you.
 */
export const TRAVEL = 300;

/** a stamp's pose for the arrangement the stage is in */
export function pose({
  index,
  count,
  phase,
  stage,
}: {
  index: number;
  count: number;
  phase: Phase;
  stage: Stage;
}): Pose {
  const centred = index - (count - 1) / 2;
  const fanHeight = FAN_HEIGHT * stage.height;
  const fanWidth = fanHeight * STAMP_ASPECT;

  if (phase.kind === "fan") {
    /*
     * The lead on its way home: over its own slot, still raised, still squared
     * up, still on top. The last beat lowers it, turns it to the row's angle and
     * gives up the `zIndex` all at once, so the swap has three things moving to
     * hide behind rather than none.
     */
    const settling = phase.lead === index;

    return {
      left: stage.width / 2 - fanWidth / 2 + centred * FAN_STEP * fanWidth,
      // the fan steps down to the right, so the three read as laid out by hand
      top:
        stage.height / 2 -
        fanHeight / 2 +
        centred * 0.022 * stage.height -
        (settling ? LEAD_RISE * stage.height : 0),
      width: fanWidth,
      height: fanHeight,
      // near enough the same angle on all three. Varying it more reads as a
      // spread deck rather than as stamps that were put down one after another
      rotate: settling ? 0 : -9 + index * 1.4,
      opacity: 1,
      /*
       * The stacking never changes on hover, so a lifted stamp stays under
       * whichever ones were already over it and only part of the lift shows.
       * Raising it to the front instead reads as picking the stamp up, which is
       * what the click is for.
       */
      zIndex: settling ? 20 : 10 + index,
    };
  }

  /*
   * The pile. Small offsets and a small spread of angles, so it reads as a stack
   * squared up by hand rather than as three stamps that happen to overlap.
   */
  const piled = {
    left: stage.width / 2 - fanWidth / 2 + centred * PILE_STEP * stage.width,
    top:
      stage.height / 2 -
      fanHeight / 2 +
      centred * PILE_STEP * stage.width * 0.5,
    width: fanWidth,
    height: fanHeight,
    rotate: -7 + index * 7,
    zIndex: 10 + index,
  };

  if (phase.kind === "pile") {
    if (index !== phase.lead) return { ...piled, opacity: 1 };

    return {
      ...piled,
      // rising and squaring up together, and the square-up is not decoration:
      // focus is at 0 degrees, so this is that rotation starting a beat early
      top: piled.top - LEAD_RISE * stage.height,
      rotate: 0,
      opacity: 1,
      zIndex: 20,
    };
  }

  if (index === phase.index) {
    const height = FOCUS_HEIGHT * stage.height;
    const width = height * STAMP_ASPECT;

    return {
      left: stage.width / 2 - width / 2,
      top: stage.height / 2 - height / 2,
      width,
      height,
      rotate: 0,
      opacity: 1,
      zIndex: 30,
    };
  }

  /*
   * The rest fade where the pile left them, so nothing travels twice. They are
   * placed rather than unmounted, which is what the way back animates out of.
   */
  return { ...piled, opacity: 0 };
}

/* ── the paper ─────────────────────────────────────────────────────────────── */

/** the stamp's own drawing box, in the units every motif is drawn in */
export const VIEW = { width: 300, height: 400 } as const;

/** a perforation, and the pitch the holes aim for before it is squared off */
const HOLE = 7;
const PITCH = 19;

/** the cream frame between the perforations and the picture */
export const FRAME = 22;

export interface Hole {
  cx: number;
  cy: number;
}

/**
 * The holes punched along all four edges, centred on the edge itself so half of
 * each one bites into the paper.
 *
 * The pitch is recomputed from a whole number of holes per edge rather than used
 * as given, so both corners land on a hole and the row cannot end mid-scallop.
 *
 * Deduped by position, because a corner hole belongs to two edges. The mask does
 * not care about the second copy, but React keys the circles by position and
 * warns about all four of them.
 */
export function holes(): Hole[] {
  const seen = new Map<string, Hole>();
  const add = (cx: number, cy: number) => seen.set(`${cx}-${cy}`, { cx, cy });

  const across = Math.round(VIEW.width / PITCH);
  const down = Math.round(VIEW.height / PITCH);

  for (let i = 0; i <= across; i++) {
    const cx = (VIEW.width / across) * i;
    add(cx, 0);
    add(cx, VIEW.height);
  }

  for (let i = 0; i <= down; i++) {
    const cy = (VIEW.height / down) * i;
    add(0, cy);
    add(VIEW.width, cy);
  }

  return [...seen.values()];
}

export const HOLE_RADIUS = HOLE;

/* ── the parallax ─────────────────────────────────────────────────────────── */

/**
 * How far the picture slides inside its window, in the stamp's own units.
 *
 * The picture is drawn `PARALLAX_BLEED` larger than the window on every side, so
 * there is something to slide into view and no edge of it can ever cross the
 * frame. Small on purpose: this is a print sitting under a window, not a
 * carousel.
 */
export const PARALLAX = 14;
export const PARALLAX_BLEED = 18;

/**
 * How far a focused stamp leans toward the pointer, in degrees, and the
 * perspective it leans under.
 *
 * The stamp tilts toward the pointer rather than away from it, so the near edge
 * comes forward and you see a little further under the frame on that side. That
 * is what looking at a real object does, and it is also the direction that agrees
 * with the print, which slides against the pointer: the two together read as a
 * picture behind glass rather than as one flat thing rotating.
 *
 * 9 degrees at 900px of perspective. Further looks like a card being flipped,
 * and this is a stamp lying under a light.
 */
export const TILT = 9;
export const PERSPECTIVE = 900;

/** the pointer's offset from the middle of a box, as -1 to 1 on each axis */
export function offsetIn(
  point: { x: number; y: number },
  rect: { left: number; top: number; width: number; height: number },
): { x: number; y: number } {
  return {
    x: clamp(((point.x - rect.left) / rect.width) * 2 - 1),
    y: clamp(((point.y - rect.top) / rect.height) * 2 - 1),
  };
}

function clamp(value: number): number {
  return Math.max(-1, Math.min(1, value));
}
