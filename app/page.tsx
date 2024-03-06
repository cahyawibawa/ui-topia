import { Announcement } from '@/components/announcement'
import { Shimmer } from '@/components/buttons/shimmer-1'
import { ExamplesNav } from '@/components/examples-nav'
import { Icons } from '@/components/icons'
import Footer from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import ButtonsPage from './examples/buttons/page'

export default function Home() {
  return (
    <div className="relative mx-auto h-screen w-full max-w-7xl px-6 md:px-8 lg:px-12">
      <Header />
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>Make your website better. </PageHeaderHeading>
        <PageHeaderHeading>Instantly. </PageHeaderHeading>
        <PageHeaderDescription>
          Discover a world of ready-to-use elements, simply copy and paste into
          your next project. All snippets crafted with{' '}
          <span>
            Tailwind CSS{' '}
            <Badge variant="secondary">
              <Icons.tailwind className="size-4" />
            </Badge>
          </span>{' '}
          for easy integration.
        </PageHeaderDescription>
        <PageActions>
          <Shimmer />
        </PageActions>
      </PageHeader>
      <ExamplesNav className="[&>a:first-child]:text-primary" />
      <section className="md:block">
        <div className="overflow-hidden rounded-md border bg-popover shadow-sm">
          <section>
            <ButtonsPage />
          </section>
        </div>
      </section>
      <Footer />
    </div>
  )
}
