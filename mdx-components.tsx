import { Wrapper } from '@/components/preview/wrapper'
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { Callout } from 'fumadocs-ui/components/callout'
import {
  CodeBlock,
  Pre,
  type CodeBlockProps,
} from 'fumadocs-ui/components/codeblock'
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { TypeTable } from 'fumadocs-ui/components/type-table'
import defaultComponents from 'fumadocs-ui/mdx'
import { Popup, PopupContent, PopupTrigger } from 'fumadocs-ui/twoslash/popup'
import { HomeIcon } from 'lucide-react'
import type { MDXComponents } from 'mdx/types'
import { ReactNode } from 'react'
import ConnectModal from './components/playground/connect-modal'
import RippleCard from './components/playground/ripple-card'
import { cn } from './lib/utils'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    HomeIcon,
    Accordion,
    Accordions,
    Tabs,
    Tab,
    Callout,
    TypeTable,
    Popup,
    PopupContent,
    PopupTrigger,
    ImageZoom,
    RippleCard,
    ConnectModal,
    Wrapper,
    pre: ({ title, className, icon, allowCopy, ...props }: CodeBlockProps) => (
      <CodeBlock title={title} icon={icon} allowCopy={allowCopy}>
        <Pre className={cn('max-h-[400px]', className)} {...props} />
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
