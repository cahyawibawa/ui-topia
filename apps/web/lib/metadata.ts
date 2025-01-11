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

export const defaultSocialMetadata = {
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    images: ["/api/og"],
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.creator,
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/api/og"],
  },
} satisfies Pick<Metadata, "openGraph" | "twitter">;

export function createMetadata(override: Metadata): Metadata {
  return {
    ...defaultMetadata,
    ...override,
    openGraph: {
      ...defaultSocialMetadata.openGraph,
      title: override.title ?? defaultSocialMetadata.openGraph.title,
      description:
        override.description ?? defaultSocialMetadata.openGraph.description,
      ...override.openGraph,
    },
    twitter: {
      ...defaultSocialMetadata.twitter,
      title: override.title ?? defaultSocialMetadata.twitter.title,
      description:
        override.description ?? defaultSocialMetadata.twitter.description,
      ...override.twitter,
    },
  };
}
