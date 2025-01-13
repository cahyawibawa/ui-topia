import type { Registry } from "@/registry/schema";
import * as React from "react";

export const buttons: Registry = [
  {
    name: "button-1",
    description: "clerk button",
    type: "registry:element",
    categories: ["button"],
    files: [
      {
        path: "@/components/elements/buttons/button-1.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-1"),
    ),
  },
  {
    name: "button-2",
    description: "blueming button",
    type: "registry:element",
    categories: ["button"],
    files: [
      {
        path: "components/elements/buttons/button-2.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-2"),
    ),
  },
  {
    name: "button-3",
    description: "sparkle button",
    type: "registry:element",
    categories: ["button"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/elements/buttons/button-3.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-3"),
    ),
  },
  {
    name: "button-4",
    description: "upvote button",
    type: "registry:element",
    categories: ["button"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/elements/buttons/button-4.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-4"),
    ),
  },
  {
    name: "button-5",
    description: "rich text button",
    type: "registry:element",
    categories: ["button"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/elements/buttons/button-5.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-5"),
    ),
  },
  {
    name: "button-6",
    description: "username button",
    categories: ["button"],
    type: "registry:element",
    dependencies: ["motion"],
    files: [
      {
        path: "@/components/elements/buttons/button-6.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-6"),
    ),
  },
  {
    name: "button-7",
    description: "settings button",
    categories: ["button"],
    type: "registry:element",
    files: [
      {
        path: "components/elements/buttons/button-7.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-7"),
    ),
  },
  {
    name: "button-8",
    description: "files button",
    categories: ["button"],
    type: "registry:element",
    dependencies: ["motion"],
    files: [
      {
        path: "components/elements/buttons/button-8.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-8"),
    ),
  },
  {
    name: "button-9",
    description: "oauth button",
    categories: ["button"],
    type: "registry:element",
    files: [
      {
        path: "components/elements/buttons/button-9.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-9"),
    ),
  },
  {
    name: "button-10",
    description: "download button",
    categories: ["button"],
    type: "registry:element",
    dependencies: ["motion"],
    files: [
      {
        path: "components/elements/buttons/button-10.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-10"),
    ),
  },
  {
    name: "button-11",
    description: "clerk button",
    categories: ["button"],
    type: "registry:element",
    files: [
      {
        path: "@/components/elements/buttons/button-11.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-11"),
    ),
  },
  {
    name: "button-12",
    type: "registry:element",
    categories: ["button"],
    files: [
      {
        path: "components/elements/buttons/button-12.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-12"),
    ),
  },
  {
    name: "button-13",
    type: "registry:element",
    categories: ["button"],
    files: [
      {
        path: "components/elements/buttons/button-13.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-13"),
    ),
  },
  {
    name: "button-14",
    type: "registry:element",
    categories: ["button"],
    files: [
      {
        path: "components/elements/buttons/button-14.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-14"),
    ),
  },
  {
    name: "button-15",
    type: "registry:element",
    categories: ["button"],
    files: [
      {
        path: "components/elements/buttons/button-15.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-15"),
    ),
  },
  {
    name: "button-16",
    type: "registry:element",
    categories: ["button"],
    files: [
      {
        path: "@/components/elements/buttons/button-16.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-16"),
    ),
  },
  {
    name: "button-17",
    type: "registry:element",
    categories: ["button"],
    files: [
      {
        path: "components/elements/buttons/button-17.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-17"),
    ),
  },
  {
    name: "button-18",
    type: "registry:element",
    categories: ["button"],
    files: [
      {
        path: "components/elements/buttons/button-18.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-18"),
    ),
  },
  {
    name: "button-19",
    type: "registry:element",
    categories: ["button"],
    files: [
      {
        path: "components/elements/buttons/button-19.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-19"),
    ),
  },
  {
    name: "button-20",
    description: "trash button",
    categories: ["button"],
    type: "registry:element",
    dependencies: ["motion"],
    files: [
      {
        path: "components/elements/buttons/button-20.tsx",
        type: "registry:element",
      },
    ],
    component: React.lazy(
      () => import("../components/elements/buttons/button-20"),
    ),
  },
];
