import { buttons } from "@/registry/registry-button";
import { input } from "@/registry/registry-input";
import { showcase } from "@/registry/registry-showcase";
import type { Registry } from "@/registry/schema";

export const registry: Registry = {
  ...buttons,
  ...input,
  ...showcase,
};
