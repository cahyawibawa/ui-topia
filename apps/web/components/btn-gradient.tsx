"use client";
import { HoverBorderGradient } from "@/components/hover-border-gradient";
import Link from "next/link";

export function ButtonGradientDemo() {
  return (
    <Link href="/docs">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="flex items-center space-x-2 bg-white text-foreground dark:bg-[#121212]"
      >
        <span className="text-xs">Get Started</span>
      </HoverBorderGradient>
    </Link>
  );
}
