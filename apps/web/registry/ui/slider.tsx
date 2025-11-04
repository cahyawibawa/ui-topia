"use client";

import { Slider as SliderPrimitive } from "@base-ui-components/react/slider";
import * as React from "react";

import { cn } from "@/lib/utils";

function Slider({
  className,
  children,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = React.useMemo(() => {
    if (value !== undefined) {
      return Array.isArray(value) ? value : [value];
    }
    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [min];
  }, [value, defaultValue, min]);

  return (
    <SliderPrimitive.Root
      thumbAlignment="edge"
      className="data-[orientation=horizontal]:w-full"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      {...props}
    >
      {children}
      <SliderPrimitive.Control
        data-slot="slider-control"
        className={cn(
          "flex touch-none select-none data-[disabled]:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-[orientation=vertical]:flex-col data-disabled:opacity-64",
          className,
        )}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow select-none before:absolute before:rounded-full before:bg-input data-[orientation=horizontal]:h-1 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1 data-[orientation=horizontal]:before:inset-x-0.5 data-[orientation=vertical]:before:inset-x-0 data-[orientation=horizontal]:before:inset-y-0 data-[orientation=vertical]:before:inset-y-0.5"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-indicator"
            className="select-none rounded-full bg-primary data-[orientation=horizontal]:ms-0.5 data-[orientation=vertical]:mb-0.5"
          />
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              data-slot="slider-thumb"
              key={index}
              className="block size-4 shrink-0 select-none rounded-full border border-input bg-white bg-clip-padding shadow-xs outline-none transition-shadow before:absolute before:inset-0 before:rounded-full before:shadow-[0_1px_--theme(--color-black/4%)] focus-visible:ring-[3px] focus-visible:ring-ring/24 has-focus-visible:ring-[3px] has-focus-visible:ring-ring/24 data-dragging:ring-[3px] data-dragging:ring-ring/24 dark:border-background dark:bg-clip-border dark:data-dragging:ring-ring/48 dark:focus-visible:ring-ring/48 [&:is(:focus-visible,[data-dragging])]:shadow-none"
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

function SliderValue({ className, ...props }: SliderPrimitive.Value.Props) {
  return (
    <SliderPrimitive.Value
      data-slot="slider-value"
      className={cn("flex justify-end text-sm", className)}
      {...props}
    />
  );
}

export { Slider, SliderValue };
