import { baseOptions } from '@/app/layout-config'
import { ExamplesNav } from '@/components/examples-nav'
import { SwitcherHero } from '@/components/hero/switcher-hero'
import { Shell } from '@/components/shell'
import { Layout } from 'fumadocs-ui/layout'
import { type Metadata } from 'next'

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
