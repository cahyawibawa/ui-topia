import type { Registry } from "@/registry/schema";
import * as React from "react";

export const showcase: Registry = {
  "cd-demo": {
    name: "cd-demo",
    type: "components:showcase",
    files: ["@/components/showcases/cd-demo.tsx"],
    component: React.lazy(() => import("../components/showcases/cd-demo")),
  },
  "clip-path-demo": {
    name: "clip-path-demo",
    type: "components:showcase",
    files: ["@/components/showcases/clip-path-demo.tsx"],
    component: React.lazy(
      () => import("../components/showcases/clip-path-demo"),
    ),
  },
  "clip-path-tabs-demo": {
    name: "clip-path-tabs-demo",
    type: "components:showcase",
    files: ["@/components/showcases/clip-path-tabs-demo.tsx"],
    component: React.lazy(
      () => import("../components/showcases/clip-path-tabs-demo"),
    ),
  },
  "dock-demo": {
    name: "dock-demo",
    type: "components:showcase",
    files: ["@/components/showcases/dock-demo.tsx"],
    component: React.lazy(() => import("../components/showcases/dock-demo")),
  },
  "expandable-tabs-demo": {
    name: "expandable-tabs-demo",
    type: "components:showcase",
    files: ["@/components/showcases/expandable-tabs-demo.tsx"],
    component: React.lazy(
      () => import("../components/showcases/expandable-tabs-demo"),
    ),
  },
  "family-wallet-demo": {
    name: "family-wallet-demo",
    type: "components:showcase",
    files: ["@/components/showcases/family-wallet-demo.tsx"],
    component: React.lazy(
      () => import("../components/showcases/family-wallet-demo"),
    ),
  },
  "faq-accordion-demo": {
    name: "faq-accordion-demo",
    type: "components:showcase",
    files: ["@/components/showcases/faq-accordion-demo.tsx"],
    component: React.lazy(
      () => import("../components/showcases/faq-accordion-demo"),
    ),
  },
  "inline-dropdown-demo": {
    name: "inline-dropdown-demo",
    type: "components:showcase",
    files: ["@/components/showcases/inline-dropdown-demo.tsx"],
    component: React.lazy(
      () => import("../components/showcases/inline-dropdown-demo"),
    ),
  },
  "linear-card-demo": {
    name: "linear-card-demo",
    type: "components:showcase",
    files: ["@/components/showcases/linear-card-demo.tsx"],
    component: React.lazy(
      () => import("../components/showcases/linear-card-demo"),
    ),
  },
  "paper-fold": {
    name: "paper-fold-card",
    type: "components:showcase",
    files: ["@/components/showcases/paper-fold.tsx"],
    component: React.lazy(() => import("../components/showcases/paper-fold")),
  },
  "text-loop-base": {
    name: "text-loop-base",
    type: "components:showcase",
    files: ["@/components/examples/texts/text-loop.tsx"],
    component: React.lazy(
      () => import("../components/examples/texts/text-loop"),
    ),
  },
  "text-loop-demo": {
    name: "text-loop-demo",
    type: "components:showcase",
    files: ["@/components/showcases/text-loop-demo.tsx"],
    component: React.lazy(
      () => import("../components/showcases/text-loop-demo"),
    ),
  },
  "transaction-button-demo": {
    name: "transaction-button-demo",
    type: "components:showcase",
    files: ["@/components/showcases/transaction-btn-demo.tsx"],
    component: React.lazy(
      () => import("../components/showcases/transaction-btn-demo"),
    ),
  },
};
