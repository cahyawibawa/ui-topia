import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.tsx"],
  esbuildOptions(options) {
    options.resolveExtensions = [".tsx", ".ts", ".jsx", ".js"];
    options.alias = {
      "@": "./src",
      "@/components": "./src/components",
      "@/hooks": "./src/hooks",
      "@/lib": "./src/lib",
    };
    options.banner = {
      js: '"use client"',
    };
  },
  external: [
    "react",
    "react-dom",
    "@radix-ui/react-accordion",
    "@radix-ui/react-alert-dialog",
    "@radix-ui/react-avatar",
    "@radix-ui/react-checkbox",
    "@radix-ui/react-collapsible",
    "@radix-ui/react-dialog",
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-icons",
    "@radix-ui/react-label",
    "@radix-ui/react-scroll-area",
    "@radix-ui/react-separator",
    "@radix-ui/react-slot",
    "@radix-ui/react-switch",
    "@radix-ui/react-tabs",
    "@radix-ui/react-toggle",
    "@radix-ui/react-toggle-group",
    "@radix-ui/react-tooltip",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "@number-flow/react",
    "@remixicon/react",
    "lucide-react",
    "motion",
    "react-icons",
    "react-resizable-panels",
    "usehooks-ts",
    "vaul",
    "zod",
  ],
  format: ["cjs", "esm"],
  sourcemap: true,
  splitting: false,
});
