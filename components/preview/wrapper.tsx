import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export function Wrapper(
  props: HTMLAttributes<HTMLDivElement>
): React.ReactElement {
  return (
    <div
      {...props}
      className={cn(
        'rounded-xl border bg-popover p-4 prose-no-margin',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
