import { baseOptions } from '@/app/layout-config'
import { ButtonGradientDemo } from '@/components/btn-gradient'
import { ExamplesNav } from '@/components/examples-nav'
import { Icons } from '@/components/icons'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Layout } from 'fumadocs-ui/layout'
import { type Metadata } from 'next'
import Link from 'next/link'

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
      <Layout {...baseOptions}>
        <div className="container relative">
          <PageHeader>
            <Badge variant={'outline'}>NEW DROPS WEEKLY</Badge>
            <PageHeaderHeading>Check out some examples</PageHeaderHeading>
            <PageHeaderDescription>
              <span>
                Buttons & text-variants crafted with TailwindCSS and Framer
                Motion
              </span>
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
          <ExamplesNav />
          <div className="overflow-hidden rounded-[0.5rem] border shadow-md md:shadow-xl">
            {children}
          </div>
        </div>
      </Layout>
    </>
  )
}
