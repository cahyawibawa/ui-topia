import { Announcement } from '@/components/announcement'
import { ExamplesNav } from '@/components/examples-nav'
import { GitButton } from '@/components/git-button'
import { SwitcherHero } from '@/components/hero/switcher-hero'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import { siteConfig } from '@/config/site'
import { Layout } from 'fumadocs-ui/layout'
import { type Metadata } from 'next'
import Image from 'next/image'
import { layoutOptions } from '../layout-config'

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
      <Layout {...layoutOptions}>
        <Shell>
          <SwitcherHero />
          <ExamplesNav />
          <div className="overflow-hidden rounded-[0.5rem] border shadow-md md:shadow-xl">
            {children}
          </div>
        </Shell>
      </Layout>
    </>
  )
}
