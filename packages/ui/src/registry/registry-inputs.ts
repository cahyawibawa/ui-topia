import * as React from "react";
import type { Registry } from "./schema";

export const input: Registry = [
  {
    name: "input-1",
    description: "Show/hide password input",
    type: "registry:component",
    files: ["@/components/examples/inputs/input-1.tsx"],
    component: React.lazy(
      () => import("../components/examples/inputs/input-1"),
    ),
    categories: ["inputs"],
  },
  {
    name: "input-2",
    type: "registry:component",
    files: ["@/components/examples/inputs/input-2.tsx"],
    component: React.lazy(
      () => import("../components/examples/inputs/input-2"),
    ),
    categories: ["inputs"],
  },
  {
    name: "input-3",
    type: "registry:component",
    files: ["@/components/examples/inputs/input-3.tsx"],
    component: React.lazy(
      () => import("../components/examples/inputs/input-3"),
    ),
    categories: ["inputs"],
  },
  {
    name: "input-4",
    description: "Input with start icon",
    type: "registry:component",
    files: ["@/components/inputs/input-4.tsx"],
    component: React.lazy(
      () => import("../components/examples/inputs/input-4"),
    ),
    categories: ["inputs"],
  },
  {
    name: "input-5",
    description: "Input with start inline add-on",
    type: "registry:component",
    files: ["@/components/examples/inputs/input-5.tsx"],
    component: React.lazy(
      () => import("../components/examples/inputs/input-5"),
    ),
    categories: ["inputs"],
  },
  {
    name: "input-6",
    description: "Input with button",
    type: "registry:component",
    files: ["@/components/examples/inputs/input-6.tsx"],
    component: React.lazy(
      () => import("../components/examples/inputs/input-6"),
    ),
    categories: ["inputs"],
  },
];
