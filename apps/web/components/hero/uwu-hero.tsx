import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import TailwindUwu from '@/public/TailwindUwU.png'
import Image from 'next/image'
import Link from 'next/link'

export function UwuHero(): React.ReactElement {
  return (
    <div className="z-[2] hidden flex-col items-center pb-8 text-center [.uwu_&]:flex">
      <Image
        alt="logo"
        src={TailwindUwu}
        className="mb-6 w-full max-w-[400px] px-4"
        priority
      />

      <p className="text-muted-foreground mb-6 h-fit p-2 text-lg md:max-w-[80%] md:text-xl">
        Fumadocs is the framework for building documentation with{' '}
        <b className="text-foreground font-medium">anime and fuwa fuwa power</b>
        . Using the power of weebs and waifus.
      </p>
      <div className="inline-flex items-center gap-3">
        <Link
          href="/docs"
          className={cn(
            buttonVariants({ size: 'lg', className: 'rounded-full' })
          )}
        >
          Getting Started
        </Link>
        <a
          href="https://githubbox.com/fuma-nama/fumadocs-ui-template"
          className={cn(
            buttonVariants({
              size: 'lg',
              variant: 'outline',
              className: 'bg-background rounded-full',
            })
          )}
        >
          Open Demo
        </a>
      </div>
    </div>
  )
}
