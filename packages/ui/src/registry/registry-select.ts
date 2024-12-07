import type { Registry } from "@/registry/schema";
import * as React from "react";

export const select: Registry = {
  "select-1": {
    name: "select-1",
    type: "components:ui",
    files: ["@/components/selects/button-1.tsx"],
    component: React.lazy(() => import("@/components/selects/select-1")),
  },
};
