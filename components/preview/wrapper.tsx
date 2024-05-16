import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export function Wrapper(
  props: HTMLAttributes<HTMLDivElement>
): React.ReactElement {
  return (
    <div
      {...props}
      className={cn(
        'flex h-[40rem] w-full items-center justify-center rounded-md border  p-4 prose-no-margin',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
