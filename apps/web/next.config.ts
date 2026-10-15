import { withContentCollections } from "@content-collections/next";
import createBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    registry: ["./registry/**/*"],
  },
};

export default withContentCollections(withAnalyzer(nextConfig as any) as any);
