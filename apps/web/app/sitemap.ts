import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string): string =>
    new URL(path, process.env.NEXT_PUBLIC_APP_URL).toString();

  return [
    {
      changeFrequency: "monthly",
      priority: 1,
      url: url("/"),
    },
    {
      changeFrequency: "monthly",
      priority: 0.8,
      url: url("/docs"),
    },
    ...source.getPages().map<MetadataRoute.Sitemap[number]>((page) => ({
      changeFrequency: "weekly",
      lastModified: page.data.lastModified
        ? new Date(page.data.lastModified)
        : undefined,
      priority: 0.5,
      url: url(page.url),
    })),
  ];
}
