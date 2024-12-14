import { bundledLanguages, createHighlighter } from "shiki/bundle/web";

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
      themes: ["github-dark", "github-light"],
      langs: [...Object.keys(bundledLanguages)],
    });
  }

  const htmlDark = highlighter.codeToHtml(code, {
    lang,
    theme: "github-dark",
  });

  const htmlLight = highlighter.codeToHtml(code, {
    lang,
    theme: "github-light",
  });

  // Use data-theme attribute for theme switching
  const html = `
    <div data-theme-code>
      <div class="only-light">${htmlLight}</div>
      <div class="only-dark">${htmlDark}</div>
    </div>
  `;

  codeCache.set(cacheKey, html);
  return html;
};
