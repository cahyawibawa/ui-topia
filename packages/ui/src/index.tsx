import * as React from "react";
import type { Registry } from "./schema";

const ui: Registry = {
  globe: {
    name: "globe",
    type: "components:ui",
    files: ["./components/globe.tsx"],
  },
  "iphone-mock": {
    name: "iphone-mock",
    type: "components:ui",
    files: ["./components/iphone-simulator.tsx"],
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
};

const elements: Registry = {
  buttons: {
    name: "buttons",
    type: "components:elements",
    files: ["./elements/button.tsx"],
    component: React.lazy(() => import("./elements/button")),
  },
  // SOON 
  // textVariants: {
  //   name: "textVariants",
  //   type: "components:elements",
  //   files: ["./elements/text-variants.tsx"],
  //   component: React.lazy(() => import("./elements/text-variants")),
  // },
};
export const registry: Registry = {
  ...ui,
  ...elements,
  ...example,
};
