import { Control } from "@/app/(home)/blog/[slug]/page.client";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";
import { blog } from "@/lib/source";
import { buttonVariants } from "@ui-topia/button";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();

  return (
    <>
      <div
        className="container rounded-xl border py-12 md:px-8"
        style={{
          backgroundColor: "black",
          backgroundImage: [
            "linear-gradient(140deg, hsla(274,94%,54%,0.3), transparent 50%)",
            "linear-gradient(to left top, hsla(260,90%,50%,0.8), transparent 50%)",
            "radial-gradient(circle at 100% 100%, hsla(240,100%,82%,1), hsla(240,40%,40%,1) 17%, hsla(240,40%,40%,0.5) 20%, transparent)",
          ].join(", "),
          backgroundBlendMode: "difference, difference, normal",
        }}
      >
        <h1 className="mb-2 font-bold text-3xl text-white">
          {page.data.title}
        </h1>
        <p className="mb-4 text-white/80">{page.data.description}</p>
        <Link
          href="/blog"
          className={buttonVariants({ size: "sm", variant: "secondary" })}
        >
          Back
        </Link>
      </div>
      <article className="container flex flex-col px-0 py-8 lg:flex-row lg:px-4">
        <div className="prose min-w-0 flex-1 p-4">
          <InlineTOC items={page.data.toc} />
          <page.data.body components={defaultMdxComponents} />
        </div>
        <div className="flex flex-col gap-4 border-l p-4 text-sm lg:w-[250px]">
          <div>
            <p className="mb-1 text-fd-muted-foreground">Written by</p>
            <p className="font-medium">{page.data.author}</p>
          </div>
          <div>
            <p className="mb-1 text-fd-muted-foreground text-sm">At</p>
            <p className="font-medium">
              {new Date(page.data.date ?? page.file.name).toDateString()}
            </p>
          </div>
          <Control url={page.url} />
        </div>
      </article>
    </>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const description = page.data.description ?? siteConfig.description;

  return createMetadata({
    title: page.data.title,
    description,
  });
}

export function generateStaticParams(): { slug: string }[] {
  return blog
    .getPages()
    .map((page) => page.slugs[0])
    .filter((slug): slug is string => slug !== undefined)
    .map((slug) => ({
      slug,
    }));
}
