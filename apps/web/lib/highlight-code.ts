import { transformerNotationWordHighlight } from "@shikijs/transformers";
import type { ShikiTransformer } from "shiki";
import { codeToHtml } from "shiki";

export const transformers = [
  {
    code(node) {
      if (node.tagName === "code") {
        const raw = this.source;
        node.properties["__raw__"] = raw;
        if (raw.startsWith("npm install")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace("npm install", "yarn add");
          node.properties["__pnpm__"] = raw.replace("npm install", "pnpm add");
          node.properties["__bun__"] = raw.replace("npm install", "bun add");
        }
        if (raw.startsWith("npx create-")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace(
            "npx create-",
            "yarn create ",
          );
          node.properties["__pnpm__"] = raw.replace(
            "npx create-",
            "pnpm create ",
          );
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun");
        }
        // npm create.
        if (raw.startsWith("npm create")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace(
            "npm create",
            "yarn create",
          );
          node.properties["__pnpm__"] = raw.replace(
            "npm create",
            "pnpm create",
          );
          node.properties["__bun__"] = raw.replace("npm create", "bun create");
        }
        // npx.
        if (raw.startsWith("npx")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace("npx", "yarn dlx");
          node.properties["__pnpm__"] = raw.replace("npx", "pnpm dlx");
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun");
        }
        // npm run.
        if (raw.startsWith("npm run")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace("npm run", "yarn");
          node.properties["__pnpm__"] = raw.replace("npm run", "pnpm");
          node.properties["__bun__"] = raw.replace("npm run", "bun");
        }
      }
    },
  },
  transformerNotationWordHighlight(),
] as ShikiTransformer[];

export async function highlightCode(
  code: string,
  language = "tsx",
  options?: { showLineNumbers?: boolean },
) {
  const { showLineNumbers = false } = options ?? {};
  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
    transformers: [
      {
        pre(node) {
          node.properties["class"] =
            "text-[.8125rem] min-w-0 px-3 py-2.5 outline-none";
          node.properties["style"] =
            "border: none !important; overflow: auto !important;";
        },
        code(node) {
          node.properties["style"] = "border: none !important;";
          if (showLineNumbers) {
            node.properties["data-line-numbers"] = "";
          }
        },
        line(node) {
          node.properties["data-line"] = "";
        },
      },
      transformerNotationWordHighlight(),
    ],
  });

  return html;
}
