import { baseOptions } from "@/app/layout-config";
import { ExamplesNav } from "@/components/examples-nav";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@ui/topia/button";
import { HoverBorderGradient } from "@ui/topia/button-gradient";
import { HomeLayout } from "fumadocs-ui/home-layout";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Examples",
  description: "Check out some examples elements.",
};

interface ExamplesLayoutProps {
  children: React.ReactNode;
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
  return (
    <>
      <HomeLayout {...baseOptions}>
        <div className="container relative">
          <PageHeader>
            <PageHeaderHeading>Check out some examples</PageHeaderHeading>
            <PageHeaderDescription>
              All Buttons Collection crafted with TailwindCSS
            </PageHeaderDescription>
            <PageActions>
              <Link href="/docs">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="flex items-center space-x-2 bg-white text-foreground dark:bg-[#121212]"
                >
                  <span className="text-xs">Get Started</span>
                </HoverBorderGradient>
              </Link>
              <Link
                target="_blank"
                rel="noreferrer"
                href={siteConfig.links.github}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "rounded-full",
                )}
              >
                GitHub
              </Link>
            </PageActions>
          </PageHeader>
          <ExamplesNav />
          {children}
        </div>
      </HomeLayout>
    </>
  );
}
