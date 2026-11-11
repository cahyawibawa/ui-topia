"use client";

import { useEffect, useState } from "react";
import { Demo, DemoToggle } from "@/components/docs/demo";
import { cn } from "@/lib/utils";

type Mode = "proportional" | "tabular";

const MODES: { value: Mode; label: string }[] = [
  { value: "proportional", label: "Proportional" },
  { value: "tabular", label: "Tabular" },
];

const figures = (mode: Mode) =>
  mode === "tabular" ? "tabular-nums" : "proportional-nums";

/** 0–9 with each glyph's box shaded, so the width difference is visible. */
export function TabularNumsDemo() {
  const [mode, setMode] = useState<Mode>("proportional");

  return (
    <Demo>
      <div
        className={cn(
          "flex font-medium text-5xl leading-none tracking-tight",
          figures(mode),
        )}
      >
        {"0123456789".split("").map((digit, i) => (
          <span
            className={cn(
              "px-px py-2 transition-[width]",
              i % 2 === 0 ? "bg-muted" : "bg-muted/50",
            )}
            key={digit}
          >
            {digit}
          </span>
        ))}
      </div>
      <DemoToggle onChange={setMode} options={MODES} value={mode} />
    </Demo>
  );
}

/** A running timer with a marker on its right edge: watch it jitter. */
export function TabularTimerDemo() {
  const [mode, setMode] = useState<Mode>("proportional");
  const [ms, setMs] = useState(35_450);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setMs((v) => (v + 70) % 60_000), 70);
    return () => clearInterval(id);
  }, []);

  const seconds = Math.floor(ms / 1000);
  const hundredths = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");

  return (
    <Demo>
      <div className="flex h-20 items-center">
        <span
          className={cn(
            "font-medium text-6xl leading-none tracking-tight",
            figures(mode),
          )}
        >
          {seconds}.{hundredths}
        </span>
        <span className="relative ml-1 h-14 border-sky-400 border-l border-dashed">
          <span className="absolute top-full left-1 text-[10px] text-sky-400">
            Edge
          </span>
        </span>
      </div>
      <DemoToggle onChange={setMode} options={MODES} value={mode} />
    </Demo>
  );
}

const ROWS = [
  { item: "Pro plan", qty: 1, price: 1249.5 },
  { item: "Extra seats", qty: 11, price: 118.0 },
  { item: "Support add-on", qty: 1, price: 7.25 },
  { item: "Storage (TB)", qty: 4, price: 1011.1 },
];

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2 });

/** Numeric column: equal-width digits form a vertical grid. */
export function TabularTableDemo() {
  const [mode, setMode] = useState<Mode>("proportional");

  return (
    <Demo>
      <table className="w-full max-w-sm text-sm">
        <thead>
          <tr className="text-muted-foreground text-xs">
            <th className="pb-2 text-left font-normal">Item</th>
            <th className="pb-2 text-right font-normal">Qty</th>
            <th className="pb-2 text-right font-normal">Price</th>
          </tr>
        </thead>
        <tbody className={figures(mode)}>
          {ROWS.map((row) => (
            <tr className="border-t" key={row.item}>
              <td className="py-2 text-left">{row.item}</td>
              <td className="py-2 text-right">{row.qty}</td>
              <td className="py-2 text-right">${fmt(row.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <DemoToggle onChange={setMode} options={MODES} value={mode} />
    </Demo>
  );
}
