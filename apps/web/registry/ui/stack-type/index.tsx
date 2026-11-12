/**
 * Stack type, from design.how (https://github.com/arla6ka/design.how), MIT licensed,
 * Copyright (c) 2026 Arlan Marat. Adapted for ui/topia: see the licence in engine.ts.
 */
"use client";
import { useEffect, useRef } from "react";
import { prefersReducedMotion, usePause } from "@/registry/hooks/use-pause";
import { type StackPhrase, StackType } from "./engine";
import {
  DEFAULT_GROUND,
  DEFAULT_INK,
  DEFAULT_LOOK,
  DEFAULT_TEXT,
  FONT_VAR,
  FONT_WEIGHT,
  type Look,
} from "./params";

export type StackTypeProps = {
  text?: string;
  ground?: string;
  ink?: string;
  phrases?: readonly StackPhrase[];
  look?: Look;
  weight?: number;
  speed?: number;
  fontVar?: string;
  className?: string;
};

const CANVAS_CARD = {
  userSelect: "none",
  WebkitUserSelect: "none",
  WebkitTouchCallout: "none",
  touchAction: "pan-y",
} as const;

export default function StackTypeCard({
  text = DEFAULT_TEXT,
  ground = DEFAULT_GROUND,
  ink = DEFAULT_INK,
  phrases,
  look = DEFAULT_LOOK,
  weight = FONT_WEIGHT,
  speed = 1,
  fontVar = FONT_VAR,
  className,
}: StackTypeProps) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<StackType | null>(null);
  const running = usePause(box, (run) =>
    run ? engine.current?.start() : engine.current?.stop(),
  );

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    let cancelled = false;
    const probe = document.createElement("span");
    probe.style.cssText = `position:absolute;visibility:hidden;font-family:var(${fontVar})`;
    probe.textContent = "Ag";
    document.body.appendChild(probe);
    const family = getComputedStyle(probe).fontFamily || "sans-serif";
    probe.remove();

    const build = () => {
      if (cancelled) return;
      const next = new StackType(element, {
        family,
        phrases: phrases ?? [{ text, ground, ink }],
        look,
        weight,
        speed,
      });
      engine.current = next;
      if (!next.ok) return;
      if (prefersReducedMotion()) next.renderStill();
      else if (running.current) next.start();
    };
    const first = (family.split(",")[0] ?? "").replace(/["']/g, "").trim();
    if (document.fonts?.load)
      document.fonts.load(`${weight} 1em "${first}"`).then(build, build);
    else build();

    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => engine.current?.resize(), 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
      engine.current?.destroy();
      engine.current = null;
    };
  }, [text, ground, ink, phrases, look, weight, speed, fontVar, running]);

  return (
    <div
      ref={box}
      role="img"
      aria-label={`The words "${(phrases ?? [{ text }]).map((p) => p.text).join('", "')}" stacked nine deep, each letter's column draining to one line and filling back up.`}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: phrases?.[0]?.ground ?? ground,
        ...CANVAS_CARD,
      }}
    >
      <canvas
        ref={canvas}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
