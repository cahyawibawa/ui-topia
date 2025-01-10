import { useMDXComponents } from "@/components/mdx-components";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";
import type { Page } from "@/lib/source";
import { source } from "@/lib/source";
import {
  DocsBody,
  DocsCategory,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";

interface Params {
  slug?: string[];
}

export const dynamicParams = false;
export const revalidate = false;

// biome-ignore lint/suspicious/noRedeclare: <explanation>
export default async function Page({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const { slug = [] } = resolvedParams;

  const page = source.getPage(slug);

  if (!page) notFound();

  const path = `apps/web/content/docs/${page.file.path}`;

  return (
    <DocsPage
      toc={page.data.toc}
      lastUpdate={page.data.lastModified}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
        single: false,
      }}
      editOnGithub={{
        repo: "ui-topia",
        owner: "cahyawibawa",
        path,
      }}
    >
      <DocsTitle className="font-semibold text-2xl">
        {page.data.title}
      </DocsTitle>
      <DocsDescription className="mb-6 text-base">
        {page.data.description}
      </DocsDescription>
      <DocsBody className="text-fd-foreground/80">
        <page.data.body components={useMDXComponents({})} />
        {page.data.index ? <DocsCategory page={page} from={source} /> : null}
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams(): Params[] {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const page = source.getPage(resolvedParams.slug || []);

  if (page == null) notFound();

  const description = page.data.description ?? siteConfig.description;

  const imageParams = new URLSearchParams();
  imageParams.set("title", page.data.title);
  imageParams.set("description", description);

  const image = {
    alt: "Banner",
    url: `/api/og?${imageParams.toString()}`,
    width: 1200,
    height: 630,
  };

  return createMetadata({
    title: page.data.title,
    description,
    openGraph: {
      url: `/docs/${page.slugs.join("/")}`,
      images: image,
    },
    twitter: {
      images: image,
    },
  });
}
