import { ComponentSource } from '@/components/mdx/component-source'
import { Link, Links } from '@/components/mdx/links'
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { Callout } from 'fumadocs-ui/components/callout'
import { Card, Cards } from 'fumadocs-ui/components/card'
import {
  CodeBlock,
  Pre,
  type CodeBlockProps,
} from 'fumadocs-ui/components/codeblock'
import { File, Files, Folder } from 'fumadocs-ui/components/files'
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { TypeTable } from 'fumadocs-ui/components/type-table'
import defaultComponents from 'fumadocs-ui/mdx'
import { Popup, PopupContent, PopupTrigger } from 'fumadocs-ui/twoslash/popup'
import type { MDXComponents } from 'mdx/types'
import { type ReactNode } from 'react'

import { cn } from './lib/utils'

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
    Popup,
    PopupContent,
    PopupTrigger,
    ImageZoom,
    Links,
    Link,
    Steps,
    Step,
    ComponentSource,
    pre: ({ title, className, icon, allowCopy, ...props }: CodeBlockProps) => (
      <CodeBlock title={title} icon={icon} allowCopy={allowCopy}>
        <Pre
          className={cn('max-h-[400px] overflow-auto', className)}
          {...props}
        />
      </CodeBlock>
    ),
    InstallTabs: ({
      items,
      children,
    }: {
      items: string[]
      children: ReactNode
    }) => (
      <Tabs items={items} id="package-manager">
        {children}
      </Tabs>
    ),
    blockquote: (props) => <Callout>{props.children}</Callout>,
    ...components,
  }
}
