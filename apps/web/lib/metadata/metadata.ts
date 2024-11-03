import { siteConfig } from "@/config/site";
import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: siteConfig.url,
      images: "/banner.png",
      siteName: siteConfig.name,
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.creator,
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: "/banner.png",
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL(`https://${process.env.VERCEL_URL}`);
