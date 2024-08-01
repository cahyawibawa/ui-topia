'use client'
import { Icons } from '@/components/icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { codeToHtml } from '@/lib/shiki'
import { cn } from '@/lib/utils'
import { registry } from '@ui/topia'
import { useTheme } from 'next-themes' // Import useTheme hook
import * as React from 'react'
import { Button } from '../ui/button'
import { CodeBlock, Pre } from './code-block'
import ComponentWrapper from './component-wrapper'

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  code: string
  lang?: string
  icon?: React.ReactNode
  align?: 'center' | 'start' | 'end'
}

export function ComponentPreview({
  name,
  children,
  className,
  icon,
  align = 'center',
  code,
  lang = 'tsx',
  ...props
}: ComponentPreviewProps) {
  const [key, setKey] = React.useState(0) // State to trigger re-render of preview
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

  const Preview = React.useMemo(() => {
    const Component = registry[name]?.component

    if (!Component) {
      console.error(`Component with name "${name}" not found in registry.`)
      return (
        <p className="text-muted-foreground text-sm">
          Component{' '}
          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{' '}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name])

  return (
    <div
      className={cn(
        'relative my-4 flex flex-col space-y-2 lg:max-w-[120ch]',
        className
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-3 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-3 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-md" key={key}>
          <ComponentWrapper>
            <Button
              onClick={() => setKey((prev) => prev + 1)}
              className="absolute right-0 top-0 z-10 ml-4 flex items-center rounded-lg px-3 py-1"
              variant="ghost"
              size="sm"
            >
              <Icons.refresh size={16} />
            </Button>
            <React.Suspense
              fallback={
                <div className="text-muted-foreground flex items-center text-sm">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </ComponentWrapper>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <CodeBlock allowCopy>
              <Pre
                className={cn(
                  'w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto'
                )}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </CodeBlock>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
