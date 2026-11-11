"use client";

import { useState } from "react";
import { Demo, DemoToggle } from "@/components/docs/demo";
import { cn } from "@/lib/utils";

type Smoothing = "auto" | "antialiased";

const SMOOTHING: Record<Smoothing, React.CSSProperties> = {
  auto: { WebkitFontSmoothing: "auto", MozOsxFontSmoothing: "auto" },
  antialiased: {
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
};

const SURFACE = "bg-neutral-900";

/**
 * Same content twice: default smoothing underneath, antialiased on top,
 * clipped to the handle. Each layer paints its own opaque background; the
 * clipped layer is composited, and without an opaque surface behind the text
 * the browser would render both halves the same way.
 */
function CompareSlider({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-between px-1 text-muted-foreground text-xs">
        <span>Default</span>
        <span>Antialiased</span>
      </div>
      <div className={cn("relative overflow-hidden rounded-xl", className)}>
        <div className={cn("h-full", SURFACE)} style={SMOOTHING.auto}>
          {children}
        </div>
        <div
          aria-hidden
          className={cn("absolute inset-0", SURFACE)}
          style={{
            ...SMOOTHING.antialiased,
            clipPath: `inset(0 0 0 ${position}%)`,
          }}
        >
          {children}
        </div>
        <input
          aria-label="Comparison position"
          className="peer absolute inset-0 size-full cursor-ew-resize opacity-0"
          max={100}
          min={0}
          onChange={(e) => setPosition(Number(e.target.value))}
          type="range"
          value={position}
        />
        <div
          className="-translate-x-1/2 pointer-events-none absolute inset-y-0 w-px bg-white/60 peer-focus-visible:w-0.5 peer-focus-visible:bg-sky-400"
          style={{ left: `${position}%` }}
        />
        <div
          className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 grid size-6 place-items-center rounded-full bg-white text-neutral-800 text-xs shadow-sm"
          style={{ left: `${position}%` }}
        >
          ⇆
        </div>
      </div>
    </div>
  );
}

/** Drag across a headline: left half default, right half antialiased. */
export function FontSmoothingCompareDemo() {
  return (
    <Demo>
      <div className="w-full max-w-sm">
        <CompareSlider className="h-28">
          <div className="grid h-full place-items-center px-6">
            <span className="text-center font-semibold text-2xl text-white tracking-tight">
              The quick brown fox
            </span>
          </div>
        </CompareSlider>
      </div>
    </Demo>
  );
}

/** A dark card where the property can be flipped on and off. */
export function FontSmoothingDemo() {
  const [mode, setMode] = useState<Smoothing>("auto");

  return (
    <Demo>
      <div
        className={cn("w-full max-w-sm rounded-xl p-6", SURFACE)}
        style={SMOOTHING[mode]}
      >
        <p className="font-semibold text-lg text-white leading-tight tracking-tight">
          Faster cold starts
        </p>
        <p className="mt-1.5 text-sm text-white/70 leading-relaxed">
          Functions now boot in under 100ms. No changes are needed on your side.
        </p>
      </div>
      <span className="font-mono text-[11px] text-muted-foreground">
        -webkit-font-smoothing: {mode}
      </span>
      <DemoToggle
        onChange={setMode}
        options={[
          { value: "auto", label: "Default" },
          { value: "antialiased", label: "Antialiased" },
        ]}
        value={mode}
      />
    </Demo>
  );
}

const WEIGHTS = [200, 300, 400, 500, 600, 700] as const;

/** Light weights lean on the extra thickness the most. */
export function FontSmoothingWeightsDemo() {
  return (
    <Demo>
      <div className="w-full max-w-md">
        <CompareSlider>
          <div className="flex flex-col px-5 py-1.5">
            {WEIGHTS.map((weight) => (
              <div
                className="flex items-center justify-between gap-3 border-white/10 border-b py-2.5 last:border-b-0"
                key={weight}
              >
                <span
                  className="truncate text-base text-white"
                  style={{ fontWeight: weight }}
                >
                  The quick brown fox jumps over the lazy dog
                </span>
                <span className="text-[10px] text-white/40 tabular-nums">
                  {weight}
                </span>
              </div>
            ))}
          </div>
        </CompareSlider>
      </div>
    </Demo>
  );
}
