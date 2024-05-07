import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Icons } from '../icons'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '../page-header'
import { Badge } from '../ui/badge'
import { Button, buttonVariants } from '../ui/button'

export const HeroHomepage = () => {
  return (
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
          <PageHeaderHeading>
            Make your website look better, Instantly
          </PageHeaderHeading>
          <PageHeaderDescription>
            <span>{siteConfig.blockInfos}</span>
          </PageHeaderDescription>

          <PageActions>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
              className={cn(buttonVariants({ variant: 'default' }))}
            >
              <Icons.gitHub className="mr-2 size-4" />
              GitHub
            </Link>
            {/* <Button variant="outline" size="lg">
              <Link href="/docs">Docs</Link>
            </Button> */}
          </PageActions>
        </PageHeader>
      </div>
    </div>
  )
}
