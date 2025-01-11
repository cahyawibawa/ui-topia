import * as React from "react";
import type { Registry } from "./schema";

export const showcase: Registry = [
  {
    name: "cd-demo",
    type: "registry:showcase",
    files: ["@/components/showcases/cd-demo.tsx"],
    dependencies: ["motion", "motion-number"],
    component: React.lazy(() => import("@/components/showcases/cd-demo")),
  },
  {
    name: "clip-path-demo",
    type: "registry:showcase",
    files: ["@/components/showcases/clip-path-demo.tsx"],
    dependencies: ["motion"],
    component: React.lazy(
      () => import("@/components/showcases/clip-path-demo"),
    ),
  },
  {
    name: "clip-path-tabs-demo",
    type: "registry:showcase",
    files: ["@/components/showcases/clip-path-tabs-demo.tsx"],
    component: React.lazy(
      () => import("@/components/showcases/clip-path-tabs-demo"),
    ),
  },
  {
    name: "dock-demo",
    type: "registry:showcase",
    files: ["@/components/showcases/dock-demo.tsx"],
    dependencies: ["motion"],
    component: React.lazy(() => import("@/components/showcases/dock-demo")),
  },
  {
    name: "expandable-tabs-demo",
    type: "registry:showcase",
    files: ["@/components/showcases/expandable-tabs-demo.tsx"],
    dependencies: ["motion", "usehooks-ts"],
    component: React.lazy(
      () => import("@/components/showcases/expandable-tabs-demo"),
    ),
  },
  {
    name: "family-wallet-demo",
    type: "registry:showcase",
    files: ["@/components/showcases/family-wallet-demo.tsx"],
    dependencies: ["motion", "usehooks-ts"],
    component: React.lazy(
      () => import("@/components/showcases/family-wallet-demo"),
    ),
  },
  {
    name: "faq-accordion-demo",
    type: "registry:showcase",
    dependencies: ["motion"],
    files: ["@/components/showcases/faq-accordion-demo.tsx"],
    component: React.lazy(
      () => import("@/components/showcases/faq-accordion-demo"),
    ),
  },
  {
    name: "inline-dropdown-demo",
    type: "registry:showcase",
    files: ["@/components/showcases/inline-dropdown-demo.tsx"],
    dependencies: ["motion"],
    component: React.lazy(
      () => import("@/components/showcases/inline-dropdown-demo"),
    ),
  },
  {
    name: "linear-card-demo",
    type: "registry:showcase",
    files: ["@/components/showcases/linear-card-demo.tsx"],
    dependencies: ["motion"],
    component: React.lazy(
      () => import("@/components/showcases/linear-card-demo"),
    ),
  },
  {
    name: "paper-fold-card",
    type: "registry:showcase",
    files: ["@/components/showcases/paper-fold.tsx"],
    component: React.lazy(() => import("@/components/showcases/paper-fold")),
  },
  {
    name: "text-loop-base",
    type: "registry:showcase",
    files: ["@/components/examples/texts/text-loop.tsx"],
    dependencies: ["motion"],
    component: React.lazy(
      () => import("@/components/examples/texts/text-loop"),
    ),
  },
  {
    name: "text-loop-demo",
    type: "registry:showcase",
    files: ["@/components/showcases/text-loop-demo.tsx"],
    dependencies: ["motion"],
    component: React.lazy(
      () => import("@/components/showcases/text-loop-demo"),
    ),
  },
  {
    name: "text-type-base",
    type: "registry:showcase",
    files: ["@/components/examples/texts/text-type.tsx"],
    dependencies: ["motion"],
    component: React.lazy(
      () => import("@/components/examples/texts/text-type"),
    ),
  },
  {
    name: "text-type-demo",
    type: "registry:showcase",
    dependencies: ["motion"],
    files: ["@/components/showcases/text-type-demo.tsx"],
    component: React.lazy(
      () => import("@/components/showcases/text-type-demo"),
    ),
  },
  {
    name: "transaction-button-demo",
    type: "registry:showcase",
    files: ["@/components/showcases/transaction-btn-demo.tsx"],
    dependencies: ["motion", "usehooks-ts"],
    component: React.lazy(
      () => import("@/components/showcases/transaction-btn-demo"),
    ),
  },
];
