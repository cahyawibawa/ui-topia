"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type Control = {
  key: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  /** Display suffix, e.g. "px". */
  unit?: string;
};

type Values = Record<string, number>;

/**
 * A live preview with a tuning panel beside it: drag a bar to change a prop and
 * the stage updates in place. Always dark, like a piece of hardware sitting on
 * the page.
 */
export function TuneKit({
  title,
  description,
  controls,
  children,
  className,
}: {
  title: string;
  description?: string;
  controls: Control[];
  children: (values: Values) => React.ReactNode;
  className?: string;
}) {
  const defaults = Object.fromEntries(controls.map((c) => [c.key, c.value]));
  const [values, setValues] = useState<Values>(defaults);
  const [run, setRun] = useState(0);

  return (
    <div
      className={cn(
        "not-prose my-8 grid gap-3 rounded-3xl bg-neutral-950 p-3 text-neutral-100 md:grid-cols-[1fr_17rem]",
        className,
      )}
    >
      <div className="relative grid min-h-80 place-items-center overflow-hidden rounded-2xl bg-neutral-900">
        <div key={run}>{children(values)}</div>
        <button
          aria-label="Reset values"
          className="absolute right-3 bottom-3 grid size-8 place-items-center rounded-full bg-white/8 text-neutral-300 outline-none transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/60"
          onClick={() => {
            setValues(defaults);
            setRun((n) => n + 1);
          }}
          type="button"
        >
          <RotateCcw className="size-3.5" />
        </button>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl bg-neutral-900 p-4">
        <div>
          <h3 className="font-medium text-base">{title}</h3>
          {description && (
            <p className="mt-1 text-neutral-400 text-xs leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {controls.map((control) => (
            <BarSlider
              control={control}
              key={control.key}
              onChange={(v) => setValues((s) => ({ ...s, [control.key]: v }))}
              value={values[control.key] ?? control.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** A row that doubles as a slider: the fill is the value, the input is invisible. */
function BarSlider({
  control,
  value,
  onChange,
}: {
  control: Control;
  value: number;
  onChange: (value: number) => void;
}) {
  const { label, min, max, step = 1, unit = "" } = control;
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <label className="relative flex h-10 cursor-ew-resize items-center justify-between overflow-hidden rounded-lg bg-white/6 px-3 text-neutral-300 text-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-white/50">
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 bg-white/12"
        style={{ width: `${pct}%` }}
      />
      <span className="relative">{label}</span>
      <span className="relative text-neutral-100 tabular-nums">
        {value}
        {unit}
      </span>
      <input
        aria-label={label}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        max={max}
        min={min}
        onChange={(e) => onChange(Number(e.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}
