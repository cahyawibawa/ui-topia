'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { registry } from '@ui/topia'
import * as React from 'react'
import ComponentWrapper from './component-wrapper'

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  align?: 'center' | 'start' | 'end'
}

export function ComponentSource({
  name,
  className,
  align = 'center',
  ...props
}: ComponentPreviewProps) {
  const [key, setKey] = React.useState(0) // State to trigger re-render of preview

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
  }, [name, key])

  return (
    <div
      className={cn(
        'relative my-4 flex flex-col space-y-2 lg:max-w-[120ch]',
        className
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <TabsContent value="preview" className="relative rounded-md" key={key}>
          <ComponentWrapper>
            <Button
              onClick={() => setKey((prev) => prev + 1)}
              className="absolute right-0 top-0 z-10 ml-4 flex items-center rounded-lg px-3 py-1"
              variant="ghost"
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
          {/* The code content will be managed in MDX */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
