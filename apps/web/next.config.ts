import createBundleAnalyzer from "@next/bundle-analyzer";
import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    registry: ["./registry/**/*"],
  },
  serverExternalPackages: ["ts-morph", "typescript", "@shikijs/twoslash"],
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

const withMDX = createMDX();

export default withAnalyzer(withMDX(nextConfig));
