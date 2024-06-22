import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { Callout } from 'fumadocs-ui/components/callout'
import { File, Files, Folder } from 'fumadocs-ui/components/files'
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { TypeTable } from 'fumadocs-ui/components/type-table'
import defaultComponents from 'fumadocs-ui/mdx'
import { Popup, PopupContent, PopupTrigger } from 'fumadocs-ui/twoslash/popup'
import { HomeIcon } from 'lucide-react'
import type { MDXComponents } from 'mdx/types'
import { type ReactNode } from 'react'
import { ComponentBase } from './components/component-base'
import { ComponentPreview } from './components/component-preview'
import { extractSourceCode } from './lib/extract-source'

import { cn } from './lib/utils'

// import { CodeBlock, CodeBlockProps, Pre } from './components/code-block'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    HomeIcon,
    Accordion,
    Accordions,
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
          'font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className={cn(
          'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4
        className={cn(
          'font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h5
        className={cn(
          'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h6
        className={cn(
          'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
      <a
        className={cn('font-medium underline underline-offset-4', className)}
        {...props}
      />
    ),
    p: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul
        className={cn('not-prose my-6 ml-6 list-disc', className)}
        {...props}
      />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <li className={cn('mt-2', className)} {...props} />
    ),
    blockquote: (props) => <Callout>{props.children}</Callout>,
    img: ({
      className,
      alt,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img className={cn('rounded-md', className)} alt={alt} {...props} />
    ),
    hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
      <hr className="my-4 md:my-8" {...props} />
    ),
    table: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className={cn('w-full', className)} {...props} />
      </div>
    ),
    ComponentBase: ({ name, ...props }: { name: string }) => {
      const code = extractSourceCode(name)
      return <ComponentBase name={name} code={code} {...props} />
    },
    ComponentPreview: ({ name, ...props }) => (
      <ComponentPreview name={name} code={extractSourceCode(name)} {...props} />
    ),

    // pre: ({ title, className, icon, allowCopy, ...props }: CodeBlockProps) => (
    //   <CodeBlock title={title} icon={icon} allowCopy={allowCopy}>
    //     <Pre className={cn('max-h-[400px]', className)} {...props} />
    //   </CodeBlock>
    // ),
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
    ...components,
  }
}
