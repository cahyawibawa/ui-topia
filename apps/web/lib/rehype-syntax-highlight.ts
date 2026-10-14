import { type BundledLanguage, codeToHast } from "shiki";

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  data?: { meta?: string };
  children?: HastNode[];
};

const THEMES = { light: "github-light", dark: "github-dark" } as const;

function textContent(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  return node.children?.map(textContent).join("") ?? "";
}

function classesOf(node: HastNode): string[] {
  const className = node.properties?.className;
  if (Array.isArray(className)) return className.map(String);
  return typeof className === "string" ? className.split(" ") : [];
}

function languageFrom(node: HastNode) {
  const match = classesOf(node).find((name) => name.startsWith("language-"));
  return match?.slice("language-".length) as BundledLanguage | undefined;
}

function titleFrom(meta?: string) {
  return meta
    ?.match(/title=(?:"([^"]*)"|'([^']*)')/)
    ?.slice(1)
    .find(Boolean);
}

async function highlight(code: string, lang: string) {
  const hast = await codeToHast(code, {
    lang,
    themes: THEMES,
    defaultColor: false,
    transformers: [
      {
        line(node) {
          node.properties["data-line"] = "";
        },
      },
    ],
  });
  return hast.children[0] as HastNode;
}

/**
 * Highlights fenced code blocks (dual light/dark themes through
 * `--shiki-light` / `--shiki-dark` vars) and carries the fence's
 * `title="..."` meta through as `data-title` + `data-language` on `<pre>`.
 */
export function rehypeSyntaxHighlight() {
  return async (tree: HastNode) => {
    async function visit(node: HastNode): Promise<void> {
      const code = node.children?.[0];

      if (node.tagName === "pre" && code?.tagName === "code") {
        const lang = languageFrom(code) ?? ("text" as BundledLanguage);
        const source = textContent(code).replace(/\n$/, "");
        const pre = await highlight(source, lang);

        node.properties = {
          ...pre.properties,
          "data-language": lang,
          "data-title": titleFrom(code.data?.meta),
          "data-raw": source,
        };
        node.children = pre.children;
        return;
      }

      for (const child of node.children ?? []) await visit(child);
    }

    await visit(tree);
  };
}
