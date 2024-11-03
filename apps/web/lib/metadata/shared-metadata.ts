import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : undefined,
  keywords: siteConfig.keywords,
};

export const twitterMetadata: Metadata["twitter"] = {
  creator: siteConfig.creator,
  title: siteConfig.name,
  description: siteConfig.description,
  card: "summary_large_image",
  images: ["/api/og"],
};

export const ogMetadata: Metadata["openGraph"] = {
  title: siteConfig.name,
  description: siteConfig.description,
  type: "website",
  images: ["/api/og"],
};
