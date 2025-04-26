import { BlocksNav } from "@/components/blocks-nav";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import registry from "@/registry.json";
import { buttonVariants } from "@/registry/ui/button";
import Link from "next/link";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/uitopia/page-header";

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
            href="/blocks#blocks"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "border border-zinc-950/25 bg-gradient-to-t from-indigo-700 to-indigo-500/85 text-white shadow-md shadow-zinc-950/20 ring-1 ring-white/20 ring-inset transition-all duration-200 hover:brightness-110 active:brightness-90 dark:border-white/20 dark:ring-transparent",
            )}
          >
            Browse blocks
          </Link>
        </PageActions>
        <div id="blocks" className="mt-8 scroll-mt-24">
          <div className="flex items-center py-4">
            <BlocksNav categories={categories} />
          </div>
        </div>
        <div className="container-wrapper flex-1">{children}</div>
      </div>
    </PageHeader>
  );
}
