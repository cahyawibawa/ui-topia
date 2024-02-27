'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const examples = [
  {
    name: 'Buttons',
    href: '/examples/buttons',
  },
  // {
  //   name: 'Background',
  //   href: '/examples/background',
  // },
]

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex justify-center">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn('mb-4 flex items-center', className)} {...props}>
          {examples.map((example, index) => (
            <Link
              href={example.href}
              key={example.href}
              className={cn(
                'flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary',
                pathname?.startsWith(example.href) ||
                  (index === 0 && pathname === '/')
                  ? 'bg-muted font-medium text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}

// interface ExampleCodeLinkProps {
//   pathname: string | null;
// }

// export function ExampleCodeLink({ pathname }: ExampleCodeLinkProps) {
//   const example = examples.find((example) =>
//     pathname?.startsWith(example.href)
//   );

//   if (!example?.code) {
//     return null;
//   }

//   return (
//     <Link
//       href={example?.code}
//       target='_blank'
//       rel='nofollow'
//       className='absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex'
//     >
//       View code
//       <ArrowRightIcon className='ml-1 h-4 w-4' />
//     </Link>
//   );
// }
