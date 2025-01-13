import type { Registry } from "@/registry/schema";
import * as React from "react";

export const showcase: Registry = [
  {
    name: "cd-demo",
    type: "registry:showcase",
    dependencies: ["motion", "motion-number"],
    files: [
      {
        path: "@/components/showcases/cd-demo.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(() => import("../components/showcases/cd-demo")),
  },
  {
    name: "clip-path-demo",
    type: "registry:showcase",
    dependencies: ["motion"],
    files: [
      {
        path: "@/components/showcases/clip-path-demo.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(
      () => import("../components/showcases/clip-path-demo"),
    ),
  },
  {
    name: "clip-path-tabs-demo",
    type: "registry:showcase",
    dependencies: ["motion"],
    files: [
      {
        path: "@/components/showcases/clip-path-tabs-demo.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(
      () => import("../components/showcases/clip-path-tabs-demo"),
    ),
  },
  {
    name: "dock-demo",
    type: "registry:showcase",
    dependencies: ["motion"],
    files: [
      {
        path: "@/components/showcases/dock-demo.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(() => import("../components/showcases/dock-demo")),
  },
  {
    name: "expandable-tabs-demo",
    dependencies: ["motion", "usehooks-ts"],
    type: "registry:showcase",
    files: [
      {
        path: "@/components/showcases/expandable-tabs-demo.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(
      () => import("../components/showcases/expandable-tabs-demo"),
    ),
  },
  {
    name: "family-wallet-demo",
    type: "registry:showcase",
    dependencies: ["motion", "usehooks-ts"],
    files: [
      {
        path: "@/components/showcases/family-wallet-demo.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(
      () => import("../components/showcases/family-wallet-demo"),
    ),
  },
  {
    name: "faq-accordion-demo",
    type: "registry:showcase",
    dependencies: ["motion"],
    files: [
      {
        path: "@/components/showcases/faq-accordion-demo.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(
      () => import("../components/showcases/faq-accordion-demo"),
    ),
  },
  {
    name: "inline-dropdown-demo",
    type: "registry:showcase",
    dependencies: ["motion"],
    files: [
      {
        path: "@/components/showcases/inline-dropdown-demo.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(
      () => import("../components/showcases/inline-dropdown-demo"),
    ),
  },
  {
    name: "linear-card-demo",
    type: "registry:showcase",
    dependencies: ["motion"],
    files: [
      {
        path: "@/components/showcases/linear-card-demo.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(
      () => import("../components/showcases/linear-card-demo"),
    ),
  },
  {
    name: "paper-fold-card",
    type: "registry:showcase",
    dependencies: ["@remixicon/react"],
    files: [
      {
        path: "@/components/showcases/paper-fold-card.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(() => import("../components/showcases/paper-fold")),
  },
  {
    name: "text-loop-base",
    type: "registry:showcase",
    files: [
      {
        path: "@/components/elements/texts/text-loop.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/texts/text-loop"),
    ),
  },
  {
    name: "text-loop-demo",
    type: "registry:showcase",
    registryDependencies: ["https://uitopia.xyz/r/text-loop.json"],
    files: [
      {
        path: "@/components/showcases/text-loop-demo.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(
      () => import("../components/showcases/text-loop-demo"),
    ),
  },
  {
    name: "text-type-base",
    type: "registry:showcase",
    registryDependencies: ["https://uitopia.xyz/r/text-type.json"],
    files: [
      {
        path: "@/components/elements/texts/text-type.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/texts/text-type"),
    ),
  },
  {
    name: "text-type-demo",
    type: "registry:showcase",
    files: [
      {
        path: "@/components/showcases/text-type-demo.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(
      () => import("../components/showcases/text-type-demo"),
    ),
  },
  {
    name: "transaction-button-demo",
    type: "registry:showcase",
    dependencies: ["motion", "usehooks-ts"],
    files: [
      {
        path: "@/components/showcases/transaction-btn-demo.tsx",
        type: "registry:showcase",
      },
    ],
    component: React.lazy(
      () => import("../components/showcases/transaction-btn-demo"),
    ),
  },
];
