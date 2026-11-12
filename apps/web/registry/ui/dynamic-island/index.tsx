"use client";

/**
 * Adapted from the live-activities lab on Sanyam Punia's site
 * (https://github.com/SanyamPunia/www), used with his permission.
 */

import { useReducedMotion } from "motion/react";
import type React from "react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/registry/lib/utils";
import { roll } from "./digits";
import {
  BatteryGlyph,
  BellGlyph,
  CameraGlyph,
  CrossGlyph,
  MicGlyph,
  NextGlyph,
  PauseGlyph,
  PhoneGlyph,
  PlayGlyph,
  PrevGlyph,
  SignalGlyph,
  TorchGlyph,
  WifiGlyph,
} from "./glyphs";
import {
  type Act,
  type Activities,
  clock,
  compute,
  isExpanded,
  label,
  SIZE,
  Spring,
  type Transient,
} from "./scene";
import { SwapIcon, SwapText } from "./swap";

/*
 * A phone's Dynamic Island running live activities: a timer, a song, a call,
 * a charger plugged in and the silent switch. The island is one black shape on
 * springs, and a second running activity pinches off it into a bubble through
 * a gooey SVG filter. Press the island to expand it, press outside or Escape to
 * close, press the bubble to swap the two.
 *
 * `scene.ts` is the model, pure, and `glyphs.tsx` the phone's own glyphs. This
 * file is the phone, the chips and the frame loop. Nothing renders per frame:
 * the springs live in a ref and one loop writes the island's box, and the
 * clocks write their text straight to the nodes.
 */

/** the phone, in its own design pixels, and how much of its top is shown */
const DW = 417;
const DH = 876;
const CROP = 440;
/** the island's centre and top, in the screen's pixels */
const CX = 196.5;
const TOP = 11;
/** how much smaller the island is when compact; it grows back toward full size as it opens */
const ISLAND_SCALE = 0.8;
/** room round the phone for its bezel rings, which paint outside its box */
const BEZEL = 6;
/** the stage is wide enough for the phone and the chips side by side */
const ROW = 672;

/**
 * The platform's own system colours, scoped here: they are what the island
 * says its state in, orange for a timer, green for a call, red for silent.
 * Not tokens.
 */
const TONE = {
  orange: "#ff9f0a",
  orangeWash: "rgb(255 159 10 / 0.24)",
  green: "#30d158",
  red: "#ff453a",
  tint: "#f4a35b",
} as const;

/** ui/topia's candy colours: the wallpaper and the album art are drawn, not photos. */
const WALLPAPER =
  "radial-gradient(90% 55% at 15% 12%, #a24bff 0%, transparent 60%), radial-gradient(80% 50% at 92% 30%, #00b0ff 0%, transparent 62%), radial-gradient(90% 60% at 30% 96%, #05c0c8 0%, transparent 60%), linear-gradient(180deg, #5b34ff, #2a6bff 55%, #0fb8c9)";
const ALBUM =
  "radial-gradient(70% 70% at 28% 24%, #ffe24a 0%, transparent 66%), radial-gradient(70% 70% at 78% 82%, #ff4d6d 0%, transparent 70%), #7a3cff";

const TIMER = 180;
const SONG = 214;

const CHIPS: readonly {
  key: Act | Transient;
  label: string;
  shortcut: string;
}[] = [
  { key: "timer", label: "Timer", shortcut: "1" },
  { key: "music", label: "Now playing", shortcut: "2" },
  { key: "call", label: "Incoming call", shortcut: "3" },
  { key: "charging", label: "Plug in charger", shortcut: "4" },
  { key: "silent", label: "Silent mode", shortcut: "5" },
];

/** an activity goes to the front of the list when it starts or is chosen */
const addAct = (v: Activities, id: Act): Activities => ({
  ...v,
  acts: [id, ...v.acts.filter((a) => a !== id)],
});

const removeAct = (v: Activities, id: Act): Activities => ({
  ...v,
  acts: v.acts.filter((a) => a !== id),
  expanded: v.expanded === id ? null : v.expanded,
});

/** a view fades and settles in, and leaves quicker than it came */
function viewStyle(on: boolean, reduce: boolean): React.CSSProperties {
  return {
    opacity: on ? 1 : 0,
    filter: on ? "blur(0px)" : "blur(5px)",
    transform: on ? "scale(1)" : "scale(0.92)",
    pointerEvents: on ? "auto" : "none",
    transition: reduce
      ? "none"
      : on
        ? "opacity 0.18s ease 0.05s, filter 0.18s ease 0.05s, transform 0.3s cubic-bezier(0.2, 1.25, 0.4, 1) 0.03s"
        : "opacity 0.11s ease, filter 0.11s ease, transform 0.14s ease",
  };
}

/** the equaliser, five bars on their own periods so they never line up */
/**
 * An audio visualiser. Each bar rides its own blend of slow waves, and a shared
 * beat lifts them together, so the bars move like music and never repeat on a
 * loop. Paused, they settle to a low, even rest. Under reduced motion they sit
 * at a fixed, uneven height.
 */
function Bars({
  running,
  color,
  height = 16,
  gap = 2,
  count = 5,
}: {
  running: boolean;
  color: string;
  height?: number;
  gap?: number;
  count?: number;
}) {
  const reduce = useReducedMotion() === true;
  const box = useRef<HTMLSpanElement>(null);
  const live = useRef(running);
  live.current = running;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const bars = [...el.children] as HTMLElement[];
    const REST = 0.2;
    const shown = bars.map(() => REST);
    // each bar gets its own speeds and phase, fixed for the life of the component
    const seed = bars.map((_, i) => ({
      a: 1.7 + ((i * 37) % 11) * 0.23,
      b: 3.1 + ((i * 53) % 13) * 0.29,
      p: i * 1.9,
      q: i * 0.7 + 2,
      beat: 0.45 + ((i * 29) % 7) * 0.08,
    }));
    let raf = 0;
    let last = performance.now();
    let t = 0;

    const draw = (v: number[]) => {
      bars.forEach((bar, i) => {
        bar.style.transform = `scaleY(${(v[i] ?? REST).toFixed(3)})`;
      });
    };

    if (reduce) {
      draw(bars.map((_, i) => (running ? 0.35 + ((i * 41) % 5) * 0.14 : REST)));
      return;
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      let moving = false;
      if (live.current) t += dt;
      // a beat about twice a second, sharp at the start and falling away
      const kick = Math.max(0, Math.sin(t * Math.PI * 3.6)) ** 5;
      bars.forEach((_, i) => {
        const sd = seed[i];
        if (!sd) return;
        const wave =
          0.55 * (0.5 + 0.5 * Math.sin(t * sd.a + sd.p)) +
          0.45 * (0.5 + 0.5 * Math.sin(t * sd.b + sd.q));
        const target = live.current
          ? Math.min(1, REST + 0.62 * wave + kick * 0.3 * sd.beat)
          : REST;
        const was = shown[i] ?? REST;
        // quick up, slower down, like a meter
        const k = target > was ? 0.42 : 0.16;
        const next = was + (target - was) * k;
        shown[i] = next;
        if (Math.abs(target - next) > 0.004) moving = true;
      });
      draw(shown);
      if (live.current || moving) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    raf = requestAnimationFrame(tick);
    // wake the loop when the music starts again
    const wake = setInterval(() => {
      if (live.current && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }, 120);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(wake);
    };
  }, [reduce, running]);

  return (
    <span
      aria-hidden="true"
      className="flex items-center"
      ref={box}
      style={{ height, gap }}
    >
      {Array.from({ length: count }, (_, i) => (
        <i
          key={i}
          className="block h-full rounded-xs"
          style={{ width: 2.6, background: color, transform: "scaleY(0.2)" }}
        />
      ))}
    </span>
  );
}

/** a round control on the island, with press as light over its fill */
function Circle({
  children,
  className,
  style,
  size = 50,
  ...props
}: React.ComponentProps<"button"> & { size?: number }) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center rounded-full transition-[background-color,color] duration-200",
        "before:absolute before:inset-0 before:rounded-full before:transition-colors before:duration-150 active:before:bg-white/15",
        "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-white/70 focus-visible:outline-offset-2",
        className,
      )}
      style={{ width: size, height: size, ...style }}
    >
      {children}
    </button>
  );
}

function Ring({ size = 21, bind }: { size?: number; bind: string }) {
  return (
    <span
      className="relative block shrink-0"
      style={{ width: size, height: size }}
    >
      {/* the progress ring, turned so it starts at the top */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ width: size, height: size, transform: "rotate(-90deg)" }}
      >
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          strokeWidth="2.6"
          stroke="rgb(255 159 10 / 0.28)"
        />
        <circle
          data-bind={bind}
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          strokeWidth="2.6"
          stroke={TONE.orange}
          strokeLinecap="round"
          strokeDasharray="59.7"
          strokeDashoffset="0"
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
        />
      </svg>
      {/* the stopwatch hand and its pivot, upright and not turned with the ring */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="absolute inset-0"
        style={{ width: size, height: size }}
      >
        <path
          d="M12 12V6.6"
          fill="none"
          stroke={TONE.orange}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="1.6" fill={TONE.orange} />
      </svg>
    </span>
  );
}

export default function LiveActivities() {
  const reduce = useReducedMotion() === true;
  const filterId = useId().replace(/:/g, "");
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const islandEl = useRef<HTMLDivElement>(null);
  const fit = useRef<HTMLDivElement>(null);
  const bubbleEl = useRef<HTMLButtonElement>(null);
  const blobMain = useRef<HTMLDivElement>(null);
  const blobBub = useRef<HTMLDivElement>(null);
  const status = useRef<HTMLDivElement>(null);
  const live = useRef<HTMLDivElement>(null);
  const bell = useRef<HTMLSpanElement>(null);
  const overlay = useRef<HTMLButtonElement>(null);

  const [state, setState] = useState<Activities>({
    acts: [],
    expanded: null,
    transient: null,
    ringing: false,
    silent: false,
  });
  const [playing, setPlaying] = useState(true);
  const [timerRunning, setTimerRunning] = useState(true);
  const [muted, setMuted] = useState(false);
  const [scale, setScale] = useState(1);
  const [row, setRow] = useState(true);

  const shape = useMemo(() => compute(state), [state]);

  // everything the loop and the clocks read, kept out of React
  const s = useRef({
    mw: new Spring(126, 560, 0.66),
    mh: new Spring(37, 560, 0.7),
    mr: new Spring(18.5, 600, 1),
    bs: new Spring(0, 420, 0.55),
    bg: new Spring(-30, 420, 0.6),
    raf: 0,
    last: 0,
    reduce: false,
    seen: false,
    inside: false,
    timer: { left: TIMER, running: true, endAt: 0 },
    music: { pos: 0, at: 0, playing: true },
    callStart: 0,
    state,
    transientTimer: 0 as ReturnType<typeof setTimeout> | 0,
    /** set by a keyboard action, so the view it opens takes the focus */
    fromKey: false,
  });
  s.current.state = state;
  s.current.reduce = reduce;

  const say = useCallback((text: string) => {
    const el = live.current;
    if (!el) return;
    el.textContent = "";
    requestAnimationFrame(() => {
      el.textContent = text;
    });
  }, []);

  /** the island's box and the bubble's, written from the springs */
  const paint = useCallback(() => {
    const { mw, mh, mr, bs, bg } = s.current;
    const W = Math.max(30, mw.x);
    const H = Math.max(30, mh.x);
    const R = Math.min(mr.x, H / 2, W / 2);
    const L = CX - W / 2;
    // small while compact, and back toward full size as it opens, so an open
    // island's content stays legible
    const k =
      ISLAND_SCALE +
      (1 - ISLAND_SCALE) * Math.min(1, Math.max(0, (W - 252) / (371 - 252)));
    if (fit.current) fit.current.style.transform = `scale(${k.toFixed(4)})`;
    for (const el of [blobMain.current, islandEl.current]) {
      if (!el) continue;
      Object.assign(el.style, {
        left: `${L}px`,
        top: `${TOP}px`,
        width: `${W}px`,
        height: `${H}px`,
        borderRadius: `${R}px`,
      });
    }
    const size = Math.max(0, bs.x);
    for (const el of [blobBub.current, bubbleEl.current]) {
      if (!el) continue;
      if (size < 0.5) {
        el.style.display = "none";
        continue;
      }
      Object.assign(el.style, {
        display: "flex",
        left: `${L + W + bg.x}px`,
        top: `${TOP + (37 - size) / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${size / 2}px`,
      });
    }
    if (bubbleEl.current) {
      bubbleEl.current.style.opacity = String(
        Math.min(1, Math.max(0, (bg.x + 4) / 12)),
      );
    }
    // The status bar gets out of the way of anything wider than the idle
    // island, and of the bubble, since the time and the battery sit right
    // where both land. The reference faded it only past 300px, which left the
    // time under a compact island and the battery under the bubble.
    if (status.current) {
      const clear = Math.min(1, Math.max(0, (190 - W * k) / 30));
      const bubble = Math.min(1, Math.max(0, 1 - size / 20));
      status.current.style.opacity = String(Math.min(clear, bubble));
    }
  }, []);

  const frame = useCallback(
    function step(now: number) {
      const r = s.current;
      r.raf = 0;
      const dt = Math.min(0.034, Math.max(0, (now - r.last) / 1000));
      r.last = now;
      const springs = [r.mw, r.mh, r.mr, r.bs, r.bg];
      for (let i = 0; i < 3; i++) for (const sp of springs) sp.step(dt / 3);
      const settled = springs.every((sp) => sp.rest);
      if (settled) for (const sp of springs) sp.land();
      paint();
      if (!settled) r.raf = requestAnimationFrame(step);
    },
    [paint],
  );

  const run = useCallback(() => {
    const r = s.current;
    if (r.reduce) {
      for (const sp of [r.mw, r.mh, r.mr, r.bs, r.bg]) sp.land();
      paint();
      return;
    }
    if (r.raf) return;
    r.last = performance.now();
    r.raf = requestAnimationFrame(frame);
  }, [frame, paint]);

  /** a nudge, for a press on an idle island or a timer that just finished */
  const kick = useCallback(
    (x = 1) => {
      const r = s.current;
      if (r.reduce) return;
      r.mw.v += 260 * x;
      r.mh.v += 70 * x;
      run();
    },
    [run],
  );

  // the shape springs to its new size: tighter and bouncier growing, smoother
  // shrinking back
  useLayoutEffect(() => {
    const r = s.current;
    const [w, h] = SIZE[shape.size];
    const growing = w > r.mw.t || h > r.mh.x + 1;
    r.mw.t = w;
    r.mh.t = h;
    r.mr.t = h <= 40 ? h / 2 : 44;
    r.mw.set(growing ? 520 : 620, growing ? 0.62 : 0.78);
    r.mh.set(growing ? 500 : 640, growing ? 0.64 : 0.82);
    r.bs.t = shape.bubble ? 37 : 0;
    r.bg.t = shape.bubble ? 8 : -34;
    run();
  }, [run, shape.bubble, shape.size]);

  // a keyboard action hands focus to whatever the island now offers
  useLayoutEffect(() => {
    const r = s.current;
    if (!r.fromKey) return;
    r.fromKey = false;
    if (isExpanded(shape.main)) {
      islandEl.current
        ?.querySelector<HTMLElement>(`[data-view="${shape.main}"] button`)
        ?.focus({ preventScroll: true });
    } else {
      overlay.current?.focus({ preventScroll: true });
    }
  }, [shape.main]);

  /** the clocks, written straight to their nodes */
  const tick = useCallback(() => {
    const r = s.current;
    const node = root.current;
    if (!node) return;
    const now = performance.now();
    const acts = r.state.acts;
    const bind = (k: string) =>
      node.querySelectorAll<HTMLElement | SVGElement>(`[data-bind="${k}"]`);
    if (acts.includes("timer")) {
      const t = r.timer;
      const left = t.running ? Math.max(0, (t.endAt - now) / 1000) : t.left;
      for (const el of bind("timer")) {
        roll(el as HTMLElement, clock(Math.ceil(left)), true, !r.reduce);
      }
      for (const el of bind("ring")) {
        el.setAttribute("stroke-dashoffset", String(59.7 * (1 - left / TIMER)));
      }
      if (t.running && left <= 0) {
        setState((v) => ({
          ...v,
          acts: v.acts.filter((a) => a !== "timer"),
          expanded: v.expanded === "timer" ? null : v.expanded,
        }));
        say("Timer done");
        kick(1.4);
      }
    }
    if (acts.includes("music")) {
      const m = r.music;
      let pos = m.playing ? m.pos + (now - m.at) / 1000 : m.pos;
      if (pos >= SONG) {
        m.pos = 0;
        m.at = now;
        pos = 0;
      }
      for (const el of bind("mpos")) el.textContent = clock(pos);
      for (const el of bind("mrem")) el.textContent = `-${clock(SONG - pos)}`;
      for (const el of bind("mbar")) {
        (el as HTMLElement).style.transform = `scaleX(${pos / SONG})`;
      }
    }
    if (acts.includes("call")) {
      for (const el of bind("call")) {
        roll(
          el as HTMLElement,
          clock((now - r.callStart) / 1000),
          false,
          !r.reduce,
        );
      }
    }
  }, [kick, say]);

  // the clocks tick while there is a clock to show and someone to see it
  const clocked = state.acts.length > 0;
  useEffect(() => {
    tick();
    if (!clocked) return;
    const id = setInterval(() => {
      if (s.current.seen) tick();
    }, 200);
    return () => clearInterval(id);
  }, [clocked, tick]);

  // the lock screen's own time
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const write = () => {
      const d = new Date();
      const t = `${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")}`;
      for (const el of node.querySelectorAll("[data-clock]"))
        el.textContent = t;
      for (const el of node.querySelectorAll("[data-date]")) {
        el.textContent = d.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        });
      }
    };
    write();
    const id = setInterval(write, 10000);
    return () => clearInterval(id);
  }, []);

  // the phone is scaled to the stage, beside the chips or above them
  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const fit = () => {
      const wide = node.clientWidth >= ROW;
      const availW = wide ? DW + BEZEL * 2 : node.clientWidth - 32;
      const availH = wide ? node.clientHeight - 64 : Number.POSITIVE_INFINITY;
      setRow(wide);
      setScale(Math.min(1, availW / (DW + BEZEL * 2), availH / CROP));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  // music starts on its own a beat after the phone is first seen, so the
  // island is doing something before anyone touches it
  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    let started = false;
    let timeout: ReturnType<typeof setTimeout> | 0 = 0;
    const io = new IntersectionObserver(([entry]) => {
      s.current.seen = entry?.isIntersecting ?? false;
      if (s.current.seen && !started) {
        started = true;
        timeout = setTimeout(() => {
          s.current.music = { pos: 0, at: performance.now(), playing: true };
          setState((v) =>
            v.acts.includes("music") ? v : { ...v, acts: ["music", ...v.acts] },
          );
        }, 700);
      }
    });
    io.observe(node);
    paint();
    return () => {
      io.disconnect();
      if (timeout) clearTimeout(timeout);
      cancelAnimationFrame(s.current.raf);
      s.current.raf = 0;
      if (s.current.transientTimer) clearTimeout(s.current.transientTimer);
    };
  }, [paint]);

  const flash = useCallback((kind: Transient, ms: number) => {
    const r = s.current;
    if (r.transientTimer) clearTimeout(r.transientTimer);
    setState((v) => ({ ...v, transient: kind, expanded: null }));
    r.transientTimer = setTimeout(() => {
      r.transientTimer = 0;
      setState((v) => ({ ...v, transient: null }));
    }, ms);
  }, []);

  const toggle = useCallback(
    (key: Act | Transient) => {
      const r = s.current;
      const v = r.state;
      if (key === "timer") {
        if (v.acts.includes("timer")) {
          setState((x) => removeAct(x, "timer"));
          say("Timer cancelled");
        } else {
          r.timer = {
            left: TIMER,
            running: true,
            endAt: performance.now() + TIMER * 1000,
          };
          setTimerRunning(true);
          setState((x) => ({ ...addAct(x, "timer"), expanded: null }));
          say("Timer started, 3 minutes");
        }
      } else if (key === "music") {
        if (v.acts.includes("music")) {
          setState((x) => removeAct(x, "music"));
          say("Music stopped");
        } else {
          r.music = { ...r.music, playing: true, at: performance.now() };
          setPlaying(true);
          setState((x) => ({ ...addAct(x, "music"), expanded: null }));
          say("Now playing Low Tide");
        }
      } else if (key === "call") {
        if (v.ringing) {
          setState((x) => ({ ...x, ringing: false }));
          say("Call declined");
        } else if (v.acts.includes("call")) {
          setState((x) => removeAct(x, "call"));
          say("Call ended");
        } else {
          if (r.transientTimer) clearTimeout(r.transientTimer);
          r.transientTimer = 0;
          setState((x) => ({
            ...x,
            transient: null,
            ringing: true,
            expanded: null,
          }));
          say("Incoming call from Mira Okafor");
        }
      } else if (key === "charging") {
        if (v.ringing) return;
        flash("charging", 2600);
        say("Charging, 82 percent");
      } else {
        if (v.ringing) return;
        const next = !v.silent;
        setState((x) => ({ ...x, silent: next }));
        flash("silent", 1700);
        if (!r.reduce) {
          bell.current?.animate(
            [
              { transform: "rotate(0deg)" },
              { transform: "rotate(-18deg)", offset: 0.15 },
              { transform: "rotate(14deg)", offset: 0.35 },
              { transform: "rotate(-9deg)", offset: 0.55 },
              { transform: "rotate(5deg)", offset: 0.75 },
              { transform: "rotate(0deg)" },
            ],
            { duration: 500, easing: "cubic-bezier(0.3, 0, 0.3, 1)" },
          );
        }
        say(next ? "Silent mode on" : "Ring mode on");
      }
    },
    [flash, say],
  );

  const collapse = useCallback(() => {
    setState((v) => (v.expanded ? { ...v, expanded: null } : v));
  }, []);

  // Escape closes and the number keys start activities, while the demo has
  // the pointer or the focus. Everywhere else the keys are the page's.
  useEffect(() => {
    const keys: Record<string, Act | Transient> = {
      "1": "timer",
      "2": "music",
      "3": "call",
      "4": "charging",
      "5": "silent",
    };
    const onKey = (e: KeyboardEvent) => {
      const node = root.current;
      if (!node) return;
      if (!s.current.inside && !node.contains(document.activeElement)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") {
        if (s.current.state.expanded) {
          s.current.fromKey = node.contains(document.activeElement);
          collapse();
        }
        return;
      }
      const k = keys[e.key];
      if (k) toggle(k);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [collapse, toggle]);

  const pressIsland = (e: React.MouseEvent) => {
    s.current.fromKey = e.detail === 0;
    if (shape.size === "idle") {
      kick(1.2);
      return;
    }
    if (shape.main.startsWith("c-")) {
      const id = shape.main.slice(2) as Act;
      setState((v) => ({ ...v, expanded: id }));
    }
  };

  const pressBubble = (e: React.MouseEvent) => {
    const id = shape.bubble;
    if (!id) return;
    s.current.fromKey = e.detail === 0;
    setState((v) => ({ ...addAct(v, id), expanded: id }));
  };

  const timerPause = () => {
    const t = s.current.timer;
    if (t.running) {
      t.left = Math.max(0, (t.endAt - performance.now()) / 1000);
      t.running = false;
    } else {
      t.endAt = performance.now() + t.left * 1000;
      t.running = true;
    }
    setTimerRunning(t.running);
    tick();
  };

  const musicNow = () => {
    const m = s.current.music;
    if (m.playing) {
      m.pos = Math.min(SONG, m.pos + (performance.now() - m.at) / 1000);
      m.at = performance.now();
    }
  };

  const musicPlay = () => {
    musicNow();
    const m = s.current.music;
    m.playing = !m.playing;
    m.at = performance.now();
    setPlaying(m.playing);
    tick();
  };

  const musicRestart = (nudge: boolean) => {
    const m = s.current.music;
    m.pos = 0;
    m.at = performance.now();
    if (nudge) kick(0.5);
    tick();
  };

  const accept = () => {
    s.current.callStart = performance.now();
    setMuted(false);
    setState((v) => ({ ...addAct(v, "call"), ringing: false }));
    say("Call connected");
  };

  const on = (key: string) => shape.main === key;
  const callChip = state.ringing
    ? "Decline call"
    : state.acts.includes("call")
      ? "End call"
      : "Incoming call";
  const pressed: Record<Act | Transient, boolean> = {
    timer: state.acts.includes("timer"),
    music: state.acts.includes("music"),
    call: state.ringing || state.acts.includes("call"),
    charging: state.transient === "charging",
    silent: state.silent,
  };
  const barsRunning = playing && !reduce;

  return (
    <div
      ref={root}
      className="@container w-full min-w-0"
      onPointerEnter={() => {
        s.current.inside = true;
      }}
      onPointerLeave={() => {
        s.current.inside = false;
      }}
    >
      {/* a press anywhere off the island closes it, and Escape is the
          keyboard's way */}
      <div
        ref={stage}
        onPointerDown={(e) => {
          const t = e.target as HTMLElement;
          if (!t.closest("[data-island], button")) collapse();
        }}
        className={cn(
          "relative flex select-none flex-col items-center gap-6 overflow-hidden rounded-lg bg-muted/60 px-4 py-8",
          "@2xl:aspect-8/5 @2xl:flex-row @2xl:justify-center @2xl:gap-14 @2xl:py-0",
        )}
      >
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="5.5"
                result="b"
              />
              <feColorMatrix
                in="b"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              />
            </filter>
          </defs>
        </svg>

        {/* the phone's top, scaled to the stage and faded out at its foot */}
        <div
          className="relative shrink-0 overflow-hidden"
          style={{
            width: (DW + BEZEL * 2) * scale,
            height: CROP * scale,
            maskImage: "linear-gradient(to bottom, #000 74%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 74%, transparent)",
          }}
        >
          <div
            className="absolute top-0 left-0 rounded-[68px] bg-neutral-900 p-3 normal-case"
            style={{
              width: DW,
              height: DH,
              transform: `translate(${BEZEL * scale}px, ${BEZEL * scale}px) scale(${scale})`,
              transformOrigin: "0 0",
              // a phone's frame is light catching metal, not palette
              boxShadow:
                "0 0 0 1.5px rgb(255 255 255 / 0.16) inset, 0 0 0 4px rgb(255 255 255 / 0.05), 0 0 0 5px rgb(255 255 255 / 0.2), 0 40px 80px -30px rgb(0 0 0 / 0.45), 0 18px 30px -18px rgb(0 0 0 / 0.35)",
            }}
          >
            <div
              ref={screen}
              className="relative h-[852px] w-[393px] overflow-hidden rounded-[56px] bg-black"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: WALLPAPER }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgb(0 0 0 / 0.28), rgb(0 0 0 / 0) 38%, rgb(0 0 0 / 0) 70%, rgb(0 0 0 / 0.3))",
                }}
              />

              <div
                ref={status}
                aria-hidden="true"
                className="absolute inset-x-0 top-0 flex h-[54px] items-center justify-between pt-1.5 pr-[34px] pl-[50px] font-semibold text-[17px] text-white"
              >
                <span data-clock="">9:41</span>
                <span className="flex items-center gap-1.5">
                  <SignalGlyph style={{ width: 18, height: 12 }} />
                  <WifiGlyph style={{ width: 16, height: 12 }} />
                  <BatteryGlyph style={{ width: 27, height: 13 }} />
                </span>
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[112px] text-center text-white"
                style={{ textShadow: "0 1px 14px rgb(0 0 0 / 0.18)" }}
              >
                <div
                  data-date=""
                  className="font-semibold text-[20px] opacity-90"
                >
                  Sunday, November 8
                </div>
                <div
                  data-clock=""
                  className="mt-0.5 font-bold text-[104px] leading-none tracking-[-3px]"
                >
                  9:41
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-x-[46px] bottom-[46px] flex justify-between"
              >
                {[TorchGlyph, CameraGlyph].map((G, i) => (
                  <span
                    key={i}
                    className="flex size-[50px] items-center justify-center rounded-full text-white backdrop-blur-md"
                    style={{ background: "rgb(30 30 34 / 0.34)" }}
                  >
                    <G style={{ width: 20, height: 20 }} />
                  </span>
                ))}
              </div>

              {/* the island, its bubble and its lens scale together about the island's top centre */}
              <div
                ref={fit}
                className="pointer-events-none absolute top-0 left-0 h-[260px] w-[393px]"
                style={{ transformOrigin: `${CX}px ${TOP}px` }}
              >
                {/* the two black shapes the gooey filter joins */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 h-[260px] w-[393px]"
                  style={{ filter: `url(#${filterId})` }}
                >
                  <div ref={blobMain} className="absolute bg-black" />
                  <div ref={blobBub} className="absolute hidden bg-black" />
                </div>

                <div
                  ref={islandEl}
                  data-island=""
                  className="pointer-events-auto absolute overflow-hidden text-white"
                >
                  {!isExpanded(shape.main) && (
                    <button
                      ref={overlay}
                      type="button"
                      aria-label={label(shape.main, state.silent)}
                      aria-expanded={false}
                      onClick={pressIsland}
                      className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-white/70 focus-visible:outline-offset-2"
                    />
                  )}

                  <div
                    data-view="idle"
                    inert={!on("idle")}
                    className="absolute inset-0"
                    style={viewStyle(on("idle"), reduce)}
                  />

                  <div
                    data-view="c-timer"
                    inert={!on("c-timer")}
                    className="absolute inset-0 flex items-center justify-between pr-[11px] pl-[9px]"
                    style={viewStyle(on("c-timer"), reduce)}
                  >
                    <Ring bind="ring" />
                    <span
                      data-bind="timer"
                      className="font-semibold text-[15px] tabular-nums"
                      style={{ color: TONE.orange }}
                    >
                      3:00
                    </span>
                  </div>

                  <div
                    data-view="c-music"
                    inert={!on("c-music")}
                    className="absolute inset-0 flex items-center justify-between pr-[11px] pl-[9px]"
                    style={viewStyle(on("c-music"), reduce)}
                  >
                    <span
                      aria-hidden="true"
                      className="block size-[23px] rounded-md"
                      style={{ background: ALBUM }}
                    />
                    <Bars
                      running={barsRunning && on("c-music")}
                      color={TONE.tint}
                    />
                  </div>

                  <div
                    data-view="c-call"
                    inert={!on("c-call")}
                    className="absolute inset-0 flex items-center justify-between pr-[11px] pl-[9px]"
                    style={viewStyle(on("c-call"), reduce)}
                  >
                    <PhoneGlyph
                      style={{ width: 20, height: 20, color: TONE.green }}
                    />
                    <span
                      data-bind="call"
                      className="font-semibold text-[15px] tabular-nums"
                      style={{ color: TONE.green }}
                    >
                      0:00
                    </span>
                  </div>

                  <div
                    data-view="charging"
                    inert={!on("charging")}
                    className="absolute inset-0 flex items-center justify-between px-4"
                    style={viewStyle(on("charging"), reduce)}
                  >
                    <span className="font-semibold text-[15px]">Charging</span>
                    <span className="flex items-center gap-2">
                      <span
                        className="font-semibold text-[15px]"
                        style={{ color: TONE.green }}
                      >
                        82%
                      </span>
                      <span
                        className="relative rounded-[4px] p-[1.5px]"
                        style={{
                          width: 27,
                          height: 13,
                          border: "1.5px solid rgb(48 209 88 / 0.55)",
                        }}
                      >
                        <b
                          className="block h-full rounded-[2px]"
                          style={{
                            background: TONE.green,
                            width: on("charging") ? "82%" : "0%",
                            transition: reduce
                              ? "none"
                              : "width 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s",
                          }}
                        />
                      </span>
                    </span>
                  </div>

                  <div
                    data-view="silent"
                    inert={!on("silent")}
                    className="absolute inset-0 flex items-center justify-between pr-[14px] pl-2.5"
                    style={viewStyle(on("silent"), reduce)}
                  >
                    <span
                      className="flex h-[25px] w-[44px] items-center justify-center rounded-[13px]"
                      style={{
                        background: state.silent
                          ? TONE.red
                          : "rgb(255 255 255 / 0.2)",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <span ref={bell} className="flex">
                        <BellGlyph
                          slashed={state.silent}
                          style={{ width: 15, height: 15 }}
                        />
                      </span>
                    </span>
                    <SwapText
                      text={state.silent ? "Silent" : "Ring"}
                      className="font-semibold text-[15px]"
                      style={{
                        color: state.silent ? TONE.red : undefined,
                        transition: "color 0.2s ease",
                      }}
                    />
                  </div>

                  <div
                    data-view="e-timer"
                    inert={!on("e-timer")}
                    className="-ml-[185.5px] absolute top-0 left-1/2 flex h-[84px] w-[371px] origin-top items-center gap-2.5 px-[17px]"
                    style={viewStyle(on("e-timer"), reduce)}
                  >
                    <Circle
                      aria-label={timerRunning ? "Pause timer" : "Resume timer"}
                      onClick={timerPause}
                      style={{
                        background: TONE.orangeWash,
                        color: TONE.orange,
                      }}
                    >
                      <SwapIcon id={timerRunning ? "pause" : "play"}>
                        {timerRunning ? (
                          <PauseGlyph style={{ width: 18, height: 18 }} />
                        ) : (
                          <PlayGlyph style={{ width: 18, height: 18 }} />
                        )}
                      </SwapIcon>
                    </Circle>
                    <Circle
                      aria-label="Cancel timer"
                      onClick={() => setState((v) => removeAct(v, "timer"))}
                      className="bg-white/20"
                    >
                      <CrossGlyph style={{ width: 16, height: 16 }} />
                    </Circle>
                    <div
                      className="ml-auto pr-1.5 text-right"
                      style={{ color: TONE.orange }}
                    >
                      <div className="text-[13px]">Timer</div>
                      <div
                        data-bind="timer"
                        className="font-light text-[42px] tabular-nums leading-none tracking-[-1px]"
                      >
                        3:00
                      </div>
                    </div>
                  </div>

                  <div
                    data-view="e-music"
                    inert={!on("e-music")}
                    className="-ml-[185.5px] absolute top-0 left-1/2 h-[184px] w-[371px] origin-top px-[22px] pt-5"
                    style={viewStyle(on("e-music"), reduce)}
                  >
                    <div className="flex items-center gap-[13px]">
                      <div
                        role="img"
                        aria-label="Album art for Low Tide"
                        className="size-[54px] shrink-0 rounded-xl"
                        style={{ background: ALBUM }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-[15px]">
                          Low Tide
                        </div>
                        <div className="text-[14px] text-white/60">
                          Hollis Marr
                        </div>
                      </div>
                      <span className="mr-1">
                        <Bars
                          running={barsRunning && on("e-music")}
                          color={TONE.tint}
                          count={9}
                          height={22}
                          gap={2.5}
                        />
                      </span>
                    </div>
                    <div className="mt-[18px] flex items-center gap-2.5 text-[12px] text-white/60 tabular-nums">
                      <span data-bind="mpos" className="w-[30px]">
                        0:00
                      </span>
                      <span className="h-[5px] flex-1 overflow-hidden rounded-[3px] bg-white/20">
                        <b
                          data-bind="mbar"
                          className="block h-full origin-left rounded-[3px] bg-white"
                          style={{
                            transform: "scaleX(0)",
                            transition: reduce
                              ? "none"
                              : "transform 0.2s linear",
                          }}
                        />
                      </span>
                      <span data-bind="mrem" className="w-[34px] text-right">
                        -3:34
                      </span>
                    </div>
                    <div className="mt-2.5 flex items-center justify-center gap-[38px]">
                      <Circle
                        aria-label="Previous"
                        size={44}
                        onClick={() => musicRestart(false)}
                      >
                        <PrevGlyph style={{ width: 26, height: 18 }} />
                      </Circle>
                      <Circle
                        aria-label={playing ? "Pause" : "Play"}
                        onClick={musicPlay}
                      >
                        <SwapIcon id={playing ? "pause" : "play"}>
                          {playing ? (
                            <PauseGlyph style={{ width: 28, height: 28 }} />
                          ) : (
                            <PlayGlyph style={{ width: 28, height: 28 }} />
                          )}
                        </SwapIcon>
                      </Circle>
                      <Circle
                        aria-label="Next"
                        size={44}
                        onClick={() => musicRestart(true)}
                      >
                        <NextGlyph style={{ width: 26, height: 18 }} />
                      </Circle>
                    </div>
                  </div>

                  <div
                    data-view="incoming"
                    inert={!on("incoming")}
                    className="-ml-[185.5px] absolute top-0 left-1/2 flex h-[84px] w-[371px] origin-top items-center gap-3 px-[17px]"
                    style={viewStyle(on("incoming"), reduce)}
                  >
                    <Avatar ringing={on("incoming") && !reduce} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] text-white/60">mobile</div>
                      <div className="font-semibold text-[17px]">
                        Mira Okafor
                      </div>
                    </div>
                    <Circle
                      aria-label="Decline call"
                      size={46}
                      onClick={() => {
                        setState((v) => ({ ...v, ringing: false }));
                        say("Call declined");
                      }}
                      style={{ background: TONE.red }}
                    >
                      <PhoneGlyph
                        style={{
                          width: 22,
                          height: 22,
                          transform: "rotate(135deg)",
                        }}
                      />
                    </Circle>
                    <Circle
                      aria-label="Accept call"
                      size={46}
                      onClick={accept}
                      style={{ background: TONE.green }}
                    >
                      <PhoneGlyph style={{ width: 21, height: 21 }} />
                    </Circle>
                  </div>

                  <div
                    data-view="e-call"
                    inert={!on("e-call")}
                    className="-ml-[185.5px] absolute top-0 left-1/2 flex h-[84px] w-[371px] origin-top items-center gap-3 px-[17px]"
                    style={viewStyle(on("e-call"), reduce)}
                  >
                    <Avatar ringing={false} />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-[17px]">
                        Mira Okafor
                      </div>
                      <div className="flex items-center gap-[7px]">
                        <span
                          data-bind="call"
                          className="text-[13px] tabular-nums"
                          style={{ color: TONE.green }}
                        >
                          0:00
                        </span>
                        <Bars
                          running={!reduce && !muted && on("e-call")}
                          color={TONE.green}
                          height={11}
                        />
                      </div>
                    </div>
                    <Circle
                      aria-label="Mute"
                      aria-pressed={muted}
                      size={46}
                      onClick={() => setMuted((m) => !m)}
                      className={muted ? "bg-white text-black" : "bg-white/20"}
                    >
                      <MicGlyph
                        slashed={muted}
                        style={{ width: 18, height: 18 }}
                      />
                    </Circle>
                    <Circle
                      aria-label="End call"
                      size={46}
                      onClick={() => {
                        setState((v) => removeAct(v, "call"));
                        say("Call ended");
                      }}
                      style={{ background: TONE.red }}
                    >
                      <PhoneGlyph
                        style={{
                          width: 22,
                          height: 22,
                          transform: "rotate(135deg)",
                        }}
                      />
                    </Circle>
                  </div>
                </div>

                <button
                  ref={bubbleEl}
                  type="button"
                  data-island=""
                  aria-label={
                    shape.bubble
                      ? `Switch to ${shape.bubble}`
                      : "Second activity"
                  }
                  tabIndex={shape.bubble ? 0 : -1}
                  onClick={pressBubble}
                  className="pointer-events-auto absolute hidden cursor-pointer items-center justify-center overflow-hidden text-white focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-white/70 focus-visible:outline-offset-2"
                >
                  <SwapIcon id={shape.bubble ?? "none"}>
                    {shape.bubble === "timer" && <Ring size={20} bind="ring" />}
                    {shape.bubble === "music" && (
                      <span
                        aria-hidden="true"
                        className="block size-[21px] rounded-full"
                        style={{ background: ALBUM }}
                      />
                    )}
                    {shape.bubble === "call" && (
                      <PhoneGlyph
                        style={{ width: 17, height: 17, color: TONE.green }}
                      />
                    )}
                  </SwapIcon>
                </button>

                {/* the camera lens, under the island's glass */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-[23.5px] left-[232px] size-3 rounded-full opacity-75"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 35%, #2a2f4a 0, #0d0f1a 45%, #050507 70%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <fieldset
          aria-label="Activities"
          className={cn(
            "m-0 flex min-w-0 flex-wrap justify-center gap-1.5 border-0 p-0",
            row && "w-64 flex-col flex-nowrap",
          )}
        >
          {CHIPS.map((c) => (
            <button
              key={c.key}
              type="button"
              aria-pressed={pressed[c.key]}
              onClick={() => toggle(c.key)}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-xl bg-background px-3 py-2 text-left text-foreground text-sm ring-1 ring-foreground/8 ring-inset transition-colors duration-150",
                "hover:bg-muted active:bg-accent",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/15 focus-visible:ring-offset-2 focus-visible:ring-offset-muted",
                row && "py-2.5",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-2 shrink-0 rounded-full transition-colors duration-200",
                  pressed[c.key] ? "bg-foreground" : "bg-foreground/20",
                )}
              />
              {c.key === "call" ? callChip : c.label}
              {row && (
                <kbd className="ml-auto rounded-md px-1.5 font-mono text-muted-foreground text-xs ring-1 ring-foreground/8 ring-inset">
                  {c.shortcut}
                </kbd>
              )}
            </button>
          ))}
        </fieldset>

        <div ref={live} aria-live="polite" className="sr-only" />
      </div>
    </div>
  );
}

/** the caller's initials, with a ring going out while the call rings */
function Avatar({ ringing }: { ringing: boolean }) {
  const pulse = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = pulse.current;
    if (!el || !ringing) return;
    const a = el.animate(
      [
        { transform: "scale(0.9)", opacity: 1 },
        { transform: "scale(1.35)", opacity: 0 },
      ],
      {
        duration: 1200,
        iterations: Number.POSITIVE_INFINITY,
        easing: "ease-out",
      },
    );
    return () => a.cancel();
  }, [ringing]);
  return (
    <div className="relative flex size-[50px] shrink-0 items-center justify-center rounded-full bg-white/30 font-semibold text-[19px] tracking-[0.3px]">
      MO
      <span
        ref={pulse}
        aria-hidden="true"
        className="-inset-1 absolute rounded-full border-2 opacity-0"
        style={{ borderColor: TONE.green }}
      />
    </div>
  );
}
