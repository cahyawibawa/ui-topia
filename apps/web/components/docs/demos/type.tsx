"use client";

import StackType from "@/registry/ui/stack-type";
import WarpType from "@/registry/ui/warp-type";

/** These effects fill their box and are drawn for 16:9, so the box fixes the ratio. */
export function StackTypeDemo() {
  return (
    <figure
      className="not-prose my-8 aspect-video overflow-hidden rounded-2xl"
      data-preview-target="stack-type"
    >
      <StackType />
    </figure>
  );
}

export function WarpTypeDemo() {
  return (
    <figure
      className="not-prose my-8 aspect-video overflow-hidden rounded-2xl"
      data-preview-target="warp-type"
    >
      <WarpType />
    </figure>
  );
}
