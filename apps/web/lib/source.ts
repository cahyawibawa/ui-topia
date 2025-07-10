import type { InferMetaType, InferPageType } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { createElement } from "react";
import { docs, meta } from "@/.source";
import { Icons } from "@/registry/components/icons";

export const source = loader({
  baseUrl: "/docs",
  icon(icon) {
    if (icon && icon in Icons)
      return createElement(Icons[icon as keyof typeof Icons]);
  },
  source: createMDXSource(docs, meta),
});

export type Page = InferPageType<typeof source>;
export type Meta = InferMetaType<typeof source>;
