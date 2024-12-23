import { buttons } from "./registry-button";
import { input } from "./registry-input";
import { showcase } from "./registry-showcase";
// import { ui } from "@/registry/registry-ui";
import type { Registry } from "./schema";

export const registry: Registry = {
  ...buttons,
  ...input,
  ...showcase,
};
