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

// biome-ignore lint/suspicious/noRedeclare: <explanation>
export default async function Page({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const { slug = [] } = resolvedParams;

  const page = source.getPage(slug);

  if (!page) notFound();

  const path = `apps/web/content/docs/${page.file.path}`;

  return (
    <>
      <DocsPage
        toc={page.data.toc}
        lastUpdate={page.data.lastModified}
        full={page.data.full}
        tableOfContent={{
          style: "clerk",
          single: false,
        }}
        editOnGithub={{
          repo: "uitopia",
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
        <DocsBody className="prose prose-zinc dark:prose-invert min-w-0 max-w-full flex-1 prose-h1:scroll-m-20 prose-h2:scroll-m-20 prose-h3:scroll-m-20 prose-h4:scroll-m-20 prose-h5:scroll-m-20 prose-h6:scroll-m-20 pb-16 prose-h1:font-semibold prose-h2:font-medium prose-h3:font-medium prose-strong:font-medium prose-h1:text-2xl prose-h2:text-xl prose-h3:text-base ">
          <page.data.body components={useMDXComponents({})} />
          {page.data.index ? <DocsCategory page={page} from={source} /> : null}
        </DocsBody>
      </DocsPage>
    </>
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
