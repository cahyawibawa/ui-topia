"use client";

/**
 * Adapted from the smooth-caret lab on Sanyam Punia's site
 * (https://github.com/SanyamPunia/www), used with his permission.
 */

import {
  type AnimationPlaybackControls,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/registry/lib/utils";
import { type Affinity, type CaretBox, caretAt, syncMirror } from "./caret";

/*
 * A textarea whose caret glides to where it is going instead of jumping. The
 * native caret is painted transparent and a drawn one follows the measured
 * position. `caret.ts` is the measuring.
 */

/** The drawn caret's width, px. Off the scale, like a hairline. */
const BAR = 2;

/**
 * One critically damped spring for every axis. A spring rather than a tween, so
 * a key pressed mid-glide turns the caret from where it is at the speed it has,
 * which is what keeps a run of keystrokes one smooth movement.
 */
const GLIDE = { type: "spring", visualDuration: 0.13, bounce: 0 } as const;

/** Far enough left that the cover over newly typed text has no width. */
const NONE = -1e6;
/** Far enough right that the copy of deleted text has no width. */
const GONE = 1e6;

/** How long the caret holds solid after it moves, before it blinks, ms. */
const SETTLE = 500;

const NOTE =
  "Click anywhere in this note and the caret glides there instead of jumping. Type a few words, or walk it along with the arrow keys.";

export default function SmoothCaret() {
  const field = useRef<HTMLTextAreaElement>(null);
  const mirror = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  const [shown, setShown] = useState(false);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const height = useMotionValue(0);

  /** where the last measurement put the caret, so a move knows what it left */
  const last = useRef<CaretBox | null>(null);
  const runs = useRef<AnimationPlaybackControls[]>([]);
  const settle = useRef(0);
  /** the idle blink, an animation on the caret bar, so no global keyframe is needed */
  const blink = useRef<Animation | null>(null);
  /** which line a caret at a soft wrap belongs to, set by whatever moved it */
  const affinity = useRef<Affinity>("start");
  /** what kind of edit the move being placed came from, if it came from one */
  const edit = useRef<"insert" | "delete" | null>(null);
  /**
   * The right edge of text just typed and not yet reached by the caret. A cover
   * in the field's own colour runs from the caret to here, so a typed letter
   * appears as the caret passes it and the caret never sits on top of it.
   */
  const reveal = useMotionValue(NONE);
  const cover = useTransform(() => Math.max(0, reveal.get() - x.get() - BAR));
  const coverX = useTransform(() => x.get() + BAR);

  /**
   * Text just deleted, kept on screen until the caret has passed back over it.
   * A deletion takes its text out of the field at once, so a caret gliding back
   * would travel through space that is already empty. A copy of the text stays
   * where it was, clipped at the caret, so the caret erases it as it goes.
   */
  const ghost = useRef<HTMLSpanElement>(null);
  const ghostX = useMotionValue(GONE);
  const ghostY = useMotionValue(0);
  const ghostH = useMotionValue(0);
  const ghostW = useTransform(() => Math.max(0, x.get() - ghostX.get()));

  // an empty field shows its placeholder at once, under text the caret is
  // still erasing, so the placeholder waits until the copy has gone
  useEffect(
    () =>
      ghostW.on("change", (w) => {
        const el = field.current;
        if (!el) return;
        if (w > 0.5) el.dataset.erasing = "true";
        else delete el.dataset.erasing;
      }),
    [ghostW],
  );
  /** the copy's text and where it starts in the field's text */
  const kept = useRef({ text: "", at: -1 });
  /** what the last input removed, worked out against the text before it */
  const removed = useRef<{ text: string; from: number; to: number } | null>(
    null,
  );
  /** the text and caret as they were before the latest edit */
  const before = useRef({ value: "", pos: -1 });

  /** The blink restarts from solid every time the caret moves, as a native one does. */
  const wake = useCallback(() => {
    const node = bar.current;
    if (!node) return;
    node.dataset.idle = "false";
    blink.current?.cancel();
    blink.current = null;
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(() => {
      node.dataset.idle = "true";
      if (reduce) return;
      blink.current = node.animate(
        [{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }],
        {
          duration: 1000,
          easing: "ease-in-out",
          iterations: Number.POSITIVE_INFINITY,
        },
      );
    }, SETTLE);
  }, [reduce]);

  const place = useCallback(
    (jump: boolean) => {
      const el = field.current;
      const box = mirror.current;
      if (!el || !box) return;

      const collapsed = el.selectionStart === el.selectionEnd;
      const focused = document.activeElement === el;
      setShown(focused && collapsed);
      before.current = {
        value: el.value,
        pos: collapsed ? el.selectionStart : -1,
      };
      if (!focused || !collapsed) {
        // whatever comes back next is placed, never travelled to
        last.current = null;
        return;
      }

      const next = caretAt(el, box, el.selectionStart, affinity.current);
      if (!next) return;
      const from = last.current;
      last.current = next;
      const typed = edit.current;
      edit.current = null;
      const cut = removed.current;
      removed.current = null;
      wake();
      // an edit is heard twice, as `input` and as `selectionchange`
      if (
        from &&
        from.x === next.x &&
        from.y === next.y &&
        from.height === next.height
      ) {
        return;
      }

      for (const run of runs.current) run.stop();
      runs.current = [];

      const line = from !== null && Math.abs(next.y - from.y) > 1;
      const pos = el.selectionStart;
      const forget = () => {
        ghostX.jump(GONE);
        kept.current = { text: "", at: -1 };
      };
      const snap = () => {
        forget();
        reveal.jump(NONE);
        x.jump(next.x);
        y.jump(next.y);
        height.jump(next.height);
      };

      if (jump || reduce || !from) return snap();

      if (typed === "insert") {
        forget();
        // a word that wraps as it is typed moves to the next line in one
        // frame, so the caret goes with it. Enter still glides, since its line
        // break is the move that was asked for
        if (line && el.value[pos - 1] !== "\n") return snap();
        reveal.jump(line ? NONE : next.x);
      } else {
        reveal.jump(NONE);
        // a deletion pulls the rest of the line left under the caret, so it
        // only glides where there is nothing after it on the line
        const after = el.value[pos];
        if (typed === "delete" && after !== undefined && after !== "\n") {
          return snap();
        }
        const node = ghost.current;
        if (typed === "delete" && cut && !line && node) {
          // a deletion that lands where the last one's copy starts joins it,
          // so holding backspace erases one run of text rather than letters
          // that each vanish on their own
          const join = kept.current.at === cut.to;
          const text = cut.text + (join ? kept.current.text : "");
          kept.current = { text, at: cut.from };
          node.textContent = text;
          node.style.lineHeight = `${next.height}px`;
          ghostX.jump(next.x);
          ghostY.jump(next.y);
          ghostH.jump(next.height);
        } else {
          forget();
        }
      }

      runs.current = [
        animate(x, next.x, GLIDE),
        animate(y, next.y, GLIDE),
        animate(height, next.height, GLIDE),
      ];
    },
    [x, y, height, reveal, ghostX, ghostY, ghostH, reduce, wake],
  );

  // the mirror is laid out like the field before the first paint, and again
  // whenever the field changes size or the font arrives
  useLayoutEffect(() => {
    const el = field.current;
    const box = mirror.current;
    if (!el || !box) return;
    const fit = () => {
      syncMirror(el, box);
      const node = ghost.current;
      if (node) {
        const cs = getComputedStyle(el);
        node.style.font = cs.font;
        node.style.letterSpacing = cs.letterSpacing;
        node.style.wordSpacing = cs.wordSpacing;
        node.style.textTransform = cs.textTransform;
        node.style.fontKerning = cs.fontKerning;
        node.style.fontFeatureSettings = cs.fontFeatureSettings;
        node.style.fontVariationSettings = cs.fontVariationSettings;
      }
      place(true);
    };
    fit();
    document.fonts.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [place]);

  useEffect(() => {
    const el = field.current;
    if (!el) return;
    // a click that focuses the field fires `focus` while the field still holds
    // its old caret, and only reports the clicked one after it. So that focus
    // waits, and the clicked position is placed rather than travelled to
    let arriving = false;
    const glide = () => {
      place(arriving);
      arriving = false;
    };
    const jump = () => place(true);
    const focus = () => {
      if (!arriving) place(true);
    };
    const release = () => {
      // a click on the spot the caret already held reports no change
      if (arriving) glide();
    };
    const input = (e: Event) => {
      const kind = (e as InputEvent).inputType ?? "";
      edit.current = kind.startsWith("delete") ? "delete" : "insert";
      // a backward deletion from a collapsed caret took exactly the text
      // between where the caret is now and where it was
      const was = before.current;
      const pos = el.selectionStart;
      if (
        kind.startsWith("deleteContentBackward") ||
        kind.startsWith("deleteWordBackward") ||
        kind.startsWith("deleteSoftLineBackward") ||
        kind.startsWith("deleteHardLineBackward")
      ) {
        if (
          was.pos > pos &&
          was.value.length - el.value.length === was.pos - pos
        ) {
          removed.current = {
            text: was.value.slice(pos, was.pos),
            from: pos,
            to: was.pos,
          };
        }
      }
      place(false);
    };
    // a press puts the caret on the line under the pointer, and a line-end
    // command on the end of the line it was on. Any other navigation lands at
    // the start of the next one. An edit keeps whichever it had, since Chrome
    // leaves a space typed at the end of a line on that line
    const press = (e: PointerEvent) => {
      arriving = document.activeElement !== el;
      affinity.current = e.clientY - el.getBoundingClientRect().top;
    };
    const key = (e: KeyboardEvent) => {
      if (
        e.key === "End" ||
        (e.key === "ArrowRight" && e.metaKey) ||
        (e.key === "e" && e.ctrlKey)
      ) {
        affinity.current = "end";
      } else if (
        e.key.startsWith("Arrow") ||
        e.key.startsWith("Page") ||
        e.key === "Home"
      ) {
        affinity.current = "start";
      }
    };
    // a textarea's caret moves are heard on the document, with the field's own
    // `input` for the frames where a browser reports the edit first
    document.addEventListener("selectionchange", glide);
    el.addEventListener("input", input);
    el.addEventListener("pointerdown", press);
    el.addEventListener("keydown", key);
    el.addEventListener("scroll", jump);
    el.addEventListener("pointerup", release);
    el.addEventListener("focus", focus);
    el.addEventListener("blur", glide);
    return () => {
      document.removeEventListener("selectionchange", glide);
      el.removeEventListener("input", input);
      el.removeEventListener("pointerdown", press);
      el.removeEventListener("keydown", key);
      el.removeEventListener("scroll", jump);
      el.removeEventListener("pointerup", release);
      el.removeEventListener("focus", focus);
      el.removeEventListener("blur", glide);
      window.clearTimeout(settle.current);
      blink.current?.cancel();
    };
  }, [place]);

  return (
    <div className="@container flex w-full select-none items-center justify-center rounded-lg bg-muted/60 px-6 py-12 ring-1 ring-foreground/8 ring-inset sm:aspect-8/5 sm:px-10">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg bg-background ring-1 ring-foreground/8 transition-all duration-200",
          "focus-within:ring-2 focus-within:ring-foreground/20 focus-within:ring-offset-2 focus-within:ring-offset-muted",
        )}
      >
        <textarea
          ref={field}
          defaultValue={NOTE}
          rows={5}
          spellCheck={false}
          aria-label="A note to type in"
          placeholder="Type something"
          className={cn(
            "block w-full select-text resize-none bg-transparent px-6 py-5 text-foreground leading-relaxed outline-none",
            // off the type scale: the caret is the subject, and at body size a
            // move of a character or two is not something the eye can follow
            "text-[clamp(1.0625rem,4cqw,1.375rem)] caret-transparent placeholder:text-[clamp(1.0625rem,4cqw,1.375rem)] placeholder:text-muted-foreground placeholder:transition-colors placeholder:duration-200 data-erasing:placeholder:text-transparent data-erasing:placeholder:transition-none",
          )}
        />
        {/* laid out like the field and never seen, see caret.ts */}
        <div
          ref={mirror}
          aria-hidden="true"
          className="pointer-events-none invisible absolute top-0 left-0"
        />
        {/* covers text typed ahead of the caret until the caret reaches it */}
        <motion.div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-0 left-0 bg-background",
            !shown && "hidden",
          )}
          style={{ x: coverX, y, height, width: cover }}
        />
        {/* the copy of deleted text, clipped at the caret */}
        <motion.div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-0 left-0 overflow-hidden",
            !shown && "hidden",
          )}
          style={{ x: ghostX, y: ghostY, height: ghostH, width: ghostW }}
        >
          <span ref={ghost} className="block whitespace-pre text-foreground" />
        </motion.div>
        {/* the outer box moves and shows, the inner one blinks, since a blink
            is an animation on opacity and would override a class on the same
            element */}
        <motion.div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-0 left-0 transition-opacity duration-150",
            shown ? "opacity-100" : "opacity-0",
          )}
          style={{ x, y, height, width: BAR }}
        >
          <div
            ref={bar}
            data-idle="true"
            className="size-full rounded-full bg-foreground"
          />
        </motion.div>
      </div>
    </div>
  );
}
