import { Link, Links } from "@/components/mdx/links";
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Callout } from "fumadocs-ui/components/callout";
import { Card, Cards } from "fumadocs-ui/components/card";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

import { extractSourceCode } from "../../lib/extract-source";
import { cn } from "../../lib/utils";
import { ComponentBase } from "./component-base";
import { ComponentPreview } from "./component-preview";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
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
    Links,
    Link,
    Steps,
    Step,
    // p: ({
    //   className,
    //   ...props
    // }: React.HTMLAttributes<HTMLParagraphElement>) => (
    //   <p
    //     className={cn("leading-6 [&:not(:first-child)]:mt-6", className)}
    //     {...props}
    //   />
    // ),
    ComponentBase: ({ name, ...props }) => {
      return (
        <ComponentBase name={name} code={extractSourceCode(name)} {...props} />
      );
    },
    ComponentPreview: ({ name, ...props }) => (
      <ComponentPreview name={name} code={extractSourceCode(name)} {...props} />
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
