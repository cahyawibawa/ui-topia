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
      <DocsTitle className="font-semibold text-xl">{page.data.title}</DocsTitle>
      <DocsDescription className="text-base">
        {page.data.description}
      </DocsDescription>
      <DocsBody className="prose-h2:text-lg prose-h3:text-base opacity-[0.9]">
        <MDX components={useMDXComponents({})} />
      </DocsBody>
    </DocsPage>
  );
}

function _DocsCategory({ url }: { url: string }) {
  return (
    <Cards>
      {getPageTreePeers(source.pageTree, url).map((peer) => (
        <Card key={peer.url} title={peer.name} href={peer.url}>
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
