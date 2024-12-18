import ButtonsPage from "@/app/(home)/examples/buttons/page";
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
import TextLoop from "@ui/topia/text-loop";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>
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
          A dream library of fine components, ready for instant use.
        </PageHeaderDescription>
        <PageActions>
          <Link href="/docs">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="flex items-center space-x-2 bg-white text-foreground dark:bg-[#121212]"
            >
              <span className="text-xs">Explore now</span>
            </HoverBorderGradient>
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
      <ExamplesNav className="[&>a:first-child]:text-muted-foreground" />
      <ButtonsPage />
    </div>
  );
}
