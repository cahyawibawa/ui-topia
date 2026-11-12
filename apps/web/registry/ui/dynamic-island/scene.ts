/**
 * Adapted from the live-activities lab on Sanyam Punia's site
 * (https://github.com/SanyamPunia/www), used with his permission.
 */
/*
 * What the island shows, as a pure function of the activity state.
 *
 * The island is one shape with a size per situation, in the phone's own design
 * pixels. `compute` picks the view the island shows and the size it springs
 * to, and, when two activities run at once, the one that pinches off into a
 * bubble beside it. Nothing here knows about the DOM.
 */

export type Act = "timer" | "music" | "call";
export type Transient = "charging" | "silent";

export interface Activities {
  /** running activities, most recent first */
  acts: Act[];
  expanded: Act | null;
  transient: Transient | null;
  ringing: boolean;
  silent: boolean;
}

export type SizeKey =
  | "idle"
  | "compact"
  | "split"
  | "charging"
  | "silent"
  | "e-timer"
  | "e-music"
  | "e-call"
  | "incoming";

/** width and height of each island shape, in phone pixels */
export const SIZE: Record<SizeKey, readonly [number, number]> = {
  idle: [126, 37],
  compact: [252, 37],
  split: [206, 37],
  charging: [318, 37],
  silent: [236, 37],
  "e-timer": [371, 84],
  "e-music": [371, 184],
  "e-call": [371, 84],
  incoming: [371, 84],
};

export interface Shape {
  /** the view the main island shows */
  main: string;
  size: SizeKey;
  /** the second activity, shown as a bubble beside the island */
  bubble?: Act;
}

/** a call always takes the main island, the rest keep their order */
function ordered(acts: readonly Act[]): Act[] {
  return [...acts].sort((a, b) => Number(b === "call") - Number(a === "call"));
}

export function compute(s: Activities): Shape {
  if (s.ringing) return { main: "incoming", size: "incoming" };
  if (s.transient) return { main: s.transient, size: s.transient };
  const list = ordered(s.acts);
  if (s.expanded && list.includes(s.expanded)) {
    const key = `e-${s.expanded}` as const;
    return { main: key, size: key };
  }
  const [first, second] = list;
  if (!first) return { main: "idle", size: "idle" };
  if (second) return { main: `c-${first}`, size: "split", bubble: second };
  return { main: `c-${first}`, size: "compact" };
}

export const isExpanded = (main: string) =>
  main.startsWith("e-") || main === "incoming";

/** what a screen reader hears for the island in each view */
export function label(main: string, silent: boolean): string {
  const names: Record<string, string> = {
    idle: "Dynamic Island, no activity",
    "c-timer": "Timer running, press to expand",
    "c-music": "Now playing Low Tide, press to expand",
    "c-call": "Call in progress, press to expand",
    charging: "Charging, 82 percent",
    silent: silent ? "Silent mode on" : "Ring mode on",
    "e-timer": "Timer controls",
    "e-music": "Music controls",
    "e-call": "Call controls",
    incoming: "Incoming call from Mira Okafor",
  };
  return names[main] ?? "Dynamic Island";
}

/** seconds as m:ss */
export function clock(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * A spring stepped by hand, with its damping as a ratio so the same numbers
 * read the same at any stiffness. Under reduced motion it lands in one step.
 */
export class Spring {
  x: number;
  v = 0;
  t: number;
  k = 0;
  c = 0;

  constructor(x: number, k: number, zeta: number) {
    this.x = x;
    this.t = x;
    this.set(k, zeta);
  }

  set(k: number, zeta: number) {
    this.k = k;
    this.c = 2 * Math.sqrt(k) * zeta;
  }

  step(dt: number) {
    const a = -this.k * (this.x - this.t) - this.c * this.v;
    this.v += a * dt;
    this.x += this.v * dt;
  }

  /** settled when under a tenth of a pixel away and barely moving */
  get rest() {
    return Math.abs(this.x - this.t) < 0.1 && Math.abs(this.v) < 0.5;
  }

  land() {
    this.x = this.t;
    this.v = 0;
  }
}
