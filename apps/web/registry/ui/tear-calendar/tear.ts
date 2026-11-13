/**
 * The calendar's geometry and the tear, pure and DOM-free, in design units.
 *
 * The calendar hangs from a nail at the origin. A page is a sheet `W` by `SH`
 * whose top is glued under the header, with a row of holes punched across it
 * at `PERF`. Tearing a page is two numbers: which corner the tear started
 * from, and how far along the perforation it has run, `f`, which only ever
 * grows. How fast the hand was moving as the tear passed each hole decides how
 * cleanly that hole tore, and the torn edge is drawn from those numbers.
 */

/** the header board the pad is glued under, and the eyelets the string runs through */
export const HEADER = { x: -90, y: 34, w: 180, h: 50, r: 7 } as const;
export const EYELET = { dx: 52, y: 46, r: 3.4 } as const;

/** a page, its place under the header, and the line of holes across it */
export const SX = -84;
export const SY = 80;
export const W = 168;
export const SH = 222;
export const PERF = 15;
export const HOLES = 26;
export const PITCH = W / HOLES;
export const HOLE_R = 1.05;

/** the most the pad's edge shows at the foot, when it is a whole year thick */
export const STACK = 9;

/** how much the untorn part of the page can give before it has to tear */
const GIVE = 13;

/** the hand travel that tears a page across, in design units */
export const TEAR_SPAN = 118;

/** how many points a torn edge is drawn through, one every 1.5 units */
const STEP = 1.5;

/* ------------------------------------------------------------------ noise */

function hash(n: number, seed: number): number {
  let h = (Math.imul(n | 0, 0x27d4eb2d) ^ Math.imul(seed | 0, 0x165667b1)) | 0;
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** smooth value noise in [0, 1), a lattice point every `spacing` units */
function noise(x: number, spacing: number, seed: number): number {
  const u = x / spacing;
  const i = Math.floor(u);
  const t = u - i;
  const e = t * t * (3 - 2 * t);
  return hash(i, seed) * (1 - e) + hash(i + 1, seed) * e;
}

export function smoothstep(a: number, b: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/* ------------------------------------------------------------------ tears */

/** a hole's centre, across the sheet */
export function holeX(i: number): number {
  return (i + 0.5) * PITCH;
}

/**
 * How ragged a hole tore, from how fast the hand was moving as the tear passed
 * it, in design units a second. A slow pull pops the holes one by one and the
 * paper parts along them. A yank outruns the perforation, and the tear wanders
 * off it.
 */
export function jagOf(speed: number): number {
  return smoothstep(420, 1700, speed);
}

/** the raggedness at `x`, between the holes on either side of it */
function jagAt(jag: readonly number[], x: number): number {
  const u = x / PITCH - 0.5;
  const i = Math.max(0, Math.min(HOLES - 1, Math.floor(u)));
  const j = Math.min(HOLES - 1, i + 1);
  const t = Math.max(0, Math.min(1, u - i));
  const ai = jag[i];
  const bj = jag[j];
  const a = ai !== undefined && Number.isFinite(ai) ? ai : 0;
  const b = bj !== undefined && Number.isFinite(bj) ? bj : a;
  return a + (b - a) * t;
}

/**
 * Where the tear runs at `x`. Clean, it is the line of holes. Ragged, it
 * wanders: mostly down into the page, which leaves a bite of it stuck under the
 * header, and a little up into the margin, which the page takes with it.
 */
export function tearY(x: number, jag: readonly number[], seed: number): number {
  const j = jagAt(jag, x) ** 1.15;
  if (j < 0.002) return PERF;
  const wander = noise(x, 11, seed) * 1.4 - 0.32;
  const fibre = noise(x, 3.2, seed + 7) - 0.5;
  // now and then the tear runs well down into the page and back, which is the
  // bite a yank leaves stuck under the header
  const bite = noise(x, 27, seed + 3) ** 2.2 * 16;
  return PERF + j * (wander * 9 + bite + fibre * 1.1);
}

/** the part of the perforation that has torn, from the corner it started at */
export function tornSpan(side: -1 | 1, f: number): [number, number] {
  return side < 0 ? [0, f] : [W - f, W];
}

/** where the tear has got to, which is what the page turns about */
export function pivotOf(
  side: -1 | 1,
  f: number,
  jag: readonly number[],
  seed: number,
): { x: number; y: number } {
  const x = side < 0 ? f : W - f;
  return { x, y: tearY(x, jag, seed) };
}

/** the furthest a page turns while any of it holds: past that, the rest lets go */
export const TURN_MAX = (50 * Math.PI) / 180;

/**
 * The most a page can turn about the tear's front, which is as far as the
 * untorn part beyond it can give: turning lifts that part into the paper above
 * the holes, and only a few units of it can bend. So the page hardly turns
 * while most of it holds, and swings free as the last of it goes.
 */
export function turnMax(f: number): number {
  const left = W - f;
  if (left * Math.sin(TURN_MAX) <= GIVE) return TURN_MAX;
  return Math.asin(GIVE / left);
}

/**
 * How far the tear has to have run for the page to turn by `a`, which is
 * `turnMax` the other way round. A hand that turns the page tears it as far as
 * the turn needs, and one that turns it past `TURN_MAX` tears it off.
 */
export function tearFor(a: number): number {
  if (a <= Math.asin(GIVE / W)) return 0;
  if (a >= TURN_MAX) return W;
  return W - GIVE / Math.sin(a);
}

function xs(a: number, b: number): number[] {
  const out: number[] = [];
  for (let x = a; x < b; x += STEP) out.push(x);
  out.push(b);
  return out;
}

const n = (v: number) => v.toFixed(2);

/**
 * The page that comes away, as a polygon in the sheet's own units. Its top is
 * the torn edge where the tear has run and the line of holes where it has not.
 * The untorn part reaches a little above the holes, since it sits behind the
 * paper above them and an exact meeting line would show a seam.
 */
export function pagePoly(
  side: -1 | 1 | 0,
  f: number,
  jag: readonly number[],
  seed: number,
): string {
  const top = PERF - 2;
  if (side === 0 || f <= 0)
    return `polygon(0 ${top}px, ${W}px ${top}px, ${W}px ${SH}px, 0 ${SH}px)`;
  const [a, b] = tornSpan(side, f);
  const pts: string[] = [];
  if (a > 0) pts.push(`0 ${top}px`, `${n(a)}px ${top}px`);
  for (const x of xs(a, b)) pts.push(`${n(x)}px ${n(tearY(x, jag, seed))}px`);
  if (b < W) pts.push(`${n(b)}px ${top}px`, `${W}px ${top}px`);
  pts.push(`${W}px ${SH}px`, `0 ${SH}px`);
  return `polygon(${pts.join(", ")})`;
}

/** what stays glued under the header: the margin above the tear */
export function stubPoly(
  side: -1 | 1 | 0,
  f: number,
  jag: readonly number[],
  seed: number,
): string {
  const pts = ["0 -6px", `${W}px -6px`];
  const along = (x: number) => {
    if (side === 0 || f <= 0) return PERF;
    const [a, b] = tornSpan(side, f);
    return x >= a && x <= b ? tearY(x, jag, seed) : PERF;
  };
  const edge = xs(0, W).reverse();
  for (const x of edge) pts.push(`${n(x)}px ${n(along(x))}px`);
  return `polygon(${pts.join(", ")})`;
}

/** the UIScrollView rubber band, giving a falling share of `over` up to `reach` */
export function rubber(over: number, reach: number): number {
  const c = 0.55;
  return (over * reach * c) / (reach + c * Math.abs(over));
}

/** a 2D point turned by `a` about `o` */
export function turn(
  p: { x: number; y: number },
  o: { x: number; y: number },
  a: number,
): { x: number; y: number } {
  const c = Math.cos(a);
  const s = Math.sin(a);
  const dx = p.x - o.x;
  const dy = p.y - o.y;
  return { x: o.x + dx * c - dy * s, y: o.y + dx * s + dy * c };
}

/** the shortest signed turn from `a` to `b` */
export function wrap(a: number): number {
  return Math.atan2(Math.sin(a), Math.cos(a));
}
