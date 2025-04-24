import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.resolveExtensions = [".tsx", ".ts", ".jsx", ".js"];
    options.alias = {
      "@": "./src",
      "@/components": "./src/components",
      "@/lib": "./src/lib",
      "@/hooks": "./src/hooks",
    };
    options.banner = {
      js: '"use client"',
    };
  },
});
