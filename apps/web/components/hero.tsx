import { siteConfig } from "@/config/site";
import { Button } from "@/uitopia/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="flex h-full flex-col items-start justify-start pt-20">
      <div className="flex w-full max-w-lg flex-col items-start justify-start">
        <h1 className="relative mb-4 font-medium text-4xl text-zinc-950 dark:text-zinc-50">
          Make your UI doesn't look the same anymore
        </h1>
        <p className="font-light text-muted-foreground">
          Collection set of beautifully designed motions components. Easy
          copy-paste. Customizable. Open Source.
        </p>
      </div>
      <div className="flex items-start space-x-4 py-6">
        <Link href="/docs">
          <Button size="sm" className="rounded-lg text-xs">
            Explore Now
          </Button>
        </Link>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="sm" variant="ghost" className="rounded-lg text-xs">
            GitHub
          </Button>
        </a>
      </div>
    </section>
  );
}
