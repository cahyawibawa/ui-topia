import { getPageTreePeers } from "fumadocs-core/server";
import { Card, Cards } from "fumadocs-ui/components/card";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { useMDXComponents } from "@/components/content/mdx-components";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const path = `apps/web/content/docs/${page.file.path}`;
  const MDX = page.data.body;

  return (
    <DocsPage
      editOnGithub={{
        owner: "cahyawibawa",
        path,
        repo: "ui-topia",
      }}
      full={page.data.full}
      lastUpdate={page.data.lastModified}
      tableOfContent={{
        single: false,
        style: "clerk",
      }}
      toc={page.data.toc}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={useMDXComponents({})} />
      </DocsBody>
    </DocsPage>
  );
}

function _DocsCategory({ url }: { url: string }) {
  return (
    <Cards>
      {getPageTreePeers(source.pageTree, url).map((peer) => (
        <Card href={peer.url} key={peer.url} title={peer.name}>
          {peer.description}
        </Card>
      ))}
    </Cards>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (page == null) notFound();

  const description = page.data.description ?? siteConfig.description;

  const imageParams = new URLSearchParams();
  imageParams.set("description", description);

  const image = {
    alt: "Banner",
    height: 630,
    url: `/api/og?${imageParams.toString()}`,
    width: 1200,
  };

  return createMetadata({
    description,
    openGraph: {
      images: image,
      url: `/docs/${page.slugs.join("/")}`,
    },
    title: page.data.title,
    twitter: {
      images: image,
    },
  });
}
