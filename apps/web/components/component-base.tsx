'use client'

import { CodeBlockWrapper } from '@/components/code-block-wrapper'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { CodeBlock, Pre } from './code-block'

interface ComponentBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  name: string
}

export function ComponentBase({
  code,
  name,
  className,
  ...props
}: ComponentBaseProps) {
  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn('my-6 overflow-hidden rounded-md', className)}
      {...props}
    >
      <CodeBlock title={name} allowCopy>
        <Pre className={cn('max-h-[400px] overflow-auto')}>{code}</Pre>
      </CodeBlock>
    </CodeBlockWrapper>
  )
}
