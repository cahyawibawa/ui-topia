import { baseOptions } from '@/app/layout-config'
import { Layout } from 'fumadocs-ui/layout'
import { type ReactNode } from 'react'

export default function HomeLayout({
  children,
}: {
  children: ReactNode
}): React.ReactElement {
  return <Layout {...baseOptions}>{children}</Layout>
}
