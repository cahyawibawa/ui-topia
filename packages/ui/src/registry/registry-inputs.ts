import type { Registry } from "@/registry/schema";
import * as React from "react";

export const input: Registry = [
  {
    name: "input-1",
    description: "showhide password input",
    categories: ["input"],
    type: "registry:element",
    registryDependencies: [
      "https://uitopia.xyz/r/input.json",
      "https://uitopia.xyz/r/label.json",
    ],
    files: [
      {
        path: "@/components/elements/inputs/input-1.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/inputs/input-1"),
    ),
  },
  {
    name: "input-2",
    description: "Input with start inline add-on",
    categories: ["input"],
    type: "registry:element",
    registryDependencies: [
      "https://uitopia.xyz/r/input.json",
      "https://uitopia.xyz/r/label.json",
    ],
    files: [
      {
        path: "@/components/elements/inputs/input-2.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/inputs/input-2"),
    ),
  },
  {
    name: "input-3",
    description: "Input with button",
    categories: ["input"],
    type: "registry:element",
    registryDependencies: [
      "https://uitopia.xyz/r/input.json",
      "https://uitopia.xyz/r/label.json",
      "https://uitopia.xyz/r/button.json",
    ],
    files: [
      {
        path: "@/components/elements/inputs/input-3.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/inputs/input-3"),
    ),
  },
  {
    name: "input-4",
    description: "Input with start icon",
    categories: ["input"],
    type: "registry:element",
    registryDependencies: [
      "https://uitopia.xyz/r/input.json",
      "https://uitopia.xyz/r/label.json",
    ],
    files: [
      {
        path: "@/components/elements/inputs/input-4.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/inputs/input-4"),
    ),
  },
  {
    name: "input-5",
    description: "Input with label animation",
    categories: ["input"],
    type: "registry:element",
    registryDependencies: [
      "https://uitopia.xyz/r/input.json",
      "https://uitopia.xyz/r/label.json",
    ],
    files: [
      {
        path: "@/components/elements/inputs/input-5.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/inputs/input-5"),
    ),
  },
  {
    name: "input-6",
    description: "Input with overlapping label",
    categories: ["input"],
    type: "registry:element",
    registryDependencies: [
      "https://uitopia.xyz/r/input.json",
      "https://uitopia.xyz/r/label.json",
    ],
    files: [
      {
        path: "@/components/elements/inputs/input-6.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/inputs/input-6"),
    ),
  },
];
