import type { Registry } from "@/registry/schema";
import * as React from "react";

export const showcase: Registry = {
  "family-wallet-demo": {
    name: "family-wallet-demo",
    type: "components:showcase",
    files: ["@/components/showcases/family-wallet-demo.tsx"],
    component: React.lazy(
      () => import("@/components/showcases/family-wallet-demo"),
    ),
  },
  "cd-demo": {
    name: "cd-demo",
    type: "components:showcase",
    files: ["@/components/showcases/cd-demo.tsx"],
    component: React.lazy(() => import("@/components/showcases/cd-demo")),
  },
  "dock-demo": {
    name: "dock-demo",
    type: "components:showcase",
    files: ["@/components/showcases/dock-demo.tsx"],
    component: React.lazy(() => import("@/components/showcases/dock-demo")),
  },
  "faq-accordion-demo": {
    name: "faq-accordion-demo",
    type: "components:showcase",
    files: ["@/components/showcases/faq-accordion-demo.tsx"],
    component: React.lazy(
      () => import("@/components/showcases/faq-accordion-demo"),
    ),
  },
  "linear-card-demo": {
    name: "linear-card-demo",
    type: "components:showcase",
    files: ["@/components/showcases/linear-card-demo.tsx"],
    component: React.lazy(
      () => import("@/components/showcases/linear-card-demo"),
    ),
  },
};
