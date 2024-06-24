'use client'
import { HoverBorderGradient } from './hover-border-gradient'

export function ButtonGradientDemo() {
  return (
    <HoverBorderGradient
      containerClassName="rounded-full"
      as="button"
      className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
    >
      <span>Get Started</span>
    </HoverBorderGradient>
  )
}
