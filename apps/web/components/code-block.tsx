import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  return (
    <DynamicCodeBlock
      code={code}
      lang={language}
      options={{
        themes: {
          dark: "github-dark",
          light: "github-light",
        },
      }}
    />
  );
}
