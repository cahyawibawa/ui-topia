import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import GithubSlugger from "github-slugger";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { rehypeSyntaxHighlight } from "./lib/rehype-syntax-highlight";

export type TocItem = { title: string; url: string; depth: number };

// Strip inline markdown (code ticks, links, emphasis) so TOC titles match
// the text rehype-slug sees when it generates heading ids.
function plainText(markdown: string) {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_]/g, "")
    .trim();
}

function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^ {0,3}(#{1,4})\s+(.+?)(?:\s+#+)?\s*$/.exec(line);
    if (!match) continue;

    const [, hashes = "", text = ""] = match;
    const title = plainText(text);
    const url = `#${slugger.slug(title)}`;
    // h1 only reserves a slug; the page title is rendered separately.
    if (hashes.length >= 2) {
      toc.push({ title, url, depth: hashes.length });
    }
  }

  return toc;
}

const docs = defineCollection({
  name: "docs",
  directory: "content/docs",
  include: "**/*.mdx",
  schema: z.object({
    content: z.string(),
    title: z.string(),
    description: z.string().optional(),
    links: z
      .object({
        doc: z.string().optional(),
        api: z.string().optional(),
      })
      .optional(),
    order: z.number().default(0),
    publishedAt: z.string().optional(),
    status: z.enum(["draft", "soon", "published"]).default("published"),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeSyntaxHighlight],
    });

    // `ui/components/button` -> ["ui", "components", "button"]; a trailing
    // `index` collapses to its folder (`ui/index` -> ["ui"]).
    const parts = document._meta.path.split("/");
    if (parts.at(-1) === "index") parts.pop();

    return {
      ...document,
      slug: parts,
      url: ["/docs", ...parts].join("/"),
      group: document._meta.path.split("/")[0] ?? "",
      raw: document.content,
      toc: extractToc(document.content),
      mdx,
    };
  },
});

export default defineConfig({
  content: [docs],
});
