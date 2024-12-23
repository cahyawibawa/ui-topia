import { ExamplesNav } from "@/components/examples-nav";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/uitopia/button";
import TextLoop from "@ui/topia/texts/text-loop";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Examples",
  description: "Check out some examples components.",
};

interface ExamplesLayoutProps {
  children: React.ReactNode;
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>
          {" "}
          Craft a website that's
          <br />
          <TextLoop
            className="overflow-y-clip"
            transition={{
              type: "spring",
              stiffness: 900,
              damping: 80,
              mass: 10,
            }}
            interval={2.5}
            variants={{
              initial: {
                y: 20,
                rotateX: 90,
                opacity: 0,
                filter: "blur(4px)",
              },
              animate: {
                y: 0,
                rotateX: 0,
                opacity: 1,
                filter: "blur(0px)",
              },
              exit: {
                y: -20,
                rotateX: -90,
                opacity: 0,
                filter: "blur(4px)",
              },
            }}
          >
            <span>Shiny</span>
            <span>Intuitive</span>
            <span>Effortless</span>
          </TextLoop>
        </PageHeaderHeading>
        <PageHeaderDescription>
          All components are crafted with shadcn/ui and TailwindCSS
        </PageHeaderDescription>
        <PageActions>
          <Link
            href="/docs"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full text-xs",
            )}
          >
            Explore now
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "rounded-full text-xs",
            )}
          >
            GitHub
          </Link>
        </PageActions>
      </PageHeader>
      <ExamplesNav />
      {children}
    </div>
  );
}
