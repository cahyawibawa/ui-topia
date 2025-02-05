import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  return (
    <DynamicCodeBlock
      lang={language}
      code={code}
      options={{
        components: {
          // add/override components
        },
      }}
    />
  );
}
