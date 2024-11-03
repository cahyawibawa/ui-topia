import type { Page } from "@/app/source";
import { source } from "@/app/source";
import { useMDXComponents } from "@/components/mdx/mdx-components";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata/metadata";
import {
  DocsBody,
  DocsCategory,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
// biome-ignore lint/suspicious/noRedeclare: <explanation>
export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<ReactElement> {
  const params = await props.params;
  const page = source.getPage(params.slug);

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
        repo: "uitopia",
        owner: "cahyawibawa",
        // sha: 'dev',
        path,
      }}
    >
      <DocsTitle className="font-semibold text-2xl">{page.data.title}</DocsTitle>
      <DocsDescription className="text-base">{page.data.description}</DocsDescription>
      <DocsBody className="prose prose-zinc dark:prose-invert prose-h1:scroll-m-20 prose-h2:scroll-m-20 prose-h3:scroll-m-20 prose-h4:scroll-m-20 prose-h5:scroll-m-20 prose-h6:scroll-m-20 prose-h1:font-semibold prose-h2:font-medium prose-h3:font-medium prose-strong:font-medium prose-h1:text-2xl prose-h2:text-xl prose-h3:text-base ">
        <page.data.body components={useMDXComponents({})} />
        {page.data.index ? <DocsCategory page={page} from={source} /> : null}
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams(): { slug: string[] }[] {
  return source.generateParams();
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const page = source.getPage(params.slug);

  if (page == null) notFound();

  const description =
    page.data.description ??
    siteConfig.description;

  const imageParams = new URLSearchParams();
  imageParams.set('title', page.data.title);
  imageParams.set('description', description);

  const image = {
    alt: 'Banner',
    url: `/api/og?${imageParams.toString()}`,
    width: 1200,
    height: 630,
  };

  return createMetadata({
    title: page.data.title,
    description,
    openGraph: {
      url: `/docs/${page.slugs.join('/')}`,
      images: image,
    },
    twitter: {
      images: image,
    },
  });
}
