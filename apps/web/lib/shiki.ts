import { type Highlighter, bundledLanguages, createHighlighter } from "shiki";

// Global highlighter instance
let highlighterInstance: Highlighter | null = null;
const codeCache = new Map<string, string>();

// Initialize highlighter once
async function getShikiHighlighter() {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ["vesper", "snazzy-light"],
      langs: Object.keys(bundledLanguages),
    });
  }
  return highlighterInstance;
}

export async function codeToHtml({
  code,
  lang,
}: {
  code: string;
  lang: string;
}) {
  // Check cache first
  const cacheKey = `${code}-${lang}`;
  if (codeCache.has(cacheKey)) {
    return codeCache.get(cacheKey)!;
  }

  // Get or initialize highlighter
  const highlighter = await getShikiHighlighter();

  // Generate HTML for both themes
  const htmlDark = highlighter.codeToHtml(code, {
    lang,
    theme: "vesper",
  });

  const htmlLight = highlighter.codeToHtml(code, {
    lang,
    theme: "snazzy-light",
  });

  // Combine light and dark theme HTML
  const html = `
    <div data-theme-code>
      <div class="only-light">${htmlLight}</div>
      <div class="only-dark">${htmlDark}</div>
    </div>
  `;

  // Cache the result
  codeCache.set(cacheKey, html);
  return html;
}

// Cleanup function to dispose highlighter when needed
export function disposeHighlighter() {
  if (highlighterInstance) {
    highlighterInstance.dispose();
    highlighterInstance = null;
  }
}
