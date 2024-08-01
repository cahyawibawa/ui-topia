import { baseOptions } from '@/app/layout-config'
import { ButtonGradientDemo } from '@/components/btn-gradient'
import { ExamplesNav } from '@/components/examples-nav'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
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
            <PageHeaderHeading>Check out some examples</PageHeaderHeading>
            <PageHeaderDescription>
              All Buttons Collection crafted with TailwindCSS
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
          <ExamplesNav />
          <div className="overflow-hidden rounded-[0.5rem] border shadow-md md:shadow-xl">
            {children}
          </div>
        </div>
      </Layout>
    </>
  )
}
