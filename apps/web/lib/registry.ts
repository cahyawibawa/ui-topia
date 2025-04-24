import registry from "@/registry.json";
import type { RegistryItem } from "shadcn/registry";

const components = registry.items as RegistryItem[];

const PATH_MAPPINGS = {
  "@/uitopia/": "@/components/ui/",
  "@/registry/ui": "@/components/ui",
  "@/registry/components": "@/components/ui",
  "@/registry/hooks": "@/hooks",
  "@/registry/lib": "@/lib",
} as const;

export interface FileTree {
  name: string;
  path?: string;
  children?: FileTree[];
}

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

function getFileTarget(file: { path: string; type?: string }) {
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

  // First pass: collect all unique paths
  const uniquePaths = new Set<string>();
  for (const file of files) {
    const target = file.target ?? getFileTarget(file);
    if (target) uniquePaths.add(target);
  }

  // Second pass: create tree structure
  for (const file of files) {
    const target = file.target ?? getFileTarget(file);
    if (!target || !uniquePaths.has(target)) continue;

    const parts = target.split("/");
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!part) continue;

      const isFile = i === parts.length - 1;
      const existingNode = currentLevel.find((node) => node.name === part);

      if (existingNode) {
        if (isFile) {
          existingNode.path = file.path;
        } else {
          currentLevel = existingNode.children!;
        }
      } else {
        const newNode: FileTree = {
          name: part,
          ...(isFile ? { path: file.path } : { children: [] }),
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
