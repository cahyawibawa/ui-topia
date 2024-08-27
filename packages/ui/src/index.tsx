import * as React from "react";
import type { Registry } from "./schema";

const ui: Registry = {
  globe: {
    name: "globe",
    type: "components:ui",
    files: ["./components/globe.tsx"],
  },
  "iphone-simulator": {
    name: "iphone-simulator",
    type: "components:ui",
    files: ["./components/iphone-simulator.tsx"],
  },
  marquee: {
    name: "marquee",
    type: "components:ui",
    files: ["./components/marquee.tsx"],
  },
  projectCard: {
    name: "project-card",
    type: "components:ui",
    files: ["./components/project-card.tsx"],
  },
};

const example: Registry = {
  "blur-hero-demo": {
    name: "blur-hero-demo",
    type: "components:example",
    files: ["./components/examples/blur-hero-demo.tsx"],
    component: React.lazy(() => import("./components/examples/blur-hero-demo")),
  },
  "client-logo-demo": {
    name: "client-logo-demo",
    type: "components:example",
    files: ["./components/examples/client-logo-demo.tsx"],
    component: React.lazy(
      () => import("./components/examples/client-logo-demo"),
    ),
  },
  "clip-path-demo": {
    name: "clip-path-demo",
    type: "components:example",
    files: ["./components/examples/clip-path-demo.tsx"],
    component: React.lazy(() => import("./components/examples/clip-path-demo")),
  },
  "dock-demo": {
    name: "dock-demo",
    type: "components:example",
    files: ["./components/examples/dock-demo.tsx"],
    component: React.lazy(() => import("./components/examples/dock-demo")),
  },
  "faq-accordion-demo": {
    name: "faq-accordion-demo",
    type: "components:example",
    files: ["./components/examples/faq-accordion-demo.tsx"],
    component: React.lazy(
      () => import("./components/examples/faq-accordion-demo"),
    ),
  },
  "globe-card-demo": {
    name: "globe-card-demo",
    type: "components:example",
    files: ["./components/examples/globe-card-demo.tsx"],
    component: React.lazy(
      () => import("./components/examples/globe-card-demo"),
    ),
  },
  "linear-card-demo": {
    name: "linear-card-demo",
    type: "components:example",
    files: ["./components/examples/linear-card-demo.tsx"],
    component: React.lazy(
      () => import("./components/examples/linear-card-demo"),
    ),
  },
  "marquee-logo-demo": {
    name: "marquee-logo-demo",
    type: "components:example",
    files: ["./components/examples/marquee-logo-demo.tsx"],
    component: React.lazy(
      () => import("./components/examples/marquee-logo-demo"),
    ),
  },
  "project-card-demo": {
    name: "project-card-demo",
    type: "components:example",
    files: ["./components/examples/project-card-demo.tsx"],
    component: React.lazy(
      () => import("./components/examples/project-card-demo"),
    ),
  },
  "spotify-simulator-demo": {
    name: "spotify-simulator-demo",
    type: "components:example",
    files: ["./components/examples/spotify-simulator-demo.tsx"],
    component: React.lazy(
      () => import("./components/examples/spotify-simulator-demo"),
    ),
  },
  "chat-simulator-demo": {
    name: "chat-simulator-demo",
    type: "components:example",
    files: ["./components/examples/chat-simulator-demo.tsx"],
    component: React.lazy(
      () => import("./components/examples/chat-simulator-demo"),
    ),
  },
  "lockscreen-cam-demo": {
    name: "lockscreen-cam-demo",
    type: "components:example",
    files: ["./components/examples/lockscreen-cam-demo.tsx"],
    component: React.lazy(
      () => import("./components/examples/lockscreen-cam-demo"),
    ),
  },
  "gallery-simulator-demo": {
    name: "gallery-simulator-demo",
    type: "components:example",
    files: ["./components/examples/gallery-simulator-demo.tsx"],
    component: React.lazy(
      () => import("./components/examples/gallery-simulator-demo"),
    ),
  },
};

const elements: Registry = {
  buttons: {
    name: "buttons",
    type: "components:elements",
    files: ["./elements/button.tsx"],
    component: React.lazy(() => import("./elements/button")),
  },
  // textVariants: {
  //   name: 'text-variants',
  //   type: 'components:elements',
  //   files: ['./elements/text-variants.tsx'],
  //   component: React.lazy(() => import('./elements/text-variants')),
  // },
};
export const registry: Registry = {
  ...ui,
  ...elements,
  ...example,
};
