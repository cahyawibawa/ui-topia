import { ComponentBase } from "@/components/component-base";
import { ComponentCollapse } from "@/components/component-collapse";
import { ComponentPreview } from "@/components/component-preview";
import { extractSourceCode } from "@/lib/code";
import { createTypeTable } from "fumadocs-typescript/ui";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Callout } from "fumadocs-ui/components/callout";
import { Card, Cards } from "fumadocs-ui/components/card";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

const { AutoTypeTable } = createTypeTable();

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    AutoTypeTable,
    Accordion,
    Accordions,
    Card,
    Cards,
    Files,
    File,
    Folder,
    Tabs,
    Tab,
    Callout,
    TypeTable,
    ImageZoom,
    Steps,
    Step,

    ComponentPreview: async ({ name, ...props }: { name: string }) => {
      const { code, highlightedCode } = await extractSourceCode(name);
      return (
        <ComponentPreview
          name={name}
          code={code}
          highlightedCode={highlightedCode}
          {...props}
        />
      );
    },
    ComponentCollapse: async ({ name, ...props }: { name: string }) => {
      const { code, highlightedCode } = await extractSourceCode(name);
      return (
        <ComponentCollapse
          name={name}
          code={code}
          highlightedCode={highlightedCode}
          {...props}
        />
      );
    },
    ComponentBase: async ({ name, ...props }: { name: string }) => {
      const { code, highlightedCode } = await extractSourceCode(name);
      return (
        <ComponentBase
          name={name}
          code={code}
          highlightedCode={highlightedCode}
          {...props}
        />
      );
    },
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    InstallTabs: ({
      items,
      children,
    }: {
      items: string[];
      children: ReactNode;
    }) => (
      <Tabs items={items} id="package-manager">
        {children}
      </Tabs>
    ),
    blockquote: (props) => <Callout>{props.children}</Callout>,
    ...components,
  };
}
