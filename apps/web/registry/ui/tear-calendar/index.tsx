"use client";

/**
 * Adapted from the tear-calendar lab on Sanyam Punia's site
 * (https://github.com/SanyamPunia/www), used with his permission.
 */

import { RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { addDays, type Day, dayOf, fromToday } from "./days";
import { Sheet } from "./sheet";
import {
  EYELET,
  HEADER,
  HOLES,
  holeX,
  jagOf,
  PERF,
  pagePoly,
  pivotOf,
  rubber,
  SH,
  STACK,
  SX,
  SY,
  smoothstep,
  stubPoly,
  TEAR_SPAN,
  tearFor,
  turn,
  turnMax,
  W,
  wrap,
} from "./tear";
import { armTear, pat, pop, setTearSound, snap, swish } from "./tear-sound";

/*
 * A tear-off calendar on a nail, a page a day. Pull a page and it tears along
 * its perforation from the corner you pull toward, then comes away in your
 * hand, hangs from your fingers and flutters off when you let go. `tear.ts` is
 * the geometry and the tear, `days.ts` what a page prints, `sheet.tsx` the
 * printed page and `tear-sound.ts` the sound. This file is the hand, one
 * loop and the drawing's layers.
 *
 * **Nothing renders while it moves.** Every pose is a ref, and the transforms
 * and the crops are written to the nodes. React hears about a page only when
 * one comes free, and about a loose page when it leaves the stage.
 */

type V = { x: number; y: number };

/** where the nail is, and the box the calendar is drawn to fit, with room round it */
const NAIL_Y = 16;
const BOX = { w: 300, h: 380 };
/** what the calendar actually covers, from the nail to its shadow under the pad */
const SPAN = 326;

/*
 * A part-torn page that is let go falls back against the pad and bounces once.
 * The calendar swings on its nail like a pendulum about half a metre long, and
 * lightly damped, so a page coming free sets it swinging for a few seconds.
 */
const BACK_STIFF = 190;
const BACK_DAMP = 2 * 0.42 * Math.sqrt(BACK_STIFF);
const SWAY_W = 4.3;
const SWAY_DAMP = 2 * 0.22 * SWAY_W;

/*
 * A loose page is a pendulum hanging from the fingers holding it, and a leaf
 * once it is let go: it falls toward a slow terminal speed, drifts side to
 * side and rocks, and tips toward and away from the eye as it goes.
 */
const HANG_G = 1700;
const HANG_DAMP = 0.2;
const FALL_G = 1250;
const DRAG_X = 3.2;
const DRAG_Y = 3.6;
const FLUTTER = 5.2;

/** a press that travels less than this is a tap, which tears the page for you */
const SLOP = 4;

/** the speed a page is torn at when it is torn for you, which tears it cleanly */
const AUTO_SPEED = 200;

/** how much of the perforation is left when the rest gives way at once */
const LAST = 16;

/** the most stubs the header keeps: older ones are the first to fall off */
const KEEP = 10;

interface Tear {
  side: -1 | 1 | 0;
  f: number;
  jag: number[];
  seed: number;
}

interface Stub {
  key: number;
  doy: number;
  /** what is left under the header, worked out once when the page comes away */
  crop: string;
}

interface Loose {
  key: number;
  doy: number;
  side: -1 | 1;
  jag: number[];
  seed: number;
}

interface Body {
  /** the grab point, in the scene, and where it is on the page */
  x: number;
  y: number;
  g: V;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  /** the turn, and its rocking on top once it falls */
  phi: number;
  w: number;
  rock: number;
  rx: number;
  ry: number;
  /** the pointer holding it, -1 for the hand that tears for you, null once let go */
  held: number | null;
  /** seconds since it was let go, which the flutter ramps in over */
  t: number;
  ph: number;
  swished: number;
  gone: boolean;
}

interface Hold {
  kind: "tear" | "loose";
  id: number;
  /** a loose page's key */
  key?: number;
  /** where the press landed on the pad, and where on the page that is */
  press: V;
  g: V;
  f0: number;
  cx: number;
  cy: number;
  moved: boolean;
  /**
   * Set when the hand let go of a page it had already pulled far enough to
   * tear through: the tear runs out on its own and the page leaves at this
   * speed, so a yank released in the same instant still tears the page off.
   */
  thrown?: V;
}

interface Auto {
  at: number;
  start: V;
  dir: V;
  /** when the page came free, after which the hand speeds up and lets go */
  free: number | null;
}

/** the moon, the week and the weekday all come from the date, so the pad is seeded from it too */
function seedOf(year: number, doy: number): number {
  return year * 1009 + doy * 7919;
}

/** a few pages already torn before the visit, the way a pad on a wall looks */
function seeded(year: number, today: number): Stub[] {
  const out: Stub[] = [];
  for (let d = Math.max(0, today - 4); d < today; d++) {
    const seed = seedOf(year, d);
    // one page in four was yanked, the rest torn with some care
    const h = ((seed * 2654435761) >>> 0) / 4294967296;
    const rough = h < 0.28 ? 0.42 : h < 0.55 ? 0.18 : 0;
    const side: -1 | 1 = h * 7 - Math.floor(h * 7) < 0.5 ? -1 : 1;
    const jag = Array.from({ length: HOLES }, (_, i) => {
      const k = side < 0 ? i / (HOLES - 1) : 1 - i / (HOLES - 1);
      // a hand speeds up as the tear runs, so the far end is the rough one
      return Math.min(1, rough * k * k * 1.6);
    });
    out.push({ key: -1000 - d, doy: d, crop: stubPoly(side, W, jag, seed) });
  }
  return out;
}

export default function TearCalendar({
  sound = false,
}: {
  /** Play the synthesised tear sound. Off by default, and needs a press first. */
  sound?: boolean;
} = {}) {
  setTearSound(sound);
  const today = useMemo(() => new Date(), []);
  const year = today.getFullYear();
  const todayDoy = dayOf(today).ofYear - 1;
  const daysInYear = dayOf(today).daysInYear;

  const [cur, setCur] = useState(todayDoy);
  const [stubs, setStubs] = useState<Stub[]>(() => seeded(year, todayDoy));
  const [loose, setLoose] = useState<Loose[]>([]);
  const [said, setSaid] = useState("");

  const reduceValue = useReducedMotion() ?? false;
  const reduce = useRef(reduceValue);
  reduce.current = reduceValue;

  const stage = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const calendar = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const pageShadow = useRef<HTMLDivElement>(null);
  const pageShade = useRef<HTMLDivElement>(null);
  const stub = useRef<HTMLDivElement>(null);
  const nailEl = useRef<HTMLDivElement>(null);
  const bodies = useRef(new Map<number, Body>());
  const nodes = useRef(
    new Map<number, { el: HTMLDivElement; sh: HTMLDivElement }>(),
  );

  /** the stage's size and the scale the calendar is drawn at */
  const view = useRef({ k: 1, oy: 0, w: BOX.w, h: BOX.h });

  const tear = useRef<Tear>({ side: 0, f: 0, jag: [], seed: 0 });
  const pose = useRef({
    th: 0,
    thv: 0,
    lift: 0,
    liftv: 0,
    ex: 0,
    ey: 0,
    hov: 0,
  });
  const swing = useRef({ a: 0, av: 0, dip: 0, aim: 0, dipAim: 0 });
  const hold = useRef<Hold | null>(null);
  const hand = useRef<V>({ x: 0, y: 0 });
  const trail = useRef<{ x: number; y: number; t: number }[]>([]);
  const hover = useRef(false);
  const pace = useRef({ x: 0, y: 0, v: 0 });
  const auto = useRef<Auto | null>(null);
  const frame = useRef(0);
  const clock = useRef(0);
  const armed = useRef(false);
  const buzzed = useRef(0);
  const nextKey = useRef(1);
  const crop = useRef("");
  const curRef = useRef(cur);
  curRef.current = cur;

  const empty = cur >= daysInYear;
  // one object per day, so a page that has not changed is not drawn again
  const days = useRef(new Map<number, Day>());
  const dayAt = useCallback(
    (doy: number) => {
      let d = days.current.get(doy);
      if (!d) {
        d = dayOf(addDays(new Date(year, 0, 1), doy));
        days.current.set(doy, d);
      }
      return d;
    },
    [year],
  );

  /* ------------------------------------------------------------ the frame */

  const nail = useCallback((): V => ({ x: view.current.w / 2, y: NAIL_Y }), []);

  /** a point in the scene, in the page's own units on the pad */
  const toSheet = useCallback(
    (p: V): V => {
      const n = nail();
      const s = swing.current;
      const q = turn(
        { x: p.x - n.x, y: p.y - n.y - s.dip },
        { x: 0, y: 0 },
        -s.a,
      );
      return { x: q.x - SX, y: q.y - SY };
    },
    [nail],
  );

  /** a point on the pad, in the page's own units, back out into the scene */
  const fromSheet = useCallback(
    (q: V): V => {
      const n = nail();
      const s = swing.current;
      const r = turn({ x: q.x + SX, y: q.y + SY }, { x: 0, y: 0 }, s.a);
      return { x: r.x + n.x, y: r.y + n.y + s.dip };
    },
    [nail],
  );

  const toScene = (clientX: number, clientY: number): V => {
    const r = stage.current?.getBoundingClientRect();
    const { k, oy } = view.current;
    if (!r) return { x: 0, y: 0 };
    return { x: (clientX - r.left) / k, y: (clientY - r.top - oy) / k };
  };

  /** where the tear turns the page about, in the page's own units */
  const pivot = useCallback((): V => {
    const t = tear.current;
    if (t.side === 0) {
      return { x: W / 2, y: PERF };
    }
    return pivotOf(t.side, t.f, t.jag, t.seed);
  }, []);

  /** a point on the pad, taken back into the page as it lies before it turned */
  const unpose = useCallback(
    (q: V): V => {
      const p = pose.current;
      return turn({ x: q.x - p.ex, y: q.y - p.ey }, pivot(), -p.th);
    },
    [pivot],
  );

  /* -------------------------------------------------------------- drawing */

  const paint = useCallback(() => {
    const s = swing.current;
    const n = nail();
    const cal = calendar.current;
    if (nailEl.current)
      nailEl.current.style.left = `${(n.x - 3.2).toFixed(2)}px`;
    if (cal)
      cal.style.transform = `translate(${n.x.toFixed(2)}px, ${(n.y + s.dip).toFixed(2)}px) rotate(${s.a.toFixed(5)}rad)`;

    const t = tear.current;
    const p = pose.current;
    const P = pivot();
    const shape = `${t.side}:${t.f.toFixed(2)}`;
    if (shape !== crop.current) {
      crop.current = shape;
      if (page.current) {
        const poly = pagePoly(t.side, t.f, t.jag, t.seed);
        page.current.style.clipPath = poly;
        if (pageShade.current) pageShade.current.style.clipPath = poly;
      }
      if (stub.current)
        stub.current.style.clipPath = stubPoly(t.side, t.f, t.jag, t.seed);
    }
    const lift = Math.max(0, p.lift);
    // the page comes off the pad toward the eye, drawn as a slight growth about
    // the tear's front. It is never a 3D tilt: a 3D layer rasterises its type
    // without smoothing, and a page can be held still for a long time
    const tilt = lift > 0.05 ? ` scale(${(1 + lift * 0.0013).toFixed(5)})` : "";
    const core = `translate(${P.x.toFixed(2)}px, ${P.y.toFixed(2)}px) rotate(${p.th.toFixed(5)}rad)${tilt} translate(${(-P.x).toFixed(2)}px, ${(-P.y).toFixed(2)}px)`;
    if (page.current)
      page.current.style.transform = `translate(${p.ex.toFixed(2)}px, ${(p.ey - p.hov * 0.7).toFixed(2)}px) ${core}`;
    const L = Math.min(1, lift / 18 + p.hov * 0.22);
    const sh = pageShadow.current;
    if (sh) {
      sh.style.transform = `translate(${(p.ex + 1 + L * 6).toFixed(2)}px, ${(p.ey + 1.5 + L * 9 + p.hov).toFixed(2)}px) ${core}`;
      sh.style.opacity = (
        0.1 +
        L * 0.16 +
        Math.min(0.1, Math.abs(p.th))
      ).toFixed(3);
      sh.style.filter = `blur(${(1.2 + L * 5).toFixed(2)}px)`;
    }

    for (const [key, b] of bodies.current) {
      const node = nodes.current.get(key);
      if (!node) continue;
      const phi = b.phi + b.rock;
      const base = `translate(${b.x.toFixed(2)}px, ${b.y.toFixed(2)}px) rotate(${phi.toFixed(5)}rad)`;
      // a page held still is a plain 2D turn, so its type stays smooth
      const tumble =
        Math.abs(b.rx) + Math.abs(b.ry) > 0.3
          ? ` rotateX(${b.rx.toFixed(2)}deg) rotateY(${b.ry.toFixed(2)}deg)`
          : "";
      node.el.style.transform = `${base}${tumble} translate(${(-b.g.x).toFixed(2)}px, ${(-b.g.y).toFixed(2)}px)`;
      node.sh.style.transform = `translate(9px, 16px) ${base} translate(${(-b.g.x).toFixed(2)}px, ${(-b.g.y).toFixed(2)}px)`;
    }
  }, [pivot, nail]);

  /* ---------------------------------------------------------------- sound */

  const buzz = useCallback((ms: number, gap: number) => {
    if (!armed.current) return;
    const now = performance.now();
    if (now - buzzed.current < gap) return;
    buzzed.current = now;
    navigator.vibrate?.(ms);
  }, []);

  const arm = useCallback(() => {
    armed.current = true;
    armTear();
  }, []);

  /** the hand's speed over its last 80ms, in the scene's units a second */
  const handSpeed = useCallback((): V => {
    const tr = trail.current;
    const now = performance.now();
    const last = tr[tr.length - 1];
    if (!last || now - last.t > 70) return { x: 0, y: 0 };
    let first = last;
    for (let i = tr.length - 1; i >= 0; i--) {
      const at = tr[i];
      if (!at) continue;
      first = at;
      if (last.t - at.t > 80) break;
    }
    const dt = (last.t - first.t) / 1000;
    if (dt < 0.008) return { x: 0, y: 0 };
    return { x: (last.x - first.x) / dt, y: (last.y - first.y) / dt };
  }, []);

  const record = (p: V) => {
    const tr = trail.current;
    tr.push({ x: p.x, y: p.y, t: performance.now() });
    if (tr.length > 12) tr.shift();
  };

  /* ------------------------------------------------------- tearing a page */

  /** the page has come away: it becomes a loose page, and the next one is on top */
  const free = useCallback(() => {
    const t = tear.current;
    if (t.side === 0) return;
    const h = hold.current;
    const p = pose.current;
    const doy = curRef.current;
    const key = nextKey.current++;
    const side = t.side;
    const jag = t.jag.map((j) => (Number.isFinite(j) ? j : 0));
    const P = pivot();
    // the loose page picks up where the page on the pad left off
    const g = h ? h.g : { x: side < 0 ? 24 : W - 24, y: SH - 24 };
    const at = fromSheet({
      x: turn(g, P, p.th).x + p.ex,
      y: turn(g, P, p.th).y + p.ey,
    });
    const v = h?.id === -1 ? { x: 0, y: 0 } : handSpeed();
    const body: Body = {
      x: at.x,
      y: at.y,
      g,
      vx: v.x,
      vy: v.y,
      ax: 0,
      ay: 0,
      phi: p.th + swing.current.a,
      w: p.thv,
      rock: 0,
      rx: p.lift,
      ry: 0,
      held: h ? h.id : null,
      t: 0,
      ph: (t.seed % 628) / 100,
      swished: 0,
      gone: false,
    };
    if (!reduce.current) bodies.current.set(key, body);
    if (h) {
      hold.current = { ...h, kind: "loose", key };
    }
    // the pull that held the calendar over is gone, so it swings back
    swing.current.aim = 0;
    swing.current.dipAim = 0;
    tear.current = { side: 0, f: 0, jag: [], seed: seedOf(year, doy + 1) };
    crop.current = "";
    pose.current = { th: 0, thv: 0, lift: 0, liftv: 0, ex: 0, ey: 0, hov: 0 };
    const next = dayAt(doy + 1);
    // committed at once, or the page on the pad is drawn whole for a frame
    // before React swaps it for the loose one
    flushSync(() => {
      if (!reduce.current)
        setLoose((l) => [...l, { key, doy, side, jag, seed: t.seed }]);
      setStubs((s) =>
        [...s, { key, doy, crop: stubPoly(side, W, jag, t.seed) }].slice(-KEEP),
      );
      setCur(doy + 1);
      setSaid(
        doy + 1 >= daysInYear
          ? "That was the last page of the year."
          : `${next.weekday}, ${next.month} ${next.day}.`,
      );
    });
    snap();
    buzz(12, 0);
    if (reduce.current && h) {
      hold.current = null;
      if (stage.current) stage.current.dataset.carry = "false";
    }
  }, [buzz, dayAt, daysInYear, fromSheet, pivot, year, handSpeed]);

  /** a held page following the hand on the pad, and the tear running ahead of it */
  const tearStep = useCallback(
    (dt: number, instant = false) => {
      const h = hold.current;
      const t = tear.current;
      const p = pose.current;
      if (h?.kind !== "tear" || !h.moved) return;
      const H = toSheet(hand.current);
      const D = { x: H.x - h.press.x, y: H.y - h.press.y };
      // how fast the hand is going, which is what decides how cleanly it tears
      const step = Math.hypot(H.x - pace.current.x, H.y - pace.current.y);
      pace.current.x = H.x;
      pace.current.y = H.y;
      pace.current.v +=
        (step / Math.max(dt, 0.001) - pace.current.v) *
        (instant ? 0.6 : 1 - Math.exp(-dt / 0.02));
      // pulling up into the pad tears nothing, so only the outward part counts
      const reach = Math.hypot(D.x, Math.max(0, D.y));
      // until the first few units have torn, the corner is still a choice
      if (reach > 8 && (t.side === 0 || (h.f0 === 0 && t.f < 3))) {
        // pulling the page one way turns it about its top, so the far top
        // corner takes the strain and tears first. A straight pull tears from
        // the side the hand holds.
        const across = D.x / reach;
        const held = (h.g.x - W / 2) / (W / 2);
        const lean = -across + 0.5 * held * (1 - Math.abs(across));
        const side = lean < 0 ? -1 : 1;
        if (side !== t.side) {
          t.side = side;
          t.f = 0;
          t.jag = new Array(HOLES).fill(Number.NaN);
        }
      }
      if (t.side !== 0) {
        let want = Math.min(W, h.f0 + (Math.max(0, reach - 8) * W) / TEAR_SPAN);
        // the tear runs as far as the page has to turn to point at the hand.
        // The turn is measured about the front, which moves as the tear runs,
        // so this settles in a few passes
        for (let k = 0; k < 3; k++) {
          const P = pivotOf(t.side, Math.max(t.f, want), t.jag, t.seed);
          const raw = wrap(
            Math.atan2(H.y - P.y, H.x - P.x) -
              Math.atan2(h.g.y - P.y, h.g.x - P.x),
          );
          const arm = Math.hypot(h.g.x - P.x, h.g.y - P.y);
          if (arm < 24) break;
          want = Math.max(want, tearFor(t.side * raw));
        }
        // the last few holes cannot hold a page that is still being pulled
        if (want >= W - LAST) want = W;
        if (want > t.f) {
          const next =
            instant || want - t.f < 0.25
              ? want
              : t.f + (want - t.f) * (1 - Math.exp(-dt / 0.028));
          t.f = next;
          for (let i = 0; i < HOLES; i++) {
            if (Number.isFinite(t.jag[i])) continue;
            const x = holeX(i);
            const past = t.side < 0 ? x <= t.f : x >= W - t.f;
            if (!past) continue;
            const j = jagOf(pace.current.v);
            t.jag[i] = j;
            pop(j);
            buzz(2, 30);
          }
        }
      }
      // the page turns about the tear's front toward the hand, as far as the
      // untorn part lets it, and what it cannot reach shows as a stretch
      const P = pivot();
      let aim = 0;
      if (t.side !== 0) {
        const arm = Math.hypot(h.g.x - P.x, h.g.y - P.y);
        const raw = wrap(
          Math.atan2(H.y - P.y, H.x - P.x) -
            Math.atan2(h.g.y - P.y, h.g.x - P.x),
        );
        const sigma = t.side;
        aim =
          sigma *
          Math.max(-0.03, Math.min(turnMax(t.f), sigma * raw)) *
          smoothstep(8, 34, arm);
      }
      const was = p.th;
      p.th += (aim - p.th) * (instant ? 1 : 1 - Math.exp(-dt / 0.022));
      p.thv = (p.th - was) / Math.max(dt, 0.001);
      const at = turn(h.g, P, p.th);
      const rx = H.x - at.x;
      const ry = H.y - at.y;
      const r = Math.hypot(rx, ry);
      const give = r > 0.001 ? rubber(r, 4) / r : 0;
      const ease = (tau: number) => (instant ? 1 : 1 - Math.exp(-dt / tau));
      p.ex += (rx * give - p.ex) * ease(0.03);
      p.ey += (ry * give - p.ey) * ease(0.03);
      const liftAim = 6 + 12 * (t.f / W) + Math.min(6, r * 0.05);
      p.lift += (liftAim - p.lift) * ease(0.06);
      p.liftv = 0;
      // the pull reaches the nail, so the calendar leans toward it and dips
      swing.current.aim = -Math.max(-0.035, Math.min(0.035, D.x * 0.0004));
      swing.current.dipAim = Math.min(4, Math.max(0, D.y) * 0.022);
      if (t.f >= W - 0.01) free();
    },
    [buzz, free, pivot, toSheet],
  );

  /* ------------------------------------------------------------- the loop */

  const step = useCallback(
    function loop(now: number) {
      frame.current = 0;
      const dt = Math.max(0, Math.min(0.032, (now - clock.current) / 1000));
      clock.current = now;
      if (dt === 0) {
        frame.current = requestAnimationFrame(loop);
        return;
      }
      let busy = false;

      // the hand that tears a page for you, on a script
      const a = auto.current;
      if (a) {
        busy = true;
        const t = (now - a.at) / 1000;
        let s =
          t < 0.14 ? (AUTO_SPEED * t * t) / 0.28 : AUTO_SPEED * (t - 0.07);
        if (a.free !== null) {
          const u = (now - a.free) / 1000;
          s += 260 * u * u;
          if (u > 0.2) {
            const h = hold.current;
            const b =
              h?.key !== undefined ? bodies.current.get(h.key) : undefined;
            if (b && b.held === -1) {
              b.held = null;
              b.vx = a.dir.x * (AUTO_SPEED + 520 * u);
              b.vy = a.dir.y * (AUTO_SPEED + 520 * u);
            }
            hold.current = null;
            auto.current = null;
          }
        }
        const q = { x: a.start.x + a.dir.x * s, y: a.start.y + a.dir.y * s };
        hand.current = fromSheet(q);
        if (hold.current?.kind === "loose" && a.free === null) a.free = now;
      }

      if (hold.current?.kind === "tear" && hold.current.moved) {
        busy = true;
        tearStep(dt);
        const h = hold.current;
        if (h?.kind === "loose" && h.thrown && h.key !== undefined) {
          const b = bodies.current.get(h.key);
          if (b) {
            b.held = null;
            b.vx = h.thrown.x;
            b.vy = h.thrown.y;
          }
          hold.current = null;
        }
      } else if (hold.current?.kind !== "tear") {
        // a part-torn page let go falls back against the pad and settles
        const t = tear.current;
        const p = pose.current;
        const sigma = t.side || 1;
        const rest =
          t.side === 0
            ? 0
            : sigma * Math.min(turnMax(t.f) * 0.7, 0.2 * (t.f / W));
        const liftRest = 0;
        // a mouse over the page raises it off the pad a little: its shadow
        // opens and it rises a fraction, with no tilt
        const hovAim = hover.current ? 1 : 0;
        p.hov += (hovAim - p.hov) * (1 - Math.exp(-dt / 0.07));
        if (Math.abs(hovAim - p.hov) > 0.004) busy = true;
        else p.hov = hovAim;
        p.thv += (BACK_STIFF * (rest - p.th) - BACK_DAMP * p.thv) * dt;
        p.th += p.thv * dt;
        p.liftv +=
          (BACK_STIFF * (liftRest - p.lift) - BACK_DAMP * p.liftv) * dt;
        p.lift += p.liftv * dt;
        p.ex += (0 - p.ex) * (1 - Math.exp(-dt / 0.05));
        p.ey += (0 - p.ey) * (1 - Math.exp(-dt / 0.05));
        if (
          Math.abs(rest - p.th) > 0.0005 ||
          Math.abs(p.thv) > 0.005 ||
          Math.abs(liftRest - p.lift) > 0.02 ||
          Math.abs(p.liftv) > 0.05 ||
          Math.abs(p.ex) + Math.abs(p.ey) > 0.02
        )
          busy = true;
      }

      // the calendar swings on its nail
      const sw = swing.current;
      if (reduce.current) {
        sw.a = 0;
        sw.av = 0;
        sw.dip = 0;
      } else {
        sw.av += (SWAY_W * SWAY_W * (sw.aim - sw.a) - SWAY_DAMP * sw.av) * dt;
        sw.a += sw.av * dt;
        sw.dip += (sw.dipAim - sw.dip) * (1 - Math.exp(-dt / 0.08));
        if (
          Math.abs(sw.a - sw.aim) > 0.001 ||
          Math.abs(sw.av) > 0.004 ||
          Math.abs(sw.dip - sw.dipAim) > 0.02
        )
          busy = true;
        else {
          // a twentieth of a degree from rest is rest
          sw.a = sw.aim;
          sw.av = 0;
          sw.dip = sw.dipAim;
        }
      }

      // loose pages: hanging from a hand, or falling
      const { h: viewH, k, oy, w: viewW } = view.current;
      const floor = (viewH - oy) / k;
      const gone: number[] = [];
      for (const [key, b] of bodies.current) {
        if (b.gone) continue;
        busy = true;
        const cx = W / 2 - b.g.x;
        const cy = (PERF + SH) / 2 - b.g.y;
        const L = Math.max(30, Math.hypot(cx, cy));
        if (b.held !== null) {
          // the grab point follows the hand, and the page swings beneath it
          const ox = b.x;
          const oyy = b.y;
          const vxWas = b.vx;
          const vyWas = b.vy;
          b.x += (hand.current.x - b.x) * (1 - Math.exp(-dt / 0.03));
          b.y += (hand.current.y - b.y) * (1 - Math.exp(-dt / 0.03));
          b.vx = (b.x - ox) / dt;
          b.vy = (b.y - oyy) / dt;
          b.ax += ((b.vx - vxWas) / dt - b.ax) * 0.3;
          b.ay += ((b.vy - vyWas) / dt - b.ay) * 0.3;
          const A = b.phi + Math.atan2(cy, cx);
          const w0 = Math.sqrt(HANG_G / L);
          const acc =
            (b.ax * Math.sin(A) + (HANG_G - b.ay) * Math.cos(A)) / L -
            2 * HANG_DAMP * w0 * b.w;
          b.w += Math.max(-400, Math.min(400, acc)) * dt;
          b.phi += b.w * dt;
          b.rock *= Math.exp(-dt / 0.1);
          b.rx +=
            (Math.max(-14, Math.min(14, b.vy * 0.012)) - b.rx) *
            (1 - Math.exp(-dt / 0.12));
          b.ry +=
            (Math.max(-26, Math.min(26, b.w * 7)) - b.ry) *
            (1 - Math.exp(-dt / 0.1));
        } else {
          // a leaf: it falls toward a slow terminal speed and drifts as it rocks
          b.t += dt;
          const ramp = 1 - Math.exp(-b.t / 0.45);
          const wave = FLUTTER * b.t + b.ph;
          b.vx += (520 * Math.cos(wave) * ramp - DRAG_X * b.vx) * dt;
          b.vy += (FALL_G - DRAG_Y * b.vy) * dt;
          b.x += b.vx * dt;
          b.y += b.vy * dt;
          b.w *= Math.exp(-dt / 0.75);
          b.phi += b.w * dt;
          b.rock = 0.24 * Math.sin(wave) * ramp;
          b.rx = 34 * Math.sin(wave * 0.94 + 1.1) * ramp + (1 - ramp) * b.rx;
          b.ry = 20 * Math.sin(wave * 0.6 + b.ph) * ramp;
          // each turn of the rock brushes the air
          const turnNo = Math.floor((wave - b.ph) / Math.PI);
          if (turnNo !== b.swished && ramp > 0.4) {
            b.swished = turnNo;
            swish(Math.min(1, ramp) * 0.8);
          }
          if (b.y > floor + 320 || b.x < -360 || b.x > viewW + 360) {
            b.gone = true;
            gone.push(key);
          }
        }
      }
      if (gone.length) {
        for (const key of gone) bodies.current.delete(key);
        setLoose((l) => l.filter((x) => !gone.includes(x.key)));
      }

      paint();
      if (busy) frame.current = requestAnimationFrame(loop);
    },
    [fromSheet, paint, tearStep],
  );

  const run = useCallback(() => {
    if (frame.current) return;
    clock.current = performance.now();
    frame.current = requestAnimationFrame(step);
  }, [step]);

  /* ------------------------------------------------------------- the hand */

  type Hit =
    | { kind: "loose"; key: number; local: V }
    | { kind: "page"; local: V }
    | { kind: "pad" }
    | null;

  const hitTest = useCallback(
    (p: V): Hit => {
      // loose pages first, the newest is in front
      const keys = [...bodies.current.keys()].reverse();
      for (const key of keys) {
        const b = bodies.current.get(key);
        if (!b || b.gone || b.held === -1) continue;
        const q = turn(
          { x: p.x - b.x, y: p.y - b.y },
          { x: 0, y: 0 },
          -(b.phi + b.rock),
        );
        const local = { x: q.x + b.g.x, y: q.y + b.g.y };
        if (
          local.x >= -4 &&
          local.x <= W + 4 &&
          local.y >= PERF - 6 &&
          local.y <= SH + 4
        )
          return { kind: "loose", key, local };
      }
      const q = toSheet(p);
      if (curRef.current < daysInYear) {
        const local = unpose(q);
        if (
          local.x >= 0 &&
          local.x <= W &&
          local.y >= PERF - 2 &&
          local.y <= SH
        )
          return { kind: "page", local };
      }
      const c = { x: q.x + SX, y: q.y + SY };
      if (
        c.x >= HEADER.x &&
        c.x <= HEADER.x + HEADER.w &&
        c.y >= HEADER.y - 10 &&
        c.y <= SY + SH
      )
        return { kind: "pad" };
      return null;
    },
    [daysInYear, toSheet, unpose],
  );

  const hitRef = useRef(hitTest);
  hitRef.current = hitTest;

  /** tear the page for you, from a corner, at a speed that tears it cleanly */
  const tearForYou = useCallback(
    (from?: V) => {
      if (hold.current || auto.current || curRef.current >= daysInYear) return;
      arm();
      const t = tear.current;
      // a tap pulls toward its own side, which tears from the other corner
      const side: -1 | 1 =
        t.side !== 0 ? t.side : from && from.x < W / 2 ? 1 : -1;
      const at = from ?? { x: side < 0 ? W - 26 : 26, y: SH - 30 };
      const start = (() => {
        const P = pivot();
        const p = pose.current;
        const q = turn(at, P, p.th);
        return { x: q.x + p.ex, y: q.y + p.ey };
      })();
      if (reduce.current) {
        // the page goes in one step, torn cleanly
        if (t.side === 0) {
          t.side = side;
          t.jag = new Array(HOLES).fill(Number.NaN);
        }
        t.jag = t.jag.map((j) => (Number.isFinite(j) ? j : 0));
        t.f = W;
        pop(0);
        free();
        paint();
        return;
      }
      const dir = { x: -side * 0.6, y: 0.8 };
      hold.current = {
        kind: "tear",
        id: -1,
        press: start,
        g: at,
        f0: t.f,
        cx: 0,
        cy: 0,
        moved: true,
      };
      if (t.side === 0) {
        t.side = side;
        t.jag = new Array(HOLES).fill(Number.NaN);
      }
      auto.current = { at: performance.now(), start, dir, free: null };
      pace.current = { x: start.x, y: start.y, v: 0 };
      hand.current = fromSheet(start);
      run();
    },
    [daysInYear, free, fromSheet, paint, pivot, run, arm],
  );

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || hold.current || auto.current) return;
    const p = toScene(e.clientX, e.clientY);
    const hit = hitTest(p);
    if (!hit) return;
    arm();
    if (hit.kind === "pad") {
      // a knock on the header sets the calendar swinging on its nail
      if (!reduce.current) {
        const c = toSheet(p).x + SX;
        swing.current.av += (c < 0 ? 1 : -1) * 0.55;
        pat();
        run();
      }
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    hand.current = p;
    trail.current = [];
    record(p);
    if (hit.kind === "loose") {
      // a falling page caught where it is, held at the point that was caught
      const b = bodies.current.get(hit.key);
      if (!b) return;
      b.g = hit.local;
      b.x = p.x;
      b.y = p.y;
      b.phi += b.rock;
      b.rock = 0;
      b.held = e.pointerId;
      b.ax = 0;
      b.ay = 0;
      hold.current = {
        kind: "loose",
        key: hit.key,
        id: e.pointerId,
        press: p,
        g: hit.local,
        f0: 0,
        cx: e.clientX,
        cy: e.clientY,
        moved: true,
      };
      if (stage.current) stage.current.dataset.carry = "true";
      pat();
      run();
      return;
    }
    const press = toSheet(p);
    pace.current = { x: press.x, y: press.y, v: 0 };
    hold.current = {
      kind: "tear",
      id: e.pointerId,
      press,
      g: hit.local,
      f0: tear.current.f,
      cx: e.clientX,
      cy: e.clientY,
      moved: false,
    };
  };

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const p = toScene(e.clientX, e.clientY);
    const h = hold.current;
    if (!h || h.id !== e.pointerId) {
      // a mouse over the page lifts it a little, which says it can be taken
      if (h || auto.current) return;
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const hit = hitTest(p);
      const over = hit?.kind === "page" || hit?.kind === "loose";
      const el = stage.current;
      if (el) el.dataset.over = hit ? (over ? "page" : "pad") : "none";
      const lift = hit?.kind === "page";
      if (lift !== hover.current) {
        hover.current = lift;
        if (!reduce.current) run();
      }
      return;
    }
    hand.current = p;
    record(p);
    if (h.kind === "tear" && !h.moved) {
      if (Math.hypot(e.clientX - h.cx, e.clientY - h.cy) < SLOP) return;
      h.moved = true;
      hover.current = false;
      if (stage.current) stage.current.dataset.carry = "true";
    }
    if (reduce.current && h.kind === "tear") {
      // the time since the last move, so a yank still tears ragged
      const tr = trail.current;
      const newest = tr.at(-1);
      const before = tr.at(-2);
      const gap = newest && before ? (newest.t - before.t) / 1000 : 0.016;
      tearStep(Math.max(0.004, gap), true);
      // a direct pull lands where the hand is, with nothing easing behind it
      paint();
      return;
    }
    run();
  };

  const onUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const h = hold.current;
    if (!h || h.id !== e.pointerId) return;
    hold.current = null;
    if (stage.current) stage.current.dataset.carry = "false";
    if (h.kind === "tear" && !h.moved) {
      tearForYou(h.g);
      return;
    }
    if (h.kind === "loose" && h.key !== undefined) {
      const b = bodies.current.get(h.key);
      if (b) {
        const v = handSpeed();
        b.held = null;
        b.vx = v.x;
        b.vy = v.y;
        b.t = 0;
      }
      run();
      return;
    }
    // pulled far enough to tear through, the tear finishes after the hand has gone
    if (h.kind === "tear" && tear.current.side !== 0 && !reduce.current) {
      const H = toSheet(hand.current);
      const reach = Math.hypot(H.x - h.press.x, Math.max(0, H.y - h.press.y));
      if (h.f0 + (Math.max(0, reach - 6) * W) / TEAR_SPAN >= W) {
        hold.current = { ...h, id: -2, thrown: handSpeed() };
        run();
        return;
      }
    }
    // a part-torn page falls back against the pad
    swing.current.aim = 0;
    swing.current.dipAim = 0;
    if (tear.current.f > 0) pat();
    if (reduce.current) {
      const t = tear.current;
      const p = pose.current;
      p.th =
        t.side === 0
          ? 0
          : (t.side || 1) * Math.min(turnMax(t.f) * 0.7, 0.2 * (t.f / W));
      p.thv = 0;
      p.lift = 0;
      p.ex = 0;
      p.ey = 0;
      paint();
      return;
    }
    run();
  };

  const onLeave = () => {
    if (hover.current) {
      hover.current = false;
      if (!reduce.current) run();
    }
    if (stage.current && !hold.current) stage.current.dataset.over = "none";
  };

  /* ---------------------------------------------------------- the keyboard */

  const onKey = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    if (e.repeat) return;
    tearForYou();
  };

  /** a click no key produced, which is what an assistive technology sends */
  const onClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (e.detail === 0) tearForYou();
  };

  const backToToday = () => {
    tear.current = { side: 0, f: 0, jag: [], seed: seedOf(year, todayDoy) };
    pose.current = { th: 0, thv: 0, lift: 0, liftv: 0, ex: 0, ey: 0, hov: 0 };
    crop.current = "";
    setCur(todayDoy);
    setStubs(seeded(year, todayDoy));
    const d = dayAt(todayDoy);
    setSaid(`Back to today, ${d.weekday}, ${d.month} ${d.day}.`);
  };

  /* ------------------------------------------------------------ the stage */

  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const k = Math.min(w / BOX.w, h / BOX.h);
      const oy = (h - SPAN * k) / 2;
      view.current = { k, oy, w: w / k, h };
      if (scene.current)
        scene.current.style.transform = `translate(0px, ${oy.toFixed(2)}px) scale(${k.toFixed(4)})`;
      paint();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [paint]);

  // a new page on top starts flat and whole
  useLayoutEffect(() => {
    if (tear.current.seed !== seedOf(year, cur))
      tear.current = { side: 0, f: 0, jag: [], seed: seedOf(year, cur) };
    crop.current = "";
    paint();
  });

  /*
   * A finger on a page is the page's, so the browser must not take it for a
   * scroll. Anywhere else on the stage a swipe still scrolls the page.
   */
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const r = el.getBoundingClientRect();
      const { k, oy } = view.current;
      const hit = hitRef.current({
        x: (touch.clientX - r.left) / k,
        y: (touch.clientY - r.top - oy) / k,
      });
      if (hit && hit.kind !== "pad") e.preventDefault();
    };
    el.addEventListener("touchstart", onTouch, { passive: false });
    return () => el.removeEventListener("touchstart", onTouch);
  }, []);

  useEffect(() => {
    const f = frame;
    return () => cancelAnimationFrame(f.current);
  }, []);

  /* --------------------------------------------------------------- render */

  const label = (doy: number) =>
    fromToday(addDays(new Date(year, 0, 1), doy), today);
  const curDay = empty ? null : dayAt(cur);
  const remaining = Math.max(0, daysInYear - cur - 1);
  const thick =
    remaining > 0 ? 1.5 + (remaining / daysInYear) * (STACK - 1.5) : 0;

  return (
    <div
      ref={stage}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={onLeave}
      data-over="none"
      className="relative h-[25rem] w-full select-none overflow-hidden rounded-lg bg-muted/60 data-[carry=true]:cursor-grabbing data-[over=pad]:cursor-pointer data-[over=page]:cursor-grab data-[carry=true]:[&_*]:cursor-grabbing"
    >
      {/* a light falling on the wall from above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 22%, var(--background), transparent 72%)",
        }}
      />

      <div
        ref={scene}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 origin-top-left"
        style={{ width: BOX.w, height: BOX.h, perspective: 900 }}
      >
        {/* the calendar, which turns about the nail */}
        <div
          ref={calendar}
          className="absolute top-0 left-0 will-change-transform"
          style={{
            perspective: 700,
            perspectiveOrigin: `0px ${SY + SH / 2}px`,
          }}
        >
          {/* its shadow on the wall */}
          <div
            className="absolute rounded-md"
            style={{
              left: HEADER.x + 6,
              top: HEADER.y + 10,
              width: HEADER.w - 12,
              height: SY + SH + thick - HEADER.y - 6,
              background: "rgba(0, 0, 0, 0.28)",
              filter: "blur(9px)",
              transform: "translate(5px, 9px)",
            }}
          />

          {/* the board under the pages, which is all that is left at the year's end */}
          <div
            className="absolute flex items-center justify-center rounded-b-[3px]"
            style={{
              left: SX,
              top: SY,
              width: W,
              height: SH + thick + 1.5,
              background: "#d4d4d8",
              boxShadow: "inset 0 0 0 0.75px rgba(0,0,0,0.12)",
            }}
          >
            {empty ? (
              <span
                className="font-medium"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  color: "#737373",
                }}
              >
                That was {year}.
              </span>
            ) : null}
          </div>

          {/* the edge of the pad: thinner the further into the year it is */}
          {thick > 0 ? (
            <div
              className="absolute rounded-b-[2px]"
              style={{
                left: SX,
                top: SY + SH - 0.5,
                width: W,
                height: thick + 0.5,
                background:
                  "repeating-linear-gradient(to bottom, #f7f7f6 0 0.85px, #d4d4d2 0.85px 1.35px)",
                boxShadow: "0 1px 1.5px rgba(0,0,0,0.18)",
              }}
            />
          ) : null}

          {/* the page behind, which is tomorrow */}
          {cur + 1 < daysInYear ? (
            <div
              className="absolute"
              style={{ left: SX, top: SY, width: W, height: SH }}
            >
              <Sheet day={dayAt(cur + 1)} label={label(cur + 1)} />
            </div>
          ) : null}

          {/* the page on top: its shadow, the part that comes away, and the
              margin above the holes that stays */}
          {curDay ? (
            <>
              {/* the blur is on the outer box and the crop on the inner one,
                  since a filter runs before a clip and would be cut hard */}
              <div
                key={`sh-${cur}`}
                ref={pageShadow}
                className="absolute origin-top-left"
                style={{ left: SX, top: SY, width: W, height: SH, opacity: 0 }}
              >
                <div
                  ref={pageShade}
                  className="absolute inset-0"
                  style={{ background: "rgb(10, 10, 10)" }}
                />
              </div>
              <div
                key={`pg-${cur}`}
                ref={page}
                className="absolute origin-top-left"
                style={{ left: SX, top: SY, width: W, height: SH }}
              >
                <Sheet day={curDay} label={label(cur)} />
              </div>
              <div
                key={`st-${cur}`}
                ref={stub}
                className="absolute"
                style={{ left: SX, top: SY, width: W, height: SH }}
              >
                <Sheet day={curDay} label={label(cur)} />
              </div>
            </>
          ) : null}

          {/* what earlier pages left behind, the oldest in front */}
          {[...stubs].reverse().map((s) => (
            <div
              key={s.key}
              className="absolute"
              style={{
                left: SX,
                top: SY,
                width: W,
                height: SH,
                // each bit keeps its own faint shadow, which is what tells them apart
                filter: "drop-shadow(0 0.7px 0.7px rgba(0,0,0,0.12))",
              }}
            >
              <div className="absolute inset-0" style={{ clipPath: s.crop }}>
                <Sheet day={dayAt(s.doy)} label={label(s.doy)} />
              </div>
            </div>
          ))}

          {/* the header's shadow across the top of the pad */}
          <div
            className="absolute"
            style={{
              left: SX,
              top: HEADER.y + HEADER.h,
              width: W,
              height: 7,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.22), rgba(0,0,0,0))",
            }}
          />

          {/* the board the pad is glued under */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: HEADER.x,
              top: HEADER.y,
              width: HEADER.w,
              height: HEADER.h,
              borderRadius: HEADER.r,
              background:
                "linear-gradient(to bottom, #2c2c2c, #171717 55%, #0f0f0f)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.35), 0 1px 1.5px rgba(0,0,0,0.25), 0 3px 8px rgba(0,0,0,0.12)",
            }}
          >
            <span
              className="flex items-baseline"
              style={{ gap: 7, marginTop: 13, color: "#fff" }}
            >
              <span
                className="font-redaction"
                style={{
                  fontSize: 19,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  lineHeight: 1,
                }}
              >
                uitopia
              </span>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                  lineHeight: 1,
                  opacity: 0.55,
                }}
              >
                {year}
              </span>
            </span>
            {/* the two rivets that hold the pad */}
            {[-1, 1].map((s) => (
              <span
                key={s}
                className="absolute rounded-full"
                style={{
                  left: HEADER.w / 2 + s * 72 - 2.4,
                  bottom: 7,
                  width: 4.8,
                  height: 4.8,
                  background:
                    "radial-gradient(circle at 35% 35%, #f5f5f5, #a3a3a3 60%, #525252)",
                  boxShadow: "0 0.5px 0.8px rgba(0,0,0,0.5)",
                }}
              />
            ))}
          </div>

          {/* the eyelets and the string running into them */}
          <svg
            className="absolute overflow-visible"
            style={{ left: 0, top: 0 }}
            width={1}
            height={1}
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <radialGradient id="tc-brass" cx="0.35" cy="0.35" r="0.75">
                <stop offset="0" stopColor="#f5f5f5" />
                <stop offset="0.55" stopColor="#a3a3a3" />
                <stop offset="1" stopColor="#525252" />
              </radialGradient>
            </defs>
            {[-1, 1].map((s) => (
              <g key={s} transform={`translate(${s * EYELET.dx} ${EYELET.y})`}>
                <circle r={EYELET.r + 0.6} fill="#000" opacity={0.3} cy={0.6} />
                <circle r={EYELET.r} fill="url(#tc-brass)" />
                <circle r={EYELET.r * 0.5} fill="#121214" />
                {/* the string runs from the nail into the hole */}
                <line
                  x1={-s * EYELET.dx}
                  y1={-EYELET.y}
                  x2={0}
                  y2={0}
                  stroke="#262626"
                  strokeWidth={1.3}
                  strokeLinecap="round"
                />
              </g>
            ))}
          </svg>

          {/* the keyboard's way in, over the page, drawing nothing but its focus */}
          {curDay ? (
            <button
              type="button"
              aria-label={`Tear off ${curDay.weekday}, ${curDay.month} ${curDay.day}`}
              aria-describedby="tc-about"
              onKeyDown={onKey}
              onClick={onClick}
              className="pointer-events-none absolute rounded-[3px] outline-offset-4 focus-visible:outline-2 focus-visible:outline-foreground/40"
              style={{ left: SX, top: SY + PERF, width: W, height: SH - PERF }}
            />
          ) : null}
        </div>

        {/* the nail, over the string looped on it */}
        <div
          ref={nailEl}
          className="absolute rounded-full"
          style={{
            top: NAIL_Y - 3.2,
            width: 6.4,
            height: 6.4,
            background:
              "radial-gradient(circle at 35% 30%, #f4f4f2, #a7a8aa 55%, #5d5e61)",
            boxShadow: "1px 2px 2px rgba(0,0,0,0.28)",
          }}
        />

        {/* pages in the air, in front of everything */}
        {loose.map((l) => (
          <LoosePage
            key={l.key}
            page={l}
            day={dayAt(l.doy)}
            label={label(l.doy)}
            register={(el, sh) => {
              if (el && sh) {
                nodes.current.set(l.key, { el, sh });
                paint();
              } else nodes.current.delete(l.key);
            }}
          />
        ))}
      </div>

      <AnimatePresence initial={false}>
        {cur !== todayDoy ? (
          <motion.div
            key="back"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.12 } }}
            transition={
              reduceValue
                ? { duration: 0 }
                : { type: "spring", duration: 0.35, bounce: 0.2 }
            }
            className="absolute top-3 right-3 z-10"
          >
            <button
              type="button"
              aria-label="Back to today"
              title="Back to today"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={backToToday}
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-foreground/6 text-muted-foreground transition-colors duration-200 hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/15 focus-visible:ring-offset-2 focus-visible:ring-offset-muted active:bg-foreground/15 active:duration-0"
            >
              <RotateCcw aria-hidden="true" className="size-4" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <p id="tc-about" className="sr-only">
        A tear-off calendar with a page a day. Drag a page down to tear it off:
        slowly for a clean tear, fast for a ragged one. Enter tears it for you.
      </p>
      <p aria-live="polite" className="sr-only">
        {said}
      </p>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-foreground/8 ring-inset"
      />
    </div>
  );
}

function LoosePage({
  page,
  day,
  label,
  register,
}: {
  page: Loose;
  day: Day;
  label: string;
  register: (el: HTMLDivElement | null, sh: HTMLDivElement | null) => void;
}) {
  const el = useRef<HTMLDivElement>(null);
  const sh = useRef<HTMLDivElement>(null);
  const poly = useMemo(
    () => pagePoly(page.side, W, page.jag, page.seed),
    [page.side, page.jag, page.seed],
  );
  const reg = useRef(register);
  reg.current = register;
  useLayoutEffect(() => {
    reg.current(el.current, sh.current);
    return () => reg.current(null, null);
  }, []);
  return (
    <>
      <div
        ref={sh}
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: W, height: SH, opacity: 0.14, filter: "blur(7px)" }}
      >
        <div
          className="absolute inset-0"
          style={{ clipPath: poly, background: "rgb(10, 10, 10)" }}
        />
      </div>
      <div
        ref={el}
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: W, height: SH, clipPath: poly }}
      >
        <Sheet day={day} label={label} />
      </div>
    </>
  );
}
