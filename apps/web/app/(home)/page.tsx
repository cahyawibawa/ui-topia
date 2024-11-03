import ButtonsPage from "@/app/examples/buttons/page";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { SparkleDivider } from "@/components/sparkle-divider";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@ui/topia/button";
import { HoverBorderGradient } from "@ui/topia/button-gradient";
import { FlipWords } from "@ui/topia/flip-words";
import Link from "next/link";

export default function Home() {
  const words = ["modern", "beautiful", "better"];
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>
          Make your website look <FlipWords words={words} />
        </PageHeaderHeading>
        <PageHeaderDescription>
          Collection of fine UI components ready for instant use.
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
              "rounded-full text-xs",
            )}
          >
            GitHub
          </Link>
        </PageActions>
      </PageHeader>
      {/* hide tab and divider for now*/}
      {/* <ExamplesNav className="[&>a:first-child]:text-muted-foreground" /> */}
      {/* <SparkleDivider
        className="rounded-[0.5rem] border"
        useBottomDivider={false}
      >
         </SparkleDivider> */}
      <ButtonsPage />

      <SiteFooter />
    </div>
  );
}
