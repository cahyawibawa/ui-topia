"use client";

import StampCollection from "@/registry/ui/stamp-collection";

/** The collection draws its own stage. */
export function StampCollectionDemo() {
  return (
    <figure className="not-prose my-8" data-preview-target="stamp-collection">
      <StampCollection />
    </figure>
  );
}
