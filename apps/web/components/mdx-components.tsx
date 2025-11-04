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
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper";
import { CodeTabs } from "@/components/code-tabs";
import { ComponentPreview } from "@/components/component-preview";
import { ComponentCollapse } from "@/components/component-preview-collapse";
import { ComponentSource } from "@/components/component-source";
import { InstallCommand } from "@/components/install-command";
import { cn } from "@/lib/utils";
import { getIconForLanguageExtension } from "@/registry/components/icons";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/ui/tabs";

const generator = createGenerator();

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    Accordion,
    Accordions,
    CodeCollapsibleWrapper,
    AutoTypeTable: (props) => (
      <AutoTypeTable generator={generator} {...props} />
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

    Callout,
    Card,
    Cards,
    ComponentCli,
    CodeTabs,
    InstallCommand,
    ComponentCollapse: ({
      name,
      ...props
    }: { name: string } & React.ComponentProps<typeof ComponentCollapse>) => {
      return <ComponentCollapse name={name} {...props} />;
    },
    ComponentPreview: ({
      name,
      ...props
    }: { name: string } & React.ComponentProps<typeof ComponentPreview>) => {
      return <ComponentPreview name={name} {...props} />;
    },
    ComponentSource: ({
      name,
      title,
      ...props
    }: { name: string; title?: string } & React.ComponentProps<
      typeof ComponentSource
    >) => {
      return <ComponentSource name={name} title={title} {...props} />;
    },
    File,
    Files,
    Folder,
    ImageZoom,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    figure: ({ className, ...props }: React.ComponentProps<"figure">) => {
      return (
        <figure
          className={cn("!bg-transparent !border-none !shadow-none", className)}
          {...props}
        />
      );
    },
    figcaption: ({
      className,
      children,
      ...props
    }: React.ComponentProps<"figcaption">) => {
      const iconExtension =
        "data-language" in props && typeof props["data-language"] === "string"
          ? getIconForLanguageExtension(props["data-language"])
          : null;

      return (
        <figcaption
          className={cn(
            "flex items-center gap-2 text-code-foreground [&_svg]:size-5 [&_svg]:text-code-foreground [&_svg]:opacity-70 sm:[&_svg]:size-4",
            className,
          )}
          {...props}
        >
          {iconExtension}
          {children}
        </figcaption>
      );
    },
    Step,
    Steps,
    code: ({
      className,
      __raw__,
      __src__,
      ...props
    }: React.ComponentProps<"code"> & {
      __raw__?: string;
      __src__?: string;
    }) => {
      // Inline Code.
      if (typeof props.children === "string") {
        return (
          <code
            className={cn(
              "relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] outline-none",
              className,
            )}
            {...props}
          />
        );
      }

      // Default codeblock.
      return <code {...props} />;
    },
    TypeTable,
    ...components,
    Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => {
      return <Tabs className={cn(className)} {...props} />;
    },
    TabsList: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsList>) => (
      <TabsList
        className={cn(
          "bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none",
          className,
        )}
        {...props}
      />
    ),
    TabsTab: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsTab>) => (
      <TabsTab className={cn("rounded-lg", className)} {...props} />
    ),
    TabsPanel: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsPanel>) => (
      <TabsPanel
        className={cn(
          "relative [&>.steps]:mt-6 [&_h3]:font-medium [&_h3]:text-base *:[figure]:first:mt-0",
          className,
        )}
        {...props}
      />
    ),
    Tab: ({ className, ...props }: React.ComponentProps<"div">) => (
      <div className={cn(className)} {...props} />
    ),
  };
}

export const useMDXComponents = getMDXComponents;
