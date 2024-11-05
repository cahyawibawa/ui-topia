import { bundledLanguages, createHighlighter } from "shiki";

let highlighter: any = null;
const codeCache = new Map<string, string>();

export const codeToHtml = async ({
  code,
  lang,
}: {
  code: string;
  lang: string;
}) => {
  const cacheKey = `${code}-${lang}`;
  if (codeCache.has(cacheKey)) {
    return codeCache.get(cacheKey)!;
  }

  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["vesper"],
      langs: [...Object.keys(bundledLanguages)],
    });
  }

  const html = highlighter.codeToHtml(code, {
    lang: lang,
    theme: "vesper",
  });

  codeCache.set(cacheKey, html);
  return html;
};
