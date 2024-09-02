import { ButtonGradientDemo } from "@/components/btn-gradient";
import { FlipWords } from "@/components/flip-words";
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
import Link from "next/link";
import { Suspense } from "react";
import ButtonsPage from "../examples/buttons/page";
export default function Home() {
  const words = ["modern", "beautiful", "better"];
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>
          Make your website look <FlipWords words={words} />
        </PageHeaderHeading>
        <PageHeaderDescription>
          Collection of fine-tuned UI components ready for instant use.
        </PageHeaderDescription>

        <PageActions>
          <ButtonGradientDemo />
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
      {/* <div className="scale-50 md:scale-100 -top-[500px] -right-[380px] pointer-events-none transform-gpu grayscale md:flex lg:animate-[open-scale-up-fade_1.5s_ease-in-out] absolute md:-right-[200px] xl:-right-[100px] w-auto h-auto md:-top-[200px]">
        <Suspense>
          <RubikCube />
        </Suspense>
      </div> */}

      {/* <ExamplesNav className="[&>a:first-child]:text-muted-foreground" /> */}
      <SparkleDivider
        className="rounded-[0.5rem] border"
        useBottomDivider={false}
      >
        <ButtonsPage />
      </SparkleDivider>
      <SiteFooter />
    </div>
  );
}
