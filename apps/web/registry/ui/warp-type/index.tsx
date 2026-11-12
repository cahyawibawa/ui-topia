/**
 * Warp type, from design.how (https://github.com/arla6ka/design.how), MIT licensed,
 * Copyright (c) 2026 Arlan Marat. Adapted for ui/topia: see the licence in engine.ts.
 */
"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, usePause } from "@/registry/hooks/use-pause";
import { WarpType } from "./engine";
import {
  DEFAULT_PHRASES,
  FONT_VAR,
  FONT_WEIGHT,
  GROUND,
  INK,
  type Phrases,
} from "./params";

export type WarpTypeProps = {
  phrases?: Phrases;
  ground?: string;
  ink?: string;
  weight?: number;
  className?: string;
};

export default function WarpTypeCard({
  phrases = DEFAULT_PHRASES,
  ground = GROUND,
  ink = INK,
  weight = FONT_WEIGHT,
  className,
}: WarpTypeProps) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<WarpType | null>(null);
  const running = usePause(box, (run) =>
    run ? engine.current?.start() : engine.current?.stop(),
  );

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    let cancelled = false;
    const probe = document.createElement("span");
    probe.style.cssText = `position:absolute;visibility:hidden;font-family:var(${FONT_VAR})`;
    probe.textContent = "Ag";
    document.body.appendChild(probe);
    const family = getComputedStyle(probe).fontFamily || "sans-serif";
    probe.remove();

    const build = () => {
      if (cancelled) return;
      const next = new WarpType(element, {
        family,
        phrases,
        ground,
        ink,
        weight,
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
  }, [phrases, ground, ink, weight, running]);

  return (
    <div
      ref={box}
      role="img"
      aria-label={`Six short sentences in two colours, cut hard every half second, each verb acting on its own letters: ${phrases.map((line) => line.join(" ")).join("; ")}.`}
      className={className}
      style={{ width: "100%", height: "100%", backgroundColor: ground }}
    >
      <canvas
        ref={canvas}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
