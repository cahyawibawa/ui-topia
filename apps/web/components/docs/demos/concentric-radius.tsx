"use client";

import { useState } from "react";
import { Demo, DemoToggle } from "@/components/docs/demo";
import { cn } from "@/lib/utils";

type Mode = "mismatched" | "concentric";

const MODES: { value: Mode; label: string }[] = [
  { value: "mismatched", label: "Same radius" },
  { value: "concentric", label: "Concentric" },
];

const INNER = 16;

/** Padding slider: the outer radius should follow `inner + padding`. */
export function ConcentricPlaygroundDemo() {
  const [mode, setMode] = useState<Mode>("concentric");
  const [padding, setPadding] = useState(16);
  const outer = mode === "concentric" ? INNER + padding : INNER;

  return (
    <Demo>
      <div
        className="bg-muted transition-[border-radius,padding] duration-200"
        style={{ borderRadius: outer, padding }}
      >
        <div
          className="size-32 bg-foreground/80"
          style={{ borderRadius: INNER }}
        />
      </div>
      <p className="font-mono text-[11px] text-muted-foreground tabular-nums">
        {mode === "concentric"
          ? `outer ${outer}px = inner ${INNER}px + padding ${padding}px`
          : `outer ${outer}px, inner ${INNER}px`}
      </p>
      <label className="flex items-center gap-3 text-muted-foreground text-xs">
        Padding
        <input
          className="w-40 accent-foreground"
          max={32}
          min={4}
          onChange={(e) => setPadding(Number(e.target.value))}
          type="range"
          value={padding}
        />
      </label>
      <DemoToggle onChange={setMode} options={MODES} value={mode} />
    </Demo>
  );
}

/** The same idea on a real card: image nested inside a padded surface. */
export function ConcentricCardDemo() {
  const [mode, setMode] = useState<Mode>("mismatched");
  const padding = 8;
  const inner = 12;
  const outer = mode === "concentric" ? inner + padding : inner;

  return (
    <Demo>
      <div
        className="w-64 bg-background shadow-[0_0_0_1px_rgb(0_0_0/0.08),0_4px_12px_rgb(0_0_0/0.06)] transition-[border-radius] duration-200"
        style={{ borderRadius: outer, padding }}
      >
        <div
          className="h-28 bg-linear-to-br from-amber-200 via-rose-200 to-sky-200"
          style={{ borderRadius: inner }}
        />
        <div className="px-2 pt-3 pb-2">
          <p className="font-medium text-sm">Morning light</p>
          <p className={cn("text-muted-foreground text-xs")}>
            Corners that share a center feel calmer.
          </p>
        </div>
      </div>
      <DemoToggle onChange={setMode} options={MODES} value={mode} />
    </Demo>
  );
}
