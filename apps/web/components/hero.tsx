import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/uitopia/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="flex h-full flex-col items-start justify-start pt-20">
      <div className="flex w-full max-w-lg flex-col items-start justify-start">
        <h1 className="relative mb-4 font-medium text-4xl text-zinc-950 dark:text-zinc-50">
          Make your <span className="span-highlight">interface</span> doesn't
          look the same anymore.
        </h1>
        <p className="font-light text-foreground">
          Collection set of beautifully designed motions components. Easy
          copy-paste. Customizable. Open Source.
        </p>
      </div>
      <div className="flex items-start space-x-4 py-6">
        <Link
          href="/docs"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "rounded-lg text-xs",
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
      </div>
    </section>
  );
}
