import * as React from "react";
import type { Registry } from "./schema";

export const input: Registry = {
  "input-1": {
    name: "Show/hide password input",
    type: "components:ui",
    files: ["@/components/examples/inputs/input-1.tsx"],
    component: React.lazy(
      () => import("../components/examples/inputs/input-1"),
    ),
  },
  "input-2": {
    name: "input-2",
    type: "components:ui",
    files: ["@/components/examples/inputs/input-2.tsx"],
    component: React.lazy(
      () => import("../components/examples/inputs/input-2"),
    ),
  },
  "input-3": {
    name: "input-3",
    type: "components:ui",
    files: ["@/components/examples/inputs/input-3.tsx"],
    component: React.lazy(() => import("@/components/examples/inputs/input-3")),
  },
  "input-4": {
    name: "Input with start icon",
    type: "components:ui",
    files: ["@/components/inputs/input-4.tsx"],
    component: React.lazy(
      () => import("../components/examples/inputs/input-4"),
    ),
  },
  "input-5": {
    name: "Input with start inline add-on",
    type: "components:ui",
    files: ["@/components/examples/inputs/input-5.tsx"],
    component: React.lazy(
      () => import("../components/examples/inputs/input-5"),
    ),
  },
  "input-6": {
    name: "Input with button",
    type: "components:ui",
    files: ["@/components/examples/inputs/input-6.tsx"],
    component: React.lazy(
      () => import("../components/examples/inputs/input-6"),
    ),
  },
};
