import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string): string =>
    new URL(path, process.env.NEXT_PUBLIC_APP_URL).toString();

  return [
    {
      url: url("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: url("/docs"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...source.getPages().map<MetadataRoute.Sitemap[number]>((page) => ({
      url: url(page.url),
      lastModified: page.data.lastModified
        ? new Date(page.data.lastModified)
        : undefined,
      changeFrequency: "weekly",
      priority: 0.5,
    })),
  ];
}
