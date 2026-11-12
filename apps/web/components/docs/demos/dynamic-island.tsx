"use client";

import LiveActivities from "@/registry/ui/dynamic-island";

/** The component draws its own stage and the phone. */
export function DynamicIslandDemo() {
  return (
    <figure className="not-prose my-8" data-preview-target="dynamic-island">
      <LiveActivities />
    </figure>
  );
}
