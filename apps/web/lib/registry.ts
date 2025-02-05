import registry from "@/registry.json";
import type { RegistryItem } from "shadcn/registry";

const components = registry.items as RegistryItem[];

const PATH_MAPPINGS = {
  "@/uitopia/": "@/components/ui/",
  "@/registry/ui": "@/components/ui",
  "@/registry/hooks": "@/hooks",
  "@/registry/lib": "@/lib",
} as const;

export function getComponents(): readonly RegistryItem[] {
  return components;
}

export function getComponentsByName(name: string): RegistryItem | null {
  return components.find((item) => item.name === name) ?? null;
}

export function convertRegistryPaths(content: string): string {
  return Object.entries(PATH_MAPPINGS).reduce(
    (acc, [from, to]) => acc.replace(new RegExp(from, "g"), to),
    content,
  );
}

export function formatComponentName(name: string) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
