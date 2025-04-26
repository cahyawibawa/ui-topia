import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/uitopia/button";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/uitopia/page-header";
import Link from "next/link";
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
            "border border-zinc-950/25 bg-gradient-to-t from-indigo-700 to-indigo-500/85 text-white shadow-md shadow-zinc-950/20 ring-1 ring-white/20 ring-inset transition-all duration-200 hover:brightness-110 active:brightness-90 dark:border-white/20 dark:ring-transparent",
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
