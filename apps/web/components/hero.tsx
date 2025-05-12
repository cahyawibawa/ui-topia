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
          href="/docs"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "border border-primary bg-linear-to-b from-primary/80 to-primary text-primary-foreground text-xs shadow-md shadow-zinc-950/30 ring ring-white/20 ring-inset transition-[filter] duration-200 hover:brightness-125 active:brightness-95 dark:border-primary dark:from-primary dark:to-primary/80 **:[text-shadow:0_1px_0_var(--color-primary)]",
          )}
        >
          Explore Now
        </Link>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "rounded-lg text-xs",
          )}
        >
          GitHub
        </Link>
      </PageActions>
    </PageHeader>
  );
}
