import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export function Wrapper(
  props: HTMLAttributes<HTMLDivElement>
): React.ReactElement {
  return (
    <div
      {...props}
      className={cn(
        'not-prose relative flex max-w-full flex-col items-center justify-center rounded-md border p-4 md:p-16',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
