import { BlocksNav } from "@/components/blocks-nav";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import registry from "@/registry.json";
import { buttonVariants } from "@/registry/ui/button";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Building Blocks for the Web",
  description:
    "Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks. Open Source. Free forever.",
});

// Extract unique categories from registry blocks only
const categories = Array.from(
  new Set(
    registry.items
      .filter((item) => item.type === "registry:block")
      .flatMap((item) => item.categories || [])
      .filter(Boolean),
  ),
).map((category) => ({
  name: category.charAt(0).toUpperCase() + category.slice(1),
  slug: category.toLowerCase(),
  hidden: false,
}));

interface BlocksLayoutProps {
  children: React.ReactNode;
}

export default function BlocksLayout({ children }: BlocksLayoutProps) {
  return (
    <div className="container-wrapper">
      <div className="container flex h-full flex-col items-start justify-start py-4 pt-20">
        <div className="flex w-full max-w-lg flex-col items-start justify-start">
          <h1 className="relative mb-4 font-medium text-4xl text-zinc-950 dark:text-zinc-50">
            Building <span className="span-highlight">blocks</span> for the web
          </h1>
          <p className="font-light text-foreground">
            Clean, modern building blocks. Copy and paste into your apps. Works
            with all React frameworks. Open Source. Free forever.
          </p>
        </div>
        <div className="flex items-start space-x-4 py-6">
          <Link
            href="/blocks#blocks"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "inset-shadow-2xs inset-shadow-white/25 border border-zinc-950/35 bg-linear-to-b from-primary/85 to-primary text-primary-foreground shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95 dark:border-0 dark:border-zinc-950/50 dark:bg-linear-to-t dark:from-primary/75",
            )}
          >
            Browse blocks
          </Link>
        </div>
        <div id="blocks" className="scroll-mt-24">
          <div className="container-wrapper">
            <div className="flex items-center py-4">
              <BlocksNav categories={categories} />
            </div>
          </div>
        </div>
        <div className="container-wrapper flex-1">{children}</div>
      </div>
    </div>
  );
}
