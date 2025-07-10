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
  external: ["react", "react-dom"],
  format: ["cjs", "esm"],
  sourcemap: true,
  splitting: false,
});
