import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/uitopia/button";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/uitopia/page-header";
import { Announcement } from "./announcement";

export function Hero() {
  return (
    <PageHeader>
      <Announcement />
      <PageHeaderHeading>
        Make your <span className="span-highlight">interface</span> delightful
        effortlessly.
      </PageHeaderHeading>
      <PageHeaderDescription>
        Collection set of beautifully designed motions components. Easy
        copy-paste. Customizable. Open Source.
      </PageHeaderDescription>

      <PageActions>
        <Link
          className={cn(
            buttonVariants({ size: "sm", variant: "default" }),
            "border border-primary bg-linear-to-b from-primary/80 to-primary text-primary-foreground text-xs shadow-md shadow-zinc-950/30 ring ring-white/20 ring-inset transition-[filter] duration-200 hover:brightness-125 active:brightness-95 dark:border-primary dark:from-primary dark:to-primary/80 **:[text-shadow:0_1px_0_var(--color-primary)]",
          )}
          href="/docs"
        >
          Explore Now
        </Link>
        <Link
          className={cn(
            buttonVariants({ size: "sm", variant: "ghost" }),
            "rounded-lg text-xs",
          )}
          href={siteConfig.links.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </Link>
      </PageActions>
    </PageHeader>
  );
}
