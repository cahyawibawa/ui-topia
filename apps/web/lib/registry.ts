import type { RegistryItem } from "shadcn/registry";
import registry from "@/registry.json" with { type: "json" };

const components = registry.items as RegistryItem[];

const PATH_MAPPINGS = {
  "@/registry/hooks": "@/hooks",
  "@/registry/lib": "@/lib",
  "@/registry/ui": "@/components/ui",
  "@/uitopia/": "@/components/ui/",
} as const;

export interface FileTree {
  name: string;
  path: string; // Original path from registry.json
  displayPath: string; // Transformed path for display (e.g., app/...)
  children?: FileTree[];
}

export function getComponents(): readonly RegistryItem[] {
  return components;
}

export function getComponentsByName(name: string): RegistryItem | null {
  return components.find((item) => item.name === name) ?? null;
}

export function convertRegistryPaths(content: string): string {
  let updatedContent = content;

  // 1. Handle specific block component imports
  const blockComponentRegex =
    /@\/registry\/blocks\/([\w-]+)\/components\/([\w-]+)/g;
  updatedContent = updatedContent.replace(
    blockComponentRegex,
    (_match, _blockName, componentName) => `@/components/${componentName}`,
  );

  // 2. Handle general registry path mappings
  updatedContent = Object.entries(PATH_MAPPINGS).reduce(
    (acc, [from, to]) => acc.replace(new RegExp(from, "g"), to),
    updatedContent, // Start with the already updated content
  );

  return updatedContent;
}

export function getFileTarget(file: { path: string; type?: string }) {
  if (!file.path) return "";

  const pathParts = file.path.split("/");
  const blocksIndex = pathParts.indexOf("blocks");
  if (blocksIndex === -1) return file.path;

  const componentName = pathParts[blocksIndex + 1];
  const fileName = pathParts[pathParts.length - 1];
  const isComponent = pathParts.includes("components");

  if (isComponent) {
    return `components/${fileName}`;
  }

  if (fileName === "page.tsx") {
    return `app/${componentName}/${fileName}`;
  }

  return fileName;
}

export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>,
): FileTree[] {
  const root: FileTree[] = [];

  // First pass: collect all unique display paths and map them back to original paths
  const uniquePaths = new Map<string, string>(); // Map<displayPath, originalPath>
  for (const file of files) {
    const displayPath = file.target ?? getFileTarget(file);
    if (displayPath && !uniquePaths.has(displayPath)) {
      uniquePaths.set(displayPath, file.path);
    }
  }

  // Second pass: create tree structure using display paths
  for (const [displayPath, originalPath] of uniquePaths.entries()) {
    const parts = displayPath.split("/");
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!part) continue;

      const isFile = i === parts.length - 1;
      const existingNode = currentLevel.find((node) => node.name === part);

      if (existingNode) {
        if (isFile) {
          // This shouldn't happen if display paths are unique, but handle defensively
          existingNode.path = originalPath;
          existingNode.displayPath = displayPath;
        } else {
          // Ensure children array exists
          existingNode.children = existingNode.children || [];
          currentLevel = existingNode.children;
        }
      } else {
        const newNode: FileTree = {
          children: isFile ? undefined : [],
          displayPath: isFile ? displayPath : "", // Only files have a meaningful original path here
          name: part, // Folders don't have a direct path
          path: isFile ? originalPath : "",
        };

        currentLevel.push(newNode);

        if (!isFile) {
          currentLevel = newNode.children!;
        }
      }
    }
  }

  return root;
}
