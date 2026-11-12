"use client";

import SmoothCaret from "@/registry/ui/smooth-caret";

/** The component draws its own stage and note. */
export function SmoothCaretDemo() {
  return (
    <figure className="not-prose my-8" data-preview-target="smooth-caret">
      <SmoothCaret />
    </figure>
  );
}
