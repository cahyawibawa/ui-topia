import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const defaultMetadata: Metadata = {
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : undefined,
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
};

export const defaultSocialMetadata = {
  openGraph: {
    description: siteConfig.description,
    images: ["/api/og"],
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: "website",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.creator,
    description: siteConfig.description,
    images: ["/api/og"],
    title: siteConfig.name,
  },
} satisfies Pick<Metadata, "openGraph" | "twitter">;

export function createMetadata(override: Metadata): Metadata {
  return {
    ...defaultMetadata,
    ...override,
    openGraph: {
      ...defaultSocialMetadata.openGraph,
      description:
        override.description ?? defaultSocialMetadata.openGraph.description,
      title: override.title ?? defaultSocialMetadata.openGraph.title,
      ...override.openGraph,
    },
    twitter: {
      ...defaultSocialMetadata.twitter,
      description:
        override.description ?? defaultSocialMetadata.twitter.description,
      title: override.title ?? defaultSocialMetadata.twitter.title,
      ...override.twitter,
    },
  };
}
