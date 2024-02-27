import { ExamplesNav } from '@/components/examples-nav'
import { Icons } from '@/components/icons'
import { Header } from '@/components/layouts/header'
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
import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Examples - Buttons',
  description: 'Check out some examples app built using the components.',
}

interface ExamplesLayoutProps {
  children: React.ReactNode
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
  return (
    <div className="relative mx-auto h-screen w-full max-w-7xl px-6 md:px-8 lg:px-12">
      <Header />
      <PageHeader>
        <PageHeaderHeading className="hidden md:block">
          Check out some examples
        </PageHeaderHeading>
        <PageHeaderHeading className="md:hidden">
          Examples - Buttons
        </PageHeaderHeading>
        <PageHeaderDescription>
          Ready-to-use, simply copy and paste into your next project. All
          snippets crafted with{' '}
          <span>
            Tailwind CSS{' '}
            <Badge variant="secondary">
              <Icons.tailwind className="size-4" />
            </Badge>
          </span>{' '}
          for easy integration.
        </PageHeaderDescription>
        <PageActions>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <Icons.gitHub className="mr-2 size-4" />
            GitHub
          </Link>
        </PageActions>
      </PageHeader>
      <section>
        <ExamplesNav />
        <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
          {children}
        </div>
      </section>
    </div>
  )
}
