import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Callout } from "fumadocs-ui/components/callout";
import { Card, Cards } from "fumadocs-ui/components/card";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import ComponentCli from "@/components/cli-commands";
import { ComponentPreview } from "@/components/content/component-preview";
import { ComponentCollapse } from "@/components/content/component-preview-collapse";
import { ComponentSource } from "@/components/content/component-source";
import { cn } from "@/lib/utils";
import { Reference, References } from "@/uitopia/references";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/uitopia/tabs";

const generator = createGenerator();

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    Accordion,
    Accordions,
    Callout,
    Card,
    Cards,
    ComponentCli,
    Files,
    File,
    Folder,
    Reference,
    References,
    TypeTable,
    ImageZoom,
    Steps,
    Step,
    AutoTypeTable: (props) => (
      <AutoTypeTable generator={generator} {...props} />
    ),
    ComponentPreview: ({
      name,
      ...props
    }: { name: string } & React.ComponentProps<typeof ComponentPreview>) => {
      return <ComponentPreview name={name} {...props} />;
    },
    ComponentCollapse: ({
      name,
      ...props
    }: { name: string } & React.ComponentProps<typeof ComponentCollapse>) => {
      return <ComponentCollapse name={name} {...props} />;
    },
    ComponentSource: ({
      name,
      ...props
    }: { name: string } & React.ComponentProps<typeof ComponentSource>) => {
      return <ComponentSource name={name} {...props} />;
    },
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    // InstallTabs: ({
    //   items,
    //   children,
    // }: {
    //   items: string[];
    //   children: ReactNode;
    // }) => (
    //   <Tabs items={items} id="package-manager">
    //     {children}
    //   </Tabs>
    // ),
    blockquote: (props) => <Callout>{props.children}</Callout>,
    ...components,
    Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
      <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
    ),
    TabsList: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsList>) => (
      <TabsList
        className={cn(
          "w-full justify-start rounded-none border-b bg-transparent p-0",
          className,
        )}
        {...props}
      />
    ),
    TabsTrigger: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsTrigger>) => (
      <TabsTrigger
        className={cn(
          "relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
          className,
        )}
        {...props}
      />
    ),
    TabsContent: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsContent>) => (
      <TabsContent
        className={cn(
          "relative [&_h3.font-heading]:font-semibold [&_h3.font-heading]:text-base",
          className,
        )}
        {...props}
      />
    ),
  };
}
