import {
  type Highlighter,
  bundledLanguages,
  createHighlighter,
} from "shiki/bundle/web";

// Global highlighter promise to prevent race conditions
let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["vesper", "snazzy-light"],
      langs: [...Object.keys(bundledLanguages)],
    });
  }
  return highlighterPromise;
}

export async function codeToHtml({
  code,
  lang,
}: {
  code: string;
  lang: string;
}) {
  try {
    const highlighter = await getHighlighter();

    const htmlDark = highlighter.codeToHtml(code, {
      lang,
      theme: "vesper",
    });

    const htmlLight = highlighter.codeToHtml(code, {
      lang,
      theme: "snazzy-light",
    });

    return `
      <div data-theme-code>
        <div class="only-light">${htmlLight}</div>
        <div class="only-dark">${htmlDark}</div>
      </div>
    `;
  } catch (error) {
    console.error("Error highlighting code:", error);
    return `<pre><code>${code}</code></pre>`;
  }
}

// Optional: Cleanup function if needed
export function disposeHighlighter() {
  if (highlighterPromise) {
    highlighterPromise.then((highlighter) => highlighter.dispose());
    highlighterPromise = null;
  }
}
