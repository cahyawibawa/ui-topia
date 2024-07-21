'use client'
import Link from 'next/link'
import { HoverBorderGradient } from './hover-border-gradient'

export function ButtonGradientDemo() {
  return (
    <Link href="/docs">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
      >
        <span className="text-sm">Get Started</span>
      </HoverBorderGradient>
    </Link>
  )
}
