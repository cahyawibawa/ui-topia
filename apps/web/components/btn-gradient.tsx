'use client'
import Link from 'next/link'
import { HoverBorderGradient } from './hover-border-gradient'

export function ButtonGradientDemo() {
  return (
    <Link href="/docs">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="text-foreground flex items-center space-x-2 bg-white dark:bg-zinc-950"
      >
        <span className="text-xs">Get Started</span>
      </HoverBorderGradient>
    </Link>
  )
}
