import { buttons } from "@/registry/registry-buttons";
import { input } from "@/registry/registry-inputs";
import { lib } from "@/registry/registry-lib";
import { showcase } from "@/registry/registry-showcases";
import { ui } from "@/registry/registry-ui";
import type { Registry } from "@/registry/schema";

// Ensure that the registry always have an array of registry items
const ensureArray = <T>(items: T | T[]): T[] =>
  Array.isArray(items) ? items : Object.values(items as object);

// Combine all registry items into a single array
export const registry: Registry = [
  ...ensureArray(buttons),
  ...ensureArray(input),
  ...ensureArray(lib),
  ...ensureArray(ui),
  ...ensureArray(showcase),
];

// Utility functions
export const getComponentByName = (name: string) =>
  registry.find((item) => item.name === name);

export const getComponentsByCategory = (category: string) => {
  return ensureArray(registry)
    .filter((item) => item.categories?.includes(category))
    .map((item) => item.name);
};
