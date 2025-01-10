import type { ComponentType, LazyExoticComponent } from "react";
import * as z from "zod";

export const registryItemTypeSchema = z.enum([
  "registry:lib",
  "registry:block",
  "registry:component",
  "registry:showcase",
  "registry:ui",
  "registry:hook",
]);

export type RegistryComponent = LazyExoticComponent<ComponentType<any>>;

export const registryItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  type: registryItemTypeSchema,
  component: z.any(),
  files: z.array(z.string()),
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  tailwind: z
    .object({
      config: z.object({
        content: z.array(z.string()).optional(),
        theme: z.record(z.string(), z.any()).optional(),
        plugins: z.array(z.string()).optional(),
      }),
    })
    .optional(),
  cssVars: z
    .object({
      light: z.record(z.string(), z.string()).optional(),
      dark: z.record(z.string(), z.string()).optional(),
    })
    .optional(),
  meta: z.record(z.string(), z.any()).optional(),
  docs: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export const registrySchema = z.array(registryItemSchema);

export interface RegistryItem
  extends Omit<z.infer<typeof registryItemSchema>, "component"> {
  component: RegistryComponent;
}

export type Registry = RegistryItem[];
