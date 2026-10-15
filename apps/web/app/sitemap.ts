import type { MetadataRoute } from "next";
import { publishedDocs } from "@/lib/docs";

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
    ...publishedDocs.map<MetadataRoute.Sitemap[number]>((doc) => ({
      changeFrequency: "weekly",
      priority: 0.5,
      url: url(doc.url),
    })),
  ];
}
