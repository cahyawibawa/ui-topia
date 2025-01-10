import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/registry/index.ts"],
  format: ["esm"],
  sourcemap: true,
  minify: true,
  target: "esnext",
  outDir: "dist",
  external: ["react"],
  esbuildOptions: (options) => {
    options.bundle = true;
    options.splitting = true;
  },
});
