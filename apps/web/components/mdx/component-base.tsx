'use client'

import { codeToHtml } from '@/lib/shiki'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes' // Import useTheme hook
import * as React from 'react'
import { CodeBlock, Pre } from './code-block'
import { CodeBlockWrapper } from './code-block-wrapper'
interface ComponentBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  name: string
  lang?: string
}

export function ComponentBase({
  code,
  name,
  lang = 'tsx',
  className,
  ...props
}: ComponentBaseProps) {
  const [highlightedCode, setHighlightedCode] = React.useState<string>('')
  const { theme } = useTheme() // Get the current theme
  React.useEffect(() => {
    const highlightCode = async () => {
      const html = await codeToHtml({
        code,
        lang,
        theme: theme as 'light' | 'dark', // Pass the current theme
      })
      setHighlightedCode(html)
    }

    highlightCode()
  }, [code, lang, theme]) // Re-run when theme changes
  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn('my-6 overflow-hidden rounded-md', className)}
      {...props}
    >
      <CodeBlock title={name} allowCopy>
        <Pre
          className={cn(
            'w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:overflow-auto'
          )}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </CodeBlock>
    </CodeBlockWrapper>
  )
}
