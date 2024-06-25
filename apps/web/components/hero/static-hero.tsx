import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ButtonGradientDemo } from '../btn-gradient'
import { Icons } from '../icons'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '../page-header'
import { Badge } from '../ui/badge'
import { buttonVariants } from '../ui/button'

export const HeroHomepage = () => {
  return (
    <div className="mb-8 overflow-hidden  text-center md:h-[580px]">
      <div className="relative flex size-full flex-col items-center justify-between pb-6">
        <Image
          className="absolute top-0 -z-10 mt-24 hidden h-full w-[1450px] max-w-[unset] scale-90 object-contain md:block"
          src="/images/uitopia-hero1.svg"
          alt="uitopia hero"
          width={1450}
          height={480}
        />
        <PageHeader>
          <Badge variant={'outline'}>NEW DROPS WEEKLY</Badge>
          <PageHeaderHeading>
            Make your website look better, Instantly
          </PageHeaderHeading>
          <PageHeaderDescription>
            <span>{siteConfig.blockInfos}</span>
          </PageHeaderDescription>

          <PageActions>
            <ButtonGradientDemo />
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
              className={cn(
                buttonVariants({ variant: 'default' }),
                'rounded-full'
              )}
            >
              <Icons.gitHub className="mr-2 size-4" />
              GitHub
            </Link>
          </PageActions>
        </PageHeader>
      </div>
    </div>
  )
}
