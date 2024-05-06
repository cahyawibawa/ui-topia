import { ExamplesNav } from '@/components/examples-nav'
import { GitButton } from '@/components/git-button'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import { siteConfig } from '@/config/site'
import { type Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Check out some examples elements.',
}

interface ExamplesLayoutProps {
  children: React.ReactNode
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
  return (
    <>
      <div className="mb-8 overflow-hidden border-b border-muted text-center md:h-[580px]">
        <div className="relative flex size-full flex-col items-center justify-between pb-6">
          <Image
            className="absolute top-0 -z-10 mt-16 hidden h-full w-[1560px] max-w-[unset] scale-90 object-contain md:block"
            src="/images/hero-banner-2.webp"
            alt="ConversionRateExpert"
            width={1513}
            height={480}
          />
          <PageHeader className="mt-10">
            <Badge variant={'outline'}>NEW DROPS WEEKLY</Badge>
            <PageHeaderHeading className="hidden text-primary md:block">
              Check out some examples
            </PageHeaderHeading>
            <PageHeaderHeading className="md:hidden">
              Examples - Elements
            </PageHeaderHeading>
            <PageHeaderDescription>
              <span>{siteConfig.blockInfos}</span>
            </PageHeaderDescription>

            <PageActions>
              <GitButton />
              {/* <Button variant="outline" size="lg">
              <Link href="/">Learn more</Link>
            </Button> */}
            </PageActions>
          </PageHeader>
        </div>
      </div>
      <section className="container relative">
        <ExamplesNav />
        <div className="overflow-hidden rounded-[0.5rem] border shadow-md md:shadow-xl">
          {children}
        </div>
      </section>
    </>
  )
}
