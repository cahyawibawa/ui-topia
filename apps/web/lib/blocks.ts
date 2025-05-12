"use server";

import type { RegistryItem } from "shadcn/registry";
import { getComponents, getComponentsByName } from "./registry";

export async function getAllBlockIds(
  types: RegistryItem["type"][] = ["registry:block"],
  categories: string[] = [],
): Promise<string[]> {
  try {
    // Get all components from local registry
    const registry = getComponents();

    const blocks = registry
      .filter((item: RegistryItem) => types.includes(item.type))
      .map((item: RegistryItem) => item.name);

    // If no categories specified, return all blocks
    if (categories.length === 0) {
      return blocks;
    }

    // Filter blocks by category
    const filteredBlocks = [];
    for (const name of blocks) {
      const blockData = getComponentsByName(name);

      if (
        blockData?.categories?.some((category) =>
          categories.includes(category.toLowerCase()),
        )
      ) {
        filteredBlocks.push(name);
      }
    }

    return filteredBlocks;
  } catch (error) {
    console.error("Error getting blocks:", error);
    return [];
  }
}

export async function getBlockCategories(): Promise<
  Array<{ name: string; slug: string }>
> {
  try {
    const registry = getComponents();

    const categories = new Set<string>();

    // Get all block names first
    const blocks = registry.filter(
      (item: RegistryItem) => item.type === "registry:block",
    );

    // Collect categories from each block
    for (const block of blocks) {
      if (block.categories) {
        for (const category of block.categories) {
          categories.add(category.toLowerCase());
        }
      }
    }

    return Array.from(categories).map((category) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      slug: category,
    }));
  } catch (error) {
    console.error("Error getting categories:", error);
    return [];
  }
}
