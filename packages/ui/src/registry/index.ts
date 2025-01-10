import { buttons } from "./registry-buttons";
import { input } from "./registry-inputs";
import { showcase } from "./registry-showcases";
import type { Registry } from "./schema";

export const registry: Registry = [...buttons, ...input, ...showcase];

export const getComponentsByCategory = (category: string) =>
  registry.filter((item) => item.categories?.includes(category));

export const getComponentByName = (name: string) =>
  registry.find((item) => item.name === name);
