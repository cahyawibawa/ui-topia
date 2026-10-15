import { MDXContent } from "@content-collections/mdx/react";
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  LinkSquare02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SectionIndex } from "@/components/docs/section-index";
import { Toc } from "@/components/docs/toc";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { getMDXComponents } from "@/components/mdx-components";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/config/site";
import { getDoc, getNeighbours, publishedDocs } from "@/lib/docs";
import { createMetadata } from "@/lib/metadata";
import { Button } from "@/registry/ui/button";

type Params = { params: Promise<{ slug?: string[] }> };

export default async function Page(props: Params) {
  const { slug = [] } = await props.params;
  if (slug.length === 0) redirect("/docs/ui");

  const doc = getDoc(slug);
  if (!doc) notFound();

  const { previous, next } = getNeighbours(doc);
  const links = doc.links;

  return (
    <>
      <article className="docs-article min-w-0 pt-4 md:col-start-2 md:row-start-1 xl:pt-6">
        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <h1 className="mb-0! text-balance font-medium text-lg tracking-normal">
              {doc.title}
            </h1>
            {doc.description && (
              <p className="text-muted-foreground! text-sm">
                {doc.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2.5 pb-3 sm:gap-3 sm:pb-4">
            {links?.doc && (
              <Button
                variant="secondary"
                size="xs"
                render={
                  <Link href={links.doc} rel="noreferrer" target="_blank">
                    <HugeiconsIcon icon={LinkSquare02Icon} strokeWidth={2.5} />
                    API Reference
                  </Link>
                }
              />
            )}
            <DocsCopyPage page={doc.raw} url={doc.url} />
          </div>
        </div>
        <div className="docs-prose">
          <MDXContent code={doc.mdx} components={getMDXComponents()} />
        </div>
        {doc.slug.length === 1 && (
          <SectionIndex group={doc.group} current={doc.url} />
        )}
        {(previous || next) && (
          <div className="flex items-center gap-2 pt-8">
            {previous && (
              <Button
                className="shadow-none"
                variant="outline"
                size="sm"
                render={
                  <Link href={previous.url}>
                    <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2} />{" "}
                    {previous.title}
                  </Link>
                }
              />
            )}
            {next && (
              <Button
                className="ms-auto shadow-none"
                variant="outline"
                size="sm"
                render={
                  <Link href={next.url}>
                    {next.title}{" "}
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
      </article>
      <aside className="sticky top-14 hidden h-fit w-56 justify-self-end pt-6 md:col-start-3 md:row-start-1 xl:block">
        <Toc items={doc.toc} />
      </aside>
    </>
  );
}

export function generateStaticParams() {
  return [{ slug: [] }, ...publishedDocs.map((doc) => ({ slug: doc.slug }))];
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { slug = [] } = await props.params;
  const doc = getDoc(slug);
  if (!doc) return {};

  const description = doc.description ?? siteConfig.description;

  const imageParams = new URLSearchParams();
  imageParams.set("title", doc.title);
  imageParams.set("description", description);

  const image = {
    alt: "Banner",
    height: 630,
    url: `/api/og?${imageParams.toString()}`,
    width: 1200,
  };

  return createMetadata({
    description,
    openGraph: { images: image, url: doc.url },
    title: doc.title,
    twitter: { images: image },
  });
}
