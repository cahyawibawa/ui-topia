import { Link, Links } from '@/components/mdx/links'
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { Callout } from 'fumadocs-ui/components/callout'
import { Card, Cards } from 'fumadocs-ui/components/card'
import { File, Files, Folder } from 'fumadocs-ui/components/files'
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { TypeTable } from 'fumadocs-ui/components/type-table'
import defaultComponents from 'fumadocs-ui/mdx'
import { Popup, PopupContent, PopupTrigger } from 'fumadocs-ui/twoslash/popup'
import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'

import { ComponentBase } from './components/mdx/component-base'
import { ComponentPreview } from './components/mdx/component-preview'
import { extractSourceCode } from './lib/extract-source'
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
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        className={cn(
          'font-heading mt-2 scroll-m-20 text-4xl font-bold',
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className={cn(
          'mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className={cn(
          'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    ComponentBase: ({ name, ...props }) => {
      return (
        <ComponentBase name={name} code={extractSourceCode(name)} {...props} />
      )
    },
    ComponentPreview: ({ name, ...props }) => (
      <ComponentPreview name={name} code={extractSourceCode(name)} {...props} />
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
