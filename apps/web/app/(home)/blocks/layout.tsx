import Link from "next/link";
import { BlocksNav } from "@/components/blocks-nav";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/ui/button";
import registry from "@/registry.json" with { type: "json" };

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/uitopia/page-header";

export const metadata = createMetadata({
  description:
    "Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks. Open Source. Free forever.",
  title: "Building Blocks for the Web",
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
  hidden: false,
  name: category.charAt(0).toUpperCase() + category.slice(1),
  slug: category.toLowerCase(),
}));

interface BlocksLayoutProps {
  children: React.ReactNode;
}

export default function BlocksLayout({ children }: BlocksLayoutProps) {
  return (
    <PageHeader>
      <div className="container py-4">
        <PageHeaderHeading>
          Building <span className="span-highlight">blocks</span> for the web
        </PageHeaderHeading>
        <PageHeaderDescription>
          Clean, modern building blocks. Copy and paste into your apps. Works
          with all React frameworks. Open Source. Free forever.
        </PageHeaderDescription>

        <PageActions>
          <Link
            className={cn(
              buttonVariants({ size: "sm", variant: "default" }),
              "border border-primary bg-linear-to-b from-primary/80 to-primary text-primary-foreground text-xs shadow-md shadow-zinc-950/30 ring ring-white/20 ring-inset transition-[filter] duration-200 hover:brightness-125 active:brightness-95 dark:border-primary dark:from-primary dark:to-primary/80 **:[text-shadow:0_1px_0_var(--color-primary)]",
            )}
            href="/blocks#blocks"
          >
            Browse blocks
          </Link>
        </PageActions>
        <div className="mt-8 scroll-mt-24" id="blocks">
          <div className="flex items-center py-4">
            <BlocksNav categories={categories} />
          </div>
        </div>
        <div className="container-wrapper flex-1">{children}</div>
      </div>
    </PageHeader>
  );
}
