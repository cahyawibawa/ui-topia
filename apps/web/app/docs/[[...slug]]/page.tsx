import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  LinkSquare02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { findNeighbour } from "fumadocs-core/page-tree";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { getMDXComponents } from "@/components/mdx-components";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { Button } from "@/registry/ui/button";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const rawContent = await page.data.getText("raw");
  const neighbours = await findNeighbour(source.pageTree, page.url);
  const links = page.data.links;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      // lastUpdate={page.data.lastModified ? new Date(page.data.lastModified) : undefined}
      tableOfContent={{
        style: "clerk",
      }}
      footer={{ enabled: false }}
      // editOnGithub={{
      //   owner: "cahyawibawa",
      //   path: `apps/web/content/docs/${page.slugs.join("/")}.mdx`,
      //   repo: "ui-topia",
      // }}
    >
      <div className="space-y-3">
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        {(links?.doc || rawContent) && (
          <div className="flex items-center gap-2">
            {links?.doc && (
              <Button
                variant="outline"
                size="xs"
                render={
                  <Link href={links.doc} rel="noreferrer" target="_blank">
                    <HugeiconsIcon icon={LinkSquare02Icon} strokeWidth={2.5} />
                    API Reference
                  </Link>
                }
              />
            )}
            {rawContent ? <DocsCopyPage page={rawContent} /> : null}
          </div>
        )}
      </div>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
      {(neighbours?.previous || neighbours?.next) && (
        <div className="hidden items-center gap-2 pt-8 sm:flex">
          {neighbours?.previous && (
            <Button
              className="shadow-none"
              variant="outline"
              render={
                <Link href={neighbours.previous.url}>
                  <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2} />{" "}
                  {neighbours.previous.name}
                </Link>
              }
            />
          )}
          {neighbours?.next && (
            <Button
              className="ms-auto shadow-none"
              variant="outline"
              render={
                <Link href={neighbours.next.url}>
                  {neighbours.next.name}{" "}
                  <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} />
                </Link>
              }
            />
          )}
        </div>
      )}
      <div className="mt-10 pb-16 sm:pb-24">
        <SiteFooter />
      </div>
    </DocsPage>
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
