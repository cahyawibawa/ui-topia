import { ButtonGradientDemo } from '@/components/btn-gradient'
import { FlipWords } from '@/components/flip-words'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { SiteFooter } from '@/components/site-footer'
import { SparkleDivider } from '@/components/sparkle-divider'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import ButtonsPage from '../examples/buttons/page'

export default function Home() {
  const words = ['modern', 'beautiful', 'better']
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
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'rounded-full'
            )}
          >
            GitHub
          </Link>
        </PageActions>
      </PageHeader>
      {/* <ExamplesNav className="[&>a:first-child]:text-muted-foreground" /> */}
      <SparkleDivider
        className="rounded-[0.5rem] border"
        useBottomDivider={false}
      >
        <ButtonsPage />
      </SparkleDivider>
      <SiteFooter />
    </div>
  )
}
